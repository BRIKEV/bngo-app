<template>
  <div class="BkForm">
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
  height: 40vh;
  background: rgb(203, 207, 204);
  border-radius: calculateRem(30px);
  .header {
    position: absolute;
    top: calculateRem(20px);
    left: calculateRem(20px);
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
.title {
  position: absolute;
  top: calculateRem(70px);
  left: 0;
  right: 0;
  margin: auto;
  font-size: $fs-h1;
  font-family: $base-font-title;
}
</style>
