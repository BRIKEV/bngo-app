<template>
  <div class="gameActionsSection">
    <div class="gameField">
      <div
        class="info"
        v-if="areUsersReady"
      >
        <Wheel
          :selected="selected"
          :animate="animate"
          class="Wheel"
          :images="board"
        />
      </div>
      <div
        class="users"
        v-else
      >
        <h2 class="usersTitle">
          {{ $t('gameActionsSection.title') }}
        </h2>
        <UsersList
          class="usersList"
          :users="users"
          :userReadyMsg="$t('gameActionsSection.userList.readyMsg')"
          :userNotReadyMsg="$t('gameActionsSection.userList.notReadyMsg')"
        />
      </div>
    </div>
    <BkButton
      v-if="!user.ready"
      key=1
      class="createBtn"
      @btn-clicked="handleStart"
    >
      {{ $t('gameActionsSection.start') }}
    </BkButton>
    <transition name="fade" mode="out-in">
    <BkButton
        v-if="user.ready && areUsersReady"
        key=2
        class="createBtn"
        @btn-clicked="handleBingo"
    >
      {{ $t('gameActionsSection.bingo') }}
    </BkButton>
    </transition>
  </div>
</template>

<script>
import { emit } from '@/io';
import { Wheel, UsersList } from '@/components';
import { mapState } from 'vuex';

export default {
  name: 'GameActionsSection',
  components: {
    Wheel,
    UsersList,
  },
  computed: {
    ...mapState({
      board: (state) => state.bgno.board,
      selected: (state) => state.bgno.currentResult.selected,
      animate: (state) => state.bgno.currentResult.animate,
      user: (state) => state.bgno.user,
      users: (state) => state.bgno.users,
    }),
    areUsersReady() {
      return this.users.every(({ ready }) => ready);
    },
  },
  methods: {
    handleStart() {
      this.$ga.event({
        eventCategory: 'bingo',
        eventAction: 'readyToStart',
        eventLabel: 'User click start button',
      });
      emit('readyToStart');
    },
    handleBingo() {
      this.$ga.event({
        eventCategory: 'bingo',
        eventAction: 'bingo',
        eventLabel: 'User click bingo button',
      });
      emit('bingo');
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

.usersTitle {
  text-align: center;
  font-family: $base-font-family;
  font-size: $fs-h5;
  padding-top: calculateRem(10px);
}
.gameField {
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: $boxShadow;
  border-radius: calculateRem(20px);
  background: $white;
  height: calculateRem(220px);
  @include largeDesktop {
    height: calculateRem(280px);
  }
  @include smallHeight {
    height: calculateRem(150px);
  }
  .info {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: $boxShadow;
    border-radius: calculateRem(20px);
  }
  .users {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    .usersList {
      padding: calculateRem(15px);
    }
  }
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
</style>
