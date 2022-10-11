import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deactive-success-pop',
  templateUrl: './deactive-success-pop.component.html',
  styleUrls: ['./deactive-success-pop.component.css']
})
export class DeactiveSuccessPopComponent implements OnInit {
  employeeId:any;
  employeename:any;

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
