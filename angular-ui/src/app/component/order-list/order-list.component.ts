import { Component,  OnInit,  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { SharedServiceMaterialListService } from 'src/app/services/shared-service-material-list.service';
import { OrderlistShipPopupComponent } from './orderlist-ship-popup/orderlist-ship-popup.component';
import { OrdersReceiveShipmentComponent } from '../orders-receive-shipment/orders-receive-shipment.component';
import moment from 'moment';
import { OtherMasterService } from 'src/app/services/other-master.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { SharedServicesShipmentService } from 'src/app/services/shared-services-shipment.service';
import { SharedServiceCalendarService } from 'src/app/services/shared-service-calendar.service';
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

  userType:any;
  disableSelect = new FormControl(false);
  private gridApi!: GridApi;
  paginationPageSize = 10;
  myForm: any = FormGroup;
  myForm1: any = FormGroup;
  myForm2: any = FormGroup;

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

  StatusId: any = [];

  GeographyId: any = [];

  DealerId: any = [];

  OrderDate: any = "";


  statusTypes: any = [];
  searchText: any = '';
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  public rowData5 = [];

  public rowDatalist:any = [];


  public popupParent: HTMLElement = document.body;
  roleArray: any[] = [];
  statusArray: any = [];
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  columnDefs: ColDef[] = [
    // { headerName: "User Id",
    //   field: 'employeeCode' , sort: 'desc'},

    { headerName: "Order No.", field: 'orderNUmber' ,
    cellStyle: { color: '#017EFA' },  
    cellEditorPopup: true,
    onCellClicked: (event: CellClickedEvent) => this.dialog.open(OrdersReceiveShipmentComponent, {      maxWidth: '95vw'    ,height:"95vh"})
  },

    { headerName: "Order Date", field: 'orderDate',       


  cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },
  tooltipField:"orderDate",
 },

    {
      headerName: "Dealer",
      field: 'dealerName',
      minWidth: 300,
    },
    {
      headerName: "Dealer  Reference no ",
       field: 'companyReferenceNo'
    },

    {
      headerName: "Geography",
      field: 'geographyName',
    },

    {
      headerName: "Total Value",
      field: 'totalValue',
      type:['leftAligned']
    },
    {
      headerName: "Completed Value",
      field: 'compleatedValue',
      type:['leftAligned']
    },
    {
      headerName: "Status",
      field: 'status',
      maxWidth: 120,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Closed', 'Approved',],
      },
      cellClass: params => {
        return params.value == 'Rejected' ? 'myclass1' : params.value == 'Draft' ? 'myclass2' : params.value == 'Confirmed' ? 'myclass3' : params.value == 'Ordered' ? 'myclassss' : params.value == 'Returned' ? 'myclass5'
          : params.value == 'Cancelled' ? 'myclass6' : params.value == 'Pre-closed' ? 'myclass7' : params.value == 'In-Transit' ? 'myclass8' : params.value == 'Fullfilled' ? 'Mmyclass' : params.value == 'ToShip' ? 'myclass10' : 'myclass11'
      },

      tooltipField: "statusName",
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
  uomId: any;
  uomName: any;
  CustomerPoId: any;
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
  instancePopup: any = null;
  dealerlist: any = [];
  dealerAllarray: any = [];
  dealerss: any = []
  dealerType: any;
  selectedDealer: any = []
  geogropdownlist: any = [];
  geoAllarray: any = []
  geogragphies: any = [];
  statusDropList: any = []
  statusList: any = [];
  statusAllarray: any = [];
  selectedDateRange: any;
  startDate: any = '';
  endDate: any = '';
  currentPageName:string="";
  loggedUserId:any;
  constructor(public dialog: MatDialog,
    private sharedService :SharedService,
    private router: Router,
    private otherMasterService:OtherMasterService,
    private _liveAnnouncer: LiveAnnouncer,
    private user: UserService,
    public orders: OrdersApisService,
    private fb: FormBuilder,
    private observer: BreakpointObserver,
    private route: ActivatedRoute,
    private sharedserviceForshipment:SharedServicesShipmentService,
    private sharedServiceCalendar:SharedServiceCalendarService,

    private materialListService:SharedServiceMaterialListService
  ) {


    
    this.sharedserviceForshipment.listen().subscribe((m: any) => {
      console.log(m)
      this.orderlistGrid();  
    })
    sort: [];
    this.route.data.subscribe(v => {
      this.currentPageName = v['key'];
      let actionColumn = v['orderList'];
      let showCaseMenuList: string[] = [];
      let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');

      userRolesData.forEach(element => {
        if (element.title == this.currentPageName) {
          this.columnDefs = this.columnDefs.filter(x => {
            if (x.colId != 'action' || element == undefined || element == null) return true;

            element.permission.forEach(item => {
              if (actionColumn.indexOf(item.action.toLowerCase()) !== -1 && item.status) {
                showCaseMenuList.push(item.action);
              }
            })
            return showCaseMenuList.length !== 0;
          });
        }
      })
  })

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
    this.userType = localStorage.getItem("userType");
    this.loggedUserId = localStorage.getItem('logInId')
    this.uomId = localStorage.getItem('niId');
    // this.roleItems();
    this.statusItems();
    // this.maxDate.setDate(this.maxDate.getDate() + 20);
    this.orderlistGrid();

    this.dealerOrder();
    this.geogrphyOrder();
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForm1 = this.fb.group({
      geo: [this.selectedItems]
    });
    this.myForm2 = this.fb.group({
      status: [this.selectedItems]
    });
 
  }
  refresh() {

    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForm1 = this.fb.group({
      geo: [this.selectedItems]
    });
    this.myForm2 = this.fb.group({
      status: [this.selectedItems]
    });
 
    // this.GeographyId=[];
    // this.StatusId=[];
    // this.DealerId=[];
    this.geogragphies = [];
    this.dealerss = [];
    this.statusList = [];
    this.searchText = '';
    this.startDate = '';
    this.endDate = '';
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      startDate: this.startDate,
      endDate: this.endDate,
      CurrentUserId:this.loggedUserId,
      //   "GeographyId":[],
      //  "DealerId" : [],
      //   "OrderDate":"",
      //   "Search":""
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
      console.log("RefreshData", this.rowDatalist);
   
    });
    this.sharedServiceCalendar.filter('Register click')
  }
  convertedDateFormat() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    return d + m + y;
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv({ fileName: 'orderList_' + this.convertedDateFormat() });
  }
  roleFilter(data: any) {
    console.log('data', data)
    this.roleName = this.toppings.value;
    this.user.UserFilterServices(this.roleName, this.statusname).subscribe((res: any) => {
      this.rowData = res.response;


    });
    console.log('rolename', this.rowData)
  }

  onCellClicked(e): void {
    console.log('cellClicked', e);
    this.UomId = e.data.uoMId;
    this.uomName = e.data.uoMName;
    let ordernumber = e.data.orderNUmber;
    this.CustomerPoId = e.data.id
    localStorage.setItem('ViewOrReceive', 'View')
    localStorage.setItem('customerPOIdForShipment',e.data.id)
    localStorage.setItem('OrderNumberToShow',e.data.orderNUmber)

    localStorage.setItem('orderOrShipmentOrRecipt','order')
    // this.employeeName=e.data.userName;
    console.log('CustomerPoId', this.CustomerPoId);
    localStorage.setItem('CustomerPoId', this.CustomerPoId)
    sessionStorage.setItem("OrderStatus", e.data.status)
    localStorage.setItem('UomId', e.data.uoMId)
    localStorage.setItem('UomName', e.data.uoMName)
    sessionStorage.setItem("orderNumber", ordernumber);
    localStorage.setItem('niId', e.data.uoMId)
    localStorage.setItem('Niname', e.data.uoMName)
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
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
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

  // onStatusSelect(item: any) {
  //   this.statusTypes.push(item.statusId);

  //   const data = {
  //     userTypes: this.userTypes,
  //     statuss: this.statusTypes,
  //     search: this.searchText,
  //   }
  //   this.user.getuserDeatilsUser(data).subscribe((res) => {
  //     this.rowData5 = res.response;
  //   });

  // }

  // onItemDeSelect(item: any) {

  //   this.userTypes.forEach((element, index) => {
  //     if (element == item.roleId) this.userTypes.splice(index, 1);
  //   });
  //   console.log(' this.userTypes', this.userTypes)

  //   // this.userTypes.pop(item.roleId);
  //   const data = {
  //     userTypes: this.userTypes,
  //     statuss: this.statusTypes,
  //     search: this.searchText,

  //   }
  //   this.user.getuserDeatilsUser(data).subscribe((res) => {
  //     this.rowData5 = res.response;
  //   });

  // }

  // onStatusDeSelect(item: any) {
  //   this.statusTypes.forEach((element, index) => {
  //     if (element == item.statusId) this.statusTypes.splice(index, 1);
  //   });
  //   // this.statusTypes.pop(item.statusId);
  //   console.log(' this.statusTypes', this.userTypes)
  //   const data = {
  //     userTypes: this.userTypes,
  //     statuss: this.statusTypes,
  //     search: this.searchText,

  //   }
  //   this.user.getuserDeatilsUser(data).subscribe((res) => {
  //     this.rowData5 = res.response;
  //   });
  //   // console.log('rolefilter', this.userTypes)
  //   // console.log('onItemSelect', item);
  // }
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
    this.materialListService.listen().subscribe((m: any) => {
      console.log("RefreshData",m)
      setTimeout (() => {
        this.orderlistGrid();
     }, 2000);
     this.otherMasterService.listen().subscribe((m: any) => {
      console.log("RefreshData",m)
      setTimeout (() => {
        this.orderlistGrid();
     }, 2000);
     
    })
     
    })
  }
  openDialog() {

  }
  handleScroll(event) {
    if (this.instancePopup && this.instancePopup.isOpen) {
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
      this.paginationScrollCount = this.rowDatalist.length;
    }
  }



  addOrderPromotion() {
    // 1 Promotion calculations
    localStorage.removeItem('FirstPromotionCalculation');
    localStorage.removeItem('FirstPromotionTotalAmountValue');

    // 4 Promotion calculations
    localStorage.removeItem('ForthPromotionTotalAmount');
    localStorage.removeItem('ForthPromotionSelectedQTy');

    localStorage.removeItem('ForthPromotionCalculationsTotalQty');
    localStorage.removeItem('ForthPromotionCalculationsAmount');
//  3 Promotions 
    localStorage.removeItem('ThreePrommotionTotalselectedQuantity');
    localStorage.removeItem('ThreePromotionTotalAmount');
    // 3 Non Promotions calculations
    localStorage.removeItem('ThreeePromotionCalculationsTotalQty');
    localStorage.removeItem('ThreePromotionCalculationsAmount');
    
    const dialogRef = this.dialog.open(AddorderpromotionsComponent,{minWidth: '100vw', height: '731px', 
      panelClass: 'material-add-edit'
    });
    sessionStorage.setItem("Confirm",'')
    localStorage.setItem('Edit', 'Add');
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.orderlistGrid();
      }
    })

  }


  // ORDER SEARCH SELECT

  onSearchChangeGEO($event: any, anything?: any) {
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



  onSearchChangeDEAL($event: any, anything?: any) {

  }

  orderlistGrid() {

    const data = {
      // userTypes: this.userTypes,
      // statuss: this.statusTypes,
      // search: this.searchText,
      "StatusId": [],
      "GeographyId": [],
      "DealerId": [],
      "OrderDate": "",
     

      "Search": this.searchText,
      CurrentUserId:this.loggedUserId,
      

    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
      console.log(res.response,'..............')
       this.rowDatalist.forEach(element=>{
         element.orderDate= this.sharedService.dateformat
         (element.orderDate);
         })

    });
  }
  orderUpload() {

    sessionStorage.setItem('sales', '');
    this.dialog.open(SalesBulkUploadComponent);
  }
  selectdays() {
    this.dialog.open(CustomDatePopupComponent, { panelClass: 'custmdays' })
  }
  // selectedDateRange = {
  //   startDate: '11/11/2022',
  //   endDate: '11/15/2022',
  // }

  customDatePickerEvent(eventChange) {
    this.selectedDateRange = eventChange.selectedDate;
    this.startDate = this.selectedDateRange.startDate;
    this.endDate = this.selectedDateRange.endDate;
    console.log(this.selectedDateRange);
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
  dealerOrder() {
    this.user.dealerDropdownOrderlist().subscribe((res: any) => {
      let localdata = res.response;
      this.dealerlist = localdata.map((data: { customerId: any; customerName: any; }) => {
        return { customerId: data.customerId, customerName: data.customerName };
      });
      this.dealerlist.push()
      this.dealerlist.forEach(element => {
        return this.dealerAllarray.push(element.customerId);
      })
      console.log('dealerAllarray', this.dealerAllarray)
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'customerId',
      textField: 'customerName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.selectedStatus = [];
  }
  DealerorderSelect(item: any) {
    this.dealerss.push(item.customerId);
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
  DealerDeselect(item: any) {
    console.log(item)
    this.dealerss.forEach((element, index) => {
      if (element == item.customerId) this.dealerss.splice(index, 1);
    });
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
  DealerDeselectAll(item: any) {
    this.dealerss = [];
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
  DealerorderSelectAll(item: any) {
    this.dealerss = this.dealerAllarray;
    console.log("AllDealers", this.dealerss);
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
      console.log("All Dealers", this.rowDatalist)
    });
  }
  geogrphyOrder() {
    this.user.getGeographies().subscribe((res: any) => {
      let localdata = res.response;
      this.geogropdownlist = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });

      this.geogropdownlist.push()
      this.geogropdownlist.forEach(element => {
        return this.geoAllarray.push(element.geographyId);
      })
      console.log('buleditGeo', this.geoAllarray)
      this.dropdownSettings1 = {
        singleSelection: false,
        idField: 'geographyId',
        textField: 'geographyName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
      };
    });
  }
  geographyselect(item: any) {
    this.geogragphies.push(item.geographyId);
    console.log("geographics", this.geogragphies);
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
  geographyDeselect(item: any) {
    this.geogragphies.forEach((element, index) => {
      if (element == item.geographyId) this.geogragphies.splice(index, 1);
    });
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  geographyDeselectAll(item: any) {
    this.geogragphies = [];
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
      console.log("GeoSelectALL", this.rowDatalist)
    });
  }
  geographyselectAll(item: any) {
    this.geogragphies = this.geoAllarray;
    console.log("geographics", this.geogragphies);
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
      console.log("GeoSelectALL", this.rowDatalist)
    });
    // console.log('rolefilter', this.userTypes)
    // console.log('onItemSelect', item);
  }
  statusItems()
   {
    this.user.statusDropdownOrderlist().subscribe((res: any) => {
      let localdata = res.response;
      this.statusDropList = localdata.map((data: { statusId: any; statusName: any; }) => {
        return { statusId: data.statusId, statusname: data.statusName };
      });
      // if (!this.statusDropList?.length) {
      //   this.statusDropList = localdata.map((status: { statusname: any; }) => {
      //     return status.statusname;
      //   });
      // }
      this.statusDropList.push()
      this.statusDropList.forEach(element => {
        return this.statusAllarray.push(element.statusId);
      });
      console.log('buleditGeo', this.statusAllarray)
      this.dropdownSettings2 = {
        singleSelection: false,
        idField: 'statusId',
        textField: 'statusname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
      this.selectedItems = [];
    });
  }
  statusdropdownselect(item: any) {
    this.statusList.push(item.statusId);
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;  
    });
  }
  statusDeselect(item: any) {
    this.statusList.forEach((element, index) => {
      if (element == item.statusId) this.statusList.splice(index, 1);
    });
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  statusDeselectAll(item: any) {
    this.statusList = [];
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
  statusselectAll(item: any) {
    this.statusList = this.statusAllarray
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      StatusId: this.statusList,
      GeographyId: this.geogragphies,
      DealerId: this.dealerss,
      Search: this.searchText,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CurrentUserId:this.loggedUserId,
    }
    this.orders.getorderDeatilslist(data).subscribe((res) => {
      this.rowDatalist = res.response;
    });
  }
}

