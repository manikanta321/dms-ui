import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import moment from 'moment';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import { SharedServiceCalendarService } from 'src/app/services/shared-service-calendar.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { SalesBulkUploadComponent } from '../../sales-bulk-upload/sales-bulk-upload.component';
import { SalesInvoiceDownloadComponent } from '../../sales-invoice-download/sales-invoice-download.component';
import { UploadSalesActionComponent } from '../../upload-sales-action/upload-sales-action.component';

@Component({
  selector: 'app-sales-uploads',
  templateUrl: './sales-uploads.component.html',
  styleUrls: ['./sales-uploads.component.css']
})
export class SalesUploadsComponent implements OnInit {
  instancePopup:any = null;
  stayScrolledToEnd = true;
  paginationPageSize = 10;
  paginationScrollCount: any;
  selectedDateRange:any;
  StartDate:any = '';
  searchText:any = '';
  salesUploadList:any = [];
  public popupParent: HTMLElement = document.body;
  private gridApi!: GridApi;
  usertype:any
  constructor(public dialog: MatDialog,
    private sharedService :SharedService, 
    private salesService:SalesServicesService,
    private sharedServiceCalendar:SharedServiceCalendarService,) { }

  ngOnInit(): void {
    this.SalesUpload();
    this.usertype = localStorage.getItem('userType')
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
  }
  // selectedDateRange = {
  //   startDate: '11/11/2022',
  //   endDate: '11/15/2022',
  // }

  customDatePickerEvent(eventChange){
    this.selectedDateRange = eventChange.selectedDate;
    this.StartDate = this.selectedDateRange.startDate
    console.log(this.selectedDateRange);
    const data = {
      InvoiceDate:this.StartDate

    }
    this.salesService.getSalesUploadList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesUploadList=res.response;

    })
  }
  SalesUpload() {
    this.StartDate = '';
    const data = {
      InvoiceDate:this.StartDate

    }
    this.salesService.getSalesUploadList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesUploadList=res.response;
      console.log("SalesUploadList",this.salesUploadList);


      
      this.salesUploadList.forEach(element=>{
      

        element.uploadedOn= this.sharedService.dateformat
        (element.uploadedOn);


      })

    })
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  // onCellValueChanged(event: CellValueChangedEvent) {
  //   alert(event.value)
  //   console.log(
  //     'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
  //   );
  // }
  openDialog(){

  }
  // onCellClicked( e): void {
  //   let cellCLickedpromotion = '1'
  //   localStorage.setItem('cellCLickedpromotion', cellCLickedpromotion)
  //   if ( e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action' ) {
  //     const cellRendererInstances = e.api.getCellRendererInstances({
  //       rowNodes: [e.node],
  //       columns: [e.column],
  //     });
  //     if (cellRendererInstances.length > 0) {
  //       const instance = cellRendererInstances[0];
  //       this.instancePopup = instance;
  //       instance.togglePopup();
  //     }
  //   }
  // }
  onCellClicked(e): void {
    let cellCLickedpromotion = '0'
    localStorage.setItem('cellCLickedpromotion', cellCLickedpromotion)

    console.log('cellClicked', e);
    let batchId = e.data.batchId;
console.log("batchId",batchId)
sessionStorage.setItem("BatchId",batchId );

    if (e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action') {
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
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
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
      this.paginationScrollCount = this.salesUploadList.length;
    }
  }
  columnDefs: ColDef[] = [
    {   headerName: "BatchId",field: 'batchId' , cellStyle: { color: '#686E74' },     tooltipField:"batchId",type: ['nonEditableColumn']
  },
  
    {  headerName: "Uploaded By",field: 'createBy',   cellStyle: { color: '#686E74' },    tooltipField:"createBy   ",type: ['nonEditableColumn']
  },     
  
    {  headerName: "Upload On",
       field: 'uploadedOn',  cellStyle: { color: '#686E74' },     tooltipField:"uploadedOn",

     

      
  cellRenderer: (data) => 
  { return this.sharedService.dateformat(data.value);
  },

       type: ['nonEditableColumn']
      },
  
    {   headerName: "Total Items",
      field: 'totalItems',  cellStyle: { color: '#686E74' },     tooltipField:"totalItems",
      type: ['nonEditableColumn','rightAligned']},
      {
        headerName: '',
        colId: 'action',
        cellRenderer: UploadSalesActionComponent,
        editable: false,
        maxWidth: 50,
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
    lockVisible : true
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
  addSales() {
     sessionStorage.setItem("batchID","0");
      sessionStorage.setItem("viewData",'');
    this.dialog.open(SalesInvoiceDownloadComponent, {width: '1289px'});
  }
  salesUpload(){
    sessionStorage.setItem("sales","salesUpload");
    sessionStorage.setItem("orderReceipt",'');
    sessionStorage.setItem("orderShipment",'');
      this.dialog.open(SalesBulkUploadComponent,{width: '1400px'});
      // this.isOpen = false;
  }
  refresh() {
    this.StartDate = '';
    this.searchText = '';
    const data = {
      InvoiceDate:this.StartDate,

    }
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;   if (searchInput) {     searchInput.value = this.searchText;   }
    this.salesService.getSalesUploadList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesUploadList=res.response;
      console.log("SalesUploadList",this.salesUploadList);

    })
    this.sharedServiceCalendar.filter('Register click')
  }
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      InvoiceDate:this.StartDate,

    }
    this.salesService.getSalesUploadList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesUploadList=res.response;
      console.log("SalesUploadList",this.salesUploadList);

    })

  }
}
