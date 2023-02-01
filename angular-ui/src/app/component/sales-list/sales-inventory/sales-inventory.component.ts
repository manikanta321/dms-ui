import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { AddSalesPopupComponent } from './add-sales-popup/add-sales-popup.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog } from '@angular/material/dialog';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import { SharedServiceAddsalesService } from 'src/app/services/shared-service-addsales.service';
@Component({
  selector: 'app-sales-inventory',
  templateUrl: './sales-inventory.component.html',
  styleUrls: ['./sales-inventory.component.css']
})
export class SalesInventoryComponent implements OnInit {
  dealerForm: any = FormGroup;
  geographyForm: any = FormGroup;
  productForm:any = FormGroup;
  disabled = false;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  private gridApi!: GridApi;
  public popupParent: HTMLElement = document.body;
  instancePopup:any = null;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount:any;
  isOpen:boolean =false;
  dealerList:any = [];
  dealerListArray:any = [];
  dealerAllArray:any = [];
  dealerSelected:any = [];
  geographysSelected:any = [];
  productSelected:any = [];
  searchText:any = '';
  salesListData:any = [];
  productList:any = [];
  productListArray:any = [];
  productAllArray:any = [];
  geographyList:any = [];
  geographyListData:any = [];
  geographyListArray:any = [];
  selectedItems: any = [];
  loggedUserId:any;
  columnDefs: ColDef[] = [
    // { headerName: "User Id",
    //   field: 'employeeCode' , sort: 'desc'},
  
    {   headerName: "Dealer",field: 'dealerName' ,      tooltipField:"dealerName",
  },
    
  {  headerName: "Geography",
  field: 'geographyName',      tooltipField:"geographyName",
 },
    {  headerName: "Product Name",field: 'productName',      tooltipField:"productName",
  },
      {  headerName: "UoM",
      field: 'uoM',      tooltipField:"uoM",
    }, 
    {   headerName: "Current stock",
      field: 'currentStock',      tooltipField:"currentStock",
      type: ['nonEditableColumn']},
  
      {   headerName: "In Transit Qty",
      field: 'inTransit',type: ['nonEditableColumn'],      tooltipField:"inTransit",
    },
      {  headerName: "Pending Qty",
      field: 'pendingQty',      tooltipField:"pendingQty",
    }, 
      {  headerName: "Purchase Qty(YTD)",
      field: 'purchaseQtyYTD',      tooltipField:"purchaseQtyYTD",
    }, 
    { headerName: "Sales(YTD)",
    field: 'salesQtyYTD',      tooltipField:"salesQtyYTD",
  },
  {  headerName: "Annual Target",
      field: 'annualTarget',      tooltipField:"annualTarget",
    },
    {  headerName: " Achieve Target",
      field: 'targetAchieved',      tooltipField:"targetAchieved",
    },
     
  // {    
  //   headerName: '',
  //   colId: 'action',
  //   cellRenderer: UseractionComponent,
  //   editable: false,
  //   maxWidth: 75  
  
  // },
  // {
  //   headerName: "Avatar",
  //   field: "avatar",
  //   width: 100,
  //   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
  //  },
  
  ];
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

  
  constructor(public dialog: MatDialog,
    private salesService:SalesServicesService,
    private fb: FormBuilder,
    private sharedService: SharedServiceAddsalesService,
    ) { 
      this.sharedService.listen().subscribe((m: any) => {
        console.log(m)
        this.DealerListData()
  
      })
    }

