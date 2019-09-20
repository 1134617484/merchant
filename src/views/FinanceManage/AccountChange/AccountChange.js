import { log } from "util";
import { _get, _post, _put, _delete ,ephemeral,switchTime, account_typeSelect, channelSelect} from "../../../api/index.js"
import selectItem from '../../../components/ChanelSelect.vue'
export default {
  name: "AccountChange",
  data() {
    return {
      tableData: [],
      
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:'',
      timeValue: '',//输入的时间
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
  components: { selectItem },
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
    // 资金记录表单信息
    getTableData(params) {
      let data='';
      _get("merchant/account-change", params).then(res => {
        data=[...res.data.data.data];
        data.forEach(element => {
          isNaN(element.charge_time)?element.charge_time:element.charge_time=switchTime(element.charge_time);
        });
        this.tableData=data;
      });
    },
    // 导出
    handleExport(){
      alert("导出");
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
