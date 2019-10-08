import { log } from "util";
import { _get, _post, _put, _delete, ephemeral } from "../../../api/index.js";
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
        bank_id: "1"
      },
      withdrawInit: {}, //初始化
      rules: {
        apply_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        payment_code: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePsdReg,
            trigger: "change"
          }
        ],
        reality_money: [{ required: true, trigger: "change" }],
        calc_money: [{ required: true, trigger: "change" }],
        bank_id: [
          { required: true, message: "请选择提现银行卡", trigger: "change" }
        ]
      },
      classifyOptions: [] //商户提现银行卡选择
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      // 银行卡列表
      _get("merchant/bankcard/bankcard").then(res => {
        this.classifyOptions = res.data.data;
        this.ruleForm.bank_id = this.classifyOptions[0].id;
      });
      // 初始化
      _get("merchant/withdraw/init").then(res => {
<<<<<<< HEAD
        this.withdrawInit = res.data.data;
        this.withdrawInit.balance= Number(this.withdrawInit.balance).toFixed(4);
        this.withdrawInit.balance_disabled=Number(this.withdrawInit.balance_disabled).toFixed(4);
        this.withdrawInit.apply_money=Number(this.withdrawInit.apply_money).toFixed(4);
      console.log(this.withdrawInit)
=======
        this.withdrawInit = {...res.data.data};
        this.withdrawInit.balance= Number(this.withdrawInit.balance).toFixed(5);
        this.withdrawInit.balance_disabled=Number(this.withdrawInit.balance_disabled).toFixed(5);
        this.withdrawInit.apply_money=Number(this.withdrawInit.apply_money).toFixed(5);
        console.log(this.withdrawInit)
>>>>>>> 63cec2830a13718f59b6de9865bfbb755e4216ee
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // if (this.ruleForm.apply_money < this.withdrawInit.unit_min_money)
        //   return this.$message({
        //     message: "最小提现金额为"+this.withdrawInit.unit_min_money元,
        //     type: "warning"
        //   });
        if (valid) {
          let params = {
            bankcard_id: this.ruleForm.bank_id,
            apply_money: this.ruleForm.apply_money,
            pay_password: this.ruleForm.payment_code
          };
          _post("/merchant/withdraw", params).then(res => {
            if(res.dada){
              this.$message({
                message: "提交成功",
                type: "success"
              });
            }
            // this.getFormData();
          });
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
    handleBlur() {
      if (this.ruleForm.apply_money == 0) return false;
      if (this.ruleForm.apply_money < this.withdrawInit.unit_min_money)
        return this.$message({
          message: `最小提现金额为${this.withdrawInit.unit_min_money}元`,
          type: "warning"
        });

      this.ruleForm.apply_money = parseInt(this.ruleForm.apply_money);
      _get(
        `merchant/withdraw/calc?apply_money=${this.ruleForm.apply_money}`
      ).then(res => {
        this.ruleForm.fee = res.data.data.fee;
        this.ruleForm.money = res.data.data.money;
      });
    },
    // 修改bank后
    change_bank() {
      console.log(this.ruleForm.bank_id);
      // this.ruleForm.bank_id!==''?ruleForm.bank_id:ruleForm.bank_id=classifyOptions[0]
    }
  }
};
