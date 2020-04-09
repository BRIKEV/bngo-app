<template>
  <div class="gameActionsSection">
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
      {{ $t('gameActionsSection.start') }}
    </BkButton>
    <transition name="slide">
    <BkButton
        v-if="user.ready"
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
import { Wheel } from '@/components';
import { mapState } from 'vuex';

export default {
  name: 'GameActionsSection',
  components: {
    Wheel,
  },
  computed: {
    ...mapState({
      board: (state) => state.bgno.board,
      selected: (state) => state.bgno.currentResult.selected,
      animate: (state) => state.bgno.currentResult.animate,
      user: (state) => state.bgno.user,
    }),
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
