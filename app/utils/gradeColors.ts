import { ItemGrade } from '@/app/types/item';

export const getRuneBackgroundClass = (grade: ItemGrade): string => {
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

export const getRuneBorderClass = (grade: ItemGrade): string => {
  switch (grade) {
    case 'COMMON':
      return 'border-gray-300';
    case 'RARE':
      return 'border-green-400';
    case 'ELITE':
      return 'border-blue-400';
    case 'UNIQUE':
      return 'border-yellow-300';
    case 'EPIC':
      return 'border-purple-400';
    case 'LEGENDARY':
      return 'border-orange-400';
    default:
      return 'border-gray-200';
  }
};

export const getRuneTextClass = (grade: ItemGrade): string => {
  switch (grade) {
    case 'COMMON':
      return 'text-gray-700';
    case 'RARE':
      return 'text-green-700';
    case 'ELITE':
      return 'text-blue-700';
    case 'UNIQUE':
      return 'text-yellow-700';
    case 'EPIC':
      return 'text-purple-700';
    case 'LEGENDARY':
      return 'text-orange-700';
    default:
      return 'text-gray-700';
  }
};
