<template>
  <div
    class="board"
    :style="boardStyles(numOfRows, numOfColumns)"
    >
    <div
      v-for="(item, index) in images"
      :key="index"
      :style="itemStyles(item)"
      class="item" />
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'Board',
  props: {
    numOfColumns: VueTypes.number.isRequired,
    numOfRows: VueTypes.number.isRequired,
    images: VueTypes.arrayOf(VueTypes.shape({
      id: VueTypes.number,
      url: VueTypes.string.isRequired,
    })).loose,
  },
  methods: {
    itemStyles(item) {
      return {
        'background-image': `url(${item.imageUrl})`,
      };
    },
    boardStyles(rows, columns) {
      return {
        'grid-template-rows': `repeat(${rows}, 25%)`,
        'grid-template-columns': `repeat(${columns}, 1fr)`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.board {
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 5px;
  .item {
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
  }
}
</style>
