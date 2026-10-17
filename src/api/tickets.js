import { mockGetTickets, mockCreateTicket, mockUpdateTicket, mockGetTicketById } from './mockTickets.js'

const USE_MOCK = true
const baseUrl = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000'

export async function getTickets() {
  if (USE_MOCK) {
    return await mockGetTickets()
  }
  
  const response = await fetch(`${baseUrl}/api/tickets`)
  if (!response.ok) {
    throw { status: response.status, message: 'Ошибка загрузки' }
  }
  return await response.json()
}

export async function createTicket(body) {
  if (USE_MOCK) {
    return await mockCreateTicket(body)
  }
  
  const response = await fetch(`${baseUrl}/api/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw { status: response.status, message: error.message || 'Ошибка создания' }
  }
  return await response.json()
}

export async function getTicketById(id) {
  if (USE_MOCK) {
    return await mockGetTicketById(id)
  }
  
  const response = await fetch(`${baseUrl}/api/tickets/${id}`)
  if (!response.ok) {
    throw { status: response.status, message: 'Заявка не найдена' }
  }
  return await response.json()
}

export async function updateTicket(id, body) {
  if (USE_MOCK) {
    return await mockUpdateTicket(id, body)
  }
  
  const response = await fetch(`${baseUrl}/api/tickets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw { status: response.status, message: error.message || 'Ошибка обновления' }
  }
  return await response.json()
}
