import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-sales-invoice-download',
  templateUrl: './sales-invoice-download.component.html',
  styleUrls: ['./sales-invoice-download.component.css']
})
export class SalesInvoiceDownloadComponent implements OnInit {
  private gridApi!: GridApi;
  instancePopup:any = null;
  rowData5:any= [{uploadSalesBatchId:25,uploadDate:"25 Aug 22",productName:"Samsung M32 prime edition 2022 (128 gb)",productCode:"PR123456",totalItems:20,dealer:"MINH PHUONG TRADE SERVICES MEDICAL-DENTISTRY CO. LTD"}];
  paginationScrollCount: any;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  public popupParent: HTMLElement = document.body;
  constructor() { }

  ngOnInit(): void {
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
  }
  columnDefs: ColDef[] = [
    {   headerName: "BatchId",field: 'uploadSalesBatchId' ,      tooltipField:"uploadSalesBatchId",type: ['nonEditableColumn']
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
      field: 'totalItems',      tooltipField:"totalItems",
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
  onCellValueChanged(event: CellValueChangedEvent) {
    alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );

  }
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
      // this.paginationScrollCount = this.rowData5.length;
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
}
