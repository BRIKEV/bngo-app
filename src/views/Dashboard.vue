<template>
  <div class="game">
    <BkHeader logo>
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
        <BoardSection />
        <div class="Info">
          <GameActionsSection class="wheelContainer" />
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
import { WinnerModal } from '@/components';
import { getInfo, logout } from '@/persistence/access';
import { UserBoardSection, GameActionsSection, BoardSection } from '@/sections';
import io from '@/io';
import { mapActions, mapState } from 'vuex';
import { NOTIFICATION_BINGO } from '@/store/notification/notificationTypes';

export default {
  name: 'Dashboard',
  components: {
    UserBoardSection,
    WinnerModal,
    GameActionsSection,
    BoardSection,
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
      usersList: this.setUsers,
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
      setUsers: 'usersList',
      activateAnimate: 'activateAnimate',
      sendError: 'sendError',
      clean: 'clean',
    }),
    exit() {
      this.$ga.event({
        eventCategory: 'exit',
        eventAction: 'logout',
      });
      logout();
    },
    handleUserHasBingo({ username }) {
      this.$ga.event({
        eventCategory: 'modal',
        eventAction: 'userHashBingo',
        eventLabel: `The winner is ${username}`,
      });
      this.showModal = true;
      this.winner = username;
    },
    handlePlayAgainClick() {
      this.$ga.event({
        eventCategory: 'play',
        eventAction: 'playAgainClick',
        eventLabel: 'Click play again',
      });
      this.showModal = false;
      this.exit();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.game {
  height: 100%;
}
.dashboard {
  height: 100%;
  background: lighten($lightGray, 15%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  .gameTitle {
    font-family: $base-font-title;
    font-size: $fs-h1;
  }
  @include tablet {
    height: 100vh;
  }
}
.navbarOptions {
  display: flex;
  align-items: center;
  color: $white;
  font-size: $fs-large;
  font-family: $base-font-family;
  span {
    margin-left: 10px;
    cursor: pointer;
  }
}
.content {
  margin-left: auto;
  max-width: 892px;
  min-width: 892px;
  @include desktop {
    justify-content: space-between;
  }
  @include largeDesktop {
    max-width: 1240px;
    min-width: 1240px;
  }
  @include mobile {
    max-width: initial;
    min-width: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  margin-right: auto;
  display: flex;
  height: 100%;
  margin-top: calculateRem(20px);
  margin-bottom: calculateRem(25px);
  .Info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30%;
    @include mobile {
      width: 100%;
      .UserBoard {
        width: 90%;
        max-width: calculateRem(500px);
        margin: 0 auto;
      }
    }
    .wheelContainer {
      width: 100%;
      align-self: center;
      height: auto;
      width: calculateRem(220px);
      @include largeDesktop {
        width: calculateRem(280px);
      }
    }
  }
}
</style>
