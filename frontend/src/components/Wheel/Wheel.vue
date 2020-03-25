<template>
  <div class="roulette">
    <div class="wheel wheel1">
      <div class="wheel-inner">
        <ImageCard
          class="ImageCard"
          v-for="(image, index) in images"
          :key="index"
          :imageUrl="image.imageUrl"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ImageCard } from '@/components';
import mock from '../Board/mock';

export default {
  name: 'Wheel',
  components: {
    ImageCard,
  },
  data() {
    return {
      images: mock,
    };
  },
};
</script>
<style lang="scss" scoped>
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

.wheel {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-shadow: $boxShadow;
  overflow: hidden;
  .wheel-inner {
    height: 120px;
    margin-top: 10px;
    margin-left: 10px;
    position: relative;
    perspective: 900px;
    // animation: rot 3s infinite linear;
    transform-style: preserve-3d;
    transform-origin: 50% 47% 20px;

    .ImageCard {
      width: 90%;
      height: 90%;
      position: absolute;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      text-align: center;
      padding: 25px 0;
      margin: 10px 0;
      box-sizing: border-box;
      $i: 0;
      @while $i < 49 {
        &:nth-child(#{$i + 1}) {
          transform: rotateX(#{$i * 40}deg) translateZ(120px);
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
