# 禁止使用.js扩展 (no-js-extension)

## 规则详情

### 选择

#### 没有参数

以下情况会报错:

```js
require(['foo.js'], function (foo) {
    /* ... */
});

define(['foo.js'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('foo.js');
    /* ... */
});
```

以下情况不会报错:

```js
require(['foo'], function (foo) {
    /* ... */
});

define(['foo'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('foo');
    /* ... */
});

require(['pluginname!foo'], function (foo) {
    /* ... */
});

define(['pluginname!foo'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('pluginname!foo');
    /* ... */
});
```

#### 有参数 `[2, [ "first", "second", "third" ]]`

以下情况会报错:

```js
require(['first!foo.js'], function (foo) {
    /* ... */
});

define(['second!foo.js'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('third!foo.js');
    /* ... */
});
```

以下情况不会报错:

```js
require(['unknownplugin!foo.js'], function (foo) {
    /* ... */
});

define(['anotherunknownplugin!foo.js'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('foo');
    /* ... */
});
```
