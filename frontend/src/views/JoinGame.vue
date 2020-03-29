<template>
  <div class="about">
    <BkForm title="ENTOURAGE BINGO">
      <transition name="fade" mode="out-in">
        <template v-if="!log && !create">
          <JoinGameSection
            @onAccess="log = true"
            @onCreateRoom="create = true"
          />
        </template>
        <template v-if="log">
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
      log: false,
      create: false,
    };
  },
  methods: {
    handleCreateClick() {
      console.log('Create');
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

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
