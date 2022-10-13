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