<template>
  <div class="joinGameForm">
    <h1 class="title">ENTOURAGE BINGO</h1>
    <div class="btns">
      <BkButton
          class="accessBtn"
          @btn-clicked="handleAccessClick"
      >
          Accede
      </BkButton>
      <BkButton
          class="createBtn"
          @btn-clicked="handleCreateClick"
      >
          Crea
      </BkButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinGameForm',
  methods: {
    handleAccessClick() {
      this.$emit('onAccess');
    },
    handleCreateClick() {
      this.$emit('onCreate');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";

.joinGameForm {
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
margin: 0 auto;
width: 30%;
height: 40vh;
background: rgb(203, 207, 204);
border-radius: calculateRem(30px);
}
.title {
  margin-bottom: calculateRem(80px);
  font-size: $fs-h1;
  font-family: $base-font-title;
}
.accessBtn {
  margin-right: calculateRem(15px);
  font-size: $fs-h3;
  font-weight: $regular;
}
.createBtn {
  font-size: $fs-h3;
  font-weight: $regular;
}
</style>
