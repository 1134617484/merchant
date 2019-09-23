import store from "../../store/store.js";
import { userLogin, getUserMsg } from "../../api/index.js";
export default {
  data() {
    return {
      username: "acoll",
      password: "123456",
      auth_code:"",
      loading: store.state.isLodingLogin,
      radio:"0",
      radio_on:require("@/assets/images/login/login_on.png"),
      radio_off:require("@/assets/images/login/login_off.png")
    };
  },
  name: "login",
  methods: {
    // 登录
    login() {
      let { username, password } = this;
      if (!username || !password) {
        return this.$message({
          message: "账户和密码不能为空",
          type: "warning"
        });
      }
      // 密码长度
      if (password.length >= 6 && password.length <= 16) {
        // loading加载
        store.state.isLodingLogin = true;
        userLogin({ username, password }).then(res => {
          // 登录失败
          if (res.code != 200) {
            setTimeout(() => {
              store.state.isLodingLogin = false;
              this.$message({
                showClose: true,
                message: res.message,
                type: "error"
              });
              // 清空账户名和密码
              this.username = this.password = "";
            }, 200);
            return;
          }
          // 本地存储token
          localStorage.setItem("token", res.data.access_token);
          // localStorage.setItem("user", res.data.access_token);

          // 用户信息缓存本地
          getUserMsg().then(res => {
            if (res.data.code == 200) {
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.data)
               );
                store.state.isLodingLogin = false;
                store.state.user_data=res.data.data;
                this.$router.push("/index");
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success"
                });
            }
          });
           
          return;
        }
        );
        return;
      }
      // 验证密码长度
      this.password = "";
      return this.$message({
        message: "密码长度为6-16位数字或字母",
        type: "warning"
      });
    },
    changeRedio(){
      this.radio=='0'?this.radio='1':this.radio='0';
    },
    // 注册
    register(){
      this.$router.push("/register");
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
    window.localStorage.removeItem("token");
  }
};
