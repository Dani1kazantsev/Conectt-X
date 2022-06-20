<template>
  <div class="block3">
    <div class="peculiarities">
      <div class="peculiaritiesText">
        <VText text="ОСОБЕННОСТИ" font-weight="500" />
        <VText text="Conectt" font-weight="900" font-size="46px" />
      </div>
      <div class="peculiaritiesButtonWrapper">
        <LandingButton text="Начать пользоваться" size="small" />
      </div>
    </div>
    <div class="advantages">
      <div class="advantageBlock" v-for="advantage in advantages" :key="advantage.id">
        <img class="advantageImg" :src="advantage.picture" :alt="advantage.title" />
        <VText :text="advantage.title" font-weight="700" font-size="20px" />
        <VText :text="advantage.body" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import jetbrains from '@/assets/images/jetbrains.png'
import code from '@/assets/images/code.png'
import growth from '@/assets/images/growth.png'
import VText from '@/components/VText.vue'
import LandingButton from '@/components/Landing/LandingButton.vue'

interface Advantage {
  id: number,
  picture: string,
  title: string,
  body: string
}

const advantages = reactive<Advantage[]>([
  {
    id: 1,
    picture: jetbrains,
    title: 'IDE',
    body: 'Теперь вам не нужно скачивать дополнительные IDE, оставьте это нам.'
  },
  {
    id: 2,
    picture: code,
    title: 'Код',
    body: 'Любой может посмотреть исходный код проектов.\nСтоит только попросить.'
  },
  {
    id: 3,
    picture: growth,
    title: 'Награды',
    body: 'Работайте активно и будете получать награды от сообщества или других пользователей.'
  }
])
</script>

<style lang="scss" scoped>
.block3 {
  margin: 0 0 320px 0;

  @media all and (max-width: 1000px) {
    margin: 0 0 150px 0;
  }

  @media all and (max-width: 768px) {
    margin: 0 0 20px 0;
  }
}

.peculiarities {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 33px 0;
}

.peculiaritiesText {
  margin: 0 0 10px 0;

  > p {
    margin: 0 0 8px 0;
  }
}

.peculiaritiesButtonWrapper {
  max-width: 241px;

  > button {
    padding: 12px 10px;
  }

  @media all and (max-width: 768px) {
    display: none;
  }
}

.advantages {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media all and (max-width: 1240px) {
    justify-content: center;
  }
}

.advantageBlock {
  max-width: 381px;
  margin-bottom: 15px;

  &:not(:last-of-type) {
    margin-right: 30px;

    @media all and (max-width: 768px) {
      margin-right: 0;
    }
  }
}

.advantageImg {
  margin: 0 0 22px 0;

  @media all and (max-width: 1240px) {
    margin: 0 0 5px 0;
  }
}
</style>
