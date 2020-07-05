import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RollMasterService } from '../../Services/rollmaster.service';
import { RollMasterDetails } from '../../interfaces/rollmaster-details'
import { RolldialogComponent } from './rolldialog/rolldialog.component';
import { Router } from '@angular/router';
import { CommonConfirmMessageService } from '../../Services/common-confirm-message.service';
import { SpinnerDialogComponent } from './../../commoncomponent/spinnerdialog.component';

@Component({
  selector: 'app-rollmaster',
  templateUrl: './rollmaster.component.html',
  styleUrls: ['./rollmaster.component.css']
})
export class RollmasterComponent implements OnInit {
  RollDetails: RollMasterDetails[];
  displayedColumns = ['RollName', 'CanReview', 'Action'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  errorMessage: string;

  constructor(private RollMaster: RollMasterService, public dialog: MatDialog,
    private router: Router, private commonConfMsgServ: CommonConfirmMessageService) { }

  ngOnInit(): void {
    this.Initialization();
  }

  async Initialization() {

    this.dialog.open(SpinnerDialogComponent, { data: { Content: "Please Wait..." } });
    //await this.delay(5000);
    this.GetRollList();
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
    const dialogRef = this.dialog.open(RolldialogComponent, {
      width: '500px', height: '250px', backdropClass: 'bgColor',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetRollList();
    });
  }

  //#region Call Services

  /* Get all records from rollmaster*/
  GetRollList() {
    this.RollMaster.GetRollMaster()
      .subscribe((data: RollMasterDetails[]) => {
        this.RollDetails = data.sort((a, b) => b.id - a.id);
        this.dataSource = new MatTableDataSource(this.RollDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /*Delete Roll Master row */
  async DeleteRoll(RollData: RollMasterDetails) {
    let sRollName: string = RollData.RollName;
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want delete"
      + " Roll Name: " + sRollName + "?", true) == true) {
      this.RollMaster.DeleteRollMaster(RollData.id)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("Roll Name:" + sRollName +
            " is deleted sucessfully.", false) == true) {
            this.GetRollList();
          }
        },
          async error => {
            this.errorMessage = "Roll Name:" + sRollName + "  Delete Abort, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.GetRollList();
            }
          }
        );
    }
  }
  //#endregion

}