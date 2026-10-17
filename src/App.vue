<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top navigation -->
    <div class="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">
              <i class="fas fa-graduation-cap mr-2"></i>
              РИС и Web — Лабораторные 2026
            </h1>
            <p class="text-blue-200 text-sm mt-1">
              Тема: Система управления заявками на ремонт оборудования | Vue 3 + ASP.NET Core + PostgreSQL
            </p>
          </div>
        </div>
      </div>
    </div>

    <AppHeader />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-500">
            <p>Курс <strong>Б1.В.ДЭ.01.02.02</strong> · КГЭУ · семестр 1 · 2026/2027</p>
            <p>Стек: <strong>Vue 3 + ASP.NET Core + PostgreSQL</strong></p>
          </div>
          <div class="text-sm text-gray-400">
            <a href="https://martitrofan.github.io/ris-web-labs-2026/" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600">
              <i class="fas fa-external-link-alt mr-1"></i>Каталог курса →
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
