# eslint-plugin-cmos

## 开发插件
````
npm install -g yo generator-eslint
yo
````

## 安装

    $ npm install eslint -g
    $ npm isntall eslint-plugin-cmos -D

## 设置

添加`plugins`:

````
{
  "plugins": [
    "cmos"
  ]
}
````

添加需要的检测:

````
{
  "rules": {
    "cmos/no-invalid-define": 2,
    "cmos/no-multiple-define": 2,
    "cmos/no-named-define": 2,
    "cmos/no-commonjs-wrapper": 2,
    "cmos/no-object-define": 1
  }
}
````

## 规则详情


| Rule | Description |
| :--- | :---------- |
| [no-invalid-require](docs/rules/no-invalid-require.md) | 禁止无效的 `require` |
| [no-assign-exports](docs/rules/no-assign-exports.md) | 禁止使用commonjs中的exports，避免出口变量赋值 |
| [no-js-extension](docs/rules/no-js-extension.md) | 禁止使用.js扩展 |
| [no-assign-require](docs/rules/no-assign-require.md) |  禁止使用 `require` 或者 `window.require` |
| [amd-function-arity](docs/rules/amd-function-arity.md) | 本规则旨在确保AMD回调有正确数量的参数,以避免混淆与可维护性的问题 |
| [no-ajax] | 禁止 |
| [no-proxy] | 禁止 |
