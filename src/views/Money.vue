<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord()"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
    <FormItem :value.sync="record.notes"
    file-name="备注"
    placeholder="在这里输入备注"/>
    </div>
    <Tags :value.sync="record.tags"/>
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
import recordListModel from '@/models/recordListModel.ts';
import tagListModel from '@/models/tagListModel.ts';

//const recordList:Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();



@Component({components:{Tags, FormItem, Types, NumberPad}})
export default class Money extends Vue{
  tags = tagList;
  recordList:RecordItem[] = recordList;
  record:RecordItem = {
    tags:['衣','食','住','行'],
    notes:'',
    type:'-',
    amount:0
  }

  saveRecord(){//当且仅当点击“OK”按钮时才触发
    const record2:RecordItem = JSON.parse(JSON.stringify(this.record));//用JSON深拷贝一下，弄个副本出来
    record2.createdAt = new Date();
    this.recordList.push(record2);//全篇仅此处可以修改recordList的值
    console.log(this.recordList);
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