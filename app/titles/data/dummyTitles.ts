export interface Title {
  id: string;
  num: number;
  name: string;
  equipEffect: string;
  passiveEffect: string;
  conditions: string;
}

export const dummyTitles: Title[] = [
  {
    id: "1",
    num: 10,
    name: "튼튼한",
    equipEffect: "최대체력+120,방어력+35,지력-5",
    passiveEffect: "힘+25,의지+25",
    conditions: "체력 5500을 달성하면 얻을 수 있는 타이틀입니다"
  },
  {
    id: "2",
    num: 20,
    name: "강인한",
    equipEffect: "최대체력+150,방어력+40",
    passiveEffect: "체력+30",
    conditions: "방어력 1000을 달성하면 얻을 수 있는 타이틀입니다"
  },
  {
    id: "3",
    num: 30,
    name: "날렵한",
    equipEffect: "이동속도+10,공격속도+5",
    passiveEffect: "민첩+20",
    conditions: "민첩 500을 달성하면 얻을 수 있는 타이틀입니다"
  }
]; 