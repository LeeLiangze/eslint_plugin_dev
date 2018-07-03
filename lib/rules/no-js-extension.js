/**
 * @file    禁止使用.js扩展
 * @author  Cap Lee
 */

"use strict";

const rjs = require("../utils/rjs");

const isAmdCall = rjs.isAmdCall;
const getDependencyStringNodes = rjs.getDependencyStringNodes;

// -----------------------------------------------------------------------------
// 设置
// -----------------------------------------------------------------------------

const docs = {
    description: "禁止使用.js扩展",
    category: "Possible Errors",
    recommended: true
};

const schema = [
    {
        type: "array",
        uniqueItems: true,
        items: {
            type: "string"
        }
    }
];

const message = "不要使用.js扩展";

// -----------------------------------------------------------------------------
// 帮助
// -----------------------------------------------------------------------------

const append = (str) => (val) => val + str;
const report = (context) => (node) => context.report(node, message);

const hasJsExtension  = (node) => node.value.trim().endsWith(".js");
const startsWithOneOf = (list, str) => list.some((val) => str.startsWith(val));
const hasNoPlugin     = (str) => !str.includes("!");

const shouldBeChecked = (plugins) => (node) =>
    startsWithOneOf(plugins, node.value) ||
    hasNoPlugin(node.value);

// -----------------------------------------------------------------------------
// 规则定义
// -----------------------------------------------------------------------------

function create(context) {
    const plugins = (context.options[0] || []).map(append("!"));

    return {
        CallExpression(node) {
            if (!isAmdCall(node)) return;

            getDependencyStringNodes(node)
                .filter(shouldBeChecked(plugins))
                .filter(hasJsExtension)
                .forEach(report(context));
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
