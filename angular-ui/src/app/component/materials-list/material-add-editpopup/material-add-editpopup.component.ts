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
 import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
 import { MatDialog } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddIdentifierComponent } from '../add-identifier/add-identifier.component';
import { AddProductGroupComponent } from '../add-product-group/add-product-group.component';
import { AddProductSubGroupComponent } from '../add-product-sub-group/add-product-sub-group.component';
import { SelectProductComponent } from '../select-product/select-product.component';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
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
  catgname:any=[];
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
  ShowFilter = false;
  subCategoryFilter=false;
  myForm: any = FormGroup;
  toppings: any = [];
  toppings1: any = [];
  toppings2: any = [];
  materialIdentifier:any=[];
  selectedItems: any;
  sub_category:any;
  typeI:any;
  rowData5:any=[];
  dropdownSettings: IDropdownSettings = {};
    constructor(private fb: FormBuilder, public dialog: MatDialog,
      private addMaterials: AddMaterialsService) {}
   firstFormGroup: FormGroup = this.fb.group({firstCtrl: ['']});
   secondFormGroup: FormGroup = this.fb.group({secondCtrl: ['']});

   ngOnInit():void {
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'catId',
      textField: 'catName',
      itemsShowLimit: 1,
      allowSearchFilter: this.ShowFilter
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'subCatId',
      textField: 'subCatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.subCategoryFilter
    };
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
this.getclassification();
this.getAllUom();
this.getMaterialIdentifier();
   }
   getclassification() {

    this.addMaterials.getclassification().subscribe((res) => {
      let data = res.response;
      this.catgname = data.allOtherCats;
      // let dataCat = data.allOtherCats;
      this.toppings = new FormControl(this.catgname);
    })
  }
  getMaterialIdentifier(){
    this.addMaterials.getMaterialIdentifier().subscribe((res) => {
      let data = res.response;
     this.materialIdentifier =data;
    })
  }
   onSubCategoryAll(items: any) {
    console.log('onSelectAll', items);
  }
  onItemSelect(item:any){
    // alert(item.catId)
    this.addMaterials.onclickcat(item.catId).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      this.toppings1 = new FormControl(this.sub_category);
    });
  }
  onSubCategorySelect(item:any){
    this.addMaterials.onclicksubcat(item.subCatId).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      console.log("Typess", this.typeI);
      this.toppings2 = new FormControl(this.typeI);
    });
  }
  onUomSelect(item:any){
    // alert(item.uoMShortName);
  }
  getAllUom(){
    const data={
      search:"",
    }
    this.addMaterials.getuomDeatils(data).subscribe((res: any) => {
      console.log('uom list',res.response)
      
     this.rowData5=res.response;
    });
  }
  onIdentiSelect(item:any){
// alert(item.materialCustomName)
  }
  onTypeSelect(item: any) {
    // alert(item.typeId)
  }
  onTypeAll(item:any){
    console.log(item);
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
  addproduct(){
    this.dialog.open(AddProductGroupComponent);
    
  }
  addproductsubgroup(){
    this.dialog.open(AddProductSubGroupComponent);
    
  }
  customIdentifier(){
    this.dialog.open(AddIdentifierComponent);
  }
 }

 
  
 