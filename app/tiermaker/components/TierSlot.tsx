import React from 'react';
import { Droppable } from '@hello-pangea/dnd';

interface TierSlotProps {
  id: string;
  title: string;
  color: string;
  children?: React.ReactNode;
}

const TierSlot: React.FC<TierSlotProps> = ({ id, title, color, children }) => {

  return (
    <div 
      className={`flex items-center gap-4 p-2 rounded-lg`} 
      style={{ backgroundColor: color } }
    >
      <div className={`w-13 text-center font-bold text-xl`}>{title}</div>
      <Droppable droppableId={id} direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[100px] flex flex-wrap gap-2 rounded-lg bg-white/20`}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TierSlot; 