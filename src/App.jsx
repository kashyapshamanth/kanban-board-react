import { useEffect, useMemo, useState } from "react";
import AddCardForm from "./components/AddCardForm.jsx";
import Board from "./components/Board.jsx";

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "task-1",
        title: "Set up project",
        description: "Initialize React + Vite structure.",
      },
      {
        id: "task-2",
        title: "Design column layout",
        description: "Create three responsive columns.",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "task-3",
        title: "Wire drag & drop",
        description: "Implement HTML5 DnD handlers.",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "task-4",
        title: "Gather requirements",
        description: "Understand board interactions.",
      },
    ],
  },
];

const STORAGE_KEY = "kanban-board-react:v1";

export default function App() {
  const [columns, setColumns] = useState(() => {
    if (typeof window === "undefined") return initialColumns;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialColumns;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return initialColumns;
      return parsed;
    } catch {
      return initialColumns;
    }
  });
  const [draggedCard, setDraggedCard] = useState(null);
  const [hoverSlot, setHoverSlot] = useState(null);
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    columnId: initialColumns[0].id,
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    } catch {
      // ignore storage errors
    }
  }, [columns]);

  const columnMap = useMemo(() => {
    const map = new Map();
    columns.forEach((col) => map.set(col.id, col));
    return map;
  }, [columns]);

  const canSubmit =
    newCard.title.trim().length > 0 && newCard.description.trim().length > 0;

  const handleAddCard = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    const card = {
      id: `task-${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`,
      title: newCard.title.trim(),
      description: newCard.description.trim(),
    };

    setColumns((prev) => addCard(prev, newCard.columnId, card));
    setNewCard((prev) => ({
      ...prev,
      title: "",
      description: "",
    }));
  };

  const handleDragStart = (columnId, cardId) => () => {
    setDraggedCard({ columnId, cardId });
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setHoverSlot(null);
  };

  const handleDragOverColumn = (columnId, index) => (event) => {
    event.preventDefault();
    setHoverSlot({ columnId, index });
  };

  const handleDrop = (columnId, index) => (event) => {
    event.preventDefault();
    if (!draggedCard) return;

    setColumns((prev) => moveCard(prev, draggedCard, { columnId, index }));
    setDraggedCard(null);
    setHoverSlot(null);
  };

  const isHoveringColumn = (columnId) =>
    hoverSlot && hoverSlot.columnId === columnId;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Kanban Board</h1>
        <p className="app__hint">Drag cards between columns to update status.</p>
      </header>

      <AddCardForm
        columns={columns}
        newCard={newCard}
        canSubmit={canSubmit}
        onFieldChange={(field, value) =>
          setNewCard((prev) => ({
            ...prev,
            [field]: value,
          }))
        }
        onSubmit={handleAddCard}
      />

      <Board
        columns={columns}
        columnMap={columnMap}
        hoverSlot={hoverSlot}
        draggedCard={draggedCard}
        isHoveringColumn={isHoveringColumn}
        handleDragOverColumn={handleDragOverColumn}
        handleDrop={handleDrop}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
    </div>
  );
}

function addCard(columns, columnId, card) {
  let inserted = false;
  const next = columns.map((col) => {
    if (col.id === columnId) {
      inserted = true;
      return { ...col, cards: [card, ...col.cards] };
    }
    return col;
  });

  if (!inserted && next.length > 0) {
    next[0] = { ...next[0], cards: [card, ...next[0].cards] };
  }

  return next;
}

function moveCard(columns, source, target) {
  const next = columns.map((col) => ({ ...col, cards: [...col.cards] }));

  const fromColumn = next.find((col) => col.id === source.columnId);
  const toColumn = next.find((col) => col.id === target.columnId);
  if (!fromColumn || !toColumn) {
    return columns;
  }

  const cardIndex = fromColumn.cards.findIndex((card) => card.id === source.cardId);
  if (cardIndex === -1) {
    return columns;
  }

  const [card] = fromColumn.cards.splice(cardIndex, 1);

  const boundedIndex = Math.max(0, Math.min(target.index, toColumn.cards.length));
  toColumn.cards.splice(boundedIndex, 0, card);

  return next;
}


