<template>
  <VueNotification
    class="notify"
    :group="group"
    :position="position"
    :width="width"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'Notification',
  props: {
    group: VueTypes.string,
    position: VueTypes.string,
    width: VueTypes.string,
  },
};
</script>

<style lang="scss" scoped>
.notify {
  line-height: 1.5;
  margin-top: 5px;
  padding: 10px;
  margin: 0 5px 5px;
  width: 500px;
  &::v-deep .vue-notification-template.vue-notification.error {
    font-size: 1rem;
  }
}
</style>
