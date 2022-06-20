<template>
  <div class="block3">
    <div class="subscribeWrapper">
      <form class="subscribeContainer">
        <VText class="subscribeTitle" text="Подписывайтесь и будьте с нами!" font-size="25px" font-weight="500" />
        <fieldset class="subscribeInput">
          <input class="input" placeholder="Ваша электронная почта" name="email" type="email" v-model="email" />
          <LandingButton text="Подписаться" size="small" />
        </fieldset>
      </form>
    </div>
    <div class="illustrations">
      <img :src="congratulationIllustration" alt="Иллюстрация" />
      <img :src="congratulationIllustration" alt="Иллюстрация" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import congratulationIllustration from '@/assets/images/congratulationIllustration.svg'
import VText from '@/components/VText.vue'
import LandingButton from '@/components/Landing/LandingButton.vue'

const email = ref('')
</script>

<style lang="scss" scoped>
.block3 {
  margin: 0 0 127px 0;

  @media all and (max-width: 768px) {
    margin: 0 0 20px 0;
  }
}

.subscribeWrapper {
  display: flex;
  justify-content: center;
  margin: 0 0 70px 0;

  @media all and (max-width: 768px) {
    margin: 0 0 20px 0;
  }
}

.subscribeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
}

.subscribeTitle {
  margin: 0 0 92px 0;

  @media all and (max-width: 768px) {
    margin: 0 0 10px 0;
  }
}

.subscribeInput {
  display: flex;
  width: 100%;
  border: none;

  > button {
    max-width: 154px;
  }

  @media all and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.input {
  width: 100%;
  margin: 0 24px 0 0;
  border-radius: 4px;
  border: none;
  min-height: 52px;
  padding: 0 0 0 16px;
  background: #d7dadd;
  color: black;

  &:focus {
    outline: none;
  }

  @media all and (max-width: 768px) {
    margin: 0 0 10px 0;
  }
}

.illustrations {
  display: flex;
  justify-content: space-between;

  @media all and (max-width: 768px) {
    display: none;
  }
}
</style>
