import { Injectable } from '@angular/core';
import { SkillMasterDetails,SkillGroup,UserDetails } from '../interfaces/MasterDetails'

import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

UrlSkillMaster='http://localhost:3000/SkillMaster/';
UrlSkillGroup='http://localhost:3000/SkillGroup/';
UrlUserDetails='http://localhost:3000/UserDetails/';
public UserID:number=0;
public setData=true;
public setData1=false;
constructor(private httpClient: HttpClient) { }

/* Get User Details */
public GetUserDetails (UserName:string,Password:string): Observable<UserDetails[]> {
  UserName = UserName.trim();
  // Add safe, URL encoded search parameter if there is a search term
  const options = UserName ?
   { params: new HttpParams().set('UserID', UserName).set('Password',Password) } : {};
  return this.httpClient.get<UserDetails[]>(this.UrlUserDetails, options)
}
/* Get User Details */
public GetUserDetails1 (UserName:string): Observable<UserDetails[]> {
  UserName = UserName.trim();
  // Add safe, URL encoded search parameter if there is a search term
  const options = UserName ?
   { params: new HttpParams().set('UserID', UserName)} : {};
  return this.httpClient.get<UserDetails[]>(this.UrlUserDetails, options)
}
/* Register Details */
public RegisterDetails(GetData:any):Observable<SkillMasterDetails[]> {
  this.httpClient.post(this.UrlUserDetails,GetData).subscribe(data=>{console.log("POST Request is successful ", data);
 },error  => {console.log("Error", error);});
 return this.httpClient.get<SkillMasterDetails[]>(this.UrlUserDetails);
}
/* Reset Password Details */
public ResetPassword(UserID:number,GetData:any): Observable<UserDetails[]> {
  let url = 'http://localhost:3000/UserDetails/'+UserID;
  this.httpClient.patch(url,GetData).subscribe(data=>{console.log("PUT Request is successful ", data);
 },error  => {console.log("Error", error);});
 return this.httpClient.get<UserDetails[]>(this.UrlUserDetails);
}




}

