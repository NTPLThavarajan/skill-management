import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationDetails } from '../../../interfaces/location-details';
import { LocationMasterService } from '../../../Services/location-master.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { formatDate } from '@angular/common';
import { AbstractControl, ValidationErrors } from "@angular/forms"
import { CommonConfirmMessageService } from '../../../Services/common-confirm-message.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-locationdialog',
  templateUrl: './locationdialog.component.html',
  styleUrls: ['./locationdialog.component.css']
})
export class LocationdialogComponent implements OnInit {
  loading = false;
  action: string;
  local_data: any;
  addForm: FormGroup;
  updateForm: FormGroup;
  btnvisibility: boolean = true;
  errorMessage: string;
  confirmClick: boolean;
  locformlabel: string = 'Add Location';
  locformbtn: string = 'Add';

  constructor(public dialogRef: MatDialogRef<LocationdialogComponent>,
    private locationService: LocationMasterService,
    private commonConfMsgServ: CommonConfirmMessageService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: LocationDetails,
    private addformBuilder: FormBuilder) {

    this.local_data = { ...data };
    this.action = this.local_data.action;



  }
  LocationValidator(control: AbstractControl): ValidationErrors | null {
    let getErrorObject =
      function (ShowError, ErrMessage): ValidationErrors {
        return { ShowError, ErrMessage }
      }

    let value: string = control.value || '';

    if (value.length <= 0)
      return getErrorObject(true, 'Location is required');

    else if (value.length > 0 && value.length > 10)
      return getErrorObject(true, 'Location should be 10 characters');

    return null;
  }

  async Add() {
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want add?, "
      + "Location: " + this.addForm.value.location_name, true) == true) {
      //if (this.confirmClick == true) {     
      this.locationService.createLocations(this.addForm.value)
      .subscribe(async success => {
        if (await this.commonConfMsgServ.ConfirmMessage("Location Add Sucessfully.", false) == true) {
          this.dialogRef.close();
        }         
        },
        async error => {
          this.errorMessage = "Location Add Abort, ErrorMessage: " + JSON.stringify(error);
          if(await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true)
          {
            this.dialogRef.close();
          }
           
        }
        
       );
      }
  }

  async Update() {
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want add?, "
      + "Location: " + this.addForm.value.location_name, true) == true) {
      // if (this.confirmClick == true) {
      this.locationService.updateLocations(this.addForm.value)
        .subscribe(async success => {
          console.log("Location Update Sucessfully");
          if (await this.commonConfMsgServ.ConfirmMessage("Location Update Sucessfully.", false) == true) {
            this.dialogRef.close();
          } 
        },
        async error => {
          this.errorMessage = "Location Update Abort, ErrorMessage: " + JSON.stringify(error);
          if(await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true)
          {
            this.dialogRef.close();
          }
        }
        
       );
        }
    }
  ngOnInit(): void {

    /*Bind User details*/
    this.addForm = this.addformBuilder.group({
      id: [this.local_data.id],
      location_id: [this.local_data.location_id],
      location_name: [this.local_data.location_name, this.LocationValidator],
    });

    /*if(this.action =='Add')
    {
      this.local_data.create_date_time = formatDate(new Date().toUTCString(), 'dd-MM-yyyy hh:mm:ss a', 'en');
      this.local_data.create_user_id = '1255';
    }*/
    if (this.action == 'Update') {
      this.btnvisibility = false;
      this.locformlabel = 'Edit Location';
      this.locformbtn = 'Update';
      this.local_data.create_date_time = formatDate(new Date().toUTCString(), 'dd-MM-yyyy hh:mm:ss a', 'en');
      this.local_data.create_user_id = '1255';
      //this.local_data.lo
    }

  }

}
