export interface SkillMasterDetails {
    id: number;
    SkillType: string;
    SkillName: string;
    SkillGroupID: number,
    SkillGroup: number,
    Description: string;
    ParentSkillID: number;
    ParentSkill: string;
    CreatedUID: string;
    CreatedDateTime: string;
    UpdatedUID: string;
    UpdatedDateTime: string;
}

export interface SkillGroup {
    id: number;
    Name: string;
}

export interface ParentSkill {
    id: number;
    SkillName: string;
}