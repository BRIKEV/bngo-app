<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <Board
      :numOfColumns="4"
      :numOfRows="4"
      :images="images"
      />
  </div>
</template>

<script>
import { Board } from '@/components';
import mock from '../components/Board/mock';

export default {
  name: 'Dashboard',
  components: {
    Board,
  },
  data() {
    return {
      images: mock,
    };
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  height: 100vh;
}
</style>
