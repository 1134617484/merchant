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
      let data='';
      // _get("merchant/account-change", params).then(res => {
        // console.log(res)
        let paramsData = {...ephemeral.capitol};
        data=[...ephemeral.capitol.data.data];
        console.log(paramsData.data)
        data.forEach(row => {
          if(!isNaN(row.charge_time)){
            console.log(row.charge_time)
            row.charge_time=switchTime(row.charge_time);
          }
          
        });
        this.tableData=data;
        console.log(this.tableData)
        // let paramsData =res.data.data;
        // let data = paramsData.data;
        // this.currentPage = paramsData.current_page;
        // this.last_page_url = paramsData.last_page_url;
        // this.total = paramsData.total;
        // this.pageSize = paramsData.per_page;
        // if (data.length > 0) {
        //   let tableList = [];
        //   for (let i = 0; i < data.length; i++) {
        //     tableList.push({
        //       id: data[i].id, // id
        //       // order_id: data[i].order.out_trade_id, // 订单号
        //       order: data[i].order,
        //       username: data[i].merchant.username, // 商户名称
        //       classify: data[i].type.name, // 类型
        //       original_money: data[i].original_money, // 原始金额
        //       change_money: data[i].change_money, // 变动金额
        //       changed_money: data[i].changed_money, // 变动后金额
        //       charge_time: this.switchTime(data[i].charge_time), // 变动时间
        //       // channel_title: data[i].order.channel.title, // 通道
        //     })
        //   }
        //   this.tableData=tableList;
        // } else {
        //   this.tableData = [];
        // }
      // });
    },
    // 导出
    handleExport(){
      alert("导出");
    },
    //搜索
    handleSearch(){
      let params = {
        out_trade_id:this.out_trade_id=='a'?'':this.out_trade_id,
        timeValue:this.timeValue,
        chanelOptions_id:this.chanelOptions_id,
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
