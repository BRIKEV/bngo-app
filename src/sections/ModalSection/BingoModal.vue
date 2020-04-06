<template>
  <BkModal
    class="mainModal"
    v-if="opened"
    @close="close"
  >
    <template #body>
      <div class="mainModalTitle">
          {{ $t('modal.message') }} <span class="winner">{{ winner.toUpperCase() }}</span>
      </div>
      <div class="modalImage">
        <img src="@/assets/trophy_nobg.png"/>
      </div>
    </template>
    <template #footer>
      <BkButton
        class="deleteBtn"
        @btn-clicked="handlePlayClick"
      >
        {{ $t('modal.btn') }}
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
    winner: VueTypes.string.def(''),
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
  .mainModalTitle {
    font-size: $fs-h1;
    font-family: $base-secondary-font;
    color: $white;
    font-weight: 300;
    padding: calculateRem(20px) calculateRem(10px);
  }
  &::v-deep .modal-header {
    justify-content: flex-start;
    padding: calculateRem(30px) calculateRem(30px) 0 calculateRem(30px);
  }
  &::v-deep .modalContainer {
    height: 90%;
    width: 50%;
    @include largeDesktop {
      height: 70%;
      width: 25%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #348659;
    border: 3px solid white;
    border-radius: 40px;
  }
  &::v-deep .modalBody {
    min-height: calculateRem(100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &::v-deep .modalFooter {
    padding-top: calculateRem(30px);
  }
}
</style>
