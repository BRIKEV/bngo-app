<template>
  <div class="board">
    <div
      v-for="item in totalItems"
      :key="item"
      class="item" />
  </div>
</template>

<script>
const TOTAL = 16;
export default {
  name: 'Board',
  beforeCreate() {
    this.totalItems = TOTAL;
  },
};
</script>
<style lang="scss" scoped>
.board {
  display: grid;
  grid-template-rows: repeat(4, 110px);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  .item {
      background: lightgray;
  }
}
</style>
