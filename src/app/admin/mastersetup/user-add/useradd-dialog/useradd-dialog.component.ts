import { Component,OnInit,Inject, Optional  } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from "@angular/forms";
import { UserMasterService } from '../../../Services/user-master.service';
import {LocationMasterService } from '../../../Services/location-master.service';
import { LocationDetails } from  '../../../interfaces/location-details';
import {formatDate} from '@angular/common';
import {BusinessunitMasterService} from '../../../Services/businessunit-master.service';
import { BusinessunitDetails } from  '../../../interfaces/businessunit-details';
import {DesignationMasterService} from '../../../Services/designation-master.service';
import { DesignationDetails } from  '../../../interfaces/designation-details';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeDetails } from '../../../interfaces/employee-details';
import { CommonConfirmMessageService } from '../../../Services/common-confirm-message.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {EmpIdValidator,EmpNameValidator,MobileNoValidator,
  PwdValidator,EmailValidator} from "../../../validation/uservalidation";

let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

@Component({
  selector: 'app-useradd-dialog',
  templateUrl: './useradd-dialog.component.html',
  styleUrls: ['./useradd-dialog.component.css']
})
export class UseraddDialogComponent implements OnInit {

  locDetails: LocationDetails[];
  locDetailsFilter: Observable<LocationDetails[]>;
  buDetails:BusinessunitDetails[];
  buDetailsFilter: Observable<BusinessunitDetails[]>;
  desgDetails:DesignationDetails[];
  desgDetailsFilter: Observable<DesignationDetails[]>;
  empDetails: EmployeeDetails[];
  addForm: FormGroup;
  //updateForm: FormGroup;
  btnvisibility: boolean = true; 
  empformlabel: string = 'Add Employee';  
  empformbtn: string = 'Add'; 
  action:string;
  local_data:any;
  errorMessage:string;  


  constructor(private userAddService: UserMasterService,private locationService:LocationMasterService,
       private buService:BusinessunitMasterService, private desgService:DesignationMasterService,
       private commonConfMsgServ:CommonConfirmMessageService,private addformBuilder: FormBuilder,
       private router: Router,public dialogRef: MatDialogRef<UseraddDialogComponent>,
       @Optional() @Inject(MAT_DIALOG_DATA) public data: EmployeeDetails) {
        this.local_data = {...data};
        this.action = this.local_data.action;
       }

  ngOnInit(): void {
    /*Get Location details*/
    this.locationService.getLocations()
    .subscribe((data: LocationDetails[]) => {
      this.locDetails = data ;
      this.locDetailsFilter = this.addForm.get('emp_location').valueChanges
      .pipe(
        startWith(''),
        map(value => this.FilterLocation(value))
      );
    })

    /*Get BusinessUnit details*/
    this.buService.getBusinessUnit()
    .subscribe((data: BusinessunitDetails[]) => {
      this.buDetails = data ; 
      this.buDetailsFilter = this.addForm.get('bu_unitno').valueChanges
      .pipe(
        startWith(''),
        map(value => this.FilterBusinessUnit(value))
      );
    })

    /*Get Desegnation details*/
    this.desgService.getDesignations()
    .subscribe((data: DesignationDetails[]) => {
      this.desgDetails = data;
      this.desgDetailsFilter = this.addForm.get('designation').valueChanges
      .pipe(
        startWith(''),
        map(value => this.FilterDesignation(value))
      );
    })

    if(this.action =='Update')
    {
      this.btnvisibility = false;  
      this.empformlabel = 'Edit Employee';  
      this.empformbtn = 'Update'; 
      this.local_data.update_date_time = formatDate(new Date().toUTCString(), 'dd-MM-yyyy hh:mm:ss a', 'en');
      this.local_data.update_user_id = '1233';
    }
    if(this.action =='Add')
    {
      this.local_data.create_date_time = formatDate(new Date().toUTCString(), 'dd-MM-yyyy hh:mm:ss a', 'en');
      this.local_data.create_user_id = '1255';
    }
    /*Bind User details*/
    this.addForm = this.addformBuilder.group({ 
      id:[this.local_data.id],
      user_detail_id:[this.local_data.user_detail_id],
      emp_id:[this.local_data.emp_id,EmpIdValidator],
      emp_name:[this.local_data.emp_name,EmpNameValidator],
      user_password:[this.local_data.user_password,PwdValidator],
      designation:[this.local_data.designation],
      emp_location:[this.local_data.emp_location],
      phoneno:[this.local_data.phoneno,MobileNoValidator],
      mailid:[this.local_data.mailid,EmailValidator],
      bu_unitno:[this.local_data.bu_unitno],
      can_review:[this.local_data.can_review],
      emp_status:[this.local_data.emp_status],
      Resume:[this.local_data.resume],
      create_user_id:[this.local_data.create_user_id],
      create_date_time:[this.local_data.create_date_time],
      update_user_id:[this.local_data.update_user_id],
      update_date_time:[this.local_data.update_date_time]
    });  
  }
  async Add()
  {
    
    if(await this.commonConfMsgServ.ConfirmMessage("Are you sure you want add?, " 
         + "EmployeeId: " + this.addForm.value.emp_id, true) == true)
    {
      this.userAddService.createUser(this.addForm.value)  
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("User Add Sucessfully.", false) == true) {
            this.dialogRef.close();
          }         
      },
      async error => {
        this.errorMessage = "User Add Abort, ErrorMessage: " + JSON.stringify(error);
        if(await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true)
        {
          this.dialogRef.close();
        }
         
      }
      
     );
     
    }
}
async Update()
{
    
  if(await this.commonConfMsgServ.ConfirmMessage("Are you sure you want update?, " 
       + "EmployeeId: " + this.addForm.value.emp_id, true) == true)
    {
  this.userAddService.updateEmployee(this.addForm.value)
       .subscribe(async success => {
        if (await this.commonConfMsgServ.ConfirmMessage("User Update Sucessfully.", false) == true) {
          this.dialogRef.close();
        } 
    },
    async error => {
      this.errorMessage = "User Update Abort, ErrorMessage: " + JSON.stringify(error);
      if(await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true)
      {
        this.dialogRef.close();
      }
    }
    
   );
    }
}

private FilterLocation(value: string): LocationDetails[] {
  const filterValue = value.toLowerCase();
  return this.locDetails.filter(option => option.location_name.toLowerCase().includes(filterValue));
}

private FilterBusinessUnit(value: string): BusinessunitDetails[] {
  const filterValue = value.toLowerCase();
  return this.buDetails.filter(option => option.bu_name.toLowerCase().includes(filterValue));
}

private FilterDesignation(value: string): DesignationDetails[] {
  const filterValue = value.toLowerCase();
  return this.desgDetails.filter(option => option.role_name.toLowerCase().includes(filterValue));
}
}
