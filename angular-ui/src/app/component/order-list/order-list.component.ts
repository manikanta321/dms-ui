import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';

import { DeletecomponentComponent } from '../deletecomponent/deletecomponent.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { UserService } from 'src/app/services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AddPromotionsComponent } from '../add-promotions/add-promotions.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddorderpromotionsComponent } from '../orders/addorderpromotions/addorderpromotions.component';
import { OrderlistActionPopupComponent } from './orderlist-action-popup/orderlist-action-popup.component';
import { SalesBulkUploadComponent } from '../sales-bulk-upload/sales-bulk-upload.component';
import { CustomDatePopupComponent } from '../orders/custom-date-popup/custom-date-popup.component';
// import { DateRange } from '@uiowa/date-range-picker';

export interface PeriodicElement {

  name: any;
  position: string;
  weight: number;
  symbol: string;
  emailid: any;
  phonenum: number;
  status: any;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: '6004005001', name: 'Rajasheka S', weight: 1.0079, symbol: 'Customer', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Active' },
//   { position: '6004005002', name: 'Manoranjan B', weight: 1.0079, symbol: 'Dealer', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Inactive' },
//   { position: '6004005003', name: 'Vishnu M', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Active' },
//   { position: '6004005004', name: 'Mahendra S', weight: 1.0079, symbol: 'Dealer', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Invited' },
//   { position: '6004005005', name: 'Veerendra kr', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },
//   { position: '6004005006', name: 'mahathi Br', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Active' },
//   { position: '6004005007', name: 'chetheshwar T', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },
//   { position: '6004005008', name: 'Swami swami', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },

//   { position: '6004005006', name: 'narendra gs', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },

//   { position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },

// ];
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})


export class OrderListComponent implements OnInit {
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // dateRange = new DateRange(new Date(2018, 1, 1), new Date(2018, 1, 31));
  // dateRange1 = DateRange.nextTwoWeeks();
  // maxDate = new Date();
  disableSelect = new FormControl(false);
  private gridApi!: GridApi;
  paginationPageSize = 10;
  myForm: any = FormGroup;
  myForms: any = FormGroup;
  disabled = false;
  ShowFilter = false;
  StatusFilter = false;
  limitSelection = false;
  statusSelection = false;
  cities: any = [];
  status: any = [];
  selectedItems: any = [];
  selectedStatus: any = [];
  userTypes: any = [];
  
  StatusId:any=[];

  GeographyId:any=[];

  DealerId:any=[];

  OrderDate:any = "";


  statusTypes: any = [];
  searchText: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  public rowData5 = [];
  
  public rowDatalist =[];
  
  public popupParent: HTMLElement = document.body;
  roleArray: any[] = [];
  statusArray: any = [];
  stayScrolledToEnd = true;
  paginationScrollCount: any;

