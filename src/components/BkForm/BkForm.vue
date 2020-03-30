<template>
  <form
    class="BkForm"
    v-on:submit.prevent
  >
    <div
      class="header"
      v-if="hasHeader"
      @click="handleIconClick"
    >
      <span class="icon material-icons">
        {{ headerIcon }}
      </span>
      <p class="iconText">{{ iconText }}</p>
    </div>
    <div class="content">
      <h1 class="title">{{ title }}</h1>
      <div class="btns">
         <slot />
      </div>
    </div>
  </form>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkForm',
  props: {
    title: VueTypes.string.isRequired,
    headerIcon: VueTypes.string.def('keyboard_arrow_left'),
    iconText: VueTypes.string.def('BACK'),
    hasHeader: VueTypes.bool.def(false),
  },
  methods: {
    handleIconClick() {
      this.$emit('onIconClicked');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";

.BkForm {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  width: 30%;
  padding: 20px;
  background: $lightGray;
  border-radius: calculateRem(30px);
  .header {
    position: absolute;
    top: calculateRem(10px);
    left: calculateRem(10px);
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: $fs-h1;
    }
    .iconText {
      font-size: $fs-large;
    }
  }
}
.content {
  margin-top: 30px;
  .title {
    top: calculateRem(70px);
    font-size: $fs-h1;
    font-family: $base-font-title;
  }
}
</style>
