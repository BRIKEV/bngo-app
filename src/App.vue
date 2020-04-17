<template>
  <div>
    <div
      id="app"
    >
      <Notification group="notify" position="bottom left" width="400px" />
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
</div>
</template>

<script>
import { Notification } from '@/components';

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
  },
};
</script>
<style lang="scss">
@import "@/theme/index.scss";

#app {
  height: 100vh;
  @include keyboard {
    height: 100%;
  }
}
</style>
