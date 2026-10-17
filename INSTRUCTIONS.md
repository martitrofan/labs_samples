# 📘 Инструкция по созданию истории репозитория

## Что сделано

Все файлы для 8 лабораторных работ уже созданы:
- ✅ ЛР0: README.md, .gitignore
- ✅ ЛР1: docs/project-proposal.md, docs/lab-01-requirements.md
- ✅ ЛР2: docs/architecture.md, data-model.md, api-contract.md, requirements-matrix.md
- ✅ ЛР3-ЛР6: frontend/ (Vue 3 приложение)
- ✅ ЛР7: backend/ (ASP.NET Core)

## Как создать пошаговую историю

### Шаг 1. Инициализируйте репозиторий (если ещё не сделано)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ-ЛОГИН/ris-web-labs-2026.git
```

### Шаг 2. Запустите скрипт создания истории

```bash
bash setup-history.sh
```

Скрипт:
1. Создаёт orphan-ветку (без истории)
2. Последовательно добавляет файлы по лабораторным
3. Создаёт 8 коммитов с понятными сообщениями
4. Заменяет main на новую ветку

### Шаг 3. Проверьте историю

```bash
git log --oneline --graph
```

Должно получиться:
```
* abc1234 (HEAD -> main) ЛР7: ASP.NET Core — каркас Web API, Swagger, /health
* def5678 ЛР6: Vue — mock API, fetch, 4 состояния UI
* ghi9012 ЛР5: Vue — форма с валидацией, добавление в массив
* jkl3456 ЛР4: Vue — компоненты, маршруты, ticketsStore
* mno7890 ЛР3: Vue — каркас и три экрана (список, создание, вход)
* pqr1234 ЛР2: Архитектура и модель данных — ER-диаграмма, API-контракт
* stu5678 ЛР1: Анализ и требования — заявка на тему и ТЗ
* vwx9012 ЛР0: Git и GitHub — создание репозитория
```

### Шаг 4. Опубликуйте на GitHub

```bash
git push -f origin main
```

⚠️ **Важно:** `-f` (force) перезапишет историю на GitHub. Используйте только если это новый репозиторий или вы уверены, что хотите заменить историю.

### Шаг 5. Включите GitHub Pages

1. Откройте репозиторий на GitHub
2. **Settings → Pages**
3. **Source:** выберите **GitHub Actions**
4. Готово! Сайт опубликуется автоматически

---

## Что делает скрипт

`setup-history.sh`:
1. Создаёт orphan-ветку `temp-history` (без предыдущей истории)
2. Очищает индекс
3. Последовательно добавляет файлы:
   - Коммит 1: README.md, .gitignore (ЛР0)
   - Коммит 2: docs/project-proposal.md, docs/lab-01-requirements.md (ЛР1)
   - Коммит 3: docs/architecture.md, data-model.md, api-contract.md, requirements-matrix.md (ЛР2)
   - Коммит 4: frontend/package.json, main.js, App.vue, pages/* (ЛР3)
   - Коммит 5: router.js, components/*, ticketsStore.js (ЛР4)
   - Коммит 6: pages/TicketNew.vue с валидацией (ЛР5)
   - Коммит 7: api/* (mock + fetch) (ЛР6)
   - Коммит 8: backend/* (ЛР7)
4. Удаляет старую ветку main
5. Переименовывает temp-history в main

---

## Альтернатива: ручное создание коммитов

Если скрипт не работает, можно создать коммиты вручную:

```bash
# ЛР0
git add README.md .gitignore
git commit -m "ЛР0: Git и GitHub — создание репозитория"

# ЛР1
git add docs/project-proposal.md docs/lab-01-requirements.md
git commit -m "ЛР1: Анализ и требования — заявка на тему и ТЗ"

# ЛР2
git add docs/architecture.md docs/data-model.md docs/api-contract.md docs/requirements-matrix.md
git commit -m "ЛР2: Архитектура и модель данных — ER-диаграмма, API-контракт"

# ЛР3
git add frontend/package.json frontend/package-lock.json frontend/index.html frontend/vite.config.js
git add frontend/src/main.js frontend/src/App.vue
git add frontend/src/pages/TicketList.vue frontend/src/pages/TicketNew.vue frontend/src/pages/Login.vue
git commit -m "ЛР3: Vue — каркас и три экрана (список, создание, вход)"

# ЛР4
git add frontend/src/router.js
git add frontend/src/components/AppHeader.vue frontend/src/components/TicketTable.vue
git add frontend/src/ticketsStore.js
git commit -m "ЛР4: Vue — компоненты, маршруты, ticketsStore"

# ЛР5
git add frontend/src/pages/TicketNew.vue
git commit -m "ЛР5: Vue — форма с валидацией, добавление в массив"

# ЛР6
git add frontend/src/api/
git commit -m "ЛР6: Vue — mock API, fetch, 4 состояния UI"

# ЛР7
git add backend/
git add .github/
git commit -m "ЛР7: ASP.NET Core — каркас Web API, Swagger, /health"
```

---

## Проверка

После создания истории проверьте:

```bash
# Количество коммитов
git log --oneline | wc -l
# Должно быть: 8

# Просмотр файлов в каждом коммите
git log --stat

# Проверка конкретного коммита
git show <commit-hash>
```

---

## Готово! 🎉

Теперь у вас:
- ✅ 8 коммитов с понятными сообщениями
- ✅ Каждый коммит соответствует одной лабораторной
- ✅ История показывает пошаговое выполнение курса
- ✅ Сайт опубликован на GitHub Pages
