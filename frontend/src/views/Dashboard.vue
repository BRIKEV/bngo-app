<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <Board />
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
