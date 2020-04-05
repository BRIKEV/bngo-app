<template>
  <div id="app">
    <DisableViewSection />
    <Notification group="notify" position="bottom left" width="400px" />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { Notification } from '@/components';
import { DisableViewSection } from '@/sections';

export default {
  name: 'app',

  components: {
    Notification,
    DisableViewSection,
  },
};
</script>
<style lang="scss">
#app {
  height: 100vh;
}
</style>
