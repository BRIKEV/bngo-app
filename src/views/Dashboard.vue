<template>
  <div class="dashboard">
    <BkHeader :title="$t('dashboard.title')" />
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
import { getInfo } from '@/persistence/access';
import io from '@/io';
import { mapActions } from 'vuex';

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
  mounted() {
    io({
      newUser: console.log,
      yourBoard: this.userBoard,
      userReady: console.log,
      gameReady: console.log,
    },
    getInfo());
  },
  methods: {
    ...mapActions(['userBoard']),
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
  height: 100%;
  margin-top: calculateRem(75px);
  margin-bottom: calculateRem(25px);
  .outputImagesContainer {
    width: 60%;
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
      height: calculateRem(250px);
      width: calculateRem(310px);
      margin: 0 auto;
    }
    .boardContainer {
      height: 50%;
    }
  }
}
</style>
