<template>
  <div id="app">
    <Notification group="notify" position="top" width="100%" />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { Notification } from '@/components';

export default {
  name: 'app',

  components: {
    Notification,
  },
};
</script>
<style lang="scss">
#app {
  height: 100vh;
}
</style>
