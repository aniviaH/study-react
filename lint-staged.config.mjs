// export default {
//   "src/**/*.{js,jsx}": ['eslint --fix', 'prettier --write']
// }

import micromatch from 'micromatch'

// export default (allStagedFiles) => {
//   console.log('allStagedFiles---', allStagedFiles);
//   // const shFiles = micromatch(allStagedFiles, ['**/src/**/*.sh'])
//   // if (shFiles.length) {
//   //   return `printf '%s\n' "Script files aren't allowed in src directory" >&2`
//   // }
//   // const codeFiles = micromatch(allStagedFiles, ['**/*.js', '**/*.ts'])
//   // const docFiles = micromatch(allStagedFiles, ['**/*.md'])
//   // return [`eslint ${codeFiles.join(' ')}`, `mdl ${docFiles.join(' ')}`]

//   return ['eslint --fix', 'prettier --write']
// }

// lint-staged.config.js

export default {
  "src/**/*.{js,jsx}": (files) => {
    console.log('files----', files)
    // from `files` filter those _NOT_ matching `*test.js`
    // const match = micromatch.not(files, '*test.js')
    // return files.map((filename) => `prettier --write '${filename}'`)
    // return `prettier --write '${files.join(' ')}'`
    return [`eslint --fix '${files.join(' ')}'`, `prettier --write '${files.join(' ')}'`]
    // return files.map((filename) => `eslint --fix '${filename}'`)
  },
}

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
