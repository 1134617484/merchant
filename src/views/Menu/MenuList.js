 import SideBar from '../../components/SideBar'
 import { _get, _post,ephemeral  } from "../../api/index.js";
 import store from "../../store/store.js";
 // 全屏
 import screenfull from "screenfull";
 import { log } from "util";
 export default {
   name: "home",
   data() {
     return {
       // 用户信息
       userMsg: {
         userName: ""
       },
       isCollapse: false,
       value8: "",
       value9: "",
       input10: "",
       tag: "",
       dynamicTags: [],
       inputVisible: false,
       inputValue: "",
       navName: "订单管理",
       navName2: "订单1",
       navList: [
         { name: "/first", navItem: "订单管理" },
         { name: "/about", navItem: "收款二维码" }
       ],
       menuList: [

       ],
       breadListLast: [{
           name: "订单管理",
           path: "first1"
         },
         {
           name: "订单",
           path: "first"
         }
       ],
       // 是否全屏
       isFullscreen: false,
       screenWidth: "",
       screenHeight: ""
     };
   },

   methods: {
     getMenuData() {
       console.log(ephemeral)
       this.menulist=ephemeral.menu.menu;
       console.log(this.menulist)
      //  _get("api/permission/menu").then(res => {
      //    let data = res.data.data;
      //    this.menuList = res.data.data;
      //    //console.log(data);
      //  })
     },
     activeMenu(el) {
       let reg = new RegExp("[\u4e00-\u9fa5]+$", "g");
       let text = el.target.innerHTML.match(/[\u4e00-\u9fa5]/g).join("");
       if (text == "订单管理" || text == "收款二维码") {
         return;
       } else {
         this.navName2 = text;
       }
     },
     getNavData(url, title) {
       this.tag = url;
       let obj = {};
       this.dynamicTags.push({
         name: title,
         url: url,
       });
       this.dynamicTags = this.dynamicTags.reduce((cur, next) => {
         obj[next.url] ? "" : (obj[next.url] = true && cur.push(next));
         return cur;
       }, []); //设置cur默认类型为数组，并且初始值为空的数组
       // 邮箱和密码要存储
     },
     handleOpen(key, keyPath) {
       if (key == "first") {
         this.navName = "订单管理";
         this.navName2 = "";
       } else if (key == "about") {
         this.navName = "收款二维码";
         this.navName2 = "";
       }
     },
     handleClose(key, keyPath) {},
     handleSelect(key, keyPath) {},
     doSomething() {
       this.isCollapse = !this.isCollapse;
     },
     handleCloseTag(tag, index, e) {
       this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
       let len = this.dynamicTags.length;
       if (len > 0) {
         let path = this.dynamicTags[index - 1].url;
         this.$router.push("" + path);
         this.tag = path;
       } else {
         this.$router.push("/orderList");
       }
     },
     quitLogin(command) {
       if (command == "a") {
         this.$router.push("/login");
       }else if(command == "b"){
        this.$router.push("/admin/reset");
       }
        
       
     },
     handleCommand(command) {
       //this.$message('click on item ' + command);
       if (command == "b") {
         this.dynamicTags = [];
       } else {
         this.dynamicTags = this.dynamicTags.filter(t => t.url == this.tag);
       }
     },
     // 全屏模式
     screenfull() {
       if (!screenfull.enabled) {
         this.$message({
           message: "您的浏览器无法进入全屏模式",
           type: "warning"
         });
         return false;
       }
       screenfull.toggle();
       this.isFullscreen = true;
     },
     // Esc 全屏检测
     checkFull() {
       let isFull =
         document.fullscreenEnabled ||
         window.fullScreen ||
         document.webkitIsFullScreen ||
         document.msFullscreenEnabled;
       if (isFull === undefined) {
         isFull = false;
       }
       return isFull;
     }
   },
   mounted() {
     window.onresize = () => {
       // 全屏模式下监测是否按下Esc
       if (!this.checkFull()) {
         // 退出全屏
         this.isFullscreen = false;
       }
     };
     this.screenWidth = document.body.clientWidth;
     this.screenHeight = document.body.clientHeight;
     // 浏览器高度
     window.onresize = () => {
       return (() => {
         this.screenWidth = document.body.clientWidth;
         this.screenHeight = document.body.clientHeight;
       })();
     };
   },
   components: {
     SideBar
   },
   computed: {
     defaultActive: function() {
       return this.$route.path.replace("/", "");
     }
   },
   created() {
     // 设置用户信息
     // console.log(store.state.userInfo);
     let userInfo = JSON.parse(window.localStorage.getItem("userInfo") || "{}");
     this.userMsg.userName = userInfo.name;
     this.getMenuData();
   }
 };
