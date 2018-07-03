/**
 * @file    本规则旨在防止出口变量赋值，使用简化commonjs时需注意
 * @author  Cap Lee
 */

"use strict";

const ast = require("../utils/ast");
const rjs = require("../utils/rjs");

const ancestor = ast.ancestor;
const isCommonJsWrapper = rjs.isCommonJsWrapper;

// -----------------------------------------------------------------------------
// 设置
// -----------------------------------------------------------------------------

const docs = {
    description: "禁止使用export",
    category: "Possible Errors",
    recommended: true
};

const schema = [];

const message = "使用不规则的分配 `exports`.";

// -----------------------------------------------------------------------------
// 帮助
// -----------------------------------------------------------------------------

const assignsToExports = (node) =>
    node.left.type === "Identifier" &&
    node.left.name === "exports";

// -----------------------------------------------------------------------------
// 规则定义
// -----------------------------------------------------------------------------

function create(context) {
    return {
        AssignmentExpression(node) {
            if (assignsToExports(node) && ancestor(isCommonJsWrapper, node)) {
                context.report(node, message);
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
