import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent , ColGroupDef, CellClickedEvent} from 'ag-grid-community';
import moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { OrdersReceiveShipmentComponent } from '../component/orders-receive-shipment/orders-receive-shipment.component';
import { CustomDatePopupComponent } from '../component/orders/custom-date-popup/custom-date-popup.component';
import { ShipOrderBulkDownloadComponent } from '../component/orders/ship-order-bulk-download/ship-order-bulk-download.component';
import { SalesBulkUploadComponent } from '../component/sales-bulk-upload/sales-bulk-upload.component';
import { OrdersApisService } from '../services/orders-apis.service';
import { OtherMasterService } from '../services/other-master.service';
import { SharedServiceCalendarService } from '../services/shared-service-calendar.service';
import { SharedServicesShipmentService } from '../services/shared-services-shipment.service';
import { SharedService } from '../services/shared-services.service';
import { UserService } from '../services/user.service';
import { OrderReceiptsBulkUploadComponent } from './order-receipts-bulk-upload/order-receipts-bulk-upload.component';

@Component({
  selector: 'app-orders-receipts',
  templateUrl: './orders-receipts.component.html',
  styleUrls: ['./orders-receipts.component.css']
})
export class OrdersReceiptsComponent implements OnInit {
  myForm: any = FormGroup; 
  myForm1: any = FormGroup; 
  disabled = false;
  dealerSettings: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  startDate = new FormControl(new Date());
  minDateToFinish = new Subject<string>();
  invoiceDate :any = ['last 30 days', 'last 60 days','last 90 days','Last 180 Days','This Month','This Quater','This Year','Last Month','Last Quater','Last Year']
  disableSelect = new FormControl(false);
  private gridApi!: GridApi;
  public popupParent: HTMLElement = document.body;
  instancePopup:any = null;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount:any;
  dealerlist:any = [];
  dealerListData:any = [];
  dealerListArray:any = [];
  receiptDatalist:any =[];
  dealerss:any = [];
  selectedItems: any = [];
  searchText:any ='';
  startDateShip:any = '';
  endDateShip:any = '';
  startDateInvoice:any = '';
  endDateInvoice:any = '';
  selectedDateRange:any;
  selectedDateRanges:any;
  geogropdownlist:any = [];
  geoAllarray:any  = [];
  geogragphies:any = [];
  dropdownSettings1: IDropdownSettings = {};
  loggedUserId:any;
  isitemtarget:any;
  columnDefs: (ColDef| ColGroupDef)[] = [
    {  headerName: "Shipment No.",
    field: 'shipmentNumber',      tooltipField:"shipmentNumber",
    
   },
   {  headerName: "Shipment Date",
   field: 'shipmentDate',      tooltipField:"shipmentDate",
  cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },

  },
    {  headerName: "Order No.",
       field: 'customerPONumber',      tooltipField:"customerPONumber",
       cellStyle: { color: '#017EFA' },
       cellEditorPopup: true,
       onCellClicked: (event: CellClickedEvent) => this.dialog.open(OrdersReceiveShipmentComponent,{      maxWidth: '95vw'    ,height:"95vh"}),
      },
  
    {   headerName: "Order Date",
   
    
  cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },
  
