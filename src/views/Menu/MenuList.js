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
         
       },
       isCollapse: false,
       oneTitle:'管理中心',
       twoTitle:'',
       tag: "",
       iconfont:'iconfont',
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
       screenHeight: "",
       header_search:"",//搜索
     };
   },

   methods: {
     getMenuData() {
      //  _get("api/permission/menu").then(res => {
         let data = ephemeral.menu.menulist.data;
         this.menuList = data;
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
<<<<<<< HEAD
     getNavData(url, title) {
      this.twoTitle=title;
=======
<<<<<<< HEAD
    
=======
     getNavData(url, title) {
      // this.twoTitle=title;
>>>>>>> 01d537a8f4ed5533d17f7358057ce7a3240c0d4d
       // this.tag = url;
       // let obj = {};
       // this.dynamicTags.push({
       //   name: title,
       //   url: url,
       // });
       // this.dynamicTags = this.dynamicTags.reduce((cur, next) => {
       //   obj[next.url] ? "" : (obj[next.url] = true && cur.push(next));
       //   return cur;
       // }, []); //设置cur默认类型为数组，并且初始值为空的数组
       // 邮箱和密码要存储
     },
     handleOpen(key, keyPath) {
<<<<<<< HEAD
      this.twoTitle='';
      this.oneTitle=key;
       // if (key == "first") {
       //   this.navName = "订单管理";
       //   this.navName2 = "";
       // } else if (key == "about") {
       //   this.navName = "收款二维码";
       //   this.navName2 = "";
       // }
     },
     handleClose(key, keyPath) {},
     handleSelect(key, keyPath) {},
=======
      // this.twoTitle='';
      // this.oneTitle=key;

     },
     handleClose(key, keyPath) {},
     handleSelect(key, keyPath) {},
>>>>>>> 63cec2830a13718f59b6de9865bfbb755e4216ee
>>>>>>> 01d537a8f4ed5533d17f7358057ce7a3240c0d4d
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
         this.$router.push("/login");
     },
     handleQuit(){
       this.$router.push("/login");
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
<<<<<<< HEAD
     }
   },
=======
     },
    //  刷新后更新地址栏
    refresh_title(){
// console.log(this.$route.path)
    // 刷新时重置路由
<<<<<<< HEAD
    let title=ephemeral.menu.menu_type_list[this.$route.path];
    this.oneTitle=title[0];
    this.twoTitle=title[1];
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
        let fd = new FormData();
        // fd.append('pay_type_id', 11)//随文件上传的其他参数
        fd.append('logo', file);
        console.log(file)
       _post("merchant/user/logo", fd).then(res => {
         console.log(res)
          let url=res.data;
          this.dialogImageUrl=imgurl()+url;
          console.log(this.userMsg)
          this.userMsg.logo=url;
          localStorage.setItem('userInfo',JSON.stringify(this.userMsg))
          this.$message({
           message: "上传成功",
           type: "success"
         });

       })
    },
    // 阻止右键
    button_right(){
      document.oncontextmenu = function(){
				return false;
			}
      document.onmousedown = function(){
        if(event.button == 2){
          return false;
        }
      }
=======
    // console.log(ephemeral.menu.menu_type_list[this.$route.path])
    let title=ephemeral.menu.menu_type_list[this.$route.path];
    console.log(title) 
    this.oneTitle=title[0];
    this.twoTitle=title[1];
    console.log([this.oneTitle,this.twoTitle])
>>>>>>> 63cec2830a13718f59b6de9865bfbb755e4216ee
    }
    
   },
   watch:{
    $route(to,from){
<<<<<<< HEAD
      // console.log(to.path);
=======
      console.log(to.path);
>>>>>>> 63cec2830a13718f59b6de9865bfbb755e4216ee
    this.refresh_title()
    }
  },
>>>>>>> 01d537a8f4ed5533d17f7358057ce7a3240c0d4d
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
     this.userMsg = JSON.parse(window.localStorage.getItem("userInfo") || "{}");
     this.getMenuData();
   }
 };
