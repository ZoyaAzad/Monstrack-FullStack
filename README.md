# Monstrack

Turn procrastination into progression.

Monstrack is a gamified productivity system where every task you complete evolves your personal monster. Productivity isn’t tracked it’s experienced like a game, designed to make discipline addictive through visual progression and XP mechanics.

---

##  Why Monstrack Exists

Traditional task managers fail because they treat productivity as a checklist problem.

Monstrack reframes it as a progression system:

- Every task = XP
- Every streak = evolution trigger
- Every habit = visible monster growth

Instead of tracking work, users *experience growth*.

---

##  Core System

- Complete tasks → earn XP
- XP accumulates → level up
- Leveling → unlocks monster evolution stages
- Progress is visual, behavioral, and feedback-driven

This creates a closed-loop motivation system:
**Action → Reward → Visual Growth → Repeat**

---

##  Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS v4
- Framer Motion (animations)
- Chart.js (analytics dashboards)
- Axios (API handling)
- Lucide Icons (UI system)

### Backend
- NestJS (Node.js framework)
- TypeScript (type-safe architecture)
- REST API architecture
- JWT Authentication system
- Modular service-based structure (Users, Tasks, XP modules)

### Database
- PostgreSQL   
- Structured for scalable user progression + task tracking

---

##  Demo Mode

A fully functional demo system is included with mock data.

- Click **“Try Demo”**
- Explore tasks, XP gain, and monster evolution
- Experience full gamification flow without backend setup

---

##  Backend Architecture

Monstrack is designed as a scalable full-stack system with clear separation of concerns.

### Core API Endpoints

- `POST /auth/login` → User authentication (JWT)
- `GET /user/me` → Fetch user profile + monster state
- `GET /tasks` → Retrieve user tasks
- `POST /tasks` → Create new task
- `PATCH /tasks/:id` → Update task status / completion
- `DELETE /tasks/:id` → Remove task

---

###  Backend Modules

- **Auth Module**
  - JWT-based authentication
  - Secure session handling

- **Users Module**
  - User profile management
  - Stores XP, level, monster evolution state

- **Tasks Module**
  - Full CRUD operations
  - Task-to-XP conversion logic

- **XP Module**
  - Central progression engine
  - Handles leveling rules and evolution triggers

---

###  Data Model (Simplified)

**Users**
- id
- email
- password (hashed)
- xp
- level
- monster_stage

**Tasks**
- id
- title
- xp_value
- status
- user_id

---

##  Evolution System

- 100 XP = 1 level
- Evolution stages:
  - Egg
  - Hatchling
  - Rookie
  - Champion
  - Ultimate

Core logic is implemented in:
- `utils/xpMath.js`
- `utils/evolutionRules.js`

---

##  Architecture Overview

Frontend (Next.js UI)
        ↓
API Layer (NestJS Backend)
        ↓
Service Layer (XP / Tasks / Users)
        ↓
Database (PostgreSQL / MongoDB)

This separation ensures scalability and maintainability.

---

## My Contribution

This project was built as a collaborative full-stack system.

### My Contributions:
- Designed and developed the **entire backend architecture (NestJS)**
- Implemented:
  - Authentication system (JWT)
  - Task management APIs
  - XP and leveling logic system
- Structured modular backend design (Users / Tasks / XP separation)
- Integrated backend-ready API layer for frontend consumption
- Defined database schema for user progression system

### Collaborative Work:
- Frontend UI and gamified experience developed with team collaboration
- Shared integration between frontend state system and backend APIs

---

##  Roadmap

- Real-time multiplayer monster progression
- Global leaderboard system
- Achievement and badge system
- Mobile-first optimization
- AI-driven productivity insights (future vision)

---

##  Vision

Monstrack is not just a task manager — it is a behavioral reinforcement engine.

It merges:
- productivity systems
- game mechanics
- visual progression psychology

to turn discipline into an engaging feedback loop.
