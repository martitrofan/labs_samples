<script setup>
import { ref, computed, onMounted } from 'vue'
import { items, users } from '../ticketsStore.js'
import { getTickets } from '../api/tickets.js'
import TicketTable from '../components/TicketTable.vue'
import TicketFilters from '../components/TicketFilters.vue'

const screen = ref('loading')
const error = ref('')
const filters = ref({
  status: '',
  assigneeId: '',
  dateFrom: '',
  dateTo: ''
})

const filteredItems = computed(() => {
  return items.value.filter(item => {
    // Фильтр по статусу
    if (filters.value.status && item.status !== filters.value.status) {
      return false
    }
    // Фильтр по исполнителю
    if (filters.value.assigneeId && item.assigneeUserId !== parseInt(filters.value.assigneeId)) {
      return false
    }
    // Фильтр по дате (если есть createdAt)
    if (filters.value.dateFrom && item.createdAt) {
      const itemDate = new Date(item.createdAt)
      const fromDate = new Date(filters.value.dateFrom)
      if (itemDate < fromDate) return false
    }
    if (filters.value.dateTo && item.createdAt) {
      const itemDate = new Date(item.createdAt)
      const toDate = new Date(filters.value.dateTo)
      if (itemDate > toDate) return false
    }
    return true
  })
})

async function loadTickets() {
  screen.value = 'loading'
  try {
    const data = await getTickets()
    items.value = data
    screen.value = data.length === 0 ? 'empty' : 'data'
  } catch (err) {
    error.value = 'Ошибка загрузки данных'
    screen.value = 'error'
  }
}

function handleAssign(id) {
  const engineers = users.filter(u => u.role === 'engineer')
  const engineer = engineers[Math.floor(Math.random() * engineers.length)]
  const ticket = items.value.find(t => t.id === id)
  if (ticket) {
    ticket.assigneeUserId = engineer.id
  }
}

function handleStatusChange(id, status) {
  const ticket = items.value.find(t => t.id === id)
  if (ticket) {
    ticket.status = status
  }
}

onMounted(() => {
  loadTickets()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-900">
        <i class="fas fa-clipboard-list mr-2"></i>Заявки на ремонт оборудования
      </h2>
      <button @click="loadTickets" class="btn-secondary text-sm">
        <i class="fas fa-sync-alt mr-1"></i>Обновить
      </button>
    </div>

    <TicketFilters :filters="filters" @update:filters="filters.value = $event" />

    <div v-if="screen === 'loading'" class="card text-center py-12">
      <i class="fas fa-spinner fa-spin text-4xl mb-4 text-blue-600"></i>
      <p class="text-gray-500">Загрузка заявок...</p>
    </div>

    <div v-else-if="screen === 'empty'" class="card text-center py-12">
      <i class="fas fa-inbox text-4xl mb-4 text-gray-400"></i>
      <p class="text-gray-500">Записей пока нет</p>
    </div>

    <div v-else-if="screen === 'data'" class="card p-0 overflow-hidden">
      <TicketTable 
        v-if="filteredItems.length > 0"
        :items="filteredItems" 
        @assign="handleAssign" 
        @status-change="handleStatusChange" 
      />
      <div v-else class="text-center py-12">
        <i class="fas fa-filter text-4xl mb-4 text-gray-400"></i>
        <p class="text-gray-500">Нет заявок, соответствующих фильтрам</p>
      </div>
    </div>

    <div v-else-if="screen === 'error'" class="card text-center py-12 border-red-200 bg-red-50">
      <i class="fas fa-exclamation-triangle text-4xl mb-4 text-red-600"></i>
      <p class="text-red-600">{{ error }}</p>
      <button @click="loadTickets" class="btn-primary mt-4">
        <i class="fas fa-redo mr-1"></i>Попробовать снова
      </button>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
      <i class="fas fa-info-circle mr-2"></i>
      <strong>Демонстрация ЛР5-ЛР6:</strong> Данные хранятся в памяти (mock API).
      После F5 добавленные записи исчезают — это ожидаемо до подключения реальной БД.
    </div>
  </div>
</template>
