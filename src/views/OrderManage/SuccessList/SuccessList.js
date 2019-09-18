import { log } from "util";
import { _get, _post, _put, _delete, ephemeral } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      //查询参数
      pay_order_id: '',
      pay_type_id: '',
      pay_apply_date: '',
      pay_success_date: '',
      order_type: '',
      order_status:'',
      channel_id: '',
      pay_status: '',
      typeOptions: [],
      chanelOptions: [],
      selectSatus:[
      {
          value: 'a',
          label: '全部'
        },
      {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '冻结'
        },
      ],
      //订单状态0未支付 1 已支付未返回 2 已支付已返回 3 订单冻结 4 订单解冻 
      statusOptions: [
       {
          value: 'a',
          label: '全部'
        },
        {
          value: '1',
          label: '已支付未通知'
        },
        {
          value: '2',
          label: '已支付已通知'
        },
      ],
      orderTypes: [
        {
          value: 'a',
          label: '全部'
        },
       {
          value: '0',
          label: '充值订单'
        },
        {
          value: '1',
          label: '收款订单'
        },
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
        id: "",
        pay_order_id: "",
        pay_amount: "",

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
      RateForm: {
        id: "",
        //通道ID
        channel_id: '',
        //封顶手续费
        capping_fee: '',
        //银行费率
        rate: '',
        //T0运营费率
        t0_default_rate: '',
        //T0封顶手续费
        t0_capping_fee: '',
        //T0成本费率
        t0_rate: '',
      },
      RateRules: {
        capping_fee: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        rate: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        t0_default_rate: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        t0_capping_fee: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ],
        t0_rate: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' }
        ]
      },
      // 提交的参数
      addForm: {
        //通道英文编码
        code: "AlipayScanDemo",
        //通道名称
        title: '支付宝扫码Demo',
        //商户号
        mch_id: '1000001',
        //签名密钥
        sign_key: 'wertyuiolehjkl',
        //应用APPID
        app_id: '1002210',
        //签名密钥
        app_secret: 'plkjhfrtyuj',
        //网关地址
        gateway: 'http://admin.emide.cn/#/orderList',
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
      },
      //编辑参数
      editForm: {
        pay_order_id: "",

        out_trade_id: "",

        username: '',

        pay_amount: '',

        pay_poundage: '',

        pay_actual_amount: '',

        pay_apply_date: '',

        pay_success_date: '',

        pay_status: "",
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

      // 校验规则
      rules: {
        code: [
          { required: true, message: '请输入通道英文编码', trigger: 'change' },
          { min: 4, max: 80, message: '通道中文名称超出长度范围[4-80]' },
        ],
        title: [
          { required: true, message: '请输入通道名称', trigger: 'change' },
        ],
        gateway: [
          { required: true, message: '请输入网关地址', trigger: 'change' },
        ]
      },

      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:'',
      // 管理员信息数据
      tableData: [],
      viewTableData: [],
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
    switchTime(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear() + '-';
      let m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let d = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      let updated_at = y + m + d;
      return updated_at;
    },
    getSelectData() {
      // _get("api/channel/select").then(res => {
        let params={"id":"a",name:"全部"};
        this.typeOptions = [...ephemeral.financeM.merchant_select.data];
        this.typeOptions.unshift(params);
      // })
    },
    getChanelData() {
      // _get("api/paytype/select").then(res => {
        let params = { "id": 'a', name: '全部' };
        this.chanelOptions = [...ephemeral.order.paytype_select.data];
        this.chanelOptions.unshift(params);
      //   let params = { "id": 'a', name: '全部' };
      //   this.chanelOptions = res.data.data;
      //   this.chanelOptions.unshift(params);
      // })
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
      _get("/merchant/order/success", params).then(res => {
console.log(res)
        let paramsData = ephemeral.order.success.data;
        let data = paramsData.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          //this.tableData = data;
          let tableList = [];
          for (var i = 0; i < data.length; i++) {
            let search_status = data[i].search_status;
            let lock_status = data[i].lock_status;
            let pay_status=data[i].pay_status;
            let is_callback=data[i].is_callback;
            let callbackStatus;
            if (pay_status == 1 && is_callback == 0) {
              callbackStatus = 0;
            } else{
              callbackStatus = 1;
            }
            if (search_status == 0) {
              search_status = '未支付';
            } else if (search_status == 1) {
              search_status = '已支付未通知';
            } else if (search_status == 2) {
              search_status = '已支付已通知';
            }
            tableList.push({
              id: data[i].id,
              pay_order_id: data[i].pay_order_id,
              out_trade_id: data[i].out_trade_id,
              pay_amount: data[i].pay_amount,
              pay_poundage: data[i].pay_poundage,
              pay_actual_amount: data[i].pay_actual_amount,
              search_status: search_status,
              callbackStatus:callbackStatus,
              pay_apply_date: this.switchTime(data[i].pay_apply_date),
              pay_success_date: this.switchTime(data[i].pay_success_date),
              pay_type_id: data[i].pay_type_id,
              channel_id: data[i].channel_id,
              order_type: data[i].order_type ? ' 收款订单' : '充值订单',
              merchant: data[i].merchant,
              channel:data[i].channel,
              type:data[i].type,
              lock_status:data[i].lock_status,
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

    //修改通道列表状态
    handleStatus(index, row) {
      let params = {
        status: row.status ? 1 : 0,
      }
      _put("api/channel/status/" + row.id, params).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })

    },
    // 编辑通道信息
    handleEdit(index, row) {
      // let params={id:row.id};
      _get("api/order/" + row.id).then(res => {
        let data = res.data.data;
        this.editForm.pay_order_id = data.pay_order_id;
        this.editForm.out_trade_id = data.out_trade_id;
        this.editForm.username = data.merchant.username;
        this.editForm.pay_amount = data.pay_amount;
        this.editForm.pay_poundage = data.pay_poundage;
        this.editForm.pay_actual_amount = data.pay_actual_amount;
        this.editForm.pay_apply_date = this.switchTime(data.pay_apply_date);
        this.editForm.pay_success_date = this.switchTime(data.pay_success_date);
        let pay_status = data.search_status;
        if (pay_status == 0) {
          pay_status = '未支付';
        } else if (pay_status == 1) {
          pay_status = '已支付未通知';
        } else if (pay_status == 2) {
          pay_status = '已支付已通知';
        } else if (pay_status == 3) {
          pay_status = '订单冻结';
        } else {
          pay_status = '订单解冻';
        }
        this.editForm.pay_status = pay_status;
      })

      //编辑信息
      this.outerVisible = true;
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
    switchDate(d) {
      let date = JSON.stringify(d);
      let dateStr = date.split(",");
      let dateArr = JSON.parse(dateStr);
      return dateArr;
    },
    //补发订单
    handleOrder(index, row){
      this.$confirm(`确定补发订单吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _get("api/order/reissue/" + row.pay_order_id).then(res => {
              this.handleSearch();
              this.$message({
                message: "冻补发成功",
                type: "success"
              });
            }).catch(error => {
              this.$message({
                message: "补发失败",
                type: "error"
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消补发订单"
              });
            });
        });
    },
    handleSearch() {
      let params = {
        pay_order_id: this.pay_order_id,
        pay_apply_date: this.switchDate(this.pay_apply_date),
        pay_success_date: this.switchDate(this.pay_success_date),
        pay_type_id: this.pay_type_id=='a'?'':this.pay_type_id,
        channel_id: this.channel_id=='a'?'':this.channel_id,
        search_status:this.pay_status=='a'?'':this.pay_status,
        order_type: this.order_type=='a'?'':this.order_type,
        lock_status:this.order_status=='a'?'':this.order_status,
        per_page: this.pageSize,
        page:this.page 
      };
      this.getTableData(params);
    },
    //冻结订单
    TransactionCharge(index, row) {
      this.$confirm(`确定冻结订单吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           _get("api/order/freeze/"+row.id).then(res=>{
            this.handleSearch();
            this.$message({
              message: "冻结成功",
              type: "success"
            });
          }).catch(error=>{
            this.$message({
              message: "冻结失败",
              type: "error"
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消冻结设置"
          });
        });
      });
    },
    submitTransactionForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(`确定设置订单为已支付吗?`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              _get("api/order/paid/" + this.TransactionForm.id).then(res => {
                this.$message({
                  type: "success",
                  message: "设置成功!"
                });
                this.dialogFormTransaction = false;
              })

            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消设置"
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }

};
