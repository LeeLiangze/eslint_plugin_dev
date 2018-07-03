# 本规则旨在防止出口变量赋值，使用简化commonjs时需注意(no-assign-exports)

## 规则详情

以下情况会报错:

```js
define(function (require, exports) {
    exports = function () {
        /* ... */
    };
});

define(function (require, exports) {
    exports = {
        doSomething: function () {
            /* ... */
        }
    };
});
```

以下情况不会报错:

```js
define(function (require, exports) {
    exports.doSomething: function () {
        /* ... */
    };
});
```
