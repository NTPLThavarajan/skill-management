import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonConfirmMessageService {

  constructor(public dialog: MatDialog) { }

  async ConfirmMessage(message: string, conirmState: boolean) {

    const dialogData = new ConfirmDialogModel(message, conirmState);
    const dialogRef = await this.dialog.open(ConfirmDialogComponent, {
      width: '250px', height: '140px',
      data: dialogData
    });
    return dialogRef.afterClosed().toPromise();

  }
}
