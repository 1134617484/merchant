import { _get, _post, _put, _delete ,ephemeral} from "../../../api/index.js"
import selectItem from '../../../components/ChanelSelect.vue'
export default {
  name: "AccountChange",
  data() {
    return {
      analysis:[]
    }
},
created() {
  this.getAnalysisData('')
},
methods: {
  getAnalysisData(params){
      _get("merchant/channel-finance",params).then(res => {
        console.log(res)
this.analysis=[...res.data.data];
console.log(this.analysis)
      })
  }
}
// http://test.laravel.com/merchant/channel-finance
}