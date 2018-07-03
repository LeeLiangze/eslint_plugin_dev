/**
 * @fileoverview no sync in ajax request
 * @author no-sync
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-sync"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-sync", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "use sync in ajax request",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
