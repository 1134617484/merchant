import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  // 邮件设置
  name: "emailSetting",
  data() {
    return {
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      labelWidth:'230px',
      ruleForm: {
        //提款手续费类型
        fee_type: "",
        // 单笔提款比例
        fee_proportion: "",
        // 单笔提款手续费
        fee: "",
        //提款允许开始时间
        allow_start_time: "",
        // 提款允许结束时间
        allow_end_time: "",
        //单人单卡单日最高提现额
        day_card_money: "",
        //扣除手续费方式
        charge_type: "",
        //当日最大金额
        day_max_money: '',
        //当日最大次数
        day_max_count: 0,
        //节假日排除日期
        day_expect: 0,
        // 提款状态
        status: '',
        //单笔最小
        unit_min_money:'', 
        //单笔最大
        unit_max_money:'',
      },
      fee_typeOptions: [{
          value: '0',
          label: '每笔'
        },
        {
          value: '1',
          label: '按比例'
        },
      ],
      charge_typeOptions: [{
          value: '0',
          label: '扣除到账金额'
        },
        {
          value: '1',
          label: '扣除商户余额'
        },
      ],
 
      rules: {
        unit_min_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        unit_max_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        fee_proportion: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        fee: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        day_max_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        day_max_count: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        day_card_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
      }
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    callBackTime(t) {
      let time = t.split(",");
      let date = [time[0], time[1]];
      return date;
    },
    getFormData() {
      _get("api/cash").then(res => {
        let data = res.data.data;
        this.ruleForm.status = data.status=='0'?false:true;
        this.ruleForm.fee_type = data.fee_type;
        this.ruleForm.fee_proportion = data.fee_proportion;
        this.ruleForm.fee = data.fee;
        this.ruleForm.allow_start_time = data.allow_start_time;
        this.ruleForm.allow_end_time = data.allow_end_time;
        this.ruleForm.day_card_money = data.day_card_money;
        this.ruleForm.charge_type = data.charge_type;
        this.ruleForm.day_max_money = data.day_max_money;
        this.ruleForm.day_max_count = data.day_max_count;
        this.ruleForm.unit_min_money = data.unit_min_money;
        this.ruleForm.unit_max_money = data.unit_max_money;
        this.ruleForm.day_expect = this.callBackTime(data.day_expect);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.ruleForm.unit_min_money<this.ruleForm.unit_max_money){
           let day_expect=this.ruleForm.day_expect;
           let params = {
            fee_type: this.ruleForm.fee_type,
            fee_proportion: this.ruleForm.fee_proportion,
            fee: this.ruleForm.fee,
            allow_start_time: this.ruleForm.allow_start_time,
            allow_end_time: this.ruleForm.allow_end_time,
            day_card_money: this.ruleForm.day_card_money,
            charge_type: this.ruleForm.charge_type,
            day_max_money: this.ruleForm.day_max_money,
            day_max_count: this.ruleForm.day_max_count,
            unit_min_money:this.ruleForm.unit_min_money,
            unit_max_money:this.ruleForm.unit_max_money,
            day_expect: day_expect.join(","),
            status: this.ruleForm.status?1:0,
          }
          _post("api/cash", params).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.getFormData();
          })
          }
          else{
            this.$message({
              message: "单笔最小金额应小于单笔最大金额",
              type: "error"
            });
          }
        }
        else {
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
