
import { Component, OnInit } from '@angular/core';
// import { AddUserPopupComponent } from './userPopups/add-user-popup/add-user-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
import { EditdealersComponent } from '../component/users/userPopups/editdealers/editdealers.component';
import { EditPopupComponent } from '../component/users/userPopups/edit-popup/edit-popup.component';
import { UomPopupComponent } from '../component/users/userPopups/uom-popup/uom-popup.component';
import { EditUomPopupComponent } from '../component/users/userPopups/edit-uom-popup/edit-uom-popup.component';
import { AddTaxTemplateComponent } from '../component/users/userPopups/add-tax-template/add-tax-template.component';
import { AddcurrencyComponent } from '../component/users/userPopups/addcurrency/addcurrency.component';
import { EditTaxTemplateComponent } from '../component/users/userPopups/edit-tax-template/edit-tax-template.component';
import { AddUserPopupComponent } from '../component/users/userPopups/add-user-popup/add-user-popup.component';
import { AddDealerPopupComponent } from '../add-dealer-popup/add-dealer-popup.component';
import { AddDealerAssociationsComponent } from '../component/add-dealer-associations/add-dealer-associations.component';
import { AssosiationActionComponent } from '../component/assosiation-action/assosiation-action.component';
import { BulkEditAssosiationComponent } from '../component/bulk-edit-assosiation/bulk-edit-assosiation.component';
import { AssosiationServicesService } from '../services/assosiation-services.service';
// import { UseractionComponent } from '../useraction/useraction.component';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.scss']
})
export class AssociationComponent implements OnInit {
  // clickEventSubscription:Subscription;

  @ViewChild(AddUserPopupComponent) child;

