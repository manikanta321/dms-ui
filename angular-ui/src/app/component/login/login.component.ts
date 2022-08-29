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
      alert('sign')
      alert(this.usernameofuser);
      alert(this.passwordofuser)
  }

}
