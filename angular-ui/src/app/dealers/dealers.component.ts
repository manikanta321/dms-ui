import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDealerPopupComponent } from '../component/Dealer-Popup/add-dealer-popup/add-dealer-popup.component';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { MatTableDataSource } from '@angular/material/table';
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
  // dataSource = ELEMENT_DATA;
  toppings = new FormControl('');
  toppings1 = new FormControl('');
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  toppingList1: string[] = ['Active', 'InActive'];
  sideBarOpen = true;
  columnDefs: ColDef[] = [
    { headerName: "Code",
      field: 'code' ,  width: 220, sort: 'desc'},
  
  
  
    {  headerName: "Name",
       field: 'name' ,  width: 220},
  
    {   headerName: "Geography",
      field: 'geography',  width: 220},
  
    { headerName: "Status",
       field: 'status',
       width: 220,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Active', 'Inactive', 'Invited', 'Locked',],
    }
    
  
  },

  {
    headerName: "",
    field: "edit",
    width: 250,
    cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
   },
  
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
  onCellValueChanged(event: CellValueChangedEvent) {
    alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  public rowData3=[
    {code: 'Dummy', name: 'Vishnu M',  geography: 'Dummy', status:'Active'},
    {code: 'Dummy', name: 'Mahendra S', geography: 'Dummy', status:'Invited'},
    {code: 'Dummy', name: 'Veerendra kr', geography: 'Dummy', status:'Locked'},
    {code: 'Dummy', name: 'mahathi Br', geography: 'Dummy', status:'Active'},
    {code: 'Dummy', name: 'chetheshwar T', geography: 'Dummy', status:'Locked'},
    {code: 'Dummy', name: 'Swami swami', geography: 'Dummy', status:'Locked'},
    {code: 'Dummy', name: 'narendra gs', geography: 'Dummy', status:'Locked'},
    {code: 'Dummy', name: 'prajwal vT', geography: 'Dummy', status:'Locked'},
    
    ];
  constructor(public dialog: MatDialog,
    private router: Router,) { }
  ngOnInit(): void {
  }
  addDealer(){
    this.dialog.open( AddDealerPopupComponent);
   }
   applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
sideBarToggler(){
  this.sideBarOpen = !this.sideBarOpen;
}
}
