"use strict";

module.exports = {
    rules: {
        "no-invalid-require": require("./lib/rules/no-invalid-require"),
        "no-invalid-define": require('./lib/rules/no-invalid-define'),
        "no-assign-exports": require("./lib/rules/no-assign-exports"),
        "no-js-extension": require("./lib/rules/no-js-extension"),
        "no-assign-require": require("./lib/rules/no-assign-require"),
        "amd-function-arity": require("./lib/rules/amd-function-arity"),
        'no-ajax': require('./lib/rules/no-ajax'),
        'no-proxy': require('./lib/rules/no-proxy'),
        'no-activeXObject': require('./lib/rules/no-activex'),
        'no-alert': require('./lib/rules/no-alert'),
        'no-collectgarbage': require('./lib/rules/no-collectgarbage'),
        'no-sync': require('./lib/rules/no-sync')
    },
    configs: {
        recommended: {
            env: {
                amd: true
            },
            rules: {
                "cmos/no-invalid-require": "error",
                "cmos/no-invalid-define": "error",
                "cmos/no-assign-exports": "error",
                "cmos/no-js-extension": "error",
                "cmos/no-ajax": 2,
                "cmos/no-proxy": 2,
                "cmos/no-activeXObject": 2,
                "cmos/no-alert": 2,
                "cmos/no-collectgarbage": 2,
                "cmos/no-sync": 1,
            }
        }
    }
};
