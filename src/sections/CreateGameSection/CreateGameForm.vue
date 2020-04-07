<template>
  <div class="createGameForm">
    <BkInput
      v-model="roomName"
      id="roomName"
      name="roomName"
      type="text"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.nameLabel')"
    />
    <BkInput
      v-model="gameKey"
      id="password"
      name="gameKey"
      type="password"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.passwordLabel')"
    />
    <BkButton
      class="btn"
      slot="optional"
      :disabled="!roomName || !gameKey"
      @btn-clicked="handleCreateClick"
    >
      {{ $t('joinGame.createGameSection.btnCreate') }}
    </BkButton>
  </div>
</template>

<script>

export default {
  name: 'CreateGameForm',
  data() {
    return {
      roomName: undefined,
      gameKey: undefined,
    };
  },
  methods: {
    handleCreateClick() {
      this.$emit('onCreateClick', {
        roomName: this.roomName,
        gameKey: this.gameKey,
      });
    },
  },
};
</script>
