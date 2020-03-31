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
            @onAccess="handleAccessRoom"
            @onCreateRoom="handleCreateRoom"
          />
        </template>
        <template v-if="access">
          <AccessGameForm
            class="createGameSection"
            @onAccessUsernameChanged="handleUsernameChange"
            @onAccessRoomNameChanged="handleRoomNameChange"
            @onAccessPasswordChanged="handlePasswordChange"
          >
            <BkButton
              class="btn"
              slot="optional"
              :disabled="!gameName || !gameKey || !username"
              @btn-clicked="handleAccessClick"
            >
              {{ $t('joinGame.accessGameSection.btnAccess') }}
            </BkButton>
          </AccessGameForm>
        </template>
        <template v-if="create">
          <CreateGameForm
            class="createGameSection"
            @onCreateRoomNameChanged="handleRoomNameChange"
            @onCreatePasswordChanged="handlePasswordChange"
          >
            <BkButton
              class="btn"
              slot="optional"
              :disabled="!gameName || !gameKey"
              @btn-clicked="handleCreateClick"
            >
              {{ $t('joinGame.createGameSection.btnCreate') }}
            </BkButton>
          </CreateGameForm>
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
      username: undefined,
      gameKey: undefined,
      gameName: undefined,
    };
  },
  methods: {
    ...mapActions(['sendError']),
    handleRoomNameChange(roomName) {
      this.gameName = roomName;
    },
    handlePasswordChange(pass) {
      this.gameKey = pass;
    },
    handleUsernameChange(username) {
      this.username = username;
    },
    handleAccessRoom() {
      this.access = true;
      this.icon = true;
    },
    handleCreateRoom() {
      this.create = true;
      this.icon = true;
    },
    handleCreateClick() {
      return createGame({ gameKey: this.gameKey, gameName: this.gameName })
        .then(() => {
          this.create = false;
          this.icon = false;
        })
        .catch(() => this.sendError({
          title: NOTIFICATION_CREATE.error.title,
          text: NOTIFICATION_CREATE.error.text,
        }));
    },
    handleReturnClick() {
      this.icon = false;
      this.create = false;
      this.access = false;
    },
    handleAccessClick() {
      const accessInfo = {
        gameKey: this.gameKey, username: this.username, gameName: this.gameName,
      };
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
$gradientColor: linear-gradient(90deg, $secundary 0%,
  $brand 35%, $secundary 100%);

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
