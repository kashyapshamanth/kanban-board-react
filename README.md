## React Kanban Board

A three-column Kanban board built with React + Vite. Cards support drag-and-drop between **To Do**, **In Progress**, and **Done** columns, including position reordering inside the same column. A form above the board lets you add new tasks (title + short description) to any column. Board state is persisted in `localStorage`, so reloading keeps your layout.

### Prerequisites

- Node.js 18+
- npm (bundled with Node). Network access is required the first time you run `npm install`.

### Setup

```bash
cd /Users/shamanthkashyapn/Desktop/kanban-board-react
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

### Customize

- Edit the initial board state in `src/App.jsx` (`initialColumns` array).
- Add new columns by pushing entries into the array—no extra wiring required.
- Tweak visuals in `src/styles.css`.
- Adjust or expand the “Add Task” form in `AddCardForm.jsx` to capture more metadata.

# kanban-board-react
Kanban Board Project - React
