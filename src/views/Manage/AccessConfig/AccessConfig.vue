 <template>
 <div class="config_success">
     <img src="@/assets/images/go.png"/><span>您已认证成功!</span>
 </div></template>

<script src="./AccessConfig.js"></script>
<style scoped lang="less"  src="../../../assets/css/common.less"></style>

<style lang="css" scoped>
.config_success{
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: center;align-items: center;
}
.config_success>img{
  width: 32px;
  margin-right: 15px
}
.config_success>span{
        color: #52c42e;
    font-weight: bold;
    font-size: 20px;
}
</style>