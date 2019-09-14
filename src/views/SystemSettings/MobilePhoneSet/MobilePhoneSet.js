import { log } from "util";
import {_get,_post,_put,_delete} from "../../../api/index.js"
export default {
  // 手机设置
  name: "mobilePhoneSet",
  data() {
    return {
      ruleForm: {
        // 手机号
        phone: ""
      },
      // 规则
      rules: {
        phone: [
          { required: true,validator: this.$rules.FormValidate.Form().validatePhone, trigger: 'change' }
        ]
      },
    };
  },
  created(){
      this.getFormData();
  },
  methods: {
    getFormData(){
      _get("api/phone").then(res => {
        let data=res.data.data;
        this.ruleForm.phone=data.phone;
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params={
             phone:this.ruleForm.phone,
           }
          _post("api/phone",params).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.getFormData();
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};