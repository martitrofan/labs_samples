import React from 'react';

interface AppHeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function AppHeader({ currentScreen, onNavigate }: AppHeaderProps) {
  const links = [
    { id: 'list', label: '📋 Список заявок' },
    { id: 'new', label: '➕ Создать' },
    { id: 'login', label: '🔐 Вход' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            <h1 className="text-lg font-bold text-gray-900">РемонтОборудования</h1>
          </div>
          <nav className="flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentScreen === link.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
