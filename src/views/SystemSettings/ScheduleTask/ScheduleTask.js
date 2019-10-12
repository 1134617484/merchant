import { log } from "util";
export default {
  // 计划任务
  name: "scheduleTask",
  data() {
    return {
      ruleForm: {
        // 补发次数
        numberReplacement: 0
      },
      // 规则
      rules: {
        numberReplacement: [
          { required: true, message: "请输入补发次数", trigger: "blur" }
        ]
      },
      // T+1时间
      optionsLeft: [
        {
          value: "0",
          label: "0:00"
        },
        {
          value: "1",
          label: "1:00"
        },
        {
          value: "2",
          label: "2:00"
        },
        {
          value: "3",
          label: "3:00"
        },
        {
          value: "4",
          label: "4:00"
        },
        {
          value: "5",
          label: "5:00"
        },
        {
          value: "6",
          label: "6:00"
        },
        {
          value: "7",
          label: "7:00"
        },
        {
          value: "8",
          label: "8:00"
        },
        {
          value: "9",
          label: "9:00"
        },
        {
          value: "10",
          label: "10:00"
        },
        {
          value: "11",
          label: "11:00"
        },
        {
          value: "12",
          label: "12:00"
        },
        {
          value: "13",
          label: "13:00"
        },
        {
          value: "14",
          label: "14:00"
        },
        {
          value: "15",
          label: "15:00"
        },
        {
          value: "16",
          label: "16:00"
        },
        {
          value: "17",
          label: "17:00"
        },
        {
          value: "18",
          label: "18:00"
        },
        {
          value: "19",
          label: "19:00"
        },
        {
          value: "20",
          label: "20:00"
        },
        {
          value: "21",
          label: "21:00"
        },
        {
          value: "22",
          label: "22:00"
        },
        {
          value: "23",
          label: "23:00"
        }
      ],
      valueLeft: "",
      optionsRight: [
        {
          value: "0",
          label: "0:00"
        },
        {
          value: "1",
          label: "1:00"
        },
        {
          value: "2",
          label: "2:00"
        },
        {
          value: "3",
          label: "3:00"
        },
        {
          value: "4",
          label: "4:00"
        },
        {
          value: "5",
          label: "5:00"
        },
        {
          value: "6",
          label: "6:00"
        },
        {
          value: "7",
          label: "7:00"
        },
        {
          value: "8",
          label: "8:00"
        },
        {
          value: "9",
          label: "9:00"
        },
        {
          value: "10",
          label: "10:00"
        },
        {
          value: "11",
          label: "11:00"
        },
        {
          value: "12",
          label: "12:00"
        },
        {
          value: "13",
          label: "13:00"
        },
        {
          value: "14",
          label: "14:00"
        },
        {
          value: "15",
          label: "15:00"
        },
        {
          value: "16",
          label: "16:00"
        },
        {
          value: "17",
          label: "17:00"
        },
        {
          value: "18",
          label: "18:00"
        },
        {
          value: "19",
          label: "19:00"
        },
        {
          value: "20",
          label: "20:00"
        },
        {
          value: "21",
          label: "21:00"
        },
        {
          value: "22",
          label: "22:00"
        },
        {
          value: "23",
          label: "23:00"
        }
      ],
      valueRight: ""
    };
  },
  beforeMount() {
    // T+1时间默认选中
    this.valueLeft = "1";
    this.valueRight = "5";
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 补发次数
    handleChange(value) {
    }
  }
};
