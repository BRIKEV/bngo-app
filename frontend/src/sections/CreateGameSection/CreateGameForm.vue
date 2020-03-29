<template>
  <div class="createGameForm">
    <AccessGameForm class="createGameSection">
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
    </AccessGameForm>
    <slot name="optional" />
  </div>
</template>

<script>
import { AccessGameForm } from '../index';

export default {
  name: 'CreateGameForm',
  components: {
    AccessGameForm,
  },
  data() {
    return {
      username: undefined,
    };
  },
};
</script>
