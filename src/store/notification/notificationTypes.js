import i18n from '@/lang/i18n';

export const NOTIFICATION_CREATE = {
  error: {
    title: i18n.t('notification.titleError'),
    text: i18n.t('notification.createGameError'),
  },
};

export const NOTIFICATION_ACCESS = (status) => ({
  title: i18n.t('notification.titleError'),
  text: i18n.t(`notification.accessGameError${status}`),
});

export const NOTIFICATION_BINGO = {
  error: {
    title: i18n.t('notification.titleError'),
    text: i18n.t('notification.errorBingo'),
  },
};

export const NOTIFICATION_COPY_LINK = {
  success: {
    title: i18n.t('notification.linkCopied'),
  },
};

export const NOTIFICATION_USER_LEAVES = ({ username } = {}) => ({
  text: i18n.t('notification.userLeaves', { username }),
});
