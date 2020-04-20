<template>
  <div class="chatContainer">
    <form
      autocomplete="off"
      class="form"
      @submit.prevent="onSubmit"
    >
      <textarea
        v-model="message"
        :placeholder="$t('chatSection.placeholder', { maxLengthMessage })"
        :maxlength="maxLength"
      />
      <input
        v-model="message"
        class="input"
        type="text"
        :placeholder="$t('chatSection.placeholder', { maxLengthMessage })"
      />
      <BkButton class="btn">
        <span class="material-icons">
          send
        </span>
      </BkButton>
    </form>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { emit } from '@/io';

export default {
  name: 'ChatSection',
  props: {
    maxLength: VueTypes.number.def(150),
  },
  data() {
    return {
      message: '',
    };
  },
  computed: {
    trimMessage() {
      return this.message.trim();
    },
    maxLengthMessage() {
      return this.maxLength - this.trimMessage.length;
    },
  },
  methods: {
    onSubmit() {
      if (this.trimMessage !== '') {
        emit('message', { message: this.trimMessage });
        this.message = '';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.chatContainer {
  width: 100%;
  margin: calculateRem(16px) 0;
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    textarea {
      resize: none;
      width: 100%;
      padding: calculateRem(10px);
      font-size: $fs-small;
      line-height: $base-line-height;
      height: calculateRem(23px);
      border: calculateRem(1px) solid $lightGray;
      border-radius: calculateRem(5px);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      @include desktop {
        display: none;
      }
    }
    .input {
      display: none;
      @include desktop {
        width: 100%;
        display: block;
        height: calculateRem(41px);
        font-family: $base-font-family;
        border-top-left-radius: calculateRem(8px);
        border-bottom-left-radius: calculateRem(8px);
        border: calculateRem(1px) solid $lightGray;
        padding-left: calculateRem(8px);
      }
    }
    .btn {
      display: flex;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      &::v-deep .content {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
