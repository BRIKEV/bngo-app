import Vue from 'vue';
import actions from './notificationsActions';

jest.mock('vue', () => ({
  notify: jest.fn(),
}));

const NOTIFICATION_TYPES = {
  success: 'success',
  error: 'error',
};

const NOTIFICATION_ACTIONS = {
  success: 'sendSuccess',
  error: 'sendError',
};

describe('Notifications actions', () => {
  const context = {};
  const notification = {
    title: 'Title',
    text: 'Text',
    duration: 3000,
    group: 'notify',
  };

  beforeEach(() => {
    Vue.notify.mockClear();
  });

  Object.keys(NOTIFICATION_TYPES).forEach((type) => {
    it(`Send ${type} notification correctly`, async () => {
      actions[NOTIFICATION_ACTIONS[type]](context, notification);
      expect(Vue.notify).toHaveBeenCalledWith({
        ...notification,
        type: NOTIFICATION_TYPES[type],
      });
    });
  });
});
