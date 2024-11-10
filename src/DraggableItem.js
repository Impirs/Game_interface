import React from 'react';
import { useDrag } from 'react-dnd';

const Item = ({ id, size, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const style = {
    left: position[0].x * 100,
    top: position[0].y * 101.6 + 0.8,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={drag}
      className={`item size-${size}`}
      style={style}
    >
      {id}
    </div>
  );
};

export default Item;