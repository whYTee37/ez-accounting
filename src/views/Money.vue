<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

    <div class="notes">
    <FormItem :value.sync="record.notes"
                file-name="备注"
                placeholder="输入该笔账单详情"
                />
    </div>
    <Tags @update:value="record.tags = $event"/>
<!--    {{recordList}}-->
    <Types :value.sync="record.type"/>
  </Layout>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';

//import recordListModel from '@/models/recordListModel.ts';
//import tagListModel from '@/models/tagListModel.ts';

//const recordList:Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
//const recordList = recordListModel.fetch();
//const tagList = tagListModel.fetch();



@Component({components:{Tags, FormItem, Types, NumberPad}})
export default class Money extends Vue{

  get recordList() {
    return this.$store.state.recordList;
  }

  record:RecordItem = {
    id:'',
    tags:[],
    notes:'',
    type:'-',
    amount:0
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {

    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.notes = '';
    }
  }

};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>