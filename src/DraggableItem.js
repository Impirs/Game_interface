import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'ITEM';

const DraggableItem = ({ item, items, setItems }) => {
  const [tag, setTag] = useState('static');

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: (monitor) => {
      setTag('dynamic'); 

      const clientOffset = monitor.getInitialClientOffset();
      const sourceOffset = monitor.getInitialSourceClientOffset();

      let offsetX = 0;
      let offsetY = 0;

      if (clientOffset && sourceOffset) {
        offsetX = clientOffset.x - sourceOffset.x;
        offsetY = clientOffset.y - sourceOffset.y;
      }

      return { ...item, offsetX, offsetY, tag };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (!isDragging) {
      setTag('static');
    }
  }, [isDragging]);

  return (
    <div
      ref={dragRef}
      style={{
        position: 'absolute',
        borderRadius: 10,
        left: item.x * 100,
        top: item.y * 100,
        width: item.width * 100,
        height: item.height * 100,
        backgroundColor: 'orange',
        opacity: isDragging ? 0.1 : 1,
        display: 'flex',
        placeContent: 'center',
        alignItems: 'center',
      }}
    >
      {item.id} ({tag})
    </div>
  );
};

export default DraggableItem;