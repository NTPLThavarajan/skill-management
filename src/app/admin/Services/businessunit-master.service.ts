import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{BusinessunitDetails}from '../interfaces/businessunit-details';

@Injectable({
  providedIn: 'root'
})
export class BusinessunitMasterService {

  url : string = 'http://localhost:3000/master_BusinessUnit';
  constructor(private http: HttpClient) { }

      getBusinessUnit() {  
          return this.http.get<BusinessunitDetails[]>(this.url);  
        } 
}
