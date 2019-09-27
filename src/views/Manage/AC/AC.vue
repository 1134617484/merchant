 <template>
 <div class="container">
<div class="config_success">
     <div v-if="status==0"><img src="@/assets/images/go.png"/><span>未认证</span></div>
     <div v-if="status==1"><img src="@/assets/images/go.png"/><span>您已认证成功!</span></div>
     <div v-if="status==2" class="error"><img src="@/assets/images/error.png"/><span class="error_right">认证失败!</span><span class="error_url"></span></div>
 </div>
 </div>
 

 </template>

<script>
import { log } from "util";
import { _get, _post, _put, _delete,ephemeral } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
     status:0
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
     this.status=JSON.parse(window.localStorage.getItem('userInfo')).authorized;
    },
  }

};

</script>

<style lang="css" scoped>
.container{
border:  1px solid #ddd;
    margin: 0;
    border-radius: 5px;

}
.config_success>div{
  height: 60px;
  line-height: 60px;
      padding-top: 120px;
  display: flex;
  justify-content: center;align-items: center;
}
.config_success img{
  width: 32px;
  margin-right: 15px
}
.config_success span{
        color: #52c41a;
    font-weight: bold;
    font-size: 20px;
}

.config_success .error_right{
color: #d81e06;
margin-right: 20px;
}
.config_success .error_url{
color: cornflowerblue;
    font-size: x-small;
    cursor: pointer;
    padding-top: 8px;
}
</style>