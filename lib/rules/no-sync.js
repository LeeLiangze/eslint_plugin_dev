/**
 * @fileoverview no sync in ajax request
 * @author no-sync
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "no sync in ajax request",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            CallExpression: function(node) {
                const callee = node.callee;
                if ( callee.type !== 'MemberExpression' ) return;
                if ( callee.object.object !== undefined ){
                    if (callee.object.object.name !== 'Util') return;
                }
                // console.log(callee.object.object)

                const name = callee.property.name;
                switch (name) {
                    case 'getJson':
                    case 'postJson':
                    case 'putJson':
                    case 'deleteJson':
                    case 'getJsonp':
                        if ( node.arguments.length > 3 ) {
                            if (node.arguments[3].value = true) {
                                context.report({
                                    node: node,
                                    message: name + '不建议使用同步请求'
                                })
                            }
                        }
                }

            }
        };
    }
};
