<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center gap-1 h-16">
        <i class="fas fa-tools text-xl mr-2 text-gray-700"></i>
        <router-link to="/"
          :class="['px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            route.path === '/' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100']">
          <i class="fas fa-list mr-1"></i>Список заявок
        </router-link>
        <router-link to="/new"
          :class="['px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            route.path === '/new' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100']">
          <i class="fas fa-plus mr-1"></i>Создать
        </router-link>
        <router-link to="/login"
          :class="['px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            route.path === '/login' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100']">
          <i class="fas fa-sign-in-alt mr-1"></i>Вход
        </router-link>
      </nav>
    </div>
  </header>
</template>
