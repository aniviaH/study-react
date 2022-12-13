export default {
  "src/**/*.{js,jsx}": ['eslint', 'prettier --write']
}

import micromatch from 'micromatch'

/**
 * 使用函数的形式配置
 * https://github.com/okonet/lint-staged#using-js-configuration-files
 * Writing the configuration file in JavaScript is the most powerful way to configure lint-staged (lint-staged.config.js, similar, or passed via --config). From the configuration file, you can export either a single function or an object.

If the exports value is a function, it will receive an array of all staged filenames. You can then build your own matchers for the files and return a command string or an array of command strings. These strings are considered complete and should include the filename arguments, if wanted.

If the exports value is an object, its keys should be glob matches (like in the normal non-js config format). The values can either be like in the normal config or individual functions like described above. Instead of receiving all matched files, the functions in the exported object will only receive the staged files matching the corresponding glob key.
 */


// export default (allStagedFiles) => {
//   console.log('allStagedFiles---', allStagedFiles);
//   // const shFiles = micromatch(allStagedFiles, ['**/src/**/*.sh'])
//   // if (shFiles.length) {
//   //   return `printf '%s\n' "Script files aren't allowed in src directory" >&2`
//   // }
//   // const codeFiles = micromatch(allStagedFiles, ['**/*.js', '**/*.ts'])
//   // const docFiles = micromatch(allStagedFiles, ['**/*.md'])
//   // return [`eslint ${codeFiles.join(' ')}`, `mdl ${docFiles.join(' ')}`]

//   return ['eslint --fix', 'prettier --write'] // exports是函数形式，或者对象形式但glob里的value是函数形式，命令需要是完整的，如果需要文件参数则必须包含文件参数，否则执行不生效
// }

// lint-staged.config.js

// export default {
//   "src/**/*.{js,jsx}": (files) => {
//     console.log('files----', files)
//     // from `files` filter those _NOT_ matching `*test.js`
//     // const match = micromatch.not(files, '*test.js')
//     // return files.map((filename) => `prettier --write '${filename}'`)
//     // return `prettier --write '${files.join(' ')}'`
//     return [`eslint --fix '${files.join(' ')}'`, `prettier --write '${files.join(' ')}'`]
//     // return files.map((filename) => `eslint --fix '${filename}'`)
//   },
// }

/**
 * eslint 命令查看 npx eslint --help
 * eslint [options] file.js [file.js] [dir]
 * --fix                           Automatically fix problems
 */

/**
 * prettier 命令查看 npx prettier --help
 * Usage: prettier [options] [file/dir/glob ...]
 * -w, --write              Edit files in-place. (Beware!) 就地编辑文件
 */
