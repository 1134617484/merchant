import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  name: "AccountChange",
  data() {
    return {
      tableData: [],
      classifyOptions:[],
      typeOptions:[],
      pay_type_id: '',
      merchant_id: '',
      out_trade_id: '',
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:'',
      timeValue: '',
      //待审核
      dialogFormVerify:false,
      formLabelWidth: "130px",
      verify_status: '1',
      // 校验规则
      VerifyForm:{
        id:'',
        verify_status:'1',
        verify_remark:'',
      },
      Rules:{
        verify_remark: [
          { required: true, message: '请输入审核备注', trigger: 'change' },
        ],
      },
      //汇款确认
      dialogFormTransfer:false,
      TransferForm:{
        id:'',
        transfer_remark:'',
      }
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
  },
  methods: {
    getSelectMenuData() {
      _get("api/change-type/select").then(res => {
        let params={"id":"",name:"全部"};
        this.classifyOptions = res.data.data;
        this.classifyOptions.unshift(params);
      })
      _get("api/merchant/select").then(res => {
        let params={"id":"",name:"全部"};
        this.typeOptions = res.data.data;
        this.typeOptions.unshift(params);
      })
    },
    switchTime(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear() + '-';
      let m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let d = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      let h=date.getHours(); 
      let mm=date.getMinutes(); 
      let s=date.getSeconds(); 
      let updated_at = y + m + d+''+h+":"+mm+":"+s;
      return updated_at
    },
    // 资金变动信息
    getTableData(params) {
      _get("api/cash-log", params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.last_page_url = paramsData.last_page_url;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          let tableList = [];
          for (let i = 0; i < data.length; i++) {
            let cash_status=data[i].status;
            if(cash_status==0){
              cash_status='待审核';
            }else if(cash_status==1){
              cash_status='用户取消';
            }else if(cash_status==2){
              cash_status='审核通过';
            }else if(cash_status==3){
              cash_status='审核不通过';
            }else if(cash_status==4){
              cash_status='已到账';
            }
            tableList.push({
              id: data[i].id,  
              bankcard_id: data[i].bankcard_id,
              cash_no: data[i].cash_no, 
              status: cash_status, 
              apply_money: data[i].apply_money,  
              actual_money: data[i].actual_money,  
              fee: data[i].fee, 
              admin_id: data[i].admin_id,  
              verify_ip: data[i].verify_ip,
              verify_remark: data[i].verify_remark, 
              transfer_remark: data[i].transfer_remark, 
              add_ip: data[i].add_ip,  
              admin: data[i].admin,  
              merchant: data[i].merchant, 
              card:data[i].card,
              verify_time:this.switchTime(data[i].verify_time),
              created_at: this.switchTime(data[i].created_at),  
            })
          }
          this.tableData=tableList;
        } else {
          this.tableData = [];
        }
      });
    },
    // 导出
    handleExport(){
      alert("导出");
    },
    handleVerify(index,row){
      this.VerifyForm.id=row.id;
      this.dialogFormVerify=true;
    },
    submitVerifyForm(formName){
       this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            verify_status: +this.VerifyForm.verify_status,
            verify_remark: this.VerifyForm.verify_remark,
          };
          _post("api/cash-log/review/" + this.VerifyForm.id, params).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.dialogFormVerify = false;
            this.handleSearch();
          }).catch(error => {
            this.$message({
              message: "提交失败",
              type: "error"
            });
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleTransfer(index,row){
      this.dialogFormTransfer=true;
      this.TransferForm.id=row.id;
    },
    submitTransferForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            transfer_remark:this.TransferForm.transfer_remark,
          };
          _post("api/cash-log/transfer/" + this.TransferForm.id, params).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.dialogFormTransfer = false;
            this.handleSearch();
          }).catch(error => {
            this.$message({
              message: "提交失败",
              type: "error"
            });
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
     
    //搜索
    handleSearch(){
      let params = {
        created_at:this.timeValue,
        per_page: this.pageSize,
        page:this.page 
      };
     this.getTableData(params);
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
  },
};
