import { ref } from 'vue'

export const items = ref([
  {
    id: 1,
    number: 'RM-001',
    title: 'Насос не запускается после планового ТО',
    siteId: 1,
    description: 'После проведения планового ТО насос Н-201 не запускается. При включении слышен щелчок, но вал не вращается. Необходимо проверить пусковую обмотку и конденсатор.',
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined
  },
  {
    id: 2,
    number: 'RM-002',
    title: 'Повышенная вибрация компрессора К-105',
    siteId: 3,
    description: 'Зафиксирована повышенная вибрация компрессора К-105 на рабочем режиме. Показания виброметра превышают допустимые значения на 40%. Требуется диагностика подшипникового узла и балансировка ротора.',
    status: 'InProgress',
    createdByUserId: 1,
    assigneeUserId: 2
  },
  {
    id: 3,
    number: 'RM-003',
    title: 'Утечка теплоносителя в контуре отопления',
    siteId: 4,
    description: 'Обнаружена утечка теплоносителя на фланцевом соединении трубопровода DN80 в котельной №2. Давление в контуре постепенно снижается. Требуется замена прокладки и протяжка болтов.',
    status: 'Closed',
    createdByUserId: 1,
    assigneeUserId: 3
  },
  {
    id: 4,
    number: 'RM-004',
    title: 'Неисправность датчика давления на ТП-4',
    siteId: 2,
    description: 'Датчик давления PD-401 на трансформаторной подстанции показывает некорректные значения. Разница с контрольным манометром составляет более 15%. Необходима калибровка или замена датчика.',
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined
  },
  {
    id: 5,
    number: 'RM-005',
    title: 'Перегрев обмоток электродвигателя',
    siteId: 1,
    description: 'Зафиксирован перегрев обмоток электродвигателя М-302 выше допустимой температуры на 25°C. Вентиляция работает нормально. Требуется проверка состояния изоляции и подшипников.',
    status: 'InProgress',
    createdByUserId: 1,
    assigneeUserId: 3
  },
  {
    id: 6,
    number: 'RM-006',
    title: 'Засорение фильтра на водозаборном узле',
    siteId: 5,
    description: 'Снижение производительности насоса В-101 из-за засорения фильтра грубой очистки. Перепад давления на фильтре превышает норму в 2 раза. Требуется очистка или замена фильтрующего элемента.',
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined
  },
  {
    id: 7,
    number: 'RM-007',
    title: 'Неисправность системы автоматического ввода резерва',
    siteId: 2,
    description: 'При тестировании АВР на ТП-4 не произошло автоматическое переключение на резервный ввод. Необходимо проверить логику работы контроллера и состояние силовых контакторов.',
    status: 'Cancelled',
    createdByUserId: 1,
    assigneeUserId: 2
  },
  {
    id: 8,
    number: 'RM-008',
    title: 'Стук в цилиндре компрессора К-202',
    siteId: 3,
    description: 'При работе компрессора К-202 слышен металлический стук в области цилиндра высокого давления. Производительность не изменилась. Требуется вскрытие и дефектовка клапанной группы.',
    status: 'InProgress',
    createdByUserId: 1,
    assigneeUserId: 2
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

let nextId = 9

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

export function updateItem(id, updates) {
  const ticket = items.value.find(t => t.id === id)
  if (ticket) {
    Object.assign(ticket, updates)
    return { ...ticket }
  }
  return null
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
