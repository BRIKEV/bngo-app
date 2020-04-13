<template>
  <BkForm
    class="accessGameForm"
    hasHeader
    :title="$t('joinGame.title')"
    @onIconClicked="$emit('onIconClicked')"
  >
    <BkInput
      v-model="username"
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
      type="text"
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
  </BkForm>
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators';

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

.accessGameForm {
  width: 80%;
  @include tablet {
    width: 30%;
  }
}
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
