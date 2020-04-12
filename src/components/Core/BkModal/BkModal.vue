<template>
  <transition name="modal">
    <div class="modalMask">
      <div class="modalWrapper">
        <div class="modalContainer">
          <div class="modalBody">
            <slot name="body" />
          </div>
          <div class="modalFooter">
            <slot name="footer">
              <button
                class="modalDefaultButton"
                @click="$emit('close')"
              >
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BkModal',
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";
$shadow: calculateRem(-1px) calculateRem(0px) calculateRem(7px) calculateRem(-4px) rgba(0,0,0,0.98);

.modalMask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modalWrapper {
  display: table-cell;
  vertical-align: middle;
}

.modalContainer {
  width: calculateRem(300px);
  margin: 0 auto;
  padding: calculateRem(20px) calculateRem(30px);
  background-color: #fff;
  border-radius: calculateRem(2px);
  box-shadow: $shadow;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modalBody {
  margin: calculateRem(20px) 0;
}

.modalDefaultButton {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modalContainer,
.modal-leave-active .modalContainer {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
