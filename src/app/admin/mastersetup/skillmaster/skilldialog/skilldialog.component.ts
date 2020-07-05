import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ParentSkill, SkillGroup, SkillMasterDetails } from '../../../interfaces/skillmaster-details';
import { CommonConfirmMessageService } from '../../../Services/common-confirm-message.service';
import { SkillMasterService } from '../../../Services/skillmaster.service';
import { SkillDescriptionValidator, SkillGroupValidator, SkillNameValidator, SkillTypeValidator } from "./validation.validators";


@Component({
  selector: 'app-skilldialog',
  templateUrl: './skilldialog.component.html',
  styleUrls: ['./skilldialog.component.css']
})

export class SkilldialogComponent implements OnInit {

  SkillTitle: string;
  action: string;
  local_data: any;
  AddSkillMaster: FormGroup;
  btnvisibility: boolean = true;
  errorMessage: string;
  confirmClick: boolean;

  SkillGroupData: SkillGroup[];
  SkillGroupFilter: Observable<SkillGroup[]>;

  ParentSkillData: ParentSkill[] = [];
  ParentSkillFilter: Observable<ParentSkill[]>;

  constructor(public SkillMasterData: SkillMasterService,
    private dialogRef: MatDialogRef<SkilldialogComponent>,
    private addformBuilder: FormBuilder, private router: Router,
    private commonConfMsgServ: CommonConfirmMessageService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SkillMasterDetails) {

    this.local_data = { ...data };
    this.action = this.local_data.action;

    this.SkillMasterData.GetSkillGroup()
      .subscribe((data: SkillGroup[]) => {
        this.SkillGroupData = data;
        this.SkillGroupFilter = this.AddSkillMaster.get('SkillGroup').valueChanges.pipe(
          startWith(''), map(value => this.FilterSkillGroup(value)));
      });

    this.SkillMasterData.GetParentSkill()
      .subscribe((data: ParentSkill[]) => {
        for (let i = 0; i < data.length; i++) {
          if (this.local_data.SkillGroupID != data[i].id) {
            var GetValue: ParentSkill = { id: data[i].id, SkillName: data[i].SkillName };
            this.ParentSkillData.push(GetValue);
          }
        };
        this.ParentSkillFilter = this.AddSkillMaster.get('ParentSkill').valueChanges.pipe(
          startWith(''), map(value => this.FilterParentSkill(value)));
      });
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

    /*Bind Roll details*/
    this.AddSkillMaster = this.addformBuilder.group
      ({
        id: [this.local_data.id],
        SkillType: [this.local_data.SkillType, SkillTypeValidator],
        SkillGroupID: [this.local_data.SkillGroupID, SkillGroupValidator],
        SkillGroup: [this.local_data.SkillGroup, SkillGroupValidator],
        SkillName: [this.local_data.SkillName, SkillNameValidator],
        Description: [this.local_data.Description, SkillDescriptionValidator],
        ParentSkillID: [this.local_data.ParentSkillID],
        ParentSkill: [this.local_data.ParentSkill],
        CreatedUID: [this.local_data.CreatedUID],
        CreatedDateTime: [this.local_data.CreatedDateTime],
        UpdatedUID: [this.local_data.UpdatedUID],
        UpdatedDateTime: [this.local_data.UpdatedDateTime],
      });
  }

  private FilterSkillGroup(value: string): SkillGroup[] {
    const filterValue = value.toLowerCase();
    return this.SkillGroupData.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }

  private FilterParentSkill(value: string): ParentSkill[] {
    const filterValue = value.toLowerCase();
    return this.ParentSkillData.filter(option => option.SkillName.toLowerCase().indexOf(filterValue) === 0);
  }

  SkillGroupSelectionChanged(event) {
    const selectedValue = event.option.id;
    this.AddSkillMaster.patchValue({ SkillGroupID: selectedValue });
  }

  ParentSkillSelectionChanged(event) {
    const selectedValue = event.option.id;
    this.AddSkillMaster.patchValue({ ParentSkillID: selectedValue });
  }

  //#region Call Services
  /*Add Roll Master */
  async Add() {

    let sSkillType: string = this.AddSkillMaster.get('SkillType').value;
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want to add"
      + " Skill Type: " + sSkillType + "?", true) == true) {
      this.SkillMasterData.CreateNewSkillMaster(this.AddSkillMaster.value)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("Skill Type:" + sSkillType +
            " is added sucessfully.", false) == true) {
            this.dialogRef.close();
          }
        },
          async error => {
            this.errorMessage = "Skill Type:" + sSkillType + "  add aborted, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.dialogRef.close();
            }
          }
        );
    }
  }

  /*Update Roll Master */
  async Update() {
    let sSkillType: string = this.AddSkillMaster.get('SkillType').value;
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want to update"
      + " Skill Type: " + sSkillType + "?", true) == true) {
      this.SkillMasterData.UpdateSkillMaster(this.AddSkillMaster.value)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("Skill Type:" + sSkillType +
            " is updated sucessfully.", false) == true) {
            this.dialogRef.close();
          }
        },
          async error => {
            this.errorMessage = "Skill Type:" + sSkillType + "  update aborted, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.dialogRef.close();
            }
          }
        );
    }
  }
  //#endregion

}
