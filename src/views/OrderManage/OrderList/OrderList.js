import { log } from "util";
import {
  _get,
  _post,
  _put,
  _delete,
  switchTime,
  paytypeSelect,
  channelSelect
} from "../../../api/index.js";
export default {
  name: "AccessConfig",
  data() {
    return {
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      //查询参数
      pay_order_id: "",
      pay_type_id: "",
      pay_apply_date: "",
      pay_success_date: "",
      order_type: "",
      order_status: "",
      channel_id: "",
      pay_status: "",
      typeOptions: [],
      chanelOptions: [],
      statusOptions: [
        {
          value: "a",
          label: "全部"
        },
        {
          value: "0",
          label: "未支付"
        },
        {
          value: "1",
          label: "已支付未通知"
        },
        {
          value: "2",
          label: "已支付已通知"
        }
      ],
      orderTypes: [
        {
          value: "a",
          label: "全部"
        },
        {
          value: "0",
          label: "充值订单"
        },
        {
          value: "1",
          label: "收款订单"
        }
      ],
      selectSatus: [
        {
          value: "a",
          label: "全部"
        },
        {
          value: "0",
          label: "待支付"
        },
        {
          value: "1",
          label: "已支付"
        }
      ],

      //新增权限信息
      selectTitle: "",
      options: [
        {
          value: "1",
          label: "普通商户"
        }
      ],
      sex: "男",
      sexOptions: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      //风控表单
      TransactionForm: {
        id: "",
        pay_order_id: "",
        pay_amount: ""
      },
      TransactionRules: {
        paying_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        min_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        max_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ]
      },
      RateForm: {
        id: "",
        //通道ID
        channel_id: "",
        //封顶手续费
        capping_fee: "",
        //银行费率
        rate: "",
        //T0运营费率
        t0_default_rate: "",
        //T0封顶手续费
        t0_capping_fee: "",
        //T0成本费率
        t0_rate: ""
      },
      RateRules: {
        capping_fee: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        rate: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        t0_default_rate: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        t0_capping_fee: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        t0_rate: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ]
      },
      // 提交的参数
      addForm: {
        //通道英文编码
        code: "AlipayScanDemo",
        //通道名称
        title: "支付宝扫码Demo",
        //商户号
        mch_id: "1000001",
        //签名密钥
        sign_key: "wertyuiolehjkl",
        //应用APPID
        app_id: "1002210",
        //签名密钥
        app_secret: "plkjhfrtyuj",
        //网关地址
        gateway: "http://admin.emide.cn/#/orderList",
        //页面跳转网址
        page_return: "",
        //服务器通知网址
        server_return: "",
        //防封域名
        unlock_domain: "",
        //状态 1开启 0关闭
        status: true,
        //支付分类ID
        pay_type_id: ""
      },
      //编辑参数
      editForm: {},
      chargeForm: {
        pay_type_id: "",
        change_money: "",
        content: "",
        type: ""
      },
      //风控设置
      transaction: true,
      dialogFormTransaction: false,

      // 校验规则
      rules: {
        code: [
          { required: true, message: "请输入通道英文编码", trigger: "change" },
          { min: 4, max: 80, message: "通道中文名称超出长度范围[4-80]" }
        ],
        title: [
          { required: true, message: "请输入通道名称", trigger: "change" }
        ],
        gateway: [
          { required: true, message: "请输入网关地址", trigger: "change" }
        ]
      },

      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page: "",
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
      //通道列表
      channelOptions: [],
      // 查询需要的参数对象
      orderInquire: {
        out_trade_id: "", //订单号
        pay_status: "", //订单状态 0 待支付 1 已支付
        // 'pay_apply_date':'',//创建时间
        // 'pay_success_date':'',//成功时间
        channel_id: "", //通道id
        pay_type_id: "", // 通道分类id
        order_type: "" //订单类型 0 充值 1 收款
      }
    };
  },
  created() {
    this.getTableData("");
    this.getSelectData();
  },
  methods: {
    getSelectData() {
      paytypeSelect().then(res => {
        this.typeOptions = [...res.data.data];
        this.typeOptions.unshift({ id: "a", name: "全部通道" });
      });
      channelSelect().then(res => {
        this.chanelOptions = [...res.data.data];
        this.chanelOptions.unshift({ id: "a", title: "全部支付分类" });
      });
    },

    handleType() {
      let params = {
        type: this.chargeForm.type
      };
      this.getChangeTypeData();
    },
    getChangeTypeData() {
      // _get("api/change-type/select").then(res => {
      // this.changeOptions = ephemeral.financeM.accpunt_change_type_select.data;
      // })
    },
    getTableData(params) {
      _get("merchant/order", params).then(res => {
        let data = [...res.data.data.data];
        data.forEach(element => {
          isNaN(element.pay_apply_date)
            ? element.pay_apply_date
            : (element.pay_apply_date = switchTime(element.pay_apply_date));
          isNaN(element.pay_success_date)
            ? element.pay_success_date
            : (element.pay_success_date = switchTime(element.pay_success_date));
          element.pay_status == "0"
            ? (element.pay_status_text = "待支付")
            : (element.pay_status_text = "已支付");
          element.order_type == "0"
            ? (element.order_type_text = "充值订单")
            : (element.order_type_text = "收款订单");
        });
        this.tableData = data;
        let paramsData =res.data.data;
        this.currentPage = paramsData.current_page;
        this.last_page_url = paramsData.last_page_url;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
      });
    },
    formatter(row, column) {
      return row.address;
    },

    //修改通道列表状态
    handleStatus(index, row) {
      let params = {
        status: row.status ? 1 : 0
      };
      _put("api/channel/status/" + row.id, params).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      });
    },
    // 编辑通道信息
    handleEdit(index, row) {
      _get("merchant/order/" + row.id).then(res => {
        let data = { ...res.data.data };
        isNaN(data.pay_apply_date)
          ? ""
          : (data.pay_apply_date = switchTime(data.pay_apply_date));
        isNaN(data.pay_success_date)
          ? ""
          : data.pay_success_date == "0"
          ? (data.pay_success_date = "暂无成功时间")
          : (data.pay_success_date = switchTime(data.pay_success_date));
        data.pay_status == "0"
          ? (data.pay_status = "待支付")
          : (data.pay_status = "已支付");
        this.editForm = data;
         //编辑信息
      this.outerVisible = true;
      });
    },

    // 选择页容量
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
    },
    // 添加信息
    addChanel() {
      this.dialogFormVisible = true;
    },
    submitChargeForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            pay_type_id: this.chargeForm.pay_type_id,
            change_money: +this.chargeForm.change_money,
            content: this.chargeForm.content
          };
          _post("api/merchant/charge/" + this.chargeId, params)
            .then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogFormCharge = false;
            })
            .catch(error => {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
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
        ...this.orderInquire,
        per_page: this.pageSize,
        page: this.page
      };
      this.getTableData(params);
    },
    //设置订单
    TransactionCharge(index, row) {
      this.TransactionForm.id = row.id;
      this.TransactionForm.pay_order_id = row.pay_order_id;
      this.TransactionForm.pay_amount = row.pay_amount;

      this.dialogFormTransaction = true;
    },
    submitTransactionForm(formName) {
      this.$refs[formName].validate(valid => {
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
                this.handleSearch();
                this.dialogFormTransaction = false;
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消设置"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    freezeCharge(index, row) {
      this.$confirm(`确定冻结订单吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _get("api/order/freeze/" + row.id)
          .then(res => {
            this.handleSearch();
            this.$message({
              message: "冻结成功",
              type: "success"
            });
          })
          .catch(error => {
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
    handleOrder(index, row) {
      this.$confirm(`确定补发订单吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _get("api/order/reissue/" + row.pay_order_id)
          .then(res => {
            this.handleSearch();
            this.$message({
              message: "冻补发成功",
              type: "success"
            });
          })
          .catch(error => {
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
    }
  }
};
