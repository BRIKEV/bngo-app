<template>
  <div>
    <BkHeader :title="$t('dashboard.title')">
      <div class="navbarOptions">
        {{ user.username }}
        <span class="icon material-icons" @click="logout">
          exit_to_app
        </span>
      </div>
    </BkHeader>
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
            <UserBoardSection
              class="UserBoard"
              :userImages="userImages"
            />
          </div>
      </div>
    </div>
        <BingoModal
        :opened="showModal"
        :winner="winner"
        @playAgain="handlePlayAgainClick"
      />
  </div>
</template>

<script>
import { Board, Wheel } from '@/components';
import { getInfo, logout } from '@/persistence/access';
import { UserBoardSection, BingoModal } from '@/sections';
import io, { emit } from '@/io';
import { mapActions, mapState } from 'vuex';
import { NOTIFICATION_BINGO } from '@/store/notification/notificationTypes';

export default {
  name: 'Dashboard',
  components: {
    Board,
    Wheel,
    UserBoardSection,
    BingoModal,
  },
  data() {
    return {
      showModal: false,
      winner: undefined,
    };
  },
  mounted() {
    io({
      newUser: this.userInfo,
      yourBoard: this.userBoard,
      userReady: this.userInfo,
      gameReady: this.activateAnimate,
      board: this.totalBoard,
      optionSelected: this.optionSelected,
      callbackAfterSelected: this.activateAnimate,
      errorAccess: this.logout,
      incorrectBingo: () => this.sendError({
        title: NOTIFICATION_BINGO.error.title,
        text: NOTIFICATION_BINGO.error.text,
      }),
      usernameHasBingo: this.handleUserHasBingo,
    },
    {
      ...getInfo(),
      delay: 2500,
    });
  },
  computed: {
    ...mapState({
      board: (state) => state.bgno.board,
      userImages: (state) => state.bgno.userBoard,
      selected: (state) => state.bgno.currentResult.selected,
      animate: (state) => state.bgno.currentResult.animate,
      user: (state) => state.bgno.user,
    }),
    hasData() {
      return this.board.length !== 0 && this.userImages.length !== 0;
    },
  },
  methods: {
    ...mapActions(['userBoard', 'totalBoard', 'optionSelected', 'userInfo', 'activateAnimate', 'sendError']),
    handleStart() {
      emit('readyToStart');
    },
    logout() {
      logout();
      this.$router.push({ name: 'JoinGame' });
    },
    handleBingo() {
      emit('bingo');
    },
    handleUserHasBingo({ username }) {
      this.showModal = true;
      this.winner = username;
    },
    handlePlayAgainClick() {
      this.showModal = false;
      this.logout();
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
.navbarOptions {
  display: flex;
  align-items: center;
  color: $white;
  font-size: $fs-large;
  font-family: $base-font-title;
  span {
    margin-left: 10px;
    cursor: pointer;
  }
}
.content {
  margin-left: auto;
  max-width: 892px;
  min-width: 892px;
  @include largeDesktop {
    max-width: 1240px;
    min-width: 1240px;
  }
  margin-right: auto;
  display: flex;
  justify-content: space-between;
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
      width: 100%;
      margin: 0 auto;
      @include largeDesktop {
        width: calculateRem(310px);
      }
    }
  }
  .UserBoard {
    height: 50%;
  }
}
</style>
