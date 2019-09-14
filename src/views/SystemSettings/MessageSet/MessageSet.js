import { log } from "util";
import {_get,_post,_put,_delete} from "../../../api/index.js"
export default {
  // 邮件设置
  name: "MessageSet",
  data() {
    return {
      is_open:true,
      formLabelWidth: "",
      ruleForm: {
        // 短信通道
        sms_channel: "",
        //阿里云App Key
        app_key: "",
        // 阿里云App Secret
        app_secret: "",
        // 短信宝账号
        smsbao_user: "",
        // 短信宝密码
        smsbao_pass: "",
        // 短信签名
        sign_name:""
      },
      //短信通道
      options: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }],
      value: 1,
      rules: {
        app_key:[
          { required: true, message: "请输入阿里云App Key", trigger: 'change'}
        ],
        app_secret: [
          { required: true, message: "请输入阿里云App Secret", trigger: 'change'}
        ],
        smsbao_user: [
          { required: true, message: "请输入短信宝账号", trigger: 'change'}
        ],
        smsbao_pass: [
          { required: true, message: "请输入短信宝密码", trigger: 'change'}
        ],
        sign_name: [
          { required: true, message: "请输入短信签名", trigger: 'change'}
        ],
         
      }
    };
  },
  created(){
      this.getFormData();
  },
  methods: {
    getFormData(){
      _get("api/sms").then(res => {
        let data=res.data.data;
        this.value=data.sms_channel;
        this.ruleForm.app_key=data.app_key;
        this.ruleForm.app_secret=data.app_secret;
        this.ruleForm.smsbao_user=data.smsbao_user;
        this.ruleForm.smsbao_pass=data.smsbao_pass;
        this.ruleForm.sign_name=data.sign_name;
        this.is_open=data.is_open?true:false;
        //console.log(data);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
           let params={
             sms_channel:this.value,
             app_key:this.ruleForm.app_key,
             app_secret:this.ruleForm.app_secret,
             smsbao_user:this.ruleForm.smsbao_user,
             smsbao_pass:this.ruleForm.smsbao_pass,
             sign_name:this.ruleForm.sign_name,
             is_open:this.is_open?1:0,
           }
          _post("api/sms",params).then(res => {
            this.$message({
              message: "添加成功",
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