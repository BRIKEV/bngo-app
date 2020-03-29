<template>
  <nav class="navbar">
    <h1 class="title">{{ title }}</h1>
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
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calculateRem(48px);
      background: $brand;
      color: $white;
      font-size: $fs-large;
      font-family: $base-font-title;
    }
  }
</style>
