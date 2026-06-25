# TaskFlow

> A modern, full-stack task management system built with React, Node.js, Express.js, Prisma ORM, and PostgreSQL.

**Developer Assignment Submission for Ziptrrip**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://prisma.io)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=black)](https://render.com)

---

# 🌐 Live Demo

### Frontend (Vercel)

https://ziptrip-phi.vercel.app

### Backend API (Render)

https://taskflow-api-ivd2.onrender.com

---

# Project Overview

TaskFlow is a production-quality Todo Management System developed as part of the Ziptrrip Developer Assignment.

The project demonstrates modern full-stack development using React, Express.js, Prisma ORM, and PostgreSQL while following clean architecture principles, reusable component design, and responsive UI practices.

The application provides a clean, premium dark-themed interface with glassmorphism effects, responsive layouts, toast notifications, loading skeletons, and complete CRUD functionality backed by a cloud PostgreSQL database.

---

# Features

- ✅ Create Todo
- ✅ Update Todo
- ✅ Delete Todo
- ✅ Mark Todo as Completed
- ✅ View Todo Details
- ✅ Search Todos
- ✅ Filter Todos (All / Active / Completed)
- ✅ Priority Management (Low / Medium / High)
- ✅ Due Date Support
- ✅ Completion Tracking
- ✅ Dashboard Statistics
- ✅ Loading Skeletons
- ✅ Beautiful Empty State
- ✅ Splash Screen
- ✅ Toast Notifications
- ✅ Responsive Design
- ✅ REST API
- ✅ PostgreSQL Database
- ✅ Prisma ORM
- ✅ Production Deployment

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 18 |
| Build Tool | Vite |
| Routing | React Router DOM |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Date Formatting | date-fns |
| Backend | Node.js |
| API | Express.js |
| ORM | Prisma |
| Database | PostgreSQL (Neon) |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

# Architecture

```text
                        Browser
                           │
                           │
                   React Frontend
                    (Vite + React)
                           │
            React Router + Axios API Layer
                           │
                           │
                   REST API Requests
                           │
                           ▼
                 Express.js Backend
                           │
                Controllers & Services
                           │
                     Prisma ORM
                           │
                           ▼
                PostgreSQL (Neon Cloud)
```

---

# Database Schema

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

# Installation

## Prerequisites

- Node.js 18 or above
- npm
- PostgreSQL Database (Neon Recommended)

---

## Clone Repository

```bash
git clone https://github.com/ankush-jamuar/Ziptrip.git

cd Ziptrip/challenge-2
```

---

# Environment Variables

## Backend (`backend/.env`)

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
NODE_ENV=development

# Development
FRONTEND_URL=http://localhost:5173

# Production
# FRONTEND_URL=https://ziptrip-phi.vercel.app
```

---

## Frontend (`frontend/.env`)

```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production
# VITE_API_URL=https://taskflow-api-ivd2.onrender.com/api
```

---

# Backend Setup

```bash
cd backend

npm install

cp .env.example .env

npm run db:generate

npm run db:migrate

npm run db:seed

npm run dev
```

Backend will run at:

```
http://localhost:5000
```

Health Endpoint

```
http://localhost:5000/health
```

---

# Frontend Setup

```bash
cd frontend

npm install

cp .env.example .env

npm run dev
```

Frontend will run at:

```
http://localhost:5173
---

# API Endpoints

## Development

```
http://localhost:5000/api
```

## Production

```
https://taskflow-api-ivd2.onrender.com/api
```

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/todos` | Fetch all todos |
| GET | `/todos/:id` | Fetch a specific todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update an existing todo |
| DELETE | `/todos/:id` | Delete a todo |

---

## Sample Request

### Create Todo

```http
POST /api/todos
```

```json
{
  "title": "Complete Developer Assignment",
  "description": "Submit before deadline",
  "priority": "HIGH",
  "category": "Assignment",
  "dueDate": "2026-06-30T10:00:00.000Z"
}
```

---

## Sample Success Response

```json
{
  "success": true,
  "message": "Todo created successfully.",
  "data": {
    "id": "...",
    "title": "...",
    "description": "...",
    "priority": "HIGH"
  }
}
```

---

## Sample Error Response

```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

# Prisma Commands

Generate Prisma Client

```bash
npm run db:generate
```

Create Migration

```bash
npm run db:migrate
```

Push Schema

```bash
npm run db:push
```

Seed Database

```bash
npm run db:seed
```

Open Prisma Studio

```bash
npm run db:studio
```

Reset Database

```bash
npm run db:reset
```

---

# Folder Structure

