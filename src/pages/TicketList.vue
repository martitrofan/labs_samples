<script setup>
import { ref, onMounted } from 'vue'
import { items, users } from '../ticketsStore.js'
import { getTickets } from '../api/tickets.js'
import TicketTable from '../components/TicketTable.vue'

const screen = ref('loading')
const error = ref('')

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
      <h2 class="text-xl font-bold text-gray-900">Заявки на ремонт оборудования</h2>
      <button @click="loadTickets" class="btn-secondary text-sm">🔄 Обновить</button>
    </div>

    <div v-if="screen === 'loading'" class="card text-center py-12">
      <div class="text-4xl mb-4">⏳</div>
      <p class="text-gray-500">Загрузка заявок...</p>
    </div>

    <div v-else-if="screen === 'empty'" class="card text-center py-12">
      <div class="text-4xl mb-4">📭</div>
      <p class="text-gray-500">Записей пока нет</p>
    </div>

    <div v-else-if="screen === 'data'" class="card p-0 overflow-hidden">
      <TicketTable :items="items" @assign="handleAssign" @status-change="handleStatusChange" />
    </div>

    <div v-else-if="screen === 'error'" class="card text-center py-12 border-red-200 bg-red-50">
      <div class="text-4xl mb-4">❌</div>
      <p class="text-red-600">{{ error }}</p>
      <button @click="loadTickets" class="btn-primary mt-4">Попробовать снова</button>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
      <strong>ℹ️ Демонстрация ЛР5-ЛР6:</strong> Данные хранятся в памяти (mock API).
      После F5 добавленные записи исчезают — это ожидаемо до подключения реальной БД.
    </div>
  </div>
</template>
