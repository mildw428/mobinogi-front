import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TierSlot from './TierSlot';
import DraggableItem from './DraggableItem';

interface TierMakerProps {
  items: Array<{
    id: string;
    content: React.ReactNode;
  }>;
  initialData?: {
    tiers: {
      name: string;
      order: number;
      runeIds: number[];
    }[];
    waitingSlots: number[];
  } | null;
}

export interface TierMakerRef {
  getTierData: () => {
    tiers: {
      name: string;
      order: number;
      runeIds: number[];
    }[];
    waitingSlots: number[];
  };
}

const defaultTiers = [
  { "id": "S", "title": "1티어", "color": "#FFD700" },
  { "id": "A", "title": "2티어", "color": "#8000FF" },
  { "id": "B", "title": "3티어", "color": "#007BFF" },
  { "id": "C", "title": "4티어", "color": "#00C853" },
  { "id": "D", "title": "5티어", "color": "#9E9E9E" },
  { "id": "waiting", "title": "대기", "color": "#E0E0E0" }
];

const TierMaker = forwardRef<TierMakerRef, TierMakerProps>(({ items, initialData }, ref) => {
  const [tiers, setTiers] = useState(defaultTiers);
  const [tierItems, setTierItems] = useState<Record<string, typeof items>>(() => {
    const initialTierItems: Record<string, typeof items> = {
      waiting: [],
      S: [],
      A: [],
      B: [],
      C: [],
      D: [],
    };

    if (initialData) {
      // 초기 데이터가 있는 경우
      const waitingItems = items.filter(item => 
        initialData.waitingSlots.includes(parseInt(item.id))
      );
      initialTierItems.waiting = waitingItems;

      // 각 티어에 아이템 할당
      initialData.tiers.forEach((tier, index) => {
        const tierId = defaultTiers[index].id;
        initialTierItems[tierId] = items.filter(item => 
          tier.runeIds.includes(parseInt(item.id))
        );
      });
    } else {
      // 초기 데이터가 없는 경우 모든 아이템을 대기열에 배치
      initialTierItems.waiting = items;
    }

    return initialTierItems;
  });

  useImperativeHandle(ref, () => ({
    getTierData: () => {
      const tierData = tiers
        .filter(tier => tier.id !== 'waiting')
        .map((tier, index) => ({
          name: tier.title,
          order: index + 1,
          runeIds: tierItems[tier.id].map(item => parseInt(item.id))
        }));

      return {
        tiers: tierData,
        waitingSlots: tierItems.waiting.map(item => parseInt(item.id))
      };
    }
  }));

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // 같은 티어 내에서 이동
      const items = Array.from(tierItems[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setTierItems({
        ...tierItems,
        [source.droppableId]: items,
      });
    } else {
      // 다른 티어로 이동
      const sourceItems = Array.from(tierItems[source.droppableId]);
      const destItems = Array.from(tierItems[destination.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setTierItems({
        ...tierItems,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full mx-auto">
        {tiers.map((tier) => (
          <TierSlot
            key={tier.id}
            id={tier.id}
            title={tier.title}
            color={tier.color}
          >
            {tierItems[tier.id].map((item, index) => (
              <DraggableItem key={item.id} id={item.id} index={index}>
                {item.content}
              </DraggableItem>
            ))}
          </TierSlot>
        ))}
      </div>
    </DragDropContext>
  );
});

TierMaker.displayName = 'TierMaker';

export default TierMaker; 