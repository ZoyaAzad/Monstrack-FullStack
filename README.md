# Monstrack

Turn procrastination into progression.

Monstrack is a gamified productivity system where every task you complete evolves your personal monster. Productivity isn’t tracked — it’s experienced like a game.

---

##  Why Monstrack Exists

Traditional task managers don’t motivate users — they just list work.

Monstrack flips that:
- Every task = XP
- Every streak = evolution
- Every habit = visual growth of your monster

Productivity becomes addictive by design.

---

##  Core System

- Complete tasks → earn XP
- XP accumulates → level up
- Leveling → triggers monster evolution stages
- Progress is visual, not abstract

---

##  Tech Stack

- Next.js (App Router)
- Tailwind CSS v4
- Framer Motion
- Chart.js
- Axios
- Lucide Icons

---

##  Demo Mode

A fully functional mock system is included.

- Click **“Try Demo”**
- Explore pre-built tasks
- Watch monster evolution in real time

No backend required to experience the system.

---

##  Backend Design

Monstrack is built for scalable backend integration.

### Core Endpoints

- `POST /auth/login`
- `GET /user/me`
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

---

##  Evolution System

- 100 XP per level
- Egg → Hatchling → Rookie → Champion → Ultimate

Logic handled in:
- `utils/xpMath.js`
- `utils/evolutionRules.js`

---

##  Architecture

- `app/` → UI routes
- `components/` → UI system
- `hooks/` → state + auth logic
- `utils/` → game mechanics
- `lib/` → API + mock layer

---

##  Roadmap

- Real backend authentication
- Multiplayer monster progression (vision feature 👀)
- Leaderboards system
- Achievement badges
- Mobile optimization
