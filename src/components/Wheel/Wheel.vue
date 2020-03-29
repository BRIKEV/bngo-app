<template>
  <div class="roulette">
    <div class="wheel wheel1">
      <div
        class="wheel-inner"
        :class="{ animate }"
      >
        <ImageCard
          class="ImageCard"
          v-for="(data, index) in images"
          :key="index"
          :imageUrl="data.image"
        />
      </div>
    </div>
    <p>{{ name }}</p>
  </div>
</template>
<script>
import { ImageCard } from '@/components';
import VueTypes from 'vue-types';

export default {
  name: 'Wheel',
  props: {
    images: VueTypes.arrayOf(VueTypes.shape({
      image: VueTypes.string.isRequired,
    })).loose,
    animate: VueTypes.bool.def(false),
    name: VueTypes.string,
  },
  components: {
    ImageCard,
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

.wheel {
  width: 100%;
  height: 100%;
  box-shadow: $boxShadow;
  overflow: hidden;
  background: $white;
  border-radius: calculateRem(20px);
  .animate {
    animation: rot 3s infinite linear;
  }
  .wheel-inner {
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform-origin: 50% 47% calculateRem(20px);

    .ImageCard {
      width: 100%;
      height: 100%;
      position: absolute;
      padding: calculateRem(45px);
      transform-style: preserve-3d;
      backface-visibility: hidden;
      text-align: center;
      box-sizing: border-box;
      $i: 0;
      @while $i < 49 {
        &:nth-child(#{$i + 1}) {
          transform: rotateX(#{$i * 45}deg) translateZ(300px);
        }
        $i: $i + 1;
      }
    }
  }
}

@keyframes rot {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(900deg);
  }
}
</style>
