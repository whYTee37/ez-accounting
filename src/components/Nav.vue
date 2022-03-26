<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-money"></use>
      </svg>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-label"></use>
      </svg>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-statistics"></use>
      </svg>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  color: white;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected{
    color: $color-highlight;
  }
}
</style>