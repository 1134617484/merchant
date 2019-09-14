import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
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
      channel_id: '',
      pay_status: '',
      typeOptions: [],
      chanelOptions: [],
      //订单状态
      statusOptions: [{
          value: '0',
          label: '未支付'
        },
        {
          value: '1',
          label: '已支付未返回'
        },
        {
          value: '2',
          label: '已支付已返回'
        }
      ],
      payTypeOpions: [{
          value: '0',
          label: '未支付'
        },
        {
          value: '1',
          label: '已支付未返回'
        },
        {
          value: '2',
          label: '已支付已返回'
        }
      ],
      orderTypes: [{
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
        id:"",
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
      _get("api/paytype/select").then(res => {
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
      _get("api/order", params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          //this.tableData = data;
          let tableList = [];
          let pay_status;
          for (var i = 0; i < data.length; i++) {
            pay_status = data[i].pay_status;
            if (pay_status == 0) {
              pay_status = '未支付';
            } else if (pay_status == 1) {
              pay_status = '已支付未返回';
            } else {
              pay_status = '已支付已返回';
            }
            tableList.push({
              id: data[i].id,
              pay_order_id: data[i].pay_order_id,
              out_trade_id: data[i].out_trade_id,
              pay_amount: data[i].pay_amount,
              pay_poundage: data[i].pay_poundage,
              pay_actual_amount: data[i].pay_actual_amount,
              pay_status: pay_status,
              pay_apply_date: this.switchTime(data[i].pay_apply_date),
              pay_success_date: this.switchTime(data[i].pay_success_date),
              pay_type_id: data[i].pay_type_id,
              channel_id: data[i].channel_id,
              order_type: data[i].order_type ? ' 收款订单' : '充值订单',
              merchant: data[i].merchant,
            })
          }
          this.tableData = tableList;
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
        this.getTableData();
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
        let pay_status = data.pay_status;
        if (pay_status == 0) {
          pay_status = '未支付';
        } else if (pay_status == 1) {
          pay_status = '已支付未返回';
        } else {
          pay_status = '已支付已返回';
        }
        this.editForm.pay_status = pay_status;
      })

      //编辑信息
      this.outerVisible = true;
    },

    // 选择页容量
    handleSizeChange(val) {
      let params = { per_page: val };
      this.getTableData(params);
    },
    handleCurrentChange(val) {
      let params = { page: val };
      this.getTableData(params);
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
    handleSearch() {
      let params = {
        pay_order_id: this.pay_order_id,
        pay_apply_date: this.switchDate(this.pay_apply_date),
        pay_success_date: this.switchDate(this.pay_success_date),
        pay_type_id: this.pay_type_id,
        channel_id: this.channel_id,
        order_type: this.order_type,
      };
      this.getTableData(params);
    },
    //编辑风控
    TransactionCharge(index, row) {
      this.TransactionForm.id=row.id;
      this.TransactionForm.pay_order_id = row.pay_order_id;
      this.TransactionForm.pay_amount = row.pay_amount;

      this.dialogFormTransaction = true;
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
              _get("api/order/paid/"+this.TransactionForm.id).then(res => {
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
