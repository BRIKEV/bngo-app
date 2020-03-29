<template>
  <div class="BkForm">
    <h1 class="title">{{ title }}</h1>
    <div class="btns">
       <slot />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkForm',
  props: {
    title: VueTypes.string.isRequired,
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";

.BkForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  width: 30%;
  height: 40vh;
  background: rgb(203, 207, 204);
  border-radius: calculateRem(30px);
}
.title {
  margin-bottom: calculateRem(70px);
  font-size: $fs-h1;
  font-family: $base-font-title;
}
</style>
