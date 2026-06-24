# TaskFlow

> A modern, full-stack task management system built with React, Node.js, Express, and PostgreSQL.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://prisma.io)

---

## Project Overview

TaskFlow is a production-quality Todo Management System built as a developer assignment submission. It demonstrates a clean separation of concerns between a React frontend and a Node.js REST API, connected to a cloud PostgreSQL database.

The UI is designed to feel like a modern SaaS product — dark mode, glassmorphism cards, smooth animations, and a responsive layout that works on all devices.

---

## Features

- ✅ **Full CRUD** — Create, read, update, and delete tasks
- 🎯 **Priority Management** — LOW / MEDIUM / HIGH with visual badges
- 📅 **Due Dates** — Track deadlines with overdue highlighting
- ✔️ **Completion Tracking** — Track when each task was completed
- 🔍 **Search** — Instant client-side search across title, description, and category
- 🗂️ **Filters** — All / Active / Completed tabs with live counts
- 📊 **Stats Dashboard** — Total, Completed, Pending, and High Priority counters
- 🔔 **Toast Notifications** — Success and error toasts for every action
- 💀 **Loading Skeletons** — Professional shimmer placeholder states
- ❌ **Error Handling** — Graceful error UI with retry actions
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router DOM |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Date Formatting | date-fns |
| Backend | Node.js, Express.js |
| ORM | Prisma |
| Database | PostgreSQL (Neon) |
| Frontend Deploy | Vercel (ready) |
| Backend Deploy | Render (ready) |

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                            │
│                                                           │
│   ┌─────────────────────────────────────────────────┐    │
│   │              React Frontend (Vite)               │    │
│   │                                                   │    │
│   │  Dashboard.jsx  ──────────  TodoDetails.jsx      │    │
│   │       │                           │               │    │
│   │  useTodos hook             api.getTodoById()      │    │
│   │       │                           │               │    │
│   │  services/api.js  ──  Axios  ─────┘               │    │
│   └────────────────┬────────────────────────────────┘    │
│                    │  HTTP (REST)                          │
└────────────────────┼──────────────────────────────────────┘
                     │
┌────────────────────▼──────────────────────────────────────┐
│                Node.js / Express Backend                    │
│                                                             │
│   server.js                                                 │
│      │                                                      │
│      ├── /api/todos  ──  todo.routes.js                    │
│      │        │                                             │
│      │        ├── validateTodo middleware                   │
│      │        └── todo.controller.js                        │
│      │                  │                                   │
│      │           todo.service.js  (Prisma queries)          │
│      │                  │                                   │
│      └── errorHandler middleware                            │
│                                                             │
└────────────────────┬────────────────────────────────────────┘
                     │  Prisma Client
┌────────────────────▼────────────────────────────────────────┐
│              Neon PostgreSQL (Cloud)                         │
│                                                              │
│   todos table                                                │
│   ┌──────────────────────────────────────────────────────┐  │
│   │ id · title · description · completed · priority      │  │
│   │ category · dueDate · completedAt · createdAt         │  │
│   │ updatedAt                                            │  │
│   └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## Database Schema

```prisma
model Todo {
  id          String    @id @default(cuid())
  title       String
  description String?
  completed   Boolean   @default(false)
  priority    Priority  @default(MEDIUM)
  category    String?
  dueDate     DateTime?
  completedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

---

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- A [Neon](https://neon.tech) PostgreSQL database (free tier is sufficient)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/challenge-2
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and add your DATABASE_URL from Neon

# 3. Generate Prisma client
npm run db:generate

# 4. Run database migrations
npm run db:migrate
# Enter migration name when prompted (e.g., "init")

# 5. Seed the database with sample data
npm run db:seed

# 6. Start development server
npm run dev
```

The API will be running at `http://localhost:5000`.
Health check: `http://localhost:5000/health`

---

## Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# .env already points to http://localhost:5000/api

# 3. Start development server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body | Success |
|--------|----------|-------------|--------------|---------|
| `GET` | `/todos` | List all todos | — | `200` + array |
| `GET` | `/todos/:id` | Get single todo | — | `200` + todo |
| `POST` | `/todos` | Create todo | `{ title*, description?, priority?, category?, dueDate? }` | `201` + todo |
| `PUT` | `/todos/:id` | Update todo | Any todo fields | `200` + todo |
| `DELETE` | `/todos/:id` | Delete todo | — | `200` + message |

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

