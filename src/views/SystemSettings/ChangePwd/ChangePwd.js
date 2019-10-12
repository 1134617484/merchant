import { log } from "util";
import {_get,_post,_put,_delete} from "../../../api/index.js"
export default {
  // 修改密码
  name: "changePwd",
  data() {
    return {
      ruleForm: {
        // 原密码
        oldPWD: "",
        // 新密码
        newPWD: "",
         // 重复新密码
        newTowPWD: ""
      },
      // 规则
      rules: {
        oldPWD: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPWD: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        newTowPWD: [{ required: true, message: "请输入重复新密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.ruleForm.newPWD!=this.ruleForm.newTowPWD){
            this.$message({
              message: "两次密码不一致",
              type: "error"
            });
          }else{
            let params={
             old_password:this.ruleForm.oldPWD,
             password:this.ruleForm.newPWD,
             password_confirmation:this.ruleForm.newTowPWD,
           }
          _post("/merchant/user/reset-password",params).then(res => {
            if(res.data){
            this.$message({
              message: "修改密码成功",
              type: "success"
            });
          }
           })
          }
           
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
