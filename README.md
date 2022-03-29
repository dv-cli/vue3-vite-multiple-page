## 前言

本项目是一个 vue3+vite+ts 的多页面（MPA）模板，支持单独模块打包，支持本地开发只编译单独模块，同时，也支持多模块一起打包和本地编译。

## 项目说明

- 执行指令 yarn dev，直接访问`http://localhost:5238`会报找不到页面，这是因为在`.env`文件中把`VITE_APP_ROOTPATH`设置为了`./src/modules/`，所以需要通过`http://localhost:5238/main/`和`http://localhost:5238/minor/`才能分别访问到`main`和`minor`模块。当然，如果你觉得这样不友好，你可以自行`VITE_APP_ROOTPATH`的值为`./`，这就可以通过访问目录结构第一层的`index.html`跳转到其他模块中。
- 执行指令 yarn build，打包出来文件同时包含 main 和 minor 模块，也需要通过在域名后分别加上`main`和`minor`上下文根，才能分别访问到`main`和`minor`模块。

## 技术栈

- vue3.2+Ts+Vite
- [axios（ajax 请求）](https://www.kancloud.cn/yunye/axios/234845)
- [naive-ui(UI 组件库)](https://www.naiveui.com/zh-CN/dark/docs/introduction) 尤大推荐
- [vueuse(强大的函数库)](https://vueuse.org/) 尤大推荐

## 开发运行

```bash
    # 安装依赖
    yarn install

    # 本地开发 开启所有模块服务
    yarn dev

    # 本地开发 开启单个模块
    yarn main
    yarn minor

    # 所有模块一起打包
    yarn build

    # 单独模块打包
    yarn build:main
    yarn build:minor


```

## 目录结构

```
├── public (存放公共文件)
│ └── favicon.ico
├── src
│ ├── assets (公共资源)
│ │ ├── logo.png
│ │ └── ...
│ ├── components (业务组件)
│ │ └── ...
│ ├── modules (业务模块)
│ │ ├── main (业务模块 1)
│ │ │ ├── router
│ │ │ ├── store
│ │ │ ├── view
│ │ │ ├── App.vue
│ │ │ ├── index.html
│ │ │ └── main.ts
│ │ ├── minor (业务模块 2)
│ │ │ ├── App.vue
│ │ │ ├── index.html
│ │ │ └── main.ts
│ ├── service (公共服务)
│ │ ├── api
│ └─└── http.ts
├── index.html
├── package.json
├── README.md
├── tsconfig.ts
└── vite.config.ts
```

## 本项目 git Commit message 统一规范

使用[Angular 团队提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)

常用的修改项

- feat: 增加新功能
- fix: 修复问题/BUG
- style: 代码风格相关无影响运行结果的
- perf: 优化/性能提升
- refactor: 重构
- revert: 撤销修改
- test: 测试相关
- docs: 文档/注释
- chore: 依赖更新/脚手架配置修改等
- workflow: 工作流改进
- ci: 持续集成
- types: 类型定义文件更改
- wip: 开发中

**[⬆ 返回顶部](#技术栈)**
