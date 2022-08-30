import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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

}