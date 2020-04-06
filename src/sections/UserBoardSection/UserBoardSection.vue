<template>
  <div>
    <div class="infoContainer">
      <p class="info">Dibuja sobre tu tablero
        <span class="icon material-icons">
          brush
        </span>
      </p>
        <span class="clearIcon material-icons">
          clear
        </span>
    </div>
    <div
        ref="boardContainer"
        class="UserBoardSection"
    >
        <Canvas
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
    this.widthCanvas = this.$refs.boardContainer.offsetWidth;
    this.heightCanvas = this.$refs.boardContainer.offsetHeight;
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
    grid-template-rows: repeat(4, minmax(70px, 80px)) !important;
    @include largeDesktop {
      grid-template-rows: repeat(4, minmax(80px, 120px)) !important;
    }
  }
  .canvas {
    position: absolute;
    z-index: 30;
  }
}
</style>
