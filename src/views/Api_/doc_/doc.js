import { _get, _post,ephemeral  } from "../../../api/index.js";
import store from "../../../store/store.js";
export default {
  name: "rate",
  data() {
    return {
      // 用户信息
      userMsg: {
      },
      apikey:'',
      tableData:[{
        username:"121",
        pay_order_id:"1212",
        complain_type:"你猜猜",
        status:"状态1"
      }]
      
    };
  },

  methods: {
   //
   open3() {
    this.$prompt('请输入支付密码', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[a-zA-Z0-9]{6,10}$/,
      inputType:'password',
      inputErrorMessage: '支付密码格式不正确'
    }).then(({ value }) => {
        _post("/merchant/user/apikey", {pay_password:value}).then(res => {
     this.apikey=res.data.apikey;
    })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消输入'
      });       
    });
  }
  },
  mounted() {

  },

  created() {
    // 设置用户信息
    this.userMsg = JSON.parse(window.localStorage.getItem("userInfo") || "{}");
  }
};
