import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import * as moment from "moment";
import { SharedServicesProfilePicService } from 'src/app/services/shared-services-profile-pic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameofuser: any;
  passwordofuser: any;
  loginData: any;
  PasswordWrong: boolean = false;
  userExist: boolean = false;
  passwordrequired: boolean = false;
  usernameReqired: boolean = false;
  showPassword: boolean = false;
  redColor: boolean = false;
  errorMessage: any;
  constructor(
    private router: Router,
    private login: LoginService,
    private sharedService: SharedServicesProfilePicService,

  ) {
    localStorage.clear();

  }

  ngOnInit(): void {

  }
  closeerror() {
    this.redColor = false;

  }
  signIn() {
    // if(this.usernameofuser==userName && this.passwordofuser=='infi') {
    //   this.router.navigate(['../dashbord/user']);
    // }
    // this.router.navigate(['./dashbord']);

    // if(this.usernameofuser==undefined){
    //   this.usernameReqired=true
    // }
    // if(this.passwordofuser==undefined){
    //   this.passwordrequired = true
    // }
    if (this.usernameofuser != undefined && this.passwordofuser != undefined) {
      this.login.getloginDeatils(this.usernameofuser, this.passwordofuser).subscribe((res: any) => {

        if (res) {
          this.loginData = res;
          if (this.loginData == -1) {
            this.PasswordWrong = true;
            if (this.userExist = false) {
              this.userExist = false;
            }
          }
          else if (this.loginData.id > 0) {

            localStorage.setItem('token', this.loginData.token)
            this.setSession(this.loginData.token)
            console.log("LoginData", this.loginData);
            localStorage.setItem('logInId', this.loginData.id)
            localStorage.setItem('logInImage', this.loginData.image)
            this.sharedService.filter('Register click')

            localStorage.setItem('userName', this.loginData.userName)
            localStorage.setItem('userType', this.loginData.userType)
            localStorage.setItem('lastLoginDate', this.loginData.lastLoginDate);
            localStorage.setItem('roleId', this.loginData.roleId);

            this.login.CallGetUserRoles();
            // this.router.navigate(['../dashbord/user']);
          }
          else {
            this.userExist = true;
            if (this.PasswordWrong = false) {
              this.PasswordWrong = false;
            }
          }

        }


      },
        (err: any) => {

          console.log(err)
          this.errorMessage = err.error;
          this.redColor = true;
          // alert(this.errorMessage);

          if (this.errorMessage == 'Wrong Password') {
            this.errorMessage = 'Login Failed! Incorrect Username or Password'
          } else {
            this.errorMessage = err.error;

          }





        }


      );

    }
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  private setSession(authResult) {

    let expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

}
