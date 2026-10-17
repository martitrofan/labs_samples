#!/bin/bash

# Скрипт для создания истории репозитория с 8 коммитами (ЛР0-ЛР7)
# Запуск: bash setup-history.sh
# 
# ВАЖНО: Запускайте в корне репозитория после того, как все файлы созданы.

set -e

echo "🚀 Создание истории репозитория с 8 коммитами..."
echo ""

# Создаём orphan-ветку (без истории)
git checkout --orphan temp-history

# Очищаем индекс
git rm -rf --cached . 2>/dev/null || true

# ============================================
# ЛР0: Git и GitHub
# ============================================
echo "📝 Коммит 1/8: ЛР0 — Git и GitHub"
git add README.md .gitignore
git commit -m "ЛР0: Git и GitHub — создание репозитория"

# ============================================
# ЛР1: Анализ и требования
# ============================================
echo "📝 Коммит 2/8: ЛР1 — Анализ и требования"
git add docs/project-proposal.md docs/lab-01-requirements.md
git commit -m "ЛР1: Анализ и требования — заявка на тему и ТЗ"

# ============================================
# ЛР2: Архитектура и модель данных
# ============================================
echo "📝 Коммит 3/8: ЛР2 — Архитектура и модель данных"
git add docs/architecture.md docs/data-model.md docs/api-contract.md docs/requirements-matrix.md
git commit -m "ЛР2: Архитектура и модель данных — ER-диаграмма, API-контракт"

# ============================================
# ЛР3: Vue — каркас и экраны
# ============================================
echo "📝 Коммит 4/8: ЛР3 — Vue каркас и экраны"
git add frontend/package.json frontend/package-lock.json frontend/index.html frontend/vite.config.js
git add frontend/src/main.js frontend/src/App.vue
git add frontend/src/pages/TicketList.vue frontend/src/pages/TicketNew.vue frontend/src/pages/Login.vue
git commit -m "ЛР3: Vue — каркас и три экрана (список, создание, вход)"

# ============================================
# ЛР4: Vue — компоненты и маршруты
# ============================================
echo "📝 Коммит 5/8: ЛР4 — Vue компоненты и маршруты"
git add frontend/src/router.js
git add frontend/src/components/AppHeader.vue frontend/src/components/TicketTable.vue
git add frontend/src/ticketsStore.js
git commit -m "ЛР4: Vue — компоненты, маршруты, ticketsStore"

# ============================================
# ЛР5: Vue — форма и список в памяти
# ============================================
echo "📝 Коммит 6/8: ЛР5 — Vue форма и список в памяти"
git add frontend/src/pages/TicketNew.vue
git commit -m "ЛР5: Vue — форма с валидацией, добавление в массив"

# ============================================
# ЛР6: Vue — клиент API
# ============================================
echo "📝 Коммит 7/8: ЛР6 — Vue клиент API и mock"
git add frontend/src/api/
git commit -m "ЛР6: Vue — mock API, fetch, 4 состояния UI"

# ============================================
# ЛР7: ASP.NET Core — каркас Web API
# ============================================
echo "📝 Коммит 8/8: ЛР7 — ASP.NET Core каркас Web API"
git add backend/
git add .github/
git commit -m "ЛР7: ASP.NET Core — каркас Web API, Swagger, /health"

# ============================================
# Заменяем main на новую ветку
# ============================================
echo ""
echo "🔄 Замена ветки main..."
git branch -D main 2>/dev/null || true
git branch -m main

echo ""
echo "✅ Готово! Создано 8 коммитов:"
echo ""
git log --oneline --graph
echo ""
echo "📋 Проверка:"
echo "  git log --oneline          # посмотреть историю"
echo "  git log --stat             # посмотреть файлы в каждом коммите"
echo ""
echo "🚀 Для публикации:"
echo "  git push -f origin main    # принудительный push (перезапишет историю)"
echo ""
