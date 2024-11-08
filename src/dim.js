// GridCell.js
import React from 'react';
import { useDrop } from 'react-dnd';

const GridCell = ({ x, y, size, items, setItems }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'ITEM',
    canDrop: (item) => canPlaceItem(item, x, y, size, items, item.offsetX, item.offsetY),
    drop: (item) => moveItem(item, x, y, setItems, item.offsetX, item.offsetY),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      style={{
        width: 100,
        height: 100,
        backgroundColor: isOver ? 'lightblue' : 'lightgray',
        border: '1px solid black',
      }}
    />
  );
};

const canPlaceItem = (item, x, y, size, items, offsetX, offsetY) => {
  const GRID_SIZE = size;
  const adjustedX = x - Math.floor(offsetX / 100);
  const adjustedY = y - Math.floor(offsetY / 100);

  for (let i = 0; i < item.width; i++) {
    for (let j = 0; j < item.height; j++) {
      if (
        adjustedX + i >= GRID_SIZE ||
        adjustedY + j >= GRID_SIZE ||
        adjustedX + i < 0 ||
        adjustedY + j < 0 ||
        items.some(
          (otherItem) =>
            otherItem.id !== item.id &&
            adjustedX + i >= otherItem.x &&
            adjustedX + i < otherItem.x + otherItem.width &&
            adjustedY + j >= otherItem.y &&
            adjustedY + j < otherItem.y + otherItem.height
        )
      ) {
        return false;
      }
    }
  }
  return true;
};

const moveItem = (item, x, y, setItems, offsetX, offsetY) => {
  const adjustedX = x - Math.floor(offsetX / 100);
  const adjustedY = y - Math.floor(offsetY / 100);

  setItems((prevItems) =>
    prevItems.map((i) =>
      i.id === item.id ? { ...i, x: adjustedX, y: adjustedY } : i
    )
  );
};

export default GridCell;