---

## Prisma Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Create and apply a new migration
npm run db:migrate

# Push schema changes without migration (fast, dev only)
npm run db:push

# Seed the database with sample todos
npm run db:seed

# Open Prisma Studio (visual DB browser)
npm run db:studio

# Reset the database and re-run all migrations
npm run db:reset
```

---

## Folder Structure

```
challenge-2/
├── README.md
├── FEATURES.md
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.js             # Sample data seeder
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js     # Prisma client singleton
│   │   ├── controllers/
│   │   │   └── todo.controller.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validateTodo.js
│   │   ├── routes/
│   │   │   └── todo.routes.js
│   │   ├── services/
│   │   │   └── todo.service.js
│   │   └── utils/
│   │       └── ApiError.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/         # Reusable UI components
    │   ├── hooks/              # Custom React hooks
    │   ├── layouts/            # Page layout wrappers
    │   ├── pages/              # Route-level page components
    │   ├── services/           # API service layer
    │   ├── App.jsx             # Router setup
    │   ├── main.jsx
    │   └── index.css           # Design system + Tailwind
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

## Troubleshooting

### `P1001: Can't reach database server`
- Verify your `DATABASE_URL` in `.env` is correct and complete
- Ensure your Neon project is active (free tier projects may sleep)
- Check that `?sslmode=require` is appended to the connection string

### `CORS error in browser`
- Make sure `FRONTEND_URL` in the backend `.env` matches your frontend URL exactly (no trailing slash)
- Restart the backend server after changing `.env`

### `Vite cannot find module`
- Run `npm install` in the `frontend/` directory
- Delete `node_modules` and re-run `npm install` if issues persist

### `prisma generate` fails
- Make sure `DATABASE_URL` is set before running generate
- Try `npx prisma generate` directly

### Port already in use
- Backend default port is `5000`. Change `PORT` in `.env` if needed
- Frontend runs on `5173` by default. Vite will auto-increment if busy

---

## Deployment

### Backend → Render

1. Push code to GitHub
2. Create a new **Web Service** on Render
3. Set build command: `npm install && npx prisma generate`
4. Set start command: `npm start`
5. Add environment variables: `DATABASE_URL`, `NODE_ENV=production`, `FRONTEND_URL`

### Frontend → Vercel

1. Import the `frontend/` folder as a new Vercel project
2. Framework preset: **Vite**
3. Add environment variable: `VITE_API_URL=https://your-render-backend.onrender.com/api`

---

## Future Improvements

- [ ] User authentication (JWT + refresh tokens)
- [ ] Subtasks / checklist items within a todo
- [ ] Labels / multi-tag support
- [ ] Recurring tasks
- [ ] Drag-and-drop reordering
- [ ] Calendar view
- [ ] Email reminders for due dates
- [ ] Team collaboration / shared workspaces
- [ ] Dark / light theme toggle
- [ ] Offline support with service workers

---

## Deployment Status

The application is fully implemented, documented, and tested locally.

Deployment configuration for both Vercel (Frontend) and Render (Backend) has been prepared and documented. The project can be deployed by following the instructions provided below.

---

## Deployment

### Backend Deployment (Render)

1. Push the repository to GitHub.
2. Create a new Web Service on Render.
3. Set the root directory to:

```text
challenge-2/backend
```

4. Add the following environment variables:

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
PORT=10000
```

5. Deploy the service.

---

### Frontend Deployment (Vercel)

1. Import the repository into Vercel.
2. Set the root directory to:

```text
challenge-2/frontend
```

3. Add the following environment variable:

```env
VITE_API_URL=https://your-backend-url/api
```

4. Deploy the application.

---

## Project Verification

The project has been verified for:

* Successful production build
* Complete CRUD functionality
* PostgreSQL database integration
* Prisma ORM integration
* Responsive user interface
* Multi-page React application
* Express.js REST API
* Documentation completeness

---

## Future Improvements

* User Authentication
* Recurring Tasks
* Calendar View
* Team Collaboration
* Drag and Drop Task Ordering
* Email Notifications
* Offline Support
* Theme Customization
* Advanced Analytics Dashboard

---

## Author

**Ankush Jamuar**

B.Tech Information Technology

GitHub: https://github.com/ankush-jamuar

Developer Assignment Submission for Ziptrrip

