import { log } from "util";
import { _get, _post, _put, _delete,ephemeral,switchTime } from "../../../api/index.js"
export default {
  name: "AccessConfig",
  data() {
    return {
      //查询参数
      adminId:'',
      ip: "",
      optType:'',
      date: '',
      typeOptions:[],
      optOptions: [
          {
          value: '1',
          label: '商户登录'
         },
         {
          value: '2',
          label: '短信验证'
        },
        {
          value: '3',
          label: '支付密码验证'
        }
      ],
    
      //分页参数
      currentPage: "",
      total: "",
      pageSize: 10,
      page:"",
      // 管理员信息数据
      tableData: [],
    };
  },
  created() {
    this.getTableData();
    this.getSelectMenuData();
  },
  methods: {
    getSelectMenuData() {
      // _get("/merchant/user/log").then(res => {
        // console.log(res)
        let params = { "id": 'a', name: '全部' };
        this.typeOptions =[...ephemeral.menu.admin_log_select.data];
        console.log(this.typeOptions);
        this.typeOptions.unshift(params);
      // })
    },
    switchTime(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear() + '-';
      let m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let d = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      let updated_at = y + m + d;
      return updated_at;
    },
    getTableData(params) {
      _get("merchant/user/log",params).then(res => {
        let data=[...res.data.data.data];
        data.forEach(element => {
          isNaN(element.created_at)?element.created_at:element.created_at=switchTime(element.created_at);
        });
        this.tableData=data;
      //   let paramsData = ephemeral.menu.admin_log.data;
      //   let data = paramsData.data;
      //   this.currentPage = paramsData.current_page;
      //   this.total = paramsData.total;
      //   this.pageSize = paramsData.per_page;
      //   if (data.length > 0) {
      //     let tableList = [];
      //     for (let i = 0; i < data.length; i++) {
      //       let time = data[i].created_at;
      //       let type=data[i].type;
      //       let mType;
      //       if(type=='1'){
      //          mType="商户登录"
      //       }else if(type=='2'){
      //         mType='商户短信验证'
      //       }else{
      //         mType='支付密码验证'
      //       }
      //       tableList.push({
      //         id: data[i].id,
      //         admin:data[i].admin,
      //         type: mType,
      //         comment: data[i].comment,
      //         updated_at: this.switchTime(data[i].created_at),
      //       })
      //     }
      //     this.tableData = tableList;
      //   }else{
      //     this.tableData=[];
      //   }
      });
    },
    // 选择页容量
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.page=val;
      // console.log(`当前页: ${val}`);
      this.handleSearch();
    },
    handleSearch() {
      let date = JSON.stringify(this.date);
      let dateStr = date.split(",");
      let dateArr = JSON.parse(dateStr);
      this.date=dateArr;
      let params = {
        admin_id:this.adminId=='a'?'':this.adminId,
        created_at: this.date,
        page: this.page,
        per_page: this.pageSize
      };
     this.getTableData(params);
    },
 
  }

};
