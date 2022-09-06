import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDealerPopupComponent } from '../component/Dealer-Popup/add-dealer-popup/add-dealer-popup.component';
export interface PeriodicElement {
  name: string;
  position: number;
  displaycode:any;
   status:any;
   code:any;
   geography:any;
}
const ELEMENT_DATA: PeriodicElement[] = [

  {position: 2 ,code: '', name: 'Hydrogen',geography: '', displaycode: 1.0079, status:'Delete'},
  {position: 3, code: '', name: 'Hydrogen',geography: '', displaycode: 1.0079, status:'active'},
  {position: 4, code: '', name: 'Hydrogen',geography: '', displaycode: 1.0079, status:'active'},
  {position: 5, code: '', name: 'Hydrogen', geography: '',displaycode: 1.0079, status:'active'},
  {position: 6, code: '', name: 'Hydrogen', geography: '',displaycode: 1.0079, status:'Delete'},

];
@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']
})
export class DealersComponent implements OnInit {
  displayedColumns: string[] = ['position','code', 'name','geography', 'status','edit'];
  dataSource = ELEMENT_DATA;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(public dialog: MatDialog,
    private router: Router,) { }
  ngOnInit(): void {
  }
  addDealer(){
    this.dialog.open( AddDealerPopupComponent);
   }
  
}
