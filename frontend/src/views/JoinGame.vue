<template>
  <div class="about">
    <JoinGameFormSection />
  </div>
</template>

<script>
import { JoinGameFormSection } from '@/sections';

export default {
  name: 'JoinGame',
  components: {
    JoinGameFormSection,
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$gradientColor: linear-gradient(90deg, rgb(108, 173, 125) 0%,
  rgb(52, 134, 89) 35%, rgb(108, 173, 125) 100%);

.about {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(2,0,36);
  background: $gradientColor;
}
</style>
