<template>
  <div
    class="board"
    :style="boardStyles(numOfRows, numOfColumns)"
    >
    <div
      class="boardCard"
      v-for="item in images"
      :key="item.id"
    >
      <div
        class="hiddenCard"
        v-show="!item.selected && !allSelected"
      >
        ?
      </div>
      <BoardItem
        class="boardItem"
        :enableClick="allSelected"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import BoardItem from '@/components/BoardItem/BoardItem.vue';

export default {
  name: 'Board',
  components: {
    BoardItem,
  },
  props: {
    numOfColumns: VueTypes.number.isRequired,
    numOfRows: VueTypes.number.isRequired,
    allSelected: VueTypes.bool.def(false),
    images: VueTypes.arrayOf(VueTypes.shape({
      id: VueTypes.number,
      image: VueTypes.string,
      selected: VueTypes.bool.def(false),
    })).loose,
  },
  methods: {
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
@import "@/theme/index.scss";
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
      background: $black;
      border-radius: $cardRadious;
      text-align: center;
      color: $white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $fs-h1;
    }
  }
}
</style>
