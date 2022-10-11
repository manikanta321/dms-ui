import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-active-success-pop',
  templateUrl: './active-success-pop.component.html',
  styleUrls: ['./active-success-pop.component.css']
})
export class ActiveSuccessPopComponent implements OnInit {
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
