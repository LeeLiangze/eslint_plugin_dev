/**
 * @file    禁止无效的 `require`
 * @author  Cap Lee
 */

"use strict";

const rjs = require("../utils/rjs");

const isRequireCall = rjs.isRequireCall;
const isValidRequire = rjs.isValidRequire;

// -----------------------------------------------------------------------------
// 设置
// -----------------------------------------------------------------------------

const docs = {
    description: "禁止无效的 `require`",
    category: "Possible Errors",
    recommended: true
};

const schema = [];

const message = "无效的require参数.";

// -----------------------------------------------------------------------------
// 规则定义
// -----------------------------------------------------------------------------

function create(context) {
    return {
        CallExpression(node) {
            if (isRequireCall(node) && !isValidRequire(node)) {
                context.report(node, message);
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
