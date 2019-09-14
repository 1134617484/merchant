import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      id:'',
      title:"",
      paramsId:"",
      rowId:'',
      custom_risk:'0',
      isDefault:true,
      //查询参数
      status: "",
      name: '',
      typeOptions: [],
      chanelOptions:[],
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
      statsuOptions: [
          {
          value: '',
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
       //风控表单
      transactionDefaultForm: {
        // 单笔交易最小金额
        min_money: "",
        // 单笔交易最大金额
        max_money: "",
        // 单位时间数值
        unit_interval: "",
         //限制时间单位
        time_unit: "",
        //开始交易时间
        start_time: "",
        // 结束交易时间
        end_time: "",
        //单位时间次数
        unit_number: "",
        // 单位时间金额
        unit_all_money: "",
        //单日可交易金额
        all_money:'',
        // 风控状态
        status: true,     
      },
      //风控表单
      TransactionForm: {
        id:'',
        // id
        channel_account_id: "",
        // 当天交易金额
        paying_money: "",
        // 单笔交易最小金额
        min_money: "",
        // 单笔交易最大金额
        max_money: "",
         //最后一笔交易时间
        last_paying_time: "",
        // 单位时间第一笔交易时间
        unit_first_paying_time: "",
        // 单时间交易笔数
        unit_paying_number: "",
        // 单位时间交易金额
        unit_paying_amount: "",
        // 单位时间数值
        unit_interval: "",
         //限制时间单位
        time_unit: "",
        // 单位时间第一笔交易时间
        unit_first_paying_time: "",
        //开始交易时间
        start_time: "",
        // 结束交易时间
        end_time: "",
        //单位时间次数
        unit_number: "",
        // 单位时间金额
        unit_all_money: "",
        //单日可交易金额
        all_money:'',

        // 风控状态
        control_status: true,
        // 上线状态
        offline_status: true,
        
      },
      TransactionRules: {
        paying_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        min_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        max_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        all_money: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        unit_paying_number: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        unit_paying_amount: [
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
        ]
      },
      RateForm:{
        //通道ID
        channel_id:'',
        //封顶手续费
        capping_fee:'',
        //银行费率
        rate:'',
        //T0运营费率
        t1_default_rate:'',
        //T0封顶手续费
        t1_capping_fee:'',
        //T0成本费率
        t1_rate:'',
      },
      RateRules:{
        capping_fee: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        rate: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        t1_default_rate: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        t1_capping_fee: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        t1_rate: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ]
      },
      // 提交的参数
      addForm: {
        id:'',
        //账户标题
        title: "",
        //通道id
        channel_id: '',
        //商户号
        mch_id: '',
        //签文密钥
        sign_key: '',
        //应用APPID
        app_id: '',
        //安全密钥
        app_secret: '',
        //轮询权重（1-9）
        weight: "",
        //防封域名
        unlock_domain: '',
        custom_risk:'1',
        custom_rate:'1',
        //状态 1开启 0关闭
        status: true,

      },
      chargeForm: {
        pay_type_id: '',
        change_money: '',
        content: '',
        type: '',
      },
      //风控设置
      transaction: true,
      dialogFormTransaction: false,
      radioRule:'1',
      //编辑通道
      dialogFormChanel: false,
 
      //费率
      dialogFormRate: false,
      //资金变动类型列表
      changeOptions: [],
      // 校验规则
      rules: {
        title: [
          { required: true, message: '请输入账户标题', trigger: 'change' },
        ],
        mch_id:[
          { required: true, message: '请输入商户号', trigger: 'change' },
        ],
        channel_id:[
          { required: true, message: '请选择通道类型', trigger: 'change' },
        ],
        sign_key:[
          { required: true, message: '请输入签文密钥', trigger: 'change' },
        ],
        app_id:[
          { required: true, message: '请输入应用APPID', trigger: 'change' },
        ],
        app_secret: [
          { required: true, message: '请输入安全密钥', trigger: 'change' },
        ],
        weight:[
          { required: true, message: '请输入轮询权重（1-9）', trigger: 'change' },
        ],
        unlock_domain:[
          { required: true, message: '请输入防封域名', trigger: 'change' },
        ],
      },
       
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:'',
      // 管理员信息数据
      tableData: [],
      // 信息编辑
      outerVisible: false,
      innerVisible: false,
      // 添加信息
      dialogFormVisible: false,
      formLabelWidth: "160px",
      //添加商户
      dialogFormCharge: false,
      //商户id
      chargeId: "",
    };
  },
  created() {
     this.getChildData();
  },
  methods: {
    getChildData(){
       this.getRouteData();
        this.getTableData();
        this.getSelectData();
    },
    getRouteData(){
      this.title=this.$route.query.title;
      this.id=this.$route.query.id;
    },
    getSelectData() {
      _get("api/channel/select").then(res => {
        this.typeOptions = res.data.data;
      })
    },
    getChanelData() {
      _get("api/channel/select").then(res => {
        this.chanelOptions = res.data.data;
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
    getTableData(params) {
      _get("api/account/channel/"+this.id,params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          let tableList=[];
          for(var i=0;i<data.length;i++){
            tableList.push({
              id:data[i].id,
              title:data[i].title,
              channel_id:data[i].channel_id,
              mch_id:data[i].mch_id,
              sign_key:data[i].sign_key,
              app_id:data[i].app_id,
              app_secret:data[i].app_secret,
              weight:data[i].weight,
              status:data[i].status?true:false,
              unlock_domain:data[i].unlock_domain,
              custom_rate:data[i].custom_rate,
              custom_risk:data[i].custom_risk,
              rates:data[i].rates,
              risks:data[i].risks,
            })
          }
          this.tableData = tableList;
        }else{
          this.tableData=[];
        }
      });
    },
    handleRadio(val){
      if(val=='0'){
        this.isDefault=true;
      }else{
        this.isDefault=false;
      }
    },
    //修改通道列表状态
    handleStatus(index, row) {
      let params={
        status:row.status?1:0,
      }
      _put("api/account/status/"+row.id,params).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })

    },
    // 编辑通道信息
    handleEdit(index, row) {
      this.addForm.id=row.id;
      this.addForm.title=row.title;
      this.addForm.mch_id=row.mch_id;
      this.addForm.channel_id=row.channel_id;
      this.addForm.sign_key=row.sign_key;
      this.addForm.app_id=row.app_id;
      this.addForm.app_secret=row.app_secret;
      this.addForm.status=row.status?true:false;
      this.addForm.weight=row.weight;
      this.addForm.unlock_domain=row.unlock_domain;
      this.addForm.custom_rate=row.custom_rate+'';
      this.addForm.custom_risk=row.custom_risk+'';
      //编辑信息
      this.outerVisible = true;
    },
    isUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            title: this.addForm.title,
            mch_id: this.addForm.mch_id,
            channel_id: this.addForm.channel_id,
            sign_key: this.addForm.sign_key,
            app_id:  this.addForm.app_id,
            app_secret: this.addForm.app_secret,
            weight:this.addForm.weight+'',
            unlock_domain:this.addForm.unlock_domain,
            status: this.addForm.status? 1:0,
            custom_rate:this.addForm.custom_rate,
            custom_risk:this.addForm.custom_risk,
          };
          this.$confirm("确定修改吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
            _put("api/account/" + this.addForm.id, params).then(res => {
                this.handleSearch();
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              }).catch(error => {
                this.$message({
                  message: "编辑失败",
                  type: "error"
                });
              });
              this.outerVisible = false;
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消修改"
              });
              this.outerVisible = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    //删除
    handleDelete(index, row) {
      this.$confirm(`确定删除?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _delete("/api/account/" + row.id).then(res => {
            this.getTableData("");
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }).catch(error => {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 选择页容量
    handleSizeChange(val) {
      this.pageSize=val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.page=val;
      this.handleSearch();
    },
    // 添加信息
    addChanel() {
      this.addForm.title="";
      this.addForm.mch_id="";
      this.addForm.channel_id="";
      this.addForm.sign_key="";
      this.addForm.app_id="";
      this.addForm.app_secret="";
      this.addForm.status=true;
      this.addForm.weight="";
      this.addForm.unlock_domain="";
      this.addForm.custom_rate="1";
      this.addForm.custom_risk="1";
      this.dialogFormVisible = true;
    },
    // 确定添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            title: this.addForm.title,
            mch_id: this.addForm.mch_id,
            channel_id: this.id+'',
            sign_key: this.addForm.sign_key,
            app_id:  this.addForm.app_id,
            app_secret: this.addForm.app_secret,
            weight:this.addForm.weight+'',
            unlock_domain:this.addForm.unlock_domain,
            status: this.addForm.status? 1:0,
            custom_rate:this.addForm.custom_rate,
            custom_risk:this.addForm.custom_risk,
          };
          _post("api/account", params).then(res => {
            this.getTableData("");
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
    // 添加信息
    merchantCharge(index, row) {
      //console.log(row.id);
      this.chargeId = row.id;
      this.dialogFormCharge = true;
    },
    submitChargeForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            pay_type_id: this.chargeForm.pay_type_id,
            change_money: +this.chargeForm.change_money,
            content: this.chargeForm.content,
          };
          _post("api/merchant/charge/" + this.chargeId, params).then(res => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.dialogFormCharge = false;
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
      // let params = {
      //   title: this.name,
      //   status: this.status,
      // };
      // this.getTableData(params);
      let params = { per_page: this.pageSize,page: this.page };
      this.getTableData(params);
    },
    getTime(t){
          let date=new Date(t * 1000);
          let h=date.getHours(); 
          let m=date.getMinutes(); 
          let s=date.getSeconds(); 
          let time= h+":"+m+":"+s;
          return time;
    },
    callBackTime(t) {
      let time = t.split(",");
      let date = [time[0], time[1]];
      return date;
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
    //编辑风控
    TransactionCharge(index,row) {
      this.rowId=row.id;
       if(row.custom_risk==1){
        this.isDefault=false;
       }else{
        this.isDefault=true;
       }
       this.custom_risk=row.custom_risk+'';
       if(row.risks!=null){
        this.paramsId=row.risks.id;
        _get("api/transaction").then(res => {
          let data=res.data.data;
          this.transactionDefaultForm.min_money = data.min_money;
          this.transactionDefaultForm.max_money = data.max_money;
          this.transactionDefaultForm.status = data.status?true:false;
          this.transactionDefaultForm.start_time=data.start_time;
          this.transactionDefaultForm.end_time=data.end_time;
          this.transactionDefaultForm.all_money = data.all_money;
          this.transactionDefaultForm.unit_interval=data.unit_interval;
          this.transactionDefaultForm.time_unit=+data.time_unit;
          this.transactionDefaultForm.unit_number=data.unit_number;
          this.transactionDefaultForm.unit_all_money=data.unit_all_money;
       })
       _get("api/accountrisk/"+row.risks.id).then(res => {
           let data=res.data.data;
          this.TransactionForm.paying_money =data.paying_money;
          this.TransactionForm.min_money = data.min_money;
          this.TransactionForm.max_money = data.max_money;
          this.TransactionForm.control_status = data.control_status?true:false;
          this.TransactionForm.offline_status = data.offline_status?true:false;
          this.TransactionForm.start_time=data.start_time;
          this.TransactionForm.end_time=data.end_time;
          this.TransactionForm.channel_account_id=data.channel_account_id;
          this.TransactionForm.last_paying_time =data.last_paying_time;
          this.TransactionForm.all_money = data.all_money;
          this.TransactionForm.unit_first_paying_time =data.unit_first_paying_time;
          this.TransactionForm.unit_paying_number = data.unit_paying_number;
          this.TransactionForm.unit_paying_amount = data.unit_paying_amount;
          this.TransactionForm.unit_interval=data.unit_interval;
          this.TransactionForm.time_unit=data.time_unit;
          this.TransactionForm.unit_number=data.unit_number;
          this.TransactionForm.unit_all_money=data.unit_all_money;
        })
        this.dialogFormTransaction = true;
      }else{
        this.$message({
              message: "风控id不存在",
              type: "error"
            });
      }
    },
    submitTransactionForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(+this.TransactionForm.min_money<+this.TransactionForm.max_money){
           let params = {
            channel_account_id: this.TransactionForm.channel_account_id,
            last_paying_time: this.TransactionForm.last_paying_time,
            paying_money: this.TransactionForm.paying_money,
            all_money: this.TransactionForm.all_money,
            max_money: this.TransactionForm.max_money,
            min_money: this.TransactionForm.min_money,
            offline_status: this.TransactionForm.offline_status?1:0,
            control_status: this.TransactionForm.control_status?1:0,
            unit_first_paying_time: this.TransactionForm.unit_first_paying_time,
            unit_paying_number: this.TransactionForm.unit_paying_number,
            unit_paying_amount: this.TransactionForm.unit_paying_amount,
            unit_interval: this.TransactionForm.unit_interval,
            time_unit: this.TransactionForm.time_unit,
            start_time: this.TransactionForm.start_time,
            end_time: this.TransactionForm.end_time,
            unit_number: this.TransactionForm.unit_number,
            unit_all_money: this.TransactionForm.unit_all_money,
          };
            _put("api/accountrisk/" +this.paramsId, params).then(res => {
            this.$message({
              message: "设置成功",
              type: "success"
            });
            this.handleSearch();
            this.dialogFormTransaction = false;
          }).catch(error => {
            this.$message({
              message: "设置失败",
              type: "error"
            });
          });
        }
        else{
          this.$message({
              message: "单笔交易最小金额应小于单笔交易最大金额",
              type: "error"
            });
        }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitDefaultForm(formName){
      let params={
        status:0
      }
      _put("api/account/riskstatus/"+this.rowId,params).then(res => {
            this.$message({
              message: "设置成功",
              type: "success"
            });
            this.handleSearch();
            this.dialogFormTransaction = false;
          }).catch(error => {
            this.$message({
              message: "设置失败",
              type: "error"
            });
          });
    },
    RateCharge(index,row) {
      if(row.rates!=null){
      this.paramsId=row.rates.id;
      _get("api/accountrate/"+row.rates.id).then(res => {
          let data=res.data.data;
          this.RateForm.channel_account_id=data.channel_account_id;
          this.RateForm.capping_fee = data.capping_fee;
          this.RateForm.rate = data.rate;
          this.RateForm.t1_default_rate = data.t1_default_rate;
          this.RateForm.t1_capping_fee = data.t1_capping_fee;
          this.RateForm.t1_rate = data.t1_rate;
        })
      this.dialogFormRate = true;
      }
      else{
        this.$message({
              message: "费率id不存在",
              type: "error"
            });
      }
    },
    submitRateForm(formName) {
          let params = {
            channel_account_id: this.RateForm.channel_account_id,
            capping_fee: this.RateForm.capping_fee,
            rate:this.RateForm.rate,
            t1_default_rate: this.RateForm.t1_default_rate,
            t1_capping_fee: this.RateForm.t1_capping_fee,
            t1_rate: this.RateForm.t1_rate,
          };
            _put("api/accountrate/" +this.paramsId, params).then(res => {
            this.$message({
              message: "设置成功",
              type: "success"
            });
             this.handleSearch();
            this.dialogFormRate = false;
          }).catch(error => {
            this.$message({
              message: "设置失败",
              type: "error"
            });
          });
    }
  },
  watch:{
    "$route.path":  function (newVal, oldVal) {
      if(newVal==='/childAcount'){
        this.getChildData();
      }
  
     }
   }
};
