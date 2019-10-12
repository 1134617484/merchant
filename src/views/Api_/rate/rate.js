import { _get, _post,ephemeral  } from "../../../api/index.js";
import store from "../../../store/store.js";
import Clipboard from "clipboard";
export default {
  name: "rate",
  data() {
    return {
      // 用户信息
      userMsg: {
        
      },
      tableData:{
        channelRates:[],
        merchantRates:[],
        data_arr:[],
        custom_rate: 0

      },
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      
    };
  },

  methods: {
    getMenuData() {
      // //console.log(ephemeral.api_rate)
      // let data={...ephemeral.api_rate.data};
      // this.tableData=data;
      // this.tableData.merchantRates=[data.merchantRates];
      _get("merchant/user/rate").then(res => {
        // //console.log(res)
        let data={...res.data.data};
        //console.log(data)
        this.tableData=data;
        this.tableData.merchantRates=[data.merchantRates];
        //console.log(this.tableData)
      })
    },
  },
  mounted() {

  },

  created() {
    // 设置用户信息
    this.userMsg = JSON.parse(window.localStorage.getItem("userInfo") || "{}");
    this.getMenuData();
  }
};
