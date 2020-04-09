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
      <p class="infoMsg">{{ user.ready ? 'READY' : 'NOT READY' }}</p>
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
    })),
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
  .infoMsg {
    font-family: $base-secondary-font;
    font-size: calc(#{$fs-small} - #{calculateRem(3px)});
    font-weight: $light;
  }
}
</style>
