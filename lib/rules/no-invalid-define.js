/**
 * @file    禁止无效的 `define`
 * @author  Cap Lee
 */
"use strict";

const rjs = require("../utils/rjs");

const isDefineCall = rjs.isDefineCall;
const isValidDefine = rjs.isValidDefine;

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const docs = {
    description: "Disallow invalid or undesired forms of `define`",
    category: "Possible Errors",
    recommended: true
};

const schema = [];

const message = "Invalid module definition";

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

function create(context) {
    return {
        CallExpression(node) {
            if (isDefineCall(node) && !isValidDefine(node)) {
                context.report(node, message);
            }
        }
    };
}

module.exports = {
    meta: { docs, schema },
    create
};
