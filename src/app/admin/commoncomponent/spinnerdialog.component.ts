import { Component,Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
    selector: 'dialog-elements-example-dialog',
    template: `<div style="height:10px;">
  <p style="margin-left:25px; margin-top: -17px; color:blue;">
    {{DisplayText}}
    </p>
  </div>`
  })
  export class SpinnerDialogComponent {
   public DisplayText:string;
    constructor(private dialogRef: MatDialogRef<SpinnerDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public ReceiveValue: any) {
      dialogRef.disableClose = true;
      this.DisplayText=ReceiveValue.Content;
    }
  }