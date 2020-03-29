<template>
  <div class="joinGameForm">
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

.accessBtn {
  margin-right: calculateRem(15px);
  font-size: $fs-h3;
  font-weight: $regular;
}
.createBtn {
  font-size: $fs-h3;
  font-weight: $regular;
}
</style>
