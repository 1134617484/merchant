 <template>
 <div class="config_success">
     <div v-if="status==0?true:false"><img src="@/assets/images/go.png"/><span>您已认证成功!</span></div>
     <div v-if="status==1?true:false" class="error"><img src="@/assets/images/error.png"/><span class="error_right">您未认证!</span><span class="error_url">去认证</span></div>
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
      
      _get("merchant/user/authorize").then(res => {
        this.status=res.data.data.authorized;
      });
    },
  }

};

</script>

<style lang="css" scoped>
.config_success>div{
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: center;align-items: center;
}
.config_success img{
  width: 32px;
  margin-right: 15px
}
.config_success span{
        color: #52c42e;
    font-weight: bold;
    font-size: 20px;
}
.error{

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