import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DealerDeactiveComponent } from '../dealer-deactive/dealer-deactive.component';
import { DealerReactvSuccessComponent } from '../dealer-reactv-success/dealer-reactv-success.component';

@Component({
  selector: 'app-deactive-reactive-popup',
  templateUrl: './deactive-reactive-popup.component.html',
  styleUrls: ['./deactive-reactive-popup.component.css']
})
export class DeactiveReactivePopupComponent implements OnInit {
  dealer : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<any>,
  private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this. dealer = this.data;
  }
  dectrv(){
   this.dialog.open(DealerDeactiveComponent ,{panelClass: 'deactiveSuccessPop'});
   this.dialogRef.close();
  }
}
