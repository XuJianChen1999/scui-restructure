# scui 重构版


## Customary
1. 代码原仓库：scui原仓库代码 (https://gitee.com/lolicode/scui)
2. 预览地址：在线预览地址 (https://lolicode.gitee.io/scui-doc/demo/#/dashboard)

## Different
1. 与原版不同的是，本次重构采用了setup语法 + hooks + pinia

2. 原版虽然使用了vue3，但是写法上还是延续了Options API，并没有充分发挥出Composition API的优势

3. scui原版的代码中由于采用了Options API，全局的实例挂载了太多，每次刷新都会加载，不太友好

4. 对缓存、请求、工具库做了抽离化的封装
## Different
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
