import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RatingDetails } from '../../../interfaces/rating-detail';
import { RatingmasterService } from '../../../Services/ratingmaster.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { formatDate } from '@angular/common';
import { AbstractControl, ValidationErrors } from "@angular/forms"
import { CommonConfirmMessageService } from '../../../Services/common-confirm-message.service';


@Component({
  selector: 'app-ratingdialog',
  templateUrl: './ratingdialog.component.html',
  styleUrls: ['./ratingdialog.component.css']
})
export class RatingdialogComponent implements OnInit {

  action: string;
  local_data: any;
  addForm: FormGroup;
  updateForm: FormGroup;
  btnvisibility: boolean = true;
  errorMessage: string;
  confirmClick: boolean;
  locformlabel: string = 'Add Rating';
  locformbtn: string = 'Add';



  constructor(public dialogRef: MatDialogRef<RatingdialogComponent>,
    private ratingService: RatingmasterService,
    private commonConfMsgServ: CommonConfirmMessageService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RatingDetails,
    private addformBuilder: FormBuilder) {

    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  RatingValidator(control: AbstractControl): ValidationErrors | null {
    let getErrorObject =
      function (ShowError, ErrMessage): ValidationErrors {
        return { ShowError, ErrMessage }
      }

    let value: string = control.value || '';

    if (value.length <= 0)
      return getErrorObject(true, 'Rating is required');

    else if (value.length > 0 && value.length > 10)
      return getErrorObject(true, 'Rating should be 10 characters');

    return null;
  }


  async Add() {
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want add?, "
      + "Rating: " + this.addForm.value.rating, true) == true) {
      this.ratingService.createRating(this.addForm.value)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("Rating Add Sucessfully.", false) == true) {
            this.dialogRef.close();
          }
        },
          async error => {
            this.errorMessage = "Rating Add Abort, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.dialogRef.close();
            }

          }

        );
    }
  }


  async Update() {
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want add?, "
      + "Location: " + this.addForm.value.location_name, true) == true) {
      this.ratingService.updateRating(this.addForm.value)
        .subscribe(async success => {
          console.log("Location Update Sucessfully");
          if (await this.commonConfMsgServ.ConfirmMessage("Location Update Sucessfully.", false) == true) {
            this.dialogRef.close();
          }
        },
          async error => {
            this.errorMessage = "Location Update Abort, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
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
      rating_id: [this.local_data.rating_id],
      rating: [this.local_data.rating, this.RatingValidator],
    });


    if (this.action == 'Update') {
      this.btnvisibility = false;
      this.locformlabel = 'Edit Rating';
      this.locformbtn = 'Update';
      this.local_data.create_date_time = formatDate(new Date().toUTCString(), 'dd-MM-yyyy hh:mm:ss a', 'en');
      this.local_data.create_user_id = '1255';
    }

  }

}

