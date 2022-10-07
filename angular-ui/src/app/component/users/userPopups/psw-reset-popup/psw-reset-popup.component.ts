import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RestPwsdUserPopupComponent } from '../rest-pwsd-user-popup/rest-pwsd-user-popup.component';

@Component({
  selector: 'app-psw-reset-popup',
  templateUrl: './psw-reset-popup.component.html',
  styleUrls: ['./psw-reset-popup.component.css']
})
export class PswResetPopupComponent implements OnInit {

  constructor( private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  confrmPWS(){
    this.dialog.open(RestPwsdUserPopupComponent);
    this.dialogRef.close();
  }
}
