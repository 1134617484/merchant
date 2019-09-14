const mockdata = require("./mock/test.json");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  devServer: {
    port: 8080,
    before(app) {
      app.get("/someUrl", (req, res, next) => {
        res.json(mockdata);
      });
    },
    proxy: { // 配置跨域
      "/api": {
        target: "http://192.168.2.200", //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  outputDir: process.env.outputDir // 打包生成目录
};
