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
import { CellClassParams,CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef ,GridApi} from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { UserService } from 'src/app/services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PopupCellRendererComponent } from '../popup-cell-renderer/popup-cell-renderer.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private gridApi!: GridApi;

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
  userTypes:any=[];
  statusTypes:any=[];
  searchText:any;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  
   gridOptions = {
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    // set background colour on every row, this is probably bad, should be using CSS classes
    rowStyle: { background: 'black' },

    // set background colour on even rows again, this looks bad, should be using CSS classes
    

    // other grid options ...
}

// status:any;

// Data that gets displayed in the grid
public rowData5=[];
public popupParent: HTMLElement = document.body;


columnDefs: ColDef[] = [ 

  { headerName: "User Id",
field: 'employeeCode' , sort: 'desc'},

{   headerName: "User Name",field: 'employeeName' },

{headerName: "Role", field: 'roleName', },

{  headerName: "Email Id",
 field: 'emailId' },

{   headerName: "Phone no",
field: 'mobilePhone',},

{   headerName: "Last Login",
// field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
field: 'lastLoginDate',type: ['nonEditableColumn'],
},


{ headerName: "Status",
 field: 'statusName', 
cellEditor: 'agSelectCellEditor',
cellEditorParams: {
values: ['Active', 'Inactive', 'Invited', 'Locked',],
},
cellClass: params => {                      
  return params.value == 'Inactive' ? 'my-class-1':  params.value =='Active'?'my-class-2': params.value=='Invited'?'my-class-3':'my-class-4'
},
},
{ 

   headerName: "",
field: '',  filter: false, sortable: false,width:20,
cellRenderer: function clickNextRendererFunc(){
  return '<i class="fa fa-ellipsis-v" aria-hidden="true" `(click)="editfn()`"></i>';
}, 
 cellEditorPopup: true,
 onCellClicked: (event: CellClickedEvent) =>``
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
  msg1: any;
  msg: any;
  userId: any;
  
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

this.myForm = this.fb.group({
    city: [this.selectedItems]
});
this.myForms = this.fb.group({
  citys: [this.selectedItems]
});
}
editfn(){
  alert('guru')
}
// onCellClicked($event){}

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
    this.myForm = this.fb.group({
      city: [this.selectedItems]
  });
  this.myForms = this.fb.group({
    citys: [this.selectedItems]
  });
    // var ageFilterComponent = this.gridApi.getFilterInstance('')!;
    // ageFilterComponent.setModel(null);
    // this.gridApi.onFilterChanged();
    const data={
      userTypes:[],
      statuss:[],
      search:'',
  
    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {     
      this.rowData5 = res.response;
    });
this.getusertabeldata();
  }

getusertabeldata(){

    const data={
      userTypes:[],
      statuss:[],
    }
      this.user.getuserDeatilsUser(data).subscribe((res) => {
      
    this.rowData5 = res.response;
    console.log('tableDaaaata', this.rowData5 )
    if (this.rowData5.length >= 1) {
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
makeCellClicked(){
  alert('ohoh')
}
roleItems(){
  this.user.getroleDetails().subscribe((res: any) => {
    let localdata=res.response;
console.log('checkdata',localdata)

    this.toppingList = localdata.map((data: { roleId: any; roleName: any; }) => {
      return { roleId: data.roleId, roleName: data.roleName };
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
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'roleId',
      textField: 'roleName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect Al l',
      itemsShowLimit: 2,
      allowSearchFilter: this.ShowFilter
  };
  this.selectedItems = [];
  });
}

statusItems(){
  this.user.getstatusDeatils().subscribe((res: any) => {
    this.toppingList1=res.response;
    // this.toppingList1 = localdata.map((data: { status_id: any; status_name: any; }) => {
    //   return {status_id: data.status_id, status_name: data.status_name };
    // });

    // if (!this.toppingList1?.length) {
    //   this.toppingList1 = localdata.map((status: { status_name: any; }) => {
    //     return status.status_name;
    //   });
    // }
    // this.toppingList1.push()
    console.log('we have to check here', this.toppingList1)
    // this.toppingList = res.response;
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'statusId',
      textField: 'statusName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: this.StatusFilter
    };
    this.selectedStatus = [];
    this.toppings1 = new FormControl(this.toppingList1);

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
onItemSelect(item: any) {
  this.userTypes.push(item.roleId);

  const data={
    userTypes:this.userTypes,
    statuss:this.statusTypes,
    search:this.searchText,

  }
  this.user.getuserDeatilsUser(data).subscribe((res) => {     
    this.rowData5 = res.response;
  });
  console.log('rolefilter', this.userTypes)
  console.log('onItemSelect', item);
}





onStatusSelect(item: any) {
  this.statusTypes.push(item.statusId);

  const data={
    userTypes:this.userTypes,
    statuss:this.statusTypes,
    search:this.searchText,
  }
  this.user.getuserDeatilsUser(data).subscribe((res) => {     
    this.rowData5 = res.response;
  });
  
}

onItemDeSelect(item: any) {
  this.userTypes.pop(item.roleId);
console.log(' this.userTypes', this.userTypes)
  const data={
    userTypes:this.userTypes,
    statuss:this.statusTypes,
    search:this.searchText,

  }
  this.user.getuserDeatilsUser(data).subscribe((res) => {     
    this.rowData5 = res.response;
  });
  console.log('rolefilter', this.userTypes)
  console.log('onItemSelect', item);
}




onStatusDeSelect(item: any) {
  this.statusTypes.pop(item.statusId);
console.log(' this.userTypes', this.userTypes)
  const data={
    userTypes:this.userTypes,
    statuss:this.statusTypes,
    search:this.searchText,

  }
  this.user.getuserDeatilsUser(data).subscribe((res) => {     
    this.rowData5 = res.response;
  });
  console.log('rolefilter', this.userTypes)
  console.log('onItemSelect', item);
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
    this.userId=e.data.userId;
    console.log('userID',this.userId)
    localStorage.setItem('userID',this.userId )
  }


  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
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
  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  openDialog(){
    // alert('mani')
    this.dialog.open( DeletecomponentComponent);
    
  }
  onBtnExport(){
    this.gridApi.exportDataAsCsv();

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
