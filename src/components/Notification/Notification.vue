<template>
  <VueNotification
    class="notify"
    :group="group"
    :position="position"
    :width="width"
  />
</template>

<script>
export default {
  name: 'Notification',
  props: {
    group: String,
    position: String,
    width: String,
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
