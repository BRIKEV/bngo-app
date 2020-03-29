<template>
  <div class="createGameForm">
    <BkInput
      v-model="roomName"
      id="roomName"
      name="roomName"
      type="text"
      required
      color="secundary"
      label="Room name"
    />
    <BkInput
      v-model="password"
      id="password"
      name="password"
      type="password"
      required
      color="secundary"
      label="Password"
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
    };
  },
};
</script>
