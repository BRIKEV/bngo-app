<template>
  <ol class="usersList">
    <li
      class="user"
      v-for="(user, index) in users"
      :key="index"
    >
      <div class="userState">
        <div
          class="state"
          :class="{ ready: user.ready }"
        />
        <p class="userName">{{ user.username }}</p>
      </div>
      <p class="infoMsg">{{ user.ready ? userReadyMsg : userNotReadyMsg }}</p>
      <span
        class="material-icons removeIcon"
        v-if="host && !user.ready && !user.host"
        @click="handleIconClick(user.username)"
      >
        delete_forever
      </span>
    </li>
  </ol>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'UsersList',
  props: {
    users: VueTypes.arrayOf(VueTypes.shape({
      username: VueTypes.string.isRequired,
      ready: VueTypes.bool.def(false),
      host: VueTypes.bool.def(false),
    })),
    userReadyMsg: VueTypes.string.isRequired,
    userNotReadyMsg: VueTypes.string.isRequired,
    host: VueTypes.bool,
  },
  methods: {
    handleIconClick(username) {
      this.$emit('onRemoveClick', username);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.usersList {
  list-style: none;
}
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: $base-line-height-secundary;
  .userState {
    display: flex;
    align-items: center;
    .state {
      width: calculateRem(15px);
      height: calculateRem(15px);
      border-radius: 50%;
      background-color: $warning;
    }
    .ready {
      background: $brand;
    }
    .userName {
      margin-left: calculateRem(5px);
      font-family: $base-secondary-font;
      font-size: $fs-medium;
      font-weight: $regular;
    }
  }
  .removeIcon {
    color: $disabled;
    cursor: pointer;
  }
  .infoMsg {
    font-family: $base-secondary-font;
    font-size: calc(#{$fs-small} - #{calculateRem(3px)});
    font-weight: $light;
  }
}
</style>