  ngOnInit(): void {
    this.loggedUserId = localStorage.getItem('logInId');

    this.ProductItems();
    this.GeographyItems();
    this.dealerItems();
    this.DealerListData();
    this.dealerForm = this.fb.group({
      dealerForm: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geographyForm: [this.selectedItems]
    });
    this.productForm = this.fb.group({
      productForm: [this.selectedItems]
    });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
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
  openDialog(){

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
      this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
      this.paginationScrollCount = this.salesListData.length;
    }
  }
  addSales() {
    this.dialog.open(AddSalesPopupComponent, {minWidth: '90vw', 
    panelClass: 'material-add-edit'
  });
  }
    dealerItems(){
    this.salesService.getDealers().subscribe((res: any) => {
      this.dealerList = res.response;
        let localdata = this.dealerList
        this.dealerListArray = localdata.map((data: { customerId: any; customerName: any; }) => {
          return { customerId: data.customerId, customerName  : data.customerName };
        });

        this.dealerListArray.push()
        this.dealerListArray.forEach(element => {
          return this.dealerAllArray.push(element.customerId);
        })       
        console.log('dealerAllArray',this.dealerAllArray)                                                    
      });
    
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'customerId',
        textField: 'customerName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };
  }
  onItemDealerSelect(item: any) {
    this.dealerSelected.push(item.customerId);

    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,

    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }
  onItemDealerSelectOrAll(item: any) {
    this.dealerSelected = this.dealerAllArray;
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })

  }
  onItemDealerDeSelectOrAll(item: any) {
    this.dealerSelected=[];
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }

  onItemDealerDeSelect(item: any) {
    this.dealerSelected.forEach((element, index) => {
      if (element == item.customerId) this.dealerSelected.splice(index, 1);
    });
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }
  ProductItems(){
    this.salesService.getproductlist().subscribe((res: any) => {
      this.productList = res.response;
        let localdata = this.productList;
        this.productListArray = localdata.map((data: { stockItemId: any; stockItemName: any; }) => {
          return { stockItemId: data.stockItemId, stockItemName: data.stockItemName };
        });
  
        this.productListArray.push()
        this.productListArray.forEach(element => {
          return this.productAllArray.push(element.stockItemId);
        })                                                                    
      });
    
      this.dropdownSettings2 = {
        singleSelection: false,
        idField: 'stockItemId',
        textField: 'stockItemName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };
  }
  onItemProductSelect(item: any) {
    this.productSelected.push(item.stockItemId);

    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }
  onItemProductSelectOrAll(item: any) {
    this.productSelected = this.productAllArray;
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })

  }
  onItemProductDeSelectOrAll(item: any) {
    this.productSelected=[];
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }

  onItemProductDeSelect(item: any) {

    this.productSelected.forEach((element, index) => {
      if (element == item.stockItemId) this.productSelected.splice(index, 1);
    });
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }
  GeographyItems() {
    this.salesService.getGeographies().subscribe((res: any) => {
      this.geographyList =res.response;
      let localdata = this.geographyList;
      this.geographyListData = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });

      this.geographyListData.push()
      this.geographyListData.forEach(element => {
        return this.geographyListArray.push(element.geographyId);
      })
      console.log('buleditGeo', this.geographyListData)
      this.dropdownSettings3 = {
        singleSelection: false,
        idField: 'geographyId',
        textField: 'geographyName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };
    });
  }
  onItemSelect(item: any) {
    this.geographysSelected.push(item.geographyId);

    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }
  onItemSelectOrAll(item: any) {
    this.geographysSelected = this.geographyListArray;
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })

  }
  onItemDeSelectOrAll(item: any) {
    this.geographysSelected=[];
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }

  onItemDeSelect(item: any) {

    this.geographysSelected.forEach((element, index) => {
      if (element == item.geographyId) this.geographysSelected.splice(index, 1);
    });
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }
  DealerListData() {
    const data = {
      GeographyId: [],
      ProductId: [],
      DealerId: [],
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;
console.log("SalesList",this.salesListData)
    })
  }
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
  }
  refreshSales() {
    this.geographysSelected = [];
    this.productSelected = [];
    this.dealerSelected = [];
    this.searchText = '';
    const data = {
      GeographyId:this.geographysSelected,
      ProductId:this.productSelected,
      DealerId:this.dealerSelected,
    Search:this.searchText,
    CurrentUserId:this.loggedUserId,


    }
    this.salesService.getDealeList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesListData=res.response;

    })
    this.dealerForm = this.fb.group({
      dealerForm: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geographyForm: [this.selectedItems]
    });
    this.productForm = this.fb.group({
      productForm: [this.selectedItems]
    });
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}
