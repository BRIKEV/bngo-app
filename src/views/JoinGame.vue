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
        :url="url"
        @onCreateClick="handleCreateClick"
        @onIconClicked="handleIconClick"
      />
    </transition>
  </div>
</template>

<script>
import { JoinGameSection, AccessGameForm, CreateGameForm } from '@/sections';
import { createGame, joinGame } from '@/api';
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
      url: '',
    };
  },
  mounted() {
    this.getGameTypes();
  },
  methods: {
    ...mapActions({
      sendError: 'sendError',
      getGameTypes: 'gameTypes',
    }),
    handleIconClick() {
      this.create = false;
      this.access = false;
      this.url = '';
    },
    handleCreateClick({ roomName, gameKey, types }) {
      this.$ga.event({
        eventCategory: 'create',
        eventAction: 'createClick',
        eventLabel: `Create game with roomname ${roomName} and tpye: ${types.join(', ')}`,
      });
      return createGame({ gameKey, gameName: roomName, types })
        .then(() => {
          this.url = `https://www.mybngo.com/room/${roomName}`;
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
        eventLabel: `The username ${username} accessed the ${roomName} room`,
      });
      const accessInfo = { gameKey, username, gameName: roomName };
      return joinGame(accessInfo)
        .then(({ data }) => {
          setAccess(data.accessKey);
          this.$router.push({ name: 'Dashboard' });
        })
        .catch((error) => this.sendError(NOTIFICATION_ACCESS(error.response.status)));
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.about {
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
