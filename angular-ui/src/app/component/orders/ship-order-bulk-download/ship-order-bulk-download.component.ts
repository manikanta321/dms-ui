import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowValueChangedEvent, SideBarDef, ColGroupDef } from 'ag-grid-community';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { UserService } from 'src/app/services/user.service';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { SharedService } from 'src/app/services/shared-services.service';
@Component({
  selector: 'app-ship-order-bulk-download',
  templateUrl: './ship-order-bulk-download.component.html',
  styleUrls: ['./ship-order-bulk-download.component.css']
})
export class ShipOrderBulkDownloadComponent implements OnInit {
  dealerForm: any = FormGroup;
  geographyForm: any = FormGroup;
  disabled = false;
  dealerSettings: IDropdownSettings = {};
  geographySettings: IDropdownSettings = {};
  dealersdrop: any = ['dealr','d'];

  private gridApi!: GridApi;
  public popupParent: HTMLElement = document.body;
  instancePopup:any = null;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  dealerListData:any = [];
  dealerlist:any = [];
  dealerAllArray:any = [];
  geographyData:any = [];
  geogropdownlist:any = [];
  paginationScrollCount:any;
  geoAllarray:any  = [];
  selectedDateRange: any;
  startDate: any = '';
  endDate: any = '';
  geographySelected:any = [];
  dealerss:any = [];
  shipmentDatalist:any = [];
  selectedItems: any = [];
  shipmentData:any;
  receiptData:any;
  shipDownload:boolean = false;
  receiptDownload:boolean = false;
  startDateShip:any = '';
  endDateShip:any = '';
  startDateInvoice:any = '';
  endDateInvoice:any = '';
  receiptDatalist:any = [];
  emptyDownloadArray:any = [];
  columnDefs: ColDef[] = [
    {  headerName: "Order No.",
       field: 'orderNo',      tooltipField:"orderNo",type: ['nonEditableColumn']
      },
  
    {   headerName: "Order Date",

    
  cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },



      // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
      field: 'orderDate',      tooltipField:"orderDate",
      type: ['nonEditableColumn']},
      {  headerName: "Product Name",
      field: 'productName',      tooltipField:"productName",type: ['nonEditableColumn']
     },
     {  headerName: "Product Code",
     field: 'productCode',      tooltipField:"productCode",type: ['nonEditableColumn']
    },
  
      {   headerName: "Order Qty",
      // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
      field: 'orderQty',type: ['nonEditableColumn'],tooltipField:"orderQty",
    },
      {  headerName: "Shipped Till Qty",
      field: 'shippedTillQty',      tooltipField:"shippedTillQty",type: ['nonEditableColumn']
  },
      {  headerName: "Dispatch Qty",
      field: 'dispatchQty',      tooltipField:"dispatchQty",type: ['nonEditableColumn']
    }, 
   
  {  headerName: "Dispatch Date",
  cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },


