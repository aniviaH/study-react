# cra项目部署

## 执行build

cra项目进行生产环境的构建时，执行react-scripts build命令，可以进行部署环境的配置

官方文档：<https://create-react-app.dev/docs/deployment/#github-pages>

1. 添加 package.json 文件的 homepage字段

    ```json
    "homepage": "https://aniviah.github.io/study-react/",
    ```

2. 安装 gh-pages, 并添加 deploy 的 scripts 命令

    ```bash
    npm install --save gh-pages
    ```

    ```bash
    {
      "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
      }
    }
    ```

    deploy 命令执行之前会自动执行 predeploy 命令
3. 执行 npm run deploy 进行站点部署
  
    ```bash
    npm run deploy
    ```

    执行完命令，会为项目添加一个单独的分支，分支内容只会包含 gh-pages 命令中 -d 指定的目录的文件（这里就是 build 目录）
4. 对于是 项目页面，确保项目的 settings 中关于 github pages 的设置中是使用 gh-pages 分支
5. 其他的就是对 github pages 的设置了

- 项目 -> Settings -> Code and automation - Pages -> 选择 Source 和 Branch, 项目更新时会自动触发项目的 Actions 部署
  
  官方文档：<https://docs.github.com/en/pages/quickstart>
