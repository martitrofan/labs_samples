import { mockGetTickets, mockCreateTicket } from './mockTickets.js'

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
