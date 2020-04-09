<template>
  <div class="createGameForm">
    <BkInput
      v-model="username"
      slot="optional"
      id="username"
      name="username"
      type="text"
      required
      color="secundary"
      :label="$t('joinGame.createGameSection.usernamelabel')"
    />
    <div
      class="error"
      v-if="!$v.username.maxLength"
    >
      <span class="material-icons">warning</span>
      <p class="errorText">{{ $t('validations.usernameLength') }}</p>
    </div>
    <BkInput
      v-model="roomName"
      id="roomName"
      name="roomName"
      type="text"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.nameLabel')"
    />
    <BkInput
      v-model="gameKey"
      id="password"
      name="gameKey"
      type="password"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.passwordLabel')"
    />
    <BkButton
      class="btn"
      :disabled="invalid"
      @btn-clicked="handleAccessClick"
    >
      {{ $t('joinGame.accessGameSection.btnAccess') }}
    </BkButton>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'AccessGameForm',
  data() {
    return {
      gameKey: undefined,
      roomName: undefined,
      username: undefined,
    };
  },
  validations() {
    return {
      username: {
        required,
        maxLength: maxLength(10),
      },
    };
  },
  computed: {
    invalid() {
      return !this.gameKey || !this.roomName || !this.username || this.$v.$invalid;
    },
  },
  methods: {
    handleAccessClick() {
      this.$emit('onAccessClick', {
        username: this.username,
        roomName: this.roomName,
        gameKey: this.gameKey,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.error {
  display: flex;
  align-items: center;
  color: $error;
  .errorText {
    font-weight: $regular;
    text-align: left;
    font-size: $fs-small;
    width: 100%;
    padding-left: calculateRem(5px);
  }
}
</style>
