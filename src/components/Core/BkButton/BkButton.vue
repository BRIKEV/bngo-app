<template>
  <button
    :class="{ outline }"
    class="btn"
    :disabled="disabled"

    @click="btnClicked">
    <beat-loader :loading="isLoading" :color="'white'" :size="10" />
    <p class ="content" v-if="!isLoading">
      <slot></slot>
    </p>
  </button>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkButton',

  props: {
    isLoading: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    outline: VueTypes.bool.def(false),
  },

  methods: {
    btnClicked() {
      this.$emit('btn-clicked');
    },
  },

};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";

.btn {
  background: $brand;
  border-radius: calculateRem(8px);
  color: $white;
  min-height: calculateRem(45px);
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: $fs-base;
  transition: all .15s linear;
  padding: calculateRem(5px) calculateRem(15px);
  cursor: pointer;
  border: none;
  &:hover {
    background: lighten($brand, 20%);
    transition: background .3s ease-in;
  }

  &:active {
    background-color: $brand;
  }

  &:disabled {
    cursor: not-allowed;
    background: $disabled;
  }

  &.outline {
    background: transparent;
    color: $white;
    border: calculateRem(1px) solid $white;
    &:hover {
      background: lighten($brand, 20%);
      border-color: inherit;
      color: $white;
      transition: background .3s ease-in;
    }
  }

  .content {
    margin: 0;
  }
}
</style>
