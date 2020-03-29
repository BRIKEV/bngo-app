<template>
  <div class="createGameForm">
    <BkInput
      :value="roomName"
      id="roomName"
      name="roomName"
      type="text"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.nameLabel')"
      @input="handleRoomNameChanged"
    />
    <BkInput
      :value="password"
      id="password"
      name="password"
      type="password"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.passwordLabel')"
      @input="handlePasswordChanged"
    />
    <slot name="optional" />
  </div>
</template>

<script>

export default {
  name: 'CreateGameForm',
  data() {
    return {
      roomName: undefined,
      password: undefined,
    };
  },
  methods: {
    handleRoomNameChanged(roomName) {
      this.roomName = roomName;
      this.$emit('onCreateRoomNameChanged', roomName);
    },
    handlePasswordChanged(password) {
      this.password = password;
      this.$emit('onCreatePasswordChanged', password);
    },
  },
};
</script>
