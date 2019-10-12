import { _get, _post, _put, _delete ,ephemeral} from "../../../api/index.js"
import selectItem from '../../../components/ChanelSelect.vue'
export default {
  name: "AccountChange",
  data() {
    return {
      analysis:[{
        title:'微信'
      }]
    }
},
created() {
  this.getAnalysisData()
},
methods: {
  getAnalysisData(){
      _get("merchant/channel-finance").then(res => {
        console.log(res)
      })
  }
}
// http://test.laravel.com/merchant/channel-finance
}