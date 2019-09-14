import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js";
export default {
  data() {
    return {
      value: "",
      value9: "",
      input10: "",
      file: "",
      form: {},
      // header:`Bearer ${window.localStorage.getItem(
      //   "token"
      // )}`,
      //编辑参数
      editForm: {
        id: "",
        price: ""
      },
      // 校验规则
      rules: {
        price: [
          { required: true, message: "请输入二维码金额", trigger: "change" }
        ],
        weight_coefficient: [
          { required: true, message: "请输入0-9整数", trigger: "change" }
        ]
      },
      files: [],
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page: "",
      tableData: [],
      // 信息编辑
      outerVisible: false,
      formLabelWidth: "120px"
    };
  },
  fileList: [],
  name: "home",
  created() {
    this.getTableData("");
  },
  methods: {
    handleFile(raw) {},
    beforeAvatarUpload(file) {
      let fd = new FormData();
      fd.append("pay_type_id", 11); //随文件上传的其他参数
      fd.append("file", file);
      _post("api/sysqrcode", fd).then(res => {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getTableData("");
      });
    },
    beforeUpload(file) {
      let fd = new FormData();
      fd.append("pay_type_id", 12); //随文件上传的其他参数
      fd.append("file", file);
      _post("api/sysqrcode", fd).then(res => {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getTableData("");
      });
    },
    handleSuccess(response, file, fileList) {
      // console.log(file);
      this.$refs.upload.clearFiles();
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
      let updated_at = y + m + d;
      return updated_at;
    },
    getTableData(params) {
      _get("api/sysqrcode", params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        let tableList = [];
        for (var i = 0; i < data.length; i++) {
          tableList.push({
            id: data[i].id,
            qr_url: data[i].qr_url,
            qr_price: data[i].qr_price,
            status: data[i].status ? true : false,
            pay_type_id: data[i].pay_type_id == 11 ? "微信固码" : "支付宝固码",
            created_at: this.switchTime(data[i].created_at),
            updated_at: this.switchTime(data[i].updated_at),
            weight_coefficient:data[i].weight,
          });
        }
        this.tableData = tableList;
      });
    },
    handleStatus(index, row) {
      console.log(row);
      let params = {
        status: row.status ? 1 : 0
      };
      _put("api/sysqrcode/status/" + row.id, params).then(res => {
        // let params = { per_page: this.pageSize, page: this.page };
        // this.getTableData(params);
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      });
    },
    //删除
    handleDelete(index, row) {
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _delete("/api/sysqrcode/" + row.id)
            .then(res => {
              this.getTableData("");
              this.$message({
                message: "删除成功",
                type: "success"
              });
            })
            .catch(error => {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleBlur(index, row) {
      let params = {
        price: +row.qr_price
      };
      _put("api/sysqrcode/price/" + row.id, params)
        .then(res => {
          let params = { per_page: this.pageSize, page: this.page };
          this.getTableData(params);
          this.$message({
            message: "修改金额成功",
            type: "success"
          });
        })
        .catch(error => {
          this.$message({
            message: "编辑金额失败",
            type: "error"
          });
        });
    },
    // 选择页容量
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      let params = { per_page: this.pageSize, page: this.page };
      this.getTableData(params);
    },
    handleCurrentChange(val) {
      this.page = val;
      let params = { per_page: this.pageSize, page: this.page };
      this.getTableData(params);
    },
    //权重失去焦点
    BlurWeightText(e) {
      console.log(e);
      let boolean = /^[+]{0,1}(\d+)$/.test(e.ev.target.value);
      if (!boolean) {
        if (e.ev.target.value.length > 1) {
          this.$message.warning("请输入0-9的正整数");
        }
        return false;
      } else {
        if (e.ev.target.value.length > 1) {
          this.$message.warning("请输入0-9的正整数");
        }
        console.log("符合");
        let params = { weight: e.ev.target.value };
        _put("api/sysqrcode/weight/" + e.row.id, params)
          .then(res => {
            console.log(res);
            let params = { per_page: this.pageSize, page: this.page };
            this.getTableData(params);
            // this.$message({
            //   message: "修改金额成功",
            //   type: "success"
            // });
          })
          .catch(error => {
            this.$message({
              message: "编辑金额失败",
              type: "error"
            });
          });
      }
    }
  },
  computed: {
    headers() {
      return {
        "Content-Type": "multipart/form-data"
      };
    }
  },
  components: {}
};
