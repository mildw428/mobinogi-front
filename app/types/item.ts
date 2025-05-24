export enum ItemGrade {
  COMMON = "COMMON",
  RARE = "RARE",
  ELITE = "ELITE",
  UNIQUE = "UNIQUE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY"
}

export const getItemGradeKorean = (grade: ItemGrade): string => {
  const gradeMap: Record<ItemGrade, string> = {
    [ItemGrade.COMMON]: "일반",
    [ItemGrade.RARE]: "레어",
    [ItemGrade.ELITE]: "엘리트",
    [ItemGrade.UNIQUE]: "유니크",
    [ItemGrade.EPIC]: "에픽",
    [ItemGrade.LEGENDARY]: "레전더리"
  };
  return gradeMap[grade];
};