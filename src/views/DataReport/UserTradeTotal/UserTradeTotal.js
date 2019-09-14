import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      //查询参数
      merchant_id:'',
      id: "",
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
     
  },
  methods: {
    getSelectMenuData() {
      _get("api/merchant/select").then(res => {
        let params={"id":"a",name:"全部"};
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
    // getEchartData() {
    //   _get("api/finance-trade").then(res => {
    //     let xdata=res.data.data.time;
    //     let ydata=res.data.data.result;
    //     let legendData=[];
    //     for(let i=0;i<ydata.length;i++){
    //       legendData.push(ydata[i].name);
    //     }
         
    //     this.showEcharts(xdata,ydata,legendData);
    //   })
    // },
    showEcharts(xdata, ydata,legendData) {
      let myChart3 = this.$echarts.init(document.getElementById('myChart'));
      let option ={
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:legendData
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '6%',
          top:'12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xdata
        },
        yAxis: {
          type: 'value'
        },
        series: ydata
      }
      myChart3.setOption(option);
    },
    handleStatus(index,row){

    },
    getTableData(params) {
      _get("api/finance-trade",params).then(res => {
        let data = res.data.data.order.data;
        let paramsData =res.data.data.order;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        let xdata=res.data.data.time;
        let ydata=res.data.data.result;
        let legendData=[];
        for(let i=0;i<ydata.length;i++){
          legendData.push(ydata[i].name);
        }
        this.showEcharts(xdata,ydata,legendData);
        if (data.length > 0) {
          let tableList = [];
          for (let i = 0; i < data.length; i++) {
              tableList.push({
              id: data[i].id,
              merchant_id:data[i].merchant_id,
              pay_type_id:data[i].pay_type_id,
              pay_channel_id:data[i].pay_channel_id,
              pay_amount: data[i].pay_amount,
              pay_poundage: data[i].pay_poundage,
              pay_actual_amount:data[i].pay_actual_amount,
              pay_status:data[i].pay_status?'已支付':'未支付',
              cost:data[i].cost,
              merchant: data[i].merchant,
              type: data[i].type,
              channel: data[i].channel,
              pay_success_date: this.switchTime(data[i].pay_success_date),
              created_at: this.switchTime(data[i].created_at),
            })
          }
          this.tableData = tableList;
        }else{
          this.tableData=[];
        }
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
        // id:this.id,
        merchant_id: this.merchant_id=='a'?'':this.merchant_id,
        per_page: this.pageSize,
        page:this.page 
      };
     this.getTableData(params);
    },
 
  }

};
