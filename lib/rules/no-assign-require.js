/**
 * @file    禁止使用 `require` 或者 `window.require`
 * @author  Cap Lee
 */

"use strict";

const ast = require("../utils/ast");

const isIdentifier = ast.isIdentifier;
const isMemberExpr = ast.isMemberExpr;

// -----------------------------------------------------------------------------
// 设置
// -----------------------------------------------------------------------------

const docs = {
    description: "禁止使用 `require` 和 `window.require`",
    category: "Stylistic Choices",
    recommended: false
};

const schema = [];

const message = "无效的分配`require`.";

// -----------------------------------------------------------------------------
// 帮助
// -----------------------------------------------------------------------------

const isWindow = (node) =>
    isIdentifier(node) && node.name === "window";

const isRequire = (node) =>
    isIdentifier(node) && node.name === "require";

const isWindowRequire = (node) =>
    isMemberExpr(node) &&
    isWindow(node.object) &&
    isRequire(node.property);

// -----------------------------------------------------------------------------
// 规则定义
// -----------------------------------------------------------------------------

function create(context) {
    return {
        AssignmentExpression(node) {
            if (isRequire(node.left) || isWindowRequire(node.left)) {
                context.report(node, message);
            }
        },

        VariableDeclarator(node) {
            if (isRequire(node.id)) {
                context.report(node, message);
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
