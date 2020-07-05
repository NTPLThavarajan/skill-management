import { Injectable } from '@angular/core';
import { SkillMasterDetails, SkillGroup, ParentSkill } from '../interfaces/skillmaster-details'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SkillMasterService {

  UrlSkillMaster = 'http://localhost:3000/SkillMaster';
  UrlSkillGroup = 'http://localhost:3000/SkillGroup';
  constructor(private http: HttpClient) { }

  GetSkillMaster() {
    return this.http.get<SkillMasterDetails[]>(this.UrlSkillMaster);
  }

  CreateNewSkillMaster(SkillMaster: SkillMasterDetails) {
    return this.http.post(this.UrlSkillMaster, SkillMaster);
  }

  UpdateSkillMaster(SkillMaster: SkillMasterDetails) {
    return this.http.patch(this.UrlSkillMaster + '/' + SkillMaster.id, SkillMaster);
  }
  GetSkillMasterById(id: number) {
    return this.http.get<SkillMasterDetails>(this.UrlSkillMaster + '/' + id);
  }
  DeleteSkillMaster(id: number) {
    return this.http.delete<SkillMasterDetails>(this.UrlSkillMaster + '/' + id);
  }

  GetSkillGroup() {
    return this.http.get<SkillGroup[]>(this.UrlSkillGroup);
  }

  GetParentSkill() {
    return this.http.get<ParentSkill[]>('http://localhost:3000/SkillMaster');
  }
}


