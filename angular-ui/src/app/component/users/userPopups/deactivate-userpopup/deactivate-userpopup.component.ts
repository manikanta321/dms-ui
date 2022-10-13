import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { DeactiveSuccessPopComponent } from '../deactive-success-pop/deactive-success-pop.component';
@Component({
  selector: 'app-deactivate-userpopup',
  templateUrl: './deactivate-userpopup.component.html',
  styleUrls: ['./deactivate-userpopup.component.css']
})
export class DeactivateUserpopupComponent implements OnInit {
  employeeId:any;
  employeename:any
  LoginId:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private user:UserService,) { }

  ngOnInit(): void {
     this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
    this.LoginId=localStorage.getItem("logInId");
  }
  close(){
    this.dialogRef.close()
  }
  deactive(){
    const data={
      UserId:this.employeeId,
     logedUserId:this.LoginId,
     status:"deactivate"
   }
    this.user.activeDeavtive(data).subscribe((res) => {     
    });
    this.dialog.open(DeactiveSuccessPopComponent, {panelClass: 'deactiveSuccessPop'});
    this.dialogRef.close()
  }

}
