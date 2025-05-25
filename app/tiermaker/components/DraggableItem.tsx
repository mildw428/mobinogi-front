import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

interface DraggableItemProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, index, children }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-2 rounded shadow cursor-move hover:shadow-lg transition-shadow"
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem; 