<template>
  <div
    :style="itemStyles(image)"
    :class="{ disabled: !selected && !enableClick }"
    class="item"
    @click="isClicked = !isClicked"
  >
    <div
      class="clicked"
      v-if="isClicked && enableClick"
    >
      X
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'Board',
  props: {
    image: VueTypes.string.isRequired,
    selected: VueTypes.bool.def(false),
    enableClick: VueTypes.bool.def(false),
  },
  data() {
    return {
      isClicked: false,
    };
  },
  methods: {
    itemStyles(image) {
      return {
        'background-image': `url(${image})`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
$cardRadious: 20px;
$crossSize: calculateRem(80px);

.item {
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: $cardRadious;
  box-shadow: $boxShadow;
  transition: transform .3s;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @include desktop {
    &:hover {
      position: relative;
      transform: scale(2.5);
      background-position: center;
      z-index: 3;
    }
  }
  .clicked {
    font-size: $crossSize;
    font-weight: $bold;
    color: $error;
  }
}
.disabled {
  pointer-events: none;
  position: none;
  cursor: not-allowed;
  transition: opacity .5s;
}
</style>
