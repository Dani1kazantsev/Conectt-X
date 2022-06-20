<template>
  <nav class="navbar">
    <ul class="menu">
      <li>
        <VText text="О нас" :link="true" href="#" font-weight="700" />
      </li>
      <li>
        <VText text="Новости" :link="true" href="#" font-weight="700" />
      </li>
      <li>
        <VText text="Помощь" :link="true" href="#" font-weight="700" />
      </li>
      <li>
        <VText text="Блог" :link="true" href="#" font-weight="700" />
      </li>
      <li>
        <VText text="Сотрудничество" :link="true" href="#" font-weight="700" />
      </li>
    </ul>
    <div class="signInOrSignUp">
      <img :src="profileSVG" alt="Профиль" />
      <VText text="Логин" font-weight="700" :link="true" href="/login" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import profileSVG from '@/assets/icons/profile.svg'
import VText from '@/components/VText.vue'
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.signInOrSignUp {
  display: flex;

  > a {
    margin: 0 0 0 10px;
  }
}

.menu {
  display: flex;

  > li {
    margin: 0 20px;

    @media all and (max-width: 920px) {
      margin: 0 15px;
    }
  }
}
</style>
