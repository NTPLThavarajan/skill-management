import { Injectable } from '@angular/core';
import { SkillDetailsDocument} from '../interfaces/skilldetails-document';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SkillDetailsService {

    UrlSkillDetails = 'http://localhost:3000/SkillDetails';
    constructor(private http: HttpClient) { }

    GetSkillMaster() {
        return this.http.get<SkillDetailsDocument[]>(this.UrlSkillDetails);
    }

    CreateNewSkillMaster(SkillDetailsDoc: SkillDetailsDocument) {
        return this.http.post(this.UrlSkillDetails, SkillDetailsDoc);
    }

    UpdateSkillMaster(SkillMaster: SkillDetailsDocument) {
        return this.http.patch(this.UrlSkillDetails + '/' + SkillMaster.id, SkillMaster);
    }
    GetSkillMasterById(id: number) {
        return this.http.get<SkillDetailsDocument>(this.UrlSkillDetails + '/' + id);
    }
    DeleteSkillMaster(id: number) {
        return this.http.delete<SkillDetailsDocument>(this.UrlSkillDetails + '/' + id);
    }
}


