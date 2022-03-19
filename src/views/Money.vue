<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord()"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :value.sync="record.tags"/>
    {{record}}
  </Layout>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Watch} from "vue-property-decorator";
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

const recordList:Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')

type Record = {
  tags:string[],
  notes:string,
  type:string,
  amount:number,
  createAt?:Date,
}

@Component({components:{Tags, Notes, Types, NumberPad}})
export default class Money extends Vue{

  recordList:Record[] = recordList;
  record:Record = {
    tags:['衣','食','住','行'],
    notes:'',
    type:'-',
    amount:0
  }

  saveRecord(){//当且仅当点击“OK”按钮时才触发
    const record2:Record = JSON.parse(JSON.stringify(this.record));//用JSON深拷贝一下，弄个副本出来
    record2.createAt = new Date();
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