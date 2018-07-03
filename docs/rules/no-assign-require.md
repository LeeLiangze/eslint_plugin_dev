# 禁止使用 `require` 或者 `window.require` (no-assign-require)

## 规则详情

以下情况会报错:

```js
var require = {
    /* ... config ... */
};

window.require = {
    /* ... config ... */
}
```

以下情况不会报错:

```js
// Not a potential overwrite
foo.require = 'bar';
```
