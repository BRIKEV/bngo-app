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
        <img class="image" src="@/assets/trophy_nobg.png"/>
      </div>
    </template>
    <template #footer>
      <BkButton
        outline
        @btn-clicked="handleExit"
      >
        {{ $t('modal.btn') }}
      </BkButton>
      <BkButton
        class="playAgainBtn"
        @btn-clicked="handlePlayAgainClick"
      >
        {{ $t('modal.playAgain') }}
      </BkButton>
      <div class="share">
        <social-sharing
          :url="$t('modal.social.url')"
          :title="$t('modal.social.message', { winner })"
          hashtags="bngo,game,bingo"
          inline-template
        >
          <div class="iconContainer">
            <network network="twitter">
              <i class="fab fa-twitter-square"></i>
            </network>
            <network network="whatsapp">
              <i class="fab fa-whatsapp-square"></i>
            </network>
          </div>
        </social-sharing>
      </div>
    </template>
  </BkModal>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'WinnerModal',
  props: {
    opened: VueTypes.bool.def(false),
    winner: VueTypes.string.def(''),
  },
  methods: {
    close() {
      this.$emit('onClose');
    },
    handleExit() {
      this.$emit('exit');
      this.close();
    },
    handlePlayAgainClick() {
      this.$emit('playAgain');
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.mainModal {
  .playAgainBtn {
    margin-left: calculateRem(10px);
    background-color: $white;
    color: $brand;
    transition: background .3s ease-in;
    &:hover {
      background: darken($white, 10%);
    }

    &:active {
      background-color: darken($white, 10%);
    }
  }
  .mainModalTitle {
    font-size: $fs-h4;
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
    background: $brand;
    border: calculateRem(3px) solid $white;
    border-radius: calculateRem(40px);
    @include mobile {
      position: fixed;
      height: 100%;
      width: 100%;
      padding: 0;
      border: none;
      right: 0;
      top: 0;
      border-radius: 0;
      left: 0;
      bottom: 0;
    }
  }
  .modalImage {
    width: 100%;
    .image {
      width: 100%;
    }
  }
  &::v-deep .modalBody {
    min-height: calculateRem(100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .share {
    text-align: center;
    margin-top: 20px;
    .iconContainer {
      display: flex;
      justify-content: center;
      &::v-deep .fab {
        font-size: 2.3rem;
        margin: 0 10px;
        color: $white;
        @include desktop {
          cursor: pointer;
        }
      }
    }
  }
  &::v-deep .modalFooter {
    padding-top: calculateRem(30px);
  }
}
</style>
