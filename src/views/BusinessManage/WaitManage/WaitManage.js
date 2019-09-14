import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      //查询参数
      status: "",
      merchant_id: '',
      date: '',
      typeOptions: [],
      payOptions: [{
          id: '1',
          label: '加款'
        },
        {
          id: '2',
          label: '扣款'
        }
      ],
      statsuOptions: [{
          value: 'a',
          label: '全部'
        },
        {
          value: '0',
          label: '禁用'
        },
        {
          value: '1',
          label: '激活'
        }
      ],
      //新增权限信息
      selectTitle: '',
      options: [{
        value: '1',
        label: '普通商户'
      }],
      sex: "男",
      sexOptions: [{
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      // 提交的参数
      addForm: {
        //用户名
        username: "",
        //姓名
        realname: '',
        //身份证
        idcard: '',
        //生日
        birthday: '',
        //手机
        mobile: '',
        //QQ
        qq: '',
        //邮箱
        email: '',
        //商户类型 (现在只有普通商户)
        type: "",
        //地址
        address: '',
        //登录密码
        password: '',
        //支付密码
        pay_password: '',
        //授权访问域名
        domain: '',
        //API秘钥
        apikey: '',
        //提现规则
        custom_withdraw: '0',
        //风控规则
        custom_risk: '0',
      },
      //编辑参数
      editForm: {
        id: "",
        //用户名
        username: "演示人员",
        //姓名
        realname: '111',
        //身份证
        idcard: '43052319950613312X',
        //生日
        birthday: '2019-07-30',
        //手机
        mobile: '13266522726',
        //QQ
        qq: '995289123',
        //邮箱
        email: 'support@pay.com',
        //商户类型 (现在只有普通商户)
        type: "普通商户",
        //地址
        address: '1111111',
        //登录密码
        password: '123456',
        //支付密码
        pay_password: '123456',
        //授权访问域名
        domain: 'test.com',
        //API秘钥
        apikey: 'fasdfasdfdsa',
        //提现规则
        custom_withdraw: '0',
        //风控规则
        custom_risk: '0',
      },
      // 校验规则
      rules: {
        birthday:[
          { required: true, message: '请输入生日日期', trigger: 'change' },
        ],
        password:[
          { required: true, message: '请输入登录密码', trigger: 'change' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        realname: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        apikey: [
          { required: true, message: '请输入API秘钥', trigger: 'change' },
        ],
        pay_password: [
          { required: true, validator: this.$rules.FormValidate.Form().validateAccess,trigger: 'change' },
          { min: 6, message: '请输入6-16位数字或字母', max: 16}
        ],
        idcard: [
          { required: true, validator: this.$rules.FormValidate.Form().ID, trigger: 'change' }
        ],
        mobile: [
          { required: true, validator: this.$rules.FormValidate.Form().validatePhone, trigger: 'change' }
        ],
        qq: [
          { required: true, validator: this.$rules.FormValidate.Form().validateQQ, trigger: 'change' }
        ],
        email: [
          { required: true, validator: this.$rules.FormValidate.Form().validateEmail, trigger: 'change' }
        ],
        change_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ]
      },
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page: '',
      // 管理员信息数据
      tableData: [],
      // 信息编辑
      outerVisible: false,
      innerVisible: false,
      // 添加信息
      dialogFormVisible: false,
      formLabelWidth: "130px",
      //添加商户
      dialogFormCharge: false,
      //商户id
      chargeId: "",
      //商户资料
      AttachmentData:[],
   
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
 
  },
  methods: {
    getSelectMenuData() {
      _get("api/merchant/select").then(res => {
        this.typeOptions = res.data.data;
        let params = {
          id: "a",
          name: "全部"
        };
        this.typeOptions.unshift(params);
      })
    },
    handleType() {
      let params = {
        type: this.chargeForm.type
      }
      _get("api/change-type/select", params).then(res => {
        this.changeOptions = res.data.data;
      })
    },
    getChangeTypeData() {
      _get("api/change-type/select").then(res => {
        this.changeOptions = res.data.data;
      })
    },
    switchTime(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear() + '-';
      let m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let d = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      let h=date.getHours(); 
      let mm=date.getMinutes(); 
      let s=date.getSeconds(); 
      let updated_at = y + m + d+''+h+":"+mm+":"+s;
      return updated_at
    },
    getTime(time){
     let date = new Date(time * 1000);
     let hour=date.getHours(); 
     let minute=date.getMinutes(); 
     let second=date.getSeconds(); 
     return hour+":"+minute+":"+second;
    },
    getTableData(params) {
      _get("api/merchant/wait", params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        console.log(data.length);
        if (data.length > 0) {
          let tableList = [];
          for (let i = 0; i < data.length; i++) {
            tableList.push({
              id: data[i].id,
              username: data[i].username,
              created_at: data[i].created_at,
              updated_at: this.switchTime(data[i].last_login_time),
              status: data[i].status ? true : false,
              open_charge: data[i].open_charge ? true : false,
              realname:data[i].realname,
              mobile:data[i].mobile,
              created_at:this.switchTime(data[i].created_at),
              fund: data[i].fund,
            })
          }
          this.tableData=tableList;
        } else {
          this.tableData = [];
        }
      });
    },
    //修改商户列表状态
    handleStatus(index, row) {
      //console.log(index,row);
      _get("api/merchant/toggle/" + row.id).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })

    },
    // 商户资料
    handleMerchant(index, row){
      // +row.id
      _get("api/merchant/attachment/"+row.id).then(res => {
             let data=res.data.data;
             this.AttachmentData=data.attachment;
          })
      this.dialogFormCharge=true;
    },
    //审核通过
    handleAuthorized(index, row){
       let params={
          authorized:'1',
       };
       _post("api/merchant/verify/"+row.id, params).then(res => {
            this.handleSearch();
            this.$message({
              message: "审核成功",
              type: "success"
            });
            this.dialogFormVisible = false;
          }).catch(error => {
            this.$message({
              message: "审核失败",
              type: "error"
            });
          });
    },
    //审核未通过
    handleUnauthorized(index, row){
        let params={
          authorized:'2',
       };
       _post("api/merchant/verify/"+row.id, params).then(res => {
            this.handleSearch();
            this.$message({
              message: "审核成功",
              type: "success"
            });
            this.dialogFormVisible = false;
          }).catch(error => {
            this.$message({
              message: "审核失败",
              type: "error"
            });
          });
    },
    // 选择页容量
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.handleSearch();
    },
    // 添加信息
    addAdminUser() {
      this.dialogFormVisible = true;
    },
    // 确定添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let date = new Date(this.addForm.birthday);
          let time = date.valueOf();
          // alert(time);
          let params = {
            username: this.addForm.username,
            realname: this.addForm.realname,
            sex: this.sex == '男' ? 0 : 1,
            idcard: this.addForm.idcard,
            birthday: time / 1000,
            idcard: this.addForm.idcard,
            mobile: this.addForm.mobile,
            email: this.addForm.email,
            qq: this.addForm.qq,
            type: 1,
            address: this.addForm.address,
            password: this.addForm.password,
            pay_password: this.addForm.pay_password,
            domain: this.addForm.domain,
            apikey: this.addForm.apikey,
            custom_withdraw: this.addForm.custom_withdraw,
            custom_risk: this.addForm.custom_risk,
          };
          _post("api/merchant", params).then(res => {
            this.getTableData();
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.dialogFormVisible = false;
          }).catch(error => {
            this.$message({
              message: "添加失败",
              type: "error"
            });
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    handleSearch() {
      let date = JSON.stringify(this.date);
      let dateStr = date.split(",");
      let dateArr = JSON.parse(dateStr);
      let params = {
        id: this.merchant_id=='a'?'':this.merchant_id,
        created_at: dateArr,
        status: this.status=='a'?'':this.status,
        page: this.page,
        per_page: this.pageSize
      };
      this.getTableData(params);
    },
    callBackTime(t) {
      let time = t.split(",");
      let date = [time[0], time[1]];
      return date;
    },
  }

};
