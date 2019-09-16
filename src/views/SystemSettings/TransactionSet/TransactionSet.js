import { log } from "util";
import { _get, _post, _put, _delete,ephemeral } from "../../../api/index.js"
export default {
  // 邮件设置
  name: "emailSetting",
  data() {
    return {
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      status:false,
      ruleForm: {
        merchant_id: "",
        // id
        id: "",
        // 当前交易金额
        paying_money: "",
        // 当日总金额
        all_money: "",
        // 单笔最小交易额
        min_money: "",
        //单笔最大交易额
        max_money: "",
        //单位时间限制
        unit_interval: "",
        //限制时间单位
        time_unit: '',
        //单位事件次数
        unit_number: 0,
        //单位时间金额
        unit_all_money: 0,
        // 状态
        // status: '',
        //交易时间
        start_time: "",
        end_time: "",
        // 防封域名
        domain:""
      },
      unitOptions: [{
          value: 1,
          label: '秒'
        },
        {
          value: 60,
          label: '分'
        },
        {
          value: 3600,
          label: '时'
        },
        {
          value: 86400,
          label: '天'
        },
      ],
      value: '',
      value2: true,
      rules: {
        min_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        max_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        all_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        unit_interval: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        unit_number: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        unit_all_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
      }
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      // _get("api/transaction").then(res => {
        let data = ephemeral.menu.transaction.data;
        this.ruleForm.min_money = data.min_money;
        this.ruleForm.max_money = data.max_money;
        this.ruleForm.all_money = data.all_money;
        this.ruleForm.start_time = data.start_time;
        this.ruleForm.end_time = data.end_time;
        this.ruleForm.unit_interval = data.unit_interval;
        this.ruleForm.time_unit = +data.time_unit;
        this.ruleForm.unit_interval = data.unit_interval;
        this.ruleForm.unit_number = data.unit_number;
        this.ruleForm.unit_all_money = data.unit_all_money;
        this.ruleForm.domain = data.domain;
        this.status = data.status=='0'?false:true;
        console.log(this.ruleForm.time_unit);
      // })
    },
    submitForm(formName) {
      console.log(this.ruleForm.domain)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(+this.ruleForm.min_money<+this.ruleForm.max_money){
           let params = {
            min_money: this.ruleForm.min_money,
            max_money: this.ruleForm.max_money,
            all_money: this.ruleForm.all_money,
            start_time: this.ruleForm.start_time,
            end_time: this.ruleForm.end_time,
            unit_interval: this.ruleForm.unit_interval,
            time_unit: this.ruleForm.time_unit,
            unit_number: this.ruleForm.unit_number,
            unit_all_money: this.ruleForm.unit_all_money,
            status: this.status?1:0,
            domain:this.ruleForm.domain
          }
          _post("api/transaction", params).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.getFormData();
          })
        }else{
          this.$message({
              message: "单笔最小金额不能大于单笔最大金额",
              type: "error"
            });
        }
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
