import axios from "axios";
import { Promise } from "q";
import Vue from "vue";
import router from "../router/router";
import store from "../store/store.js";

// const ephemeral= require('./ephemeral.js')
import {ephemeral_data} from './ephemeral'
export const ephemeral=ephemeral_data;


// 解决post二次请求(options=>post)
import qs from "qs";

//设置默认请求头
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest"
};
// axios.defaults.baseURL = "http://www.xsyvisa.com/";

/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === "production") {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === "pro") {
    //production 生产环境
    axios.defaults.baseURL = "http://api.xinggeyun.com";
  } else {
    //test 测试环境
    axios.defaults.baseURL = "http://api.emide.cn";
  }
} else {
  //dev 开发环境
  axios.defaults.baseURL = "http://192.168.2.23";
}

//拦截器
let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(
  config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]("操作取消");
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    // 携带token
    // 登录请求不携带 /api/token/login
    if (config.url != "/api/token/login"||config.url != "merchant/user"||config.url!="merchant/token/login") {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// token 处理
let tokenHeader = options => {
  let { response, code } = options;
  let message = options.message ? options.message : response.message;
  if (response.code == code) {
    // 清除userInfo缓存 token
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("token");
    store.state.isLodingLogin = false;
    router.push("/login");
  }
};

//响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    // 异常处理
    if (err && err.response) {
      let response = err.response.data;
      console.log("统一错误处理: ", response);
      response.code == 402 ? tokenHeader({ response, code: "402" }) : "";
      store.state.isLodingLogin = false;
      new Vue().$message({
        showClose: true,
        duration: 1000,
        message: response.message,
        type: "warning"
      });
    }

    return Promise.reject(err);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function _get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function _post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function _patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function _put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function _delete(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

// 登录
export const userLogin = params => {
  return _post("/merchant/token/login", params);
};
// 获取用户信息
export const getUserMsg = () => {
  return _get("merchant/user/profile");
};
// 添加角色信息
export const addRoleMsg = params => {
  return axios.post("/api/role", params);
};
// 获取角色信息
export const getRoleMsg = () => {
  return axios.get("/api/role");
};
// 获取分页数据
export const getRolePageMsg = params => {
  return axios.get("/api/role", { params });
};
// 编辑角色信息
export const editRoleMsg = params => {
  return axios.put("/api/role/" + params.id, params);
};
//切换状态
export const switchRoleMsg = params => {
  return axios.get("api/role/select", params);
};
// 获取类型下拉列表
export const account_typeSelect=()=>{
  return axios.get("merchant/account-type/select");
}
// 获取商户银行下拉列表
export const bankSelect=()=>{
  return axios.get("merchant/bank/select");
}
// 获取通道下拉列表
export const channelSelect=()=>{
  return axios.get("merchant/channel/select");
}
//获取通道分类
export const paytypeSelect=()=>{
  return axios.get("api/paytype/select");
}

  


// 时间处理
export const switchTime=time=> {
  let date = new Date(time * 1000);
  let y = date.getFullYear() + "-";
  let m =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let d =
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let h = date.getHours();
   h=h<10?'0'+h:h;
  let mm = date.getMinutes();
  mm=mm<10?'0'+mm:mm;
  let s = date.getSeconds();
  s=s<10?'0'+s:s;
  let updated_at = y + m + d + h + ":" + mm + ":" + s;
  return updated_at;
}


//递归实现
//@leafId  查找的属性值 {'name':'','value':value}，
//@nodes   原始Json数据
//@path    供递归使用

export function findPathByLeafId(leafId, nodes, path) {
  console.log(leafId)
  console.log(nodes)
  nodes=nodes.data;
  debugger;
  let name=leafId.name;
  let value=leafId.value;
  if(path === undefined) {
    path = [];
  }
  for(var i = 0; i < nodes.length; i++) {
      // var tmpPath = path.concat();
      var tmpPath = [];
      // tmpPath.push(nodes[i][name]);
      console.log(nodes[i][name])
      console.log(nodes[i])
      if(value == nodes[i][name]) {
        console.log(nodes[i])
         return nodes[i];
      }
      if(nodes[i].children.length>0) {
       
        for (let b = 0; b < nodes[i].children.length; b++) {
          let element;
          if(nodes[i].children[b].children.length>0){
            element= nodes[i].children[b].children;
          }else{
            element= nodes[i].children;
          }
          console.log(element)
          var findResult = findPathByLeafId(leafId, element, path);
        if(findResult) {
          return findResult;
        }
        }
        
      }
  }
}
