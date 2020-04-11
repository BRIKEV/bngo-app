<template>
  <BkForm
    class="createGameForm"
    hasHeader
    :title="$t('joinGame.title')"
    @onIconClicked="$emit('onIconClicked')"
  >
    <BkInput
      v-model="roomName"
      id="roomName"
      name="roomName"
      type="text"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.nameLabel')"
    />
    <BkInput
      v-model="gameKey"
      id="password"
      name="gameKey"
      type="password"
      required
      color="secundary"
      :label="$t('joinGame.accessGameSection.passwordLabel')"
    />
    <Carrousel class="carrousel">
      <template #items>
        <TopicCard
          v-for="(topic, index) in topics"
          :key="index"
          :title="topic.title"
          :description="topic.description"
          :image="topic.image"
          :bgColor="topic.bgColor"
        />
      </template>
    </Carrousel>
    <BkButton
      class="btn"
      :disabled="invalid"
      @btn-clicked="handleCreateClick"
    >
      {{ $t('joinGame.createGameSection.btnCreate') }}
    </BkButton>
  </BkForm>
</template>

<script>
import { Carrousel, TopicCard } from '@/components';
import mock from './mockTopics';

export default {
  name: 'CreateGameForm',
  components: {
    Carrousel,
    TopicCard,
  },
  data() {
    return {
      roomName: undefined,
      gameKey: undefined,
      topics: mock,
    };
  },
  computed: {
    invalid() {
      return !this.gameKey || !this.roomName;
    },
  },
  methods: {
    handleCreateClick() {
      this.$emit('onCreateClick', {
        roomName: this.roomName,
        gameKey: this.gameKey,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.createGameForm {
  width: 60%;
  &::v-deep .description {
    overflow: hidden;
  }
  .carrousel {
    margin-bottom: 20px;
  }
}
</style>
