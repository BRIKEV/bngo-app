<template>
  <VueNotification
    class="notify custom"
    :group="group"
    :position="position"
    :width="width"
  >
  </VueNotification>
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
@import "@/theme/index.scss";

  .notify {
    line-height: 1.5;
    margin-top: calculateRem(5px);
    padding: calculateRem(10px);
    margin: 0 calculateRem(5px) calculateRem(5px);
    &::v-deep .vue-notification-template.vue-notification.error {
      font-size: 1rem;
    }
    &::v-deep .error,
    &::v-deep .success,
    &::v-deep .info {
      width: calculateRem(500px);
    }
  }
  .custom {
    margin-bottom: calculateRem(50px);
    &::v-deep  .message {
      background: $secundary;
      border-left: none;
      margin: calculateRem(5px) 0;
      width: min-content;
      padding: calculateRem(10px) calculateRem(20px) calculateRem(10px) calculateRem(5px);
      .notification-title {
        display: flex;
        align-items: center;
        .icon {
          padding-right: calculateRem(3px);
        }
      }
      .notification-content {
        padding-left: calculateRem(10px);
      }
    }
  }
</style>
