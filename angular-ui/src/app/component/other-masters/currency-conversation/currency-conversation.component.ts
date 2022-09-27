
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import {AddcurrencyComponent} from '../../users/userPopups/addcurrency/addcurrency.component';
export interface PeriodicElement {
  name: string;
  displayunit: number;
  rate: number;
  effectivedate:number;
  status:any;
  standardcurr:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Rajasheka S', displayunit: 79, rate: 12 ,effectivedate: 10 ,standardcurr: '$',status:'Active'},
  { name: 'Manoranjan B', displayunit: 55, rate:34, effectivedate: 12,standardcurr: '$',status:'Inactive'},
  {name: 'Vishnu M', displayunit:46, rate: 33, effectivedate:12 , standardcurr: '$',status:'Active'}, 
  { name: 'Mahendra S', displayunit: 35, rate:22,  effectivedate: 12, standardcurr: '$',status:'Invited'},
  { name: 'Veerendra kr', displayunit: 86, rate:85, effectivedate: 12 ,standardcurr: '$', status:'Locked'},
  {name: 'mahathi Br', displayunit: 66, rate:56, effectivedate: 12 , standardcurr: '$', status:'Active'},
   { name: 'chetheshwar T', displayunit: 10, rate: 7, effectivedate: 12 ,standardcurr: '$', status:'Locked'},
   { name: 'Swami swami', displayunit: 79, rate:21, effectivedate: 12 ,  standardcurr: '$',status:'Locked'},

   { name: 'narendra gs', displayunit: 1.0079, rate: 55, effectivedate:12, standardcurr: '$', status:'Locked'},

   { name: 'prajwal vT', displayunit: 23, rate:36, effectivedate: 12, standardcurr: '$', status:'Locked'},

];
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { UserService } from 'src/app/services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-currency-conversation',
  templateUrl: './currency-conversation.component.html',
  styleUrls: ['./currency-conversation.component.css']
})

export class CurrencyConversationComponent implements OnInit {
status:any;
public rowData3 = [
  {name: 'Rajasheka S', displayunit: 79, rate: 12 ,effectivedate: 10 ,standardcurr: '$',status:'Active'},
  { name: 'Manoranjan B', displayunit: 55, rate:34, effectivedate: 12,standardcurr: '$',status:'Inactive'},
  {name: 'Vishnu M', displayunit:46, rate: 33, effectivedate:12 , standardcurr: '$',status:'Active'},
  { name: 'Mahendra S', displayunit: 35, rate:22,  effectivedate: 12, standardcurr: '$',status:'Invited'},
  { name: 'Veerendra kr', displayunit: 86, rate:85, effectivedate: 12 ,standardcurr: '$', status:'Locked'},
  {name: 'mahathi Br', displayunit: 66, rate:56, effectivedate: 12 , standardcurr: '$', status:'Active'},
   { name: 'chetheshwar T', displayunit: 10, rate: 7, effectivedate: 12 , standardcurr: '$',status:'Locked'},
   { name: 'Swami swami', displayunit: 79, rate:21, effectivedate: 12 ,  standardcurr: '$',status:'Locked'},

   { name: 'narendra gs', displayunit: 1.0079, rate: 55, effectivedate:12, standardcurr: '$', status:'Locked'},

   { name: 'prajwal vT', displayunit: 23, rate:36, effectivedate: 12, standardcurr: '$',status:'Locked'},
]

// // Data that gets displayed in the grid
// public rowData=[
//   {position: '6004005001', name: 'Rajasheka S', weight: 1.0079, rate: 'Customer',effectivedate:'12',status:'Active'},
//   {position: '6004005002', name: 'Manoranjan B', weight: 1.0079, rate: 'Dealer',effectivedate:'12',status:'Inactive'},
//   {position: '6004005003', name: 'Vishnu M', weight: 1.0079, rate: 'Admin',effectivedate:'12',phonenum:9448282822 , status:'Active'},
//   {position: '6004005004', name: 'Mahendra S', weight: 1.0079, rate: 'Dealer',effectivedate:'12', status:'Invited'},
//   {position: '6004005005', name: 'Veerendra kr', weight: 1.0079, rate: 'Admin',effectivedate:'12', status:'Locked'},
//   {position: '6004005006', name: 'mahathi Br', weight: 1.0079, rate: 'Admin',effectivedate:'12', status:'Active'},
//    {position: '6004005007', name: 'chetheshwar T', weight: 1.0079, rate: 'Admin',effectivedate:'12', status:'Locked'},
//    {position: '6004005008', name: 'Swami swami', weight: 1.0079, rate: 'Admin',effectivedate:'12', status:'Locked'},

//    {position: '6004005006', name: 'narendra gs', weight: 1.0079, rate: 'Admin',effectivedate:'12', status:'Locked'},

//    {position: '6004005006', name: 'prajwal vT', weight: 1.0079, rate: 'Admin',effectivedate:'12', status:'Locked'},

// ];

// For accessing the Grid's API


columnDefs: ColDef[] = [
  
  {   headerName: "Name",field: 'name' },

  
  {  headerName: "Display Unit",
     field: 'displayunit' },

     
     {  headerName: "Rate",
     field: 'rate' },

     {  headerName: "Effective Date",
     field: 'effectivedate' },


     {  headerName: "Standard Currency",
     field: 'standardcurr' , width : 220},


  { headerName: "Status",
     field: 'status', width: 180,
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['Active', 'Inactive', 'Invited', 'Locked',],
  }
  

},
// {
//   headerName: "Avatar",
//   field: "avatar",
//   width: 100,
//   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
//  },

];

