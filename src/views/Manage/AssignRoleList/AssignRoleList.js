 import { _get, _post, _put, _delete } from "../../../api/index.js"
 import store from "../../../store/store.js";
 export default {
   data() {
     return {
       id: '',
       name: '',
       status: '',
       is_manager: '',
       loading: store.state.isLodingLogin,
       RoleStatus:true,
       checkedArr: [4],
       data: [],
       defaultProps: {
         children: 'children',
         label: 'label'
       }
     };
   },
   created() {
    this.getChecked();
   },
   methods: {
    handelStatus(){
      this.RoleStatus=false;
    },
     getChecked() {
       this.id = this.$route.query.id;
       //alert( this.id )
       // loading加载
        store.state.isLodingLogin = true;
       _get("api/role/" + this.id).then(res => {
         let data = res.data.data;
         let str = data.permissions;
         let arr = str.split(",");
         let newArr = arr.map(Number);
         this.setCheckedKeys(newArr);
         this.id = data.id;
         this.name = data.name;
         this.status = data.status;
         this.is_manager = data.is_manager;
         let params = { id: this.id, };
         this.getTreeData(params);
         // loading加载
        store.state.isLodingLogin = false;
       }).catch(err=>{
        store.state.isLodingLogin = false;
       })
     },
     getTreeData(params) {
       _get("api/permission/tree", params).then(res => {
         this.data = res.data.data;
       })
     },
     getCheckedNodes() {
       console.log(this.$refs.tree.getCheckedNodes());
     },
     getCheckedKeys() {
       //console.log(this.$refs.tree.getCheckedKeys());
       let arr = this.$refs.tree.getCheckedKeys();
       let params = { permissions: arr }
       _post("api/role/assign/" + this.id, params).then(res => {
         this.$message({
           message: "提交成功",
           type: "success"
         });
         //window.reload(); 
          this.$router.push('/role');
       }).catch(error => {
         this.$message({
           message: "提交失败",
           type: "error"
         });
       });
     },
     setCheckedNodes() {
       this.$refs.tree.setCheckedNodes([{
         id: 5,
         label: '二级 2-1'
       }, {
         id: 9,
         label: '三级 1-1-1'
       }]);
     },
     setCheckedKeys(arr) {
       this.$refs.tree.setCheckedKeys(arr);
     },
     resetChecked() {
       this.$refs.tree.setCheckedKeys([]);
     }

   },
   computed: {
    // 登录动画
    isLoading() {
      return store.state.isLodingLogin;
    }
  },
   // watch: {
   //   "$route.path":  function (newVal, oldVal) {
   //    if(newVal==='/assignRoleList'){
   //      this.getChecked();
   //    }
  
   //   }
   // }
 };
