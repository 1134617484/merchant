import store from "../../store/store.js";
import { _get, _post, _put, _delete,ephemeral, switchTime } from "../../api/index.js"
import { log } from "util";
export default {
  data() {
    return {
      time:'0',
      url:'',
      options: [{
          value: '0',
          label: '每日'
        },{
          value: '1',
          label: '每周'
        },
        {
          value: '2',
          label: '每月'
        }],
      userName: '',
      total_success_amount: '', //成功交易总额
      total_pending_amount: '', //待支付总金额
      total_success_count: '', //成功总笔数
      total_fail_count: '', //异常总笔数
      total_pending_count: '', //待支付总笔数
      total_platform_amount: '', //平台利润总收入
      today_success_amount: '', //今日成功交易总额
      today_pending_amount: '', //今日待支付金额
      today_success_count: '', //今日成功笔数
      today_fail_count: '', //今日异常笔数
      today_pending_count: '', //今日待支付笔数
      today_platform_amount: '', //今日平台利润收入
      week_pending_count: '',
      week_success_count: '',
      week_fail_count: '',
      month_pending_count: '',
      month_success_count: '',
      month_fail_count: '',
      InitAll:{
        fund:{}
      },//初始化所有数据
    };
  },
  name: "index",
  methods: {
    getIndexData() {
      let userInfo = JSON.parse(window.localStorage.getItem("userInfo") || "{}");
      this.userName = userInfo.name;
      _get("/merchant/index").then(res => {
        let all_order=res.data.data.today_pending_count+res.data.data.today_success_count;
        this.InitAll={...res.data.data,total_order_count:all_order};
        isNaN(this.InitAll.last_login_time)?'':this.InitAll.last_login_time=switchTime(this.InitAll.last_login_time);
        // let data = ephemeral.menu.index.data;
        // this.total_success_amount = data.total_success_amount;
        // this.total_pending_amount = data.total_pending_amount;
        // this.total_success_count = data.total_success_count;
        // this.total_fail_count = data.total_fail_count;
        // this.total_pending_count = data.total_pending_count;
        // this.total_platform_amount = data.total_platform_amount;
        // this.today_success_amount = data.today_success_amount;
        // this.today_pending_amount = data.today_pending_amount;
        // this.today_success_count = data.today_success_count;
        // this.today_fail_count = data.today_fail_count;
        // this.today_pending_count = data.today_pending_count;
        // this.today_platform_amount = data.today_platform_amount;
        // this.week_pending_count = data.week_pending_count;
        // this.month_pending_count = data.month_pending_count;
        // this.week_success_count = data.week_success_count;
        // this.month_success_count = data.month_success_count;
        // this.week_fail_count = data.week_fail_count;
        // this.month_fail_count = data.month_fail_count;
      })
    },
    handelTime(){
      if(this.time==0){
        this.url='day';
      }else if(this.time==1){
        this.url='week';
      }else{
        this.url='month';
      }
      this.getEchartData(this.url);
    },
    getEchartData(url) {
      _get("merchant/index/"+url).then(res => {
        let xdata=[...res.data.data.time];
        let ydata=[...res.data.data.result];
         let legendData=[];
         for(var i=0;i<ydata.length;i++){
          ydata[i].stack=ydata[i].name+ydata[i].stack;
            legendData.push(ydata[i].name);
         }
         this.showEcharts(xdata,ydata,legendData);
      })
    },
    showEcharts(xdata, ydata,legendData) {
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
      let option = {
        color:['#FF0000','#019CFF'],
        title: {
          text: '交易订单概况',
          subtext: '按天统计',
          left: '40%',
          textAlign: 'center',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right:'60',
          data:legendData,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let option = {
        title: {
          text: '',
          subtext: '依次为每天,每周，每月',
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', 'day', 'week', 'month'],
            ['待支付订单', this.today_pending_count, this.week_pending_count, this.month_pending_count],
            ['已支付订单', this.today_success_count, this.week_success_count, this.month_success_count],
            // ['异常订单', this.today_fail_count, this.week_fail_count, this.month_fail_count],
          ]
        },
        series: [{
          name: '最近一天',
          type: 'pie',
          radius: 60,
          center: ['25%', '50%'],
          value: 'day'
        }, {
          name: '最近一周',
          type: 'pie',
          radius: 60,
          center: ['50%', '50%'],
          encode: {
            itemName: 'product',
            value: 'week'
          }
        }, {
          name: '最近一月',
          type: 'pie',
          radius: 60,
          center: ['75%', '50%'],
          encode: {
            itemName: 'product',
            value: 'month'
          }
        }]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.handelTime();
  },
  created() {
    this.getIndexData();
    document.oncontextmenu = function(){
      　　return false;
      }
  }
};
