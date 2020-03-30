import Vue from 'vue';

const NOTIFICATION_TYPES = {
  success: 'success',
  error: 'error',
};

export default {
  async sendSuccess(context, { title = '', text = '' }) {
    Vue.notify({
      group: 'notify',
      title,
      text,
      duration: 3000,
      type: NOTIFICATION_TYPES.success,
    });
  },
  async sendError(context, { title = '', text = '' }) {
    Vue.notify({
      group: 'notify',
      title,
      text,
      duration: 3000,
      type: NOTIFICATION_TYPES.error,
    });
  },
};
