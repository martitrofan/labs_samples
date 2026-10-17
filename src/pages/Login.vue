<script setup>
import { ref } from 'vue'

const login = ref('')
const password = ref('')
const error = ref('')

function onSubmit() {
  if (!login.value || !password.value) {
    error.value = 'Заполните все поля'
    return
  }
  error.value = '⚠️ Авторизация не реализована в рамках семестра (демо-режим)'
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Вход в систему</h2>

    <form @submit.prevent="onSubmit" class="card space-y-5">
      <div>
        <label for="login" class="block text-sm font-medium text-gray-700 mb-1">Логин</label>
        <input id="login" name="login" type="text" autofocus v-model="login"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Введите логин" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input id="password" name="password" type="password" v-model="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Введите пароль" />
      </div>

      <div v-if="error" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">{{ error }}</div>

      <button type="submit" class="btn-primary w-full">🔑 Войти</button>
    </form>

    <div class="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
      <p class="font-medium mb-2">Доступные роли:</p>
      <ul class="space-y-1 text-xs">
        <li>👤 <strong>Диспетчер</strong> — создаёт заявки, назначает исполнителей</li>
        <li>🔧 <strong>Инженер</strong> — принимает заявки в работу, закрывает</li>
      </ul>
      <p class="mt-3 text-xs text-gray-400">
        Экран входа — обязательный элемент ЛР3. Полная авторизация появится в следующих ЛР.
      </p>
    </div>
  </div>
</template>
