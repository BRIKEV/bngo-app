<template>
  <div class="chatContainer">
    <div class="title">Envia un mensaje</div>
    <form
      autocomplete="off"
      class="form"
      @submit.prevent
    >
      <textarea
        v-model="message"
        placeholder="add multiple lines"
      ></textarea>
      <BkButton
        class="btn"
      >
        {{ $t('joinGame.accessGameSection.btnAccess') }}
      </BkButton>
    </form>
  </div>
</template>

<script>
// import { emit } from '@/io';

export default {
  name: 'ChatSection',

};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.chatContainer {
  width: 100%;
  margin: calculateRem(40px) 0;
  margin-bottom: calculateRem(10px);
  .title {
    color: $brand;
    margin: calculateRem(10px) 0;
  }
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    textarea {
      width: 100%;
      padding: 5px;
      height: 33px;
      border: 1px solid $lightGray;
      border-radius: calculateRem(5px);
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .btn {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
}
</style>
