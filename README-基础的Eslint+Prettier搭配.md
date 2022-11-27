# 基础的eslint + prettier的搭配

## 可直接使用的搭配模板

.eslintrc.js
module.exports = {
  "parserOptions": {
    // "ecmaVersion": 6,
    "ecmaVersion": 'latest', // es规范版本
    "sourceType": "module", // 文件模块
    "ecmaFeatures": {
      "jsx": true, // 针对jsx
    }
  },
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "comma-dangle": "off", // 尾逗号[0 = off, 1 = warn, 2 = error]
    "react-hooks/rules-of-hooks": "error", // eslint-plugin-react-hooks 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // eslint-plugin-react-hooks 检查 effect 的依赖
  }
}

.prettierrc.js
module.exports = {
  // 最大行长
  printWidth: 80,

  // 指定每个缩进级别的空格数 需useTabs为false才生效
  tabWidth: 2,
  
  // 使用制表符而不是空格缩进行
  useTabs: true,

  // 使用单引号而不是双引号
  singleQuote: true,

  // 在语句的末尾打印分号
  semi: true,

  // 在多行逗号分隔的句法结构中尽可能打印尾随逗号
  // "es5"- 在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 中的类型参数中没有尾随逗号。
  // "none"- 没有尾随逗号。
  // "all"- 尽可能使用尾随逗号（包括函数参数和调用）。要运行，以这种方式格式化的 JavaScript 代码需要一个支持 ES2017（Node.js 8+ 或现代浏览器）或下级编译的引擎。这还可以在 TypeScript 中的类型参数中启用尾随逗号（自 2018 年 1 月发布的 TypeScript 2.7 起支持）。
  trailingComma: 'es5',
}

加上.vscode/settings.json的编辑器配置，控制是否自动保存及保存时自动格式化
{
  // 是否自动保存
  "files.autoSave": "off",
  // 设置自动保存文件前需要延迟的时间，单位毫秒 默认1000
  "files.autoSaveDelay": 5000,
  // 设置 读写文件时所用编码 默认utf-8，可针对每种语言进行设置
  "files.encoding": "utf8",

  // 保存时自动格式化
  // "editor.formatOnSave": true,
  // 使用prettier配置文件
  // "prettier.configPath": "./.prettierrc.js",
  // 使用prettier作为默认格式化工具
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

配置package.json scripts

```js
scripts {
  <!-- "lint-0": "eslint --ext .js src/", -->
  "lint": "eslint \"src/**/*.{js,vue}\"",
  "lint-fix": "eslint --fix \"src/**/*.{js,vue}\""
}
```
