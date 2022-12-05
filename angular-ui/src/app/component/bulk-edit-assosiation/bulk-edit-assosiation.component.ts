
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
import { FormArray } from '@angular/forms'

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
import { AssosiationServicesService } from 'src/app/services/assosiation-services.service';
import { SharedServicesDealerService } from 'src/app/services/shared-services-dealer.service';

@Component({
  selector: 'app-bulk-edit-assosiation',
  templateUrl: './bulk-edit-assosiation.component.html',
  styleUrls: ['./bulk-edit-assosiation.component.scss']
})
export class BulkEditAssosiationComponent implements OnInit {
  // clickEventSubscription:Subscription;


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
  toppingList: any[] = [];
  geographysSelected:any=[];
  dealerSelected:any=[];
  productSelected:any=[];
  toppingList1: any = [];
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
  addAddressDetailsForm!: FormGroup;
  LoginId:any;

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
    private sharedService: SharedServicesDealerService,
    private associationService:AssosiationServicesService,
    private _formBuilder: FormBuilder,
    
  ) {
    this.formReader();
    
  

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
    console.log('parent is working', this.message)
  }



  ngOnInit(): void {
    this.getusertabeldata();
    this.ProductItems();
    this.dealerItems();
    this.roleItems();
     let LoginId1=localStorage.getItem("logInId");
     this.LoginId=Number(LoginId1)

    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
    this.myForm1 = this.fb.group({
      city1: [this.selectedItems]
    });

        this.addAddressDetailsForm = this._formBuilder.group({
          BulkAssociationsCount: this._formBuilder.array([]),  

          });
  }







  formReader() {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  
    });
  }

  
  BulkAssociationsCount(): FormArray {
    return this.addAddressDetailsForm.controls["BulkAssociationsCount"] as FormArray
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
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
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
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
}



    }); 
  }

  getusertabeldata() {
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
 this.associationService.getDealersList(data).subscribe((res) => {   
this.rowData5 = res.response;
let data=res.response;
let details
for(details of data){
  let MRP: FormControl = new FormControl('');
  let MinOrder: FormControl = new FormControl('');
  let MaxOrder: FormControl = new FormControl('');
  let Margin: FormControl = new FormControl('');
  let Discount: FormControl = new FormControl('');
  let LeadTimeIndays: FormControl = new FormControl('');
  let ProductName: FormControl = new FormControl('');
let GeographName: FormControl = new FormControl('');
let DealerName: FormControl = new FormControl('');
let ProductSKUGeographyId: FormControl = new FormControl('');
let LoginId: FormControl = new FormControl('');


MRP.setValue(details?.mrp)
MinOrder.setValue(details?.minOrder)
MaxOrder.setValue(details?.maxOrder)
Margin.setValue(details?.margin)
Discount.setValue(details?.discount)
LeadTimeIndays.setValue(details?.leadTimeIndays)
ProductName.setValue(details?.stockItemName)
DealerName.setValue(details?.customerName)
GeographName.setValue(details?.geographyName)
ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
LoginId.setValue(this.LoginId)


  this.getFormArray().push(new FormGroup({
    MRP:MRP,
    MinOrder:MinOrder,
    MaxOrder:MaxOrder,
    Margin:Margin,
    Discount:Discount,
    LeadTimeIndays:LeadTimeIndays,
    ProductName:ProductName,
    GeographName:GeographName,
    DealerName:DealerName,
    ProductSKUGeographyId:ProductSKUGeographyId,
    donebyid:LoginId
  }));
}

    });
  }
  getFormArray(): FormArray {
    return this.addAddressDetailsForm.get('BulkAssociationsCount') as FormArray;
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
      console.log('bulky', this.toppingList)

      // this.toppingList = res.response;

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

  saveBulkEdit(){
  this.associationService.editbulkdealer(this.addAddressDetailsForm.value).subscribe((res)=>{

if(res.response.result=='successfully updated'){
  this.sharedService.filter('Register click')

  this.dialog.closeAll();
}



  })
  console.log(this.addAddressDetailsForm.value);  

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



  statusItems() {
    this.user.dealersStatus().subscribe((res: any) => {
      this.toppingList1 = res.response;
      
      console.log('we have to check here', this.toppingList1)
      this.toppingList1.forEach(element => {
        return this.statusArray.push(element.statusId);
      

      })
      console.log('statusArray', this.statusArray)
    
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
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemSelectOrAll(item: any) {
    this.geographysSelected = this.roleArray;
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;  
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });

  }
  onItemDeSelectOrAll(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    this.geographysSelected=[];
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  onItemDeSelect(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });

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
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });
  }



  onItemProductSelect(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
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
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemProductSelectOrAll(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    this.productSelected = this.productAllArray;
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });

  }
  onItemProductDeSelectOrAll(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    this.productSelected=[];
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  onItemProductDeSelect(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
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
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }
    });
  }




  
  onItemDealerSelect(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
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
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemDealerSelectOrAll(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    this.dealerSelected = this.dealerAllArray;
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }
    });

  }
  onItemDealerDeSelectOrAll(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
    this.dealerSelected=[];
    const data = {
      geographys:this.geographysSelected,
    product:this.productSelected,
     dealer:this.dealerSelected,
    Search:this.searchText

    }
    this.associationService.getDealersList(data).subscribe((res) => {
      this.rowData5 = res.response;
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }
    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  onItemDealerDeSelect(item: any) {
    this.addAddressDetailsForm = this._formBuilder.group({
      BulkAssociationsCount: this._formBuilder.array([]),  

      });
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
      let data=res.response;
      let details
      for(details of data){
        let MRP: FormControl = new FormControl('');
        let MinOrder: FormControl = new FormControl('');
        let MaxOrder: FormControl = new FormControl('');
        let Margin: FormControl = new FormControl('');
        let Discount: FormControl = new FormControl('');
        let LeadTimeIndays: FormControl = new FormControl('');
        let ProductName: FormControl = new FormControl('');
      let GeographName: FormControl = new FormControl('');
      let DealerName: FormControl = new FormControl('');
      let ProductSKUGeographyId: FormControl = new FormControl('');
      let LoginId: FormControl = new FormControl('');
      
      
      MRP.setValue(details?.mrp)
      MinOrder.setValue(details?.minOrder)
      MaxOrder.setValue(details?.maxOrder)
      Margin.setValue(details?.margin)
      Discount.setValue(details?.discount)
      LeadTimeIndays.setValue(details?.leadTimeIndays)
      ProductName.setValue(details?.stockItemName)
      DealerName.setValue(details?.customerName)
      GeographName.setValue(details?.geographyName)
      ProductSKUGeographyId.setValue(details?.productSKUGeographyId)
      LoginId.setValue(this.LoginId)
      
      
        this.getFormArray().push(new FormGroup({
          MRP:MRP,
          MinOrder:MinOrder,
          MaxOrder:MaxOrder,
          Margin:Margin,
          Discount:Discount,
          LeadTimeIndays:LeadTimeIndays,
          ProductName:ProductName,
          GeographName:GeographName,
          DealerName:DealerName,
          ProductSKUGeographyId:ProductSKUGeographyId,
          donebyid:LoginId
        }));
      }

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

  selectedValue(value){
    alert(value)
    console.log(value)
    let MRP: FormControl = new FormControl('');


    MRP.setValue('mani')
    this.addAddressDetailsForm.setValue(["AA"]);

    // this.addAddressDetailsForm.BulkAssociationsCount.at(0)['sd']
    
    // let control = this.addAddressDetailsForm.controls[0];
    // setTimeout(() => control.patchValue("BulkAssociationsCount"), 250);



  }


  applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
  }
  editBulk(){
    this.dialog.open(BulkEditAssosiationComponent,{width: '1000px',height:'660px'});

  }


}















