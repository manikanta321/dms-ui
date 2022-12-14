import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { CustomDatePopupComponent } from '../../orders/custom-date-popup/custom-date-popup.component';


@Component({
  selector: 'app-orderlist-ship-popup',
  templateUrl: './orderlist-ship-popup.component.html',
  styleUrls: ['./orderlist-ship-popup.component.css']
})
export class OrderlistShipPopupComponent implements OnInit {
  dealerInfo = false;  
  orderitem = false;
  shipmentone=false;
  shipmenttwo=false;
  orderhistory=false;
  viewList:boolean =false;
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/minimize-tag.png';
  image4 = 'assets/img/minimize-tag.png';
  image5 = 'assets/img/minimize-tag.png';
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  public popupParent: HTMLElement = document.body;
  public rowData5:any =[{date:"14-Oct-22",createdBy:"Bruce Wayne",action:"Creation",subAction:"Save Draft", invoiceNo:"23AB67", comments:"Lorem ipsum dsjh sdhsujdi "}]
  public itemremoved: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  private gridApi!: GridApi;
  columnDefs: ColDef[] = [

    {
      headerName: "Date",
      field: 'date', type: ['nonEditableColumn'], pinned: 'left', maxWidth:120    },

    { headerName: "Created by", field: 'createdBy', type: ['nonEditableColumn'], maxWidth:140 },

    { headerName: "Action", field: 'action', type: ['nonEditableColumn'], maxWidth:120 },

    {
      headerName: "Sub Action",
      field: 'subAction', type: ['nonEditableColumn'], maxWidth:140
    },

    {
      headerName: "Invoice No.",
      field: 'invoiceNo', type: ['nonEditableColumn'],maxWidth:140
    },
    {
      headerName: "Comments",
      field: 'comments', type: ['nonEditableColumn'], maxWidth:150
    },
    // {
    //   headerName:"",  cellRenderer: this.daysSunshineRenderer
    // }
     
  ];
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
  }
  public defaultColDef: ColDef = {
    suppressSizeToFit: true,
    width: 170,
     filter: 'agTextColumnFilter',
       flex: 1,
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
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.viewOrderData();
  }
  viewOrderData() {
    let viewData = sessionStorage.getItem("viewOrder");
    console.log("ViewOrder",viewData);
    if(viewData =="View") {
      this.viewList = true;
    }
    else {
      this.viewList =false
    }
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

  }
  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  openDialog() {
    // alert('mani')

  }
  onCellClicked(e): void {
    console.log('cellClicked', e);
     
    if ( e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action' ) {
      const cellRendererInstances = e.api.getCellRendererInstances({
        rowNodes: [e.node],
        columns: [e.column],
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        instance.togglePopup();
      }
    }
  }
  daysSunshineRenderer(params) {
    const divelement = document.createElement('div');  
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    const tooltip = document.createElement('tooltip');
    imageElement.className = "new-window-arrow";
    imageElement.src ='assets/img/new-window-array.png';
    tooltip.className = 'tooltip';
    imageElement.classList.add('custom-tooltip');
    imageElement.innerHTML = '<span class="tooltip">hhhhh</span>'
    element.appendChild(document.createTextNode(params.value));
    element.appendChild(imageElement);
    return element;
  }
  handleScroll(event) {
    var tippyPopups: NodeListOf<Element> | null | undefined = document.querySelectorAll(".tippy-box[data-theme='user-tippy']");
    
      tippyPopups.forEach(element=> {
        element.parentNode?.removeChild(element)
      })
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
  onRowSelect(event) {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }
  expandDealerInfoDiv(){
    this.dealerInfo = !this.dealerInfo;

    if(this.dealerInfo === false){
      this.image1 = 'assets/img/maximize.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandOrderItemsDiv(){
    this.orderitem = !this.orderitem;

    if(this.orderitem === false){
      this.image2 = 'assets/img/maximize.png';
    } else {
      this.image2 = 'assets/img/minimize-tag.png';
    }
    
  }
  expandShipmentOneDiv(){
    this.shipmentone = !this.shipmentone;

    if(this.shipmentone === false){
      this.image3 = 'assets/img/maximize.png';
    } else {
      this.image3 = 'assets/img/minimize-tag.png';
    }
    
  }
  expandShipmentTwoDiv(){
    this.shipmenttwo = !this.shipmenttwo;

    if(this.shipmenttwo === false){
      this.image4 = 'assets/img/maximize.png';
    } else {
      this.image4 = 'assets/img/minimize-tag.png';
    }
    
  }
  expandOrderHistoryDiv(){
    this.orderhistory = !this.orderhistory;

    if(this.orderhistory === false){
      this.image5 = 'assets/img/maximize.png';
    } else {
      this.image5 = 'assets/img/minimize-tag.png';
    }
    
  }


  selectedDateRange = {
    startDate: '11/11/2022',
    endDate: '11/15/2022',
  }
  customDatePickerEvent(eventChange){
    this.selectedDateRange = eventChange.selectedDate;
    console.log(this.selectedDateRange);
  }
  selectdays(){
    this.dialog.open(CustomDatePopupComponent,{panelClass:'custmdays'})
    }
  removeItem() {
    this.itemremoved.splice(0);
  }

}
