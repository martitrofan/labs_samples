import React from 'react';

interface LabDocProps {
  labNumber: number;
}

const labContent: Record<number, { title: string; content: React.ReactNode }> = {
  0: {
    title: 'ЛР0: Git и GitHub',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Вход в курс. Создание репозитория, первый коммит, приглашение преподавателя.</p>
        
        <div className="card bg-gray-50">
          <h4 className="font-semibold text-sm mb-2">📁 Структура репозитория:</h4>
          <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">{`ваш-репозиторий/
├── README.md          ← ФИО, группа, тема
└── .gitignore         ← GitHub предложил при создании`}</pre>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">✅ Чеклист:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>✅ Аккаунт GitHub создан</li>
            <li>✅ Один репозиторий на семестр</li>
            <li>✅ README.md с ФИО и группой</li>
            <li>✅ Хотя бы один коммит с push</li>
            <li>✅ Репозиторий приватный</li>
            <li>✅ martitrofan в Collaborators</li>
            <li>✅ Ссылка отправлена через форму</li>
          </ul>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">🔑 Ключевые команды:</h4>
          <pre className="text-xs text-blue-900">{`git init
git add README.md
git commit -m "ЛР0: старт репозитория"
git branch -M main
git remote add origin https://github.com/USER/ris-web-2026.git
git push -u origin main`}</pre>
        </div>
      </div>
    ),
  },
  1: {
    title: 'ЛР1: Анализ и требования',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Выбор темы, заявка на тему, техническое задание.</p>
        
        <div className="card bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">📋 Наша тема:</h4>
          <p className="text-sm text-green-900"><strong>Система управления заявками на ремонт оборудования</strong></p>
          <ul className="mt-2 text-sm text-green-800 space-y-1">
            <li>• Главная сущность: <strong>заявка на ремонт</strong></li>
            <li>• Справочник: <strong>участок / агрегат</strong></li>
            <li>• Кто создаёт: <strong>диспетчер</strong></li>
            <li>• Кто исполняет: <strong>инженер</strong></li>
            <li>• Статусы: New → InProgress → Closed / Cancelled</li>
          </ul>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">📁 Файлы в Git:</h4>
          <pre className="text-xs bg-gray-50 p-3 rounded border">{`docs/
├── project-proposal.md      ← заявка на тему
└── lab-01-requirements.md   ← техническое задание`}</pre>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">📐 Три критерия:</h4>
          <div className="space-y-3 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <strong>1. Создать</strong><br/>
              <span className="text-gray-600">Дано:</span> Диспетчер вошёл.<br/>
              <span className="text-gray-600">Когда:</span> заполняет тему (5–80), участок (число &gt; 0), описание (10–500), жмёт «Создать».<br/>
              <span className="text-gray-600">Тогда:</span> запись со статусом <code>New</code> и номером RM-XXX.
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <strong>2. Назначить</strong><br/>
              <span className="text-gray-600">Дано:</span> Диспетчер и запись <code>New</code>.<br/>
              <span className="text-gray-600">Когда:</span> назначает исполнителя отдельным действием.<br/>
              <span className="text-gray-600">Тогда:</span> исполнитель записан; статус можно ещё не менять.
            </div>
            <div className="bg-green-50 p-3 rounded">
              <strong>3. В работу</strong><br/>
              <span className="text-gray-600">Дано:</span> Назначенный инженер вошёл.<br/>
              <span className="text-gray-600">Когда:</span> переводит свою запись New → InProgress.<br/>
              <span className="text-gray-600">Тогда:</span> статус «в работе»; чужой логин эту запись не двигает.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  2: {
    title: 'ЛР2: Архитектура и модель данных',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">ER-диаграмма, API-контракт, архитектурная схема.</p>

        <div className="card">
          <h4 className="font-semibold mb-3">🏗️ Архитектура (три узла):</h4>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <pre>{`┌─────────────────┐     HTTP      ┌──────────────────┐    SQL    ┌──────────────┐
│  Vue 3 + Vite   │ ────────────► │  ASP.NET Core    │ ────────► │  PostgreSQL  │
│  localhost:5173 │               │  localhost:5000  │           │  localhost   │
│                 │ ◄──────────── │                  │ ◄──────── │    :5432     │
└─────────────────┘   response    └──────────────────┘   data    └──────────────┘

                    архитектура web-ИС семестра`}</pre>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-3">📊 ER-модель:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-blue-300 rounded-lg p-3">
              <h5 className="font-bold text-blue-700 mb-2">Ticket (Заявка)</h5>
              <ul className="text-xs space-y-1 text-gray-700">
                <li><code className="bg-yellow-100 px-1">PK</code> id: int</li>
                <li>number: string</li>
                <li>title: string</li>
                <li>description: text</li>
                <li>status: enum</li>
                <li><code className="bg-blue-100 px-1">FK</code> siteId → Site</li>
                <li><code className="bg-blue-100 px-1">FK</code> createdByUserId → User</li>
                <li><code className="bg-blue-100 px-1">FK</code> assigneeUserId → User?</li>
              </ul>
            </div>
            <div className="border-2 border-green-300 rounded-lg p-3">
              <h5 className="font-bold text-green-700 mb-2">Site (Участок)</h5>
              <ul className="text-xs space-y-1 text-gray-700">
                <li><code className="bg-yellow-100 px-1">PK</code> id: int</li>
                <li>name: string</li>
              </ul>
              <p className="text-xs mt-2 text-gray-500">1:N → Ticket</p>
            </div>
            <div className="border-2 border-purple-300 rounded-lg p-3">
              <h5 className="font-bold text-purple-700 mb-2">User (Пользователь)</h5>
              <ul className="text-xs space-y-1 text-gray-700">
                <li><code className="bg-yellow-100 px-1">PK</code> id: int</li>
                <li>name: string</li>
                <li>role: enum</li>
              </ul>
              <p className="text-xs mt-2 text-gray-500">1:N → Ticket (созданные/назначенные)</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-3">🔌 API-контракт:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left">Метод</th>
                  <th className="px-3 py-2 text-left">Путь</th>
                  <th className="px-3 py-2 text-left">Тело</th>
                  <th className="px-3 py-2 text-left">Успех</th>
                  <th className="px-3 py-2 text-left">Ошибка</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="px-3 py-2 font-mono text-green-600">GET</td><td className="px-3 py-2 font-mono">/api/tickets</td><td className="px-3 py-2">—</td><td className="px-3 py-2">200, массив</td><td className="px-3 py-2">—</td></tr>
                <tr><td className="px-3 py-2 font-mono text-green-600">GET</td><td className="px-3 py-2 font-mono">/api/tickets/:id</td><td className="px-3 py-2">—</td><td className="px-3 py-2">200, объект</td><td className="px-3 py-2">404</td></tr>
                <tr><td className="px-3 py-2 font-mono text-blue-600">POST</td><td className="px-3 py-2 font-mono">/api/tickets</td><td className="px-3 py-2">title, siteId, description</td><td className="px-3 py-2">201, {`{id, number, status: 'New'}`}</td><td className="px-3 py-2">400</td></tr>
                <tr><td className="px-3 py-2 font-mono text-yellow-600">PATCH</td><td className="px-3 py-2 font-mono">/api/tickets/:id/assignee</td><td className="px-3 py-2">assigneeUserId</td><td className="px-3 py-2">200</td><td className="px-3 py-2">404</td></tr>
                <tr><td className="px-3 py-2 font-mono text-yellow-600">PATCH</td><td className="px-3 py-2 font-mono">/api/tickets/:id/status</td><td className="px-3 py-2">status</td><td className="px-3 py-2">200</td><td className="px-3 py-2">404, 409</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">🔍 Проверка 3НФ:</h4>
          <p className="text-sm text-yellow-900">
            Название участка хранится в сущности <code>Site</code> один раз. <code>Ticket</code> содержит 
            внешний ключ <code>siteId</code>. При переименовании участка меняется одна строка, 
            поэтому текст названия не дублируется в заявках.
          </p>
        </div>
      </div>
    ),
  },
  3: {
    title: 'ЛР3: Vue — каркас и экраны',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Первый код клиента: Vue 3, три экрана, Vite на порту 5173.</p>
        
        <div className="card bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">✅ Реализовано (демо на React):</h4>
          <ul className="text-sm text-green-900 space-y-1">
            <li>✅ Три экрана: Список, Создание, Вход</li>
            <li>✅ Переключение между экранами</li>
            <li>✅ Семантика: main, form, label, table</li>
            <li>✅ Тестовые данные в списке</li>
            <li>✅ :key для v-for (key в React)</li>
            <li>✅ autofocus на первом поле</li>
          </ul>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">📁 Структура:</h4>
          <pre className="text-xs bg-gray-50 p-3 rounded border">{`frontend/src/
├── main.js (main.tsx)
├── App.vue (App.tsx)
└── assets/`}</pre>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💻 Запуск:</h4>
          <pre className="text-xs text-blue-900">{`cd frontend
npm install
npm run dev
# Открыть http://localhost:5173`}</pre>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <strong>Примечание:</strong> В данном демо используется React вместо Vue для отображения, 
          но вся логика, структура экранов и семантика соответствуют требованиям ЛР3.
        </div>
      </div>
    ),
  },
  4: {
    title: 'ЛР4: Vue — компоненты и маршруты',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Компоненты, vue-router, три маршрута: /, /new, /login.</p>

        <div className="card">
          <h4 className="font-semibold mb-3">📁 Дерево файлов:</h4>
          <pre className="text-xs bg-gray-50 p-3 rounded border">{`frontend/src/
├── main.tsx
├── App.tsx
├── router.tsx              ← три маршрута
├── ticketsStore.ts         ← единственный общий массив
├── components/
│   ├── AppHeader.tsx       ← всегда виден
│   └── TicketTable.tsx     ← получает items через props
└── pages/
    ├── TicketList.tsx      ← /
    ├── TicketNew.tsx       ← /new
    └── Login.tsx           ← /login`}</pre>
        </div>

        <div className="card bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">✅ Реализовано:</h4>
          <ul className="text-sm text-green-900 space-y-1">
            <li>✅ AppHeader снаружи router-view</li>
            <li>✅ TicketTable получает items через props</li>
            <li>✅ ticketsStore — единственный массив</li>
            <li>✅ Три маршрута с навигацией</li>
            <li>✅ router-link эквивалент (кнопки навигации)</li>
          </ul>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">🗺️ Схема App.vue:</h4>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-xs">
            <pre>{`App.tsx
├── AppHeader          ← всегда виден
└── [router-view]      ← сюда подставляется текущая страница
    ├── TicketList     ← /
    ├── TicketNew      ← /new
    └── Login          ← /login`}</pre>
          </div>
        </div>
      </div>
    ),
  },
  5: {
    title: 'ЛР5: Vue — форма и список в памяти',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Форма создания добавляет запись в общий массив. Сервера нет.</p>

        <div className="card bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">✅ Три доказательства:</h4>
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Проверка</th>
                <th className="py-2 text-left">Что делаете</th>
                <th className="py-2 text-left">Факт</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-green-700 font-medium">Успех</td>
                <td className="py-2">Тема ≥ 5, siteId &gt; 0, описание ≥ 10</td>
                <td className="py-2">✅ Строка со статусом New появилась</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-red-700 font-medium">Отказ</td>
                <td className="py-2">Тема "abc" (3 символа)</td>
                <td className="py-2">✅ Ошибка видна, строка не появилась</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 font-medium">Память</td>
                <td className="py-2">F5 после создания</td>
                <td className="py-2">✅ Добавленная строка исчезла (ожидаемо)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">🔧 Поля формы:</h4>
          <ul className="text-sm space-y-1">
            <li>• <code>title</code> — v-model, 5–80 символов после trim</li>
            <li>• <code>siteId</code> — v-model.number, целое &gt; 0</li>
            <li>• <code>description</code> — v-model, 10–500 символов</li>
            <li>• <code>status</code> — всегда "New" (не от пользователя)</li>
            <li>• <code>@submit.prevent</code> — Enter не перезагружает</li>
          </ul>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Попробуйте прямо сейчас:</h4>
          <p className="text-sm text-blue-900">
            Перейдите на вкладку <strong>«Создать»</strong> и попробуйте:
          </p>
          <ol className="text-sm text-blue-800 mt-2 space-y-1 list-decimal list-inside">
            <li>Ввести тему из 3 символов → ошибка валидации</li>
            <li>Ввести нормальные данные → заявка создана</li>
            <li>Перейти на «Список» → новая строка видна</li>
          </ol>
        </div>
      </div>
    ),
  },
  6: {
    title: 'ЛР6: Vue — клиент API и mock',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">API-модуль, mock, четыре состояния UI, блокировка повторной отправки.</p>

        <div className="card">
          <h4 className="font-semibold mb-3">📁 Файлы API:</h4>
          <pre className="text-xs bg-gray-50 p-3 rounded border">{`frontend/src/api/
├── tickets.ts        ← getTickets, createTicket (fetch)
└── mockTickets.ts    ← задержка 500мс, учебные ответы

.env.example:
VITE_API_BASE_URL=http://localhost:5000`}</pre>
        </div>

        <div className="card bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">✅ Четыре состояния списка:</h4>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl mb-1">⏳</div>
              <div className="text-xs font-medium">loading</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl mb-1">📭</div>
              <div className="text-xs font-medium">empty</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-xs font-medium">data</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl mb-1">❌</div>
              <div className="text-xs font-medium">error</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">🛡️ Три отказа:</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-3 text-left">Отказ</th>
                <th className="py-2 px-3 text-left">Код</th>
                <th className="py-2 px-3 text-left">Сообщение</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3">Короткая тема</td>
                <td className="py-2 px-3 font-mono text-red-600">400</td>
                <td className="py-2 px-3">«Проверьте поля»</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Ошибка сервера</td>
                <td className="py-2 px-3 font-mono text-red-600">500</td>
                <td className="py-2 px-3">«Сервер не смог обработать»</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Нет связи</td>
                <td className="py-2 px-3 font-mono text-gray-600">catch</td>
                <td className="py-2 px-3">«Нет связи с сервером»</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">🔒 Защита от двойного клика:</h4>
          <pre className="text-xs text-yellow-900">{`if (isSubmitting) return
isSubmitting = true
try { await createTicket(body) }
finally { isSubmitting = false }
// Кнопка: disabled={isSubmitting}`}</pre>
        </div>
      </div>
    ),
  },
  7: {
    title: 'ЛР7: ASP.NET Core — каркас Web API',
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Первый сервер: ASP.NET Core на порту 5000, Swagger, /health, /info.</p>

        <div className="card">
          <h4 className="font-semibold mb-3">📁 Структура backend:</h4>
          <pre className="text-xs bg-gray-50 p-3 rounded border">{`backend/
├── backend.csproj
├── Program.cs
├── appsettings.json
├── Properties/
│   └── launchSettings.json    ← HTTP-порт 5000
├── Controllers/
│   └── .gitkeep
├── Services/
│   └── .gitkeep
├── Models/
│   └── .gitkeep
└── Data/
    └── .gitkeep`}</pre>
        </div>

        <div className="card bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">🌐 Адреса:</h4>
          <table className="w-full text-sm mt-2">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-mono text-blue-600">http://localhost:5000/swagger</td>
                <td className="py-2">Swagger UI</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono text-green-600">GET /health</td>
                <td className="py-2">200, "ok" (только живость!)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-purple-600">GET /info</td>
                <td className="py-2">Имя приложения, среда</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card bg-red-50 border-red-200">
          <h4 className="font-semibold text-red-800 mb-2">⚠️ /health ≠ создание:</h4>
          <ul className="text-sm text-red-900 space-y-1">
            <li>• /health возвращает 200 БЕЗ тела заявки</li>
            <li>• /health НЕ принимает title, siteId, description</li>
            <li>• Успешный /health НЕ доказывает работу POST</li>
            <li>• Создание объекта → ЛР8</li>
          </ul>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💻 Запуск:</h4>
          <pre className="text-xs text-blue-900">{`cd backend
dotnet restore
dotnet run
# API: http://localhost:5000
# Swagger: http://localhost:5000/swagger`}</pre>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">🔧 DI (Dependency Injection):</h4>
          <p className="text-sm text-gray-700">
            Сервис зарегистрирован через DI, чтобы контроллер не создавал реализацию через <code>new</code>. 
            Позже вместо списка в памяти появится PostgreSQL.
          </p>
        </div>
      </div>
    ),
  },
};

export default function LabDocs({ labNumber }: LabDocProps) {
  const lab = labContent[labNumber];
  if (!lab) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{lab.title}</h2>
      {lab.content}
    </div>
  );
}
