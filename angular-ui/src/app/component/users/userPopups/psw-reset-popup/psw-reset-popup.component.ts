import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { RestPwsdUserPopupComponent } from '../rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from 
             '@angular/forms';
@Component({
  selector: 'app-psw-reset-popup',
  templateUrl: './psw-reset-popup.component.html',
  styleUrls: ['./psw-reset-popup.component.css']
})
export class PswResetPopupComponent implements OnInit {
  oldPassword:any
  latestPassword:any;
  relatestpassword:any;
  enterfirst:any;
  entersecond:any;
  userId:any;
  error:any='';
  LoginId:any;
  adminPassword:boolean =false;
  showPassword: boolean = false;
  showre_Password: boolean = false;
  showoldPassword: boolean = false;

  constructor( private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private user:UserService,
    ) { }

    passFormControl = new FormControl('', [
      Validators.required,
  ]);
  confirmFormControl = new FormControl('', [
      Validators.required,
      ]);

       hide =true;

  ngOnInit(): void {
    this.userId = localStorage.getItem("userID");
    console.log(this.userId)
    this.LoginId=localStorage.getItem("logInId");
    console.log(this.LoginId)
    this.adminPass();
  }
  adminPass(){
    let admin =sessionStorage.getItem("admin");
    if(admin !== '')
    {
      this.adminPassword = true;
      // alert(admin);
    }
    else{
      this.adminPassword =false;
    }
  }
  public PasswordVisibilityLatest(): void {
    this.showPassword = !this.showPassword;
  }
  public PasswordVisibilityreenter(): void {
    this.showre_Password = !this.showre_Password;
  }
  public PasswordVisibilityold(): void {
    this.showoldPassword = !this.showoldPassword;
  }
  
  


  


  changeUserPassword(){
    if(this.latestPassword==this.relatestpassword){
      let userChangePasswordData={
        UserId:this.LoginId,
        currentPassword:this.oldPassword,
        newPassword:this.relatestpassword
      }
      this.user.changePasswordByUser(userChangePasswordData).subscribe((res: any) => {

        alert('passwrodhaschanged' )
      })

    }else{
   this.error="*Entered fields doesn’t match"
  }
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
    }else {
   this.error="*Entered fields doesn’t match"
    }
  }
  

  closeDialog(){
    this.dialogRef.close();
  }
}
