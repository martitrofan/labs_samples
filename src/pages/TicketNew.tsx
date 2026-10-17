import React, { useState } from 'react';
import { sites } from '../api';

interface TicketNewProps {
  onCreated: () => void;
}

export default function TicketNew({ onCreated }: TicketNewProps) {
  const [form, setForm] = useState({
    title: '',
    siteId: 0,
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (form.title.trim().length < 5 || form.title.trim().length > 80) {
      newErrors.title = 'Тема: от 5 до 80 символов';
    }
    if (!Number.isInteger(form.siteId) || form.siteId <= 0) {
      newErrors.siteId = 'Справочник: целое число больше 0';
    }
    if (form.description.trim().length < 10 || form.description.trim().length > 500) {
      newErrors.description = 'Описание: от 10 до 500 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSuccess('');
    
    try {
      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSuccess(`✅ Заявка "${form.title}" создана со статусом New`);
      setForm({ title: '', siteId: 0, description: '' });
      setErrors({});
      
      setTimeout(() => {
        onCreated();
      }, 1500);
    } catch (err) {
      setErrors({ form: 'Ошибка при создании заявки' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Создание заявки на ремонт</h2>
      
      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Тема заявки (5–80 символов)
          </label>
          <input
            id="title"
            name="title"
            type="text"
            autoFocus
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Например: Насос не запускается"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="siteId" className="block text-sm font-medium text-gray-700 mb-1">
            Участок / оборудование (номер справочника)
          </label>
          <select
            id="siteId"
            name="siteId"
            value={form.siteId}
            onChange={e => setForm({ ...form, siteId: parseInt(e.target.value) || 0 })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.siteId ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value={0}>— Выберите участок —</option>
            {sites.map(site => (
              <option key={site.id} value={site.id}>{site.id}: {site.name}</option>
            ))}
          </select>
          {errors.siteId && <p className="mt-1 text-sm text-red-600">{errors.siteId}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Описание (10–500 символов)
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Подробно опишите проблему..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          <p className="mt-1 text-xs text-gray-400">{form.description.length}/500</p>
        </div>

        {errors.form && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {errors.form}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? '⏳ Создаём...' : '📝 Создать заявку'}
          </button>
          <span className="text-xs text-gray-400">
            Статус будет: <code className="bg-gray-100 px-1 rounded">New</code>
          </span>
        </div>
      </form>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <strong>ℹ️ Демонстрация ЛР5:</strong> Форма проверяет поля на клиенте. 
        Тема &lt; 5 символов будет отклонена. После F5 данные формы исчезают.
      </div>
    </div>
  );
}
