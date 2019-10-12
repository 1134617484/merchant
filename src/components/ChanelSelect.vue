<template>
  <!-- 判断数据显示类型为选择框 -->
    <el-select v-if="selectIndex===1" v-model='selectId' @change="selectTypes(selectValue)">
      <el-option v-for="item in selectData" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
    </el-select>
  <!-- 判断数据显示类型为列表 -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border v-else>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="通道代码" width="120" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{ scope.row.code }}</template>
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column prop="name" label="通道名称" width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="weight" label="权重(1-9)" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-model="scope.row.weight" type="number" oninput="if(value.length>1)value=value.slice(1)" @change="getInputWeight(scope.row)"></el-input>
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default {
  name: 'ChanelItem',
  data() {
    return {
      valData: [],
      selectId: ''
    }
  },
  props: ['tableData','selectData','selectValue','isTrue','selectIndex','channel'],
  created() {
  },
  methods: {
    handleSelectionChange(val) {
      let valList = [];
      for(let i = 0;i<val.length;i++) {
        valList.push({
          channel_id: val[i].id,
          weight: val[i].weight
        })
      }
      this.valData = valList
      //console.log(valList,"valList");
      return val;
    },
    selectTypes(e) {
      this.valData = [{id:e}];
      //console.log(valData,"valData")
    },
    getInputWeight(row) {
      //console.log(row,"row");
    },
  },
}

</script>
