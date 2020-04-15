<template>
  <BkForm
    class="joinGameForm"
    :title="$t('joinGame.title')"
  >
    <div class="buttonContainer">
      <BkButton
        class="accessBtn"
        @btn-clicked="handleAccessClick"
      >
        {{ $t('joinGame.btnAccess') }}
      </BkButton>
      <BkButton
        class="createBtn"
        @btn-clicked="handleCreateClick"
      >
        {{ $t('joinGame.btnCreate') }}
      </BkButton>
    </div>
  </BkForm>
</template>

<script>
export default {
  name: 'JoinGameForm',
  methods: {
    handleAccessClick() {
      this.$emit('onAccess');
    },
    handleCreateClick() {
      this.$emit('onCreateRoom');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";
.joinGameForm {
  margin: calculateRem(40px) 0;
  height: auto;
  border-radius: calculateRem(30px);
  &::v-deep .content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    margin-top: 0;
  }
  .buttonContainer {
    display: flex;
    justify-content: space-between;
    margin: calculateRem(30px) 0 calculateRem(10px);
    .accessBtn {
      margin-right: calculateRem(15px);
      font-size: $fs-h3;
      font-weight: $regular;
    }
    .createBtn {
      font-size: $fs-h3;
      font-weight: $regular;
    }
  }
}

</style>
