<template>
  <div
    class="topicCard"
    :style="{ background: bgColor }"
  >
    <div class="infoTopic">
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </div>
    <div class="imgContainer">
      <img class="image" :src="image" />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'TopicCard',
  props: {
    title: VueTypes.string.isRequired,
    description: VueTypes.string,
    image: VueTypes.string,
    bgColor: VueTypes.string.def('#FFF'),
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$boxShadowTopic: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
  0px 1px 5px 0px rgba(0, 0, 0, 0.12);
$backgroundWithHover: #d2c6b2 !important;

.topicCard {
  min-width: 342px;
  max-width: 342px;
  height: 150px;
  border-radius: calculateRem(24px) calculateRem(4px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  box-shadow: $boxShadowTopic;
  color: #f4f4f4;
  &:hover {
    cursor: pointer;
    background: $backgroundWithHover;
    color: $dark;
    transition: background 1s;
  }
  .imgContainer {
    width: 35%;
    height: 100%;
    .image {
      width: 100%;
      height: 100%;
      border-radius: 0 0 calculateRem(24px) 0;
    }
  }
  .infoTopic {
    max-width: 180px;
    .title {
      padding-bottom: calculateRem(10px);
      font-size: $fs-h4;
      font-family: $base-font-title;
    }
    .description {
      font-size: $fs-medium;
      font-family: $base-secondary-font;
      font-weight: 300;
    }
  }
}
</style>
