import { Component, OnInit } from '@angular/core';

import { DeletecomponentComponent } from '../deletecomponent/deletecomponent.component';

import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../users/userPopups/add-user-popup/add-user-popup.component';
import { AddGeolistPopupComponent } from '../add-geolist-popup/add-geolist-popup.component';

export interface PeriodicElement {
  shippingForm: any;
  shippingTo: string;
  shippingCharges: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { shippingForm: '6004005001', shippingTo: 'Rajasheka S', shippingCharges: 1.0079 },
];

@Component({
  selector: 'app-geographic-list',
  templateUrl: './geographic-list.component.html',
  styleUrls: ['./geographic-list.component.css']
})
export class GeographicListComponent implements OnInit {

  private gridApi!: GridApi;
  myForm: any = FormGroup;
  myForms: any = FormGroup;
  selectedItems: any = [];
  rowData1 = [];
  rowData: any;
  userId: any;
  employeeName:any;
  searchText:any;
  userTypes:any=[];
  statusTypes:any=[];
  headerName: any;
  shippingChk:boolean=true;

  gridOptions = {
    resizable: true,
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    rowStyle: { background: 'black' },
}


shipPackCharges:any;
  shippingHeader: any;
  columnDefs:any;
  secondColumn: any;
  ThirdColumn: any;
  packageChk: boolean = false;
  // headerName: string;
  // fieldName: string;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user: UserService,
    private observer: BreakpointObserver,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.shipClick('Shipping')
  }
  public popupParent: HTMLElement = document.body;
  public rowData5 = [
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    {shippingTo:'Argentina Republic',shippingForm:'Argentina Republic',shippingCharges:' 100-500 (2000); 501-1000 (2500); 1001-1500 (3000); 1501-2000 (3500); 2001-2500 (4000); 2501-...'},
    ];
 
  
  public defaultColDef: ColDef = {
    // set the default column width
    width: 170,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
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
  displayedColumns: string[] = ['shippingForm', 'shippingTo', 'shippingCharges'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  toppings = new FormControl('');
  toppings1 = new FormControl('');

  // toppingList: string[] = ['Admin', 'Dealer','Customer'];
  toppingList: any = [];

  toppingList1: any = [];
  filterDictionary: any;
  sideBarOpen = true;
  scrolledIndex = 0;
  defaultPageSize = 12;

  refresh() {
    this.toppings = new FormControl(this.toppingList);
    this.toppings1 = new FormControl(this.toppingList1);
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
    // var ageFilterComponent = this.gridApi.getFilterInstance('')!;
    // ageFilterComponent.setModel(null);
    // this.gridApi.onFilterChanged();
    const data = {
      userTypes: [],
      statuss: [],
      search: '',

    }
    
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    this.getusertabeldata();
  }
  getusertabeldata() {

    const data = {
      userTypes: [],
      statuss: [],
    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {

      this.rowData5 = res.response;
      console.log('tableDaaaata', this.rowData5)
      if (this.rowData5.length >= 1) {
        this.rowData.forEach((element: { [x: string]: any; }) => {
          if (element['status'] == 'Confirmed') {
          }
          else {
            element['isActive'] == 'Inactive'

          }
          console.log('element', element['isActive'])
        });
      }

      console.log('row data', this.rowData1)

    });
  }
  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  openDialog() {
    // alert('mani')

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

  }
  onBtnExport(){
    this.gridApi.exportDataAsCsv();

  }
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
    this.userId=e.data.userId;
    this.employeeName=e.data.employeeName
    console.log('userID',this.userId)
    localStorage.setItem('userID',this.userId )
    localStorage.setItem('employeeName',this.employeeName )
  }
  onSearchChange($event:any , anything?:any){
    const { target } = $event;
    this.searchText=target.value;
    const data={
      userTypes:this.userTypes,
      statuss:this.statusTypes,
      search:this.searchText,
    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {     
      this.rowData5 = res.response;
    });

  }
  addUser(){
    this.dialog.open( AddGeolistPopupComponent,{
      width: '700px', //sets width of dialog
      height:'450px',
    });
   }

   shipClick(event:any){
      
      // this.fieldName = "Shipping Form";
      if(event == 'Shipping'){
        this.headerName ="Shipping From";
        this.secondColumn = "Shipping To"
        this.ThirdColumn = "Shipping Charges"
        this.shippingChk = true;
        this.packageChk = false;
       
      }else{
        this.headerName ="Shipping From";
        this.secondColumn = "Shipping To"
        this.ThirdColumn = "Packing Charges"
        this.shippingChk = false;
        this.packageChk = true;
      }
      this.shippingAndPackages();
   }

   shippingAndPackages(){
    this.columnDefs= [
      {
        headerName: this.headerName,field: 'shippingForm', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',
        width: 300   },
  
      { headerName: this.secondColumn, field: 'shippingTo', type: ['nonEditableColumn'] ,width: 400 },
  
      { headerName: this.ThirdColumn, field: 'shippingCharges', type: ['nonEditableColumn'] , width: 1100   }, 
      
    ];
   }
}
