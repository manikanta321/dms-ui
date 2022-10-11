import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ActiveSuccessPopComponent } from '../active-success-pop/active-success-pop.component';
@Component({
  selector: 'app-activatepop-up',
  templateUrl: './activatepop-up.component.html',
  styleUrls: ['./activatepop-up.component.css']
})
export class ActivatepopUpComponent implements OnInit {
  employeeId:any;
  employeename:any
  LoginId: any;
  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
     this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
    this.LoginId=localStorage.getItem("logInId");
  }
  close(){
    this.dialogRef.close()
  }
  reactive(){
    const data={
      UserId:this.employeeId,
     logedUserId:this.LoginId,
     status:"activate"
   }
   this.user.activeDeavtive(data).subscribe((res) => {     
   });
   this.dialog.open(ActiveSuccessPopComponent)
   this.dialogRef.close();
  }
}
