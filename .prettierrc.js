module.exports = {
	// 最大行长
	printWidth: 80,

	// 指定每个缩进级别的空格数 需useTabs为false才生效
	tabWidth: 2,

	// 使用制表符而不是空格缩进行
	useTabs: false,

	// 使用单引号而不是双引号
	singleQuote: true,

	// 在语句的末尾打印分号
	semi: false,

	// 在多行逗号分隔的句法结构中尽可能打印尾随逗号
	// "es5"- 在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 中的类型参数中没有尾随逗号。
	// "none"- 没有尾随逗号。
	// "all"- 尽可能使用尾随逗号（包括函数参数和调用）。要运行，以这种方式格式化的 JavaScript 代码需要一个支持 ES2017（Node.js 8+ 或现代浏览器）或下级编译的引擎。这还可以在 TypeScript 中的类型参数中启用尾随逗号（自 2018 年 1 月发布的 TypeScript 2.7 起支持）。
	trailingComma: 'es5',
};
