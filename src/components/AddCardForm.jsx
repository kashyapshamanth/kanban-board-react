export default function AddCardForm({
  columns,
  newCard,
  canSubmit,
  onFieldChange,
  onSubmit,
}) {
  const handleChange = (field) => (event) => {
    onFieldChange(field, event.target.value);
  };

  return (
    <form className="add-card" onSubmit={onSubmit}>
      <div className="add-card__group">
        <label className="add-card__label" htmlFor="card-title">
          Title
        </label>
        <input
          id="card-title"
          className="add-card__input"
          placeholder="e.g., Write unit tests"
          value={newCard.title}
          onChange={handleChange("title")}
          required
        />
      </div>

      <div className="add-card__group">
        <label className="add-card__label" htmlFor="card-description">
          Description
        </label>
        <textarea
          id="card-description"
          className="add-card__textarea"
          placeholder="Short summary of the task"
          value={newCard.description}
          onChange={handleChange("description")}
          rows={2}
          required
        />
      </div>

      <div className="add-card__group">
        <label className="add-card__label" htmlFor="card-column">
          Column
        </label>
        <select
          id="card-column"
          className="add-card__select"
          value={newCard.columnId}
          onChange={handleChange("columnId")}
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
      </div>

      <button className="add-card__submit" type="submit" disabled={!canSubmit}>
        Add Task
      </button>
    </form>
  );
}

export default function AddCardForm({
  columns,
  newCard,
  canSubmit,
  onFieldChange,
  onSubmit,
}) {
  const handleChange = (field) => (event) => {
    onFieldChange(field, event.target.value);
  };

  return (
    <form className="add-card" onSubmit={onSubmit}>
      <div className="add-card__group">
        <label className="add-card__label" htmlFor="card-title">
          Title
        </label>
        <input
          id="card-title"
          className="add-card__input"
          placeholder="e.g., Write unit tests"
          value={newCard.title}
          onChange={handleChange("title")}
          required
        />
      </div>

      <div className="add-card__group">
        <label className="add-card__label" htmlFor="card-description">
          Description
        </label>
        <textarea
          id="card-description"
          className="add-card__textarea"
          placeholder="Short summary of the task"
          value={newCard.description}
          onChange={handleChange("description")}
          rows={2}
          required
        />
      </div>

      <div className="add-card__group">
        <label className="add-card__label" htmlFor="card-column">
          Column
        </label>
        <select
          id="card-column"
          className="add-card__select"
          value={newCard.columnId}
          onChange={handleChange("columnId")}
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
      </div>

      <button className="add-card__submit" type="submit" disabled={!canSubmit}>
        Add Task
      </button>
    </form>
  );
}