  columnDefs: ColDef[] = [
    // { headerName: "User Id",
    //   field: 'employeeCode' , sort: 'desc'},

    { headerName: "Order No.", field: 'orderNUmber' },

    { headerName: "Order Date", field: 'orderDate', },

    {
      headerName: "Dealer",
      field: 'dealerName'
    },

    {
      headerName: "Geography",
      field: 'geographyName',
    },


    {
      headerName: "Status",
      field: 'status',
      maxWidth:120,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Closed','Approved',],
      }
    },
    // {
    //   headerName: "",
    //   field: '', filter: false, sortable: false,
    //   cellRenderer: function clickNextRendererFunc() {
    //     return '<i class="fa fa-ellipsis-v" aria-hidden="true" (click)="editfn()"></i>';
    //   }
    // },
    {
      headerName: '',
    
      colId: 'action',

      cellRenderer: OrderlistActionPopupComponent,
      editable: false,
      maxWidth: 70  
    },
    // {
    //   headerName: "Avatar",
    //   field: "avatar",
    //   width: 100,
    //   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
    //  },

  ];

  rowData: any;
  rowData1 = []
  public defaultColDef: ColDef = {
     
    suppressSizeToFit: true,
    width: 170,
    filter: 'agTextColumnFilter',
    flex: 1,
    minWidth: 100,
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
  UomId: any;
  uomId :any;
  uomName: any;
  clickNextRendererFunc() {
    alert('hlo');
  }


  // sorting: GuiSorting = {
  // 	enabled: true,
  // 	multiSorting: true
  // };
  displayedColumns: string[] = ['position', 'name', 'symbol', 'email', 'phonenum', 'login', 'status', 'edit'];
  toppings = new FormControl('');
  toppings1 = new FormControl('');

  // toppingList: string[] = ['Admin', 'Dealer','Customer'];
  toppingList: any = [];

  toppingList1: any = [];
  filterDictionary: any;
  sideBarOpen = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  roleName: any;
  statusname: any;
  instancePopup:any = null;
  dealerlist : any = [];
  dealerss : any =[]
  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user: UserService,
    private observer: BreakpointObserver
  ) {
    sort: [];
  }
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
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
    this.uomId = localStorage.getItem('niId');
    // this.roleItems();
    this.statusItems();
    // this.maxDate.setDate(this.maxDate.getDate() + 20);
    this.orderlistGrid();
  }
  refresh() {
    this.toppings = new FormControl(this.toppingList);
    this.toppings1 = new FormControl(this.toppingList1);

  
  }
  statusItems() {
    this.user.getstatusDeatils().subscribe((res: any) => {

      let localdata = res.response;


      this.toppingList1 = localdata.map((data: { statusId: any; statusname: any; }) => {
        return { status_id: data.statusId, status_name: data.statusname };
      });

      if (!this.toppingList1?.length) {
        this.toppingList1 = localdata.map((status: { statusname: any; }) => {
          return status.statusname;
        });
      }
      this.toppingList1.push()
      // this.toppingList = res.response;
      this.toppings1 = new FormControl(this.toppingList1);

      console.log('status', this.toppingList1)


    });
  }


  roleFilter(data: any) {
    console.log('data', data)
    this.roleName = this.toppings.value;
    this.user.UserFilterServices(this.roleName, this.statusname).subscribe((res: any) => {
      this.rowData = res.response;


    });
    console.log('rolename', this.rowData)
  }

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

  onItemSelect(item: any) {

    // alert(item.roleName)
    this.userTypes.push(item.roleId);

    const data = {
      userTypes: this.userTypes,
      statuss: this.statusTypes,
      search: this.searchText,

    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    // console.log('rolefilter', this.userTypes)
    // console.log('onItemSelect', item);
  }
  onItemSelectOrAll(item: any) {
    this.userTypes = this.roleArray;
    const data = {
      userTypes: this.userTypes,
      statuss: this.statusTypes,
      search: this.searchText,

    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemDeSelectOrAll(item: any) {
    const data = {
      userTypes: this.userTypes,
      statuss: [],
      search: this.searchText,

    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }



  onItemDeSelectOrAllStatus(item: any) {
    const data = {
      userTypes: this.userTypes,
      statuss: [],
      search: this.searchText,

    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.userTypes)
  }


  onItemSelectOrAllStatus(item: any) {
    this.statusTypes = this.statusArray;
    const data = {
      userTypes: this.userTypes,
      statuss: this.statusTypes,
      search: this.searchText,

    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.statusTypes)
  }

  onStatusSelect(item: any) {
    this.statusTypes.push(item.statusId);

    const data = {
      userTypes: this.userTypes,
      statuss: this.statusTypes,
      search: this.searchText,
    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }

  onItemDeSelect(item: any) {

    this.userTypes.forEach((element, index) => {
      if (element == item.roleId) this.userTypes.splice(index, 1);
    });
    console.log(' this.userTypes', this.userTypes)

    // this.userTypes.pop(item.roleId);
    const data = {
      userTypes: this.userTypes,
      statuss: this.statusTypes,
      search: this.searchText,

    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }



  onStatusDeSelect(item: any) {
    this.statusTypes.forEach((element, index) => {
      if (element == item.statusId) this.statusTypes.splice(index, 1);
    });
    // this.statusTypes.pop(item.statusId);
    console.log(' this.statusTypes', this.userTypes)
    const data = {
      userTypes: this.userTypes,
      statuss: this.statusTypes,
      search: this.searchText,

    }
    this.user.getuserDeatilsUser(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    // console.log('rolefilter', this.userTypes)
    // console.log('onItemSelect', item);
  }
  applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  openDialog() {

  }
  handleScroll(event) {
    if(this.instancePopup){
      this.instancePopup.togglePopup();
      this.instancePopup = null;
    }
    const grid = document.getElementById('gridContainer');
    if (grid) {
      const gridBody = grid.querySelector('.ag-body-viewport') as any;
      const scrollPos = gridBody.offsetHeight + event.top;
      const scrollDiff = gridBody.scrollHeight - scrollPos;
      //const api =  this.rowData5;
      this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
      this.paginationScrollCount = this.rowData5.length;
    }
  }

  addOrderPromotion(){
 
    this.dialog.open( AddorderpromotionsComponent,{width: '900px',height:'460px'});
  }


  // ORDER SEARCH SELECT

  onSearchChangeGEO($event: any, anything?: any){
    // const { target } = $event;
    // this.searchText = target.value;
    // const data = {
    //   userTypes: this.userTypes,
    //   statuss: this.statusTypes,
    //   search: this.searchText,
    // }
    // this.user.getuserDeatilsUser(data).subscribe((res) => {
    //   this.rowData5 = res.response;
    // });
  }

  // roleItems($event: any, anything?: any) {
  //   const { target } = $event;
  //   this.searchText = target.value;
  //   this.user.getGographicDropdown().subscribe((res: any) => {
  //     let localdata = res.response;


  //     this.toppingList = localdata.map((data: { geographyId: any; geographyName: any; }) => {
  //       return { geographyId: data.geographyId, geographyName: data.geographyName };
  //     });

  //     this.toppingList.push()
  //     this.toppingList.forEach(element => {
  //       return this.roleArray.push(element.geographyId);


  //     })
  //     this.toppings = new FormControl(this.toppingList);

  //     this.dropdownSettings = {
  //       singleSelection: false,
  //       idField: 'geographyId',
  //       textField: 'geographyName',
  //       selectAllText: 'Select All',
  //       unSelectAllText: 'UnSelect All',
  //       itemsShowLimit: 2,
  //       allowSearchFilter: true
  //     };
  //     this.selectedItems = [];
  //   });
  // }



  onSearchChangeDEAL($event: any, anything?: any){

  }

 orderlistGrid(){
  const data = {
    // userTypes: this.userTypes,
    // statuss: this.statusTypes,
    // search: this.searchText,
    "StatusId":[],

    "GeographyId":[],

    "DealerId":[],

    "OrderDate":"",

    "Search":""

  }
  this.user.getorderDeatilslist(data).subscribe((res) => {
    this.rowDatalist = res.response;
  });
}
orderUpload(){
  
  sessionStorage.setItem('sales','');
  this.dialog.open(SalesBulkUploadComponent);
}
selectdays(){
  this.dialog.open(CustomDatePopupComponent,{panelClass:'custmdays'})
  }
  orderItemSelect(item: any){
    const data = {
      // "StatusId":[],
      // "GeographyId":[],
      "DealerId":[],
      // "OrderDate":"",
      "Search":"",
      dealerss: this.DealerId
    }
    this.user.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
      this.dealerlist = this.DealerId
    });
  }
  selectedDateRange = {
    startDate: '11/11/2022',
    endDate: '11/15/2022',
  }

  customDatePickerEvent(eventChange){
    this.selectedDateRange = eventChange.selectedDate;
    console.log(this.selectedDateRange);
  }

}

