import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      //查询参数
      merchant_id:'',
      complain_merchant_id:'',
      complain_order_id: "",
      optType:'',
      date: '',
      typeOptions:[],
      formLabelWidth:'120px',
      Form:{
        complain:'',
        complain_type:'',
        complain_remark:'',
      },
      Rules: {
        complain: [
          { required: true,message:'请输入投诉标识', trigger: 'change' },
          { min:5,max:25,message:'投诉标识长度在5~25字符范围'}
        ],
        complain_type: [
          { required: true, message:'请选择投诉类型', trigger: 'change' }
        ],
        complain_remark: [
          { required: true, message:'请输入投诉内容', trigger: 'change' },
          { min:5,max:25,message:'投诉内容长度在5~25字符范围'}
        ]
      },
      dialogFormComplain:false,
      complainOptions:[
          {
          value: '1',
          label: '投诉商户'
         },
         {
          value: '2',
          label: '投诉订单'
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
      _get("merchant/complain",params).then(res => {
        let data = res.data.data.data;
        let paramsData = res.data.data;
        this.currentPage = paramsData.current_page;
        this.total = paramsData.total;
        this.pageSize = paramsData.per_page;
        if (data.length > 0) {
          let tableList = [];
          for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            tableList.push({
              id:data[i].id,
              complain_type:data[i].complain_type==1?'投诉商户':'投诉订单',
              complain_merchant:data[i].complain_type==1?data[i].complain_merchant.username:data[i].complain_order.pay_order_id,
              // complain_order_id:data[i].complain_order_id,
              complain_remark: data[i].complain_remark,
              status: data[i].status==0?'待审核':'审核通过',
              created_at:this.switchTime(data[i].created_at),
              merchant:data[i].merchant,
              complain_order:data[i].complain_order,
              complain:data[i].complain,
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
      this.dialogFormComplain=true;
    },
    submitFormComplain(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
           let params = {
            complain: this.Form.complain,
            complain_type: this.Form.complain_type,
            complain_remark: this.Form.complain_remark,
            }
          _post("merchant/complain", params).then(res => {
            this.$message({
              message: "投诉成功",
              type: "success"
            });
            this.dialogFormComplain=false;
            this.Form.complain='';
            this.Form.complain_type='';
            this.Form.complain_remark='';
            this.handleSearch();
          }).catch(error => {
              this.$message({
                message: "投诉失败",
                type: "error"
              });
              })
        }else {
          console.log("error submit!!");
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
        // merchant_id: this.merchant_id=='a'?'':this.merchant_id,
        // complain_merchant_id:this.complain_merchant_id=='a'?'':this.complain_merchant_id,
        created_at:this.date,
        // complain_order_id:this.complain_order_id,
        per_page: this.pageSize,
        page:this.page 
      };
     this.getTableData(params);
    },
    el_select(){
      // console.log(this.Form.complain_type)
      this.Form.complain='';
    }
 
  }

};
