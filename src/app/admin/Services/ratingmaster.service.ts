import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ RatingDetails }from '../interfaces/rating-detail';

@Injectable({
  providedIn: 'root'
})
export class RatingmasterService {
  url : string = 'http://localhost:3000/master_rating';
  constructor(private http : HttpClient) { }

  getRating() {  
    return this.http.get<RatingDetails[]>(this.url);  
  } 
  createRating(RatingAdd: RatingDetails) {  
    return this.http.post(this.url, RatingAdd);  
  } 
  updateRating(RatingAdd: RatingDetails) {  
    return this.http.put(this.url + '/' + RatingAdd.id, RatingAdd);  
  } 
  getRatingById(id: number) {  
    return this.http.get<RatingDetails>(this.url + '/' + id);  
  } 
  deleteRating(id: number) {  
    return this.http.delete<RatingDetails[]>(this.url +'/'+ id);  
  } 

}
