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
