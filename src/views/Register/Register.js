import store from "../../store/store.js";
import { _get, _post, _put, _delete , emailReg, LoginPasswordReg, PayPasswordReg } from "../../api/index.js";

export default {
  data() {
    // 再次确认密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.numberValidateForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      numberValidateForm: {
        username: "",
        password: "",
        emil: "",
        newpassword: ""
      },
      loading: store.state.isLodingLogin,

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateUsername,
            trigger: "change"
          }
        ],
        emil: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateEmail,
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePsdReg,
            trigger: "change"
          },
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        newpassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  name: "login",
  methods: {
    // 登录
    register() {
      let { username, password, emil, newpassword } = this.numberValidateForm;
      let reg = {
        username: new RegExp(/^[a-zA-Z0-9_-]{4,10}$/),
        password: LoginPasswordReg,
        emil: emailReg
      };
      if (!reg.username.test(username)) {
        return this.$message({
          message: "请输入4-10位用户名",
          type: "warning"
        });
      } else if (!reg.password.test(password)) {
        return this.$message({
          message: "请输入6-16位数字或字母的密码",
          type: "warning"
        });
      } else if (!reg.emil.test(emil)) {
        return this.$message({
          message: "请输入合法的邮箱",
          type: "warning"
        });
      } else if (password !== newpassword) {
        return this.$message({
          message: "两次密码不一致",
          type: "warning"
        });
      } else {
        let parse = {
          username,
          email: emil,
          password,
          password_confirmation: newpassword
        };
        this.loading = true;
        store.state.isLodingLogin = true;
        _post("/merchant/user", parse).then(res => {
          store.state.isLodingLogin = false;
          if (res.code == "200") {
            return this.$message({
              message: "注册成功,前往邮箱激活后方可登录",
              type: "warning"
            });
          } else {
            return this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }
    },
    // 登录
    login() {
      this.$router.push("/login");
    },
    inputChange() {
      //console.log(11);
      this.newpassword = this.newpassword.replace(/[\W]/g, "");
    },
    getRoleMsg() {}
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
