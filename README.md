# 🔧 Система управления заявками на ремонт оборудования

**Курс:** РИС и Web (Б1.В.ДЭ.01.02.02) · КГЭУ · семестр 1 · 2026/2027  
**Стек:** Vue 3 + ASP.NET Core + PostgreSQL

---

## 👤 Автор

**ФИО:** [Ваше ФИО]  
**Группа:** [Ваша группа]  
**GitHub:** [@ваш-логин](https://github.com/ваш-логин)

---

## 📚 Лабораторные работы

| № | Тема | Описание |
|---|------|----------|
| ЛР0 | Git и GitHub | Создание репозитория, первый коммит |
| ЛР1 | Анализ и требования | Заявка на тему, ТЗ, три критерия |
| ЛР2 | Архитектура и модель данных | ER-диаграмма, API-контракт, 3НФ |
| ЛР3 | Vue: каркас и экраны | Три экрана: список, создание, вход |
| ЛР4 | Vue: компоненты и маршруты | vue-router, AppHeader, TicketTable, store |
| ЛР5 | Vue: форма и список в памяти | Валидация, v-model, addItem |
| ЛР6 | Vue: клиент API | Mock API, fetch, 4 состояния UI |
| ЛР7 | ASP.NET Core: каркас Web API | Swagger, /health, DI, контроллеры |

---

## 🔄 Создание истории репозитория

Этот репозиторий содержит все файлы для 8 лабораторных работ. Чтобы создать пошаговую историю с отдельным коммитом на каждую ЛР:

```bash
bash setup-history.sh
```

Скрипт создаст 8 коммитов:
1. `ЛР0: Git и GitHub — создание репозитория`
2. `ЛР1: Анализ и требования — заявка на тему и ТЗ`
3. `ЛР2: Архитектура и модель данных — ER-диаграмма, API-контракт`
4. `ЛР3: Vue — каркас и три экрана`
5. `ЛР4: Vue — компоненты, маршруты, ticketsStore`
6. `ЛР5: Vue — форма с валидацией, добавление в массив`
7. `ЛР6: Vue — mock API, fetch, 4 состояния UI`
8. `ЛР7: ASP.NET Core — каркас Web API, Swagger, /health`

---

## 🖥️ Локальный запуск

### Frontend (Vue 3)

```bash
cd frontend
npm install
npm run dev
```

Открыть: http://localhost:5173

### Backend (ASP.NET Core)

```bash
cd backend
dotnet restore
dotnet run
```

- API: http://localhost:5000
- Swagger: http://localhost:5000/swagger
- Health: http://localhost:5000/health

---

## 🚀 Публикация на GitHub Pages

Автоматический деплой через GitHub Actions при push в `main`.

**Настройка:**
1. Settings → Pages → Source: **GitHub Actions**
2. Готово! Следующий push опубликует сайт

Адрес: `https://<username>.github.io/<repo-name>/`

---

## 📁 Структура проекта

```
.
├── .github/workflows/deploy.yml   # GitHub Actions
├── docs/                          # Документация ЛР0-ЛР2
│   ├── project-proposal.md
│   ├── lab-01-requirements.md
│   ├── architecture.md
│   ├── data-model.md
│   ├── api-contract.md
│   └── requirements-matrix.md
├── frontend/                      # Vue 3 (ЛР3-ЛР6)
│   ├── src/
│   │   ├── api/                   # Mock API + fetch
│   │   ├── components/            # AppHeader, TicketTable
│   │   ├── pages/                 # TicketList, TicketNew, Login
│   │   ├── App.vue
│   │   ├── router.js
│   │   ├── ticketsStore.js
│   │   └── main.js
│   └── package.json
├── backend/                       # ASP.NET Core (ЛР7)
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   ├── Program.cs
│   └── backend.csproj
├── setup-history.sh               # Скрипт создания истории
├── README.md
└── .gitignore
```

---

## 🎯 Тема проекта

**Система управления заявками на ремонт оборудования**

- **Главная сущность:** Заявка на ремонт
- **Справочник:** Участок / агрегат (5 записей)
- **Роли:**
  - 👤 Диспетчер — создаёт заявки, назначает исполнителей
  - 🔧 Инженер — принимает в работу, закрывает заявки
- **Статусы:** New → InProgress → Closed / Cancelled

---

## 🔗 Ссылки

- [Каталог курса РИС и Web 2026](https://martitrofan.github.io/ris-web-labs-2026/)
