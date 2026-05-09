#!/bin/bash

# Скрипт для запуска локальной разработки и тестов

echo "🚀 Запуск QA Automation Suite..."

# Проверка зависимостей
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

# Загрузка переменных окружения
if [ ! -f ".env" ]; then
    echo "❌ Файл .env не найден. Скопируйте .env.example в .env и заполните значения."
    exit 1
fi

echo "✅ Все готово!"
echo ""
echo "Доступные команды:"
echo "  npm test              - Запуск всех тестов"
echo "  npm run test:ui       - Запуск с интерактивным UI"
echo "  npm run test:headed   - Запуск с видимым браузером"
echo "  npm run test:debug    - Debug режим"
echo "  npm run test:smoke    - Smoke тесты"
echo "  npm run test:report   - Просмотр отчета"
echo "  npm run codegen       - Запись действий пользователя"
