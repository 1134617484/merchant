import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
import selectItem from '../../../components/ChanelSelect.vue'
export default {
  name: "AccessConfig",
  data() {
    return {
      typeOptions: [],
      channelOptions:[],
      typeEditOptions:[],
      typeClassifyData: [],
      typesData: [],
      newlyChannelData: [],
      channelData: [],
      typeData: [],
      valData: [],
      multipleSelection: [],
      selectName: '',
      changeSelectOptionId: '',
      // selectOptionWeight: '',
      value: '',
      selectRadio: '',
      selectIndex: '',
      radio: '2',
      selectValue: '',
      channelFirst: '',
      weight: '',
      showId: '',
      clickId: '', // 点击分配通道的id
      // 提交的参数
      addForm: {
        //产品名称
        name: "",
        //产品编码
        code: '',
        //是否是轮询 1-轮询， 0-单独
        polling: '0',
        //分类id
        pay_type_id: '',
        //状态
        status: true,
        //用户端显示 1 显示 0 不显示
        is_display: '1',
        products: [],
      },
      //编辑参数
      editForm: {
        id:"",
        //产品名称
        name: "",
        //产品编码
        code: '',
        //是否是轮询 1-轮询， 0-单独
        polling: '0',
        //分类id
        pay_type_id: '',
        //状态
        status: '1',
        //用户端显示 1 显示 0 不显示
        is_display: '1',
        //通道ID
        channel_id: '',
        //权重（1-9）
        weight: "1",
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'change' },
        ],
        code: [
          { required: true, validator: this.$rules.FormValidate.Form().validateEnglish, trigger: 'change' },
        ],
        pay_type_id: [
          { required: true, message: '请输入支付类型', trigger: 'change' },
        ],
        // channel_id: [
        //   { required: true, message: '请输入通道类型', trigger: 'change' },
        // ],
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
      allotVisible: false,
      innerVisible: false,
      // 添加信息
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //添加商户
      dialogFormCharge: false,
      //商户id
      chargeId: "",
    };
  },
  created() {
    this.getTableData("");
    this.getSelectMenuData();
  },
  methods: {
    // 列表多选状态
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let valList = [];
      for(let i = 0;i<val.length;i++) {
        valList.push({
          channel_id: val[i].id,
          weight: val[i].weight
        })
      }
      this.valData = valList;
      this.addForm.products = valList
      return val;
    },
    // 选中select通道组合products数组
    selectTypes(e) {
      let tempProduct = [];
      for(let i = 0; i< this.channelData.length;i++) {
        if(this.channelData[i].id === e) {
          tempProduct.push({
            channel_id: e,
            weight: this.channelData[i].weight,
          });
          this.multipleSelection = this.channelData[i];
        }
        this.addForm.products = tempProduct;
        this.valData = tempProduct;
      }
      this.multipleSelection = [];
      this.changeSelectOptionId = e;
    },
    // 修改权重
    getInputWeight(row) {
      let valList = [];
      for(let i=0; i<this.multipleSelection.length;i++) {
        valList.push({
          channel_id:this.multipleSelection[i].id,
          weight:this.multipleSelection[i].weight
        })
      }
      this.valData = valList;
      this.addForm.products = valList;
    },
    // 获取支付类型数据
    getSelectMenuData() {
      _get("api/paytype/select").then(res => {
        this.typeOptions = res.data.data;
      })
    },
    // 分配通道首次显示类型通道数据
    FirstTypeData(params) {
      _get("api/product/distribution/" + params).then(res => {
        let data = res.data.data;
        this.paytype_id = data.pay_type_id;
        this.selectIndex = data.polling?'1':'0';
        this.typeClassifyData = res.data.data.types;// 首次通道类型下拉数据
        this.channelData = res.data.data.channellist;
        if(this.channelData.length>0) {
          let typeList = [];
          for(let i = 0; i<this.channelData.length; i++) {
            typeList.push({
              id:this.channelData[i].id,
              name:this.channelData[i].title,
              code:this.channelData[i].code,
              weight:this.channelData[i].weight,
              checked:this.channelData[i].checked,
            })
            if(this.channelData[i].checked) {
              this.selectValue = this.channelData[i].id
              this.multipleSelection.push(this.channelData[i]);
              setTimeout(()=>{
                this.$refs.multipleTable.toggleRowSelection(this.channelData[i],true);
              });
            }
          }
          this.typesData = typeList;
          if(this.weight){
            this.valData=[{channel_id:this.typesData[0].id,weight:this.weight}]
          } else {
            this.valData=[{channel_id:this.typesData[0].id,weight:1}]
          }
        } else {
          this.typesData = [];// 首次通道下拉数据
        }
        if(data.polling == 1){
          this.selectIndex = '1';
          this.selectRadio = '1';
        } else {
          this.selectIndex = '0';
          this.selectRadio = '0';
        }
        if(this.selectIndex === '1') {
            for(let i = 0; i< this.channelData.length; i++){
              if(this.channelData[i].checked) {
              setTimeout(()=>{
                this.$refs.multipleTable.toggleRowSelection(this.channelData[i],true);
              });
              } else {
                console.log(null)
              }
            }
        }
        
      })
    },
    // 请求列表数据
    getTableData(params) {
      _get("api/product",params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          let tableList = [];
          let typesList = [];
          for (let i = 0; i < data.length; i++) {
            typesList.push({
              id: data[i].types.id,
              name: data[i].types.name,
            })
            tableList.push({
              id: data[i].id,
              name: data[i].name,
              code: data[i].code,
              polling: data[i].polling ? '轮询' : '单独',
              is_display:data[i].is_display ? true : false,
              pay_type_id: data[i].pay_type_id,
              // channel_id: data[i].channel_id,
              status: data[i].status ? true : false,
              // 
              // weight: data[i].weight,
              channels: data[i].channels,
              types:data[i].types,
              typeName:data[i].types.name,
            })
          }
          this.tableData = tableList;
          this.typeClassifyData = typesList;
        }else{
          this.tableData = [];
          this.typeClassifyData = [];
        }
      });
    },
    clearName() {
      this.selectName = '';
      this.selectValue = '';
    },
    handleClose(done) {
      this.clearName()
      .then(_ => {
        done();
      })
    },
    formatter(row, column) {
      return row.address;
    },
    // 分配通道 根据 通道类型/支付类型 选择通道
    handleTypeOption(e){
      this.paytype_id = e;
      this.multipleSelection = [];
      _get("api/channel/types/" + e).then(res => {
        let data = res.data.data
        this.channelData = data;
        let typesList = [];
        if(data.length>0){
          for(let i = 0; i < data.length; i++) {
            typesList.push({
              name: data[i].title,
              id: data[i].id,
              code: data[i].code,
              weight: data[i].weight
            })
          }
          this.typesData = typesList;
          this.selectValue = typesList[0].id;
          if(this.weight){
            this.valData=[{channel_id:this.typesData[0].id,weight:this.weight}]
          } else {
            this.valData=[{channel_id:this.typesData[0].id,weight:1}]
          }
          this.multipleSelection = [];
        }else{
          this.typesData = [];
          this.valData = [];
          this.channelData = [];
          this.selectValue = '';
        }
      })
    },
    // 新增通道输入
    inputName(value) {
      this.addForm.name = value;
    },
    inputCode(value) {
      this.addForm.code = value;
    },
    changeStatus(value) {
      this.addForm.status = value;
    },
    changeDisplay(value) {
      this.addForm.is_display = value;
    },
    // 分配权限
    handleRole(index, row) {
      this.$router.push({ path: '/assignRoleList', query: { id: row.id } });
    },
    //修改主菜单状态
    handleIsMenu(index, row) {
      _get("api/permission/switch/" + row.id).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })
    },
    //修改通道产品列表状态
    handleStatus(index, row) {
      let params={
        status:row.status?1:0
      }
      _put("api/product/status/" + row.id,params).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })
    },
    //修改通道产品列表状态
    handleDisplayStatus(index, row) {
      let params={
        is_display:row.is_display?1:0
      }
      _put("api/product/display/" + row.id,params).then(res => {
        this.handleSearch();
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      })
    },
    // 切换单独轮询
    handleRadio(value) {
      if(value==='0'){
        this.selectIndex = '0';
        this.addForm.polling=value;
        this.valData=[{channel_id:this.typesData[0].id,weight:1}]
        if(this.multipleSelection.length>0) {
          this.selectValue = this.multipleSelection[0].id;
          this.channelList = this.multipleSelection[0];
        } else {
          this.selectValue = this.typesData[0].id;
        }
      }else{
        this.selectIndex='1';
        this.addForm.polling=value;
        if(this.multipleSelection.length>0) {
          setTimeout(()=>{
            this.$refs.multipleTable.toggleRowSelection(this.channelList,true);
          })
        } else if (this.changeSelectOptionId){ // 默认单独模式首次修改为轮询
          for(let i = 0; i< this.channelData.length; i++){
            if(this.changeSelectOptionId === this.channelData[i].id) {
              setTimeout(()=>{
                this.$refs.multipleTable.toggleRowSelection(this.channelData[i],true);
              });
            }
          }
        } else {
          setTimeout(()=>{
            for(let i = 0; i< this.channelData.length; i++){
              if(this.channelData[i].checked) {
                setTimeout(()=>{
                  this.$refs.multipleTable.toggleRowSelection(this.channelData[i],true);
                });
              } else if (this.channelData[i].id === this.changeSelectOptionId) {
                setTimeout(()=>{
                  this.$refs.multipleTable.toggleRowSelection(this.channelData[i],true);
                });
                console.log(null)
              } else {
                setTimeout(()=>{
                  this.$refs.multipleTable.toggleRowSelection(this.channelData[0],true);
                });
              }
            }
          },100);
        }
        console.log(this.multipleSelection,"this.multipleSelection2");
      }
    },
    // 编辑分配通道
    handleAllot(index, row) {
      this.selectIndex = row.polling == '轮询' ? '1' : '0'
      this.allotVisible = true;
      this.clickId = row.id;
      this.selectName = row.types.id;
      this.FirstTypeData(this.clickId);
    },
    // 编辑通道产品信息
    handleEdit(index, row) {
       this.editForm.id=row.id;
       this.editForm.name=row.name;
       this.editForm.code=row.code;
       this.editForm.polling=row.polling=='轮询'?'1':'0';
       this.editForm.pay_type_id=row.pay_type_id;
       this.editForm.status=row.status;
       this.editForm.is_display=row.is_display?'1':'0';
       this.editForm.weight=row.weight;
       //this.editForm.channel_id=row.channel_id;
       this.handleEditType(row.pay_type_id);
      //编辑信息
      this.outerVisible = true;
    },
    isUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            name: this.editForm.name,
            code: this.editForm.code,
            polling: this.editForm.polling,
            pay_type_id: this.editForm.pay_type_id,
            status: this.editForm.status?1:0,
            is_display: this.editForm.is_display,
            channel_id: this.editForm.channel_id,
            weight: this.editForm.weight,
          };
          this.$confirm("确定修改吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              _put("api/product/" + this.editForm.id, params).then(res => {
                this.handleSearch();
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              }).catch(error => {
                console.log(error,"error")
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
    // 进入新增通道产品页面
    addAdminUser() {
      this.typesData = [];
      console.log(this.multipleSelection,"this.multipleSelection");
      console.log(this.typesData,"this.typesData");
      console.log(this.addForm,"addF")
      console.log(this.products,"prod")
      this.dialogFormVisible = true;
      this.addForm.pay_type_id = this.typeOptions[0].id;
      let tempProduct = [];
      if(this.typeOptions[0].id) {
        _get("api/channel/types/" + this.typeOptions[0].id).then(res => {
          this.channelData=res.data.data;
          if(this.channelData.length>0) {
            this.selectValue = this.channelData[0].id;
            tempProduct.push({
              channel_id: this.channelData[0].id,
              weight: this.channelData[0].weight,
            });
            this.addForm.products = tempProduct;
          } else {
            this.selectValue = '';
          }
        })
      }
      if(this.showId) {
        this.handleTypeOption(this.showId)
      }
    },
    // 新增通道产品保存
    submitForm(formName) {
      this.multipleSelection = [];
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            //产品名称
            name: this.addForm.name,
            //产品编码
            code: this.addForm.code,
            //是否是轮询 1-轮询， 0-单独
            polling: this.addForm.polling,
            // == '0' ? 0 : 1
            //分类id
            pay_type_id: this.addForm.pay_type_id,
            //状态
            status: this.addForm.status ? 1 : 0,
            //用户端显示 1 显示 0 不显示
            is_display: this.addForm.is_display,
            products: JSON.stringify(this.addForm.products),
          }
          console.log(params,"params");
          _post("api/product", params).then(res => {
            this.getTableData("");
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.dialogFormVisible = false;
            this.selectValue = '';
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
      this.$confirm(`确定删除name为 "${row.name}" 的数据吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _delete("api/product/"+row.id).then(res=>{
            this.handleSearch();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }).catch(error=>{
            this.$message({
              message: "删除失败",
              type: "error"
            });
          })
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
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
      // let date = JSON.stringify(this.date);
      // let dateStr = date.split(",");
      // let dateArr = JSON.parse(dateStr);
      let params = {
        page: this.page,
        per_page: this.pageSize,
      };
      this.getTableData(params);
    
    },
    // 新增通道-根据支付分类获取通道数据
    handleType() {
      let params = {
        id: this.addForm.pay_type_id
       }
      _get("api/channel/types/"+params.id, params).then(res => {
        this.channelData=res.data.data;
        if(this.channelData.length>0) {
          this.selectValue = this.channelData[0].id;
        } else {
          this.selectValue = '';
        }
      })
    }, 
    handleEditType(id) {
      let params = {
        id: id,
       }
      _get("api/channel/types/"+params.id, params).then(res => {
        this.typeEditOptions=res.data.data;
      })
    }, 
    // 分配通道保存
    submitChanelForm() {
      let products = this.valData;
      let proList = [];
      for(let i =0 ;i<products.length;i++){
        proList.push(products[i])
      }
      proList = JSON.stringify(proList)
      let paytype_id = this.paytype_id;
      let submitChannel = {products: proList,polling:this.selectIndex,pay_type_id: paytype_id}
      if(submitChannel.products.length == 0){
        this.$message({
          message: '请选择通道',
          type: "error"
        });
      } else {
        _put("api/product/distributionsave/" + this.clickId, submitChannel).then(res => {
          this.getTableData("");
          this.$message({
            message: res.message,
            type: "success"
          });
          this.allotVisible = false;
          this.selectValue = '';
          this.valData = [];
          this.multipleSelection = [];
        })
      }
    },
  },
  components: { selectItem },
};
