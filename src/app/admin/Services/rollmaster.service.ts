import { Injectable } from '@angular/core';
import { RollMasterDetails } from '../interfaces/rollmaster-details'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RollMasterService {

  url: string = 'http://localhost:3000/RollMaster';
  constructor(private http: HttpClient) { }

  GetRollMaster() {
    return this.http.get<RollMasterDetails[]>(this.url);
  }

  CreateNewRollMaster(RollMaster: RollMasterDetails) {
    return this.http.post(this.url, RollMaster);
  }

  UpdateRollMaster(RollMaster: RollMasterDetails) {
    return this.http.patch(this.url + '/' + RollMaster.id, RollMaster);
  }
  GetRollMasterById(id: number) {
    return this.http.get<RollMasterDetails>(this.url + '/' + id);
  }
  DeleteRollMaster(id: number) {
    return this.http.delete<RollMasterDetails>(this.url + '/' + id);
  }
}

