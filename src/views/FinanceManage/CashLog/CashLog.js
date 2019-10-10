import { log } from "util";
import { _get, _post, _put, _delete,ephemeral,switchTime,channelSelect } from "../../../api/index.js"
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
      channelOptions:[],//全部通道选项
      channelOptions_id:'a',//通道下拉列表选中
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
  },
  methods: {
    getSelectMenuData() {
      channelSelect().then(res=>{
        this.channelOptions = [...res.data.data];
        this.channelOptions.unshift({"id":"a",title:"全部通道"});
      })
    },

    // 冻结金额
    getTableData(params) {

      _get("merchant/order-frozen-log", params).then(res => {
        this.tableData=res.data.data.data;
        this.tableData.forEach(element => {
          element.status==0?element.status='冻结中':element.status='已解冻';
          element.frozen_end_time=switchTime(element.frozen_end_time);
          element.frozen_run_time=switchTime(element.frozen_run_time);
          element.frozen_start_time=switchTime(element.frozen_start_time);
        });
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.last_page_url = paramsData.last_page_url;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
     
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
            if(res.data){
              this.$message({
                message: "提交成功",
                type: "success"
              });
            }
            
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
            if(res.data){
              this.$message({
                message: "提交成功",
                type: "success"
              });
            }
            
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
        order_id:this.channelOptions_id=='a'?'':this.channelOptions_id,
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
