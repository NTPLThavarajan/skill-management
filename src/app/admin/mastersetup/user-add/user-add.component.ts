import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserMasterService } from '../../Services/user-master.service';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { CommonConfirmMessageService } from '../../Services/common-confirm-message.service';
import { EmployeeDetails } from '../../interfaces/employee-details';
import { UseraddDialogComponent } from './useradd-dialog/useradd-dialog.component';
import { SpinnerDialogComponent } from './../../commoncomponent/spinnerdialog.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  empDetails: EmployeeDetails[];
  displayedColumns: string[] = ['emp_id', 'emp_name', 'user_password', 'designation', 'emp_location',
    'phoneno', 'mailid', 'bu_unitno', 'can_review', 'emp_status', 'resume', 'action'];
  dataSource: any;
  errorMessage: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userMasterService: UserMasterService, private commonConfMsgServ: CommonConfirmMessageService,
    public dialog: MatDialog, private router: Router) { }

    ngOnInit(): void {
      this.Initialization();
    }
  
    async Initialization() {
      this.dialog.open(SpinnerDialogComponent, { data: { Content: "Please Wait..." } });
      await this.delay(5000);
      this.getEmployeeList();
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
    const dialogRef = this.dialog.open(UseraddDialogComponent, {
      width: '600px', height: '425px', backdropClass: 'bgColor',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEmployeeList();
    });

  }
  getEmployeeList() {
    this.userMasterService.getEmployees()
      .subscribe((data: EmployeeDetails[]) => {
        this.empDetails = data.sort((a, b) => b.id - a.id);
        this.dataSource = new MatTableDataSource(this.empDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  async DeleteUser(employee: EmployeeDetails) {

    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want delete?, "
      + "EmployeeId: " + employee.emp_id, true) == true) {
      this.userMasterService.deleteEmployees(employee.id)
        .subscribe(async success => {
          if (await this.commonConfMsgServ.ConfirmMessage("User Delete Sucessfully.", false) == true) {
            this.getEmployeeList();
          }
        },
          async error => {
            this.errorMessage = "User Delete Abort, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.getEmployeeList();
            }

          }
        );
    }

  }
}


