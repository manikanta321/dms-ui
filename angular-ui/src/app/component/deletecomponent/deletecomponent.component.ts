import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ActivatepopUpComponent } from '../users/userPopups/activatepop-up/activatepop-up.component';

import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { PswResetPopupComponent } from '../users/userPopups/psw-reset-popup/psw-reset-popup.component';
import { RestPwsdUserPopupComponent } from '../users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';
@Component({
  selector: 'app-deletecomponent',
  templateUrl: './deletecomponent.component.html',
  styleUrls: ['./deletecomponent.component.css']
})
export class DeletecomponentComponent implements OnInit {
  panelOpenState = true;
  employeeId:any;
  employeename:any;
  LoginId:any;
  selected:boolean=false;
  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,
    private dialog: MatDialog) { }
   

  ngOnInit(): void {
    // this.employeeId = localStorage.getItem("userID");
    // this.employeename=localStorage.getItem("employeeName");
    // this.LoginId=localStorage.getItem("logInId");

  }
  closeDialog(){
    this.dialogRef.close();
  }
  editUser(){
   
    this.dialog.open( EditPopupComponent,);
    this.dialogRef.close()
  }
  deactive(){
    this.dialog.open(DeactivateUserpopupComponent);
    this.dialogRef.close()
  }

  activate(){
    this.dialog.open(ActivatepopUpComponent);
    this.dialogRef.close()
  }
  resetpws(){
    this.dialog.open(PswResetPopupComponent);
    this.dialogRef.close();
  }
  tickmark(){
    this.selected = true;
  }
}