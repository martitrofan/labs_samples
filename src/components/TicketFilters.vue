<script setup>
import { sites, users } from '../ticketsStore.js'

const props = defineProps({
  filters: { type: Object, required: true }
})

const emit = defineEmits(['update:filters'])

function updateFilter(key, value) {
  emit('update:filters', { ...props.filters, [key]: value })
}

function resetFilters() {
  emit('update:filters', {
    status: '',
    assigneeId: '',
    dateFrom: '',
    dateTo: ''
  })
}
</script>

<template>
  <div class="card mb-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold text-gray-900">
        <i class="fas fa-filter mr-2"></i>Фильтры
      </h3>
      <button @click="resetFilters" class="text-sm text-gray-600 hover:text-gray-900">
        <i class="fas fa-times mr-1"></i>Сбросить
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Статус</label>
        <select 
          :value="filters.status" 
          @input="updateFilter('status', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
          <option value="">Все статусы</option>
          <option value="New">Новая</option>
          <option value="InProgress">В работе</option>
          <option value="Closed">Закрыта</option>
          <option value="Cancelled">Отменена</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Исполнитель</label>
        <select 
          :value="filters.assigneeId" 
          @input="updateFilter('assigneeId', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
          <option value="">Все исполнители</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Дата с</label>
        <input 
          type="date" 
          :value="filters.dateFrom" 
          @input="updateFilter('dateFrom', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Дата по</label>
        <input 
          type="date" 
          :value="filters.dateTo" 
          @input="updateFilter('dateTo', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
  </div>
</template>
