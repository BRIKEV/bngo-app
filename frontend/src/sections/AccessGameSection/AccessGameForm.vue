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
    <slot name="optional" />
    <BkInput
      v-model="password"
      id="password"
      name="password"
      type="password"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.passwordLabel')"
    />
  </div>
</template>

<script>
export default {
  name: 'AccessGameForm',
  data() {
    return {
      password: undefined,
      roomName: undefined,
    };
  },
};
</script>
