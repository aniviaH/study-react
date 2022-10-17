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
    // https://eslint.bootcss.com/docs/rules/

    "comma-dangle": "off", // 尾逗号[0 = off, 1 = warn, 2 = error]

    "no-tabs": 'error', // 禁用 tab
    "no-mixed-spaces-and-tabs": "error", // 禁止空格和 tab 的混合缩进

    "react-hooks/rules-of-hooks": "error", // eslint-plugin-react-hooks 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "error", // eslint-plugin-react-hooks 检查 effect 的依赖
  }
}