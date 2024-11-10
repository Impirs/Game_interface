import React, { useState, useCallback } from 'react';
import GridCell from './GridCell';
import DraggableItemItem from './DraggableItem';
import './Grid.css';

const Grid = ({ width, height, items }) => {
  const [grid, setGrid] = useState(generateGrid(width, height, items));

  const moveItem = useCallback(
    (id, toX, toY) => {
      const item = items.find(i => i.id === id);
      if (!item) return;

      const newGrid = clearItemCells(grid, item);

      const newPosition = calculateNewPosition(item, toX, toY);
      if (isPositionValid(newGrid, newPosition, width, height)) {
        setGrid(updateGridWithItem(newGrid, item, newPosition));
      } else {
        setGrid(updateGridWithItem(newGrid, item, item.position));
      }
    },
    [grid, items, width, height]
  );

  return (
    <div className="grid-container">
      <div className="grid">
        {Array.from({ length: width }).map((_, y) =>
          <div className="row" key={y}>
            {Array.from({ length: height }).map((_, x) => (
              <GridCell key={`${x}-${y}`} x={x} y={y} grid={grid} moveItem={moveItem} />
            ))}
          </div>
        )}
        {items.map(item => (
          <DraggableItemItem key={item.id} {...item} />
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
  const newGrid = grid.map(row => row.slice());
  item.position.forEach(({ x, y }) => {
    if (newGrid[x] && newGrid[x][y]) { 
      newGrid[x][y] = { status: 'empty' };
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
  return position.every(({ x, y }) => x >= 0 && y >= 0 && x < width && y < height && grid[x][y].status === 'empty');
};

const updateGridWithItem = (grid, item, position) => {
  const newGrid = grid.map(row => row.slice());
  item.position = position;
  position.forEach(({ x, y }) => {
    if (newGrid[x] && newGrid[x][y]) {
      newGrid[x][y] = { status: 'full', itemId: item.id };
    }
  });
  return newGrid;
};