      field: 'dispatchDate',      tooltipField:"dispatchDate",type: ['nonEditableColumn']
    },
    {  headerName: "Invoice Date",
    cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },
    field: 'invoiceDate',      tooltipField:"invoiceDate",type: ['nonEditableColumn']
  },
  {  headerName: "Invoice No.",
  field: 'invoiceNo',      tooltipField:"invoiceNo",type: ['nonEditableColumn']
},
{  headerName: "Uploaded Date",
cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },
field: 'dispatchDate',      tooltipField:"dispatchDate",type: ['nonEditableColumn']
},
  
  ];
  columnReceiptDefs: (ColDef| ColGroupDef)[] = [
    {  headerName: "Shipment No.",minWidth:160,
    field: 'shipmentNumber',      tooltipField:"shipmentNumber",
   },
   {  headerName: "Shipment Date",minWidth:160,
   field: 'shipmentDate',      tooltipField:"shipmentDate",
  },
    {  headerName: "Order No.",minWidth:160,
       field: 'customerPONumber',      tooltipField:"customerPONumber",
      },
  
    {   headerName: "Order Date",minWidth:160,
      field: 'orderDate',      tooltipField:"orderDate",
      type: ['nonEditableColumn']},
  
      {   headerName: "Dealer",minWidth:160,
      field: 'dealer',type: ['nonEditableColumn'],      tooltipField:"dealer",
    },
      {  headerName: "Invoice No.",minWidth:160,
      field: 'invoiceNumber',      tooltipField:"invoiceNumber",
    }, 
      {  headerName: "Invoice Date",minWidth:160,
      field: 'invoiceDate',      tooltipField:"invoiceDate",
    }, 
   
    {  headerName: "Total Items ",
    field:"totalitems",tooltipField:"totalitems", resizable:true,
        //     children:[
        //   {headerName: "In Order", field: 'poQty',  tooltipField:"poQty",    minWidth:50, resizable:true},
        //   {headerName: "In Shipment", field: 'shipQty',      tooltipField:"shipQty",minWidth:50, resizable:true},
        //   {headerName: "Received", field: 'received',      tooltipField:"received",minWidth:50, resizable:true},
        // ]
    
      },
  
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
  constructor(private user: UserService,
    public orders:OrdersApisService,
    private sharedService :SharedService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.dealerForm = this.fb.group({
      dealer: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geography: [this.selectedItems]
    });

    // this.dealerForm = this.fb.group({
    //   city: [this.selectedItems]
    // });
    // this.geographyForm = this.fb.group({
    //   geo: [this.selectedItems]
    // });
   
    this.dealerOrder();
    this.geogrphyOrder();
    this.getDownloadBulkUpload();
    this.OrderDownload();
    this.receiptList();
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
      this.paginationScrollCount = this.shipmentDatalist.length;
    }
  }
  handleScrollReceipt(event) {
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
      this.paginationScrollCount = this.receiptDatalist.length;
    }
  }
  getDownloadBulkUpload() {
    let data = {
      GeographyId:[],
      DealerId:[],
      StartDate:"",
      EndDate:""
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  receiptList(){
    let data = {
      DealerId:[],
      ShipmentStartDate:"",
      ShipmentEndDate:"",
      InvoiceStartDate:"",
      InvoiceEndDate:"",
      search:""
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response Receipt",this.receiptDatalist)


      this.receiptDatalist.forEach(element => {

        element.orderDate=this.sharedService.dateformat
        (element.orderDate);
      
      }) 


       this.receiptDatalist.forEach(element=>{
          

            
         element.shipmentDate= this.sharedService.dateformat
        (element.shipmentDate);
        })

        this.receiptDatalist.forEach(element=>{
          

            
          element.invoiceDate= this.sharedService.dateformat
         (element.invoiceDate);
         })

     
    });
  }
  customDatePickerEvent(eventChange) {
    this.selectedDateRange = eventChange.selectedDate;
    this.startDate = this.selectedDateRange.startDate;
    this.endDate = this.selectedDateRange.endDate;
    console.log(this.selectedDateRange);
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
      // ShipmentStartDate:this.startDateShip,
      // ShipmentEndDate:this.endDateShip,
      // InvoiceStartDate:this.startDateInvoice,
      // InvoiceEndDate:this.endDateInvoice,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  customShipDatePickerEvent(eventChange){
    this.selectedDateRange = eventChange.selectedDate;
    this.startDateShip = this.selectedDateRange.startDate;
    this.endDateShip = this.selectedDateRange.endDate;
    console.log(this.selectedDateRange);
    let data = {
      DealerId:this.dealerss,
      GeographyId:this.geographySelected,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search:''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  selectedDateRanges:any;
  customInvoiceDatePickerEvent(eventChange){
    // this.selectedDateRange = eventChange.selectedDate;
    // this.startDateInvoice = this.selectedDateRange.startDate;
    // this.endDateInvoice = this.selectedDateRange.endDate;
    // console.log(this.selectedDateRange);
    // let data = {
    //   DealerId:this.dealerss,
    //   GeographyId:this.geographySelected,
    //   ShipmentStartDate:this.startDateShip,
    //   ShipmentEndDate:this.endDateShip,
    //   InvoiceStartDate:this.startDateInvoice,
    //   InvoiceEndDate:this.endDateInvoice,
    //   search:''
    // }

    this.selectedDateRanges = eventChange.selectedDate;
    this.startDateInvoice = this.selectedDateRanges.startDate;
    this.endDateInvoice = this.selectedDateRanges.endDate;
    console.log(this.selectedDateRanges);
    let data = {
      DealerId:this.dealerss,
      GeographyId:this.geographySelected,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search:''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response DATE",this.receiptDatalist)
    });
  }
  dealerOrder(){
    this.user.dealerDropdownOrderlist().subscribe((res: any) => {
        this.dealerListData = res.response;
        let localdata = res.response;
        this.dealerlist = localdata.map((data: { customerId: any; customerName: any; }) => {
          return { customerId: data.customerId, customerName  : data.customerName };
        });
        this.dealerlist.push()
        this.dealerlist.forEach(element => {
          return this.dealerAllArray.push(element.customerId);
        })       
        console.log('dealerAllarray',this.dealerAllArray)                                                    
      });
      this.dealerSettings = {
        singleSelection: false,
        idField: 'customerId',
        textField: 'customerName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
      };
  }
  OrderDownload() {
    this.shipmentData = sessionStorage.getItem("bulkShipDownload");
    if(this.shipmentData != '') {
      this.shipDownload =true;
      this.receiptDownload = false;
    }
   this.receiptData = sessionStorage.getItem("OrderReceiptDownload");
   if(this.receiptData != '') {
    this.shipDownload = false;
    this.receiptDownload = true;
  }
  }
  DealerorderSelect(item: any){
    this.dealerss.push(item.customerId);
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  DealerDeselect(item:any){
    console.log(item)
    this.dealerss.forEach((element, index) => {
      if (element == item.customerId) this.dealerss.splice(index, 1);
    });
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  DealerDeselectAll(item:any){
    this.dealerss = [];
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  DealerorderSelectAll(item:any){
    this.dealerss = this.dealerAllArray;
    console.log("AllDealers",this.dealerss);
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  DealerorderReceiptSelect(item: any){
    this.dealerss.push(item.customerId);
    let data = {
      DealerId:this.dealerss,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  DealerReceiptDeselect(item:any){
    console.log(item)
    this.dealerss.forEach((element, index) => {
      if (element == item.customerId) this.dealerss.splice(index, 1);
    });
    let data = {
      DealerId:this.dealerss,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  DealerReceiptDeselectAll(item:any){
    this.dealerss = [];
    let data = {
      DealerId:this.dealerss,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  DealerorderReceiptSelectAll(item:any){
    this.dealerss = this.dealerAllArray;
    console.log("AllDealers",this.dealerss);
    let data = {
      DealerId:this.dealerss,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  geographyReceiptselect(item: any) {
    this.geographySelected.push(item.geographyId);
    console.log("geographics", this.geographySelected);
    let data = {
      DealerId:this.dealerss,
      GeographyId:this.geographySelected,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  geographyReceiptDeselect(item: any) {
    this.geographySelected.forEach((element, index) => {
      if (element == item.geographyId) this.geographySelected.splice(index, 1);
    });
    let data = {
      DealerId:this.dealerss,
      GeographyId:this.geographySelected,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  geographyReceiptDeselectAll(item: any) {
    this.geographySelected = [];
    let data = {
      DealerId:this.dealerss,
      GeographyId:this.geographySelected,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }
  geographyReceiptselectAll(item: any) {
    this.geographySelected = this.geoAllarray;
    console.log("geographics", this.geographySelected);
    let data = {
      DealerId:this.dealerss,
      GeographyId:this.geographySelected,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response",this.receiptDatalist)
    });
  }

  geogrphyOrder(){
    this.user.getGeographies().subscribe((res: any) => {
      let localdata = res.response;
      this.geographyData = res.response;
      this.geogropdownlist = localdata.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });

      this.geogropdownlist.push()
      this.geogropdownlist.forEach(element => {
        return this.geoAllarray.push(element.geographyId);
      })
      console.log('buleditGeo', this.geoAllarray)
      this.geographySettings = {
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
  geographyselect(item:any){
    this.geographySelected.push(item.geographyId);
    console.log("geographics",this.geographySelected);
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  geographyDeselect(item: any) {
    this.geographySelected.forEach((element, index) => {
      if (element == item.geographyId) this.geographySelected.splice(index, 1);
    });
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
    console.log('onItemSelect', item);
  }
  geographyDeselectAll(item: any) {
    this.geographySelected=[];
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
  }
  geographyselectAll(item: any) {
    this.geographySelected = this.geoAllarray;
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
    // console.log('rolefilter', this.userTypes)
    // console.log('onItemSelect', item);
  }
  Receiptrefresh() {
    this.dealerForm = this.fb.group({
      dealer: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geography: [this.selectedItems]
    });
    this.dealerForm = this.fb.group({
      dealer: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geography: [this.selectedItems]
    });
    this.dealerss = [];
    this.geographySelected = [];
    this.startDateShip = '';
    this.endDateShip = '';
    this.startDateInvoice = '';
    this.endDateInvoice = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedDateRange = null;
    this.selectedDateRanges=''
    
   
    let data = {
      DealerId:this.dealerss,
      GeographyId:this.geographySelected,
      ShipmentStartDate:this.startDateShip,
      ShipmentEndDate:this.endDateShip,
      InvoiceStartDate:this.startDateInvoice,
      InvoiceEndDate:this.endDateInvoice,
      search: ''
    }
    this.orders.getOrderReceiptList(data).subscribe((res) => {
      this.receiptDatalist = res.response;
      console.log("Response kkkkkk",this.receiptDatalist)
    });
  }
  refresh() {
    this.dealerForm = this.fb.group({
      dealer: [this.selectedItems]
    });
    this.geographyForm = this.fb.group({
      geography: [this.selectedItems]
    });
    this.dealerss = [];
    this.geographySelected = [];
    this.startDate = '';
    this.endDate = '';
     this.selectedDateRange = null;
    let data = {
      GeographyId:this.geographySelected,
      DealerId:this.dealerss,
      StartDate:this.startDate,
      EndDate:this.endDate,
    }
    this.orders.getDownloadShipmentList(data).subscribe((res) => {
      this.shipmentDatalist = res.response;
      console.log("Response Data",this.shipmentDatalist)
    });
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
  bulkDownload() {
    this.gridApi.exportDataAsCsv({ fileName: 'ordersShipment_' + this.convertedDateFormat() });
  }
  emptyDownload(){
this.emptyDownloadArray = this.shipmentDatalist;
this.emptyDownloadArray = [];
    this.gridApi.exportDataAsCsv(this.emptyDownloadArray);
  }
}
