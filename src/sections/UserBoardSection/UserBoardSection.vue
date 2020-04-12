<template>
  <div>
    <div class="infoContainer hideMobile">
      <p class="info">
        {{ $t('userBoardSection.info') }}
        <span class="icon material-icons">brush</span>
      </p>
        <span
          class="clearIcon material-icons"
          @click="clear"
        >
          clear
        </span>
    </div>
    <div class="infoContainer hideDesktop">
      <p class="info">{{ $t('userBoardSection.mobileInfo') }}</p>
    </div>
    <div
      ref="boardContainer"
      class="UserBoardSection"
    >
        <Canvas
          ref="canvas"
          className="canvas"
          :height="heightCanvas"
          :width="widthCanvas"
        />
        <Board
          class="Board"
          allSelected
          :numOfColumns="4"
          :numOfRows="4"
          :images="userImages"
        />
    </div>
  </div>
</template>

<script>
import { Canvas, Board } from '@/components';
import VueTypes from 'vue-types';

export default {
  name: 'UserBoardSection',
  props: {
    userImages: VueTypes.arrayOf(VueTypes.shape({
      id: VueTypes.number,
      image: VueTypes.string.isRequired,
      selected: VueTypes.bool.def(false),
    })).loose,
  },
  components: {
    Canvas,
    Board,
  },
  data() {
    return {
      widthCanvas: undefined,
      heightCanvas: undefined,
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    clear() {
      this.$refs.canvas.clearArea();
    },
    handleResize() {
      this.widthCanvas = this.$refs.boardContainer.offsetWidth;
      this.heightCanvas = this.$refs.boardContainer.offsetHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";

.infoContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    display: flex;
    align-items: center;
    font-size: $fs-large;
    font-family: $base-secondary-font;
    color: darken($secundary, 15%);
    padding: calculateRem(15px) 0;
    user-select: none;
    .icon {
      margin-left: calculateRem(5px);
    }
  }
  .clearIcon {
    color: darken($secundary, 15%);
    cursor: pointer;
  }
}
.UserBoardSection {
  position: relative;
  .Board {
    grid-template-rows: repeat(4, minmax(55px, 65px)) !important;
    @include largeDesktop {
      grid-template-rows: repeat(4, minmax(65px, calc(100vh - 90vh))) !important;
    }
    @include smallHeight {
      grid-template-rows: repeat(4, minmax(55px, calc(100vh - 90vh))) !important;
    }
    @include mobile {
      grid-template-rows: repeat(4, 90px) !important;
    }
  }
  .canvas {
    // cursor: url('../../assets/brush-white-18dp.svg') -90 -90, auto;
    position: absolute;
    z-index: 30;
  }
}
@include mobile {
  .hideMobile {
    display: none;
  }
}
@include tablet {
  .hideDesktop {
    display: none;
  }
}
</style>
