<template>
  <div>
    <BkHeader :title="$t('dashboard.title')" />
    <div class="dashboard" v-if="hasData">
      <div class="content">
        <div class="outputImagesContainer">
          <Board
            class="outputImages"
            :numOfColumns="7"
            :numOfRows="7"
            :images="board"
            />
        </div>
          <div class="Info">
            <Wheel
              :selected="selected"
              :animate="animate"
              class="Wheel"
              :images="board"
            />
              <BkButton
                v-if="!user.ready"
                key=1
                class="createBtn"
                @btn-clicked="handleStart"
              >
                START
              </BkButton>
            <transition name="slide">
              <BkButton
                v-if="user.ready"
                key=2
                class="createBtn"
                @btn-clicked="handleBingo"
              >
                BINGO
              </BkButton>
            </transition>
            <div class="boardContainer">
              <Board
                class="Board"
                allSelected
                :numOfColumns="4"
                :numOfRows="4"
                :images="userImages"
              />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Board, Wheel } from '@/components';
import { getInfo } from '@/persistence/access';
import io, { emit } from '@/io';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    Board,
    Wheel,
  },
  mounted() {
    io({
      newUser: this.userInfo,
      yourBoard: this.userBoard,
      userReady: this.userInfo,
      gameReady: console.log, // eslint-disable-line
      board: this.totalBoard,
      optionSelected: this.optionSelected,
      callbackAfterSelected: this.activateAnimate,
    },
    {
      ...getInfo(),
      delay: 2500,
    });
  },
  computed: {
    ...mapState({
      board: (state) => state.board,
      userImages: (state) => state.userBoard,
      selected: (state) => state.currentResult.selected,
      animate: (state) => state.currentResult.animate,
      user: (state) => state.user,
    }),
    hasData() {
      return this.board.length !== 0 && this.userImages.length !== 0;
    },
  },
  methods: {
    ...mapActions(['userBoard', 'totalBoard', 'optionSelected', 'userInfo', 'activateAnimate']),
    handleStart() {
      emit('readyToStart');
    },
    handleBingo() {
      emit('bingo');
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.dashboard {
  background: lighten($lightGray, 15%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  .gameTitle {
    font-family: $base-font-title;
    font-size: $fs-h1;
  }
}
.content {
  display: flex;
  justify-content: space-around;
  height: 100%;
  margin-top: calculateRem(75px);
  margin-bottom: calculateRem(25px);
  .outputImagesContainer {
    width: 60%;
    .outputImages {
      width: 100%;
    }
  }
  .Info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30%;
    .Wheel {
      height: calculateRem(250px);
      width: calculateRem(310px);
      margin: 0 auto;
    }
    .boardContainer {
      height: 50%;
    }
  }
}
</style>
