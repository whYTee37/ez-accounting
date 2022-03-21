<template>
  <div>
    {{value}} <!--   用于测试<input/> 输入是否已经双向绑定-->
    <label class="formItem">
      <span class="name">{{this.fileName}}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop,Watch} from "vue-property-decorator";

@Component
export default class FormItem extends Vue{
  @Prop(String) value!:string;
  @Prop({required: true}) fileName!:string;
  @Prop() placeholder?:string;

  @Watch('value')
  onValueChange(){
    this.$emit('update:value',this.value);
  }
};
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>