      type: ['nonEditableColumn'],
    },
  
      {   headerName: "Dealer",
      field: 'dealer',type: ['nonEditableColumn'],      tooltipField:"dealer",
    },
      {  headerName: "Invoice No.",
      field: 'invoiceNumber',      tooltipField:"invoiceNumber",
    }, 
      {  headerName: "Invoice Date",
      field: 'invoiceDate',      tooltipField:"invoiceDate",


      
  cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },

    }, 
   
  {  headerName: "Total Items ", 
  field:"totalitems",tooltipField:"totalitems", resizable:true,
  
  
          children:[
        {headerName: "In Order", field: 'poQty',  tooltipField:"poQty",    minWidth:50, resizable:true,type: 'rightAligned'},
        {headerName: "In Shipment", field: 'shipQty',      tooltipField:"shipQty",minWidth:50, resizable:true,type: 'rightAligned',},
        {headerName: "Received", field: 'received',      tooltipField:"received",minWidth:50, resizable:true,type: 'rightAligned',},
      ]
  
    },
  //   {  headerName: "In Shipment",
  //     field: 'inshipment',      tooltipField:"inshipment",
  //   },
  //   {  headerName: "Received",
  //   field: 'received',      tooltipField:"received",
  // },
  
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

  clickNextRendererFunc(){
    alert('hlo');
  }
  constructor(public dialog: MatDialog,
    private sharedService :SharedService,
    public orders:OrdersApisService,
    private otherMasterService:OtherMasterService,
    private user: UserService,
    private fb: FormBuilder,
    private sharedserviceForshipment:SharedServicesShipmentService,
    private sharedServiceCalendar:SharedServiceCalendarService,
    ) { 


      this.sharedserviceForshipment.listen().subscribe((m: any) => {
        console.log(m)
        this.receiptList();
      })
    }

  ngOnInit(): void {
    this.loggedUserId = localStorage.getItem('logInId');
  

    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForm1 = this.fb.group({
      geo: [this.selectedItems]
    });
    this.receiptList();
    this.geogrphyOrder();
    this.dealerDropdownData();
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
    this.otherMasterService.listen().subscribe((m: any) => {
      console.log("RefreshData",m)
      setTimeout (() => {
        this.receiptList();
     }, 2000);
     

    })
  }
  onCellValueChanged(event: CellValueChangedEvent) {
    alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  openDialog(){

  }
  onCellClicked( e) {
    console.log(e)
    // alert(e.data.customerPOId)
    localStorage.setItem('customerPOIdForShipment',e.data.customerPOId)
    localStorage.setItem('ViewOrReceive', 'View')
    localStorage.setItem('orderOrShipmentOrRecipt','receipts')
    localStorage.setItem('OrderNumberToShow',e.data.customerPONumber)

   
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
      this.paginationScrollCount = this.receiptDatalist.length;
    }
  }
  dateChange(e) {
    this.minDateToFinish.next(e.value.toString());
  }
 bulkDownload(){
  sessionStorage.setItem("bulkShipDownload","");
  sessionStorage.setItem("OrderReceiptDownload","ReceiptDownload");

  this.dialog.open(ShipOrderBulkDownloadComponent, {width:'80%'})
  }
  selectdays(){
    this.dialog.open(CustomDatePopupComponent,{panelClass:'custmdays'})
    }
    // selectedDateRange = {
    //   startDate: '11/11/2022',
    //   endDate: '11/15/2022',
    // }
  
    customShipDatePickerEvent(eventChange){
      this.selectedDateRange = eventChange.selectedDate;
      this.startDateShip = this.selectedDateRange.startDate;
      this.endDateShip = this.selectedDateRange.endDate;
      console.log(this.selectedDateRange);
      // let data = {
      //   StatusId:[],
      //   DealerId:this.dealerss,
      //   StartDateship:this.startDateShip,
      //   EndDateship:this.endDateShip,
      //   StartDateinvoice:"",
      //   EndDateinvoice:"",
      //   Search:""
      // }
      // this.orders.getShipmentList(data).subscribe((res) => {
      //   this.shipmentDatalist = res.response;
      //   console.log("Response",this.shipmentDatalist)
      // });
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    customInvoiceDatePickerEvent(eventChange){
      this.selectedDateRanges = eventChange.selectedDate;
      this.startDateInvoice = this.selectedDateRanges.startDate;
      this.endDateInvoice = this.selectedDateRanges.endDate;
      console.log(this.selectedDateRanges);
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    orderReceiptsBulkUpload(){
      localStorage.setItem('UploadTarget','');
        this.dialog.open(OrderReceiptsBulkUploadComponent);
    }
    // orderReceiptsBulkUpload(){
    //   sessionStorage.setItem("sales",'');
    //   sessionStorage.setItem("orderReceipt",'Receipt');
    //   sessionStorage.setItem("orderShipment",'');
    //   this.dialog.open(SalesBulkUploadComponent);
    // }
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
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    geographyDeselect(item: any) {
      this.geogragphies.forEach((element, index) => {
        if (element == item.geographyId) this.geogragphies.splice(index, 1);
      });
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    geographyDeselectAll(item: any) {
      this.geogragphies = [];
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    geographyselectAll(item: any) {
      this.geogragphies = this.geoAllarray;
      console.log("geographics", this.geogragphies);
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    receiptList(){
      let data = {
        DealerId:[],
        GeographyId:[],
        ShipmentStartDate:"",
        ShipmentEndDate:"",
        InvoiceStartDate:"",
        InvoiceEndDate:"",
        search:"",
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response Receipt",this.receiptDatalist)


        this.receiptDatalist.forEach(element=>{

        
          

          element.shipmentDate= this.sharedService.dateformat
          (element.shipmentDate);
         
      }),


      this.receiptDatalist.forEach(element=>{
        

        
        element.orderDate= this.sharedService.dateformat
        (element.orderDate);

        
    })

    
    this.receiptDatalist.forEach(element=>{
      

        
      element.invoiceDate= this.sharedService.dateformat
      (element.invoiceDate);
  })





      });
    }
    dealerDropdownData(){
      this.user.dealerDropdownOrderlist().subscribe((res: any) => {
          this.dealerlist =res.response;
          let localdata = res.response;
          this.dealerListData = localdata.map((data: { customerId: any; customerName: any; }) => {
            return { customerId: data.customerId, customerName  : data.customerName };
          });
          this.dealerListData.push()
          this.dealerListData.forEach(element => {
            return this.dealerListArray.push(element.customerId);
          })       
          console.log('dealerAllarray',this.dealerListArray)                                                    
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
    DealerorderSelect(item: any){
      this.dealerss.push(item.customerId);
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    DealerDeselect(item:any){
      console.log(item)
      this.dealerss.forEach((element, index) => {
        if (element == item.customerId) this.dealerss.splice(index, 1);
      });
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    DealerDeselectAll(item:any){
      this.dealerss = [];
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    DealerorderSelectAll(item:any){
      this.dealerss = this.dealerListArray;
      console.log("AllDealers",this.dealerss);
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    onSearchChange($event: any, anything?: any) {
      const { target } = $event;
      this.searchText = target.value;
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
    }
    shipmentDownload() {
      this.gridApi.exportDataAsCsv();
  
    }
    refresh() {
      this.myForm = this.fb.group({
        city: [this.selectedItems]
      });
      this.myForm1 = this.fb.group({
        geo: [this.selectedItems]
      });
      this.geogragphies = [];
      this.dealerss = [];
      this.startDateShip = '';
      this.endDateShip = '';
      this.startDateInvoice = '';
      this.endDateInvoice = '';
      this.searchText = '';
      let data = {
        DealerId:this.dealerss,
        GeographyId:this.geogragphies,
        ShipmentStartDate:this.startDateShip,
        ShipmentEndDate:this.endDateShip,
        InvoiceStartDate:this.startDateInvoice,
        InvoiceEndDate:this.endDateInvoice,
        search:this.searchText,
        currentuserId:this.loggedUserId
      }
      this.orders.getOrderReceiptList(data).subscribe((res) => {
        this.receiptDatalist = res.response;
        console.log("Response",this.receiptDatalist)
      });
      this.sharedServiceCalendar.filter('Register click')
    }
}
