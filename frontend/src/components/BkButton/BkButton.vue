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
export default {
  name: 'BkButton',

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
    outline: {
      type: Boolean,
      default: false,
    },
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
  height: calculateRem(45px);
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  height: calculateRem(45px);
  font-size: $fs-base;
  transition: all .15s linear;
  border: calculateRem(1px) solid $white;
  &:hover {
    background: lighten($brand, 20%);
    transition: background .3s ease-in;
  }

  &:active {
    background-color: $brand;
  }

  &:disabled {
    background: lightgrey;
  }

  &.outline {
    background: $white;
    color: $brand;
    border-color: $brand;
    &:hover {
      background: lighten($brand, 20%);
      color: $white;
      border-color: inherit;
      transition: background .3s ease-in;
    }
  }

  .content {
    margin: 0;
  }
}
</style>
