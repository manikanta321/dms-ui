import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
     usernameofuser: any; 
    passwordofuser: any;
    loginData:any;
    PasswordWrong:boolean = false;
    userExist:boolean = false;
    passwordrequired:boolean=false;
    usernameReqired:boolean=false;
    showPassword: boolean = false;
  constructor(
    private router: Router,
    private login:LoginService,
  ) {
    localStorage.clear();

   }

  ngOnInit(): void {
   
  }
  signIn(){
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
  if(this.usernameofuser!=undefined && this.passwordofuser != undefined){
    this.login.getloginDeatils(this.usernameofuser,this.passwordofuser).subscribe ((res: any) => {
      this.loginData = res.response;
      console.log("LoginData",this.loginData);
      if(this.loginData == -1){
        this.PasswordWrong =true;
        if(this.userExist =false){
        this.userExist =false;
        }
      }
      else if(this.loginData == 1){
        this.router.navigate(['../dashbord/user']);
      }
      else {
this.userExist =true;
if(this.PasswordWrong =false){
  this.PasswordWrong =false;
  }      }
    });

  }
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
