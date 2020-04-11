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
    <h2 class="typesTitle">
      {{ $t('joinGame.createGameSection.typesTitle') }}
    </h2>
    <Carrousel class="carrousel">
      <template #items>
        <TopicCard
          v-for="(topic, index) in topics"
          :key="index"
          :title="topic.title"
          :description="topic.description"
          :image="topic.image"
          :bgColor="topic.bgColor"
          @input="onChange"
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
import { mapState } from 'vuex';

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
      checkedNames: [],
    };
  },
  computed: {
    ...mapState({
      topics: (state) => state.bgno.gameTypes,
    }),
    invalid() {
      return !this.gameKey || !this.roomName || this.checkedNames.length === 0;
    },
  },
  methods: {
    onChange(value, checked) {
      if (checked) {
        this.checkedNames = [...this.checkedNames, value];
      } else {
        this.checkedNames = this.checkedNames.filter((checkedName) => checkedName !== value);
      }
    },
    handleCreateClick() {
      this.$emit('onCreateClick', {
        roomName: this.roomName,
        gameKey: this.gameKey,
        types: this.checkedNames,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.createGameForm {
  width: 60%;
  &::v-deep .description {
    overflow: hidden;
  }
  .carrousel {
    margin-bottom: 20px;
  }
  .typesTitle {
    text-align: left;
    padding: calculateRem(10px) 0 calculateRem(5px) 0;
    font-size: $fs-large;
    line-height: $base-line-height;
  }
}
</style>
