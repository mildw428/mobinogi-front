export enum Job {
    // 전사 계열
    WARRIOR = "WARRIOR",
    GREAT_SWORD_WARRIOR = "GREAT_SWORD_WARRIOR",
    SWORD_MASTER = "SWORD_MASTER",
    
    // 궁수 계열
    ARCHER = "ARCHER",
    ARBALIST = "ARBALIST",
    LONG_BOW_MAN = "LONG_BOW_MAN",
    
    // 마법사 계열
    MAGE = "MAGE",
    FIRE_MAGE = "FIRE_MAGE",
    ICE_MAGE = "ICE_MAGE",
    
    // 힐러 계열
    HEALER = "HEALER",
    PRIEST = "PRIEST",
    MONK = "MONK",
    
    // 음유시인 계열
    BARD = "BARD",
    DANCER = "DANCER",
    BATTLE_MUSICIAN = "BATTLE_MUSICIAN",

    // 도적 계열
    THIEF = "THIEF",
    DUAL_BLADE = "DUAL_BLADE",
    FIGHTER = "FIGHTER"
}

export interface JobCategory {
    title: string;
    jobs: Job[];
}

export const JOB_CATEGORIES: JobCategory[] = [
    {
        title: '전사 계열',
        jobs: [Job.WARRIOR, Job.GREAT_SWORD_WARRIOR, Job.SWORD_MASTER]
    },
    {
        title: '궁수 계열',
        jobs: [Job.ARCHER, Job.ARBALIST, Job.LONG_BOW_MAN]
    },
    {
        title: '마법사 계열',
        jobs: [Job.MAGE, Job.FIRE_MAGE, Job.ICE_MAGE]
    },
    {
        title: '힐러 계열',
        jobs: [Job.HEALER, Job.PRIEST, Job.MONK]
    },
    {
        title: '음유시인 계열',
        jobs: [Job.BARD, Job.DANCER, Job.BATTLE_MUSICIAN]
    },
    {
        title: '도적 계열',
        jobs: [Job.THIEF, Job.DUAL_BLADE, Job.FIGHTER]
    }
];

export const getJobKorean = (job: Job): string => {
    const jobMap: Record<Job, string> = {
        [Job.WARRIOR]: "전사",
        [Job.GREAT_SWORD_WARRIOR]: "대검전사",
        [Job.SWORD_MASTER]: "검술사",
        [Job.ARCHER]: "궁수",
        [Job.ARBALIST]: "석궁사수",
        [Job.LONG_BOW_MAN]: "장궁병",
        [Job.MAGE]: "마법사",
        [Job.FIRE_MAGE]: "화염술사",
        [Job.ICE_MAGE]: "빙결술사",
        [Job.HEALER]: "힐러",
        [Job.PRIEST]: "사제",
        [Job.MONK]: "수도사",
        [Job.BARD]: "음유시인",
        [Job.DANCER]: "댄서",
        [Job.BATTLE_MUSICIAN]: "악사",
        [Job.THIEF]: "도적",
        [Job.DUAL_BLADE]: "듀얼블레이드",
        [Job.FIGHTER]: "격투가"
    };
    return jobMap[job];
}; 