# 本规则旨在确保AMD回调有正确数量的参数,以避免混淆与可维护性的问题(amd-function-arity)

## 选项

这条规则需要一个选择,一个对象与allowExtraDependencies的关键。这个可以有一个布尔值(缺省为false)或命名允许依赖路径作为字符串数组。

````
    "cmos/amd-function-arity": [2, { "allowExtraDependencies": true }]
````


````
    "cmos/amd-function-arity": [2, { "allowExtraDependencies": ["a", "b"] }]
````


### 不允许多余依赖

以下是会报错的情况:

````
/* eslint cmos/amd-function-arity: [2, { "allowExtraDependencies": false }] */

define(["a", "b"], function (a, b, c) {
    // ...
});

define(["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

require(["a", "b"], function (a) {
    // ...
}, function (err) { });

require("a", function () {
    // ...
});

require("a", function (a, b) {
    // ...
});

````

以下情况不会报错:

````
/* eslint cmos/amd-function-arity: [2, { "allowExtraDependencies": false }] */

define(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
}, function (err) { });

require("a", function (a) {
    // ...
});

require("a", function (a) {
    // ...
}, function (err) { });
````

#### 允许多余的依赖

以下情况会报错:

````
/* eslint cmos/amd-function-arity: [2, { "allowExtraDependencies": true }] */

define(["a", "b"], function (a, b, c) {
    // ...
});

define("my-module", ["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

require("a", function (a, b) {
    // ...
});
````

以下情况不会报错:

````
/* eslint cmos/amd-function-arity: [2, { "allowExtraDependencies": false }] */

define(["a", "b"], function (a) {
    // ...
});

define(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
}, function (err) { });

require(["a", "b"], function (a, b) {
    // ...
}, function (err) { });

require("a", function () {
    // ...
}, function (err) { });

require("a", function (a) {
    // ...
}, function (err) { });
````

#### 允许多余的命名依赖

以下情况会报错:

````
/* eslint cmos/amd-function-arity: [2, { "allowExtraDependencies": ["x", "y", "z"] }] */

define(["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

require("a", function (a, b) {
    // ...
});

````

以下情况不会报错:

````
/* eslint cmos/amd-function-arity: [2, { "allowExtraDependencies": ["a", "b"] }] */

define(["a", "b"], function (a) {
    // ...
});

define(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
}, function (err) { });

require(["a", "b"], function (a, b) {
    // ...
}, function (err) { });

require("a", function () {
    // ...
});

require("a", function (a) {
    // ...
});

require("a", function () {
    // ...
}, function (err) { });

require("a", function (a) {
    // ...
}, function (err) { });
````

## 什么时候不使用

如果你不关心潜在错误使用额外的(定义)回调参数和不关心只需要依赖的副作用,你可以禁用这个规则。
