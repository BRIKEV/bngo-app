<template>
  <BkForm
    class="createGameForm"
    hasHeader
    :title="$t('joinGame.title')"
    @onIconClicked="$emit('onIconClicked')"
  >
    <div class="shareContainer" v-if="url">
      <p class="shareMessage">{{ $t('joinGame.createGameSection.shareMessage') }}</p>
      <div class="urlText">{{ url }}</div>
      <input
        ref="url"
        type="hidden"
        :value="url"
      />
      <BkButton
        class="btn shareButton"
        @btn-clicked="shareClick"
      >
        {{ $t('joinGame.createGameSection.shareButtonMobile') }}
      </BkButton>
      <BkButton
        class="btn copyButton"
        @btn-clicked="shareCopyClick"
      >
        {{ $t('joinGame.createGameSection.shareButtonDesktop') }}
      </BkButton>
    </div>
    <div v-if="!url">
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
        type="text"
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
            :value="topic"
            :title="$t(`joinGame.createGameSection.types.${topic}.title`)"
            :description="$t(`joinGame.createGameSection.types.${topic}.description`)"
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
    </div>
  </BkForm>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VueTypes from 'vue-types';
import { Carrousel, TopicCard } from '@/components';
import { NOTIFICATION_COPY_LINK } from '@/store/notification/notificationTypes';

export default {
  name: 'CreateGameForm',
  components: {
    Carrousel,
    TopicCard,
  },
  props: {
    url: VueTypes.string.def(''),
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
    ...mapActions(['sendInfo']),
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
    shareCopyClick() {
      this.$refs.url.setAttribute('type', 'text');
      this.$refs.url.select();
      document.execCommand('copy');
      // unselect the range
      this.$refs.url.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
      this.sendInfo(NOTIFICATION_COPY_LINK.success);
    },
    shareClick() {
      if (!navigator.share) {
        return this.shareCopyClick();
      }
      return navigator.share({
        title: this.$t('joinGame.createGameSection.shareTitle'),
        url: 'https://codepen.io/ayoisaiah/pen/YbNazJ',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.createGameForm {
  width: 100%;
  height: 100%;
  @include tablet {
    width: 60%;
    height: auto;
  }
  @include desktop {
    width: 40%;
  }
  &::v-deep .description {
    overflow: hidden;
  }
  .shareContainer {
    min-height: calc(100vh - 50vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .urlText {
      margin-bottom: calculateRem(40px);
      padding: 20px;
      width: 80%;
      background-color: $share;
      border-radius: 16px;
      text-overflow: ellipsis;
      overflow-x: hidden;
      box-shadow: none;
      border: none;
    }
    .shareMessage {
      margin-bottom: 20px;
      line-height: $base-line-height;
      font-size: $fs-large;
      width: calc(80% + 40px);
      text-align: left;
    }
    .shareButton {
      display: block;
      @include tablet {
        display: none;
      }
    }
    .copyButton {
      display: none;
      @include tablet {
        display: block;
      }
    }
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
