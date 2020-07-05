export interface SkillMasterDetails {
    id:number;
    SkillType: string;
    SkillName:string;
    SkillGroup: number,
    Description: string;
    ParentSkill:string;
    CreatedUID:string;
    CraatedDateTime:string;
    UpdatedUID:string;
    UpdatedDateTime:string;
   }
  
   export interface SkillGroup {
    id: number;
    Name: string;
  }

  export interface UserDetails {
    id:number,
    UserID: string;
    Password: string;
  }
