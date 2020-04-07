<template>
  <div class="createGameForm">
      <BkInput
        v-model="username"
        slot="optional"
        id="username"
        name="username"
        type="text"
        required
        color="secundary"
        :label="$t('joinGame.createGameSection.usernamelabel')"
      />
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
      :disabled="!gameKey || !roomName || !username"
      @btn-clicked="handleAccessClick"
    >
      {{ $t('joinGame.accessGameSection.btnAccess') }}
    </BkButton>
  </div>
</template>

<script>

export default {
  name: 'AccessGameForm',
  data() {
    return {
      gameKey: undefined,
      roomName: undefined,
      username: undefined,
    };
  },
  methods: {
    handleAccessClick() {
      this.$emit('onAccessClick', {
        username: this.username,
        roomName: this.roomName,
        gameKey: this.gameKey,
      });
    },
  },
};
</script>
