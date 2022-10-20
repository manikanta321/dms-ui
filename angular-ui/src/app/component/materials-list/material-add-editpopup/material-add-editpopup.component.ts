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

 import {Component,OnInit} from '@angular/core';
 import {FormBuilder, FormGroup} from '@angular/forms';
 import { MatDialog } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddIdentifierComponent } from '../add-identifier/add-identifier.component';
import { SelectProductComponent } from '../select-product/select-product.component';
 
 /**
  * @title Stepper animations
  */
 @Component({
  selector: 'app-material-add-editpopup',
  templateUrl: './material-add-editpopup.component.html',
  styleUrls: ['./material-add-editpopup.component.css']
 })
 export class MaterialAddEditpopupComponent {
  disabled = false;
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  toppingList2:  any= []; 
  toppingList3:  any= [];
  countryname: string[] = ['Malaysia (71/126)', 'India (178/178)','Philipines (0/135)'];
  statename: string[] = ['Johor(0/42)', 'Kedah(36/36','Perak(14/26)','Penang(21/22)'];
  regionname: string[] = ['North(4/4)', 'South(8/8)', 'East(6/6)','West(3/4)'];
  cityname:string[] =['George town','Balik Pulau','Batu Refringi','Teluk Bahang'];
  toprint:boolean=false;
  addButton:boolean =false;
  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem = null;
    constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}
   firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
   secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
   onSubCategoryAll(items: any) {
    console.log('onSelectAll', items);
  }
  onSubCategorySelect(item: any) {
    console.log(item);
  }
  onTypeSelect(item: any) {
    console.log(item);
  }
  onTypeAll(items: any) {
    console.log('onSelectAll', items);
  }
  cname1(cname:string,i:any){
    
    if(cname=='Eectronics'){
      // this.Sname= ['mobile', 'earphone','mouse'];
    }
    if(cname!='Eectronics'){
      // this.Sname= ['fan','fridge'];
    

    }
  }
  printvalue(valueofprint:boolean){
    this.toprint=valueofprint;
  }
  addCategory(){
    this.addButton =true;
  }
  
    onClick(item) {
    this.selectedItem = item;
  }
  selectProduct(){
    this.dialog.open(SelectProductComponent);
    
  }
  customIdentifier(){
    this.dialog.open(AddIdentifierComponent);
  }
 }

 
  
 