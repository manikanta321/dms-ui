import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { AddTargetGroupsProductsComponent } from '../target-groups/add-target-groups-products/add-target-groups-products.component';

@Component({
  selector: 'app-add-target-group',
  templateUrl: './add-target-group.component.html',
  styleUrls: ['./add-target-group.component.css']
})
export class AddTargetGroupComponent implements OnInit {
  instancePopup:any = null;
  stayScrolledToEnd = true;
  paginationPageSize = 10;
  rowData5:any= [{productName:444,classification:"test",sku:"sku",productIdentifier:24, productGroup:"acd12"}];
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

  addTProducts() {
    this.dialog.open(AddTargetGroupsProductsComponent) 
   
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
      // this.paginationScrollCount = this.rowData5.length;
    }
  }
  columnDefs: ColDef[] = [
    { headerName:"",checkboxSelection:true , maxWidth:40},
    {   headerName: "Product Name",field: 'productName' ,      tooltipField:"productName",type: ['nonEditableColumn']
  },
  
    {  headerName: "Classification",field: 'classification',      tooltipField:"classification   ",type: ['nonEditableColumn']
  },     
  
    {  headerName: "SKU",
       field: 'sku', maxWidth:160,     tooltipField:"sku",type: ['nonEditableColumn']
      },
  
    {   headerName: "Product Identifier",
      field: 'productIdentifier',      tooltipField:"productIdentifier",
      type: ['nonEditableColumn']},

      {   headerName: "Product group",
      field: 'productGroup',      tooltipField:"productGroup",
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
 
}
