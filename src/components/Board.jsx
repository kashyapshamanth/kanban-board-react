function CardWithPlaceholder({
  card,
  columnId,
  index,
  hoverSlot,
  draggedCard,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) {
  const showPlaceholder =
    hoverSlot && hoverSlot.columnId === columnId && hoverSlot.index === index;

  return (
    <>
      {showPlaceholder && (
        <Placeholder onDrop={onDrop(columnId, hoverSlot.index)} />
      )}

      <article
        className={[
          "card",
          draggedCard?.cardId === card.id ? "card--ghost" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        draggable
        onDragStart={onDragStart(columnId, card.id)}
        onDragOver={onDragOver(columnId, index + 1)}
        onDrop={onDrop(columnId, index + 1)}
        onDragEnd={onDragEnd}
      >
        <h3 className="card__title">{card.title}</h3>
        <p className="card__description">{card.description}</p>
      </article>
    </>
  );
}

function Placeholder({ onDrop }) {
  return (
    <div className="placeholder" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
      Release to drop
    </div>
  );
}

export default function Board({
  columns,
  columnMap,
  hoverSlot,
  draggedCard,
  isHoveringColumn,
  handleDragOverColumn,
  handleDrop,
  handleDragStart,
  handleDragEnd,
}) {
  return (
    <section className="board">
      {columns.map((column) => {
        const data = columnMap.get(column.id);
        const isEmpty = data.cards.length === 0 && !isHoveringColumn(column.id);

        return (
          <div className="column" key={column.id}>
            <h2 className="column__title">{column.title}</h2>

            <div
              className={[
                "column__body",
                isEmpty ? "column__body--empty" : "",
                isHoveringColumn(column.id) ? "column__body--highlight" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onDragOver={handleDragOverColumn(column.id, data.cards.length)}
              onDrop={handleDrop(column.id, hoverSlot?.index ?? data.cards.length)}
            >
              {data.cards.map((card, index) => (
                <CardWithPlaceholder
                  key={card.id}
                  card={card}
                  columnId={column.id}
                  index={index}
                  hoverSlot={hoverSlot}
                  draggedCard={draggedCard}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOverColumn}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                />
              ))}

              {hoverSlot &&
                hoverSlot.columnId === column.id &&
                hoverSlot.index === data.cards.length && (
                  <Placeholder onDrop={handleDrop(column.id, hoverSlot.index)} />
                )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
