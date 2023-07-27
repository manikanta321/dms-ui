
import { Component, OnInit } from '@angular/core';
// import { AddUserPopupComponent } from './userPopups/add-user-popup/add-user-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort, MatSort, SortDirection } from '@angular/material/sort';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PaginationNumberFormatterParams, } from 'ag-grid-community';
import { SharedService } from 'src/app/services/shared-services.service';
import { Subscription } from 'rxjs'

export interface PeriodicElement {

  name: any;
  position: string;
  weight: number;
  symbol: string;
  emailid: any;
  phonenum: number;
  status: any;
}

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CellClassParams, CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi, GridOptions, ModuleRegistry, ColumnResizedEvent, Grid, } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { UserService } from 'src/app/services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as moment from 'moment';
import { AddUserPopupComponent } from '../users/userPopups/add-user-popup/add-user-popup.component';
import { EditTaxTemplateComponent } from '../users/userPopups/edit-tax-template/edit-tax-template.component';
import { AddcurrencyComponent } from '../users/userPopups/addcurrency/addcurrency.component';
import { AddTaxTemplateComponent } from '../users/userPopups/add-tax-template/add-tax-template.component';
import { EditUomPopupComponent } from '../users/userPopups/edit-uom-popup/edit-uom-popup.component';
import { UomPopupComponent } from '../users/userPopups/uom-popup/uom-popup.component';
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { AddDealerPopupComponent } from 'src/app/add-dealer-popup/add-dealer-popup.component';
import { AddTargetsComponent } from '../add-targets/add-targets.component';
import { TargetListService } from 'src/app/services/target-list.service';
import { DealerTargetActionComponent } from '../dealer-target-action/dealer-target-action.component';
import { DealerTargetSharedServicesService } from 'src/app/services/dealer-target-shared-services.service';
import { SalesBulkUploadComponent } from '../sales-bulk-upload/sales-bulk-upload.component';
import { OrderReceiptsBulkUploadComponent } from 'src/app/orders-receipts/order-receipts-bulk-upload/order-receipts-bulk-upload.component';

// import { UseractionComponent } from '../useraction/useraction.component';

@Component({
  selector: 'app-dealer-target',
  templateUrl: './dealer-target.component.html',
  styleUrls: ['./dealer-target.component.scss']
})
export class DealerTargetComponent implements OnInit {
  // clickEventSubscription:Subscription;

  @ViewChild(AddUserPopupComponent) child;

