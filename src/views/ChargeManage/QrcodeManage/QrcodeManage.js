import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js";
export default {
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      Form: {
        //姓名
        realname:"",
      },
      formLabelWidth:'120px',
      rules: {
        mobile: [
          { required: true, validator: this.$rules.FormValidate.Form().validatePhone, trigger: 'change' }
        ],
        realname: [
          { required: true, message:'请输入姓名', trigger: 'change' }
        ],
      },
    };
  },
  name: "qrcode",
  created() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           let params = {
            realname: this.Form.realname,
            }
          _post("merchant/user/profile-submit", params).then(res => {
            if(res.data){
              this.$message({
                message: "提交成功",
                type: "success"
              });
            }
          })
        }else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(){},   
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    handleFile(raw) {},
    beforeAvatarUpload(file) {
      let fd = new FormData();
      fd.append("pay_type_id", 11); //随文件上传的其他参数
      fd.append("file", file);
      _post("api/sysqrcode", fd).then(res => {
        if(res.data){
          this.$message({
            message: "上传成功",
            type: "success"
          });
        }
        this.getTableData("");
      });
    },
    beforeUpload(file) {
      let fd = new FormData();
      fd.append("pay_type_id", 12); //随文件上传的其他参数
      fd.append("file", file);
      _post("api/sysqrcode", fd).then(res => {
        if(res.data){
          this.$message({
            message: "上传成功",
            type: "success"
          });
        }
        this.getTableData("");
      });
    },
    handleSuccess(response, file, fileList) {
      // console.log(file);
      this.$refs.upload.clearFiles();
    },
 
  },
  computed: {
    headers() {
      return {
        "Content-Type": "multipart/form-data"
      };
    }
  },
  components: {}
};
