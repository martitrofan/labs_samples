<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-4 px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold">🎓 РИС и Web — Лабораторные 2026</h1>
        <p class="text-blue-200 text-sm mt-1">
          Тема: Система управления заявками на ремонт оборудования
        </p>
      </div>
    </div>
    <AppHeader />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
    <footer class="bg-white border-t border-gray-200 mt-12 py-6">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
        <p>Курс <strong>Б1.В.ДЭ.01.02.02</strong> · КГЭУ · семестр 1 · 2026/2027</p>
        <p>Стек: <strong>Vue 3 + ASP.NET Core + PostgreSQL</strong></p>
      </div>
    </footer>
  </div>
</template>
