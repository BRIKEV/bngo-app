<template>
  <div class="shareGame">
    <AccessGameForm
      @onAccessClick="handleAccessClick"
      @onIconClicked="handleIconClick"
    />
  </div>
</template>

<script>
import { AccessGameForm } from '@/sections';
import { joinGame } from '@/api';
import { setAccess } from '@/persistence/access';
import { NOTIFICATION_ACCESS } from '@/store/notification/notificationTypes';
import { mapActions } from 'vuex';

export default {
  name: 'ShareGame',
  components: {
    AccessGameForm,
  },
  methods: {
    ...mapActions({
      sendError: 'sendError',
    }),
    handleIconClick() {
      this.$router.push({ name: 'JoinGame' });
    },
    handleAccessClick({ username, roomName, gameKey }) {
      this.$ga.event({
        eventCategory: 'access',
        eventAction: 'accessBySharedLink',
        eventLabel: `The username ${username} accessed the ${roomName} room by shared link`,
      });
      const accessInfo = { gameKey, username, gameName: roomName };
      return joinGame(accessInfo)
        .then(({ data }) => {
          setAccess(data.accessKey);
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(() => this.sendError({
          title: NOTIFICATION_ACCESS.error.title,
          text: NOTIFICATION_ACCESS.error.text,
        }));
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.shareGame {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(2,0,36);
  background: $gradientColor;
  @include keyboard {
    height: 100%;
  }
}
</style>
