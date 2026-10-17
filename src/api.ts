import { Ticket, Site, User } from './types';

export const sites: Site[] = [
  { id: 1, name: 'Насосная станция №1' },
  { id: 2, name: 'Трансформаторная подстанция ТП-4' },
  { id: 3, name: 'Компрессорный цех' },
  { id: 4, name: 'Котельная №2' },
  { id: 5, name: 'Водозаборный узел' },
];

export const users: User[] = [
  { id: 1, name: 'Иванов А.П.', role: 'dispatcher' },
  { id: 2, name: 'Петров С.В.', role: 'engineer' },
  { id: 3, name: 'Сидоров К.М.', role: 'engineer' },
];

export const initialTickets: Ticket[] = [
  {
    id: 1,
    number: 'RM-001',
    title: 'Насос не запускается после планового ТО',
    siteId: 1,
    description: 'После проведения планового технического обслуживания насос Н-201 не запускается. При включении слышен щелчок, но вал не вращается. Необходимо проверить пусковую обмотку и конденсатор.',
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined,
  },
  {
    id: 2,
    number: 'RM-002',
    title: 'Повышенная вибрация компрессора К-105',
    siteId: 3,
    description: 'Зафиксирована повышенная вибрация компрессора К-105 на рабочем режиме. Показания виброметра превышают допустимые значения на 40%. Требуется диагностика подшипникового узла и балансировка ротора.',
    status: 'InProgress',
    createdByUserId: 1,
    assigneeUserId: 2,
  },
  {
    id: 3,
    number: 'RM-003',
    title: 'Утечка теплоносителя в контуре отопления',
    siteId: 4,
    description: 'Обнаружена утечка теплоносителя на фланцевом соединении трубопровода DN80 в котельной №2. Давление в контуре постепенно снижается. Требуется замена прокладки и протяжка болтов.',
    status: 'Closed',
    createdByUserId: 1,
    assigneeUserId: 3,
  },
];

// Mock API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let mockTickets = [...initialTickets];
let nextId = 4;

export async function getTickets(): Promise<Ticket[]> {
  await delay(500);
  return [...mockTickets];
}

export async function createTicket(body: {
  title: string;
  siteId: number;
  description: string;
}): Promise<Ticket> {
  await delay(500);
  
  if (body.title.trim().length < 5) {
    throw { status: 400, message: 'Тема: от 5 до 80 символов' };
  }
  if (body.siteId <= 0) {
    throw { status: 400, message: 'Справочник: число больше 0' };
  }
  if (body.description.trim().length < 10) {
    throw { status: 400, message: 'Описание: от 10 до 500 символов' };
  }

  const ticket: Ticket = {
    id: nextId,
    number: `RM-${String(nextId).padStart(3, '0')}`,
    title: body.title.trim(),
    siteId: body.siteId,
    description: body.description.trim(),
    status: 'New',
    createdByUserId: 1,
    assigneeUserId: undefined,
  };
  
  nextId++;
  mockTickets.push(ticket);
  return ticket;
}

export async function assignTicket(id: number, assigneeUserId: number): Promise<Ticket> {
  await delay(300);
  const ticket = mockTickets.find(t => t.id === id);
  if (!ticket) throw { status: 404, message: 'Заявка не найдена' };
  ticket.assigneeUserId = assigneeUserId;
  return { ...ticket };
}

export async function updateTicketStatus(id: number, status: Ticket['status']): Promise<Ticket> {
  await delay(300);
  const ticket = mockTickets.find(t => t.id === id);
  if (!ticket) throw { status: 404, message: 'Заявка не найдена' };
  ticket.status = status;
  return { ...ticket };
}

export function getSiteName(siteId: number): string {
  return sites.find(s => s.id === siteId)?.name || `Участок #${siteId}`;
}

export function getUserName(userId?: number): string {
  if (!userId) return '—';
  return users.find(u => u.id === userId)?.name || `Пользователь #${userId}`;
}

export function getStatusLabel(status: Ticket['status']): string {
  const labels: Record<Ticket['status'], string> = {
    New: 'Новая',
    InProgress: 'В работе',
    Closed: 'Закрыта',
    Cancelled: 'Отменена',
  };
  return labels[status];
}
