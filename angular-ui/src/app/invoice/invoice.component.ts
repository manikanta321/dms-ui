


import { Component, OnInit } from '@angular/core';
// import { AddUserPopupComponent } from './userPopups/add-user-popup/add-user-popup.component';
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
// import { EditPopupComponent } from './userPopups/edit-popup/edit-popup.component';
// import { UomPopupComponent } from './userPopups/uom-popup/uom-popup.component';
// import { EditUomPopupComponent } from './userPopups/edit-uom-popup/edit-uom-popup.component';
// import { AddTaxTemplateComponent } from './userPopups/add-tax-template/add-tax-template.component';
// import { AddcurrencyComponent } from './userPopups/addcurrency/addcurrency.component';
// import { EditTaxTemplateComponent } from './userPopups/edit-tax-template/edit-tax-template.component';
// import { DeletecomponentComponent } from '../deletecomponent/deletecomponent.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, bufferToggle, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { UserService } from 'src/app/services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UomServicesService } from 'src/app/services/uom-services.service';

import { SharedService } from 'src/app/services/shared-services.service';
import { UomActionComponent } from '../component/uom-action/uom-action.component';
import { UomPopupComponent } from '../component/users/userPopups/uom-popup/uom-popup.component';
import { InvoiceActionComponent } from '../invoice-action/invoice-action.component';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
status:any;

// Data that gets displayed in the grid


// For accessing the Grid's API
public popupParent: HTMLElement = document.body;

columnDefs: ColDef[] = [ 

  { headerName: "ID", 
field: 'uoMName' ,type: ['nonEditableColumn'], minWidth:400
},

{   headerName: "Uploaded By",field: 'uoMShortName',type: ['nonEditableColumn']},
{   headerName: "Upload On",field: 'uoMShortName',type: ['nonEditableColumn']},


// suppressMovable:true,
{ headerName: "Total items",
 field: 'statusName', 
 type: ['nonEditableColumn'],
cellEditor: 'agSelectCellEditor',
cellEditorParams: {
values: ['Active', 'Inactive', 'Invited', 'Locked',],

},
maxWidth:150,
cellClass: params => {                      
  return params.value == 'Inactive' ? 'my-class-1':  params.value =='Active'?'my-class-2': params.value=='Invited'?'my-class-3':'my-class-4'
}
},
{ 

//    headerName: "",
// field: '',  filter: false, sortable: false,
// cellRenderer: function clickNextRendererFunc(){
//   return '<i class="fa fa-ellipsis-v" aria-hidden="true" `(click)="editfn()`"></i>';
// }, 
//  cellEditorPopup: true,
//  onCellClicked: (event: CellClickedEvent) => this.dialog.open( DeletecomponentComponent)


headerName: '',
colId: 'action',
cellRenderer: InvoiceActionComponent,
editable: false,
maxWidth:120


},

// {
//   headerName: "Avatar",
//   field: "avatar",
//   width: 100,
//   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
//  },

];

rowData5=[];
rowData :any;
rowData1=[]
public defaultColDef: ColDef = {
  // set the default column width
  suppressSizeToFit: true,

  // make every column editable
  editable: true,
  // make every column use 'text' filter by default
  filter: 'agTextColumnFilter',
  // enable floating filters by default
  // make columns resizable
  resizable: true,
  sortable: true,
  flex: 1,
  width:100

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


// public sideBar: SideBarDef | string | string[] | boolean | null = {
//   toolPanels: ['columns'],
// };
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
			field: 'price',			//source {price: '15$'}
		}];


  displayedColumns: string[] = ['position', 'name',  'symbol','email','phonenum','login','status','edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  toppings = new FormControl('');
  toppings1 = new FormControl('');

  // toppingList: string[] = ['Admin', 'Dealer','Customer'];
  toppingList: any= [];

  toppingList1:  any= [];
  filterDictionary: any;
  sideBarOpen = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  roleName: any;
  statusname:any;
  props: any;
  msg1: any;
  msg: any;
  userId: any;
  roleArray:any[] = [];
  statusArray:any=[];
  searchText:any;  
  start: number = 0;
  limit: number = 15;
  uomName:any;
  end: number = this.limit + this.start;
  UomId:any;
  paginationPageSize = 10;
  paginationScrollCount:any;
  gridsOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      editable: true,
      suppressMenu: true,
      filter: true,
      floatingFilter: true,
      
      filterParams: { buttons: ['clear'] }
    },
    headerHeight: 60,
    animateRows: true,
    // pagination: false,
    paginationAutoPageSize: false,
}
  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user:UserService,
    private observer: BreakpointObserver,
    private uomservise:UomServicesService,
    private sharedService:SharedService,

   ) { this.sharedService.listen().subscribe((m:any)=>{
    console.log(m)
    this.getusertabeldata()

  })
      sort:[];
     }
     onFirstDataRendered(params: FirstDataRenderedEvent) {
      params.api.sizeColumnsToFit();
    }
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
  //     if (res.matches) {
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     } else {
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   });
  // }



  ngOnInit(): void {
  this.getusertabeldata();

  }
  refresh(){
    this.toppings = new FormControl(this.toppingList);
    this.toppings1 = new FormControl(this.toppingList1);

    // var ageFilterComponent = this.gridApi.getFilterInstance('')!;
    // ageFilterComponent.setModel(null);
    // this.gridApi.onFilterChanged();
this.getusertabeldata();
  }
  openDialog(){

  }