```text
challenge-2
│
├── README.md
├── FEATURES.md
│
├── backend
│   ├── prisma
│   │   ├── migrations
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend
    ├── public
    ├── src
    │   ├── components
    │   ├── hooks
    │   ├── layouts
    │   ├── pages
    │   ├── services
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

# Troubleshooting

### Database Connection Error

- Verify `DATABASE_URL` is correct.
- Ensure Neon database is active.
- Run:

```bash
npm run db:generate
npm run db:migrate
```

---

### CORS Issues

Verify the backend environment variable:

```env
FRONTEND_URL=https://ziptrip-phi.vercel.app
```

Restart or redeploy the backend after changing environment variables.

---

### Prisma Errors

Run:

```bash
npm run db:generate
```

If migrations are pending:

```bash
npx prisma migrate deploy
```

---

### Build Errors

Delete dependencies and reinstall.

```bash
rm -rf node_modules
npm install
```

---

### Port Already in Use

Backend

```
5000
```

Frontend

```
5173
```

Change ports inside `.env` if required.

---

# Deployment

## Frontend

Platform

```
Vercel
```

Framework

```
Vite
```

Root Directory

```
challenge-2/frontend
```

Build Command

```bash
npm run build
```

Output Directory

```
dist
```

Environment Variable

```env
VITE_API_URL=https://taskflow-api-ivd2.onrender.com/api
```

---

## Backend

Platform

```
Render
```

Root Directory

```
challenge-2/backend
```

Build Command

```bash
npm install && npx prisma@5.22.0 migrate deploy && npx prisma@5.22.0 generate
```

Start Command

```bash
npm start
```

Environment Variables

```env
DATABASE_URL=<Neon PostgreSQL URL>

NODE_ENV=production

PORT=10000

FRONTEND_URL=https://ziptrip-phi.vercel.app
```

---

# Live Application

## Frontend

https://ziptrip-phi.vercel.app

## Backend API

https://taskflow-api-ivd2.onrender.com
---

# Project Status

| Feature | Status |
|---------|--------|
| Challenge 1 | ✅ Completed |
| Challenge 2 | ✅ Completed |
| Full CRUD Operations | ✅ |
| PostgreSQL Integration | ✅ |
| Prisma ORM | ✅ |
| Responsive Design | ✅ |
| REST API | ✅ |
| Search & Filters | ✅ |
| Priority Management | ✅ |
| Due Date Support | ✅ |
| Dashboard Statistics | ✅ |
| Loading Skeletons | ✅ |
| Empty State | ✅ |
| Splash Screen | ✅ |
| Toast Notifications | ✅ |
| Production Deployment | ✅ |
| Frontend Live | ✅ |
| Backend Live | ✅ |

---

# Key Highlights

- Built using a modern full-stack architecture.
- Clean separation of concerns between frontend and backend.
- Cloud PostgreSQL database using Neon.
- Prisma ORM for type-safe database operations.
- Responsive UI built with React and Tailwind CSS.
- Production deployment using Vercel and Render.
- Complete RESTful API implementation.
- Modern dark UI with glassmorphism design.
- Reusable component-based architecture.
- Well-documented project structure and setup guide.

---

# Future Improvements

Although the assignment requirements have been fully completed, the following features can be added in future versions:

- User Authentication (JWT / OAuth)
- Team Collaboration
- Shared Workspaces
- Drag & Drop Task Ordering
- Calendar View
- Email Notifications
- Push Notifications
- File Attachments
- Activity History
- Recurring Tasks
- Labels & Tags
- Offline Support (PWA)
- Theme Customization
- Analytics Dashboard
- AI-powered Task Suggestions

---

# Learning Outcomes

This project provided practical experience with:

- Building scalable REST APIs using Express.js
- Database modeling with Prisma ORM
- PostgreSQL integration using Neon
- React component architecture
- State management using custom hooks
- Axios-based API communication
- CRUD application development
- Production deployment on Vercel and Render
- CORS configuration
- Environment variable management
- Error handling and validation
- Responsive UI development

---

# Repository

GitHub Repository

https://github.com/ankush-jamuar/Ziptrip

---

# Live Demo

Frontend

https://ziptrip-phi.vercel.app

Backend API

https://taskflow-api-ivd2.onrender.com

---

# Author

**Ankush Jamuar**

B.Tech Information Technology

Lovely Professional University

GitHub  
https://github.com/ankush-jamuar

Email  
ankush.jamuar@gmail.com

---

# Acknowledgements

This project was developed as part of the **Ziptrrip Developer Assignment**.

The goal of the assignment was to demonstrate:

- Full-stack development skills
- Clean project architecture
- REST API development
- Database integration
- Responsive frontend development
- Code organization
- Documentation
- Deployment of a production-ready application

---

Thank you for taking the time to review this project.
