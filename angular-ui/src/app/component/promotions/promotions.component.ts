import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
import { DateRange } from '@uiowa/date-range-picker';
import { AddItemsPromotionComponent } from './add-items-promotion/add-items-promotion.component';
import { PromotionService } from 'src/app/services/promotion.service';
import { PromotionListService } from 'src/app/services/promotion-list.service';
import { UseractionComponent } from '../useraction/useraction.component';
import { DateRangeSelectionComponent } from './date-range-selection/date-range-selection.component';
import { PramotionActionComponent } from '../pramotion-action/pramotion-action.component';
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
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  private gridApi!: GridApi;
  paginationPageSize = 10;
  myForm:any= FormGroup;
  myForm1:any= FormGroup;

  myForms:any= FormGroup;
  myForms2:any= FormGroup;

  myForms3:any= FormGroup;

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
  searchText:any='';
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  public rowData5=[];
  public popupParent: HTMLElement = document.body;
  roleArray:any[] = [];
  promotionArray:any[] = [];
  productarray:any[]=[];
  geoArray:any[]=[];

  promotionSelected:any[]=[];
  productSelected:any[]=[];
  geographySelected:any[]=[];
  statusSelected:any[]=[];
  searchfilter:any='';
  messages: any[] = [];



  statusArray:any=[];
  stayScrolledToEnd = true;
  paginationScrollCount:any;
 
columnDefs: ColDef[] = [
  // { headerName: "User Id",
  //   field: 'employeeCode' , sort: 'desc'},

  {   headerName: "Name",field: 'promotionName' ,      tooltipField:"promotionName",
},

  {  headerName: "Type",field: 'promotionTypesName',      tooltipField:"promotionTypesName",
},

  {  headerName: "# of Dealers",
     field: '',      tooltipField:"",
    },

  {   headerName: "Start Date",
    // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
    field: 'startDate',      tooltipField:"startDate",
    type: ['nonEditableColumn']},

    {   headerName: "End Date",
    // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
    field: 'endDate',type: ['nonEditableColumn'],      tooltipField:"endDate",
  },
    {  headerName: "# of orders",
    field: '',      tooltipField:"",
  }, 
    {  headerName: "Invoiced Value",
    field: '',      tooltipField:"",
  }, 
  { headerName: "Status",
     field: 'statusName', 
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['Active', 'Inactive', 'Invited', 'Locked',],
  }
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
  clickNextRendererFunc(){
    alert('hlo');
  }


	// sorting: GuiSorting = {
	// 	enabled: true,
	// 	multiSorting: true
	// };
  displayedColumns: string[] = ['position', 'name',  'symbol','email','phonenum','login','status','edit'];
  toppings = new FormControl('');
  product=new FormControl('');
  geo=new FormControl('');
  toppings1 = new FormControl('');

  // toppingList: string[] = ['Admin', 'Dealer','Customer'];
  toppingList: any= [];

  toppingList1:  any= [];
  productLisst:  any= [];
geoList:any=[]
  filterDictionary: any;
  sideBarOpen = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  roleName: any;
  statusname:any;
  instancePopup:any = null;
  dateRange = new DateRange();
  maxDate = new Date();
  dateRange1 =  DateRange.nextMonth();
  // date: Date;

  constructor(public dialog: MatDialog,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private user:UserService,
    private observer: BreakpointObserver,
    public promotionTypes : PromotionService,
    private promotin:PromotionListService,
    private fb: FormBuilder,

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

  selectedDateRange = {
    startDate: '11/11/2022',
    endDate: '11/15/2022',
  }

  customDatePickerEvent(eventChange){
    this.selectedDateRange = eventChange.selectedDate;
    console.log(this.selectedDateRange);
  }


  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 20);     
    
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
  this.getusertabeldata();
  this.statusItems();
  this.promotionList();
  this.productList();
  this.geogrophylist();
  // this.maxDate.setDate(this.maxDate.getDate() + 20);
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
    this.toppings = new FormControl('');
    this.toppings1 = new FormControl(this.toppingList1);
    this.product=new FormControl(this.productLisst);
    this.geo=new FormControl(this.geoList);
    this.getusertabeldata();



this.getusertabeldata();
  }


  getusertabeldata() {
    const data = { 
    Ptype:this.promotionSelected,
    Prodct:this.productSelected,
    Geo:this.geographySelected,
    Deler:[],
    status:this.statusSelected,
    search:this.searchText
    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
     

    });
  }


  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      Ptype:this.promotionSelected,
      Prodct:this.productSelected,
      Geo:this.geographySelected,
      Deler:[],
      status:this.statusSelected,
      search:this.searchText
    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
     

    });

  }

  promotionList(){
    this.promotin.promotionlist().subscribe((res)=>{
      let localdata=res.response;


    this.toppingList = localdata.map((data: { promotionTypesId: any; promotionTypesName: any; }) => {
      return { promotionTypesId: data.promotionTypesId, promotionTypesName: data.promotionTypesName };
    });

    // if (!this.toppingList?.length) {
    //   this.toppingList = localdata.map((role: { designationName: any; }) => {
    //     return role.designationName;
    //   });
    // }
    this.toppingList.push()
    console.log('array check',this.toppingList)
    this.toppingList.push()
    this.toppingList.forEach(element => {
      return this.promotionArray.push(element.promotionTypesId);
      // console.log('rolecheck',rolecheck)

    })
    console.log('promotionArray', this.promotionArray)
    // this.toppingList = res.response;
    this.toppings = new FormControl(this.toppingList);

    console.log('rolelist',this.toppingList)
    
    console.log('rolelist', this.toppingList)
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'promotionTypesId',
      textField: 'promotionTypesName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.selectedItems = [];
    })
  }



  onItemSelect(item: any) {

    // alert(item.roleName)
      this.promotionSelected.push(item.promotionTypesId);
    
      const data={
        Ptype:this.promotionSelected,
        Prodct:this.productSelected,
        Geo:this.geographySelected,
        Deler:[],
        status:this.statusSelected,
        search:this.searchText
    
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {

        this.rowData5 = res.response;
       
  
      });
      console.log('rolefilter', this.userTypes)
      console.log('onItemSelect', item);
    }

    onItemDeSelect(item: any) {
    
      this.promotionSelected.forEach((element,index)=>{
        if(element==item.promotionTypesId)  this.promotionSelected.splice(index,1);
     });
     console.log(' this.userTypes', this.userTypes)
    
      // this.userTypes.pop(item.roleId);
      const data={
        Ptype:this.promotionSelected,
        Prodct:this.productSelected,
        Geo:this.geographySelected,
        Deler:[],
        status:this.statusSelected,
        search:this.searchText
    
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {

        this.rowData5 = res.response;
       
  
      });
    
    }

    onItemSelectOrAll(item:any){
      this.promotionSelected=this.promotionArray;
     
      const data={
        Ptype:this.promotionSelected,
        Prodct:this.productSelected,
        Geo:this.geographySelected,
        Deler:[],
        status:this.statusSelected,
        search:this.searchText
    
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {

        this.rowData5 = res.response;
       
  
      });
      console.log('rolefilter', this.userTypes)
      console.log('onItemSelect', item);}
   
      onItemDeSelectOrAll(item:any){
        const data={
          Ptype:[],
          Prodct:this.productSelected,
          Geo:this.geographySelected,
          Deler:[],
          status:this.statusSelected,
          search:this.searchText
      
        }
        this.promotin.promotionTabledata(data).subscribe((res) => {
  
          this.rowData5 = res.response;
         
    
        });
      console.log('rolefilter', this.userTypes)
      console.log('onItemSelect', item);
    }
    



