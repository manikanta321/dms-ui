import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SharedService } from 'src/app/services/shared-services.service';
import { DeactivateUserpopupComponent } from 'src/app/component/users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { PromotionListService } from 'src/app/services/promotion-list.service';
import { PramotionActionComponent } from 'src/app/component/pramotion-action/pramotion-action.component';
import {MatTableDataSource} from '@angular/material/table';
import { PeriodicElement } from 'src/app/dealers/dealers.component';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

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
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
 
 
  private gridApi!: GridApi;
  dataSource = new MatTableDataSource(ELEMENT_DATA); 
  collapsed = true;
  sideBarOpen = true;
  myForm: any = FormGroup;
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  toppingList: any = [];
  promotionSelected: any[] = [];
  productSelected: any[] = [];
  geographySelected: any[] = [];
  statusSelected: any[] = [];
  searchfilter: any = '';
  messages: any[] = [];
  dealerListArray: any[] = [];
  dealerAllArray: any[] = [];
  dealerSelected: any = [];
  statusArray: any = [];
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  startDate: any = '';
  endDate: any = '';
  selectedDateRange: any;
  searchText: any = '';
  toppingList1: any = [];
  productLisst: any = [];
  geoList: any = [];
  offsetValue: number[] = [];
  loggedUserId: any = '';
  filterDictionary: any;
  public rowData5 = [];
  userTypes: any = [];
  promotionArray: any[] = [];
  disabled = false;
  myForm1: any = FormGroup;
  myForms: any = FormGroup;
  myForms2: any = FormGroup;
  myForms3: any = FormGroup;
  myForms4: any = FormGroup;
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  productarray:any[]=[];
  geoArray:any[]=[];
  toppings = new FormControl('');
  product=new FormControl('');
  geo=new FormControl('');
  toppings1 = new FormControl('');
  statusTypes:any=[];
  instancePopup:any = null;
  currentPageName:string=''
  paginationPageSize = 10;
  public popupParent: HTMLElement = document.body;

 

  columnDefs: ColDef[] = [
    // { headerName: "User Id",
    //   field: 'employeeCode' , sort: 'desc'},
    {   headerName: "Product",field: 'promoCode' ,     tooltipField:"promoCode",},
  
    {   headerName: "Geography",field: 'promotionName' ,      tooltipField:"promotionName",},
  
    {  headerName: "Category",field: 'promotionTypesName',      tooltipField:"promotionTypesName", minWidth:200
  },
  
    {  headerName: "Target Group",
       field: 'noOfDealers',      tooltipField:"noOfDealers",
      },
  
    {   headerName: "Invoice Value",
      // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
      field: 'startDate',      tooltipField:"startDate",
  
    },
  {    
    headerName: '',
    colId: 'action',
    cellRenderer: PramotionActionComponent,
    editable: false,
    maxWidth: 75  
  
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
  
    suppressSizeToFit: true,
    // set the default column width
    // make every column editable
    // editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    // make columns resizable
    flex:1,
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
    AddpromotionData: any;
    clickNextRendererFunc(){
      alert('hlo');
    }
  // sidebar = true;
  // sidenav : boolean = true;
  // @Output()toggleSidebar : EventEmitter <any> = new EventEmitter();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(public dialog: MatDialog,
    private observer: BreakpointObserver,
    private fb: FormBuilder,
    private promotin: PromotionListService,
    private sharedServices :SharedService,
    private route: ActivatedRoute,) {
      sort:[];
      this.route.data.subscribe(v => {
        this.currentPageName = v['key'];
        let actionColumn = v['promotionList'];
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
      this.sharedServices.listen().subscribe((m: any) => {
        console.log(m)
        this.getusertabeldata()
  
      })
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
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 1);
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      city1: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      city2: [this.selectedItems]
    });
    this.myForms2 = this.fb.group({
      city3: [this.selectedItems]
    });
    this.myForms3 = this.fb.group({
      city4: [this.selectedItems]
    });
    this.myForms4 = this.fb.group({
      city5: [this.selectedItems]
    });
  }
  refresh(){

    this.myForm = this.fb.group({
      city1: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      city2: [this.selectedItems]
    });
    this.myForms2 = this.fb.group({ 
      city3: [this.selectedItems]
    });
    this.myForms3 = this.fb.group({ 
      city4: [this.selectedItems]
    });
    this.myForms4 = this.fb.group({ 
      city5: [this.selectedItems]
    });
    this.promotionSelected =[];
    this.productSelected = [];
    this.geographySelected = [];
    this.dealerSelected = [];
    this.statusSelected = [];
    this.startDate ='';
    this.endDate ='';
    this.searchText ='';
    this.toppings = new FormControl('');
    this.toppings1 = new FormControl(this.toppingList1);
    this.product=new FormControl(this.productLisst);
    this.geo=new FormControl(this.geoList);
    this.getusertabeldata();
  }

    getusertabeldata() {
      const data = { 
      promotiontype : [],
      product: [],
      geography: [],
      dealer: [],
      status:[],
      startDate:'',
      endDate :'',
      search: '',
      CurrentUserId:this.loggedUserId,
  
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {
  
        this.rowData5 = res.response;
        console.log("Promotion List",this.rowData5);
  
  
      });
      
    }

