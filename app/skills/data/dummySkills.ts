import { Job } from '@/app/types/job';

// TODO: 실제 스킬 데이터로 교체 필요

export interface Skill {
  id: string;
  name: string;
  job: Job;
  type: string; // 예: 1스킬, 액티브, 패시브
  description: string;
  tags: string; // 예: #연타, #이동 (콤마로 구분된 문자열)
  runes: string; // 룬 효과 설명
}

export const dummySkills: Skill[] = [
  {
    "id": "1",
    "name": "연속 베기",
    "job": Job.WARRIOR,
    "type": "1스킬",
    "description": "쉴 틈 없이 적을 몰아붙이는 신속한 베기 공격.\n타겟에게 빠르게 접근해 연속으로 검을 휘두른다.\n투지가 최고조에 이르면, 공격 횟수가 증가하고 스킬을 더 빠르게 사용한다.",
    "tags": "#연타,#이동",
    "runes": "맹공: 가드 상태일 경우, 가드를 해제하며 적에게 맹렬한 연속 공격을 가하고 잠시 동안 공격력을 증가시키는 제압 스킬로 변화한다."
  },
  {
    "id": "2",
    "name": "아이스 스피어",
    "job": Job.MAGE,
    "type": "액티브",
    "description": "얼음 정령의 힘을 빌려 거대한 얼음창을 소환하여 적에게 날립니다.\n적중 시 주변 적들에게도 피해를 입히고 이동 속도를 감소시킵니다.",
    "tags": "#원거리,#광역,#빙결",
    "runes": "한기: 아이스 스피어에 적중된 대상은 일정 확률로 '빙결' 상태가 되며, 빙결 상태의 적에게 추가 피해를 줍니다."
  },
  // 추가 더미 데이터...
];
