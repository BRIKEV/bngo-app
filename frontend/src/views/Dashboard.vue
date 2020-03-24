<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <Board
      :numOfColumns="4"
      :numOfRows="4"
      />
  </div>
</template>

<script>
import { Board } from '@/components';

export default {
  name: 'Dashboard',
  components: {
    Board,
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  height: 100vh;
}
</style>
