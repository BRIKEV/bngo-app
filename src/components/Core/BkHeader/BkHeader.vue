<template>
  <nav class="navbar">
    <h1
      v-if="title"
      class="title"
    >
      {{ title }}
    </h1>
    <div
      v-if="logo"
      class="logoContainer"
    >
      <img src="@/assets/BnGO_logo.svg" alt="brand">
    </div>
    <slot></slot>
  </nav>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkHeader',

  props: {
    title: VueTypes.string.def(''),
    logo: VueTypes.bool.def(false),
  },
};
</script>

<style lang="scss" scoped>
  @import "@/theme/index.scss";
  .navbar {
    min-height: calculateRem(48px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $brand;
    padding: 0 20px;
    .logoContainer {
      height: calculateRem(35px);
      img {
        height: 100%;
      }
    }
    .title {
      color: $white;
      font-size: $fs-h3;
      font-family: $base-font-title;
    }
  }
</style>
