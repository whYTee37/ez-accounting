<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
    <FormItem :value.sync="record.notes"
                file-name="备注"
                placeholder="在这里输入备注"
                />
    </div>
    <Tags/>
    {{recordList}}
  </Layout>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Watch} from "vue-property-decorator";
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
    tags:[],
    notes:'',
    type:'-',
    amount:0
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord(){//当且仅当点击“OK”按钮时才触发
    this.$store.commit('createRecord', this.record);
  }



  @Watch('recordList')
  onRecordChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>