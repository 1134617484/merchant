import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      //查询参数
      merchant_id:'',
      complain_merchant_id:'',
      appeal_order_id: "",
      optType:'',
      date: '',
      typeOptions:[],
      formLabelWidth:'120px',
      Form:{
        appeal:'',
        appeal_type:'',
        appeal_remark:'',
      },
      Rules: {
        appeal: [
          { required: true,message:'请输入申诉标识', trigger: 'change' },
          { min:5,max:25,message:'投诉标识长度在5~25字符范围'}
        ],
        appeal_type: [
          { required: true, message:'请选择申诉类型', trigger: 'change' }
        ],
        appeal_remark: [
          { required: true, message:'请输入申诉内容', trigger: 'change' },
          { min:5,max:25,message:'投诉内容长度在5~25字符范围'}
        ]
      },
      dialogFormAppeal:false,
      appealOptions:[
          {
          value: '1',
          label: '申诉商户'
         },
         {
          value: '2',
          label: '申诉订单'
        },
      ],
    
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:'',
      // 管理员信息数据
      tableData: [],
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
    //this.getChangeTypeData();
  },
  methods: {
    getSelectMenuData() {
      _get("api/merchant/select").then(res => {
        this.typeOptions = res.data.data;
        let params = {
          id: "a",
          name: "全部"
        };
        this.typeOptions.unshift(params);
      })
    },
     switchTime(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear() + "-";
      let m =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let d =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h = date.getHours();
       h=h<10?'0'+h:h;
      let mm = date.getMinutes();
      mm=mm<10?'0'+mm:mm;
      let s = date.getSeconds();
      s=s<10?'0'+s:s;
      let updated_at = y + m + d + h + ":" + mm + ":" + s;
      return updated_at;
    },
    getTableData(params) {
      _get("merchant/appeal",params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          let tableList = [];
          for (let i = 0; i < data.length; i++) {
            tableList.push({
              id:data[i].id,
              appeal_type:data[i].appeal_type==1?'申诉商户':'申诉订单',
              appeal_merchant:data[i].appeal_type==1?data[i].appeal_merchant.username:data[i].appeal_order_id.pay_order_id?data[i].appeal_order_id.pay_order_id:data[i].appeal_order_id,
              appeal_order:data[i].appeal_order,
              appeal_remark: data[i].appeal_remark,
              status: data[i].status==0?'待审核':'审核通过',
              created_at:this.switchTime(data[i].created_at),
              appeal:data[i].appeal
            })
          } 
          this.tableData = tableList;
        }else{
          this.tableData=[];
        }
      });
    },
    // 选择页容量
     handleSizeChange(val) {
      this.pageSize=val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.page=val;
      this.handleSearch();
    },
    handleAuthorized(index, row){
      this.dialogFormAppeal=true;
    },
    submitFormAppeal(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
           let params = {
            appeal: this.Form.appeal,
            appeal_type: this.Form.appeal_type,
            appeal_remark: this.Form.appeal_remark,
            }
          _post("merchant/appeal", params).then(res => {
            if(res.data){
              this.$message.closeAll();this.$message({
                message: "申诉成功",
                type: "success"
              });
            }
            this.dialogFormAppeal=false;
            this.handleSearch();
          })
        }else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    handleSearch() {
      let date = JSON.stringify(this.date);
      let dateStr = date.split(",");
      let dateArr = JSON.parse(dateStr);
      this.date=dateArr;
      let params = {
        // appeal_merchant_id: this.merchant_id=='a'?'':this.merchant_id,
        created_at:this.date,
        // appeal_order_id:this.appeal_order_id,
        per_page: this.pageSize,
        page:this.page 
      };
     this.getTableData(params);
    },
    el_select(){
      // //console.log(this.Form.complain_type)
      this.Form.complain='';
    }
 
  }

};
