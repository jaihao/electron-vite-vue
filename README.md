# Electron + Vite + Vue
## 简介
- Electron + Vite + Vue 项目初始化模板
- 集成了 vue-devtool 调试插件
- 纯净版工程，没有他额外功能，需要自行添加

## 适用场景
- 个人学习
- electron 项目搭建
- 有纯净版 electron 项目工程的需求

## 在本地运行
```
npm install
npm run dev
npm run build
```
## FAQ

#### 1、启动项目后，控制台输出信息
```
 ExtensionLoadWarning: Warnings loading extension at .... electron-vite-vue\vue_devtool:
 Manifest version 2 is deprecated, and support will be removed in 2023. See https://developer.chrome.com/blog/mv2-transition/ for more details
 (Use `electron --trace-warnings ...` to show where the warning was created)
 "TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))", source: node:electron/js2c/sandbox_bundle
```
是集成 vue-devtool 调试插件的关系，属于正常现象，不影响项目运行。如不需要，则将 `vue_devtool` 文件夹和 `electron/main.js` 中以下代码删除
```
session.defaultSession.loadExtension(path.resolve(__dirname, '../vue_devtool'))
```

## 效果图
![demo](https://github.com/jaihao/electron-vite-vue/assets/26615374/8a3a62b6-2086-4f77-a791-33205bcddbb4)

