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
   //打开弹窗
   open3(data) {
    this.$prompt('请输入支付密码', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[a-zA-Z0-9]{6,10}$/,
      inputType:'password',
      inputErrorMessage: '支付密码格式不正确'
    }).then(({ value }) => {
        _post("/merchant/user/apikey", {pay_password:value}).then(res => {
     this.apikey=res.data.apikey;
     this.CopyInquireKey(data);
    })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消输入'
      });       
    });
  },
      //复制密钥 
      CopyInquireKey(data) {
        this.Clipboard(".copy-inquire");
      },
      // 统一处理复制
      Clipboard(ele) {
        console.log(ele)
        var clipboard = new Clipboard(ele);
        console.log(clipboard)
        clipboard.on("success", e => {
          this.$message.success("复制成功");
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", e => {
          // 不支持复制
          this.$message.warning("该浏览器不支持自动复制");
          // 释放内存
          clipboard.destroy();
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
