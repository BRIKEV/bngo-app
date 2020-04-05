<template>
  <div>
  <DisableViewSection />
    <div v-if="!isMobile" id="app">
      <Notification group="notify" position="bottom left" width="400px" />
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
</div>
</template>

<script>
import { Notification } from '@/components';
import { DisableViewSection } from '@/sections';
import isMobile from './utils/isMobile';

export default {
  name: 'app',

  data() {
    return {
      isMobile: {
        type: Boolean,
        default: false,
      },
    };
  },

  components: {
    Notification,
    DisableViewSection,
  },
  mounted() {
    this.isMobile = isMobile();
  },
};
</script>
<style lang="scss">
#app {
  height: 100vh;
}
</style>
