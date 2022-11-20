import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import * as moment from "moment";

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
  errorMessage: any;
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
    
    if(res){
      this.loginData = res;
      localStorage.setItem('token',this.loginData.token )
      this.setSession(this.loginData.token)
      console.log("LoginData",this.loginData);
      localStorage.setItem('logInId',this.loginData.id)
      localStorage.setItem('userName',this.loginData.userName)
      localStorage.setItem('userType',this.loginData.userType)
      localStorage.setItem('lastLoginDate',this.loginData.lastLoginDate)

      if(this.loginData == -1){
        this.PasswordWrong =true;
        if(this.userExist =false){
        this.userExist =false;
        }
      }
      else if(this.loginData.id > 0){
        this.router.navigate(['../dashbord/user']);
      }
      else {
this.userExist =true;
if(this.PasswordWrong =false){
  this.PasswordWrong =false;
  }      }
    
    }
     

},
(err: any) => {

console.log(err)
  this.errorMessage = err.error;
  alert(this.errorMessage)
}


);

  }
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  private setSession(authResult) {
  
    let expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}   

}
