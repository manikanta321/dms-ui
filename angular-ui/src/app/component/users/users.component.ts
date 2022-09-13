import { Component, OnInit } from '@angular/core';
import { AddUserPopupComponent } from './userPopups/add-user-popup/add-user-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';

export interface PeriodicElement {
  name: any;
  position: string;
  weight: number;
  symbol: string;
  emailid:any;
  phonenum:number;
  status:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: '6004005001', name: 'Rajasheka S', weight: 1.0079, symbol: 'Customer',emailid:'you@smartgig',phonenum:9448282822,status:'Active'},
  {position: '6004005002', name: 'Manoranjan B', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822,status:'Inactive'},
  {position: '6004005003', name: 'Vishnu M', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822 , status:'Active'},
  {position: '6004005004', name: 'Mahendra S', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822, status:'Invited'},
  {position: '6004005005', name: 'Veerendra kr', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
  {position: '6004005006', name: 'mahathi Br', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Active'},
   {position: '6004005007', name: 'chetheshwar T', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
   {position: '6004005008', name: 'Swami swami', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

   {position: '6004005006', name: 'narendra gs', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

   {position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

];
import { EditPopupComponent } from './userPopups/edit-popup/edit-popup.component';
import { UomPopupComponent } from './userPopups/uom-popup/uom-popup.component';
import { EditUomPopupComponent } from './userPopups/edit-uom-popup/edit-uom-popup.component';
import { AddTaxTemplateComponent } from './userPopups/add-tax-template/add-tax-template.component';
import { AddcurrencyComponent } from './userPopups/addcurrency/addcurrency.component';
import { EditTaxTemplateComponent } from './userPopups/edit-tax-template/edit-tax-template.component';
import { DeletecomponentComponent } from '../deletecomponent/deletecomponent.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CellClickedEvent, ColDef, Color, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


// // Data that gets displayed in the grid
// public rowData=[
//   {position: '6004005001', name: 'Rajasheka S', weight: 1.0079, symbol: 'Customer',emailid:'you@smartgig',phonenum:9448282822,status:'Active'},
//   {position: '6004005002', name: 'Manoranjan B', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822,status:'Inactive'},
//   {position: '6004005003', name: 'Vishnu M', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822 , status:'Active'},
//   {position: '6004005004', name: 'Mahendra S', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822, status:'Invited'},
//   {position: '6004005005', name: 'Veerendra kr', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
//   {position: '6004005006', name: 'mahathi Br', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Active'},
//    {position: '6004005007', name: 'chetheshwar T', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
//    {position: '6004005008', name: 'Swami swami', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

//    {position: '6004005006', name: 'narendra gs', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

//    {position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},

// ];

// For accessing the Grid's API


columnDefs: ColDef[] = [ 
  { field: 'UserId' , sort: 'desc',width: 120},
  { field: 'User_Name' },
  { field: 'Role',width: 100 },
  { field: 'email_id' },
  { field: 'phonenum',width: 150  },
  { field: 'Lastlogin',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
  { field: 'Status', width: 100},


];

rowData = [
  {UserId: '6004005001',Role:'Admin', User_Name: 'Rajasheka S',email_id:'you@smartgig.com',Lastlogin:'28/8/2022',phonenum:9448282822,Status:'Active',},
  {UserId: '6004005002',Role:'Customer', User_Name: 'rama S',email_id:'you@smartgig.com',Lastlogin:'22/2/2222',phonenum:9448282833,Status:'Active',},
  {UserId: '6004005003',Role:'Dealer', User_Name: 'latha mangeshkar S',email_id:'you@smartgig.com',Lastlogin:'22/2/2222',phonenum:9448282822,Status:'Active',},
  {UserId: '6004005004',Role:'Admin', User_Name: 'revathi S',email_id:'you@smartgig.com',Lastlogin:'29/2/2222',phonenum:9448282822,Status:'Active',},
  {UserId: '6004005005',Role:'Admin', User_Name: 'kalavara S',email_id:'you@smartgig.com',Lastlogin:'26/2/2222',phonenum:944828282,Status:'Inactive',},
  {UserId: '6004005006',Role:'Customer', User_Name: 'ewika S',email_id:'you@smartgig.com',Lastlogin:'24/8/2222',phonenum:9448282222,Status:'Active',},

  {UserId: '6004005007',Role:'Admin', User_Name: 'Rajasheka S',email_id:'you@smartgig',Lastlogin:'22/8/2222',phonenum:9448282822,Status:'Invited',},
  {UserId: '6004005008',Role:'Dealer', User_Name: 'Rajasheka S',email_id:'you@smartgig',Lastlogin:'25/8/2222',phonenum:9448282822,Status:'Active',},
  {UserId: '6004005009',Role:'Customer', User_Name: 'Rajasheka S',email_id:'you@smartgig',Lastlogin:'26/8/2222',phonenum:9448282822,Status:'Active',},

];
  public defaultColDef: ColDef = {
    // set the default column width
    width: 150,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,
    sortable: true,
  };

// public defaultColDef: ColDef = {
//   sortable: true,
//   resizable: true,
//   width: 100,
//   enableRowGroup: true,
//   enablePivot: true,
//   enableValue: true,
// };
public columnTypes: {
  [key: string]: ColDef;
} = {
  numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
  medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
  nonEditableColumn: { editable: false },
  dateColumn: {
    // specify we want to use the date filter
    filter: 'agDateColumnFilter',
    // add extra parameters for the date filter
    filterParams: {
      // provide comparator function
      comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
        // In the example application, dates are stored as dd/mm/yyyy
        // We create a Date object for comparison against the filter date
        const dateParts = cellValue.split('/');
        const day = Number(dateParts[0]);
        const month = Number(dateParts[1]) - 1;
        const year = Number(dateParts[2]);
        const cellDate = new Date(year, month, day);
        // Now that both parameters are Date objects, we can compare
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        } else {
          return 0;
        }
      },
    },
  },
};

public sideBar: SideBarDef | string | string[] | boolean | null = {
  toolPanels: ['columns'],
};
public rowGroupPanelShow = 'always';
public pivotPanelShow = 'always';


  columns: Array<GuiColumn> = [
		{
			header: 'Name',
			field: 'name' 			//source {name: 'T-shirt'}
		},
		{
			header: 'Type',
			field: 'type' 			//source {type: 'clothes'}
		},
		{
			header: 'Price',
			field: 'price'			//source {price: '15$'}
		}];

	source: Array<any> = [
		{
			name: 'T-shirt',		//columns {header: 'Name', field: 'name'}
			type: 'clothes',		//columns {header: 'Type', field: 'type'}
			price: '15$' 			//columns {header: 'Price', field: 'price'}
		},
		{
			name: 'Shoes',
			type: 'footwear',
			price: '100$'
		},
		{
			name: 'Ball cap',
			type: 'headgear',
			price: '50$'
		}];

    sorting: GuiSorting = {
	    enabled: true
	};

	paging: GuiPaging = {
		enabled: true,
		page: 1,
		pageSize: 10,
		pageSizes: [10, 25, 50],
		pagerTop: true,
		pagerBottom: true,
		display: GuiPagingDisplay.BASIC
	};

	searching: GuiSearching = {
		enabled: true,
		placeholder: 'Search heroes'
	};  

  columnMenu: GuiColumnMenu = {
		enabled: true,
		sort: true,
		columnsManager: true,

  };

	// sorting: GuiSorting = {
	// 	enabled: true,
	// 	multiSorting: true
	// };
  displayedColumns: string[] = ['position', 'name',  'symbol','email','phonenum','login','status','edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  toppings = new FormControl('');
  toppings1 = new FormControl('');

  toppingList: string[] = ['Admin', 'Dealer','Customer'];
  toppingList1: string[] = ['Active', 'Inactive','Invited','Locked'];
  filterDictionary: any;

  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
   ) {
      sort:[];
     }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }



  ngOnInit(): void {
 
  }
  applyFilter(event: Event) {
 

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

// applyEmpFilter(ob:MatSelectChange,empfilter:EmpFilter) {

//   this.filterDictionary.set(empfilter.name,ob.value);
//   var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
//   this.dataSource.filter = jsonString;

// }
  addUser(){
   this.dialog.open( AddUserPopupComponent,  { height: '580px',});
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
  edittaxTempl(){
    this.dialog.open( EditTaxTemplateComponent);
  }
  delete(){
    this.dialog.open( AddUserPopupComponent,{ height: '580px', });

  }
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  // onGridReady(params: GridReadyEvent) {
  //   this.rowData= [
  //     {position: '6004005001', name: 'Rajasheka S', weight: 1.0079, symbol: 'Customer',emailid:'you@smartgig',phonenum:9448282822,status:'Active'},
  //     {position: '6004005002', name: 'Manoranjan B', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822,status:'Inactive'},
  //     {position: '6004005003', name: 'Vishnu M', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822 , status:'Active'},
  //     {position: '6004005004', name: 'Mahendra S', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822, status:'Invited'},
  //     {position: '6004005005', name: 'Veerendra kr', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
  //     {position: '6004005006', name: 'mahathi Br', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Active'},
  //      {position: '6004005007', name: 'chetheshwar T', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
  //      {position: '6004005008', name: 'Swami swami', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
    
  //      {position: '6004005006', name: 'narendra gs', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
    
  //      {position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked'},
    
  //   ];
  // }
 
  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
  // onGridReady(params: GridReadyEvent<>) {
  //   this.gridColumnApi = params.columnApi;

  //   this.http
  //     .get<IOlympicData[]>(
  //       'https://www.ag-grid.com/example-assets/olympic-winners.json'
  //     )
  //     .subscribe((data) => (this.rowData = data));
  // }

}
