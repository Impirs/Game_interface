import React, { useState } from 'react';
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DraggableItem from './DraggableItem';
import GridCell from './dim';

const GRID_SIZE = 4;

const initialItems = [
{ id: 1, x: 0, y: 0, width: 1, height: 1 },
{ id: 2, x: 1, y: 1, width: 2, height: 2 },
];

const App = () => {
  const [items, setItems] = useState(initialItems);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 100px)` }}>
        {[...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          return <GridCell key={index} x={x} y={y} size={GRID_SIZE} items={items} setItems={setItems} />;
        })}
      </div>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} items={items} setItems={setItems} />
      ))}
    </DndProvider>
  );
};

export default App;
