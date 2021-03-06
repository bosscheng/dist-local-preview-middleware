# dist-local-preview-middleware
 dist local preview middleware


# 背景

由于`http-proxy` 不支持 `pathRewrite` 参数，所以没得办法只能通过 `http-proxy-middleware`插件来实现。


项目所依赖的

- connect
- serve-static
- http-proxy-middleware
- http
- open



引用依赖
```
const connect = require('connect');
const serveStatic = require('serve-static');
const http = require('http');
const {createProxyMiddleware} = require('http-proxy-middleware');
```


基本配置

```
const config = {
    target: 'http://xx.xx.xx.xx',
    port: 3001,
    host: '0.0.0.0',
    dir: '../dist',
    prefix: '/api',
    publicPath: '/'
};
```

http-proxy-middleware 配置

```
const proxyConfigMiddleware = {
    target: config.target,
    changeOrigin: true,
    logLevel: 'debug',
    // path rewrite 
    pathRewrite: {
        ['^' + config.prefix]: ''
    }
};
```


利用 `createProxyMiddleware` 方法创建 proxyMiddleware
```
const proxyMiddleware = createProxyMiddleware(proxyConfigMiddleware);

```

配置本地的http server
```
app.use(config.prefix, proxyMiddleware);
app.use(
    config.publicPath,
    serveStatic(config.dir, {
        index: ['index.html', '/']
    })
);

http.createServer(app).listen(config.port, config.host);
```


调用 `open` 打开默认浏览器
```
require('open')('http://localhost:' + config.port);
```




