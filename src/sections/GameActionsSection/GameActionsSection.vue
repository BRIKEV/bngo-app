<template>
  <div class="gameActionsSection">
    <h2
      class="usersTitle"
      v-if="!areUsersReady"
    >
      {{ $t('gameActionsSection.title') }}
    </h2>
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
        <UsersList
          class="usersList"
          :users="mock"
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
    <transition name="slide">
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
import mock from './mock';


export default {
  name: 'GameActionsSection',
  components: {
    Wheel,
    UsersList,
  },
  data() {
    return {
      mock,
    };
  },
  computed: {
    ...mapState({
      board: (state) => state.bgno.board,
      selected: (state) => state.bgno.currentResult.selected,
      animate: (state) => state.bgno.currentResult.animate,
      user: (state) => state.bgno.user,
    }),
    areUsersReady() {
      return this.mock.every(({ ready }) => ready);
    },
  },
  methods: {
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
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

.usersTitle {
  text-align: center;
  font-family: $base-font-family;
  font-size: $fs-h4;
  margin-bottom: calculateRem(5px);
}
.gameField {
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: $boxShadow;
  border-radius: calculateRem(20px);
  background: $white;
  .info {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .users {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: scroll;
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