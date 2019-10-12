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
this.analysis=[...res.data.data];
      })
  }
}
// http://test.laravel.com/merchant/channel-finance
}