<template>
  <div
    class="board"
    :style="boardStyles(numOfRows, numOfColumns)"
    >
    <div v-for="(item, index) in images" :key="index" class="boardCard">
      <div v-show="!item.selected && !allSelected" class="hiddenCard">?</div>
      <div
        :style="itemStyles(item)"
        :class="{ disabled: !item.selected && !allSelected }"
        class="item" />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'Board',
  props: {
    numOfColumns: VueTypes.number.isRequired,
    numOfRows: VueTypes.number.isRequired,
    allSelected: VueTypes.bool.def(false),
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
$cardRadious: 20px;
.board {
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 5px;
  .boardCard {
    position: relative;
    .hiddenCard {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(28, 28, 28, 0.96);
      border-radius: $cardRadious;
      text-align: center;
      color: $white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $fs-h1;
    }
    .item {
      cursor: pointer;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: $cardRadious;
      box-shadow: $boxShadow;
      transition: transform .3s;
      height: 100%;
      width: 100%;
      &:hover {
        transform: scale(2.5);
        background-position: center;
        z-index: 3;
      }
    }
  }
}
.disabled {
  pointer-events: none;
  position: none;
  cursor: not-allowed;
  transition: opacity .5s;
}
</style>
