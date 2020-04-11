<template>
  <div class="Carrousel">
    <slot name="items" />
  </div>
</template>

<script>

export default {
  name: 'Carrousel',
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$boxShadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

.Carrousel {
  display: flex;
  width: 100%;
  overflow-x: auto;
  background: none;
  > div + div {
    margin: 0 calculateRem(10px);
  }
}
</style>
