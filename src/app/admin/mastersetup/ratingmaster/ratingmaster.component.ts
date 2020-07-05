import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { RatingDetails } from '../../interfaces/rating-detail';
import { RatingmasterService } from '../../Services/ratingmaster.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingdialogComponent } from '../ratingmaster/ratingdialog/ratingdialog.component';
import { CommonConfirmMessageService } from '../../Services/common-confirm-message.service';
import { SpinnerDialogComponent } from './../../commoncomponent/spinnerdialog.component';

@Component({
  selector: 'app-ratingmaster',
  templateUrl: './ratingmaster.component.html',
  styleUrls: ['./ratingmaster.component.css']
})
export class RatingmasterComponent implements OnInit {

  rateDetails: RatingDetails[];
  displayedColumns: string[] = [
    'rating_id',
    'rating',
    'action'
  ];
  dataSource: any;
  errorMessage: string;
  confirmClick: boolean;
  loading = false;

  /*@ViewChild(MatTable,{static:true}) table: MatTable<any>;*/
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private ratingmasterService: RatingmasterService,
    private commonConfMsgServ: CommonConfirmMessageService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.intialScreenload();
  }

  async intialScreenload() {

    this.dialog.open(SpinnerDialogComponent, { data: { Content: "Please Wait..." } });
    //await this.delay(5000);

    this.ratingmasterService.getRating()
      .subscribe((data: RatingDetails[]) => {
        this.rateDetails = data.sort((a, b) => b.id - a.id);
        this.dataSource = new MatTableDataSource(this.rateDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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
    this.loading = true;
    obj.action = action;
    const dialogRef = this.dialog.open(RatingdialogComponent, {
      width: '305px', height: '400px', backdropClass: 'bgColor',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.intialScreenload();
    });
    this.loading = false;
  }

  async DeleteUser(ratingDel: RatingDetails) {
    if (await this.commonConfMsgServ.ConfirmMessage("Are you sure you want delete?, "
      + "Rating: " + ratingDel.rating, true) == true) {
      this.ratingmasterService.deleteRating(ratingDel.id)
        .subscribe(async success => {
          console.log("Rating Delete Sucessfully");
          if (await this.commonConfMsgServ.ConfirmMessage("Location Delete Sucessfully.", false) == true) {
            this.intialScreenload();
          }
        },
          async error => {
            this.errorMessage = "Rating Delete Abort, ErrorMessage: " + JSON.stringify(error);
            if (await this.commonConfMsgServ.ConfirmMessage(this.errorMessage, false) == true) {
              this.intialScreenload();
            }
          }
        );
    }
  }
}
