<template>
  <div>
    <input
      :id="title"
      :name="title"
      :value="title"
      type="checkbox"
      @input="$emit('input', $event.target.value, $event.target.checked)"
    />
    <label
      :for="title"
      class="topicCard"
    >
      <div class="infoTopic">
        <h1 class="title">{{ title }}</h1>
        <p class="description">{{ description }}</p>
      </div>
    </label>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'TopicCard',
  props: {
    title: VueTypes.string.isRequired,
    description: VueTypes.string,
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$boxShadowTopic: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
  0px 1px 5px 0px rgba(0, 0, 0, 0.12);
$textColor: #f4f4f4;

input {
  visibility: hidden;
  &:checked + .topicCard {
    transform: translateY(-10px);
    background: $selected;
  }
}
.topicCard {
  background: $brand;
  min-width: calculateRem(200px);
  max-width: calculateRem(200px);
  min-height: calculateRem(74px);
  border-radius: calculateRem(24px) calculateRem(4px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: calculateRem(15px);
  box-shadow: $boxShadowTopic;
  color: $textColor;
  margin-bottom: calculateRem(15px);
  text-align: left;
  transition: all 0.3s ease-in-out;
  .infoTopic {
    .title {
      padding-bottom: calculateRem(10px);
      font-size: $fs-h4;
      font-family: $base-font-title;
    }
    .description {
      font-size: $fs-medium;
      font-family: $base-secondary-font;
      font-weight: 300;
      line-height: 1.2;
    }
  }
}
</style>
