import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      startTime:"",
      endTime:"",
      //查询参数
      status: "",
      name: '',
      typeOptions: [],
      chanelOptions:[],
      statsuOptions: [
          {
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
      //风控表单
      TransactionForm: {
        channel_id:"",
        // id
        id: "",
        // 当前交易金额
        paying_money: "",
        // 最小金额
        min_money: "",
        // 最大金额
        max_money: "",
        // 风控状态
        control_status: true,
        // 上线状态
        offline_status: true,
        //交易时间
        startTime:"",
        endTime:"",
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
        ]
      },
      RateForm:{
        id:"",
        //通道ID
        channel_id:'',
        //封顶手续费
        capping_fee:'',
        //银行费率
        rate:'',
        //t1运营费率
        t1_default_rate:'',
        //t1封顶手续费
        t1_capping_fee:'',
        //t1成本费率
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
        //通道英文编码
        code: "",
        //通道名称
        title: '',
        //商户号
        mch_id: '',
        //签名密钥
        sign_key: '',
        //应用APPID
        app_id: '',
        //签名密钥
        app_secret: '',
        //网关地址
        gateway: '',
        //页面跳转网址
        page_return: "",
        //服务器通知网址
        server_return: '',
        //防封域名
        unlock_domain: '',
        //状态 1开启 0关闭
        status: true,
        //支付分类ID
        pay_type_id: '',
        control_status:false,
        offline_status:false,
      },
      //编辑参数
      editForm: {
        id:"",
        //通道英文编码
        code: "",
        //通道名称
        title: '',
        //商户号
        mch_id: '',
        //签名密钥
        sign_key: '',
        //应用APPID
        app_id: '',
        //签名密钥
        app_secret: '',
        //网关地址
        gateway: '',
        //页面跳转网址
        page_return: "",
        //服务器通知网址
        server_return: '',
        //防封域名
        unlock_domain: '',
        //状态 1开启 0关闭
        status: '1',
        //支付分类ID
        pay_type_id: '',
        control_status:false,
        offline_status:false,
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
        code: [
          { required: true, validator: this.$rules.FormValidate.Form().validateEnglish, trigger: 'change' },    
        ],
        title: [
          { required: true, message: '请输入通道名称', trigger: 'change' },
          { min:4,max: 80, message: '通道中文名称超出长度范围[4-80]' },
        ],
        gateway:[
          { required: true, message: '请输入网关地址', trigger: 'change' },
        ],
        pay_type_id:[
          { required: true, message: '请选择支付分类', trigger: 'change' },
        ]
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
      formLabelWidth: "130px",
      //添加商户
      dialogFormCharge: false,
      //商户id
      chargeId: "",
    };
  },
  created() {
    this.getTableData("");
    this.getSelectData();
    this.getChanelData();
  },
  methods: {
    getSelectData() {
      _get("api/paytype/select").then(res => {
        this.typeOptions = res.data.data;
      })
    },
    getChanelData() {
      _get("api/channel/select").then(res => {
        this.chanelOptions = res.data.data;
        let params = {
          id: "",
          title: "全部"
        };
        this.chanelOptions.unshift(params);
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
      _get("api/channel",params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          //this.tableData = data;
          let tableList=[];
          for(var i=0;i<data.length;i++){
            tableList.push({
              id:data[i].id,
              code:data[i].code,
              title:data[i].title,
              types:data[i].types,
              status:data[i].status?true:false,
              rates:data[i].rates,
              risks:data[i].risks,
              control_status:data[i].control_status?true:false,
              offline_status:data[i].offline_status?true:false,
            })
          }
          this.tableData = tableList;
        }else{
          this.tableData=[];
        }
      });
    },
    formatter(row, column) {
      return row.address;
    },
    // 分配权限
    handleRole(index, row) {
      this.$router.push({ path: '/assignRoleList', query: { id: row.id } });
    },
    //修改主菜单状态
    handleIsMenu(index, row) {
      //console.log(index,row);
      _get("api/permission/switch/" + row.id).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })
    },
    //修改通道列表状态
    handleStatus(index, row) {
      let params={
        status:row.status?1:0,
      }
      _put("api/channel/status/"+row.id,params).then(res => {
        this.handleSearch();
        this.$message({
          message: "通道状态修改成功",
          type: "success"
        });
      })

    },
    handleControlStatus(index, row) {
      _put("api/channel/risk-status/"+row.id).then(res => {
        this.handleSearch();
        this.$message({
          message: "通道风控状态修改成功",
          type: "success"
        });
      })

    },
    handleOfflineStatus(index, row) {
      _put("api/channel/line-status/"+row.id).then(res => {
        this.handleSearch();
        this.$message({
          message: "通道上线状态修改成功",
          type: "success"
        });
      })

    },
    //删除
    handleDelete(index, row) {
      this.$confirm(`确定删除通道名称为 "${row.title}" 的数据吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _delete("api/channel/" + row.id).then(res => {
            this.handleSearch();
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
    // 编辑通道信息
    handleEdit(index, row) {
      let params={id:row.id};
      _get("api/channel/"+params.id).then(res => {
        //console.log(res);
        let data=res.data.data;
        this.editForm.id=row.id;
        this.editForm.code = data.code;
        this.editForm.title = data.title;
        this.editForm.mch_id = data.mch_id;
        this.editForm.sign_key = data.sign_key;
        this.editForm.app_id = data.app_id;
        this.editForm.app_secret = data.app_secret;
        this.editForm.gateway = data.gateway;
        this.editForm.page_return = data.page_return;
        this.editForm.server_return = data.server_return;
        this.editForm.unlock_domain = data.unlock_domain;
        this.editForm.status = data.status?true:false;
        this.editForm.control_status=data.control_status?true:false;
        this.editForm.offline_status=data.offline_status?true:false;
        this.editForm.pay_type_id = data.pay_type_id;
      })

      //编辑信息
      this.outerVisible = true;
    },
    isUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            code: this.editForm.code,
            title: this.editForm.title,
            mch_id: this.editForm.mch_id,
            sign_key: this.editForm.sign_key,
            app_id:  this.editForm.app_id,
            app_secret: this.editForm.app_secret,
            gateway: this.editForm.gateway,
            page_return: this.editForm.page_return,
            server_return: this.editForm.server_return,
            unlock_domain:this.editForm.unlock_domain,
            status: this.editForm.status?1:0,
            pay_type_id:this.editForm.pay_type_id,
            control_status:this.editForm.control_status?1:0,
            offline_status:this.editForm.offline_status?1:0,
          };
          this.$confirm("确定修改吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
            _put("api/channel/" + this.editForm.id, params).then(res => {
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
      this.dialogFormVisible = true;
    },
    // 确定添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            code: this.addForm.code,
            title: this.addForm.title,
            mch_id: this.mch_id,
            sign_key: this.addForm.sign_key,
            app_id:  this.addForm.app_id,
            app_secret: this.addForm.app_secret,
            gateway: this.addForm.gateway,
            page_return: this.addForm.page_return,
            server_return: this.addForm.server_return,
            unlock_domain:this.addForm.unlock_domain,
            status: this.addForm.status?1: 0,
            pay_type_id:this.addForm.pay_type_id,
            control_status:this.addForm.control_status?1:0,
            offline_status:this.addForm.offline_status?1:0,
          };
          _post("api/channel", params).then(res => {
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
    // 子账户
    handleChild(index, row) {
       this.$router.push({path:'/childAcount',query:{title:row.title,id:row.id}});
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
      let params = {
        title: this.name=='全部'?'':this.name,
        status: this.status=='a'?'':this.status,
        page: this.page,
        per_page: this.pageSize,
      };
      this.getTableData(params);
    },
    //编辑风控
    TransactionCharge(index,row) {

        if(row.risks!=null){
          this.TransactionForm.channel_id=row.risks.channel_id;
          this.TransactionForm.id=row.risks.id;
          this.TransactionForm.paying_money =row.risks.paying_money;
          this.TransactionForm.min_money = row.risks.min_money;
          this.TransactionForm.max_money = row.risks.max_money;
          // this.TransactionForm.control_status = row.risks.control_status?true:false;
          // this.TransactionForm.offline_status = row.risks.offline_status?true:false;
          this.TransactionForm.startTime=row.risks.start_time;
          this.TransactionForm.endTime=row.risks.end_time;
          this.dialogFormTransaction = true;
        }else{
          // this.TransactionForm.id="";
          // this.TransactionForm.channel_id=row.id;
          // this.TransactionForm.paying_money ="";
          // this.TransactionForm.min_money = "";
          // this.TransactionForm.max_money = "";
          // this.TransactionForm.startTime="";
          // this.TransactionForm.endTime="";
          this.$message({
              message: "风控id不存在",
              type: "error"
            });
        }
         
    },
    submitTransactionForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let paying_money=parseInt(this.TransactionForm.paying_money);
          let min_money=parseInt(this.TransactionForm.min_money);
          let max_money=parseInt(this.TransactionForm.max_money);
          let params = {
            id: this.TransactionForm.id,
            channel_id:this.TransactionForm.channel_id,
            paying_money: paying_money,
            min_money: min_money,
            max_money: max_money,
            // control_status: this.TransactionForm.control_status?1:0,
            // offline_status: this.TransactionForm.offline_status?1:0,
            start_time: this.TransactionForm.startTime,
            end_time: this.TransactionForm.endTime,
          };
            _put("api/channelrisk/" +this.TransactionForm.id, params).then(res => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.handleSearch();
            this.dialogFormTransaction = false;
          }).catch(error => {
            this.$message({
              message: "修改失败",
              type: "error"
            });
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    RateCharge(index,row) {
      this.RateForm.channel_id=row.id;
        if(row.rates!=null){
          this.RateForm.id=row.rates.id;
          this.RateForm.capping_fee = row.rates.capping_fee;
          this.RateForm.rate = row.rates.rate;
          this.RateForm.t1_default_rate = row.rates.t1_default_rate;
          this.RateForm.t1_capping_fee = row.rates.t1_capping_fee;
          this.RateForm.t1_rate = row.rates.t1_rate;
          this.dialogFormRate = true;
        }else{
          this.$message({
              message: "费率id不存在",
              type: "error"
            });
        }
       
    },
    submitRateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            id:this.RateForm.id,
            channel_id: this.RateForm.channel_id,
            capping_fee: this.RateForm.capping_fee,
            rate:this.RateForm.rate,
            t1_default_rate: this.RateForm.t1_default_rate,
            t1_capping_fee: this.RateForm.t1_capping_fee,
            t1_rate: this.RateForm.t1_rate,
          };
            _put("api/channelrate/" +this.RateForm.id, params).then(res => {
            this.handleSearch();
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogFormRate = false;
          }).catch(error => {
            this.$message({
              message: "修改失败",
              type: "error"
            });
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }

};
