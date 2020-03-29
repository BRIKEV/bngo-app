<template>
  <div class="createGameForm">
      <BkInput
        :value="username"
        slot="optional"
        id="username"
        name="username"
        type="text"
        required
        color="secundary"
        :label="$t('joinGame.createGameSection.usernamelabel')"
        @input="handleUsernameChanged"
      />
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
  name: 'AccessGameForm',
  data() {
    return {
      password: undefined,
      roomName: undefined,
      username: undefined,
    };
  },
  methods: {
    handleRoomNameChanged(roomName) {
      this.roomName = roomName;
      this.$emit('onAccessRoomNameChanged', roomName);
    },
    handlePasswordChanged(password) {
      this.password = password;
      this.$emit('onAccessPasswordChanged', password);
    },
    handleUsernameChanged(username) {
      this.username = username;
      this.$emit('onAccessUsernameChanged', username);
    },
  },
};
</script>
