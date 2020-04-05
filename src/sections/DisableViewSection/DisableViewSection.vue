<template>
  <div class="disableContainer">
    <div class="modal">
      <div class="header">
        <span class="material-icons">
          build
        </span>
        <h1>{{ $t('disableView.title') }}</h1>
      </div>
      <div class="content">
        <p>{{ $t('disableView.description') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisableViewSection',
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
.disableContainer {
  display: none;
  @include mobile {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $gradientColor;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal {
      background-color: $lightGray;
      width: 75%;
      border-radius: calculateRem(20px);
      padding: calculateRem(30px) calculateRem(20px);
      text-align: center;
      .header {
        font-size: $fs-h1;
        margin-bottom: calculateRem(20px);
        display: flex;
        flex-direction: column;
        font-weight: 700;
        text-align: center;
        span {
          font-size: calculateRem(70px);
          margin-bottom: calculateRem(30px);
        }
      }
      .content {
        font-size: $fs-base;
        line-height: $base-line-height;
      }
    }
  }
}
</style>
