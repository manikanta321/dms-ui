import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  redirectMessage:boolean= false;
  userExist:boolean = false;
  username:any = '';
  errorMessage: any;
  err: any;
  constructor(private user:UserService) { }

  ngOnInit(): void {
   
  }
  onsubmitemail(){
    let data = {
      username:this.username
    }
    this.user.forgotPassword(data).subscribe(
      {
        next: (res:any)=>{
          if(res){
            this.redirectMessage = !this.redirectMessage;
          }
        },
        error: (err:any)=>{
          this.err = err.Error
          console.log(err)
        }
     }
    //   (res: any) => {
    //   if(res){
    //   this.redirectMessage = !this.redirectMessage;
    //   }
    // },
    
    // (err: any) => {
    //   console.log(err)
    //     this.errorMessage = err.error;
    //     alert(this.errorMessage)
    //   }
      )
    
  }
}
