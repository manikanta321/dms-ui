import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
     usernameofuser: any; 
    passwordofuser: any;

  constructor(
    private router: Router,
  ) {
    localStorage.clear();

   }

  ngOnInit(): void {
   
  }
  signIn(){
    if(this.usernameofuser==9448254154 && this.passwordofuser=='mani') {
      this.router.navigate(['./dashbord']);
      
    }
  }

}