  private gridApi!: GridApi;
  paginationPageSize = 10;
  targetForm: any = FormGroup;
  dealerForm: any = FormGroup;
  geographyForm: any = FormGroup;
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
  dealerSelected: any = [];
  targetSelected:any = [];
  statusTypes: any = [];
  searchText: any = '';
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dealerDropdownSettings :IDropdownSettings = {};
  targetSettings: IDropdownSettings = {};
  targetListData:any = [];
  dealerListData:any = [];
  dealerList:any = [];
  dealerArray:any = [];
  geographySelected:any = [];
  targetListArray:any = [];
  targetAllArray:any = [];
  yearSelected:any = [];
  isitemtarget:any;
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    // set background colour on every row, this is probably bad, should be using CSS classes
    rowStyle: { background: 'black' },
  }



  // Data that gets displayed in the grid
  public rowData5 = [];
  public popupParent: HTMLElement = document.body;

  columnDefs: ColDef[] = [

    {
      headerName: "Target Group",
       field: 'targetGroupName', type: ['nonEditableColumn']
    },

    { headerName: "Geography",
    field: 'geographyName', type: ['nonEditableColumn']
    },
    {
      headerName: "Dealer",
      field: 'customername', type: ['nonEditableColumn']
    },
   
    // suppressMovable:true,
    {
      headerName: "Financial year",
      field: 'year',
      type: ['nonEditableColumn','rightAligned'],
    },

    {
      headerName: "No of Products",
      field: 'productCount',
      type: ['nonEditableColumn','rightAligned']
    },
    {
      headerName: "Target Total",
      field: 'volumeTotal',
      type: ['nonEditableColumn','rightAligned']
    },

    {
      headerName: "Actual PY",
      field: 'actualPy',
      type: ['nonEditableColumn','rightAligned']
    },


    {
      headerName: "Actual YTD",
      field: 'actualYTD',
      type: ['nonEditableColumn','rightAligned']
    },



    {
      headerName: "% of YTD Target",
      field: 'ytdTarget',
      type: ['nonEditableColumn','rightAligned'],
    },

    {
      headerName: '',
      colId: 'action',
      cellRenderer: DealerTargetActionComponent,
      editable: false,
      maxWidth: 75  
    },


   
  ];


  rowData: any;
  rowData1 = [];
  employeeName: any;
  public defaultColDef: ColDef = {
    suppressSizeToFit: true,
    filter: 'agTextColumnFilter',
    flex: 1,
    minWidth: 100,
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

  displayedColumns: string[] = ['position', 'name', 'symbol', 'email', 'phonenum', 'login', 'status', 'edit'];
;
  toppings = new FormControl('');
  toppings1 = new FormControl('');


  geographyList: any = [];
  geographyListData:any = [];
  geographyArray:any = [];
  toppingList1: any = [];
  filterDictionary: any;
  sideBarOpen = true;
  scrolledIndex = 0;
  defaultPageSize = 12;
  paginationScrollCount: any;

  @ViewChild(MatSidenav)


  sidenav!: MatSidenav;
  roleName: any;
  statusname: any;
  props: any;
  msg1: any;
  msg: any;
  userId: any;
  roleArray: any[] = [];
  statusArray: any = [];
  messages: any[] = [];
  stayScrolledToEnd = true;
  message: boolean = false;
  message1: boolean = true;
  instancePopup:any = null;
  loggedUserId:any;

  paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return '[' + params.value.toLocaleString() + ']';
  };

  start: number = 0;
  limit: number = 15;
  end: number = this.limit + this.start;

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
    pagination: false,
    paginationAutoPageSize: false,
  }
  currentPageName:string='';

  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user: UserService,
    private observer: BreakpointObserver,
    private fb: FormBuilder,
    private sharedService: DealerTargetSharedServicesService,
    private targetList: TargetListService,
    private route: ActivatedRoute,

  ) {
    this.route.data.subscribe(v => {
      this.currentPageName = v['key'];
      let actionColumn = v['targetList'];
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
      console.log("showCaseMenuList.length", showCaseMenuList.length);
      
    }
    )
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m)
      this.TargetTabelData();

    })
    this.sharedService.getClickEvent().subscribe(() => {
      this.TargetTabelData();
    })
    sort: [];
  }



  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {


   // this.dataSource.sort = this.sort;
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(this.sidenav){
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }
    });
    if(this.child){
      this.message = this.child.message;
    }
    // console.log('parent is working', this.message)
  }



  ngOnInit(): void {
    this.loggedUserId = localStorage.getItem('logInId');
    this.TargetTabelData();
    this.Geography();
    this.statusItems();
    this.targetListGroup();
    this.dealerDropdown();
    this.targetForm = this.fb.group({
      targetForm: [this.selectedItems]
    });
    this.dealerForm = this.fb.group({
      dealerForm: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geographyForm: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
  }



  scrolledIndexChange(i): void {
    this.scrolledIndex = i;
  }

  editfn() {
    alert('guru')
  }

  onSelectAll(items: any) {
    // console.log('onSelectAll', items);
  }

  onStatusAll(items: any) {
    // console.log('onSelectAll', items);
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



  refresh() {
    this.toppings1 = new FormControl(this.toppingList1);
    this.targetForm = this.fb.group({
      targetForm: [this.selectedItems]
    });
    this.dealerForm = this.fb.group({
      dealerForm: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geographyForm: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
    this.targetSelected =[];
    this.geographySelected = [];
    this.dealerSelected = [];
    this.yearSelected = [];
    this.searchText = ''
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId
    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
    // this.TargetTabelData();
  }
  TargetTabelData() {
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  makeCellClicked() {
  }

  Geography() {
    this.user.getGeographies().subscribe((res: any) => {
      this.geographyList = res.response;
      let localdata = this.geographyList;
      this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });

      this.geographyListData.push()
      this.geographyListData.forEach(element => {
        return this.geographyArray.push(element.geographyId);
      })
      // console.log('geographyArray', this.geographyArray)
      this.toppings = new FormControl(this.geographyListData);
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'geographyId',
        textField: 'geographyName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
      };
      this.selectedItems = [];
    });
  }
  onGeographyItemSelect(item: any) {
    this.geographySelected.push(item.geographyId);
// console.log("SelectedGeo",this.geographySelected)
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onGeographyItemSelectOrAll(item: any) {
    this.geographySelected = this.geographyArray;
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onGeographyItemDeSelectOrAll(item: any) {
    this.geographySelected = [];
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onGeographyItemDeSelect(item: any) {

    this.geographySelected.forEach((element, index) => {
      if (element == item.geographyId) this.geographySelected.splice(index, 1);
    });
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });

  }
  handleRowDataChanged(event) {
    const index = this.messages.length - 1;
    if (this.stayScrolledToEnd) {
      //this.gridOptions.ensureIndexVisible(index, 'bottom');
    }
  }

  handleScroll(event) {

    if(this.instancePopup && this.instancePopup.isOpen){
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



  statusItems() {
    this.targetList.financialYear().subscribe((res: any) => {
      this.toppingList1 = res.response;
      
      // console.log('New Year', this.toppingList1)
      this.toppingList1.forEach(element => {
        return this.statusArray.push(element.statusId);
      

      })
    
      this.dropdownSettings1 = {
        singleSelection: false,
        idField: 'statusId',
        textField: 'statusName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
      };
      this.selectedStatus = [];
      this.toppings1 = new FormControl(this.toppingList1);

    });
  }
  onYearSelect(item: any) {
    // alert(item)
    this.yearSelected.push(item);//yet to change

    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onYearSelectOrAll(item: any) {
    this.yearSelected = this.toppingList1//yet to change
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {//yet to change
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onYearDeSelectOrAll(item: any) {
    this.yearSelected = [];
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {//yet to change
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onYearDeSelect(item: any) {

    this.yearSelected.forEach((element, index) => {
      if (element == item) this.yearSelected.splice(index, 1);//yet to change
    });
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });

  }
  roleFilter(data: any) {
    // console.log('data', data)
    this.roleName = this.toppings.value;
    this.user.UserFilterServices(this.roleName, this.statusname).subscribe((res: any) => {
      this.rowData = res.response;


    });
    // console.log('rolename', this.rowData)
  }
  onDealerItemSelect(item: any) {
    this.dealerSelected.push(item.customerId);

    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onDealerItemSelectOrAll(item: any) {
    this.dealerSelected = this.dealerArray;
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onDealerItemDeSelectOrAll(item: any) {
    this.dealerSelected = [];
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onDealerItemDeSelect(item: any) {

    this.dealerSelected.forEach((element, index) => {
      if (element == item.customerId) this.dealerSelected.splice(index, 1);
    });
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });

  }
  applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addTarget() {
    this.dialog.open(AddTargetsComponent,{ width: '1900px',});
  }

  editUser() {
    this.dialog.open(EditPopupComponent,);
  }

  AddUomPopup() {
    this.dialog.open(UomPopupComponent,);
  }

  EditUomPopup() {
    this.dialog.open(EditUomPopupComponent,);
  }

  addtaxTempl() {
    this.dialog.open(AddTaxTemplateComponent,);
  }

  addCurrency() {
    let dialogRef = this.dialog.open(AddcurrencyComponent);
    dialogRef.afterClosed().subscribe((res) => {
      localStorage.setItem('headerStatus','')
      })
  }

  edittaxTempl() {
    this.dialog.open(EditTaxTemplateComponent);
  }
  delete() {
    this.dialog.open(AddUserPopupComponent, { height: '580px', });

  }
  announceSortChange(sortState: any) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
  }

  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });

  }
  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  openDialog() {
    // alert('mani')

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
    this.gridApi.exportDataAsCsv( { fileName: 'dealerTarget_' + this.convertedDateFormat() });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

  }
  sizeToFit() {
    this.gridOptions.api!.sizeColumnsToFit();
  }

  orderTargetUpload(){
    localStorage.setItem('UploadTarget','dealertarget')
    // sessionStorage.setItem("orderTarget",'target');
      this.dialog.open(OrderReceiptsBulkUploadComponent,{minWidth :'91vw',height:'702px'});
      // this.isOpen = false;
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }



  ToggleSideNav(value: any) {
    this.sidenav.toggle()
  }

  onCellClicked(e): void {
    // console.log('cellClicked', e);
    this.userId = e.data.targetAssociationId;
    this.employeeName = e.data.userName;
    // console.log('userID', this.userId);
    localStorage.setItem('editOrAddTarget', this.userId)
    if ( e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action' ) {
      const cellRendererInstances = e.api.getCellRendererInstances({
        rowNodes: [e.node],
        columns: [e.column],
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        this.instancePopup = instance;
        instance.togglePopup();
      }
    }
  }

  daysSunshineRenderer(params) {
  const divelement = document.createElement('div');  
  const element = document.createElement('span');
  const imageElement = document.createElement('img');
  imageElement.className = "country-info";
  imageElement.src ='assets/img/countryinfo.png';
  element.appendChild(document.createTextNode(params.value));
  element.appendChild(imageElement);
  return element;
  }
  targetListGroup(){
    this.targetList.getTargetList().subscribe((res) => {
      this.targetListData  = res.response;
    // console.log("check target",this.targetListData );
    let localdata =this.targetListData;
          this.targetListArray = localdata.map((data: { targetGroupId: any; targetGroupName: any; }) => {
            return { targetGroupId: data.targetGroupId, targetGroupName: data.targetGroupName };
          });
    
          this.targetListArray.push()
          this.targetListArray.forEach(element => {
            return this.targetAllArray.push(element.targetGroupId);
          })
          // console.log('targetAllArray', this.targetAllArray)
    
    })
    this.targetSettings = {
      singleSelection: false,
      idField: 'targetGroupId',
      textField: 'targetGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }
  onTargetItemSelect(item: any) {
    this.targetSelected.push(item.targetGroupId);

    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onTargetItemSelectOrAll(item: any) {
    this.targetSelected = this.targetAllArray;
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onTargetItemDeSelectOrAll(item: any) {
    this.targetSelected = [];
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });
  }
  onTargetItemDeSelect(item: any) {

    this.targetSelected.forEach((element, index) => {
      if (element == item.targetGroupId) this.targetSelected.splice(index, 1);
    });
    const data = {
      Targetid:this.targetSelected,
      GeographyId:this.geographySelected,
      DealerId:this.dealerSelected,
      year:this.yearSelected,
      Search:this.searchText,
      CurrentUserId:this.loggedUserId

    }
    this.user.getAllDealerTarget(data).subscribe((res) => {
      this.rowData5 = res.response;
  // console.log("TargetTableData",this.rowData5)

    });

  }
  dealerDropdown(){
    this.targetList.getDealers().subscribe((res) => {
      this.dealerListData  = res.response;
      let localdata = this.dealerListData
    // console.log("check Dealer",this.dealerListData );
          this.dealerList = localdata.map((data: { customerId: any; customerName: any; }) => {
            return { customerId: data.customerId, customerName: data.customerName };
          });
    
          this.dealerList.push()
          this.dealerList.forEach(element => {
            return this.dealerArray.push(element.customerId);
          })
          // console.log('dealerArray', this.dealerArray)
    
    })
    this.dealerDropdownSettings = {
      singleSelection: false,
      idField: 'customerId',
      textField: 'customerName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }
  targetListTable() {

  }
}