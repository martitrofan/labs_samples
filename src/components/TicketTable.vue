<script setup>
import { getSiteName, getStatusLabel, getUserName } from '../ticketsStore.js'

defineProps({
  items: { type: Array, required: true }
})

const emit = defineEmits(['assign', 'status-change'])

function statusClass(status) {
  const classes = {
    New: 'badge-new',
    InProgress: 'badge-inprogress',
    Closed: 'badge-closed',
    Cancelled: 'badge-cancelled'
  }
  return classes[status] || ''
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">№</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Тема</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Участок</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Исполнитель</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 text-sm font-mono text-gray-500">{{ item.number }}</td>
          <td class="px-4 py-3 text-sm text-gray-900 max-w-xs truncate" :title="item.title">{{ item.title }}</td>
          <td class="px-4 py-3 text-sm text-gray-600">{{ getSiteName(item.siteId) }}</td>
          <td class="px-4 py-3">
            <span :class="['badge', statusClass(item.status)]">{{ getStatusLabel(item.status) }}</span>
          </td>
          <td class="px-4 py-3 text-sm text-gray-600">{{ getUserName(item.assigneeUserId) }}</td>
          <td class="px-4 py-3 text-sm">
            <div class="flex gap-1 flex-wrap">
              <router-link :to="`/edit/${item.id}`"
                class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                ✏️ Редактировать
              </router-link>
              <button v-if="item.status === 'New'" @click="emit('assign', item.id)"
                class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                Назначить
              </button>
              <button v-if="item.status === 'New' && item.assigneeUserId" @click="emit('status-change', item.id, 'InProgress')"
                class="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-100">
                В работу
              </button>
              <button v-if="item.status === 'InProgress'" @click="emit('status-change', item.id, 'Closed')"
                class="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100">
                Закрыть
              </button>
              <button v-if="item.status === 'New' || item.status === 'InProgress'" @click="emit('status-change', item.id, 'Cancelled')"
                class="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100">
                Отменить
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
