<template>
  <div>
    <BkHeader :title="$t('dashboard.title')">
      <div class="navbarOptions">
        {{ user.username }}
        <span
          class="icon material-icons"
          @click="exit">
            exit_to_app
        </span>
      </div>
    </BkHeader>
    <div
      v-if="hasData"
      class="dashboard"
    >
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
            <div class="wheelContainer">
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
            </div>
            <UserBoardSection
              class="UserBoard"
              :userImages="userImages"
            />
          </div>
      </div>
    </div>
        <WinnerModal
        :opened="showModal"
        :winner="winner"
        @playAgain="handlePlayAgainClick"
      />
  </div>
</template>

<script>
import { Board, Wheel, WinnerModal } from '@/components';
import { getInfo, logout } from '@/persistence/access';
import { UserBoardSection } from '@/sections';
import io, { emit } from '@/io';
import { mapActions, mapState } from 'vuex';
import { NOTIFICATION_BINGO } from '@/store/notification/notificationTypes';

export default {
  name: 'Dashboard',
  components: {
    Board,
    Wheel,
    UserBoardSection,
    WinnerModal,
  },
  data() {
    return {
      showModal: false,
      winner: undefined,
    };
  },
  mounted() {
    io({
      newUser: this.setUserInfo,
      yourBoard: this.setUserBoard,
      userReady: this.setUserInfo,
      gameReady: this.activateAnimate,
      board: this.setGameBoard,
      optionSelected: this.optionSelected,
      callbackAfterSelected: this.activateAnimate,
      errorAccess: this.exit,
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
    ...mapActions({
      setUserBoard: 'userBoard',
      setGameBoard: 'totalBoard',
      optionSelected: 'optionSelected',
      setUserInfo: 'userInfo',
      activateAnimate: 'activateAnimate',
      sendError: 'sendError',
      clean: 'clean',
    }),
    handleStart() {
      emit('readyToStart');
    },
    exit() {
      logout();
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
      this.exit();
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
    .wheelContainer {
      width: 100%;
      align-self: center;
      height: calculateRem(200px);
      width: calculateRem(200px);
      @include largeDesktop {
        width: calculateRem(250px);
        height: calculateRem(200px);
      }
      .Wheel {
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
      .createBtn {
        width: 100%;
        border-radius: calculateRem(10px);
        margin-top: calculateRem(15px);
      }
    }
  }
}
</style>
