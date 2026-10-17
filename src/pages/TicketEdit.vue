<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { sites, items, updateItem } from '../ticketsStore.js'
import { getTicketById, updateTicket } from '../api/tickets.js'

const router = useRouter()
const route = useRoute()
const ticketId = parseInt(route.params.id)

const form = ref({
  title: '',
  siteId: 0,
  description: ''
})
const errors = ref({})
const isSubmitting = ref(false)
const success = ref('')
const isLoading = ref(true)
const ticketNotFound = ref(false)

async function loadTicket() {
  isLoading.value = true
  try {
    const ticket = await getTicketById(ticketId)
    form.value = {
      title: ticket.title,
      siteId: ticket.siteId,
      description: ticket.description
    }
  } catch (err) {
    ticketNotFound.value = true
  } finally {
    isLoading.value = false
  }
}

function validate() {
  const newErrors = {}
  if (form.value.title.trim().length < 5 || form.value.title.trim().length > 80) {
    newErrors.title = 'Тема: от 5 до 80 символов'
  }
  if (!Number.isInteger(form.value.siteId) || form.value.siteId <= 0) {
    newErrors.siteId = 'Справочник: целое число больше 0'
  }
  if (form.value.description.trim().length < 10 || form.value.description.trim().length > 500) {
    newErrors.description = 'Описание: от 10 до 500 символов'
  }
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

async function onSubmit() {
  if (isSubmitting.value) return
  if (!validate()) return

  isSubmitting.value = true
  success.value = ''

  try {
    await updateTicket(ticketId, {
      title: form.value.title,
      siteId: form.value.siteId,
      description: form.value.description
    })
    
    // Обновляем локальный store
    updateItem(ticketId, {
      title: form.value.title,
      siteId: form.value.siteId,
      description: form.value.description
    })
    
    success.value = '✅ Заявка успешно обновлена'
    setTimeout(() => router.push('/'), 1500)
  } catch (err) {
    errors.value = { form: err.message || 'Ошибка при обновлении заявки' }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadTicket()
})
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Редактирование заявки</h2>

    <div v-if="isLoading" class="card text-center py-12">
      <div class="text-4xl mb-4">⏳</div>
      <p class="text-gray-500">Загрузка заявки...</p>
    </div>

    <div v-else-if="ticketNotFound" class="card text-center py-12 border-red-200 bg-red-50">
      <div class="text-4xl mb-4">❌</div>
      <p class="text-red-600">Заявка не найдена</p>
      <button @click="router.push('/')" class="btn-primary mt-4">Вернуться к списку</button>
    </div>

    <form v-else @submit.prevent="onSubmit" class="card space-y-5">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Тема заявки (5–80 символов)</label>
        <input id="title" name="title" type="text" autofocus v-model="form.title"
          :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500',
            errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300']"
          placeholder="Например: Насос не запускается" />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
      </div>

      <div>
        <label for="siteId" class="block text-sm font-medium text-gray-700 mb-1">Участок / оборудование</label>
        <select id="siteId" name="siteId" v-model.number="form.siteId"
          :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500',
            errors.siteId ? 'border-red-300 bg-red-50' : 'border-gray-300']">
          <option :value="0">— Выберите участок —</option>
          <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.id }}: {{ site.name }}</option>
        </select>
        <p v-if="errors.siteId" class="mt-1 text-sm text-red-600">{{ errors.siteId }}</p>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Описание (10–500 символов)</label>
        <textarea id="description" name="description" rows="4" v-model="form.description"
          :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500',
            errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300']"
          placeholder="Подробно опишите проблему..."></textarea>
        <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        <p class="mt-1 text-xs text-gray-400">{{ form.description.length }}/500</p>
      </div>

      <div v-if="errors.form" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{{ errors.form }}</div>
      <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">{{ success }}</div>

      <div class="flex items-center gap-3 pt-2">
        <button type="submit" :disabled="isSubmitting"
          :class="['btn-primary', isSubmitting ? 'opacity-50 cursor-not-allowed' : '']">
          {{ isSubmitting ? '⏳ Сохраняем...' : '💾 Сохранить изменения' }}
        </button>
        <button type="button" @click="router.push('/')" class="btn-secondary">
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>
