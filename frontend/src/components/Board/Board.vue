<template>
  <div
    class="board"
    :style="boardStyles(numOfRows, numOfColumns)"
    >
    <div
      v-for="(item, index) in images"
      :key="index"
      :style="itemStyles(item)"
      :class="{ disabled: item.selected }"
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
      image: VueTypes.string.isRequired,
      selected: VueTypes.bool.def(false),
    })).loose,
  },
  methods: {
    itemStyles(item) {
      return {
        'background-image': `url(${item.image})`,
      };
    },
    boardStyles(rows, columns) {
      return {
        'grid-template-rows': `repeat(${rows}, auto)`,
        'grid-template-columns': `repeat(${columns}, 1fr)`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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
    box-shadow: $boxShadow;
  }
}
.disabled {
  opacity: 0.3;
  pointer-events: none;
  position: none;
  cursor: not-allowed;
  transition: opacity .5s;
}
</style>
