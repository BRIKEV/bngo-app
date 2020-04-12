<template>
  <div class="roulette">
    <div class="wheel wheel1">
      <div
        class="selectedImage"
        v-show="selected.name && !animate"
      >
        <img class="image" :src="selected.image" />
        <h3 class="name">{{ selected.name }}</h3>
      </div>
      <div
        class="wheel-inner"
        v-show="animate"
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
  components: {
    ImageCard,
  },
  props: {
    images: VueTypes.arrayOf(VueTypes.shape({
      image: VueTypes.string.isRequired,
    })).loose,
    animate: VueTypes.bool.def(false),
    name: VueTypes.string,
    selected: VueTypes.arrayOf(VueTypes.shape({
      image: VueTypes.string.isRequired,
      name: VueTypes.string.isRequired,
    })).loose,
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

.wheel {
  width: 100%;
  height: 100%;
  .animate {
    animation: rot 3s infinite linear;
  }
  .selectedImage {
    position: relative;
    height: 100%;
    .image {
      width: 100%;
    }
    .name {
      position: absolute;
      bottom: 0;
      color: $white;
      font-size: $fs-small;
      left: 0;
      right: 0;
      text-align: center;
      padding: calculateRem(5px) 0;
      background: $dark;
      @include desktop {
        font-size: $fs-medium;
      }
    }
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
      padding: calculateRem(30px);
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
