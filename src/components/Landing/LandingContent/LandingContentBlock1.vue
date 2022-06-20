<template>
  <section class="block1">
    <div>
      <h1 class="title">Программирование в общении. Просто. Удобно.</h1>
      <div class="buttons">
        <LandingButton :inversion="true" text="О нас" />
        <LandingButton text="Скачать" />
      </div>
    </div>
    <img :src="illustration1" alt="Картинка" />
  </section>
</template>

<script lang="ts" setup>
import illustration1 from '@/assets/images/illustration1.svg'
import LandingButton from '@/components/Landing/LandingButton.vue'
</script>

<style lang="scss" scoped>
.block1 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 58px 231px 58px;

  @media all and (max-width: 1010px) {
    justify-content: center;
    margin: 0 58px 150px 58px;

    > div {
      margin: 0 0 20px 0;
    }
  }

  @media all and (max-width: 768px) {
    margin: 0 20px 50px 20px;
  }

  @media all and (max-width: 400px) {
    margin: 0 0 20px 0;
  }
}

.title {
  font-size: 48px;
  max-width: 450px;
  line-height: 62.4px;
  margin: 0 0 48px 0;

  @media all and (max-width: 768px) {
    font-size: 30px;
    line-height: 1.2;
    margin: 0 0 20px 0;
  }

  @media all and (max-width: 400px) {
    font-size: 25px;
  }
}

.buttons {
  display: flex;

  > button:first-of-type {
    margin: 0 40px 0 0;
  }
}
</style>
