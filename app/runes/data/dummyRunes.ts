import { RuneType } from '@/app/types/rune';
import { ItemGrade } from '@/app/types/item';

// TODO: 실제 룬 데이터로 교체 필요

export interface Rune {
  id: string;
  type: RuneType;
  name: string;
  grade: ItemGrade;
  description: string; // 효과 및 설명
  imageUrl: string; // 룬 이미지 URL
  // acquisition: string; // TODO: 획득처 필드 필요시 추가
}

export const dummyRunes: Rune[] = [
  {
    "id": "1",
    "type": RuneType.ACCESSORY,
    "name": "질주+",
    "grade": ItemGrade.LEGENDARY,
    "description": "듀얼블레이드의 <span class=\"clrgreen\"><b>글라이딩 퓨리, 라이트닝 퓨리</b></span> 스킬에 변화를 준다.<br><span class=\"clrgreen\"><b>라이트닝 퓨리</b></span> 사용 시 <span class=\"clrgreen\"><b>글라이딩 퓨리</b></span>의 재사용 대기 시간을 초기화하며, 일정 확률로 질풍 자원을 1개 추가로 획득한다. ",
    "imageUrl": "/images/runes/rune1.png"
  },
  {
    "id": "2",
    "type": RuneType.WEAPON,
    "name": "파멸의 일격",
    "grade": ItemGrade.RARE,
    "description": "양손검 스킬 '파멸의 일격' 사용 시 피해량이 증가하고, 대상에게 출혈 효과를 부여합니다.",
    "imageUrl": "/images/runes/rune2.png"
  },
  {
    "id": "3",
    "type": RuneType.WEAPON,
    "name": "파멸의 일격",
    "grade": ItemGrade.ELITE,
    "description": "양손검 스킬 '파멸의 일격' 사용 시 피해량이 증가하고, 대상에게 출혈 효과를 부여합니다.",
    "imageUrl": "/images/runes/rune3.png"
  },
  {
    "id": "4",
    "type": RuneType.WEAPON,
    "name": "파멸의 일격",
    "grade": ItemGrade.UNIQUE,
    "description": "양손검 스킬 '파멸의 일격' 사용 시 피해량이 증가하고, 대상에게 출혈 효과를 부여합니다.",
    "imageUrl": "/images/runes/rune4.png"
  },
  {
    "id": "5",
    "type": RuneType.WEAPON,
    "name": "파멸의 일격",
    "grade": ItemGrade.EPIC,
    "description": "양손검 스킬 '파멸의 일격' 사용 시 피해량이 증가하고, 대상에게 출혈 효과를 부여합니다.",
    "imageUrl": "/images/runes/rune5.png"
  },
  {
    "id": "6",
    "type": RuneType.WEAPON,
    "name": "파멸의 일격",
    "grade": ItemGrade.COMMON,
    "description": "양손검 스킬 '파멸의 일격' 사용 시 피해량이 증가하고, 대상에게 출혈 효과를 부여합니다.",
    "imageUrl": "/images/runes/rune6.png"
  },
  // 추가 더미 데이터...
]; 