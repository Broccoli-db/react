const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/jian",
    createProxyMiddleware({
      target: "https://www.jianshu.com/asimov",
      changeOrigin: true,
      pathRewrite: {
        "^/jian": "",
      },
    })
  );
  app.use(
    "/zhi",
    createProxyMiddleware({
      target: "https://news-at.zhihu.com/api/4",
      changeOrigin: true,
      pathRewrite: {
        "^/zhi": "",
      },
    })
  );
};
