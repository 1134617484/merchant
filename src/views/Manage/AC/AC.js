import { log } from "util";
import store from "@/store/store.js";
import { _get, _post, _put, _delete, ephemeral,getUserMsg } from "../../../api/index.js";
export default {
  name: "AccessConfig",
  data() {
    return {
      status:5,
      imageUrl: {
        just: "",
        avatar: ""
      },
      fileFormData: new FormData(),
      // 认证失败的原因
      error_remarks:''
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 设置状态
    getTableData() {
      getUserMsg().then(res => {
        if (res.data.code == 200) {
          //console.log(res.data.data)
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.data)
           );
            store.state.isLodingLogin = false;
            store.state.user_data=res.data.data;
        this.status=res.data.data.authorized;
        this.error_remarks=res.data.data.remarks||"暂无";
        }
      });
      // this.status = JSON.parse(
      //   window.localStorage.getItem("userInfo")
      // ).authorized;
    },
    beforeAvatarUploadJust(file) {
      //console.log(file);
      let fd = this.fileFormData;
      //console.log(fd);
      fd.set("just", file);
    },
    beforeAvatarUpload(file) {
      //   let fd = new FormData();
      let fd = this.fileFormData;
      fd.set("avatar", file);
      // fd.append('pay_type_id', 11)//随文件上传的其他参数
      //console.log(this.fileFormData);
    },
    handleRemove(file, fileList) {
      //console.log(this.imageUrl);
      this.imageUrl = "";
      //console.log(file, fileList);
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange_just(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imageUrl.just = e.target.result; //将图片路径赋值给src
      };
      try {
        var files = event.target.files[0];
        reader.readAsDataURL(files);
      } catch (error) {}
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange_avatar(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imageUrl.avatar = e.target.result; //将图片路径赋值给src
      };
      try {
        var files = event.target.files[0];
        reader.readAsDataURL(files);
      } catch (error) {}
    },
    handleAvatarSuccess(res, file) {
      //console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //提交图片
    submit_upload(){
      // 
      let fd=this.fileFormData;
      if(!fd.get('just')){
        return this.$message.closeAll(),this.$message({
          message: "请上传身份证头像面照片",
          type: "warning"
        });
      }else if(!fd.get('avatar')){
        return this.$message.closeAll(),this.$message({
          message: "请上传身份证国徽面照片",
          type: "warning"
        });
      }
      _post("merchant/user/userupload", fd).then(res => {
        getUserMsg().then(res => {
          if (res.data.code == 200) {
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.data)
             );
              store.state.isLodingLogin = false;
              store.state.user_data=res.data.data;
              this.status = JSON.parse(
                window.localStorage.getItem("userInfo")
              ).authorized;
              this.$message.closeAll();this.$message({
                message: "提交成功",
                type: "success"
              })
          }
        });
        
    })
  },
  // 重新认证
  again(){
    this.status=0;
  }
}
};