  private gridApi!: GridApi;
  paginationPageSize = 10;
  myForm: any = FormGroup;
  myForms: any = FormGroup;
  myForm1: any = FormGroup;

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
  statusTypes: any = [];
  searchText: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  ProductListArray:any=[];
  dealerListArray:any=[];


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
      headerName: "Product",
       field: 'stockItemName', type: ['nonEditableColumn'], sort: 'desc',maxWidth:160
    },

    { headerName: "Dealer",
    minWidth:250,
    field: 'customerName', type: ['nonEditableColumn'], sort: 'desc',maxWidth:150
    },
    {
      headerName: "Geography",
      minWidth:250,
      field: 'geographyName', 
      cellRenderer: this.daysSunshineRenderer,
      // cellRendererParams: {
      // rendererImage: '', // Complementing the Cell Renderer parameters
      // },
      type: ['nonEditableColumn']
    },

    {
      headerName: "MRP",
      field: "mrp", 
      type: ['nonEditableColumn']
    },
    {
      headerName: "Min.Order.Qty",
      field: "minOrder", 
      type: ['nonEditableColumn']
    },
    {
      headerName: "Max.Order.Qty",
      field: "maxOrder", 
      type: ['nonEditableColumn']
    },
    {
      headerName: "Margin",
      field: "margin", 

      type: ['nonEditableColumn']
    },
    {
      headerName: "Discount",
      field: "discount", 
      type: ['nonEditableColumn']
    },
    {
      headerName: "Lead Time",
      field: "leadTimeIndays", 
      type: ['nonEditableColumn']
    },

    // {
    //   headerName: '',
    //   colId: 'action',
    //   cellRenderer: AssosiationActionComponent,
    //   editable: false,
    //   maxWidth: 75  
    // },


   
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


  toppingList: any = [];
  geographysSelected:any=[];
  dealerSelected:any=[];
  productSelected:any=[];
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
  productAllArray:any[]=[];
  dealerAllArray:any[]=[];




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


  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user: UserService,
    private observer: BreakpointObserver,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private associationService:AssosiationServicesService,
  ) {

    this.sharedService.listen().subscribe((m: any) => {
      console.log(m)
      this.getusertabeldata()

    })
    this.sharedService.getClickEvent().subscribe(() => {
      this.getusertabeldata()
    })
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
    this.message = this.child.message
    console.log('parent is working', this.message)
  }



  ngOnInit() {
    this.getusertabeldata();
    this.roleItems();
    this.ProductItems();
    this.dealerItems();

    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
    this.myForm1 = this.fb.group({
      city1: [this.selectedItems]
    });
  }



  scrolledIndexChange(i): void {
    this.scrolledIndex = i;
  }

  editfn() {
    alert('guru')
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

  toogleProductFilter() {
    this.StatusFilter = !this.StatusFilter;
    this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { allowSearchFilter: this.StatusFilter });
  }

  handleProductSelection() {
    if (this.statusSelection) {
      this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { statusSelection: 2 });
    } else {
      this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { statusSelection: null });
    
  }


  }
  refresh() {
    this.toppings = new FormControl(this.toppingList);
    this.toppings1 = new FormControl(this.toppingList1);
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
    this.myForm1 = this.fb.group({
      city1: [this.selectedItems]
    });


    this.geographysSelected=[];
    this.productSelected=[];
    this.dealerSelected=[];
    this.searchText=''
 const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });  }

  getusertabeldata() {
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
  }
  makeCellClicked() {
  }

  roleItems() {
    this.associationService.getGeographies().subscribe((res: any) => {
      let localdata = res.response;
      // console.log('checkdata', localdata)

      this.toppingList = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });

      this.toppingList.push()
      this.toppingList.forEach(element => {
        return this.roleArray.push(element.geographyId);
        // console.log('rolecheck',rolecheck)

      })
      console.log('rolearray', this.roleArray)

      // this.toppingList = res.response;
      this.toppings = new FormControl(this.toppingList);

      // console.log('rolelist', this.toppingList)
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'geographyId',
        textField: 'geographyName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };
      this.selectedItems = [];
    });
  }


  ProductItems(){
    this.user.getproductlist().subscribe((res: any) => {
        let localdata = res.response;
        // console.log('checkdata', localdata)
  
        this.ProductListArray = localdata.map((data: { stockItemId: any; stockItemName: any; }) => {
          return { stockItemId: data.stockItemId, stockItemName: data.stockItemName };
        });
  
        this.ProductListArray.push()
        this.ProductListArray.forEach(element => {
          return this.productAllArray.push(element.stockItemId);
          // console.log('rolecheck',rolecheck)
  
        })                                                                    
      });
    
      this.dropdownSettings2 = {
        singleSelection: false,
        idField: 'stockItemId',
        textField: 'stockItemName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: this.StatusFilter
      };
      this.selectedStatus = [];
      this.toppings1 = new FormControl(this.toppingList1);
  }


  dealerItems(){
    this.associationService.getDealers().subscribe((res: any) => {
        let localdata = res.response;
        // console.log('checkdata', localdata)
  
        this.dealerListArray = localdata.map((data: { customerId: any; customerName: any; }) => {
          return { customerId: data.customerId, customerName  : data.customerName };
        });

        this.dealerListArray.push()
        this.dealerListArray.forEach(element => {
          return this.dealerAllArray.push(element.customerId);
          // console.log('rolecheck',rolecheck)
  
        })       
        console.log('dealerAllArray',this.dealerAllArray)                                                    
      });
    
      this.dropdownSettings1 = {
        singleSelection: false,
        idField: 'customerId',
        textField: 'customerName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: this.StatusFilter
      };
      this.selectedStatus = [];
      this.toppings1 = new FormControl(this.toppingList1);
  }


  

  handleRowDataChanged(event) {
    const index = this.messages.length - 1;
    if (this.stayScrolledToEnd) {
      //this.gridOptions.ensureIndexVisible(index, 'bottom');
    }
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


  roleFilter(data: any) {
    console.log('data', data)
    this.roleName = this.toppings.value;
    this.user.UserFilterServices(this.roleName, this.statusname).subscribe((res: any) => {
      this.rowData = res.response;


    });
    console.log('rolename', this.rowData)
  }
  onItemSelect(item: any) {

    // alert(item.roleName)
    this.geographysSelected.push(item.geographyId);

    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemSelectOrAll(item: any) {
    this.geographysSelected = this.roleArray;
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;  
    });

  }
  onItemDeSelectOrAll(item: any) {
    this.geographysSelected=[];
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  onItemDeSelect(item: any) {

    this.geographysSelected.forEach((element, index) => {
      if (element == item.geographyId) this.geographysSelected.splice(index, 1);
    });
    console.log(' this.userTypes', this.userTypes)

    // this.userTypes.pop(item.roleId);
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
  }



  onItemProductSelect(item: any) {

    // alert(item.roleName)
    this.productSelected.push(item.stockItemId);

    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemProductSelectOrAll(item: any) {
    this.productSelected = this.productAllArray;
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });

  }
  onItemProductDeSelectOrAll(item: any) {
    this.productSelected=[];
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  onItemProductDeSelect(item: any) {

    this.productSelected.forEach((element, index) => {
      if (element == item.stockItemId) this.productSelected.splice(index, 1);
    });
    console.log(' this.userTypes', this.userTypes)

    // this.userTypes.pop(item.roleId);
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
  }




  
  onItemDealerSelect(item: any) {

    // alert(item.roleName)
    this.dealerSelected.push(item.customerId);

    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemDealerSelectOrAll(item: any) {
    this.dealerSelected = this.dealerAllArray;
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });

  }
  onItemDealerDeSelectOrAll(item: any) {
    this.dealerSelected=[];
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  onItemDealerDeSelect(item: any) {
console.log(item)
    this.dealerSelected.forEach((element, index) => {
      if (element == item.customerId) this.dealerSelected.splice(index, 1);
    });
    console.log(' this.userTypes', this.userTypes)

    // this.userTypes.pop(item.roleId);
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

    });
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
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    this.dialog.open(AddDealerAssociationsComponent,{width: '900px',height:'460px'});
  }
  editBulk(){
    this.dialog.open(BulkEditAssosiationComponent,{width: '1300px'});

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
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }

  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
  

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
  onBtnExport() {
    this.gridApi.exportDataAsCsv();

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

  }
  sizeToFit() {
    this.gridOptions.api!.sizeColumnsToFit();
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
    console.log('cellClicked', e);
    this.userId = e.data.userId;
    this.employeeName = e.data.userName;
    console.log('userID', this.userId);
    localStorage.setItem('userID', this.userId)
    localStorage.setItem('employeeName', this.employeeName);

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

}















