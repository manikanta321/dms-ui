import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  // displaycode:any;
   status:any;
   code:any;
   geography:any;
}
const ELEMENT_DATA: PeriodicElement[] = [

  {position: 1 ,code: '', name: 'Hydrogen',geography: '',  status:'Delete'},
  {position: 2, code: '', name: 'Hydrogen',geography: '',  status:'active'},
  {position: 3, code: '', name: 'Hydrogen',geography: '', status:'active'},
  {position: 4, code: '', name: 'Hydrogen',geography: '',  status:'active'},
  {position: 5, code: '', name: 'Hydrogen',geography: '', status:'Delete'},

];
@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']
})
export class DealersComponent implements OnInit {
  displayedColumns: string[] = ['position','code', 'name','geography', 'status','edit'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }
  
}
