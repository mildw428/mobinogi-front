import { ReactNode } from 'react';
import { ItemGrade } from '../types/item';

interface ItemBoxProps {
  children: ReactNode;
  className?: string;
  grade: ItemGrade;
}

const gradeClassMap = {
  [ItemGrade.COMMON]: 'item-gradient-common',
  [ItemGrade.RARE]: 'item-gradient-rare',
  [ItemGrade.ELITE]: 'item-gradient-elite',
  [ItemGrade.UNIQUE]: 'item-gradient-unique',
  [ItemGrade.EPIC]: 'item-gradient-epic',
  [ItemGrade.LEGENDARY]: 'item-gradient-legendary',
} as const;

export default function ItemBox({ children, className = '', grade = ItemGrade.COMMON }: ItemBoxProps) {
  return (
    <div className={`
      w-[70px] h-[70px]
      ${gradeClassMap[grade]}
      rounded-[50px]
      flex items-center justify-center
      ${className}
    `}>
      {children}
    </div>
  );
} 