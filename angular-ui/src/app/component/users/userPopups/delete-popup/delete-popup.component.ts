import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {
  panelOpenState = true;
  employeeId:any;
  employeename:any
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
