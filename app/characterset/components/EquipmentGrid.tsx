'use client';

import React from 'react';
import { Rune } from '@/app/types/rune';
import { Droppable } from '@hello-pangea/dnd';
import { ItemGrade } from '@/app/types/item';

interface EquipmentSlot {
  id: string;
  name: string;
}

interface EquipmentGridProps {
  equippedRunes: Record<string, Rune>;
  onRuneDrop?: (slotId: string, rune: Rune) => void;
}

const equipmentSlots: EquipmentSlot[] = [
  { id: 'weapon', name: '무기' },
  { id: 'necklace', name: '목걸이' },
  { id: 'ring_left', name: '반지' },
  { id: 'ring_right', name: '반지' },
  { id: 'emblem', name: '엠블렘' },
  { id: 'head', name: '머리' },
  { id: 'body', name: '상의' },
  { id: 'legs', name: '하의' },
  { id: 'gloves', name: '장갑' },
  { id: 'shoes', name: '신발' },
];

const getRuneBackgroundClass = (grade: ItemGrade) => {
  switch (grade) {
    case 'COMMON':
      return 'bg-gray-300';
    case 'RARE':
      return 'bg-green-400';
    case 'ELITE':
      return 'bg-blue-400';
    case 'UNIQUE':
      return 'bg-yellow-300';
    case 'EPIC':
      return 'bg-purple-400';
    case 'LEGENDARY':
      return 'bg-orange-400';
    default:
      return 'bg-gray-50';
  }
};

export default function EquipmentGrid({ equippedRunes }: EquipmentGridProps) {
  const leftColumnSlots = equipmentSlots.slice(0, 4); // 무기, 목걸이, 반지, 반지
  const rightColumnSlots = equipmentSlots.slice(4); // 엠블렘, 머리, 상의, 하의, 장갑, 신발

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-x-30 bg-gray-50 p-4 rounded-lg shadow w-full lg:w-fit h-fit">
      <div className="flex flex-col gap-y-5">
        {leftColumnSlots.map((slot) => (
          <Droppable key={slot.id} droppableId={`equipment-slot-${slot.id}`}>
            {(provided, snapshot) => (
              <div className="flex items-start gap-x-4">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[60px] h-[60px] bg-white border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative
                      ${snapshot.isDraggingOver ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-500 hover:shadow-md'}`}
                  >
                    {equippedRunes[slot.id] && (
                      <div className={`w-4/5 h-4/5 flex items-center justify-center rounded text-xs text-gray-700 text-center break-all overflow-hidden p-0.5 ${getRuneBackgroundClass(equippedRunes[slot.id].grade)}`}>
                        {equippedRunes[slot.id].name}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                  <span className="text-xs text-gray-600 text-center mt-1">{slot.name}</span>
                </div>
                {equippedRunes[slot.id] && (
                  <div className="flex-1 w-full lg:min-w-[200px] lg:max-w-[300px]">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <div 
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: equippedRunes[slot.id].description }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        ))}
      </div>
      <div className="flex flex-col gap-y-5">
        {rightColumnSlots.map((slot) => (
          <Droppable key={slot.id} droppableId={`equipment-slot-${slot.id}`}>
            {(provided, snapshot) => (
              <div className="flex items-start gap-x-4">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[60px] h-[60px] bg-white border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative
                      ${snapshot.isDraggingOver ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-500 hover:shadow-md'}`}
                  >
                    {equippedRunes[slot.id] && (
                      <div className={`w-4/5 h-4/5 flex items-center justify-center rounded text-xs text-gray-700 text-center break-all overflow-hidden p-0.5 ${getRuneBackgroundClass(equippedRunes[slot.id].grade)}`}>
                        {equippedRunes[slot.id].name}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                  <span className="text-xs text-gray-600 text-center mt-1">{slot.name}</span>
                </div>
                {equippedRunes[slot.id] && (
                  <div className="flex-1 w-full lg:min-w-[200px] lg:max-w-[300px]">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <div 
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: equippedRunes[slot.id].description }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
} 