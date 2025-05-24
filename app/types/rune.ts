import { ItemGrade } from './item';
import { Job } from './job';

export enum RuneType {
    WEAPON = "WEAPON",
    ARMOR = "ARMOR",
    ACCESSORY = "ACCESSORY",
    EMBLEM = "EMBLEM"
}

export interface Rune {
    id: number;
    name: string;
    type: RuneType;
    grade: ItemGrade;
    description: string;
    imageUrl: string;
    job: Job;
}

export const getRuneTypeKorean = (type: RuneType): string => {
    const typeMap: Record<RuneType, string> = {
        [RuneType.WEAPON]: "무기",
        [RuneType.ARMOR]: "방어구",
        [RuneType.ACCESSORY]: "장신구",
        [RuneType.EMBLEM]: "엠블렘"
    };
    return typeMap[type];
}; 