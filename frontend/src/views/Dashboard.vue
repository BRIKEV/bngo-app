<template>
  <div class="dashboard">
    <h1 class="gameTitle">
      {{ $t('dashboard.title') }}
    </h1>
    <div class="content">
      <div class="outputImagesContainer">
        <Board
          class="outputImages"
          :numOfColumns="7"
          :numOfRows="7"
          :images="images"
          />
      </div>
        <div class="Info">
          <Wheel
            class="Wheel"
            :images="images"
          />
          <div class="boardContainer">
            <Board
              class="Board"
              :numOfColumns="4"
              :numOfRows="4"
              :images="images.slice(0, 16)"
            />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Board, Wheel } from '@/components';
import { BOARD } from '@/api/mock';

export default {
  name: 'Dashboard',
  components: {
    Board,
    Wheel,
  },
  data() {
    return {
      images: BOARD,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.dashboard {
  background: lighten($lightGray, 15%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  .gameTitle {
    font-family: $base-font-title;
    font-size: $fs-h1;
  }
}
.content {
  display: flex;
  justify-content: space-around;
  .outputImagesContainer {
    width: 60%;
    height: 75vh;
    .outputImages {
      width: 100%;
    }
  }
  .Info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30%;
    .Wheel {
      height: calculateRem(300px);
      width: calculateRem(360px);
      margin: 0 auto;
    }
    .boardContainer {
      height: 50%;
    }
  }
}
</style>
