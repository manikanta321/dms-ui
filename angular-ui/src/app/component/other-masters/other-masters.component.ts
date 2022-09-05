import { Component, OnInit } from '@angular/core';
import { AddUserPopupComponent } from '../users/userPopups/add-user-popup/add-user-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  displaycode:any;
   status:any;
}
export interface PeriodicElement1 {
  name: string;
  position: number;
  displayunit:any;
   status:any;
   rate:any;
   effectivedate:any;
   standerdcur:any;
}


const ELEMENT_DATA: PeriodicElement[] = [
 
  {position: 2, name: 'Hydrogen', displaycode: 1.0079, status:'Delete'},
  {position: 3, name: 'Hydrogen', displaycode: 1.0079, status:'active'},
  {position: 4, name: 'Hydrogen', displaycode: 1.0079, status:'active'},
  {position: 5, name: 'Hydrogen', displaycode: 1.0079, status:'active'},
  {position: 6, name: 'Hydrogen', displaycode: 1.0079, status:'Delete'},

];

const ELEMENT_DATA1: PeriodicElement1[] = [
  {position: 1, name: 'Hydrogen', displayunit: 1.0079, rate:12,effectivedate:123,standerdcur:123, status:'active'}, 
  {position: 1, name: 'Hydrogen', displayunit: 1.0079, rate:12,effectivedate:123,standerdcur:123, status:'active'},
  {position: 1, name: 'Hydrogen', displayunit: 1.0079, rate:12,effectivedate:123,standerdcur:123, status:'active'},
  {position: 1, name: 'Hydrogen', displayunit: 1.0079, rate:12,effectivedate:123,standerdcur:123, status:'active'},
];
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { UomPopupComponent } from '../users/userPopups/uom-popup/uom-popup.component';
import { EditUomPopupComponent } from '../users/userPopups/edit-uom-popup/edit-uom-popup.component';
import { AddTaxTemplateComponent } from '../users/userPopups/add-tax-template/add-tax-template.component';
import { AddcurrencyComponent } from '../users/userPopups/addcurrency/addcurrency.component';

@Component({
  selector: 'app-other-masters',
  templateUrl: './other-masters.component.html',
  styleUrls: ['./other-masters.component.css']
})
export class OtherMastersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'status','edit'];
  displayedColumns1: string[] = ['position', 'name', 'displayunit','rate','effectivedate','standerdcur','status','edit'];

  dataSource = ELEMENT_DATA;
  dataSource1=ELEMENT_DATA1;
  toppings = new FormControl('');
  toppingList: string[] = ['Active', 'Inactive'];

  constructor(public dialog: MatDialog,
    private router: Router,) { }

  ngOnInit(): void {
 
  }
  addUser(){
   this.dialog.open( AddUserPopupComponent,  { height: '580px', });
  }
  editUser(){
    this.dialog.open( EditPopupComponent,);
  }
  AddUomPopup(){
    this.dialog.open(UomPopupComponent,);
  }
  EditUomPopup(){
    this.dialog.open( EditUomPopupComponent,);
  }
  addtaxTempl(){
    this.dialog.open( AddTaxTemplateComponent,);
  }
  addCurrency(){
    this.dialog.open( AddcurrencyComponent);
  }
}






