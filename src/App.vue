<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import LabDocs from './pages/LabDocs.vue'

const mainTab = ref('demo')
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
          <div class="flex gap-2">
            <button
              @click="mainTab = 'demo'"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                mainTab === 'demo' ? 'bg-white text-blue-700' : 'bg-blue-600 text-white hover:bg-blue-500'
              ]">
              <i class="fas fa-desktop mr-2"></i>Демо
            </button>
            <button
              @click="mainTab = 'docs'"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                mainTab === 'docs' ? 'bg-white text-blue-700' : 'bg-blue-600 text-white hover:bg-blue-500'
              ]">
              <i class="fas fa-book mr-2"></i>Документация
            </button>
          </div>
        </div>
      </div>
    </div>

    <template v-if="mainTab === 'demo'">
      <AppHeader />
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-view />
      </main>
    </template>

    <template v-else>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <LabDocs :labNumber="selectedLab" />
          </div>
        </div>
      </div>
    </template>

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
