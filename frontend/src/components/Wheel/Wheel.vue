<template>
  <div class="roulette">
    <div class="wheel wheel1">
      <div class="wheel-inner">
        <div
          v-for="(color, index) in colors"
          :key="index"
          :style="{ 'background-color': color.value }"
        >
          {{color.color}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wheel',
  data() {
    return {
      colors: [
        {
          color: 'red',
          value: '#f00',
        },
        {
          color: 'green',
          value: '#0f0',
        },
        {
          color: 'blue',
          value: '#00f',
        },
        {
          color: 'cyan',
          value: '#0ff',
        },
        {
          color: 'magenta',
          value: '#f0f',
        },
        {
          color: 'yellow',
          value: '#ff0',
        },
        {
          color: 'black',
          value: '#000',
        },
        {
          color: 'grey',
          value: '#555',
        },
        {
          color: 'lightgrey',
          value: '#AAA',
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.wheel {
  width:80px;
  height:120px;
  border:5px solid grey;
  overflow: hidden;
  .wheel-inner {
    height: 120px;
    margin-top:10px;
    margin-left:10px;
    position:relative;
    perspective: 900px;
    animation: rot 2s infinite linear;
    transform-style:preserve-3d;
    transform-origin: 50% 47% 20px;

    > div {
      width:60px;
      height:80px;
      position:absolute;
      transform-style:preserve-3d;
      backface-visibility:hidden;
      text-align:center;
      padding:25px 0;
      margin: 10px 0;
      box-sizing:border-box;
      $i: 0;
      @while $i < 9 {
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
