<script setup>
import { ref } from 'vue'

const selectedLab = ref(0)

const labs = [
  { id: 0, name: 'ЛР0', title: 'Git и GitHub' },
  { id: 1, name: 'ЛР1', title: 'Анализ и требования' },
  { id: 2, name: 'ЛР2', title: 'Архитектура и модель данных' },
  { id: 3, name: 'ЛР3', title: 'Vue: каркас и экраны' },
  { id: 4, name: 'ЛР4', title: 'Vue: компоненты и маршруты' },
  { id: 5, name: 'ЛР5', title: 'Vue: форма и список в памяти' },
  { id: 6, name: 'ЛР6', title: 'Vue: клиент API' },
  { id: 7, name: 'ЛР7', title: 'ASP.NET Core: каркас Web API' }
]

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
  <div class="flex flex-col md:flex-row gap-6">
    <!-- Sidebar with lab list -->
    <aside class="md:w-64 flex-shrink-0">
      <div class="card p-4 sticky top-4">
        <h3 class="font-bold text-gray-900 mb-3">
          <i class="fas fa-list mr-2"></i>Лабораторные работы
        </h3>
        <nav class="space-y-1">
          <button
            v-for="lab in labs"
            :key="lab.id"
            @click="selectedLab = lab.id"
            :class="[
              'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
              selectedLab === lab.id
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            ]">
            <span class="font-mono text-xs">{{ lab.name }}</span>
            <span class="hidden md:inline ml-1">{{ lab.title }}</span>
          </button>
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 min-w-0">
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-900">{{ labContent[selectedLab].title }}</h2>
        <div class="card">
          <p class="text-gray-700">{{ labContent[selectedLab].content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
