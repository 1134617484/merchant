import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store.js";
import Router from 'vue-router'
Vue.prototype.$store = store;
// 使用element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 使用三级联动
import { pca, pcaa } from 'area-data'; // v5 or higher
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage)

//使用图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from "axios";
//使用公共样式
import "./assets/css/index.css";
import "./assets/font/iconfont.css";
 
// import './assets/css/common.less'
// 使用表单规则验证
import rules from "./assets/js/rules.js";
Vue.prototype.$rules = rules

import { copyFile } from "fs";
import { log } from "util";
Vue.use(router);
Vue.config.productionTip = false;

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isLoginToken) {
    // 非法路由
    if (window.localStorage.getItem("token")) {
      next();
    } else {
      new Vue().$message({
        showClose: true,
        message: "当前登录已过期，请重新登录!",
        type: "warning"
      });
      router.push("/login");
    }
  } else {
    next();
  }
});

//异常处理
Vue.config.errorHandler = function(err, vm, info) {
  //console.log(`Error: ${err.toString()}\nInfo: ${info}`);
};


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
