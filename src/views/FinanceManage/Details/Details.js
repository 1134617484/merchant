import { log } from "util";
import { _get, _post, _put, _delete,ephemeral,switchTime, account_typeSelect, channelSelect } from "../../../api/index.js"
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
      },
      chanelOptions:[],//全部通道选项
      chanelOptions_id:'a',
      account_typeOptions:[],//类型下拉列表
      channelOptions:[],//通道下拉列表
      out_trade_id: '',//输入订单号
      account_typeOptions_id:'a',//类型下拉列表选择
      channelOptions_id:'a',//通道下拉列表选中
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
  },
  methods: {
    getSelectMenuData() {
      account_typeSelect().then(res => {
        this.account_typeOptions = [...res.data.data];
        this.account_typeOptions.unshift({"id":"a",name:"全部类型"});
      })
      channelSelect().then(res=>{
        this.channelOptions = [...res.data.data];
        this.channelOptions.unshift({"id":"a",name:"全部通道"});
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
      _get("merchant/order-frozen-log", params).then(res => {
        let data=[...res.data.data.data];
        data.forEach(element => {
          element.frozen_end_time=switchTime(element.frozen_end_time);
          element.frozen_run_time=switchTime(element.frozen_run_time);
          element.frozen_start_time=switchTime(element.frozen_start_time);
        });
        this.tableData=data;
      })
      // _get("api/cash-log", params).then(res => {
      //   let paramsData = ephemeral.financeM.cash_log.data;
      //   let data = paramsData.data;
      //   this.currentPage = paramsData.current_page;
      //   this.last_page_url = paramsData.last_page_url;
      //   this.total = paramsData.total;
      //   this.pageSize = paramsData.per_page;
      //   if (data.length > 0) {
      //     let tableList = [];
      //     for (let i = 0; i < data.length; i++) {
      //       let cash_status=data[i].status;
      //       if(cash_status==0){
      //         cash_status='待审核';
      //       }else if(cash_status==1){
      //         cash_status='用户取消';
      //       }else if(cash_status==2){
      //         cash_status='审核通过';
      //       }else if(cash_status==3){
      //         cash_status='审核不通过';
      //       }else if(cash_status==4){
      //         cash_status='已到账';
      //       }
      //       tableList.push({
      //         id: data[i].id,  
      //         bankcard_id: data[i].bankcard_id,
      //         cash_no: data[i].cash_no, 
      //         status: cash_status, 
      //         apply_money: data[i].apply_money,  
      //         actual_money: data[i].actual_money,  
      //         fee: data[i].fee, 
      //         admin_id: data[i].admin_id,  
      //         verify_ip: data[i].verify_ip,
      //         verify_remark: data[i].verify_remark, 
      //         transfer_remark: data[i].transfer_remark, 
      //         add_ip: data[i].add_ip,  
      //         admin: data[i].admin,  
      //         merchant: data[i].merchant, 
      //         card:data[i].card,
      //         verify_time:this.switchTime(data[i].verify_time),
      //         created_at: this.switchTime(data[i].created_at),  
      //       })
      //     }
      //     this.tableData=tableList;
      //   } else {
      //     this.tableData = [];
      //   }
      // });
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
        pay_order_id:this.out_trade_id,
        channel_id:this.channelOptions_id=='a'?'':this.channelOptions_id,
        charge_time:this.timeValue,
        pay_type_id: this.account_typeOptions_id=='a'?'':this.account_typeOptions_id,
        per_page: this.pageSize,
        page:this.page 
      };
      console.log(params);
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
