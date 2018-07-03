/**
 * @file    本规则旨在确保AMD回调有正确数量的参数,以避免混淆与可维护性的问题。
 * @author  Cap Lee
 */

"use strict";

const rjs = require("../utils/rjs");
const ast = require("../utils/ast");

const hasCallback = ast.hasCallback;
const getDependencyNodes = rjs.getDependencyNodes;
const getModuleFunction = rjs.getModuleFunction;
const isAmdDefine = rjs.isAmdDefine;
const isRequireCall = rjs.isRequireCall;

// -----------------------------------------------------------------------------
// 设置
// -----------------------------------------------------------------------------

const docs = {
    description: "确保AMD回调有正确数量的参数",
    category: "Stylistic Choices",
    recommended: false
};

const schema = [
    {
        type: "object",
        properties: {
            allowExtraDependencies: {
                anyOf: [
                    {
                        type: "boolean",
                        default: false
                    },
                    {
                        type: "array",
                        uniqueItems: true,
                        items: {
                            type: "string"
                        }
                    }
                ]
            }
        },
        additionalProperties: false
    }
];

const defaults = {
    allowExtraDependencies: false
};

// -----------------------------------------------------------------------------
// 帮助
// -----------------------------------------------------------------------------

const isBoolean  = (value) => typeof value === "boolean";
const unassigned = (paths, params) => paths.slice(params.length);
const includes   = (list) => (path) => list.indexOf(path.value) !== -1;

const isAmdWithCallback = (node) =>
    isAmdDefine(node) || isRequireCall(node) && hasCallback(node);

const reportTooFew = (expected, actual) =>
    `回调参数不足 (expected ${expected}, found ${actual}).`;

const reportTooMany = (expected, actual) =>
    `过多的回调参数 (expected ${expected}, found ${actual}).`;

// -----------------------------------------------------------------------------
// 规则定义
// -----------------------------------------------------------------------------

function create(context) {
    const opts = Object.assign({}, defaults, context.options[0]);
    const allowed = opts.allowExtraDependencies;

    const isAllowed = (paths) =>
        isBoolean(allowed) ? allowed : paths.every(includes(allowed));

    return {
        CallExpression(node) {
            if (!isAmdWithCallback(node)) return;

            const paths = getDependencyNodes(node);
            const pathCount = paths.length;

            if (!pathCount) return;

            const params = getModuleFunction(node).params;
            const paramCount = params.length;

            if (pathCount < paramCount) {
                context.report(node, reportTooMany(pathCount, paramCount));
            }

            if (pathCount > paramCount && !isAllowed(unassigned(paths, params))) {
                context.report(node, reportTooFew(pathCount, paramCount));
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
