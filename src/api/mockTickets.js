const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let mockTickets = [
  {
    id: 1,
    number: 'RM-001',
    title: 'Насос не запускается после планового ТО',
    siteId: 1,
    description: 'После проведения планового ТО насос Н-201 не запускается.',
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined
  },
  {
    id: 2,
    number: 'RM-002',
    title: 'Повышенная вибрация компрессора К-105',
    siteId: 3,
    description: 'Зафиксирована повышенная вибрация компрессора К-105.',
    status: 'InProgress',
    createdByUserId: 1,
    assigneeUserId: 2
  }
]

let nextId = 3

export async function mockGetTickets() {
  await delay(500)
  return [...mockTickets]
}

export async function mockCreateTicket(body) {
  await delay(500)
  
  if (body.title.trim().length < 5) {
    throw { status: 400, message: 'Тема: от 5 до 80 символов' }
  }
  if (body.siteId <= 0) {
    throw { status: 400, message: 'Справочник: число больше 0' }
  }
  if (body.description.trim().length < 10) {
    throw { status: 400, message: 'Описание: от 10 до 500 символов' }
  }

  const ticket = {
    id: nextId,
    number: `RM-${String(nextId).padStart(3, '0')}`,
    title: body.title.trim(),
    siteId: body.siteId,
    description: body.description.trim(),
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined
  }
  
  nextId++
  mockTickets.push(ticket)
  return ticket
}
