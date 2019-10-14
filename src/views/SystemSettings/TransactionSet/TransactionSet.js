import { log } from "util";
import { _get, _post, _put, _delete,ephemeral } from "../../../api/index.js"
export default {
  // 邮件设置
  name: "emailSetting",
  data() {
    return {
      sex:'1',
      date:'',
      Form: {
        //姓名
        realname:"",
        //身份证
        idcard: "",
        // 性别
        sex: "",
        // 生日
        birthday: "",
        // 手机
        mobile: "",
        //qq
        qq: "",
        //地址
        address: "",
        //ip
        // permit_login_ip: '',
      },
      rules: {
        mobile: [
          { required: true, validator: this.$rules.FormValidate.Form().validatePhone, trigger: 'change' }
        ],
        idcard: [
          { required: true, validator: this.$rules.FormValidate.Form().ID, trigger: 'change' }
        ],
        qq: [
          { required: true, validator: this.$rules.FormValidate.Form().validateQQ, trigger: 'change' }
        ],
        realname: [
          { required: true, message:'请输入姓名', trigger: 'change' }
        ],
        // permit_login_ip: [
        //   { required: true, validator: this.$rules.FormValidate.Form().validateIp, trigger: 'change' }
        // ],
        birthday: [
          { required: true, message:'请选择生日', trigger: 'change' }
        ],
      }
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    switchTime(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear() + "-";
      let m =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let d =(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let updated_at = y + m + d;
      return updated_at;
    },
    getTime(d){
       let date = new Date(d);
       let time = Date.parse(date);
       return time/1000;
    },
    getFormData() {
      _get("merchant/user/profile").then(res => {
        let data = res.data.data;
        this.Form.realname = data.realname;
        this.Form.idcard = data.idcard;
        this.sex = data.sex+'';
        // //console.log(data.birthday==0)
        data.birthday==0?this.Form.birthday='':this.Form.birthday = this.switchTime(data.birthday);
        this.Form.mobile = data.mobile;
        this.Form.qq = data.qq;
        this.Form.address = data.address;
        // this.Form.permit_login_ip = data.permit_login_ip;
      })
    },
    submitForm(formName) {
      if(this.Form.birthday==''||this.Form.birthday==null||this.Form.birthday==undefined){
        return this.$message({
          message: "生日不能为空",
          type: "warning"
        });
      }
      this.$refs[formName].validate(valid => {
        console.log(this.Form)
        if (valid) {
           let params = {
            realname: this.Form.realname,
            idcard: this.Form.idcard,
            sex: this.sex,
            birthday: this.getTime(this.Form.birthday),
            mobile: this.Form.mobile,
            qq: this.Form.qq,
            address: this.Form.address,
            // permit_login_ip: this.Form.permit_login_ip,
            }
          _post("merchant/user/profile-submit", params).then(res => {
            if(res.data){
              this.$message({
                message: "提交成功",
                type: "success"
              });
            this.getFormData();
            }
          })
        }else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
