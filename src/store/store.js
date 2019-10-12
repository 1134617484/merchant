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
  user_data:'',
  // 几个下拉选项
    //获取类型下拉列表
    account_typeSelect:[],
    // 获取商户银行下拉列表
    bankSelect:[],
    // 获取通道下拉列表
    channelSelect:[]
  },
  mutations: mutations,
  getters: getters,
  actions: actions,
  
});
