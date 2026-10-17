import { ref } from 'vue'

export const items = ref([
  {
    id: 1,
    number: 'RM-001',
    title: 'Насос не запускается после планового ТО',
    siteId: 1,
    description: 'После проведения планового ТО насос Н-201 не запускается. При включении слышен щелчок, но вал не вращается.',
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined
  },
  {
    id: 2,
    number: 'RM-002',
    title: 'Повышенная вибрация компрессора К-105',
    siteId: 3,
    description: 'Зафиксирована повышенная вибрация компрессора К-105. Показания виброметра превышают допустимые значения на 40%.',
    status: 'InProgress',
    createdByUserId: 1,
    assigneeUserId: 2
  },
  {
    id: 3,
    number: 'RM-003',
    title: 'Утечка теплоносителя в контуре отопления',
    siteId: 4,
    description: 'Обнаружена утечка теплоносителя на фланцевом соединении трубопровода DN80 в котельной №2.',
    status: 'Closed',
    createdByUserId: 1,
    assigneeUserId: 3
  }
])

export const sites = [
  { id: 1, name: 'Насосная станция №1' },
  { id: 2, name: 'Трансформаторная подстанция ТП-4' },
  { id: 3, name: 'Компрессорный цех' },
  { id: 4, name: 'Котельная №2' },
  { id: 5, name: 'Водозаборный узел' }
]

export const users = [
  { id: 1, name: 'Иванов А.П.', role: 'dispatcher' },
  { id: 2, name: 'Петров С.В.', role: 'engineer' },
  { id: 3, name: 'Сидоров К.М.', role: 'engineer' }
]

let nextId = 4

export function addItem(ticket) {
  const newTicket = {
    id: nextId,
    number: `RM-${String(nextId).padStart(3, '0')}`,
    ...ticket,
    status: 'New'
  }
  items.value.push(newTicket)
  nextId++
  return newTicket
}

export function getSiteName(siteId) {
  const site = sites.find(s => s.id === siteId)
  return site ? site.name : `Участок #${siteId}`
}

export function getUserName(userId) {
  if (!userId) return '—'
  const user = users.find(u => u.id === userId)
  return user ? user.name : `Пользователь #${userId}`
}

export function getStatusLabel(status) {
  const labels = {
    New: 'Новая',
    InProgress: 'В работе',
    Closed: 'Закрыта',
    Cancelled: 'Отменена'
  }
  return labels[status] || status
}