rowData1=[]
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
  displayedColumns: string[] = ['position', 'name',  'rate','email','phonenum','login','status','edit'];
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
  rowData: any;
  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user:UserService,
    private observer: BreakpointObserver
   ) {
      sort:[];
     }
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }



  ngOnInit(): void {
  this.getusertabeldata();
  this.roleItems();
  this.statusItems();
  }
  refresh(){
    this.toppings = new FormControl(this.toppingList);
    this.toppings1 = new FormControl(this.toppingList1);

    // var ageFilterComponent = this.gridApi.getFilterInstance('')!;
    // ageFilterComponent.setModel(null);
    // this.gridApi.onFilterChanged();
this.getusertabeldata();
  }

getusertabeldata(){
  this.user.getuserDeatils().subscribe((res: any) => {
      
    this.rowData = res.response;
    if (this.rowData.length >= 1) {
    this.rowData.forEach((element: { [x: string]: any; }) => {
    if (element['status']=='Confirmed'){
}
    else{
      element['isActive']=='Inactive'

    }
console.log('element',element['isActive'])
    });
  }

    console.log('row data',this.rowData1)

  });
}
addCurrency(){

  this.dialog.open( AddcurrencyComponent);

}
roleItems(){

  // if (res != undefined) {
  //   let localdata = res.data;

  //   this.gradeList = localdata.map((dt) => {
  //     return { grade_id: dt.gradeId, grade_name: dt.gradeName };
  //   });
  //   if (!this.gradesArray?.length) {
  //     this.gradesArray = localdata.map((grade) => {
  //       return grade.gradeId;
  //     });
  //   }
  //   this.gradesArray.push(0)
  //   // this.gradeList.push({ grade_id: 0, grade_name: 'all'})

  //   this.grades = new FormControl(this.gradesArray);
  // }

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







roleFilter(){
  let roleName=this.toppings.value
  console.log('rolename',roleName)
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


  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }


  onCellValueChanged(event: CellValueChangedEvent) {
    alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }


  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    alert(data.status)
    // console.log(
    //   'onRowValueChanged: (' +
    //     data.make +
    //     ', ' +
    //     data.model +
    //     ', ' +
    //     data.price +
    //     ', ' +
    //     data.field5 +
    //     ')'
    // );
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  
}
