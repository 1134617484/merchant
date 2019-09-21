import store from "../../store/store.js";
import { _get, _post, _put, _delete } from "../../api/index.js"
export default {
  data() {
    return {
      username: "",
      password: "",
      auth_code: "",
      loading: store.state.isLodingLogin,
      emil:'',
      newpassword:'',
    };
  },
  name: "login",
  methods: {
    // 登录
    register() {
      let { username, password,emil ,newpassword} = this;
      let reg={
        // username:new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{4,10}$/),
        username:new RegExp(/^[a-zA-Z0-9_-]{4,10}$/),
        // password:new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/),
        password:new RegExp(/^[a-zA-Z0-9_-]{6,16}$/),
        emil:new RegExp(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/)
      }
      if(!reg.username.test(username)){
        return this.$message({
          message: "请输入4-10位用户名",
          type: "warning"
        });
      }else if(!reg.password.test(password)){
        return this.$message({
          message: "请输入6-16位数字或字母的密码",
          type: "warning"
        });
      }else if(!reg.emil.test(emil)){
        return this.$message({
          message: "请输入合法的邮箱",
          type: "warning"
        });
      }else if(password !== newpassword){
        return this.$message({
          message: "两次密码不一致",
          type: "warning"
        });
      }
      console.log(reg.username.test(username))
      console.log(reg.password.test(password))
      console.log(reg.emil.test(emil))
      let parse={
        username,
        email:emil,
        password,
        password_confirmation:newpassword
      }
      this.loading=true;
      store.state.isLodingLogin = true;
      _post("/merchant/user",parse).then(res => {
        console.log(res)
      store.state.isLodingLogin = false;
        if(res.code=='200'){
          return this.$message({
            message: "注册成功,前往邮箱激活后方可登录",
            type: "warning"
          });
        }else{
          return this.$message({
            message: res.message,
            type: "warning"
          });
        }
      })
      
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
