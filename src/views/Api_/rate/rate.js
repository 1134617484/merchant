import { _get, _post,ephemeral  } from "../../../api/index.js";
import store from "../../../store/store.js";
export default {
  name: "rate",
  data() {
    return {
      // 用户信息
      userMsg: {
        
      },
      tableData:[{
        username:"121",
        pay_order_id:"1212",
        complain_type:"你猜猜",
        status:"状态1"
      }]
      
    };
  },

  methods: {
    getMenuData() {
      _get("/merchant/channel").then(res => {
        console.log(res)
        this.tableData=res.data.data;
      })
      
        // let data = ephemeral.menu.menulist.data;
        // this.menuList = data;
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
