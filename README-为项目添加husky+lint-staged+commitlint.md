# 编码规范，代码提交规范全家桶之husky+lint-staged+commitlint

## h1工具介绍

husky，是一个为 git 客户端增加 hook 的工具。安装后，它会自动在仓库中的 .git/ 目录下增加相应的钩子；比如 pre-commit 钩子就会在你执行 git commit 的触发。我们可以在 pre-commit 中实现一些比如 lint 检查、单元测试、代码美化等操作。当然，pre-commit 阶段执行的命令当然要保证其速度不要太慢，每次 commit 等很久体验不好。

lint-staged，一个仅仅过滤出 Git 代码暂存区文件(被 git add 的文件)的工具；这个很实用，因为我们如果对整个项目的代码做一个检查，可能耗时很长，如果是老项目，要对之前的代码做一个代码规范检查并修改的话，这可能就麻烦了，可能导致项目改动很大。所以这个 lint-staged，对团队项目和开源项目来说，是一个很好的工具，它是对个人要提交的代码的一个规范和约束。

## 新版husky的工作原理

新版的husky从git 2.9开始引入一个新功能core.hooksPath，core.hooksPath可以让你指定git hooks所在的目录而不是使用默认的.git/hooks/，这样husky可以使用husky install将git hooks的目录指定为.husky/，然后使用husky add命令向.husky/中添加hook。通过这种方式我们就可以只添加我们需要的git hook，而且所有的脚本都保存在了一个地方（.husky/目录下）因此也就不存在同步文件的问题了。

## 新版husky + lint-staged实践

### 1.安装husky

```shell
npm i husky --save-dev
```

### 2.在package.json中添加prepare脚本

```json
{
  "scripts": {
    "husky-prepare": "husky install"
  }
}
```

### 3.执行prepare脚本

```shell
npm run husky-prepare
```

执行 husky install命令，该命令会创建.husky/目录并指定该目录为git hooks所在的目录。

### 4.添加git hooks，运行一下命令创建git hooks

```shell
npx husky add .husky/pre-commit "npm run lint"

> npx husky add .husky/pre-commit "npm run lint"
husky - created .husky/pre-commit
```

运行完该命令后我们会看到.husky/目录下新增了一个名为pre-commit的shell脚本。也就是说在在执行git commit命令时会先执行pre-commit这个脚本。pre-commit脚本内容如下：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
```

该脚本的功能就是执行npm run lint这个命令

### 5.安装lint-staged

```shell
npm i lint-staged --save-dev
```

### 6.在package.json文件中配置lint的命令

```json
{
  "scripts": {
    "lint": "lint-staged",
  }
}
```

### 7.在package.json 或者根目录中创建.lintstagedrc 或者lint-staged.config.js文件配置 lint-staged 的命令

从 v3.1 开始，可以使用不同的方式进行 lint-staged 配置：
lint-staged 在你的对象 package.json
.lintstagedrc JSON或YML格式的文件
lint-staged.config.js JS格式的文件
使用 --config 或 -c 标志传递配置文件

例子：在package.json文件中配置

```json
{
  "lint-staged": {
    "src/**/*.{js, vue}": ["prettier --write", "elint --cache --fix", "gid add"]
  }
}
```

例子：在lint-staged.config.js文件中配置

```js
"use strict"
module.exports = {
  ignore: ["package-lock.json", "CHANGELOG.md"],
  linters: {
    "*.ts": ["prettier --write", "eslint --fix", "git add"],
    "*.js": ["prettier --write", "eslint --cache --fix", "git add"],
    ".vue": ["prettier --write", "eslint --cache --fix", "git add"],
    "*.{json,md,yml,css}": ["prettier --write", "git add"]
  }
}
```

目的：在 commit 之前，先对暂存区的内容做一次 代码检查 和 代码美化，检查美化通过之后，再commit

### 8.添加commit-msg脚本

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

> npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
husky - created .husky/commit-msg
```

commit-msg脚本内容如下：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

### 9.定制提交规范

安装

```shell
# https://github.com/conventional-changelog/commitlint
npm install --save-dev @commitlint/config-conventoinal @commitlint/cli
```

// 生成配置文件commitlint.config.js，当然也可以是 .commitlintrc.js

```shell
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js

# echo这条命令生成的文件不是utf8格式，执行.husky/commit-msg里的命令npx --no-install commitlint --edit $1会报错
F:\react\my-react-app\commitlint.config.js:1
��m

SyntaxError: Invalid or unexpected token
    at Object.compileFunction (node:vm:352:18)
    at wrapSafe (node:internal/modules/cjs/loader:1033:15)
    at Module._compile (node:internal/modules/cjs/loader:1069:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Object.require.extensions.<computed> [as .js] (F:\react\my-react-app\node_modules\ts-node\src\index.ts:1608:43)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at importFresh (F:\react\my-react-app\node_modules\import-fresh\index.js:32:59)
    at loadJs (F:\react\my-react-app\node_modules\cosmiconfig\src\loaders.ts:15:18)
husky - commit-msg hook exited with code 1 (error)

# 需要将文件格式转成utf8 或者 删除生成的文件重新手动新建commitlint.config.js
```

定制提交格式

```shell
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

常用的type类别
build
chore
ci
docs
feat
fix
perf
refactor
revert
style
test

例子：

```shell
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'bug: 修复 xxx 功能'
```

commitlint.config.js文件配置
rule 由 name 和 配置数组 组成，如：'name:[0, 'always', 72]'
数组中第一位为level，可选0,1,2，0为disable，1为warning，2为error，
第二位为应用与否，可选always|never，
第三位该rule的值。具体配置例子如下：

```js
module.exports = {
  extends: [
    "@commitlint/config-conventional"
  ],
  rules: {
    'type-enum': [2, 'always', [
      'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'
    ]],
    'type-case': [0],
    'type-empty': [2],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}
```

### 10. 安装eslint和prettier相关代码格式化和校验插件，项目根目录下面配置eslint和prettier规则，然后就可以在git提交代码的时候进行代码校验了

```shell
npm i --save-dev prettier
npm i --save-dev eslint
```

### 11.总结整个流程

1. husky install 会创建.husky目录，并指定该目录为git hooks所在的目录。
2. 添加git hooks
  npx husky add .husky/pre-commit "npm run lint"
  npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
  
  添加后.husky目录下新增对应pre-commit，commit-msg钩子文件，在commit时会执行对应文件里的命令
3. pre-commit钩子执行命令 npm run lint
   commit-msg钩子执行命令 npx --no-install commitlint --edit
4. npm run lint 执行package.json中配置的lint命令 lint-staged
5. lint-staged通过配置找到staged任务
   package.json文件中的 lint-staged 对象
   .lintstagedrc JSON或YML格式文件
   lint-staged.config.js JS格式文件
   --config 或 -c 标志传递的配置文件

   如任务 "src/**/*.{js,jsx}": "eslint"，则会进行elint命令执行
   如任务 "src/**/*.{js, vue}": ["prettier --write", "elint --cache --fix", "gid add"] 则会依次执行多条命令
6. 如果 pre-commit钩子 执行成功，则开始执行 commit-msg钩子
7. 执行commit-msg钩子的命令 npx --no-install commitlint --edit 并将执行结果传给$1作为退出标志位(退出标志非0则commit失败)
8. commitlint 通过配置文件 commitlint.config.js 进行对提交信息进行校验，校验不通过则commit失败，校验通过则commit成功
9. 所以其中包含的技术点包括[git hooks, husky, lint-staged, commitlint, eslint, prettier]
