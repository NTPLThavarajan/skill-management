import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{LocationDetails}from '../interfaces/location-details';

@Injectable({
  providedIn: 'root'
})
export class LocationMasterService {

  url : string = 'http://localhost:3000/master_location';
  constructor(private http: HttpClient) { }

       getLocations() {  
          return this.http.get<LocationDetails[]>(this.url);  
        } 
        createLocations(LocationAdd: LocationDetails) {  
          return this.http.post(this.url, LocationAdd);  
        } 
        updateLocations(LocationAdd: LocationDetails) {  
          return this.http.put(this.url + '/' + LocationAdd.id, LocationAdd);  
        } 
        getLocationById(id: number) {  
          return this.http.get<LocationDetails>(this.url + '/' + id);  
        } 
        deleteLocations(id: number) {  
          return this.http.delete<LocationDetails[]>(this.url +'/'+ id);  
        } 
}
