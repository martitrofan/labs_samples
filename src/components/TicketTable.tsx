import React from 'react';
import { Ticket } from '../types';
import { getSiteName, getStatusLabel, getUserName } from '../api';

interface TicketTableProps {
  items: Ticket[];
  onAssign?: (id: number) => void;
  onStatusChange?: (id: number, status: Ticket['status']) => void;
}

export default function TicketTable({ items, onAssign, onStatusChange }: TicketTableProps) {
  const statusClass = (status: Ticket['status']) => {
    const classes: Record<Ticket['status'], string> = {
      New: 'badge-new',
      InProgress: 'badge-inprogress',
      Closed: 'badge-closed',
      Cancelled: 'badge-cancelled',
    };
    return classes[status];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тема</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Участок</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Исполнитель</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-500">{item.number}</td>
              <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate" title={item.title}>{item.title}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{getSiteName(item.siteId)}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`badge ${statusClass(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{getUserName(item.assigneeUserId)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <div className="flex gap-1">
                  {item.status === 'New' && onAssign && (
                    <button
                      onClick={() => onAssign(item.id)}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
                    >
                      Назначить
                    </button>
                  )}
                  {item.status === 'New' && item.assigneeUserId && onStatusChange && (
                    <button
                      onClick={() => onStatusChange(item.id, 'InProgress')}
                      className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-100"
                    >
                      В работу
                    </button>
                  )}
                  {item.status === 'InProgress' && onStatusChange && (
                    <button
                      onClick={() => onStatusChange(item.id, 'Closed')}
                      className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100"
                    >
                      Закрыть
                    </button>
                  )}
                  {(item.status === 'New' || item.status === 'InProgress') && onStatusChange && (
                    <button
                      onClick={() => onStatusChange(item.id, 'Cancelled')}
                      className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100"
                    >
                      Отменить
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
