'use client';

import React, { useState } from 'react';
import { Rune, RuneType } from '@/app/types/rune';
import { Job } from '@/app/types/job';
import { getRuneBackgroundClass } from '@/app/utils/gradeColors';
import RuneSearchModal from './RuneSearchModal';

interface EquipmentSlot {
  id: string;
  name: string;
}

interface EquipmentGridProps {
  equippedRunes: Record<string, Rune>;
  onRuneDrop?: (slotId: string, rune: Rune) => void;
  selectedJob?: Job | null;
  allRunes?: Rune[];
}

// Map slot IDs to their corresponding rune types
const slotToRuneType: Record<string, RuneType> = {
  'weapon': RuneType.WEAPON,
  'necklace': RuneType.ACCESSORY,
  'ring_left': RuneType.ACCESSORY,
  'ring_right': RuneType.ACCESSORY,
  'emblem': RuneType.EMBLEM,
  'head': RuneType.ARMOR,
  'body': RuneType.ARMOR,
  'legs': RuneType.ARMOR,
  'gloves': RuneType.ARMOR,
  'shoes': RuneType.ARMOR,
};

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

// Using the imported getRuneBackgroundClass from utils/gradeColors.ts

export default function EquipmentGrid({ equippedRunes, onRuneDrop, selectedJob, allRunes = [] }: EquipmentGridProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showAllDescriptions, setShowAllDescriptions] = useState(false);
  const leftColumnSlots = equipmentSlots.slice(0, 4);
  const rightColumnSlots = equipmentSlots.slice(4);

  const handleSlotClick = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleRuneSelect = (rune: Rune) => {
    if (selectedSlot && onRuneDrop) {
      onRuneDrop(selectedSlot, rune);
    }
  };

  const toggleAllDescriptions = () => {
    setShowAllDescriptions(prev => !prev);
  };

  const renderLeftSlot = (slot: EquipmentSlot) => {
    const hasDescription = equippedRunes[slot.id] && equippedRunes[slot.id].description && showAllDescriptions;
    
    return (
      <div key={slot.id} className={`flex flex-row md:flex-row items-start ${hasDescription ? 'gap-x-4' : ''} md:justify-end`}>
        <div className="flex flex-col items-center shrink-0 order-1 md:order-2">
          <div
            onClick={() => handleSlotClick(slot.id)}
            className="w-[60px] h-[60px] bg-white border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative hover:border-blue-500 hover:shadow-md overflow-hidden"
          >
            {equippedRunes[slot.id] && (
              <div className={`w-[48px] h-[48px] flex items-center justify-center rounded text-xs text-gray-700 text-center p-0.5 ${getRuneBackgroundClass(equippedRunes[slot.id].grade)}`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-center px-1 break-words" style={{ fontSize: '0.65rem', lineHeight: '1.1' }}>{equippedRunes[slot.id].name}</span>
                </div>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-600 text-center mt-1">{slot.name}</span>
        </div>
        {hasDescription && (
          <div className="flex-1 w-full md:min-w-[200px] md:max-w-[300px] order-2 md:order-1">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div 
                className="text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: equippedRunes[slot.id].description }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRightSlot = (slot: EquipmentSlot) => {
    const hasDescription = equippedRunes[slot.id] && equippedRunes[slot.id].description && showAllDescriptions;
    
    return (
      <div key={slot.id} className={`flex flex-row md:flex-row items-start ${hasDescription ? 'gap-x-4' : ''}`}>
        <div className="flex flex-col items-center shrink-0">
          <div
            onClick={() => handleSlotClick(slot.id)}
            className="w-[60px] h-[60px] bg-white border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative hover:border-blue-500 hover:shadow-md overflow-hidden"
          >
            {equippedRunes[slot.id] && (
              <div className={`w-[48px] h-[48px] flex items-center justify-center rounded text-xs text-gray-700 text-center p-0.5 ${getRuneBackgroundClass(equippedRunes[slot.id].grade)}`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-center px-1 break-words" style={{ fontSize: '0.65rem', lineHeight: '1.1' }}>{equippedRunes[slot.id].name}</span>
                </div>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-600 text-center mt-1">{slot.name}</span>
        </div>
        {hasDescription && (
          <div className="flex-1 w-full md:min-w-[200px] md:max-w-[300px]">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div 
                className="text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: equippedRunes[slot.id].description }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-end">
          <button
            onClick={toggleAllDescriptions}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            {showAllDescriptions ? '룬 설명 숨기기' : '룬 설명 보기'}
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 bg-gray-50 p-4 rounded-lg shadow w-full">
          <div className="flex flex-col gap-y-5 w-full lg:w-1/2 lg:pr-8">
            {leftColumnSlots.map(renderLeftSlot)}
          </div>
          <div className="flex flex-col gap-y-5 w-full lg:w-1/2 lg:pl-8">
            {rightColumnSlots.map(renderRightSlot)}
          </div>
        </div>
      </div>

      <RuneSearchModal
        isOpen={selectedSlot !== null}
        onClose={() => setSelectedSlot(null)}
        onSelect={handleRuneSelect}
        initialJob={selectedJob}
        initialRuneType={selectedSlot ? slotToRuneType[selectedSlot] : undefined}
        allRunes={allRunes}
      />
    </>
  );
} 