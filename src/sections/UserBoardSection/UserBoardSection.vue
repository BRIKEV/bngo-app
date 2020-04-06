<template>
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
.UserBoardSection {
  position: relative;
  height: 100%;
  .canvas {
    position: absolute;
    z-index: 30;
  }
}
</style>
