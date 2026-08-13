# 🦃 Grampus — Avito Backend

Backend-сервис для хранения, обработки и отправки сообщений с платформой [Авито](https://avito.ru) через официальный API.

## 📋 О проекте

Grampus — это серверное приложение, которое решает следующие задачи:

- **Хранение данных** — управление аккаунтами Авито, пользователями и чатами с персистентным хранением в PostgreSQL и кэшированием через Redis.
- **Обработка сообщений** — парсинг, маршрутизация и бизнес-логика входящих/исходящих сообщений из чатов Авито.
- **Отправка сообщений** — формирование и доставка ответов через API Авито с ретрай-логикой и обработкой ошибок.

## 🏗 Архитектура

Проект построен на [NestJS](https://nestjs.com/) и следует модульной архитектуре:

```
src/
├── modules/
│   ├── avito/          # Доменная логика Авито (CQRS, сервисы, репозитории)
│   ├── database/       # Подключение к PostgreSQL + Sequelize ORM
│   ├── redis/          # Кэширование и временное хранение через Redis
│   └── health/         # Health-check эндпоинты
├── shared/             # Общие утилиты, DTO, перехватчики, фильтры
└── main.ts             # Точка входа приложения
```

### Ключевые паттерны

| Паттерн | Библиотека | Зачем |
|---------|-----------|-------|
| **CQRS** | `@nestjs/cqrs` | Разделение команд (запись) и запросов (чтение) |
| **ORM** | `sequelize` + `pg` | Персистентность в PostgreSQL |
| **Кэширование** | `ioredis` | Быстрый доступ к данным, блокировки, сессии |
| **HTTP-клиент** | `axios` | Взаимодействие с внешним API Авито |
| **Валидация** | `class-validator` + `class-transformer` | Проверка входящих данных |

## 🚀 Быстрый старт

### Требования

- Node.js >= 18
- pnpm
- PostgreSQL
- Redis

### Установка

```bash
$ pnpm install
```

### Настройка

Скопируйте пример окружения и заполните значения:

```bash
$ cp .env.example .env
```

Необходимые переменные окружения:

| Переменная | Описание |
|-----------|----------|
| `DATABASE_HOST` | Хост PostgreSQL |
| `DATABASE_PORT` | Порт PostgreSQL |
| `DATABASE_USER` | Пользователь БД |
| `DATABASE_PASSWORD` | Пароль БД |
| `DATABASE_NAME` | Имя базы данных |
| `REDIS_HOST` | Хост Redis |
| `REDIS_PORT` | Порт Redis |
| `REDIS_USER` | Пользователь Redis |
| `REDIS_PASSWORD` | Пароль Redis |
| `REDIS_DB_NUMBER` | Номер БД Redis |

### Запуск

```bash
# Development-режим с hot-reload
$ pnpm run start:dev

# Production-режим
$ pnpm run build
$ pnpm run start:prod
```

## 🛠 Скрипты

| Команда | Описание |
|---------|----------|
| `pnpm run start` | Запуск приложения |
| `pnpm run start:dev` | Запуск в watch-режиме |
| `pnpm run start:debug` | Запуск с debugger |
| `pnpm run build` | Сборка в `dist/` |
| `pnpm run lint` | Lint + автофикс |
| `pnpm run format` | Форматирование Prettier |
| `pnpm run test` | Unit-тесты |
| `pnpm run test:cov` | Тесты с coverage |

## 📡 API

После запуска приложение предоставляет REST API. Документация Swagger доступна по адресу:

```
http://localhost:3000/api/docs
```

### Текущие эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/health` | Health-check |
| `GET` | `/v1/accounts` | Список аккаунтов Авито |
| `POST` | `/v1/accounts` | Создание аккаунта Авито |
| `GET` | `/v1/accounts/:id` | Аккаунт по ID |
| `GET` | `/v1/accounts/:id/chats` | Чаты аккаунта |

## 📐 Модули проекта

### AvitoModule

Основной доменный модуль, отвечающий за взаимодействие с платформой Авито:

- **Command Handler** — обработка команд создания аккаунтов и пользователей
- **Query Handler** — запросы списка, получения по ID и client-id
- **Services** — бизнес-логика аккаунтов, чатов, вызовов внешнего API
- **Repositories** — доступ к данным через Sequelize
- **Models** — ORM-модели `Account`, `User`, `Chat`

### DatabaseModule

Подключение к PostgreSQL через Sequelize с поддержкой auto-load моделей.

### RedisModule

Кэширование данных и временное хранение:

- Конфигурация через переменные окружения
- Retry-стратегия с exponential backoff
- Обертка `RedisService` над ioredis (set/get/del + TTL)
- Централизованный реестр ключей (`REDIS_KEYS`)

### HealthModule

Эндпоинт проверки доступности сервиса.

## 🔮 Планы развития

- [ ] Захват и обработка входящих сообщений из чатов Авито
- [ ] Автоматическая отправка ответов через API
- [ ] Очередь задач для ретрая неудачных запросов
- [ ] Rate-limiting при вызовах внешнего API
- [ ] Логирование переписки в БД
- [ ] WebSocket-уведомления о новых сообщениях

## 📄 License

UNLICENSED
