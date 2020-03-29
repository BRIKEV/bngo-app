<template>
  <div class="about">
    <BkForm
      title="ENTOURAGE BINGO"
      :hasHeader="icon"
      @onIconClicked="handleReturnClick"
    >
      <transition name="fade" mode="out-in">
        <template v-if="!access && !create">
          <JoinGameSection
            @onAccess="handleAccessRoom"
            @onCreateRoom="handleCreateRoom"
          />
        </template>
        <template v-if="access">
          <AccessGameForm class="createGameSection">
            <BkButton
              class="btn"
              slot="optional"
              @btn-clicked="handleAccessClick"
            >
              Crea
            </BkButton>
          </AccessGameForm>
        </template>
        <template v-if="create">
          <CreateGameForm class="createGameSection">
            <BkButton
              class="btn"
              slot="optional"
              @btn-clicked="handleCreateClick"
            >
              Crea
            </BkButton>
          </CreateGameForm>
        </template>
      </transition>
    </BkForm>
  </div>
</template>

<script>
import { JoinGameSection, AccessGameForm, CreateGameForm } from '@/sections';

export default {
  name: 'JoinGame',
  components: {
    JoinGameSection,
    AccessGameForm,
    CreateGameForm,
  },
  data() {
    return {
      access: false,
      create: false,
      icon: false,
    };
  },
  methods: {
    handleAccessRoom() {
      this.access = true;
      this.icon = true;
    },
    handleCreateRoom() {
      this.create = true;
      this.icon = true;
    },
    handleCreateClick() {
      console.log('Create');
    },
    handleReturnClick() {
      this.icon = false;
      this.create = false;
      this.access = false;
    },
    handleAccessClick() {
      this.$router.push({ name: 'Dashboard' });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
$gradientColor: linear-gradient(90deg, rgb(108, 173, 125) 0%,
  rgb(52, 134, 89) 35%, rgb(108, 173, 125) 100%);

.about {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(2,0,36);
  background: $gradientColor;
}
.createGameSection {
  width: 90%;
  margin: 0 auto;
}
.btn {
  width: 100%;
}
</style>
