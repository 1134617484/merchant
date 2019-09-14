<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="vertical"
        unique-opened
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF">
      <sidebar-item v-for="(menu,index) in menuList" :key="index" :item="menu"   ref="SidebarItem"/>
    </el-menu>
  </el-scrollbar>
  </div>
</template>
<script>
 import { _get,_post } from "../api/index.js";
import SidebarItem from './SidebarItem.vue'
export default {
  data(){
    return{
       treeArr:[],
       menuList : [
            {
            "index":"1",
            "title": "订单管理",
            "children": [
              {
                "path": "/orderList",
                "title": "订单列表",
                "children":[]
              },
            ]
          },
          {
            "index":"2",
            "title": "管理员管理",
            "children": [
              {
                "path": "/manageList",
                "title": "管理员列表",
                "children":[]
              },
              {
                "path": "/roleList",
                "title": "角色管理",
                "children":[]
              },
              {
                "path": "/accessConfig",
                "title": "权限配置",
                "children":[]
              },
            ]
          },
          {
            "path": "/accountManage",
            "title": "商户管理",
            "index":"3",
            "children": [
              {
                "path": "/accountManage",
                "title": "未认证用户",
                "children":[]
              },
            ]
          }
         
    ]
    }
  },
  name:'Sidebar',
  created(){
      this.getSelectMenuData();
      this.getChild();
  },
  methods: {
     getChild (){
         console.log(this.$store.state.url);
     },
    getSelectMenuData(){
      _get("api/permission/menu").then(res => {
          let data=res.data.data;
          console.log(data);
      })
    }, 
   },
  components: { SidebarItem },
   
}
</script>
   