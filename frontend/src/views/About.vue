<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Wheel />
  </div>
</template>

<script>
import { Wheel } from '@/components';

export default {
  name: 'Dashboard',
  components: {
    Wheel,
  },
};
</script>
