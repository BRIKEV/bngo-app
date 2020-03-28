<template>
  <div class="dashboard">
    <h1>{{ $t('dashboard.title') }}</h1>
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
      imageUrl: 'https://i.pinimg.com/originals/90/9d/d6/909dd61d3ea0213e274610c7e658c769.png',
    };
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  height: 100vh;
  width: 95%;
  margin: 0 auto;
}
.content {
  display: flex;
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
    margin: 0 auto;
    width: 30%;
    .Wheel {
      height: 300px;
      width: 360px;
      margin: 0 auto;
    }
    .boardContainer {
      height: 50%;
    }
  }
}
</style>
