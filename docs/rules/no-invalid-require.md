# 禁止无效的 `require` (no-invalid-require)

## 规则详情

以下情况会报错:

```js
// String literal for dependency list
require('foo', function (foo) {
    /* ... */
});

// Missing dependency list
require(function () {
    /* ... */
});

// `define` was probably what was intended here
require({
    foo: 'bar'
});
```

以下情况不会报错:

```js
// Dependency list provided as array
require(['foo'], function (foo) {
    /* ... */
});

// `require` inside Simplified CommonJS Wrapper
define(function (require) {
    var foo = require('foo');
    /* ... */
});
```
