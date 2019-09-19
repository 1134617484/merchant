import { log } from "util";
import {_get,_post,_put,_delete,ephemeral} from "../../../api/index.js"
export default {
  // 邮件设置
  name: "emailSetting",
  data() {
    return {
      ruleForm: {
        // 提现金额
        apply_money: "",
        // 实际到账金额
        reality_money: "",
        // 手续费
        calc_money: "",
        // 支付密码
        payment_code: "",
        bank_id:"1"
      },
      rules: {
        apply_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        payment_code:[
          { required: true, validator: this.$rules.FormValidate.Form().validatePsdReg, trigger: 'change'}
        ],
        reality_money:[
          { required: true,  trigger: 'change'}
        ],
        calc_money:[
          { required: true,  trigger: 'change'}
        ],
        bank_id:[
          { required: true,  message: "请选择提现银行卡", trigger: 'change'}
        ]
      },
      classifyOptions:[],//商户提现银行卡选择
    };
  },
  created(){
      this.getFormData();
  },
  methods: {
    getFormData(){
      // 银行卡列表
      _get("/merchant/bank/select").then(res => {
this.classifyOptions=res.data.data;
this.ruleForm.bank_id=this.classifyOptions[0].id;
        // let data=ephemeral.finance.email.data;
        // this.ruleForm.smtp_host=data.smtp_host;
        // this.ruleForm.smtp_port=data.smtp_port;
        // this.ruleForm.smtp_user=data.smtp_user;
        // this.ruleForm.smtp_pass=data.smtp_pass;
        // this.ruleForm.smtp_email=data.smtp_email;
        // this.ruleForm.smtp_name=data.smtp_name;
      })
      
      
    },
    submitForm(formName) {
      console.log(formName)
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          //alert("submit!");
           let params={
            bankcard_id:this.ruleForm.bank_id,
            apply_money:this.ruleForm.apply_money,
            pay_password:this.ruleForm.payment_code,
           }
           console.log(params)
           console.log(this.ruleForm)
          _post("/merchant/withdraw",params).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            // this.getFormData();
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 输入提现金额后
    handleBlur(){
      this.ruleForm.apply_money=parseInt(this.ruleForm.apply_money);
      _get(`merchant/withdraw/calc?apply_money=${this.ruleForm.apply_money}`).then(res => {
this.ruleForm.calc_money=res.data.data.calc;
this.ruleForm.reality_money=Number(this.ruleForm.apply_money-this.ruleForm.calc_money);
      })
    },
// 修改bank后
change_bank(){
  console.log(this.ruleForm.bank_id);
  // this.ruleForm.bank_id!==''?ruleForm.bank_id:ruleForm.bank_id=classifyOptions[0]
}
  }
};