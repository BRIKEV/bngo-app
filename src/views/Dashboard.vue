<template>
  <div class="game">
    <BkHeader logo>
      <div class="navbarOptions">
        <div class="usernameContainer">
          <span class="material-icons">
            account_circle
          </span>
          <span class="username">
            {{ user.username }}
          </span>
        </div>
        <span
          class="exit icon material-icons"
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
          <div class="chat">
            <ChatSection />
          </div>
        </div>
      </div>
    </div>
    <WinnerModal
      :opened="showModal"
      :winner="winner"
      @exit="handleExitClick"
      @playAgain="handlePlayAgainClick"
    />
  </div>
</template>

<script>
import { WinnerModal } from '@/components';
import { getInfo, logout } from '@/persistence/access';
import {
  UserBoardSection, GameActionsSection, BoardSection, ChatSection,
} from '@/sections';
import io, { emit } from '@/io';
import { mapActions, mapState } from 'vuex';
import { NOTIFICATION_BINGO, NOTIFICATION_USER_LEAVES } from '@/store/notification/notificationTypes';

export default {
  name: 'Dashboard',
  components: {
    ChatSection,
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
      userMessage: ({ title, message }) => this.sendMessage({
        title: `<span class="icon material-icons">account_circle</span>${title}`,
        text: message,
      }),
      userLeaves: ({ username }) => this.sendInfo(NOTIFICATION_USER_LEAVES({ username })),
      usernameHasBingo: this.handleUserHasBingo,
      usersList: this.setUsers,
      readyToPlayAgain: () => window.location.reload(true),
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
      sendMessage: 'sendMessage',
      sendInfo: 'sendInfo',
      clean: 'clean',
    }),
    exit() {
      this.$ga.event({
        eventCategory: 'exit',
        eventAction: 'logout',
        eventLabel: `User ${this.user} leaves`,
      });
      emit('leaveUser');
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
    handleExitClick() {
      this.$ga.event({
        eventCategory: 'play',
        eventAction: 'playAgainClick',
        eventLabel: 'Click play again',
      });
      this.showModal = false;
      this.exit();
    },
    handlePlayAgainClick() {
      emit('playAgain');
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
  .usernameContainer {
    display: flex;
    align-items: center;
    .username {
      padding-left: calculateRem(3px);
    }
  }
  .exit {
    margin-left: calculateRem(10px);
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
  margin-bottom: 0;
  @include tablet {
    margin-bottom: calculateRem(20px);
  }
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
    .chat {
      width: 90%;
      margin: 0 auto;
      display: block;
      max-width: calculateRem(500px);
      @include tablet {
        display: none;
      }
    }
  }
}
</style>
