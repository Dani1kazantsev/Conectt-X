<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');

:root {
  --primary-color: #2f383b;
  --secondary-color: #95ffe5;
  --text-color: #fff;
  --mobile: 768px;
}

#app {
  display: flex;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  color: var(--text-color);
  background: var(--primary-color);
  min-height: 100vh;
  padding: 15px;
}

/* Указываем box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Убираем внутренние отступы */
ul[class],
ol[class] {
  padding: 0;
  list-style: none;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

a {
  text-decoration: none;
  color: var(--text-color);
}

/* Выставляем основные настройки по-умолчанию для body */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Кастомизируем скроллбар */
body::-webkit-scrollbar {
  width: 6px;
}

body::-webkit-scrollbar-track {
  background: var(--primary-color);
}

body::-webkit-scrollbar-thumb {
  background-color: var(--secondary-color);
  border-radius: 20px;
}

/* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
ul[class],
ol[class] {
  list-style: none;
}

/* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Упрощаем работу с изображениями */
img {
  max-width: 100%;
  display: block;
}

/* Указываем понятную периодичность в потоке данных у article*/
article > * + * {
  margin-top: 1em;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

/* Удаляем все анимации и переходы для людей, которые предпочитай их не использовать */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

</style>
