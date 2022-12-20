import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
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
  rowData5:any= [{uploadSalesBatchId:1234,uploadedName:"Shivam",uploadedOn:"13:12:2022",totalItems:24}];
  paginationScrollCount: any;
  public popupParent: HTMLElement = document.body;
  private gridApi!: GridApi;
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
  }
  selectedDateRange = {
    startDate: '11/11/2022',
    endDate: '11/15/2022',
  }

  customDatePickerEvent(eventChange){
    this.selectedDateRange = eventChange.selectedDate;
    console.log(this.selectedDateRange);
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
      //const api =  this.rowData5;
      this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
      // this.paginationScrollCount = this.rowData5.length;
    }
  }
  columnDefs: ColDef[] = [
    {   headerName: "BatchId",field: 'uploadSalesBatchId' ,      tooltipField:"uploadSalesBatchId",type: ['nonEditableColumn']
  },
  
    {  headerName: "Uploaded By",field: 'uploadedName',      tooltipField:"uploadedName   ",type: ['nonEditableColumn']
  },     
  
    {  headerName: "Upload On",
       field: 'uploadedOn',      tooltipField:"uploadedOn",type: ['nonEditableColumn']
      },
  
    {   headerName: "Total Items",
      field: 'totalItems',      tooltipField:"totalItems",
      type: ['nonEditableColumn']},
      {
        headerName: '',
        colId: 'action',
        cellRenderer: UploadSalesActionComponent,
        editable: false,
        maxWidth: 50
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
  addSales() {
    this.dialog.open(SalesInvoiceDownloadComponent, {width: '1289px'});
  }
}
