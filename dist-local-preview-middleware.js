const connect = require('connect');
const serveStatic = require('serve-static');
const http = require('http');
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = connect();
const config = {
    target: 'http://localhost:9093',
    port: 3001,
    host: '0.0.0.0',
    dir: '../dist',
    prefix: '/api',
    publicPath: '/'
};

const proxyConfigMiddleware = {
    target: config.target,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
        ['^' + config.prefix]: ''
    }
};

const proxyMiddleware = createProxyMiddleware(proxyConfigMiddleware);

app.use(config.prefix, proxyMiddleware);

app.use(
    config.publicPath,
    serveStatic(config.dir, {
        index: ['index.html', '/']
    })
);


http.createServer(app).listen(config.port, config.host);

require('open')('http://localhost:' + config.port);
