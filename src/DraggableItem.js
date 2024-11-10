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
    left: position[0].x * 50,
    top: position[0].y * 50,
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