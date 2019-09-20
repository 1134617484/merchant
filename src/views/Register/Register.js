import store from "../../store/store.js";
import { userLogin, getUserMsg } from "../../api/index.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      auth_code: "",
      loading: store.state.isLodingLogin,
      emil:'',
      newpassword:''
    };
  },
  name: "login",
  methods: {
    // 登录
    register() {
      let { username, password,emil ,newpassword} = this;
      let reg={
        // username:new RegExp(/^[a-zA-Z0-9_-]{4,16}$/),
        // password:new RegExp(/^.(?=.{6,16})(?=.\d)(?=.[A-Z])(?=.[a-z])(?=.*[!@#%^&*? ]).*/),
        // emil:new RegExp(/^([A-Za-z0-9_-.])+@([A-Za-z0-9_-.])+.([A-Za-z]{2,4})$/),
        // newpassword:''
      }
      if (!username || !password) {
        return this.$message({
          message: "账户和密码不能为空",
          type: "warning"
        });
      }else if(!emil){
        return this.$message({
          message: "邮箱不能为空",
          type: "warning"
        });
      } else if (password !== newpassword) {
        return this.$message({
          message: "两次密码不一致",
          type: "warning"
        });
      } else if (
        (password.length < 6 && password.length > 16) ||
        (newpassword.length < 6 && newpassword.length > 16)
      ) {
        // loading加载
        return this.$message({
          message: "请输入6-16位密码",
          type: "warning"
        });
      } else {
        store.state.isLodingLogin = true;
        // 请求注册借口  定时器5s后自动返回登录页
      }
    },
    // 登录
    login() {
      this.$router.push("/login");
    }
  },
  computed: {
    // 登录动画
    isLoading() {
      return store.state.isLodingLogin;
    }
  },
  created() {
    window.localStorage.removeItem("userInfo");
  }
};
