import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RollMasterService } from '../../../Services/rollmaster.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RollMasterDetails } from '../../../interfaces/rollmaster-details';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { RollNameValidator } from "./validation.validator";
import { CommonConfirmMessageService } from '../../../Services/common-confirm-message.service';

@Component({
  selector: 'app-rolldialog',
  templateUrl: './rolldialog.component.html',
  styleUrls: ['./rolldialog.component.css']
})
export class RolldialogComponent implements OnInit {

  RollTitle: string;
  action: string;
  local_data: any;
  AddRollMaster: FormGroup;
  btnvisibility: boolean = true;
  errorMessage: string;
  confirmClick: boolean;

  constructor(public RollMasterData: RollMasterService,
    private dialogRef: MatDialogRef<RolldialogComponent>,
    private addformBuilder: FormBuilder, private router: Router,
    private commonConfMsgServ: CommonConfirmMessageService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RollMasterDetails) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit() {
    if (this.action == 'Update') {
      this.btnvisibility = false;
      this.local_data.update_date_time = formatDate(new Date().toUTCString(), 'dd-MM-yyyy hh:mm:ss a', 'en');
    }
    else if (this.action == 'Add') {
      this.btnvisibility = true;
      this.local_data.create_date_time = formatDate(new Date().toUTCString(), 'dd-MM-yyyy hh:mm:ss a', 'en');
    }

    let sReview: string = this.local_data.CanReview;
    let bReview: boolean = false;
    if (sReview === "Yes") bReview = true;

    /*Bind Roll details*/
    this.AddRollMaster = this.addformBuilder.group
      ({
        id: [this.local_data.id],
        RollName: [this.local_data.RollName, RollNameValidator],
        CanReview: [bReview],
        CreatedUID: [''],
        CraatedDateTime: [this.local_data.create_date_time],
        UpdatedUID: [''],
        UpdatedDateTime: [this.local_data.update_date_time],
      });
  }

  //#region Call Services
  /*Add Roll Master */
  async Add() {

    let sRollName: string = this.AddRollMaster.get('RollName').value;
    let bReview: boolean = this.AddRollMaster.get('CanReview').value;
    if (bReview === true) this.AddRollMaster.patchValue({ CanReview: 'Yes' });
    else this.AddRollMaster.patchValue({ CanReview: 'No' });

    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want to add"
      + " Roll Name: " + sRollName + "?", true) == true) {
      this.RollMasterData.CreateNewRollMaster(this.AddRollMaster.value)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("Roll Name:" + sRollName +
            " is added sucessfully.", false) == true) {
            this.dialogRef.close();
          }
        },
          async error => {
            this.errorMessage = "Roll Name:" + sRollName + "  add aborted, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.dialogRef.close();
            }
          }
        );
    }
  }

  /*Update Roll Master */
  async Update() {

    let sRollName: string = this.AddRollMaster.get('RollName').value;
    let bReview: boolean = this.AddRollMaster.get('CanReview').value;
    if (bReview === true) this.AddRollMaster.patchValue({ CanReview: 'Yes' });
    else this.AddRollMaster.patchValue({ CanReview: 'No' });

    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want to update"
      + " Roll Name: " + sRollName + "?", true) == true) {
      this.RollMasterData.UpdateRollMaster(this.AddRollMaster.value)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("Roll Name:" + sRollName +
            " is updated sucessfully.", false) == true) {
            this.dialogRef.close();
          }
        },
          async error => {
            this.errorMessage = "Roll Name:" + sRollName + "  update aborted, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.dialogRef.close();
            }
          }
        );
    }
  }
  //#endregion

}

