<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fileName}}</span>
      <input type="text" :value="value" @input="onValueChanged($event.target.value)" :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from "vue-property-decorator";

@Component
export default class FormItem extends Vue{
  @Prop(String) value!:string;
  @Prop({required: true}) fileName!:string;
  @Prop() placeholder?:string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
};
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  background: rgb(54,54,54);
  padding-left: 16px;
  display: flex;
  align-items: center;
  color: white;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
    color: white;
  }
}
</style>