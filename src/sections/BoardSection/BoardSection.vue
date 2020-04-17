<template>
  <div class="outputImagesContainer">
    <Board
      class="outputImages"
      :numOfColumns="7"
      :numOfRows="7"
      :images="board"
      />
    <div class="horizontalContainer">
      <div class="titleContainer">
        <h2 class="title">{{ $t('boardSection.title') }}</h2>
        <span>{{ $t('boardSection.subtitle', { total }) }}</span>
      </div>
      <div class="boardContainer">
        <Board
          class="outputImagesMobile"
          :numOfColumns="49"
          :numOfRows="1"
          allSelected
          :images="results"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { Board } from '@/components';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'BoardSection',
  components: {
    Board,
  },
  computed: {
    ...mapState({
      board: (state) => state.bgno.board,
      results: (state) => state.bgno.results,
    }),
    ...mapGetters(['total']),
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
.outputImagesContainer {
  width: 60%;
  @include mobile {
    width: 90%;
    margin: 0 auto calculateRem(30px) auto;
  }
  .horizontalContainer {
    display: none;
    @include mobile {
      display: block;
      padding-bottom: calculateRem(5px);
      .titleContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $fs-base;
        color: $brand;
        margin-bottom: calculateRem(20px);
      }
      .outputImagesMobile {
        width: 100%;
        grid-template-rows: repeat(1, 80px) !important;
        grid-template-columns: repeat(49, 80px) !important;
      }
      .boardContainer {
        overflow-x: auto;
      }
    }
  }
  .outputImages {
    width: 100%;
    @include mobile {
      display: none;
    }
  }
}
</style>
