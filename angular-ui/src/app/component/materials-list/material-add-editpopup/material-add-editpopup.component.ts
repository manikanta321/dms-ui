// import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-material-add-editpopup',
//   templateUrl: './material-add-editpopup.component.html',
//   styleUrls: ['./material-add-editpopup.component.css']
// })
// export class MaterialAddEditpopupComponent implements OnInit {

//   constructor(public dialogRef: MatDialogRef<MaterialAddEditpopupComponent>) { }
//   isExpriySelected:boolean = false;

//   ngOnInit(): void {
//   }

//   addEditMaterial(){
//     this.dialogRef.close();
//   }

//   expiryDateChange(event:any){
//     console.log(event.target.value);
//     this.isExpriySelected = event.target.value == "Yes" ? true:false;
//   }
// }

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 import {Component} from '@angular/core';
 import {FormBuilder, FormGroup} from '@angular/forms';
 
 /**
  * @title Stepper animations
  */
 @Component({
  selector: 'app-material-add-editpopup',
  templateUrl: './material-add-editpopup.component.html',
  styleUrls: ['./material-add-editpopup.component.css']
 })
 export class MaterialAddEditpopupComponent {
   constructor(private _formBuilder: FormBuilder) {}
   firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
   secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
 }
 