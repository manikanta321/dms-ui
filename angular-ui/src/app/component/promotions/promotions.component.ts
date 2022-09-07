import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  emailid:any;
  phonenum:number;
  status:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554,status:'active'},
  {position: 2, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554,status:'inactive'},
  {position: 3, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554 , status:'active'},
  {position: 4, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'invited'},
  {position: 5, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
  {position: 6, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'active'},
   {position: 7, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
];
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','email','phonenum','login','status','edit'];
  dataSource = ELEMENT_DATA;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];



  constructor() { }

  ngOnInit(): void {
  }

}
