import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkillMasterService } from '../../Services/skillmaster.service';
import { SkillMasterDetails } from '../../interfaces/skillmaster-details'
import { SkilldialogComponent } from './skilldialog/skilldialog.component';
import { Router } from '@angular/router';
import { CommonConfirmMessageService } from '../../Services/common-confirm-message.service';
import { SpinnerDialogComponent } from './../../commoncomponent/spinnerdialog.component';

@Component({
  selector: 'app-skillmaster',
  templateUrl: './skillmaster.component.html',
  styleUrls: ['./skillmaster.component.css']
})
export class SkillmasterComponent implements OnInit {
  SkillDetails: SkillMasterDetails[];
  displayedColumns = ['SkillType', 'SkillGroup', 'SkillName', 'Description', 'ParentSkill', 'Action'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  errorMessage: string;

  constructor(private SkillMaster: SkillMasterService, public dialog: MatDialog,
    private router: Router, private commonConfMsgServ: CommonConfirmMessageService) { }

  ngOnInit(): void {
    this.Initialization()
  }

  async Initialization() {
    this.dialog.open(SpinnerDialogComponent, { data: { Content: "Please Wait..." } });
    //await this.delay(5000);
    this.GetSkillList();
    this.dialog.closeAll();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(SkilldialogComponent, {
      width: '500px', height: '500px', backdropClass: 'bgColor',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetSkillList();
    });
  }

  GetSkillList() {
    this.SkillMaster.GetSkillMaster()
      .subscribe((data: SkillMasterDetails[]) => {
        this.SkillDetails = data.sort((a, b) => b.id - a.id);
        this.dataSource = new MatTableDataSource(this.SkillDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  async DeleteSkill(SkillData: SkillMasterDetails) {
    let sSkillType: string = SkillData.SkillType;
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want delete"
      + " Skill Type: " + sSkillType + "?", true) == true) {
      this.SkillMaster.DeleteSkillMaster(SkillData.id)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("Skill Type:" + sSkillType +
            " is deleted sucessfully.", false) == true) {
            this.GetSkillList();
          }
        },
          async error => {
            this.errorMessage = "Skill Type:" + sSkillType + "  Delete Abort, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.GetSkillList();
            }
          }
        );
    }
  }

}