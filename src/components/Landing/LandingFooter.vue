<template>
  <footer>
    <div class="additionally">
      <VText text="РАБОТА В КОМПАНИИ" font-size="14px" font-weight="400" :link="true" href="#" />
      <VText text="УСЛОВИЯ ПОЛЬЗОВАНИЯ" font-size="14px" font-weight="400" :link="true" href="#" />
      <VText text="ВЫХОДНЫЕ ДАННЫЕ" font-size="14px" font-weight="400" :link="true" href="#" />
      <VText text="ПОЛИТИКА КОНФЕНДЕНЦИАЛЬНОСТИ" font-size="14px" font-weight="400" :link="true" href="#" />
    </div>
    <div class="contacts">
      <div class="logo">
        <VText text="conectt" font-weight="900" font-size="50px" title="h3" />
        <img :src="logoSVG" alt="Лого" />
      </div>
      <div class="socials">
        <a href="#">
          <img :src="telegram" alt="telegram">
        </a>
        <a href="#">
          <img :src="GitHub" alt="GitHub">
        </a>
        <a href="#">
          <img :src="Instagram" alt="Instagram">
        </a>
      </div>
      <div class="number">
        <VText text="ТЕЛЕФОН ГОРЯЧЕЙ ЛИНИИ" />
        <VText text="+7 777 777 77 77" :link="true" href="tel:+77777777777" font-weight="400" font-size="18px" />
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import VText from '@/components/VText.vue'
import logoSVG from '@/assets/icons/logo.svg'
import telegram from '@/assets/icons/telegram.svg'
import GitHub from '@/assets/icons/GitHub.svg'
import Instagram from '@/assets/icons/Instagram.svg'
</script>

<style lang="scss" scoped>
.additionally {
  flex-wrap: wrap;
  margin-bottom: 108px;

  @media all and (max-width: 768px) {
    margin-bottom: 20px;
  }
}

.contacts {
  flex-wrap: wrap-reverse;
  margin-bottom: 10px;
}

.socials {
  width: 150px;
  margin-bottom: 10px;
}

.additionally, .contacts, .socials {
  display: flex;
  justify-content: space-between;
}

.logo {
  display: flex;

  > h3 {
    margin-right: 35px;
  }

  > img {
    width: 33px;
    height: 34px;
  }
}

.number {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > a {
    color: #c2c2c2;
  }
}
</style>