// this.getusertabeldata();
  
  // sideBarToggler(){
  //   this.sideBarOpen = !this.sideBarOpen;
  // }
  deactive() {
    this.dialog.open(DeactivateUserpopupComponent);
  }
  ToggleSideNav(value: any) {
    this.sidenav.toggle()
  }
  // sidebartoggle(){
  // this.sidenav = ! this.sidenav;
  // }

  onItemSelect(item: any) {
    this.promotionSelected.push(item.promotionTypesId);

    const data = {
      promotiontype: this.promotionSelected,
      product: this.productSelected,
      geography: this.geographySelected,
      dealer: this.dealerSelected,
      status: this.statusSelected,
      StartDate: this.startDate,
      EndDate: this.endDate,
      search: this.searchText,
      CurrentUserId: this.loggedUserId,


    }
    console.log("Data", data);
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
      console.log("RowData5", this.rowData5)


    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {

    this.promotionSelected.forEach((element, index) => {
      if (element == item.promotionTypesId) this.promotionSelected.splice(index, 1);
    });
    console.log('onItemDeselect', this.promotionSelected);
    const data = {
      promotiontype: this.promotionSelected,
      product: this.productSelected,
      geography: this.geographySelected,
      dealer: this.dealerSelected,
      status: this.statusSelected,
      StartDate: this.startDate,
      EndDate: this.endDate,
      search: this.searchText,
      CurrentUserId: this.loggedUserId,

    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
      console.log("onItemDeselectRowData", this.rowData5);


    });

  }

  onItemSelectOrAll(item: any) {
    this.promotionSelected = this.promotionArray;

    const data = {
      promotiontype: this.promotionSelected,
      product: this.productSelected,
      geography: this.geographySelected,
      dealer: this.dealerSelected,
      status: this.statusSelected,
      StartDate: this.startDate,
      EndDate: this.endDate,
      search: this.searchText,
      CurrentUserId: this.loggedUserId,

    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;


    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }

  onItemDeSelectOrAll(item: any) {
    this.promotionSelected = [];
    const data = {
      promotiontype: this.promotionSelected,
      product: this.productSelected,
      geography: this.geographySelected,
      dealer: this.dealerSelected,
      status: this.statusSelected,
      StartDate: this.startDate,
      EndDate: this.endDate,
      search: this.searchText,
      CurrentUserId: this.loggedUserId,

    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;


    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  onProductSelect(item: any) {

    // alert(item.roleName)
      this.productSelected.push(item.productGroupId);
    
      const data={
        promotiontype:this.promotionSelected,
        product:this.productSelected,
        geography:this.geographySelected,
        dealer:this.dealerSelected,
        status:this.statusSelected,
        StartDate:this.startDate,
        EndDate:this.endDate,
        search:this.searchText,
        CurrentUserId:this.loggedUserId,
  
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {
  
        this.rowData5 = res.response;
  
       
       
  
      });
      console.log('rolefilter', this.userTypes)
      console.log('onItemSelect', item);
    }
  
    onProductDeSelect(item: any) {
    
      this.productSelected.forEach((element,index)=>{
        if(element==item.productGroupId)  this.productSelected.splice(index,1);
     });
     console.log(' this.userTypes', this.userTypes)
    
      // this.userTypes.pop(item.roleId);
      const data={
        promotiontype:this.promotionSelected,
        product:this.productSelected,
        geography:this.geographySelected,
        dealer:this.dealerSelected,
        status:this.statusSelected,
        StartDate:this.startDate,
        EndDate:this.endDate,
        search:this.searchText,
        CurrentUserId:this.loggedUserId,
  
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {
  
        this.rowData5 = res.response;
       
  
      });
    
    }
  
    onItemSelectOrAllProduct(item:any){
      this.productSelected=this.productarray;
     
      const data={
        promotiontype:this.promotionSelected,
        product:this.productSelected,
        geography:this.geographySelected,
        dealer:this.dealerSelected,
        status:this.statusSelected,
        StartDate:this.startDate,
        EndDate:this.endDate,
        search:this.searchText,
        CurrentUserId:this.loggedUserId,
  
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {
  
        this.rowData5 = res.response;
       
  
      });
      console.log('rolefilter', this.userTypes)
      console.log('onItemSelect', item);}
   
      onItemDeSelectOrAllProduct(item:any){
        this.productSelected =[];
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
  
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
  
          this.rowData5 = res.response;
         
    
        });
      console.log('rolefilter', this.userTypes)
      console.log('onItemSelect', item);
    }
    onGeoSelect(item: any) {

      // alert(item.roleName)
        this.geographySelected.push(item.geographyId);
      
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
          this.rowData5 = res.response;
         
    
        });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);
      }
    
      onGeoDeSelect(item: any) {
      
        this.geographySelected.forEach((element,index)=>{
          if(element==item.geographyId)  this.geographySelected.splice(index,1);
       });
       console.log(' this.userTypes', this.userTypes)
      
        // this.userTypes.pop(item.roleId);
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
          this.rowData5 = res.response;
         
    
        });
      
      }
    
      onItemSelectOrAllGeo(item:any){
        this.geographySelected=this.geoArray;
       
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
          this.rowData5 = res.response;
         
    
        });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);}
     
        onItemDeSelectOrAllGeo(item:any){
          this.geographySelected =[];
          const data={
            promotiontype:this.promotionSelected,
            product:this.productSelected,
            geography:this.geographySelected,
            dealer:this.dealerSelected,
            status:this.statusSelected,
            StartDate:this.startDate,
            EndDate:this.endDate,
            search:this.searchText,
            CurrentUserId:this.loggedUserId,
    
          }
          this.promotin.promotionTabledata(data).subscribe((res) => {
    
            this.rowData5 = res.response;
           
      
          });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);
      }
      onItemDealerSelect(item: any) {

        // alert(item.roleName)
        this.dealerSelected.push(item.customerId);
    
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
          this.rowData5 = res.response;
         
        
        });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);
      }
      onItemDealerSelectOrAll(item: any) {
        this.dealerSelected = this.dealerAllArray;
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
          this.rowData5 = res.response;
         
        
        });
    
      }
      onItemDealerDeSelectOrAll(item: any) {
        this.dealerSelected=[];
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
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
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
          this.rowData5 = res.response;  
         
        
        });
      }
      onStatusSelect(item: any) {
        this.statusSelected.push(item.statusId);
        
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
        
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
        
          this.rowData5 = res.response;
         
        
        });
        }
        
        
        onStatusDeSelect(item: any) {
        this.statusSelected.forEach((element,index)=>{
          if(element==item.statusId)  this.statusSelected.splice(index,1);
        });
        // this.statusTypes.pop(item.statusId);
        console.log(' this.statusTypes', this.userTypes)
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
        
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
        
          this.rowData5 = res.response;
         
        
        });
        console.log('rolefilter', this.userTypes)
        console.log('onItemSelect', item);
        }
        onItemDeSelectOrAllStatus(item:any){
          this.statusSelected =[];
          const data={
            promotiontype:this.promotionSelected,
            product:this.productSelected,
            geography:this.geographySelected,
            dealer:this.dealerSelected,
            status:this.statusSelected,
            StartDate:this.startDate,
            EndDate:this.endDate,
            search:this.searchText,
            CurrentUserId:this.loggedUserId,
        
          }
          this.promotin.promotionTabledata(data).subscribe((res) => {
          
            this.rowData5 = res.response;
           
          
          });
          console.log('rolefilter', this.userTypes)
        }
        
        
        onItemSelectOrAllStatus(item:any){
          this.statusSelected=this.statusArray;
          const data={
            promotiontype:this.promotionSelected,
            product:this.productSelected,
            geography:this.geographySelected,
            dealer:this.dealerSelected,
            status:this.statusSelected,
            StartDate:this.startDate,
            EndDate:this.endDate,
            search:this.searchText,
            CurrentUserId:this.loggedUserId,
        
          }
          this.promotin.promotionTabledata(data).subscribe((res) => {
          
            this.rowData5 = res.response;
           
          
          });
          console.log('rolefilter', this.statusTypes)
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
            this.paginationScrollCount = this.rowData5.length;
          }
        }
        onCellClicked( e): void {
          console.log(e)
         localStorage.setItem('promoclickId',e.data.productPromotionsId)
         localStorage.setItem('promoclickName',e.data.promotionName)
      
          let cellCLickedpromotion = '1'
          localStorage.setItem('cellCLickedpromotion', cellCLickedpromotion)
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
        openDialog(){

        }
        onFirstDataRendered(params: FirstDataRenderedEvent) {
          params.api.paginationGoToPage(4);
        }
        onCellValueChanged(event: CellValueChangedEvent) {
          alert(event.value)
          console.log(
            'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
          );
        }
        applyFilter(event: Event) {


          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        params.api.sizeColumnsToFit();
        
      }
      handleRowDataChanged(event) {
        const index = this.messages.length - 1;
        if (this.stayScrolledToEnd) {
          //this.gridOptions.ensureIndexVisible(index, 'bottom');
        }
      }
      onSearchChange($event: any, anything?: any) {
        const { target } = $event;
        this.searchText = target.value;
        const data={
          promotiontype:this.promotionSelected,
          product:this.productSelected,
          geography:this.geographySelected,
          dealer:this.dealerSelected,
          status:this.statusSelected,
          StartDate:this.startDate,
          EndDate:this.endDate,
          search:this.searchText,
          CurrentUserId:this.loggedUserId,
    
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
    
          this.rowData5 = res.response;
    
          
         
    
        });
    
      }
}
