import { log } from "util";
import { _get, _post, _put, _delete,ephemeral,switchTime } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      //查询参数
      merchant_id:'',
      ip: "",
      optType:'',
      date: '',
      typeOptions:[],
      optOptions: [
          {
          value: '1',
          label: '商户登录'
         },
         {
          value: '2',
          label: '短信验证'
        },
        {
          value: '3',
          label: '支付密码验证'
        }
      ],
    
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:'',
      // 管理员信息数据
      tableData: [],
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
    //this.getChangeTypeData();
  },
  methods: {
    getSelectMenuData() {
      // _get("api/merchant/select").then(res => {
        let params={"id":"a",name:"全部"};
        // this.typeOptions = res.data.data;
        // this.typeOptions.unshift(params);
        this.typeOptions = [...ephemeral.financeM.merchant_select.data];
        this.typeOptions.unshift(params);
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
    getTableData(params) {
      _get("merchant/cash-log",params).then(res => {
        let data=[...res.data.data.data.data];
        data.forEach(element => {
          isNaN(element.created_at)?element.created_at:element.created_at=switchTime(element.created_at);
          isNaN(element.verify_tim)?element.verify_tim:element.verify_tim=switchTime(element.verify_tim);
          // isNaN(element.created_at)?element.created_at=switchTime(element.created_at):element.created_at;
          // isNaN(element.created_at)?element.created_at=switchTime(element.verify_tim):element.verify_tim;
        });
        this.tableData=data;
      //   let paramsData =ephemeral.finance.trade.data.merchants;
      //   let data = paramsData.data;

      //   this.tableData=[];
      //   this.tableData=data;
        
      //   this.currentPage = paramsData.current_page;
      //   this.total = paramsData.total;
      //   this.pageSize = paramsData.per_page;
      //   let statistics=ephemeral.finance.trade.data.statistics;
        
      //   let lastData={id:'统计:',
      //   username:statistics.member_count+'个商户',
      //   all_order_count:statistics.all_order_count+'条订单',
      //   all_order_amount:statistics.all_order_amount+'元',
      //   paid_order_amount:statistics.paid_order_amount+'元',
      //   all_order_poundage:statistics.all_order_poundage+'元',
      //   balance:statistics.balance+'元',
      //   balance_disabled:statistics.balance_disabled+'元',
      //   pay_amount_total:statistics.pay_amount_total+'元',
      // };
      //   this.tableData.push(lastData);
        // if (data.length > 0) {
        //   let tableList = [];
        //   for (let i = 0; i < data.length; i++) {
        //     let type=data[i].type;
        //     let mType;
        //     if(type=='1'){
        //        mType="商户登录"
        //     }else if(type=='2'){
        //       mType='商户短信验证'
        //     }else{
        //       mType='支付密码验证'
        //     }
        //     tableList.push({
        //       id: data[i].id,
        //       ip:data[i].ip,
        //       type: mType,
        //       merchant_id: data[i].merchant_id,
        //       comment: data[i].comment,
        //       updated_at: this.switchTime(data[i].created_at),
        //       merchant:data[i].merchant
        //     })
        //   }
        //   this.tableData = tableList;
        // }else{
        //   this.tableData=[];
        // }
      });
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
    handleSearch() {
      // let date = JSON.stringify(this.date);
      // let dateStr = date.split(",");
      // let dateArr = JSON.parse(dateStr);
      // this.date=dateArr;
      let params = {
        id: this.merchant_id=='a'?'':this.merchant_id,
        per_page: this.pageSize,
        page:this.page 
      };
     this.getTableData(params);
    },
 
  }

};
