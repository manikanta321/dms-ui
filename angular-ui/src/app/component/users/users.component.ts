import { Component, OnInit } from '@angular/core';
import { AddUserPopupComponent } from './userPopups/add-user-popup/add-user-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

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
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554,status:'inactive'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554 , status:'active'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'invited'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'active'},
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','email','phonenum','login','status','edit'];
  dataSource = ELEMENT_DATA;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(public dialog: MatDialog,
    private router: Router,) { }

  ngOnInit(): void {
 
  }
  addUser(){
   this.dialog.open( AddUserPopupComponent );
  }
}
