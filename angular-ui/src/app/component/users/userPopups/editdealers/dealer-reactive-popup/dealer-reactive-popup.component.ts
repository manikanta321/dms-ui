import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DealerReactvSuccessComponent } from '../dealer-reactv-success/dealer-reactv-success.component';

@Component({
  selector: 'app-dealer-reactive-popup',
  templateUrl: './dealer-reactive-popup.component.html',
  styleUrls: ['./dealer-reactive-popup.component.css']
})
export class DealerReactivePopupComponent implements OnInit {

  constructor( private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
  }
  reactv(){
    this.dialog.open(DealerReactvSuccessComponent ,{panelClass: 'activeSuccessPop'})
    this.dialogRef.close()
   }
}
