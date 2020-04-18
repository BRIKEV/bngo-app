<template>
  <div class="BkForm">
    <form
      autocomplete="off"
      class="form"
      @submit.prevent
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
        <div class="logo">
          <img
            sizes="(max-width: 1400px) 100vw, 1400px"
            srcset="
              @/assets/branding/BnGO_v1_c_c_scale_w_200.png 200w,
              @/assets/branding/BnGO_v1_c_c_scale_w_495.png 495w,
              @/assets/branding/BnGO_v1_c_c_scale_w_908.png 908w,
              @/assets/branding/BnGO_v1_c_c_scale_w_1400.png 1400w"
            src="@/assets/branding/BnGO_v1_c_c_scale_w_1400.png"
            alt="BnGO"
          />
        </div>
        <div class="description">
           <slot />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkForm',
  props: {
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
  background: $lightGray;
  height: 100%;
  border-radius: 0;
  @include tablet {
    height: auto;
    border-radius: calculateRem(30px);
  }
  .form {
    height: 100%;
    padding: calculateRem(15px);
    @include tablet {
      padding: calculateRem(20px);
    }
  }
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
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    max-width: 150px;
    img {
      width: 100%;
    }
  }
  .title {
    top: calculateRem(70px);
    font-size: $fs-h1;
    font-family: $base-font-title;
  }
  .description {
    width: 100%;
  }
}
</style>
