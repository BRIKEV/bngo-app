<template>
    <canvas
      ref="myCanvas"
      :class="className"
      :height="height"
      :width="width"
      @mouseup="mousePressed = false;"
      @mouseleave="mousePressed = false"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
    />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'Canvas',
  props: {
    className: VueTypes.string,
    height: VueTypes.number.isRequired,
    width: VueTypes.number.isRequired,
  },
  data() {
    return {
      mousePressed: false,
      lastX: undefined,
      lastY: undefined,
      ctx: undefined,
    };
  },
  mounted() {
    this.ctx = this.$refs.myCanvas.getContext('2d');
  },
  methods: {
    draw(x, y, isDown) {
      if (isDown) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 7;
        this.ctx.lineJoin = 'round';
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
        this.ctx.stroke();
      }
      this.lastX = x;
      this.lastY = y;
    },
    clearArea() {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },
    handleMouseDown(e) {
      this.mousePressed = true;
      this.draw(e.pageX - this.offset(e.target).left, e.pageY - this.offset(e.target).top, false);
    },
    offset(element) {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
    },
    handleMouseMove(e) {
      if (this.mousePressed) {
        this.draw(e.pageX - this.offset(e.target).left, e.pageY - this.offset(e.target).top, true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "@/theme/index.scss";

  canvas {
    display: none;
    @include desktop {
      display: block;
    }
  }
</style>
