import React, { useState, useEffect } from 'react';
import { Ticket, ListState } from '../types';
import { getTickets, assignTicket, updateTicketStatus, users } from '../api';
import TicketTable from '../components/TicketTable';

export default function TicketList() {
  const [items, setItems] = useState<Ticket[]>([]);
  const [screen, setScreen] = useState<ListState>('loading');
  const [error, setError] = useState('');

  const loadTickets = async () => {
    setScreen('loading');
    try {
      const data = await getTickets();
      setItems(data);
      setScreen(data.length === 0 ? 'empty' : 'data');
    } catch (err) {
      setError('Ошибка загрузки данных');
      setScreen('error');
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleAssign = async (id: number) => {
    const engineers = users.filter(u => u.role === 'engineer');
    const engineer = engineers[Math.floor(Math.random() * engineers.length)];
    try {
      await assignTicket(id, engineer.id);
      await loadTickets();
    } catch (err) {
      setError('Ошибка назначения');
    }
  };

  const handleStatusChange = async (id: number, status: Ticket['status']) => {
    try {
      await updateTicketStatus(id, status);
      await loadTickets();
    } catch (err) {
      setError('Ошибка обновления статуса');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Заявки на ремонт оборудования</h2>
        <button onClick={loadTickets} className="btn-secondary text-sm">
          🔄 Обновить
        </button>
      </div>

      {screen === 'loading' && (
        <div className="card text-center py-12">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-500">Загрузка заявок...</p>
        </div>
      )}

      {screen === 'empty' && (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-500">Записей пока нет</p>
        </div>
      )}

      {screen === 'data' && (
        <div className="card p-0 overflow-hidden">
          <TicketTable
            items={items}
            onAssign={handleAssign}
            onStatusChange={handleStatusChange}
          />
        </div>
      )}

      {screen === 'error' && (
        <div className="card text-center py-12 border-red-200 bg-red-50">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-600">{error}</p>
          <button onClick={loadTickets} className="btn-primary mt-4">
            Попробовать снова
          </button>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <strong>ℹ️ Демонстрация ЛР5-ЛР6:</strong> Данные хранятся в памяти (mock API). 
        После F5 добавленные записи исчезают — это ожидаемо до подключения реальной БД.
      </div>
    </div>
  );
}
