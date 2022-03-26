<template>
  <Layout>
    <div class="navBar">
      <svg class="icon leftIcon" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-left-square"></use>
      </svg>
      <span class="title">详情</span>
      <span class="rightIcon"/>
    </div>

    <main>
      <ul>
        <li class="record">
            <label class="label">
              <span class="name">类型: </span>
              <span class="type">{{currentRecord.type === '-' ? '支出':'收入'}}</span>
            </label>
        </li>

        <li class="record">
          <label class="label">
            <span class="name">金额: </span>
            <span class="amount">{{currentRecord.amount}}</span>
          </label>
        </li>


      </ul>
    </main>

    <div class="createTag-wrapper">
      <Button class="createTag"
              @click="remove">
        删除记录
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Button from '@/components/Button.vue';

@Component({
  components:{Button}
})
export default class editRecord extends Vue{
  get currentRecord() {
    return this.$store.state.currentRecord;
  }

  created(){
    const id = this.$route.params.id;
    this.$store.commit('fetchRecords');
    this.$store.commit('setCurrentRecord', id);
    if (!this.currentRecord) {
      this.$router.replace('/404');
    }
  }

  goBack() {
    console.log("here is goBack");
    this.$router.back();
  }

  remove() {
    if (this.currentRecord) {
      this.$store.commit('removeRecord', this.currentRecord.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #FF9000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
    font-size: 24px;
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
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

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.record {
  background: white;
  @extend %item;
}

.label{
  display: flex;
}

</style>