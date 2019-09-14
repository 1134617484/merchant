import { log } from "util";
import {_get,_post,_put,_delete} from "../../../api/index.js"
export default {
  // 基本设置
  name: "basicSetup",
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList:[],
       fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
       //商户认证
      authorized:'',
       //是否允许重复订单
      is_repeat_order:'',
      //提现通知
      withdraw:'',
      //是否允许重复订单
      is_repeat_order:'',
      //是否开启随机商户号
      random_mchno:'',
        //用户注册需要激活
      register_need_activate:'',
        //管理员是否只允许同一时间登录一次
      admin_alone_login:'',
      ruleForm: {
        // 网站名称
        site_name: "",
        // 网站地址
        site_domain: "",
        // 联系邮箱
        email: "",
        // 客服电话
        tel: "",
        // 网站客服QQ
        qq: "",
        //后台目录名称
        directory:"",
        //ICP备案号
        icp:"",
        //统计
        statistics:"",
        //登录地址
        login:"",
        //邀请码
        invitecode:"",
        //公司名称
        company:"",
        //授权服务Key
        serverkey:"",
        //错误登录次数
        login_warning_num:"",
        //登录IP
        login_ip:"",
        //公司Logo
        logo:"",
        //验证错误超限冻结时间
        max_auth_error_times:"",
        //验证错误的最大次数
        auth_error_ban_time:"",
      },
      formLabelWidth: "200px",
      rules: {
        site_name: [
          { required: true, message: "请输入网站名称", trigger: 'change' },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: 'change'}
        ],
        email: [
          { required: false, validator: this.$rules.FormValidate.Form().validateEmail, trigger: 'change' }
        ],
        tel:[
          { required: true, validator: this.$rules.FormValidate.Form().validatePhone, trigger: 'change' }
        ],
        // directory:[
        //   { required: true, validator: this.$rules.FormValidate.Form().validateEnglish, trigger: 'change' }
        // ],
        login:[
          { required: true, validator: this.$rules.FormValidate.Form().validateEnglish, trigger: 'change' }
        ],
        max_auth_error_times:[
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        auth_error_ban_time:[
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        login_warning_num:[
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        login_ip:[
          { required: true, validator: this.$rules.FormValidate.Form().validateIp, trigger: 'change' }
        ],
        qq:[
          { required: true, validator: this.$rules.FormValidate.Form().validateQQ, trigger: 'change' }
        ],
        serverkey:[
          { required: true, validator: this.$rules.FormValidate.Form().validateAccess, trigger: 'change' }
        ]
      }
    };
  },
  created(){
    this.getFormData();
  },
  methods: {
    handleFile(raw){
      },
    beforeAvatarUpload(file){
         let fd = new FormData();
         // fd.append('pay_type_id', 11)//随文件上传的其他参数
         fd.append('logo', file);
        _post("api/basic/logo", fd).then(res => {
           let url=res.data;
           this.dialogImageUrl=url;
           this.$message({
            message: "上传成功",
            type: "success"
          });
        })
      },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    getFormData(){
       _get("api/basic").then(res => {
        let data = res.data.data;
        this.ruleForm.site_name = data.site_name;
        this.ruleForm.site_domain = data.site_domain;
        this.ruleForm.email = data.email;
        this.ruleForm.tel = data.tel;
        this.ruleForm.qq = data.qq;
        this.ruleForm.directory = data.directory;
        this.ruleForm.icp = data.icp;
        this.ruleForm.statistics = data.statistics;
        this.ruleForm.login = data.login;
        this.authorized = data.authorized=='1'?true:false;
        this.ruleForm.invitecode = data.invitecode;
        this.ruleForm.company = data.company;
        this.ruleForm.serverkey = data.serverkey;
        this.withdraw = data.withdraw=='1'?true:false;
        this.ruleForm.login_warning_num = data.login_warning_num;
        this.ruleForm.login_ip = data.login_ip;
        this.is_repeat_order = data.is_repeat_order=='1'?true:false;
        // this.dialogImageUrl = data.logo;
        this.register_need_activate = data.register_need_activate=='1'?true:false;
        this.admin_alone_login = data.admin_alone_login=='1'?true:false;
        this.random_mchno = data.random_mchno=='1'?true:false;
        this.ruleForm.max_auth_error_times = data.max_auth_error_times;
        this.ruleForm.auth_error_ban_time = data.auth_error_ban_time;
        this.fileList=[{name: 'log.jpg', url: data.logo+''}];
        this.dialogImageUrl=data.logo;
      })
    },
    submitForm(formName) {
      //let data=this.serviceQQ.split("|");
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log(this.dialogImageUrl);
            let params={
            site_name:this.ruleForm.site_name,
            site_domain:this.ruleForm.site_domain,
            email:this.ruleForm.email,
            tel:this.ruleForm.tel,
            qq:this.ruleForm.qq,
            directory:this.ruleForm.directory,
            icp:this.ruleForm.icp,
            statistics:this.ruleForm.statistics,
            login:this.ruleForm.login,
            authorized:this.authorized?1:0,
            invitecode:this.ruleForm.invitecode,
            company:this.ruleForm.company,
            serverkey:this.ruleForm.serverkey,
            withdraw:this.withdraw?1:0,
            login_warning_num:this.ruleForm.login_warning_num,
            login_ip:this.ruleForm.login_ip,
            is_repeat_order:this.is_repeat_order?1:0,
            logo:this.dialogImageUrl,
            register_need_activate:this.register_need_activate?1:0,
            admin_alone_login:this.admin_alone_login?1:0,
            random_mchno :this.random_mchno?1:0,
            max_auth_error_times:this.ruleForm.max_auth_error_times,
            auth_error_ban_time:this.ruleForm.auth_error_ban_time,
          };
          _post("api/basic",params).then(res=>{
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.getFormData();
            // this.$refs[formName].resetFields();
        }).catch(error=>{
          this.$message({
            message: "提交失败",
            type: "error"
          });
        });
          //console.log(this.authorized);
          //console.log(this.ruleForm.serviceQQ.split("|"));
         // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed:{
    headers(){
      return {
        'Content-Type':'multipart/form-data',
      }
    }
  },
};