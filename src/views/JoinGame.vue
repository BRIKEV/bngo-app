<template>
  <div class="about">
    <transition name="fade" mode="out-in">
      <JoinGameSection
        v-if="!access && !create"
        @onAccess="access = true"
        @onCreateRoom="create = true"
      />
      <AccessGameForm
        v-if="access"
        @onAccessClick="handleAccessClick"
        @onIconClicked="handleIconClick"
      />
      <CreateGameForm
        v-if="create"
        @onCreateClick="handleCreateClick"
        @onIconClicked="handleIconClick"
      />
    </transition>
  </div>
</template>

<script>
import { JoinGameSection, AccessGameForm, CreateGameForm } from '@/sections';
import { createGame, joinAgame } from '@/api';
import { setAccess } from '@/persistence/access';
import { NOTIFICATION_CREATE, NOTIFICATION_ACCESS } from '@/store/notification/notificationTypes';
import { mapActions } from 'vuex';

export default {
  name: 'JoinGame',
  components: {
    JoinGameSection,
    AccessGameForm,
    CreateGameForm,
  },
  data() {
    return {
      access: false,
      create: false,
    };
  },
  methods: {
    ...mapActions({
      sendError: 'sendError',
    }),
    handleIconClick() {
      this.create = false;
      this.access = false;
    },
    handleCreateClick({ roomName, gameKey, types }) {
      this.$ga.event({
        eventCategory: 'create',
        eventAction: 'createClick',
        eventLabel: 'Click on create game button',
      });
      return createGame({ gameKey, gameName: roomName, types })
        .then(() => {
          this.create = false;
          this.icon = false;
        })
        .catch(() => this.sendError({
          title: NOTIFICATION_CREATE.error.title,
          text: NOTIFICATION_CREATE.error.text,
        }));
    },
    handleAccessClick({ username, roomName, gameKey }) {
      this.$ga.event({
        eventCategory: 'access',
        eventAction: 'accessClick',
        eventLabel: 'Click on access game button',
      });
      const accessInfo = { gameKey, username, gameName: roomName };
      return joinAgame(accessInfo)
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

.about {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(2,0,36);
  background: $gradientColor;
}
</style>
