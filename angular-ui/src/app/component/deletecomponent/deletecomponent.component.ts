import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { RestPwsdUserPopupComponent } from '../users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';

@Component({
  selector: 'app-deletecomponent',
  templateUrl: './deletecomponent.component.html',
  styleUrls: ['./deletecomponent.component.css']
})
export class DeletecomponentComponent implements OnInit {
  panelOpenState = true;
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog) { }
   

  ngOnInit(): void {

  }
  closeDialog(){
    this.dialogRef.close();
  }
  editUser(){
    this.dialog.open( EditPopupComponent,);
  }
  deactive(){
    this.dialog.open(DeactivateUserpopupComponent);
  }
  resetpws(){
    this.dialog.open(RestPwsdUserPopupComponent);
  }
}