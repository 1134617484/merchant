import { log } from "util";
import { _get, _post, _put, _delete ,ephemeral,switchTime} from "../../../api/index.js"
import selectItem from '../../../components/ChanelSelect.vue'
export default {
  name: "AccountChange",
  data() {
    return {
      tableData: [],
      classifyOptions:[],
      typeOptions:[],
      pay_type_id: 'a',
      merchant_id: 'a',
      out_trade_id: '',
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:'',
      timeValue: '',
      chanelOptions:[],//全部通道选项
      chanelOptions_id:'a',
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
  },
  components: { selectItem },
  methods: {
    getSelectMenuData() {
      // _get("api/change-type/select").then(res => {
        let params={"id":"a",name:"全部"};
        this.classifyOptions = [...ephemeral.financeM.accpunt_change_type_select.data];
        this.classifyOptions.unshift(params);
      // })
      // _get("api/merchant/select").then(res => {
        this.typeOptions = [...ephemeral.financeM.merchant_select.data];
        this.typeOptions.unshift(params);

        this.chanelOptions = [...ephemeral.order.paytype_select.data];
        this.chanelOptions.unshift(params);
      // })
    },
    // 资金变动信息
    getTableData(params) {
      let data='';
      _get("merchant/account-change", params).then(res => {
        console.log(res)
        data=[...res.data.data.data];
        data.forEach(element => {
          isNaN(element.charge_time)?element.charge_time:element.charge_time=switchTime(element.charge_time);
        });
        this.tableData=data;
        console.log(this.tableData)
      });
    },
    // 导出
    handleExport(){
      alert("导出");
    },
    //搜索
    handleSearch(){
      let params = {
        merchant_id:this.out_trade_id=='a'?'':this.out_trade_id,
        charge_time:this.timeValue,
        pay_type_id: this.pay_type_id=='a'?'':this.pay_type_id,
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
