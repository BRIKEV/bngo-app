<template>
  <div class="input-container">
    <input
      :data-cy="dataCy"
      :value="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      required
      :class="color"
      @input="$emit('input', $event.target.value)"
    />
    <label :for="id" :class="color">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'BkInput',
  props: {
    dataCy: String,
    value: String,
    name: String,
    type: String,
    label: String,
    placeholder: String,
    required: Boolean,
    color: String,
    id: String,
  },
};
</script>
<style lang="scss" scoped>
  @import "@/theme/index.scss";
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    position: relative;
    margin: calculateRem(30px) 0;
    input {
      font-size: $fs-small;
      border: none;
      width: 100%;
      outline: none;
      background: none;
      height: calculateRem(50px);
      &:active ~label,
      &:focus ~label,
      &:valid ~label {
        bottom: calculateRem(50px);
      }
      &.primary {
        color: $brand;
        border-bottom: calculateRem(2px) solid $white;
      }
      &.secundary {
        color: black;
        border-bottom: calculateRem(2px) solid black;
      }
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        background-color: transparent;
      }
      &:focus::placeholder {
        color:transparent;
      }
      &::placeholder {
        text-align: right;
      }
    }
    label {
      color: $white;
      bottom: calculateRem(12px);
      position: absolute;
      font-size: $fs-large;
      font-weight: 700;
      transition: all .3s ease;
      &.primary {
        color: $white;
      }
      &.secundary {
        color: black;
      }
    }
  }
</style>