getusertabeldata(){
  const data={
    search:"",
  }
  this.uomservise.getuomDeatils(data).subscribe((res: any) => {
    console.log('uom list',res.response)
    
   this.rowData5=res.response;

  });
}

onSearchChange($event:any , anything?:any){
  const { target } = $event;
  this.searchText=target.value;
  const data={
    search:this.searchText,
  }
  this.uomservise.getuomDeatils(data).subscribe((res: any) => {
    console.log('uom list',res.response)
    
   this.rowData5=res.response;

  });
}

roleItems(){
  this.user.getroleDetails().subscribe((res: any) => {
    let localdata=res.response;


    this.toppingList = localdata.map((data: { designationId: any; designationName: any; }) => {
      return { role_id: data.designationId, role_name: data.designationName };
    });

    if (!this.toppingList?.length) {
      this.toppingList = localdata.map((role: { designationName: any; }) => {
        return role.designationName;
      });
    }
    this.toppingList.push()
    // this.toppingList = res.response;
    this.toppings = new FormControl(this.toppingList);

    console.log('rolelist',this.toppingList)
  });
}

statusItems(){
  this.user.getstatusDeatils().subscribe((res: any) => {
      
    let localdata=res.response;


    this.toppingList1 = localdata.map((data: { statusId: any; statusname: any; }) => {
      return {status_id: data.statusId, status_name: data.statusname };
    });

    if (!this.toppingList1?.length) {
      this.toppingList1 = localdata.map((status: { statusname: any; }) => {
        return status.statusname;
      });
    }
    this.toppingList1.push()
    // this.toppingList = res.response;
    this.toppings1 = new FormControl(this.toppingList1);

    console.log('status',this.toppingList1)

  });
}







roleFilter(data:any){
  console.log('data',data)
  this.roleName=this.toppings.value;
this.user.UserFilterServices(this.roleName,this.statusname).subscribe((res:any)=>{
  this.rowData = res.response;


});
  console.log('rolename',this.rowData)
}

  applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}


  announceSortChange(sortState: any) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  // Example of consuming Grid Event
  onCellClicked( e): void {
    console.log('cellClicked', e);
    this.UomId=e.data.uoMId;
    this.uomName=e.data.uoMName;
    // this.employeeName=e.data.userName;
    // console.log('userID',this.userId);
    localStorage.setItem('UomId',e.data.uoMId )
    localStorage.setItem('UomName',e.data.uoMName)
    
    localStorage.setItem('niId',e.data.uoMId )
    localStorage.setItem('Niname',e.data.uoMName)
    // localStorage.setItem('employeeName',this.employeeName )
    if (
      e.event.target.dataset.action == 'toggle' &&
      e.column.getColId() == 'action'
    ) {
      const cellRendererInstances = e.api.getCellRendererInstances({
        rowNodes: [e.node],
        columns: [e.column],
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        instance.togglePopup();

      }
    }

  }
  onCellValueChanged(event: CellValueChangedEvent) {
    alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  AddUomPopup(){
    this.dialog.open(UomPopupComponent,);
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    alert(data.status)
   
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  adduom(){
    this.dialog.open( UomPopupComponent);
  }
  clickNextRendererFunc(){
    alert('hlo');
  }

}

