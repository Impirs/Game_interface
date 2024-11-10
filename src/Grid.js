import React, { useState, useCallback } from 'react';
import GridCell from './GridCell';
import DraggableItem from './DraggableItem';
import './Grid.css';

const Grid = ({ width, height, items }) => {
  const [grid, setGrid] = useState(generateGrid(width, height, items));
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDrag = (item, startX, startY) => {
    const offsetX = startX - item.position[0].x;
    const offsetY = startY - item.position[0].y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const moveItem = useCallback(
    (id, toX, toY) => {
      const item = items.find(i => i.id === id);
      if (!item) return;

      const newGrid = clearItemCells(grid, item);

      const newPosition = calculateNewPosition(item, toX - dragOffset.x, toY - dragOffset.y);
      if (isPositionValid(newGrid, newPosition, width, height)) {
        setGrid(updateGridWithItem(newGrid, item, newPosition));
      } else {
        setGrid(updateGridWithItem(newGrid, item, item.position));
      }
    },
    [grid, items, width, height, dragOffset]
  );

  return (
    <div className="grid-container">
      <div className="grid">
        {Array.from({ length: width }).map((_, x) =>
          <div className="column" key={x}>
            {Array.from({ length: height }).map((_, y) => (
              <GridCell
                key={`${x}-${y}`}
                x={x}
                y={y}
                grid={grid}
                moveItem={moveItem}
                startDrag={(item) => startDrag(item, x, y)}
              />
            ))}
          </div>
        )}
        {items.map(item => (
          <DraggableItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Grid;

const generateGrid = (width, height, items) => {
  const grid = Array.from({ length: width }, () => Array(height).fill({ status: 'empty' }));
  items.forEach(item => updateGridWithItem(grid, item, item.position));
  return grid;
};

const clearItemCells = (grid, item) => {
  const newGrid = grid.map(column => column.slice());
  item.position.forEach(({ x, y }) => {
    if (newGrid[x] && newGrid[x][y]) { 
      newGrid[y][x] = { status: 'empty' };
    }
  });
  return newGrid;
};

const calculateNewPosition = (item, toX, toY) => {
  return item.size === 1
    ? [{ x: toX, y: toY }]
    : [
        { x: toX, y: toY },
        { x: toX, y: toY + 1 },
        { x: toX + 1, y: toY },
        { x: toX + 1, y: toY + 1 },
      ];
};

const isPositionValid = (grid, position, width, height) => {
  return position.every(({ x, y }) => 
    x >= 0 && y >= 0 && x < width && y < height && grid[y][x].status === 'empty'
  ); 
};

const updateGridWithItem = (grid, item, position) => {
  const newGrid = grid.map(column => column.slice());
  item.position = position;
  position.forEach(({ x, y }) => {
    if (newGrid[x] && newGrid[x][y]) {
      newGrid[y][x] = { status: 'full', itemId: item.id };
    }
  });
  return newGrid;
};