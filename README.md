# Monstrack Frontend

Monstrack is a gamified task tracker where your habits evolve a personal monster.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Charts:** Chart.js with react-chartjs-2
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## Demo Mode
The app includes a fully functional demo mode using mock data.
- Click "Try Demo" in the header or "Explore Demo" on the landing page.
- This will log you in as a demo user with pre-populated tasks and monster state.

## Backend Integration
The frontend is designed to be easily connected to a backend.

### API Client
`lib/apiClient.js` is pre-configured with Axios.
- Set `NEXT_PUBLIC_API` environment variable to your backend URL.
- The client automatically attaches the `Authorization` header if a token is found in localStorage.

### Expected Endpoints
Implement the following endpoints in your backend:

- `POST /auth/login` - Body: `{ email, password }`. Returns: `{ token, user }`
- `GET /user/me` - Returns current user data including monster state.
- `GET /tasks` - Returns list of tasks.
- `POST /tasks` - Body: `{ title, domain, xp, dueDate, verified }`.
- `PATCH /tasks/:id` - Update task status or details.
- `DELETE /tasks/:id` - Delete a task.

### Evolution Rules
Logic for XP and evolution is located in `utils/evolutionRules.js` and `utils/xpMath.js`.
- **XP per Level:** 100
- **Stages:** Egg (Lvl 1), Hatchling (Lvl 2-4), Rookie (Lvl 5-9), Champion (Lvl 10-19), Ultimate (Lvl 20+)

## Project Structure
- `app/` - Next.js App Router pages and layout.
- `components/` - Reusable UI components.
- `hooks/` - Custom React hooks (Auth, DemoData).
- `lib/` - Utilities and mock data.
- `styles/` - Global styles and Tailwind config.
- `utils/` - Helper functions for game logic.

## TODO
- [ ] Connect to real backend API.
- [ ] Implement real authentication in `hooks/useAuth.js`.
- [ ] Add unit tests for evolution logic.
- [ ] Add more monster variations and animations.
