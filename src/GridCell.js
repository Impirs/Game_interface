import React from 'react';
import { useDrop } from 'react-dnd';

const GridCell = ({ x, y, grid, moveItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item) => moveItem(item.id, x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const cell = grid[y][x];
  return (
    <div
      ref={drop}
      className={`grid-cell ${isOver ? 'highlight' : ''} ${cell.status === 'full' ? 'occupied' : ''}`}
      data-x={x}
      data-y={y}
    >
      {cell.status === 'full' && <div className="item-id">{cell.itemId}</div>}
    </div>
  );
};

export default GridCell;
