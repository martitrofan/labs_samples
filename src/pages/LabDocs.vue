<script setup>
defineProps({
  labNumber: { type: Number, required: true }
})

const labContent = {
  0: {
    title: 'ЛР0: Git и GitHub',
    content: 'Вход в курс. Создание репозитория, первый коммит, приглашение преподавателя.'
  },
  1: {
    title: 'ЛР1: Анализ и требования',
    content: 'Выбор темы, заявка на тему, техническое задание.'
  },
  2: {
    title: 'ЛР2: Архитектура и модель данных',
    content: 'ER-диаграмма, API-контракт, архитектурная схема.'
  },
  3: {
    title: 'ЛР3: Vue — каркас и экраны',
    content: 'Первый код клиента: Vue 3, три экрана, Vite на порту 5173.'
  },
  4: {
    title: 'ЛР4: Vue — компоненты и маршруты',
    content: 'Компоненты, vue-router, три маршрута: /, /new, /login.'
  },
  5: {
    title: 'ЛР5: Vue — форма и список в памяти',
    content: 'Форма создания добавляет запись в общий массив. Сервера нет.'
  },
  6: {
    title: 'ЛР6: Vue — клиент API и mock',
    content: 'API-модуль, mock, четыре состояния UI, блокировка повторной отправки.'
  },
  7: {
    title: 'ЛР7: ASP.NET Core — каркас Web API',
    content: 'Первый сервер: ASP.NET Core на порту 5000, Swagger, /health, /info.'
  }
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold text-gray-900">{{ labContent[labNumber].title }}</h2>
    <div class="card">
      <p class="text-gray-700">{{ labContent[labNumber].content }}</p>
    </div>
  </div>
</template>
