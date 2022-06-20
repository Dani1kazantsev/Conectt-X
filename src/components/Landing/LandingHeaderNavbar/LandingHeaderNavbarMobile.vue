<template>
  <div>
    <div class="openButton" @click="openMenu">
      <span />
      <span />
      <span />
    </div>
    <div :class="`menuContainer ${openedClass}`">
      <div class="closeButton" @click="closeMenu">
        <span />
        <span />
      </div>
      <ul class="menu">
        <li>
          <VText text="Логин" :link="true" href="/login" font-weight="700" />
        </li>
        <li>
          <VText text="Регистрация" :link="true" href="/registration" font-weight="700" />
        </li>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import VText from '@/components/VText.vue'

const opened = ref(false)

const openMenu = () => {
  opened.value = true
}
const closeMenu = () => {
  opened.value = false
}

const openedClass = computed(() => opened.value ? 'open' : 'close')
</script>

<style lang="scss" scoped>
.openButton {
  position: relative;

  > span:nth-of-type(1), span:nth-of-type(3) {
    position: absolute;
    left: 0;
  }

  > span:nth-of-type(1) {
    top: 0
  }

  > span:nth-of-type(3) {
    bottom: 0
  }
}
.closeButton {
  margin: 10px 10px 0 0;

  > span:nth-of-type(1) {
    transform: rotate(45deg) translateX(2px);
  }

  > span:nth-of-type(2) {
    transform: rotate(-45deg) translateX(1px);
  }
}

.openButton, .closeButton {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30px;
  height: 20px;

  > span {
    width: 100%;
    height: 2px;
    background: white;
  }
}

.menuContainer {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: hidden auto;
  transition: left 0.3s ease-in;
  background: var(--primary-color);
  border-left: 1px solid rgba(255, 255, 255, 0.6);
}
.open {
  left: 0;
}
.close {
  left: 100%;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 0 0 0;
}
</style>
