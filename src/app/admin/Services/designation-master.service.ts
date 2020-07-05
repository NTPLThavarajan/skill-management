import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{DesignationDetails}from '../interfaces/designation-details';

@Injectable({
  providedIn: 'root'
})
export class DesignationMasterService {

  url : string = 'http://localhost:3000/master_role';
  constructor(private http: HttpClient) { }

      getDesignations() {  
          return this.http.get<DesignationDetails[]>(this.url);  
        } 
}
