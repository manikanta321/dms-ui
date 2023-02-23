import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { SalesServicesService } from 'src/app/services/sales-services.service';

@Component({
  selector: 'app-sales-invoice-download',
  templateUrl: './sales-invoice-download.component.html',
  styleUrls: ['./sales-invoice-download.component.css']
})
export class SalesInvoiceDownloadComponent implements OnInit {
  private gridApi!: GridApi;
  instancePopup:any = null;
  paginationScrollCount: any;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  batchId:any;
  viewData:any;
  salesUploadList:any = [];
  viewUploadList:any = [];
  public popupParent: HTMLElement = document.body;
  constructor(private salesService:SalesServicesService) { }

  ngOnInit(): void {
    this.SalesInvoiceList();
    this.batchId = (sessionStorage.getItem("batchID"));
    this.viewData = sessionStorage.getItem("viewData");
    this.ViewInvoiceList();
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
  }
  columnDefs: ColDef[] = [
    {   headerName: "BatchId",field: 'batchId' ,      tooltipField:"batchId",type: ['nonEditableColumn']
  },
  
    {  headerName: "Upload Date",field: 'uploadDate',      tooltipField:"uploadDate   ",type: ['nonEditableColumn']
  },     
  
    {  headerName: "Product Name",
       field: 'productName',      tooltipField:"productName",type: ['nonEditableColumn']
      },
      {  headerName: "Product Code",
      field: 'productCode',      tooltipField:"productCode",type: ['nonEditableColumn']
     },
  
    {   headerName: "Total Items",
      field: 'saleQty',      tooltipField:"saleQty",
      type: ['nonEditableColumn']},
      {   headerName: "Dealer",
      field: 'dealer',      tooltipField:"dealer",
      type: ['nonEditableColumn']},
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
  // onCellValueChanged(event: CellValueChangedEvent) {
  //   alert(event.value)
  //   console.log(
  //     'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
  //   );

  // }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  openDialog(){

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
console.log("BatchId",e.data.batchId)
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
  SalesInvoiceList() {
    this.batchId = 0;
    const data = {
      BatchId:this.batchId

    }
    this.salesService.getSalesBulkUploadList(data).subscribe((res)=>{
      console.log(res.response)
      this.salesUploadList=res.response;
      console.log("SalesInvoiceList",this.salesUploadList);

    })
  }
  ViewInvoiceList() {
    const data = {
      BatchId:this.batchId

    }
    this.salesService.getSalesBulkUploadList(data).subscribe((res)=>{
      console.log(res.response)
      this.viewUploadList=res.response;
      console.log("SalesInvoiceList",this.salesUploadList);

    })
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
    this.gridApi.exportDataAsCsv({ fileName: 'salesInvoiceUploads_' + this.convertedDateFormat() });
  }
}
