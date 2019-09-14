import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js";
import selectItem from "../../../components/ChanelSelect.vue";
import Clipboard from "clipboard";
import { Loading } from "element-ui";
export default {
  name: "AccessConfig",
  data() {
    return {
      //查询参数
      status: "",
      name: "",
      date: "",
      typeOptions: [],
      rate: [],
      polling: 1,
      payOptions: [
        {
          id: "1",
          label: "加款"
        },
        {
          id: "2",
          label: "扣款"
        }
      ],
      statsuOptions: [
        {
          value: "a",
          label: "全部"
        },
        {
          value: "0",
          label: "禁用"
        },
        {
          value: "1",
          label: "激活"
        }
      ],
      selectValue: "",
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
      // 提交的参数
      addForm: {
        //用户名
        username: "演示人员",
        //姓名
        realname: "111",
        //身份证
        idcard: "43052319950613312X",
        //生日
        birthday: "2019-07-30",
        //手机
        mobile: "13266522726",
        //QQ
        qq: "995289123",
        //邮箱
        email: "support@pay.com",
        //商户类型 (现在只有普通商户)
        type: "普通商户",
        //地址
        address: "1111111",
        //登录密码
        password: "123456",
        //支付密码
        pay_password: "123456",
        //授权访问域名
        domain: "test.com",
        //API秘钥
        apikey: "fasdfasdfdsa",
        //提现规则
        custom_withdraw: "0",
        //风控规则
        custom_risk: "0"
      },
      //编辑参数
      editForm: {
        id: "",
        //用户名
        username: "演示人员",
        //姓名
        realname: "111",
        //身份证
        idcard: "43052319950613312X",
        //生日
        birthday: "2019-07-30",
        //手机
        mobile: "13266522726",
        //QQ
        qq: "995289123",
        //邮箱
        email: "support@pay.com",
        //商户类型 (现在只有普通商户)
        type: "普通商户",
        //地址
        address: "1111111",
        //登录密码
        password: "123456",
        //支付密码
        pay_password: "123456",
        //授权访问域名
        domain: "test.com",
        //API秘钥
        apikey: "fasdfasdfdsa",
        //提现规则
        custom_withdraw: "0",
        //风控规则
        custom_risk: "0"
      },
      chargeForm: {
        pay_type_id: "",
        change_money: "",
        content: "",
        type: ""
      },
      //风控设置
      riskDisabled: false,
      transaction: true,
      dialogFormTransaction: false,
      TransactionIsDefault: true,
      custom_risk: "0",
      //风控表单
      TransactionForm: {
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
        time_unit: "",
        //单位事件次数
        unit_number: 0,
        //单位时间金额
        unit_all_money: 0,
        // 状态
        status: true,
        //交易时间
        start_time: "",
        end_time: ""
      },
      defaultTransactionForm: {
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
        time_unit: "",
        //单位事件次数
        unit_number: 0,
        //单位时间金额
        unit_all_money: 0,
        // 状态
        status: true,
        //交易时间
        start_time: "",
        end_time: ""
      },
      TransactionRules: {
        time_unit: [
          { required: true, message: "请输入限制时间单位", trigger: "change" }
        ],
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
        ],
        all_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        unit_interval: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        unit_number: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ],
        unit_all_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ]
      },
      unitOptions: [
        {
          value: 1,
          label: "秒"
        },
        {
          value: 60,
          label: "分"
        },
        {
          value: 3600,
          label: "时"
        },
        {
          value: 86400,
          label: "天"
        }
      ],
      //编辑通道
      dialogFormChanel: false,
      channelId: "",
      selectRadio: 1,
      selectIndex: 1,
      radio_single: true,
      chanelTable: [
        {
          status: 0,
          title: "支付宝111"
          // products: {
          //   polling: 1,
          // }
        },
        {
          status: 1,
          title: "支付宝扫码1111"
          // products: {
          //   polling: 1,
          // }
        },
        {
          status: 1,
          title: "支付宝扫扫码测试通道"
          // products: {
          //   polling: 1,
          // }
        },
        {
          status: 1,
          title: "支付宝扫码Demo12"
          // products: {
          //   polling: 2,
          // }
        },
        {
          status: 0,
          title: "支付宝扫"
          // products: {
          //   polling: 2,
          // }
        }
      ],
      tableData3: [
        {
          code: "2016-05-03",
          name: "王小虎",
          weight: 1
        },
        {
          code: "199",
          name: "微信扫码支付",
          weight: 2
        },
        {
          code: "2016-05-04",
          name: "王小虎",
          weight: 1
        }
      ],
      multipleSelection: [],
      //费率
      dialogFormRate: false,
      tableRateData: [],
      rateId: "",
      RateForm: {
        id: "",
        //通道ID
        channel_id: "",
        //封顶手续费
        capping_fee: "",
        //银行费率
        rate: "",
        //t1运营费率
        t1_default_rate: "",
        //t1封顶手续费
        t1_capping_fee: "",
        //t1成本费率
        t1_rate: ""
      },
      //资金变动类型列表
      changeOptions: [],
      // 校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        realname: [
          { required: true, message: "请输入姓名", trigger: "change" }
        ],
        domain: [
          { required: true, message: "请输入授权域名", trigger: "change" }
        ],
        pay_password: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateAccess,
            trigger: "change"
          },
          { min: 6, message: "请输入6-16位数字或字母", max: 16 }
        ],
        idcard: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().ID,
            trigger: "change"
          }
        ],
        mobile: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validatePhone,
            trigger: "change"
          }
        ],
        qq: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateQQ,
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateEmail,
            trigger: "change"
          }
        ],
        change_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ]
      },
      chargeRules: {
        content: [{ required: true, message: "请输入描述", trigger: "change" }],
        change_money: [
          {
            required: true,
            validator: this.$rules.FormValidate.Form().validateNumber,
            trigger: "change"
          }
        ]
      },
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page: "",
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
      //提现
      WithdrawDisabled: false,
      WithdrawIsDefault: true,
      custom_withdraw: "0",
      WithdrawVisible: false,
      formLabelWidth1: "140px",
      defaultWithdrawForm: {
        merchant_id: "",
        //提款状态
        status: "",
        //提款手续费类型
        fee_type: "",
        //单笔提款比例
        fee_proportion: 0,
        //单笔提款手续费
        fee: 0,
        //提款允许开始时间
        allow_start_time: "",
        //提款允许结束时间
        allow_end_time: "",
        //单人单卡单日最高提现额
        day_card_money: 0,
        //扣除手续费方式
        charge_type: 0,
        //当日最大金额
        day_max_money: 0,
        //当日最大次数
        day_max_count: 0,
        //节假日排除日期
        day_expect: "",
        //单笔最小金额
        unit_min_money: "",
        //单笔最大金额
        unit_max_money: ""
      },
      WithdrawForm: {
        merchant_id: "",
        //提款状态
        status: "",
        //提款手续费类型
        fee_type: "",
        //单笔提款比例
        fee_proportion: 0,
        //单笔提款手续费
        fee: 0,
        //提款允许开始时间
        allow_start_time: "",
        //提款允许结束时间
        allow_end_time: "",
        //单人单卡单日最高提现额
        day_card_money: 0,
        //扣除手续费方式
        charge_type: 0,
        //当日最大金额
        day_max_money: 0,
        //当日最大次数
        day_max_count: 0,
        //节假日排除日期
        day_expect: "",
        //单笔最小金额
        unit_min_money: "",
        //单笔最大金额
        unit_max_money: "",
        //单笔最小金额
        unit_min_money: "",
        //单笔最大金额
        unit_max_money: ""
      },
      fee_typeOptions: [
        {
          value: "0",
          label: "每笔"
        },
        {
          value: "1",
          label: "按比例"
        }
      ],
      charge_typeOptions: [
        {
          value: "1",
          label: "扣除到账金额"
        },
        {
          value: "2",
          label: "扣除商户余额"
        }
      ],
      // 暂存 密钥提交信息
      nowInquireKey: {},
      dialogInquireKey: false, //密钥弹窗状态
      // 暂存 安全码和密码信息
      nowSecureKey: {
        password: "",
        securityCode: ""
      },
      dialogSecureKey: false, //安全码弹窗状态
      // 暂存 当前操作的商户id 针对于密钥安全码
      nowMerchantId: ""
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
    //this.getChangeTypeData();
    this.getChanelList();
  },
  methods: {
    getChanelList() {
      _get("api/channel/lists").then(res => {
        let chanelList = res.data.data;
      });
    },
    getSelectMenuData() {
      _get("api/merchant/select").then(res => {
        this.typeOptions = res.data.data;
        let params = {
          id: "a",
          name: "全部"
        };
        this.typeOptions.unshift(params);
      });
    },
    handleType() {
      let params = {
        type: this.chargeForm.type
      };
      _get("api/change-type/select", params).then(res => {
        this.changeOptions = res.data.data;
      });
    },
    getChangeTypeData() {
      _get("api/change-type/select").then(res => {
        this.changeOptions = res.data.data;
      });
    },
    switchTime(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear() + "-";
      let m =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let d =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h = date.getHours();
      let mm = date.getMinutes();
      let s = date.getSeconds();
      let updated_at = y + m + d + "" + h + ":" + mm + ":" + s;
      return updated_at;
    },
    getTime(time) {
      let date = new Date(time * 1000);
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return hour + ":" + minute + ":" + second;
    },
    getTableData(params) {
      _get("api/merchant/authorized", params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          let tableList = [];
          for (let i = 0; i < data.length; i++) {
            tableList.push({
              id: data[i].id,
              username: data[i].username,
              realname: data[i].realname,
              mobile: data[i].mobile,
              created_at: data[i].created_at,
              updated_at: this.switchTime(data[i].last_login_time),
              status: data[i].status ? true : false,
              open_charge: data[i].open_charge ? true : false,
              fund: data[i].fund,
              withdraw: data[i].withdraw,
              risk: data[i].risk,
              rate: data[i].rate,
              custom_withdraw: data[i].custom_withdraw,
              custom_risk: data[i].custom_risk
            });
          }
          this.tableData = tableList;
        } else {
          this.tableData = [];
        }
      });
    },
    formatter(row, column) {
      return row.address;
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
      });
    },
    // 编辑商户信息
    handleEdit(index, row) {
      _get("api/merchant/" + row.id).then(res => {
        let data = res.data.data;
        let time = data.birthday;
        let date = new Date(time * 1000);
        let y = date.getFullYear() + "-";
        let m =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let d =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        let birthday = y + m + d;
        this.editForm.id = data.id;
        this.editForm.username = data.username;
        this.editForm.email = data.email;
        this.editForm.realname = data.realname;
        this.sex = data.sex == 0 ? "男" : "女";
        this.birthday = birthday;
        this.editForm.idcard = data.idcard;
        this.editForm.mobile = data.mobile;
        this.editForm.qq = data.qq;
        this.editForm.address = data.address;
        this.editForm.pay_password = data.pay_password;
        this.editForm.domain = data.domain;
        this.editForm.apikey = data.apikey;
        this.editForm.custom_withdraw = data.custom_withdraw ? "1" : "0";
        this.editForm.custom_risk = data.custom_risk ? "1" : "0";
      });

      //编辑信息
      this.outerVisible = true;
    },
    isUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let date = new Date(this.editForm.birthday);
          let time = date.valueOf();
          let params = {
            username: this.editForm.username,
            realname: this.editForm.realname,
            sex: this.sex == "男" ? 0 : 1,
            idcard: this.editForm.idcard,
            birthday: time / 1000,
            idcard: this.editForm.idcard,
            mobile: this.editForm.mobile,
            email: this.editForm.email,
            qq: this.editForm.qq,
            type: 1,
            address: this.editForm.address,
            password: this.editForm.password,
            pay_password: this.editForm.pay_password,
            domain: this.editForm.domain,
            apikey: this.editForm.apikey,
            custom_withdraw: this.editForm.custom_withdraw,
            custom_risk: this.editForm.custom_risk
          };
          this.$confirm("确定修改吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _put("api/merchant/" + this.editForm.id, params)
                .then(res => {
                  let params = { per_page: this.pageSize, page: this.page };
                  this.handleSearch();
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                })
                .catch(error => {
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
          console.log("error submit!!");
          return false;
        }
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          let date = new Date(this.addForm.birthday);
          let time = date.valueOf();
          // alert(time);
          let params = {
            username: this.addForm.username,
            realname: this.addForm.realname,
            sex: this.sex == "男" ? 0 : 1,
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
            custom_risk: this.addForm.custom_risk
          };
          _post("api/merchant", params)
            .then(res => {
              this.getTableData();
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisible = false;
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
    // 添加信息
    merchantCharge(index, row) {
      //console.log(row.id);
      this.chargeId = row.id;
      this.dialogFormCharge = true;
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
    handleSearch() {
      let date = JSON.stringify(this.date);
      let dateStr = date.split(",");
      let dateArr = JSON.parse(dateStr);
      let params = {
        id: this.name=='a'?'':this.name,
        created_at: dateArr,
        status: this.status=='a'?'':this.status,
        per_page: this.pageSize,
        page: this.page
      };
      this.getTableData(params);
    },
    //风控设置
    handleTransactionRadio(val) {
      if (val == "0") {
        this.TransactionIsDefault = true;
        this.riskDisabled = true;
      } else {
        this.TransactionIsDefault = false;
        this.riskDisabled = false;
      }
    },
    TransactionCharge(index, row) {
      this.TransactionIsDefault = row.custom_risk == 0 ? true : false;
      this.riskDisabled = row.custom_risk == 0 ? true : false;
      this.custom_risk = row.custom_risk + "";
      _get("api/transaction").then(res => {
        let data = res.data.data;
        this.defaultTransactionForm.id = data.id;
        this.defaultTransactionForm.merchant_id = data.merchant_id;
        this.defaultTransactionForm.status = data.status ? true : false;
        this.defaultTransactionForm.min_money = data.min_money;
        this.defaultTransactionForm.max_money = data.max_money;
        this.defaultTransactionForm.all_money = data.all_money;
        this.defaultTransactionForm.start_time = data.start_time;
        this.defaultTransactionForm.end_time = data.end_time;
        this.defaultTransactionForm.unit_interval = data.unit_interval;
        this.defaultTransactionForm.time_unit = +data.time_unit;
        this.defaultTransactionForm.unit_number = data.unit_number;
        this.defaultTransactionForm.unit_all_money = data.unit_all_money;
      });
      _get("api/merchant-risk/" + row.risk.id).then(res => {
        let data = res.data.data;
        this.TransactionForm.id = data.id;
        this.TransactionForm.merchant_id = data.merchant_id;
        this.TransactionForm.status = data.status ? true : false;
        this.TransactionForm.min_money = data.min_money;
        this.TransactionForm.max_money = data.max_money;
        this.TransactionForm.all_money = data.all_money;
        this.TransactionForm.start_time = data.start_time;
        this.TransactionForm.end_time = data.end_time;
        this.TransactionForm.unit_interval = data.unit_interval;
        this.TransactionForm.time_unit = +data.time_unit;
        this.TransactionForm.unit_number = data.unit_number;
        this.TransactionForm.unit_all_money = data.unit_all_money;
      });

      this.dialogFormTransaction = true;
    },
    submitTransactionForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            +this.TransactionForm.min_money < +this.TransactionForm.max_money
          ) {
            let params = {
              merchant_id: this.TransactionForm.merchant_id,
              status: this.TransactionForm.status ? 1 : 0,
              // paying_money: this.TransactionForm.paying_money,
              all_money: this.TransactionForm.all_money,
              min_money: this.TransactionForm.min_money,
              max_money: this.TransactionForm.max_money,
              start_time: this.TransactionForm.start_time,
              end_time: this.TransactionForm.end_time,
              unit_interval: this.TransactionForm.unit_interval,
              time_unit: this.TransactionForm.time_unit,
              unit_number: this.TransactionForm.unit_number,
              unit_all_money: this.TransactionForm.unit_all_money
            };
            _put("api/merchant-risk/" + this.TransactionForm.id, params)
              .then(res => {
                this.handleSearch();
                this.$message({
                  message: "风控设置成功",
                  type: "success"
                });
                this.dialogFormTransaction = false;
              })
              .catch(error => {
                this.$message({
                  message: "风控设置失败",
                  type: "error"
                });
              });
          } else {
            this.$message({
              message: "单笔最小金额不能大于最大金额",
              type: "error"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑通道
    chanelCharge(index, row) {
      // this.toggleSelection([this.chanelTable[3]]);
      this.channelId = row.id;
      let params = { id: row.id };
      this.chanelTable = [];
      _get("api/merchant/distribution/" + row.id).then(res => {
        this.chanelTable = res.data.data;
        // this.toggleSelection([this.channelData[0]]);
        setTimeout(() => {
          for (let i = 0; i < this.chanelTable.length; i++) {
            if (this.chanelTable[i].active) {
              this.$refs.multipleTable.toggleRowSelection(
                this.chanelTable[i],
                true
              );
            } else {
              console.log(null);
            }
          }
        }, 100);
      });
      this.dialogFormChanel = true;
    },
    handleRadio(value) {
      console.log(value, "value");
      if (value === 1) {
        this.selectRadio = 1;
      } else {
        this.selectRadio = 2;
      }
      // console.log(row.select.radio);
      this.selectIndex = value;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    submitChanelForm() {
      let arr = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        arr.push({
          product_id: this.multipleSelection[i].id,
          active: true
        });
      }
      let params = { products: arr };
      _put("api/merchant/distributionsave/" + this.channelId, params)
        .then(res => {
          this.handleSearch();
          this.$message({
            message: "分配产品设置成功",
            type: "success"
          });
          this.dialogFormChanel = false;
        })
        .catch(error => {
          this.$message({
            message: "分配产品设置失败",
            type: "error"
          });
        });
    },
    RateCharge(index, row) {
      /*this.tableRateData = row.rate;
      this.rateId = row.id;*/
      if (row.rate != null) {
        this.RateForm.id = row.rate.id;
        this.RateForm.capping_fee = row.rate.capping_fee;
        this.RateForm.rate = row.rate.rate;
        this.RateForm.t1_default_rate = row.rate.t1_default_rate;
        this.RateForm.t1_capping_fee = row.rate.t1_capping_fee;
        this.RateForm.t1_rate = row.rate.t1_rate;
        this.dialogFormRate = true;
      } else {
        this.$message({
          message: "费率id不存在",
          type: "error"
        });
      }
      // this.dialogFormRate = true;
    },
    submitRateForm() {
      let params = {
        capping_fee: this.RateForm.capping_fee,
        rate: this.RateForm.rate,
        t1_default_rate: this.RateForm.t1_default_rate,
        t1_capping_fee: this.RateForm.t1_capping_fee,
        t1_rate: this.RateForm.t1_rate
      };
      _put("api/merchant-rate/" + this.RateForm.id, params)
        .then(res => {
          this.handleSearch();
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormRate = false;
        })
        .catch(error => {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        });
    },
    callBackTime(t) {
      let time = t.split(",");
      let date = [time[0], time[1]];
      return date;
    },
    //提现，
    handleWithdrawRadio(val) {
      if (val == "0") {
        this.WithdrawIsDefault = true;
        this.WithdrawDisabled = true;
      } else {
        this.WithdrawIsDefault = false;
        this.WithdrawDisabled = false;
      }
    },
    handleWithdraw(index, row) {
      this.custom_withdraw = row.custom_withdraw + "";
      this.WithdrawIsDefault = row.custom_withdraw == 0 ? true : false;
      this.WithdrawDisabled = row.custom_withdraw == 0 ? true : false;
      _get("api/cash").then(res => {
        let data = res.data.data;
        this.defaultWithdrawForm.fee_type = data.fee_type + "";
        this.defaultWithdrawForm.fee_proportion = data.fee_proportion;
        this.defaultWithdrawForm.day_card_money = data.day_card_money;
        this.defaultWithdrawForm.fee = data.fee;
        this.defaultWithdrawForm.allow_start_time = data.allow_start_time;
        this.defaultWithdrawForm.allow_end_time = data.allow_end_time;
        this.defaultWithdrawForm.charge_type = data.charge_type + "";
        this.defaultWithdrawForm.day_max_money = data.day_max_money;
        this.defaultWithdrawForm.day_max_count = data.day_max_count;
        this.defaultWithdrawForm.unit_min_money = data.unit_min_money;
        this.defaultWithdrawForm.unit_max_money = data.unit_max_money;
        this.defaultWithdrawForm.status = data.status ? true : false;
        this.defaultWithdrawForm.day_expect = this.callBackTime(
          data.day_expect
        );
      });
      _get("api/merchant-withdraw/" + row.withdraw.id).then(res => {
        let data = res.data.data;
        this.WithdrawForm.merchant_id = data.id;
        this.WithdrawForm.fee_type = data.fee_type + "";
        this.WithdrawForm.fee_proportion = data.fee_proportion;
        this.WithdrawForm.day_card_money = data.day_card_money;
        this.WithdrawForm.fee = data.fee;
        this.WithdrawForm.allow_start_time = data.allow_start_time;
        this.WithdrawForm.allow_end_time = data.allow_end_time;
        this.WithdrawForm.charge_type = data.charge_type + "";
        this.WithdrawForm.day_max_money = data.day_max_money;
        this.WithdrawForm.day_max_count = data.day_max_count;
        this.WithdrawForm.unit_min_money = data.unit_min_money;
        this.WithdrawForm.unit_max_money = data.unit_max_money;
        this.WithdrawForm.status = data.status ? true : false;
        this.WithdrawForm.day_expect = this.callBackTime(data.day_expect);
      });
      //编辑信息
      this.WithdrawVisible = true;
    },
    getSubmitDate(d) {
      let date = d;
      let dateStr = date.join(",");
      return dateStr;
    },
    submitWithdrawForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            unit_min_money: this.WithdrawForm.unit_min_money,
            unit_max_money: this.WithdrawForm.unit_max_money,
            fee_type: this.WithdrawForm.fee_type,
            fee_proportion: this.WithdrawForm.fee_proportion,
            fee: this.WithdrawForm.fee,
            allow_start_time: this.WithdrawForm.allow_start_time,
            allow_end_time: this.WithdrawForm.allow_end_time,
            charge_type: this.WithdrawForm.charge_type,
            day_max_money: this.WithdrawForm.day_max_money,
            day_max_count: this.WithdrawForm.day_max_count,
            status: this.WithdrawForm.status ? 1 : 0,
            day_card_money: this.WithdrawForm.day_card_money,
            day_expect: this.getSubmitDate(this.WithdrawForm.day_expect)
          };
          _put("api/merchant-withdraw/" + this.WithdrawForm.merchant_id, params)
            .then(res => {
              this.handleSearch();
              this.$message({
                message: "提现修改成功",
                type: "success"
              });
              this.WithdrawVisible = false;
            })
            .catch(error => {
              this.$message({
                message: "提现修改失败",
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //密钥
    inquireKey(data) {
      this.dialogInquireKey = true;
      switch (data.type) {
        case "open":
          this.nowMerchantId = data.row.id;
          _get(`api/merchant/apikey/${this.nowMerchantId}`).then(res => {
            this.nowInquireKey = {
              id: this.nowMerchantId,
              apikey: res.data.data.apikey
            };
          });
          break;
        case "copy":
          this.Clipboard(".copy-inquire");
          break;
        case "reset":
          _put(`api/merchant/newapikey/${this.nowMerchantId}`).then(res => {
            this.$message.success("重置成功");
            this.nowInquireKey = {
              id: this.nowMerchantId,
              apikey: res.data.apikey
            };
          });
          break;
        default:
          break;
      }
    },
    //安全码
    secureKey(data) {
      this.dialogSecureKey = true;
      switch (data.type) {
        case "open":
          this.nowMerchantId = data.row.id;
          break;
        case "copy":
          this.Clipboard(".copy-secure");
          break;
        case "reset":
          _put(`api/merchant/safepwd/${this.nowMerchantId}`).then(res => {
            this.$message.success("重置成功");
          });
        case "ChangePassword":
          console.log(data);
          var reg = /^[A-Za-z0-9]{6,16}$/;
          var flagconformedPwd = reg.test(data.value);
          if (data.value.length < 1) {
            console.log('0')
            _put(`api/merchant/password/${this.nowMerchantId}`).then(res => {
              this.$message.success("重置密码成功");
              return false
            });
          } else {
            console.log('1')
            if (flagconformedPwd == false) {
              this.$message.error("密码必须由 6-16位字母、数字组成");
              return false;
            } else {
              _put(
                `api/merchant/password/${this.nowMerchantId}?password=${data.value}`
              ).then(res => {
                this.$message.success("修改密码成功");
              });
            }
          }
          break;
        case "ChangeSecurityCode":
          console.log(data.value);
          var reg = /^[A-Za-z0-9]{6}$/;
          var flagconformedPwd = reg.test(data.value);
          if (data.value.length < 1) {
            // 空值,重置
            _put(`api/merchant/safepwd/${this.nowMerchantId}`).then(res => {
              this.$message.success("重置安全码成功");
            });
          } else {
            //有值.符合则修改
            if (flagconformedPwd == false) {
              this.$message.error("安全码必须由6位字母、数字组成");
              return false;
            } else {
              _put(
                `api/merchant/safepwd/${this.nowMerchantId}?safe_pwd=${data.value}`
              ).then(res => {
                this.$message.success("修改安全码成功");
              });
            }
          }
          break;
        default:
          break;
      }
    },
    // 统一处理复制
    Clipboard(ele) {
      var clipboard = new Clipboard(ele);
      clipboard.on("success", e => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$message.warning("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    }
  },
  mounted() {
    // this.toggleSelection([this.chanelTable[3]]);
  },
  components: { selectItem }
};
