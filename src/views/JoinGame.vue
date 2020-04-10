<template>
  <div class="about">
    <BkForm
      :title="$t('joinGame.title')"
      :hasHeader="icon"
      @onIconClicked="handleReturnClick"
    >
      <transition name="fade" mode="out-in">
        <template v-if="!access && !create">
          <JoinGameSection
            @onAccess="goToAccessForm"
            @onCreateRoom="goToCreateForm"
          />
        </template>
        <template v-if="access">
          <AccessGameForm
            class="createGameSection"
            @onAccessClick="handleAccessClick"
          />
        </template>
        <template v-if="create">
          <CreateGameForm
            class="createGameSection"
            @onCreateClick="handleCreateClick"
          />
        </template>
      </transition>
    </BkForm>
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
      icon: false,
    };
  },
  methods: {
    ...mapActions(['sendError']),
    goToAccessForm() {
      this.access = true;
      this.icon = true;
    },
    goToCreateForm() {
      this.create = true;
      this.icon = true;
    },
    handleReturnClick() {
      this.icon = false;
      this.create = false;
      this.access = false;
    },
    handleCreateClick({ roomName, gameKey }) {
      this.$ga.event({
        eventCategory: 'create',
        eventAction: 'createClick',
        eventLabel: 'Click on create game button',
      });
      return createGame({ gameKey, gameName: roomName })
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
.createGameSection {
  width: 90%;
  margin: 0 auto;
}
.btn {
  width: 100%;
}
</style>
