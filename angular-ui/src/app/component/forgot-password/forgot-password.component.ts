import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  enteremail:boolean=true;

  usernameofuser:any;
  constructor() { }

  ngOnInit(): void {
   
  }
  onsubmitemail(){
    this.enteremail=false

  }
}
