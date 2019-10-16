import { log } from "util";
import { _get, _post, _put, _delete,ephemeral } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      /*查询*/
      name: '',
      //新增权限信息
      selectTitle: '',
      options: [],
      // 提交的参数
      addForm: {
        id: "",
        menu_name: '',
        icon: '',
        pid: 0,
        title: '',
        is_menu: true,
        status: true,
        sort: '',
      },
      //编辑参数
      editForm: {
        id: "",
        menu_name: '',
        icon: '',
        pid: 0,
        title: '',
        is_menu: true,
        status: true,
        sort: '',
      },
      editId: "",
      // 校验规则
      rules: {
        pid: [
          { required: true, message: '请输入上级菜单', trigger: 'change' },
        ],
        title: [
          { required: true, message: '请输入权限名称', trigger: 'change' },
        ],
        icon: [
          { required: true, message: '请输入图标', trigger: 'change' },
        ],
        sort: [
          { required: true, validator: this.$rules.FormValidate.Form().validateNumber, trigger: 'change' },
        ],
        menu_name: [
          { required: true, message: '请输入权限标识', trigger: 'change' },
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
      formLabelWidth: "100px",
    };
  },
  created() {
    this.getTableData("");
    this.getSelectMenuData();
  },
  methods: {
    getSelectMenuData() {
      // _get("api/permission/select").then(res => {
        this.options = ephemeral.menu.permission_select.data;
        this.selectTitle = this.options[0].title;
      // })
    },
    handleSearch() {
      let params = {
        title: this.name,
        page: this.page,
        per_page: this.pageSize
      };
      this.getTableData(params);
    },
    getTableData(params) {
      
      _get("merchant/user/authorize", params).then(res => {
        //console.log(res)
        // let paramsData = ephemeral.menu.permission.data;
        // let data = paramsData.data;
        // this.currentPage = paramsData.current_page;
        // this.total = paramsData.total;
        // this.pageSize = paramsData.per_page;
        // if (data.length > 0) {
        //   let tableList = [];
        //   for (let i = 0; i < data.length; i++) {
        //     tableList.push({
        //       id: data[i].id,
        //       icon: data[i].icon,
        //       menu_name: data[i].menu_name,
        //       title: data[i].title,
        //       status: data[i].status ? true : false,
        //       is_menu: data[i].is_menu ? true : false,
        //       pid: data[i].pid,
        //       sort: data[i].sort,
        //     })
        //   }
        //   this.tableData = tableList;
        // } else {
        //   this.tableData = [];
        // }
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
      ////console.log(index,row);
      _get("api/permission/switch/" + row.id).then(res => {
        this.handleSearch();
        if(res.data)return
        this.$message.closeAll();this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })
    },
    //修改角色列表状态
    handleStatus(index, row) {
      ////console.log(index,row);
      _get("api/permission/toggle/" + row.id).then(res => {
        this.handleSearch();
        if(res.data)return
        this.$message.closeAll();this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })

    },
    // 编辑角色信息
    handleEdit(index, row) {
      this.editForm.pid=row.pid;
      this.selectTitle = row.title;
      this.editForm.title = row.title;
      this.editForm.icon = row.icon;
      this.editForm.sort = row.sort;
      this.editForm.menu_name = row.menu_name;
      this.editForm.is_menu = row.is_menu ? true : false;
      this.editForm.id = row.id;
      //编辑信息
      this.outerVisible = true;
    },
    // 删除管理员权限信息
    handleDelete(index, row) {
      this.$confirm(`确定删除 ${row.title} 吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _delete("api/permission/" + row.id).then(res => {
            this.handleSearch();
            if(res.data)return
            this.$message.closeAll();this.$message({
              message: "删除成功",
              type: "success"
            });
          }).catch(error => {
            this.$message.closeAll();this.$message({
              message: "删除失败",
              type: "error"
            });
          })
        }).catch(() => {
          this.$message.closeAll();this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    isUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            pid: this.editForm.pid,
            is_menu: this.editForm.is_menu ? 1 : 0,
            title: this.editForm.title,
            icon: this.editForm.icon,
            menu_name: this.editForm.menu_name,
            sort: this.editForm.sort
          };
          this.$confirm("确定修改吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              _put("api/permission/" + this.editForm.id, params).then(res => {
                this.handleSearch();
                if(res.data)return
                this.$message.closeAll();this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              }).catch(error => {
                this.$message.closeAll();this.$message({
                  message: "编辑失败",
                  type: "error"
                });
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
          //console.log('error submit!!');
          return false;
        }
      })
    },
    // 选择页容量
    handleSizeChange(val) {
      // //console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleSearch();

    },
    handleCurrentChange(val) {
      // //console.log(`当前页: ${val}`);
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
          let is_menu, status;
          if (this.addForm.is_menu) {
            is_menu = 1;
          } else {
            is_menu = 0;
          }
          if (this.addForm.status) {
            status = 1;
          } else {
            status = 0;
          }
          let params = {
            pid: this.addForm.pid,
            is_menu: is_menu,
            title: this.addForm.title,
            // status:status,
            icon: this.addForm.icon,
            menu_name: this.addForm.menu_name,
            sort: this.addForm.sort
          };
          _post("api/permission", params).then(res => {
            this.getTableData();
            if(res.data)return
            this.$message.closeAll();this.$message({
              message: "添加成功",
              type: "success"
            });
            this.dialogFormVisible = false;
          }).catch(error => {
            this.$message.closeAll();this.$message({
              message: "添加失败",
              type: "error"
            });
          });

        } else {
          //console.log('error submit!!');
          return false;
        }
      });

    }

  }

};