productList(){
  this.promotin.productListApi().subscribe((res)=>{
    let localdata=res.response;


  this.productLisst = localdata.map((data: { productGroupId: any; productGroupName: any; }) => {
    return { productGroupId: data.productGroupId, productGroupName: data.productGroupName };
  });

  // if (!this.toppingList?.length) {
  //   this.toppingList = localdata.map((role: { designationName: any; }) => {
  //     return role.designationName;
  //   });
  // }
  this.productLisst.push()
  console.log('array check',this.toppingList)
  this.productLisst.push()
  this.productLisst.forEach(element => {
    return this.productarray.push(element.productGroupId);
    // console.log('rolecheck',rolecheck)

  })
  console.log('productarray', this.productarray)
  // this.toppingList = res.response;
  this.product = new FormControl(this.productLisst);

  
  this.dropdownSettings1 = {
    singleSelection: false,
    idField: 'productGroupId',
    textField: 'productGroupName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  this.selectedItems = [];
  })

}


onProductSelect(item: any) {

  // alert(item.roleName)
    this.productSelected.push(item.productGroupId);
  
    const data={
      Ptype:this.promotionSelected,
      Prodct:this.productSelected,
      Geo:this.geographySelected,
      Deler:[],
      status:this.statusSelected,
      search:this.searchText
  
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
      Ptype:this.promotionSelected,
      Prodct:this.productSelected,
      Geo:this.geographySelected,
      Deler:[],
      status:this.statusSelected,
      search:this.searchText
  
    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
     

    });
  
  }

  onItemSelectOrAllProduct(item:any){
    this.productSelected=this.productarray;
   
    const data={
      Ptype:this.promotionSelected,
      Prodct:this.productSelected,
      Geo:this.geographySelected,
      Deler:[],
      status:this.statusSelected,
      search:this.searchText
  
    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
     

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);}
 
    onItemDeSelectOrAllProduct(item:any){
      const data={
        Ptype:this.promotionSelected,
        Prodct:[],
        Geo:this.geographySelected,
        Deler:[],
        status:this.statusSelected,
        search:this.searchText
    
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {

        this.rowData5 = res.response;
       
  
      });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  

geogrophylist(){
  
  this.promotin.giographiesList().subscribe((res)=>{
    let localdata=res.response;


  this.geoList = localdata.map((data: { geographyId: any; geographyName: any; }) => {
    return { geographyId: data.geographyId, geographyName: data.geographyName };
  });

 
  this.geoList.push()
  this.geoList.forEach(element => {
    return this.geoArray.push(element.geographyId);
    // console.log('rolecheck',rolecheck)

  })
  console.log('geoarray', this.geoArray)
  // this.toppingList = res.response;
  this.geo = new FormControl(this.geoList);

  
  this.dropdownSettings2 = {
    singleSelection: false,
    idField: 'geographyId',
    textField: 'geographyName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
  this.selectedItems = [];
  })
}


onGeoSelect(item: any) {

  // alert(item.roleName)
    this.geographySelected.push(item.geographyId);
  
    const data={
      Ptype:this.promotionSelected,
      Prodct:this.productSelected,
      Geo:this.geographySelected,
      Deler:[],
      status:this.statusSelected,
      search:this.searchText
  
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
      Ptype:this.promotionSelected,
      Prodct:this.productSelected,
      Geo:this.geographySelected,
      Deler:[],
      status:this.statusSelected,
      search:this.searchText
  
    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
     

    });
  
  }

  onItemSelectOrAllGeo(item:any){
    this.geographySelected=this.geoArray;
   
    const data={
      Ptype:this.promotionSelected,
      Prodct:this.productSelected,
      Geo:this.geographySelected,
      Deler:[],
      status:this.statusSelected,
      search:this.searchText
  
    }
    this.promotin.promotionTabledata(data).subscribe((res) => {

      this.rowData5 = res.response;
     

    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);}
 
    onItemDeSelectOrAllGeo(item:any){
      const data={
        Ptype:this.promotionSelected,
        Prodct:this.productSelected,
        Geo:[],
        Deler:[],
        status:this.statusSelected,
        search:this.searchText
    
      }
      this.promotin.promotionTabledata(data).subscribe((res) => {

        this.rowData5 = res.response;
       
  
      });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  

statusItems(){
  
  this.promotin.getstatusDeatils().subscribe((res: any) => {
      
    let localdata=res.response;


    this.toppingList1 = localdata.map((data: { statusId: any; statusName: any; }) => {
      return {statusId: data.statusId, statusName: data.statusName };
    });

  
    this.toppingList1.push()
    console.log(this.toppingList1,'dealer status')
    // this.toppingList = res.response;
    this.toppings1 = new FormControl(this.toppingList1);


    this.toppingList1.forEach(element => {
      return this.statusArray.push(element.statusId);
      // console.log('rolecheck',rolecheck)
  
    })
    console.log('statusArray', this.statusArray)
    // this.toppingList = res.response;
    this.toppings1 = new FormControl(this.toppingList1);
  
    
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'statusId',
      textField: 'statusName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.selectedItems = [];

  });
}





onItemDeSelectOrAllStatus(item:any){
  const data={
    Ptype:this.promotionSelected,
    Prodct:this.productSelected,
    Geo:this.geographySelected,
    Deler:[],
    status:[],
    search:this.searchText
  }
  this.promotin.promotionTabledata(data).subscribe((res) => {
  
    this.rowData5 = res.response;
   
  
  });
  console.log('rolefilter', this.userTypes)
}


onItemSelectOrAllStatus(item:any){
  this.statusSelected=this.statusArray;
  const data={
    Ptype:this.promotionSelected,
    Prodct:this.productSelected,
    Geo:this.geographySelected,
    Deler:[],
    status:this.statusSelected,
    search:this.searchText
  }
  this.promotin.promotionTabledata(data).subscribe((res) => {
  
    this.rowData5 = res.response;
   
  
  });
  console.log('rolefilter', this.statusTypes)
}

onStatusSelect(item: any) {
this.statusSelected.push(item.statusId);

const data={
  Ptype:this.promotionSelected,
  Prodct:this.productSelected,
  Geo:this.geographySelected,
  Deler:[],
  status:this.statusSelected,
  search:this.searchText
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
  Ptype:this.promotionSelected,
  Prodct:this.productSelected,
  Geo:this.geographySelected,
  Deler:[],
  status:this.statusSelected,
  search:this.searchText
}
this.promotin.promotionTabledata(data).subscribe((res) => {

  this.rowData5 = res.response;
 

});
console.log('rolefilter', this.userTypes)
console.log('onItemSelect', item);
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



  onCellClicked( e): void {
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
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  openDialog(){

  }
  addPromotions(){
    const config: MatDialogConfig = {
      width: '1100px',
      height: '583px',
     
    };
    this.dialog.open( AddPromotionsComponent, config);

  }
  // handleScroll(event) {
  //   const grid = document.getElementById('gridContainer');
  //   if (grid) {
  //     const gridBody = grid.querySelector('.ag-body-viewport') as any;
  //     const scrollPos = gridBody.offsetHeight + event.top;
  //     const scrollDiff = gridBody.scrollHeight - scrollPos;
  //     //const api =  this.rowData5;
  //     this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
  //     this.paginationScrollCount = this.rowData5.length;
  //   }
  // }

  testingAddItem(){
    
    this.dialog.open( AddItemsPromotionComponent);
  }
  datep(){
    this.dialog.open( DateRangeSelectionComponent);
  }
}

