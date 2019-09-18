import { log } from "util";
import { _get, _post, _put, _delete } from "../../../api/index.js";
export default {
  data() {
    return {
    
    };
  },
  name: "home",
  created() {
  },
  methods: {
   
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
