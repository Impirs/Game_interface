import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Grid from './Grid';
import './App.css';

function App() {
  const items = [
    { id: 'item1', size: 1, position: [{ x: 1, y: 1 }] },
    { id: 'item2', size: 2, position: [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 4, y: 4 },
    ] }, 
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Grid width={6} height={6} items={items} />
      </div>
    </DndProvider>
  );
}

export default App;