import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { LocationDetails } from '../../interfaces/location-details';
import { LocationMasterService } from '../../Services/location-master.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationdialogComponent } from '../locationmaster/locationdialog/locationdialog.component';
import { CommonConfirmMessageService } from '../../Services/common-confirm-message.service';
import { SpinnerDialogComponent } from './../../commoncomponent/spinnerdialog.component';

@Component({
  selector: 'app-locationmaster',
  templateUrl: './locationmaster.component.html',
  styleUrls: ['./locationmaster.component.css']
})
export class LocationmasterComponent implements OnInit {

  locDetails: LocationDetails[];
  displayedColumns: string[] = [
    'location_id',
    'location_name',
    'action'
  ];
  dataSource: any;
  errorMessage: string;
  confirmClick: boolean;
  loading = false;

  /*@ViewChild(MatTable,{static:true}) table: MatTable<any>;*/
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private Locmasterservice: LocationMasterService,
    private commonConfMsgServ: CommonConfirmMessageService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.intialScreenload();
  }

  async intialScreenload() {

    this.dialog.open(SpinnerDialogComponent, { data: { Content: "Please Wait..." } });
   // await this.delay(5000);

    this.Locmasterservice.getLocations()
      .subscribe((data: LocationDetails[]) => {
        this.locDetails = data.sort((a, b) => b.id - a.id);
        this.dataSource = new MatTableDataSource(this.locDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.dialog.closeAll();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  openDialog(action, obj) {
    this.loading = true;
    obj.action = action;
    const dialogRef = this.dialog.open(LocationdialogComponent, {
      width: '305px', height: '400px', backdropClass: 'bgColor',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.intialScreenload();
    });
    this.loading = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async DeleteUser(locationDel: LocationDetails) {
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want delete?, "
      + "Location: " + locationDel.location_name, true) == true) {
      this.Locmasterservice.deleteLocations(locationDel.id)
        .subscribe(async success => {
          console.log("Location Delete Sucessfully");
          if (await this.commonConfMsgServ.ConfirmMessage("Location Delete Sucessfully.", false) == true) {
            this.intialScreenload();
          }
        },
          async error => {
            this.errorMessage = "Location Delete Abort, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.intialScreenload();
            }
          }
        );
    }
  }

}
