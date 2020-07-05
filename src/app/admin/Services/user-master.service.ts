import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{EmployeeDetails}from '../interfaces/employee-details';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  url : string = 'http://localhost:3000/master_user_detail';
  constructor(private http: HttpClient) { }

         getEmployees() {  
          return this.http.get<EmployeeDetails[]>(this.url);  
        } 

        createUser(employeeAdd: EmployeeDetails) {  
          return this.http.post(this.url, employeeAdd);  
        } 

        updateEmployee(employee: EmployeeDetails) {  
          return this.http.put(this.url + '/' + employee.id, employee);  
        } 
        getEmployeeById(id: number) {  
          return this.http.get<EmployeeDetails>(this.url + '/' + id);  
        } 
        deleteEmployees(id: number) {  
          return this.http.delete<EmployeeDetails[]>(this.url +'/'+ id);  
        } 
}

