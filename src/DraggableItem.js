import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'ITEM';

const DraggableItem = ({ item, items, setItem }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'ITEM',
        item: (monitor) => {
          // Use initial offsets only if the drag has started and offsets are available
          const clientOffset = monitor.getInitialClientOffset();
          const sourceOffset = monitor.getInitialSourceClientOffset();
    
          let offsetX = 0;
          let offsetY = 0;
    
          if (clientOffset && sourceOffset) {
            offsetX = clientOffset.x - sourceOffset.x;
            offsetY = clientOffset.y - sourceOffset.y;
          }
    
          return { ...item, offsetX, offsetY };
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    });
/*
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        moveItem(draggedItem.id, id);
        draggedItem.id = id;
      }
    },
  });
    */
    return (
        <div
          ref={dragRef}
          style={{
            position: 'absolute',
            borderRadius: 10 ,
            left: item.x * 100,
            top: item.y * 100,
            width: item.width * 100,
            height: item.height * 100,
            backgroundColor: 'orange',
            opacity: isDragging ? 0.5 : 1,
            display: 'flex',
            placeContent: 'center',
            alignItems: 'center',
          }}
        >
          {item.id}
        </div>
    );
};

export default DraggableItem;