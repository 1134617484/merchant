import { log } from "util";
import screenfull from "screenfull";
import { _get, _post, _put, _delete, ephemeral } from "../../../api/index.js";
import { pca, pcaa } from 'area-data'; // v5 or higher
import { AreaCascader } from "vue-area-linkage"
export default {
  name: "AdminUser",
  data() {
    return {
      //查询条件
      name: "",
      phone: "",
      email: "",
      pca: pca,//省市
      pcaa: pcaa,//省市
      // 管理员信息数据
      tableData: [],
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page: "",
      // 信息编辑
      outerVisible: false,
      innerVisible: false,
      // 搜索信息
      value9: "",
      input10: "",
      // 添加信息
      dialogFormVisible: false,
      //新增管理员表单
      addForm: {
        role_id: "",
        name: "",
        email: "",
        mobile: "",
        password: "",
        introduction: ""
      },
      // 校验规则
      rules: {

        editor_tableData:{
          card_number: [
            {
              required: true,
              validator: this.$rules.FormValidate.Form().validateCardNum,
              trigger: "change"
            },
          ],
          sub_branch: [
            {
              required: true,
              validator: this.$rules.FormValidate.Form().validateBranchkName,
              trigger: "change"
            },
          ],
          account_name: [
            {
              required: true,
              validator: this.$rules.FormValidate.Form().validateAccountName,
              trigger: "change"
            },
          ],
          region:[{required: true, message:'请选择开卡地址', trigger: 'change'}]
        },

      },
      //新增管理员表单
      editForm: {
        bank:{
          bank_name:'',id:''
        }
      },

      formLabelWidth: "100px",
      // 性别下拉框
      sexOptions: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "0",
          label: "女"
        }
      ],
      sexValue: "男",
      // 状态下拉框
      stateOptions: [
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "禁用"
        },
        {
          value: "2",
          label: "全部"
        }
      ],
      stateValue: "全部",
      // 头像上传
      dialogImageUrl: "",
      dialogVisible: false,
      typeOptions: [],
      dialogPassword: false, //改密弹窗状态
      EditorPasswordData: {
        id: "",
        newPassword: "",
        affirmPassword: "",
        newPasswordCheck: false,
        affirmPasswordCheck: false
      },
      secure_alert: {
        state: false,
        text: ""
      },
      // 添加银行卡暂存数据模版
      editor: {
        account_name: "", //开户名
        alias: "",
        bank_name: "", //银行名
        card_number: "", //卡号
        city: "", //城市
        default: "", //默认结算
        province: "", //省
        sub_branch: "" ,//支行名字,
        
      },
      editor_tableData: {
        region:[],//选择开卡地址
      },
      OpeningBankVal: "", //开户行id
      OpeningBank: "", //开户行选项,
    };
  },
  created() {
    this.editor_tableData = { ...this.editor,region:[]};
    this.getTableData("");
    this.getSelectData();
  },
  methods: {
    getSelectData() {
      _get("merchant/bank/select").then(res => {
        this.OpeningBank = res.data.data;
        this.typeOptions = ephemeral.menu.admin_select.data;
      });
    },
    getTableData(params) {
      _get("merchant/bankcard", params).then(res => {
        let datas = res.data.data;
        let state=datas.data;
        for (let i = 0; i < state.length; i++) {
          if(state[i].default=="0"){
            state[i].default="false";
          }else{
            state[i].default="true";
          }
        }
        datas.data=state;
        this.tableData=datas;
      });
    },
    handleSearch() {
      let params = {
        name: this.name,
        mobile: this.phone,
        email: this.email,
        page: this.page,
        per_page: this.pageSize
      };
      this.getTableData(params);
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
    formatter(row, column) {
      return row.address;
    },
    // 编辑管理员信息
    handleEdit(index, row) {
      this.editForm={...row};
      this.outerVisible = true;
    },
    //修改管理员列表状态
    handleStatus(index, row) {
      _get("merchant/bankcard/toggle/" + row.id).then(res => {
        this.handleSearch();
        if(res.data)return
        this.$message.closeAll();this.$message({
          message: "状态修改成功",
          type: "success"
        });
      });
    },
    isUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            alias:this.editForm.alias,
            remark:this.editForm.remark,
            id: this.editForm.id
          };
          this.$confirm("确定修改吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _put("merchant/bankcard/" + this.editForm.id, params).then(res => {
                this.handleSearch();
                if(res.data){
                  this.$message.closeAll();this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                }
              });
              this.outerVisible = false;
            })
            .catch(() => {
              this.$message.closeAll();this.$message({
                type: "info",
                message: "已取消修改"
              });
              this.outerVisible = false;
            });
        } else {
          return false;
        }
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
    addAdminUser() {
      this.dialogFormVisible = true;
    },
    // 确定添加
    isAddUser() {
      this.dialogFormVisible = false;
      if(res.data)return
      this.$message.closeAll();this.$message({
        message: "添加成功",
        type: "success"
      });
    },
    // 添加银行卡
    submitForm() {
      console.log(this.editor_tableData);
      if(this.editor_tableData.region.length<1){return this.$message({
        message: "请重新选择开卡地址",
        type: "warning"
      });}
      let params = {
        account_name: this.editor_tableData.account_name,
        bank_id: this.OpeningBankVal||'',
        card_number: this.editor_tableData.card_number,
        sub_branch: this.editor_tableData.sub_branch,
        province:this.editor_tableData.region.length>0?this.editor_tableData.region[0]:'',
        city:this.editor_tableData.region.length>1?this.editor_tableData.region[1]:'',
        alias:this.editor_tableData.alias,
        remark:this.editor_tableData.remark
      };
      params.bank_id = this.OpeningBankVal;
      //console.log(params);
      _post("merchant/bankcard", params).then(res => {
          console.log(res)
          this.getTableData("");
            this.$message.closeAll();this.$message({
            message: "添加成功",
            type: "success"
          });
          // 提交成功清空表单
          this.editor_tableData = { ...this.editor,region:this.editor_tableData.region };
          this.dialogFormVisible = false;
        })
    },
    // 头像上传
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    editorPassword(data) {
      // 修改密码
      switch (data.type) {
        case "open":
          this.dialogPassword = true;
          this.EditorPasswordData.id = data.row.id;
          break;
        case "save":
          if (this.regPassword()) {
            let params = {
              password: this.EditorPasswordData.newPassword,
              password_confirmation: this.EditorPasswordData.affirmPassword
            };
            _put("api/admin/repwd/" + this.EditorPasswordData.id, params)
              .then(res => {
                this.dialogPassword = false;
                this.$message.closeAll();this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
              })
          }
          break;
        default:
          break;
      }
    },
    // 改密表单校验
    regPassword() {
      var reg = /^[A-Za-z0-9]{6,16}$/;
      if (
        !reg.test(this.EditorPasswordData.newPassword) ||
        !reg.test(this.EditorPasswordData.affirmPassword)
      ) {
        this.secure_alert.text = "密码必须由 6-16位字母、数字组成";
        this.secure_alert.state = true;
        return false;
      } else if (
        this.EditorPasswordData.newPassword ==
        this.EditorPasswordData.affirmPassword
      ) {
        this.secure_alert.state = false;
        return true;
      } else {
        this.secure_alert.text = "新密码与确认密码不一致,请重新输入";
        this.secure_alert.state = true;
        this.EditorPasswordData.affirmPassword = "";
        return false;
      }
    },
    // 删除银行卡
    handleDelete(index, row) {
      //console.log(row);
      _delete("merchant/bankcard/" + row.bank_id).then(res => {
        //console.log(res);
        this.getTableData();
      });
    },

  }
};
