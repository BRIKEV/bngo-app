<template>
  <BkModal
    class="mainModal"
    v-if="opened"
    @close="close"
  >
    <template #body>
      <div>
          {{ message }}
      </div>
    </template>
    <template #footer>
      <BkButton
        class="deleteBtn"
        @btn-clicked="handlePlayClick"
      >
        Play Again
      </BkButton>
    </template>
  </BkModal>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BingoModal',
  props: {
    opened: VueTypes.bool.def(false),
    winner: VueTypes.string.isRequired,
  },
  computed: {
    message() {
      return this.$t('modal.message', { winner: this.winner });
    },
  },
  methods: {
    close() {
      this.$emit('onClose');
    },
    handlePlayClick() {
      this.$emit('playAgain');
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.mainModal {
  &::v-deep .modal-header {
      justify-content: flex-start;
      padding: calculateRem(30px) calculateRem(30px) 0 calculateRem(30px);
  }
  &::v-deep .modal-body {
    min-height: calculateRem(100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: calculateRem(25px);
  }
  &::v-deep .modal-footer {
    display: flex;
    justify-content: center;
    .deleteBtn {
      margin-right: calculateRem(15px);
    }
  }
  .warning {
    font-size: $fs-h1;
    color: $warning;
  }
}
</style>
