import React, { useState } from 'react';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login || !password) {
      setError('Заполните все поля');
      return;
    }
    setError('⚠️ Авторизация не реализована в рамках семестра (демо-режим)');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Вход в систему</h2>
      
      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
            Логин
          </label>
          <input
            id="login"
            name="login"
            type="text"
            autoFocus
            value={login}
            onChange={e => { setLogin(e.target.value); setError(''); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите логин"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите пароль"
          />
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary w-full">
          🔑 Войти
        </button>
      </form>

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Доступные роли:</p>
        <ul className="space-y-1 text-xs">
          <li>👤 <strong>Диспетчер</strong> — создаёт заявки, назначает исполнителей</li>
          <li>🔧 <strong>Инженер</strong> — принимает заявки в работу, закрывает</li>
        </ul>
        <p className="mt-3 text-xs text-gray-400">
          Экран входа — обязательный элемент ЛР3. Полная авторизация появится в следующих ЛР.
        </p>
      </div>
    </div>
  );
}
