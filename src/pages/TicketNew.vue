<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sites, addItem } from '../ticketsStore.js'

const router = useRouter()

const form = ref({
  title: '',
  siteId: 0,
  description: ''
})
const errors = ref({})
const isSubmitting = ref(false)
const success = ref('')

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
    await new Promise(resolve => setTimeout(resolve, 500))
    const ticket = addItem({
      title: form.value.title,
      siteId: form.value.siteId,
      description: form.value.description,
      createdByUserId: 1
    })
    success.value = `Заявка "${ticket.title}" создана со статусом New`
    form.value = { title: '', siteId: 0, description: '' }
    errors.value = {}
    setTimeout(() => router.push('/'), 1500)
  } catch (err) {
    errors.value = { form: 'Ошибка при создании заявки' }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-xl font-bold text-gray-900 mb-6">
      <i class="fas fa-plus-circle mr-2"></i>Создание заявки на ремонт
    </h2>

    <form @submit.prevent="onSubmit" class="card space-y-5">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Тема заявки (5–80 символов)</label>
        <input id="title" name="title" type="text" autofocus v-model="form.title"
          :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500',
            errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300']"
          placeholder="Например: Насос не запускается" />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">
          <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.title }}
        </p>
      </div>

      <div>
        <label for="siteId" class="block text-sm font-medium text-gray-700 mb-1">Участок / оборудование</label>
        <select id="siteId" name="siteId" v-model.number="form.siteId"
          :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500',
            errors.siteId ? 'border-red-300 bg-red-50' : 'border-gray-300']">
          <option :value="0">— Выберите участок —</option>
          <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.id }}: {{ site.name }}</option>
        </select>
        <p v-if="errors.siteId" class="mt-1 text-sm text-red-600">
          <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.siteId }}
        </p>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Описание (10–500 символов)</label>
        <textarea id="description" name="description" rows="4" v-model="form.description"
          :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500',
            errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300']"
          placeholder="Подробно опишите проблему..."></textarea>
        <p v-if="errors.description" class="mt-1 text-sm text-red-600">
          <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.description }}
        </p>
        <p class="mt-1 text-xs text-gray-400">{{ form.description.length }}/500</p>
      </div>

      <div v-if="errors.form" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
        <i class="fas fa-exclamation-triangle mr-2"></i>{{ errors.form }}
      </div>
      <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
        <i class="fas fa-check-circle mr-2"></i>{{ success }}
      </div>

      <div class="flex items-center gap-3 pt-2">
        <button type="submit" :disabled="isSubmitting"
          :class="['btn-primary', isSubmitting ? 'opacity-50 cursor-not-allowed' : '']">
          <i :class="isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-save'" class="mr-1"></i>
          {{ isSubmitting ? 'Создаём...' : 'Создать заявку' }}
        </button>
        <span class="text-xs text-gray-400">Статус будет: <code class="bg-gray-100 px-1 rounded">New</code></span>
      </div>
    </form>

    <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
      <i class="fas fa-info-circle mr-2"></i>
      <strong>Демонстрация ЛР5:</strong> Форма проверяет поля на клиенте.
      Тема &lt; 5 символов будет отклонена. После F5 данные формы исчезают.
    </div>
  </div>
</template>
