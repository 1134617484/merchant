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
  },
  methods: {
    // 资金变动信息
    getTableData(params) {
      _get("merchant/margin", params).then(res => {
        let data=[...res.data.data.data];
        data.forEach(element => {
          element.created_at=switchTime(element.created_at);
        });
        this.tableData=data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.last_page_url = paramsData.last_page_url;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
      })

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
