import React, { useState } from 'react';
import AppHeader from './components/AppHeader';
import TicketList from './pages/TicketList';
import TicketNew from './pages/TicketNew';
import Login from './pages/Login';
import LabDocs from './pages/LabDocs';

type MainTab = 'demo' | 'docs';

function App() {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [mainTab, setMainTab] = useState<MainTab>('demo');
  const [selectedLab, setSelectedLab] = useState(0);

  const labs = [
    { id: 0, name: 'ЛР0', title: 'Git и GitHub' },
    { id: 1, name: 'ЛР1', title: 'Анализ и требования' },
    { id: 2, name: 'ЛР2', title: 'Архитектура и модель данных' },
    { id: 3, name: 'ЛР3', title: 'Vue: каркас и экраны' },
    { id: 4, name: 'ЛР4', title: 'Vue: компоненты и маршруты' },
    { id: 5, name: 'ЛР5', title: 'Vue: форма и список в памяти' },
    { id: 6, name: 'ЛР6', title: 'Vue: клиент API' },
    { id: 7, name: 'ЛР7', title: 'ASP.NET Core: каркас Web API' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">🎓 РИС и Web — Лабораторные 2026</h1>
              <p className="text-blue-200 text-sm mt-1">
                Тема: Система управления заявками на ремонт оборудования | Vue 3 + ASP.NET Core + PostgreSQL
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMainTab('demo')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mainTab === 'demo' ? 'bg-white text-blue-700' : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                🖥️ Демо
              </button>
              <button
                onClick={() => setMainTab('docs')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mainTab === 'docs' ? 'bg-white text-blue-700' : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                📚 Документация
              </button>
            </div>
          </div>
        </div>
      </div>

      {mainTab === 'demo' ? (
        <>
          <AppHeader currentScreen={currentScreen} onNavigate={setCurrentScreen} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentScreen === 'list' && <TicketList />}
            {currentScreen === 'new' && (
              <TicketNew onCreated={() => setCurrentScreen('list')} />
            )}
            {currentScreen === 'login' && <Login />}
          </main>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar with lab list */}
            <aside className="md:w-64 flex-shrink-0">
              <div className="card p-4 sticky top-4">
                <h3 className="font-bold text-gray-900 mb-3">Лабораторные работы</h3>
                <nav className="space-y-1">
                  {labs.map(lab => (
                    <button
                      key={lab.id}
                      onClick={() => setSelectedLab(lab.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedLab === lab.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-mono text-xs">{lab.name}</span>{' '}
                      <span className="hidden md:inline">{lab.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <LabDocs labNumber={selectedLab} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              <p>Курс <strong>Б1.В.ДЭ.01.02.02</strong> · КГЭУ · семестр 1 · 2026/2027</p>
              <p>Стек: <strong>Vue 3 + ASP.NET Core + PostgreSQL</strong></p>
            </div>
            <div className="text-sm text-gray-400">
              <a href="https://martitrofan.github.io/ris-web-labs-2026/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                📖 Каталог курса →
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
