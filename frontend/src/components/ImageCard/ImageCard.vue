<template>
  <div class="imageCard">
    <img class="image" :src="imageUrl" alt="" />
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ImageCard',
  props: {
    imageUrl: VueTypes.string.isRequired,
  },
};
</script>
<style lang="scss" scoped>
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
.imageCard {
  height: 300px;
  width: 300px;
}
.image {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  box-shadow: $boxShadow;
}
</style>
