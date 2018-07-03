"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../utils/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow the use of `activeXObject`",
            category: "Possible Errors",
            recommended: true
        },

        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        minItems: 1,
                        uniqueItems: true
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const options = context.options[0] || {};
        const allowed = options.allow || [];

        /**
         * Checks whether the given reference is 'activeXObject' or not.
         *
         * @param {eslint-scope.Reference} reference - The reference to check.
         * @returns {boolean} `true` if the reference is 'activeXObject'.
         */
        function isactiveXObject(reference) {
            const id = reference.identifier;

            return id && id.name === "activeXObject";
        }

        /**
         * Checks whether the property name of the given MemberExpression node
         * is allowed by options or not.
         *
         * @param {ASTNode} node - The MemberExpression node to check.
         * @returns {boolean} `true` if the property name of the node is allowed.
         */
        function isAllowed(node) {
            const propertyName = astUtils.getStaticPropertyName(node);

            return propertyName && allowed.indexOf(propertyName) !== -1;
        }

        /**
         * Checks whether the given reference is a member access which is not
         * allowed by options or not.
         *
         * @param {eslint-scope.Reference} reference - The reference to check.
         * @returns {boolean} `true` if the reference is a member access which
         *      is not allowed by options.
         */
        function isMemberAccessExceptAllowed(reference) {
            const node = reference.identifier;
            const parent = node.parent;

            return (
                parent.type === "MemberExpression" &&
                parent.object === node &&
                !isAllowed(parent)
            );
        }

        /**
         * Reports the given reference as a violation.
         *
         * @param {eslint-scope.Reference} reference - The reference to report.
         * @returns {void}
         */
        function report(reference) {
            const node = reference.identifier.parent;

            context.report({
                node,
                loc: node.loc,
                message: "禁止使用activeXObject控件."
            });
        }

        return {
            "Program:exit"() {
                const scope = context.getScope();
                const activeXObjectVar = astUtils.getVariableByName(scope, "activeXObject");
                const shadowed = activeXObjectVar && activeXObjectVar.defs.length > 0;

                /* 'scope.through' includes all references to undefined
                 * variables. If the variable 'activeXObject' is not defined, it uses
                 * 'scope.through'.
                 */
                const references = activeXObjectVar
                    ? activeXObjectVar.references
                    : scope.through.filter(isactiveXObject);

                if (!shadowed) {
                    references
                        .filter(isMemberAccessExceptAllowed)
                        .forEach(report);
                }
            }
        };
    }
};
