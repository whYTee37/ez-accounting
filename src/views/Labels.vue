<template>
  <Layout class="all">
    <div class="tags">
      <router-link class="tag"
                   v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
<!--        <Icon name="right"/>-->
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag"
              @click="createTag">
        新建标签
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
//import Vue from 'vue';
import {Component} from 'vue-property-decorator';
//import tagListModel from '@/models/tagListModel';//采用VUEX后弃用Model模块
import Button from '@/components/Button.vue';
import { mixins } from 'vue-class-component';
import TagHelper from "@/mixins/TagHelper";
//tagListModel.fetch();
@Component({
  components: {Button}
})
export default class Labels extends mixins(TagHelper){
  //tags = tagListModel.data;
  created() {
    this.$store.commit('fetchTags');
  }

  get tags(){
    return this.$store.state.tagList;
  }
};
</script>

<style lang="scss" scoped>
.tags {
  background: rgb(255,144,0);
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    color: #f3f2f2;
    font-weight: 600;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}


</style>