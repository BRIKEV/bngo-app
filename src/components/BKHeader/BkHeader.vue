<template>
  <nav class="navbar">
    <h1 class="title">{{ title }}</h1>
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'BkHeader',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/theme/index.scss";
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-height: calculateRem(48px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $brand;
    padding: 0 20px;
    .title {
      color: $white;
      font-size: $fs-h3;
      font-family: $base-font-title;
    }
  }
</style>
