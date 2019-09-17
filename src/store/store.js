import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfo:'',
    // 登录动画
    isLodingLogin: false,
    //路由信息
    url:"",
    title:"",
    // 用户登录信息
  user_data:''
  },
  mutations: mutations,
  getters: getters,
  actions: actions,
  
});
