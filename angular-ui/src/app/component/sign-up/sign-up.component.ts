import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class ResetPassword implements OnInit {
  showPassword: boolean = false;
  showre_Password: boolean = false;
  showoldPassword: boolean = false;
  enterfirst:any;
  entersecond:any;
  myform !: FormGroup;
  username = new FormControl('', [
    Validators.required,
]);
confirmPassward = new FormControl('', [
    Validators.required,
    ]);

     hide = true;
  constructor() { }
 
  ngOnInit(): void {
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
}