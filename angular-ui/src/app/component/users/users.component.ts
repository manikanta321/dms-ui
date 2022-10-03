import { Component, OnInit } from '@angular/core';
import { AddUserPopupComponent } from './userPopups/add-user-popup/add-user-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
import { CellClassParams,
  CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { UserService } from 'src/app/services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  myForm:any= FormGroup;
  myForms:any= FormGroup;
  disabled = false;
  ShowFilter = false;
  StatusFilter = false;
  limitSelection = false;
  statusSelection =false;
  cities:any = [];
  status:any = [];
  selectedItems: any = [];
  selectedStatus: any = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
   gridOptions = {
    // set background colour on every row, this is probably bad, should be using CSS classes
    rowStyle: { background: 'black' },

    // set background colour on even rows again, this looks bad, should be using CSS classes
    

    // other grid options ...
}

// status:any;

// Data that gets displayed in the grid
public rowData5=[
  {position: '6004005001', name: 'Rajasheka S', weight: 1.0079, symbol: 'Customer',emailid:'you@smartgig',phonenum:9448282822,status:'Active',Lastlogin:'22/2/2022',role:'admin'},
  {position: '6004005002', name: 'Manoranjan B', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822,status:'Inactive',Lastlogin:'22/2/2022',role:'manager'},
  {position: '6004005003', name: 'Vishnu M', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822 , status:'Active',Lastlogin:'22/2/2022',role:'manager'},
  {position: '6004005004', name: 'Mahendra S', weight: 1.0079, symbol: 'Dealer',emailid:'you@smartgig',phonenum:9448282822, status:'Invited',Lastlogin:'22/2/2022',role:'manager'},
  {position: '6004005005', name: 'Veerendra kr', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked',Lastlogin:'22/2/2022',role:'user'},
  {position: '6004005006', name: 'mahathi Br', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Active',Lastlogin:'22/2/2022',role:'manager'},
   {position: '6004005007', name: 'chetheshwar T', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked',Lastlogin:'22/2/2022',role:'manager'},
   {position: '6004005008', name: 'Swami swami', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked',Lastlogin:'22/2/2022',role:'manager'},

   {position: '6004005006', name: 'narendra gs', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked',Lastlogin:'22/2/2022',role:'dealer'},

   {position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked',Lastlogin:'22/2/2022',role:'manager'},
   {position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked',Lastlogin:'22/2/2022',role:'manager'},
   {position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin',emailid:'you@smartgig',phonenum:9448282822, status:'Locked',Lastlogin:'22/2/2022',role:'manager'},

];


// For accessing the Grid's API


// columnDefs: ColDef[] = [
//   { headerName: "User Id",
//     field: 'employeeCode' , sort: 'desc'},

//   {   headerName: "User Name",field: 'employeeName' },

//   { field: 'role', },

//   {  headerName: "Email Id",
//      field: 'emailId' },

//   {   headerName: "Phone no",
//     field: 'mobilePhone',},

//   {   headerName: "Last Login",
//     // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
//     field: 'lastLoginDate',type: ['nonEditableColumn']},


//   { headerName: "Status",
//      field: 'status', 
//   cellEditor: 'agSelectCellEditor',
//   cellEditorParams: {
//     values: ['Active', 'Inactive', 'Invited', 'Locked',],
//   }
// },
// // {
// //   headerName: "Avatar",
// //   field: "avatar",
// //   width: 100,
// //   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
// //  },

// ];


 ragCellClassRules: CellClassRules = {
  'rag-green-outer': (params) => params.value === 'Active',
  'rag-amber-outer': (params) => params.value === 'Inactive',
  'rag-red-outer': (params) => params.value === 2000,
};
columnDefs: ColDef[] = [
  { headerName: "User Id",
    field: 'position' , sort: 'desc'},

  {   headerName: "User Name",field: 'name' },

  { field: 'role',},

  {  headerName: "Email Id",
     field: 'emailid' },

  {   headerName: "Phone no",
    field: 'phonenum',},

  {   headerName: "Last Login",
    // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
    field: 'Lastlogin',type: ['nonEditableColumn'],
   
  },


  { headerName: "Status",
     field: 'status', 
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['Active', 'Inactive', 'Invited', 'Locked',],
  },
  cellClass: params => {                      
    return params.value == 'Inactive' ? 'my-class-1':  params.value =='Active'?'my-class-2': params.value=='Invited'?'my-class-3':'my-class-4'
},
},



{ headerName: "",
field: '',  filter: false, sortable: false,width:20,
cellRenderer: function clickNextRendererFunc(){
  return '<i class="fa fa-ellipsis-v" aria-hidden="true" (click)="editfn()"></i>';
}, 
},

// {
//   headerName: "Avatar",
//   field: "avatar",
//   width: 100,
//   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
//  },

];


rowData :any;
rowData1=[]
public defaultColDef: ColDef = {
  // set the default column width
  // width: 100,
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
  
  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user:UserService,
    private observer: BreakpointObserver,
    private fb: FormBuilder
   ) {
      sort:[];
     }

     onFirstDataRendered(params: FirstDataRenderedEvent) {
      params.api.sizeColumnsToFit();
    }

  //   getRowStyle = params => {
  //     if (params.node.rowIndex % 2 === 0) {
  //         return { background: 'red' };
  //     }
  // };


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

  this.cities = [
    { item_id: 1, item_text: 'New Delhi' },
    { item_id: 2, item_text: 'Sales Person' },
    { item_id: 3, item_text: 'Sales Executive' },
    { item_id: 4, item_text: 'Pune' },
    { item_id: 5, item_text: 'Chennai Express' },
    { item_id: 6, item_text: 'Navsari' }
];
this.status = [
  { status_id: 1, status_text: 'Active' },
  { status_id: 2, status_text: 'Inactive' },
  { status_id: 3, status_text: 'Locked' },
  { status_id: 4, status_text: 'Away' },
  { status_id: 5, status_text: 'Be Right Back' },
  { status_id: 6, status_text: 'Unlocked' }
];
this.selectedItems = [];
this.selectedStatus = [];
this.dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
};
this.dropdownSettings1 = {
  singleSelection: false,
  idField: 'status_id',
  textField: 'status_text',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 2,
  allowSearchFilter: true
};
this.myForm = this.fb.group({
    city: [this.selectedItems]
});
this.myForms = this.fb.group({
  citys: [this.selectedItems]
});
}
onItemSelect(item: any) {
  console.log('onItemSelect', item);
}
onStatusSelect(item: any) {
console.log('onStatusSelect', item);
}
onSelectAll(items: any) {
  console.log('onSelectAll', items);
}
onStatusAll(items: any) {
console.log('onSelectAll', items);
}
toogleShowFilter() {
  this.ShowFilter = !this.ShowFilter;
  this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
  if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
  } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
  }
}
toogleStatusFilter() {
this.StatusFilter = !this.StatusFilter;
this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { allowSearchFilter: this.StatusFilter });
}

handleStatusSelection() {
if (this.statusSelection) {
    this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { statusSelection: 2 });
} else {
    this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { statusSelection: null });
}


  
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

// applyEmpFilter(ob:MatSelectChange,empfilter:EmpFilter) {

//   this.filterDictionary.set(empfilter.name,ob.value);
//   var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
//   this.dataSource.filter = jsonString;

// }
  addUser(){
   this.dialog.open( AddUserPopupComponent,);
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
