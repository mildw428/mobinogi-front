import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Rune, getRuneTypeKorean } from '@/app/types/rune';
import { getJobKorean } from '@/app/types/job';
import DraggableItem from './DraggableItem';
import ItemBox from '@/app/components/ItemBox';
import { highlightText } from '@/app/utils/highlight';

interface SearchResultsProps {
  runes: Rune[];
  searchTerm?: string;
}

export default function SearchResults({ runes, searchTerm = '' }: SearchResultsProps) {
  const [selectedRuneId, setSelectedRuneId] = useState<number | null>(null);

  const handleRuneClick = (runeId: number) => {
    setSelectedRuneId(selectedRuneId === runeId ? null : runeId);
  };

  return (
    <Droppable droppableId="search-results">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="overflow-x-auto rounded-lg border bg-white shadow-sm"
        >
          <div className="min-w-full text-sm">
            {runes.map((rune, index) => (
              <React.Fragment key={rune.id}>
                <DraggableItem id={String(rune.id)} index={index}>
                  <div 
                    className="flex items-center hover:bg-blue-50/50 transition cursor-pointer border-b border-gray-100"
                    onClick={() => handleRuneClick(rune.id)}
                  >
                    <div className="px-3 py-1.5">
                      <div className="scale-75 origin-left">
                        <ItemBox grade={rune.grade}>
                          룬
                        </ItemBox>
                      </div>
                    </div>
                    <div 
                      className="px-3 py-1.5 font-medium text-gray-900 whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: highlightText(rune.name, searchTerm) }}
                    />
                  </div>
                </DraggableItem>
                {selectedRuneId === rune.id && (
                  <div className="border-b border-gray-100">
                    <div className="px-3 py-1.5">
                      <div className="bg-gray-50/80 rounded-md p-2">
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 w-12">직업</span>
                            <span>{getJobKorean(rune.job)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 w-12">타입</span>
                            <span>{getRuneTypeKorean(rune.type)}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-gray-500">설명</div>
                            <div 
                              className="text-gray-700"
                              dangerouslySetInnerHTML={{ 
                                __html: highlightText(rune.description, searchTerm)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
} 