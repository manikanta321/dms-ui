import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { RestPwsdUserPopupComponent } from '../rest-pwsd-user-popup/rest-pwsd-user-popup.component';

@Component({
  selector: 'app-psw-reset-popup',
  templateUrl: './psw-reset-popup.component.html',
  styleUrls: ['./psw-reset-popup.component.css']
})
export class PswResetPopupComponent implements OnInit {
  enterfirst:any;
  entersecond:any;
  userId:any;
  error:any='';
  LoginId:any
  constructor( private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private user:UserService,
    ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userID");
    this.LoginId=localStorage.getItem("logInId");


  }
  confrmPWS(){
    if(this.enterfirst==this.entersecond){
      let data={
        UserId:this.userId,
        newPassword:this.entersecond,
        CurrentUserId:this.LoginId
      }
      this.user.changepassword(data).subscribe((res: any) => {


      })
      this.dialog.open(RestPwsdUserPopupComponent, {panelClass: 'activeSuccessPop'});
      this.dialogRef.close();
    }
   this.error="Password doesn't match*"
  }
}
