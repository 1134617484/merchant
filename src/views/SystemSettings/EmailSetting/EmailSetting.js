import { log } from "util";
import {_get,_post,_put,_delete} from "../../../api/index.js"
export default {
  // 邮件设置
  name: "emailSetting",
  data() {
    return {
      ruleForm: {
        // smtp服务器
        smtp_host: "",
        // smpt端口
        smtp_port: "",
        // smpt用户名
        smtp_user: "",
        // smpt密码
        smtp_pass: "",
        // 发件人Email
        smtp_email: "",
        // 发件人姓名
        smtp_name:""
      },
      rules: {
        smtp_host: [
          { required: true, validator: this.$rules.FormValidate.Form().validateIp, trigger: 'change' }
        ],
        smtp_user:[
          { required: true, message: "请输入smpt用户名", trigger: 'change'}
        ],
        smtp_name:[
          { required: true, message: "请输入发件人姓名", trigger: 'change'}
        ],
        smtp_email: [
          { required: true, validator: this.$rules.FormValidate.Form().validateEmail, trigger: 'change' }
        ],
        senderName:[
          { required: true, validator: this.$rules.FormValidate.Form().validateChinese, trigger: 'change' }
        ],
        smtp_pass: [
          { required: true, validator: this.$rules.FormValidate.Form().validatePsdReg, trigger: 'change'}
        ],
        smtp_port:[
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change'}
        ]
      }
    };
  },
  created(){
      this.getFormData();
  },
  methods: {
    getFormData(){
      _get("api/email").then(res => {
        let data=res.data.data;
        this.ruleForm.smtp_host=data.smtp_host;
        this.ruleForm.smtp_port=data.smtp_port;
        this.ruleForm.smtp_user=data.smtp_user;
        this.ruleForm.smtp_pass=data.smtp_pass;
        this.ruleForm.smtp_email=data.smtp_email;
        this.ruleForm.smtp_name=data.smtp_name;
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
           let params={
             smtp_host:this.ruleForm.smtp_host,
             smtp_port:this.ruleForm.smtp_port,
             smtp_user:this.ruleForm.smtp_user,
             smtp_pass:this.ruleForm.smtp_pass,
             smtp_email:this.ruleForm.smtp_email,
             smtp_host:this.ruleForm.smtp_host,
             smtp_name:this.ruleForm.smtp_name,
           }
          _post("api/email",params).then(res => {
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};