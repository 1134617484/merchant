import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
import copy_key_img from "@/assets/images/copy.png";
import Clipboard from "clipboard";
export default {
  name: "AccessConfig",
  data() {
    return {
      //上传
      dialogImageUrl: '',
      //查询参数
      merchant_id: '',
      typeOptions: [],
      // 提交的参数
      Form: {
        id: '',
        //商品名称
        merchant_id: "",
        //二维码
        upload_api: '',
        //支付网关地址
        gateway: '',
        //异步通知地址
        notify: '',
        //同步通知地址
        callback: '',
      },
      // 校验规则
      rules: {
        merchant_id: [
          { required: true, message: '请输入商品名称', trigger: 'change' },
        ],
        upload_api: [
          { required: true,validator: this.$rules.FormValidate.Form().validateUrl, trigger: 'change' },
        ],
        gateway: [
          { required: true, validator: this.$rules.FormValidate.Form().validateUrl, trigger: 'change' },
        ],
        notify: [
          { required: true, validator: this.$rules.FormValidate.Form().validateUrl, trigger: 'change' },
        ],
        callback: [
          { required: true, validator: this.$rules.FormValidate.Form().validateUrl, trigger: 'change' },
        ],
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
      formLabelWidth: "140px",
      //添加商户
      dialogFormCharge: false,
      //商户id
      chargeId: "",
      // 复制图片
      copy_key_img:copy_key_img
    };
  },
  created() {
    this.getTableData("");
    this.getSelectMenuData();
    //this.getChangeTypeData();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(response, file, fileList) {
      this.Form.upload_api = file.url;
      console.log(this.Form.upload_api);
      //this.dialogVisible = true;
    },
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
    getChangeTypeData() {
      _get("api/change-type/select").then(res => {
        this.changeOptions = res.data.data;
      })
    },
    getTableData(params) {
      _get("api/app", params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        this.tableData = data;
      });
    },
    // 编辑app信息
    handleEdit(index, row) {
      this.Form.id = row.id;
      this.Form.merchant_id = row.merchant.id;
      this.Form.secret = row.secret;
      this.Form.callback = row.callback;
      this.Form.upload_api = row.upload_api;
      this.Form.gateway = row.gateway;
      this.Form.notify = row.notify;
      //编辑信息
      this.outerVisible = true;
    },
    isUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            merchant_id: this.Form.merchant_id,
            secret: this.Form.secret,
            callback: this.Form.callback,
            upload_api: this.Form.upload_api,
            gateway: this.Form.gateway,
            notify: this.Form.notify,
          };
          this.$confirm("确定修改吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              _put("api/app/" + this.Form.id, params).then(res => {
                let params = { per_page: this.pageSize, page: this.page };
                this.getTableData(params);
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
      this.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
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
          let params = {
            merchant_id: this.Form.merchant_id,
            secret: this.Form.secret,
            callback: this.Form.callback,
            upload_api: this.Form.upload_api,
            gateway: this.Form.gateway,
            notify: this.Form.notify,
          };
          _post("api/app", params).then(res => {
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
    //删除
    handleDelete(index, row) {
      this.$confirm(`确定删除商户名称为 "${row.merchant.username}" 的数据吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _delete("api/app/" + row.id).then(res => {
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
            this.getTableData();
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
        merchant_id: this.merchant_id=='a'?'':this.merchant_id,
        page: this.page,
        per_page: this.pageSize,
      };
      this.getTableData(params);
    },
    handleType() {
      let params = {
        id: this.addForm.pay_type_id
      }
      _get("api/channel/types/" + params.id, params).then(res => {
        this.channelOptions = res.data.data;
      })
    },
    handleEditType(id) {
      let params = {
        id: id,
      }
      _get("api/channel/types/" + params.id, params).then(res => {
        this.typeEditOptions = res.data.data;
      })
    },
    //复制密钥
    CopyInquireKey(data) {
      this.Clipboard(".copy-inquire");
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
  }

};
