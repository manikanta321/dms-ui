import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-activatepop-up',
  templateUrl: './activatepop-up.component.html',
  styleUrls: ['./activatepop-up.component.css']
})
export class ActivatepopUpComponent implements OnInit {
  employeeId:any;
  employeename:any
  constructor(private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
     this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
  }
  close(){
    this.dialogRef.close()
  }
}
