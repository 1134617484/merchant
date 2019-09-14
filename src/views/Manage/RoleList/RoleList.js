// import { log } from "util";
import screenfull from "screenfull"
import { addRoleMsg, getRoleMsg, editRoleMsg, switchRoleMsg, getRolePageMsg } from "../../../api/index.js"
import { _get, _delete, _put, _post } from "../../../api/index.js"

export default {
  name: "AdminUser",
  data() {
    return {
      name: '',
      //新增角色信息
      is_manager: true,
      status: true,
      form: {
        sort: '',
        roleName: "",
      },
      EditForm: {
        sort: '',
        roleName: "",
      },
      // 校验规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' },
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'change' },
        ],
        // email: [
        //   { required: true, validator: this.$rules.FormValidate.Form().validateEmail, trigger: 'change' }
        // ],
        // mobile:[
        //   { required: true,validator: this.$rules.FormValidate.Form().validatePhone, trigger: 'change' }
        // ],
      },
      //编辑信息
      editName: "",
      editStatus: "",
      id: "",
      //分页参数
      currentPage: "",
      total: "0",
      pageSize: 10,
      page: '',
      // 管理员信息数据
      tableData: [],
      // 信息编辑
      outerVisible: false,
      innerVisible: false,
      // 搜索信息
      value9: "",
      input10: "",
      // 添加信息
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "100px",
      // 性别下拉框
      sexOptions: [{
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
      stateOptions: [{
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
      addValue: true,
      editValue: true,

    };
  },
  created() {
    this.getTableData("");
  },
  methods: {
    handleSearch() {
      let params = {
        name: this.name,
        page: this.page,
        per_page: this.pageSize,
      };
      this.getTableData(params);
    },
    getTableData(params) {
      _get("/api/role", params).then(res => {
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
              name: data[i].name,
              status: data[i].status ? true : false,
              permissions: data[i].permissions,
              is_manager: data[i].is_manager,
              sort: data[i].sort
            })
          }
          this.tableData = tableList;
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
    //修改角色列表状态
    handleStatus(index, row) {
      _get("api/role/toggle/" + row.id).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })
    },
    // 编辑角色信息
    handleEdit(index, row) {
      this.EditForm.roleName = row.name;
      this.status = row.status ? true : false;
      this.is_manager = row.is_manager ? true : false;
      this.EditForm.sort = row.sort;
      this.id = row.id;
      // 编辑信息
      this.outerVisible = true;
    },
    // 删除管理员信息
    handleDelete(index, row) {
      this.$confirm(`确定删除 ${row.name} 吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _delete("api/role/" + row.id).then(res => {
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
    isUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            name: this.EditForm.roleName,
            is_manager: this.is_manager ? 1 : 0,
            status: this.status ? 1 : 0,
            sort: this.EditForm.sort,
          }
          _put('/api/role/' + this.id, params).then(res => {
            this.outerVisible = false;
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.handleSearch();
          }).catch(error => {
            this.$message({
              message: "编辑失败",
              type: "error"
            });
          });
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
    },
    // 添加信息
    addAdminUser() {
      this.is_manager = true;
      this.status = true;
      this.dialogFormVisible = true;
    },
    // 确定添加
    isAddUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            name: this.form.roleName,
            is_manager: this.form.is_manager ? 1 : 0,
            status: this.form.status ? 1 : 0,
            sort: this.form.sort,
          }
          _post('/api/role', params).then(res => {
            this.dialogFormVisible = false;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getTableData();
          }).catch(error => {
            this.$message({
              message: "添加失败",
              type: "error"
            });
          });
        }
      })


    }
  },
  watch: {

  }
};
