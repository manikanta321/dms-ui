import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShipOrderBulkDownloadComponent } from '../ship-order-bulk-download/ship-order-bulk-download.component';
import { CustomDatePopupComponent } from '../custom-date-popup/custom-date-popup.component';

@Component({
  selector: 'app-orders-shipment',
  templateUrl: './orders-shipment.component.html',
  styleUrls: ['./orders-shipment.component.css']
})
export class OrdersShipmentComponent implements OnInit {
  myForm: any = FormGroup; 
  disabled = false;
  dropdownSettings: IDropdownSettings = {};
  dealersdrop: any = ['dealr','d']; 
  shipStatus : any = ['To ship', 'fullfilled']
  startDate = new FormControl(new Date());
  minDateToFinish = new Subject<string>();
  invoiceDate :any = ['last 30 days', 'last 60 days','last 90 days','Last 180 Days','This Month','This Quater','This Year','Last Month','Last Quater','Last Year']
  disableSelect = new FormControl(false);
  private gridApi!: GridApi;
  public rowData5=[];
  public popupParent: HTMLElement = document.body;
  instancePopup:any = null;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount:any;
  columnDefs: ColDef[] = [
    // { headerName: "User Id",
    //   field: 'employeeCode' , sort: 'desc'},
  
    {   headerName: "Shipment No.",field: 'promotionName' ,      tooltipField:"promotionName",
  },
  
    {  headerName: "Shipment D..",field: 'promotionTypesName',      tooltipField:"promotionTypesName",
  },
  
    {  headerName: "Order No.",
       field: '',      tooltipField:"",
      },
  
    {   headerName: "Order Date",
      // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
      field: 'startDate',      tooltipField:"startDate",
      type: ['nonEditableColumn']},
  
      {   headerName: "Dealer",
      // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
      field: 'endDate',type: ['nonEditableColumn'],      tooltipField:"endDate",
    },
      {  headerName: "Invoice No.",
      field: '',      tooltipField:"",
    }, 
      {  headerName: "Invoice Date",
      field: '',      tooltipField:"",
    }, 
   
  {  headerName: "Annual Target",
      field: '',      tooltipField:"",
    },
    {  headerName: "Status",
      field: '',      tooltipField:"",
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

  
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
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
  dateChange(e) {
    this.minDateToFinish.next(e.value.toString());
  }
 bulkDownload(){
  this.dialog.open(ShipOrderBulkDownloadComponent, {width:'1043px'})
  }
  selectdays(){
    this.dialog.open(CustomDatePopupComponent,{panelClass:'custmdays'})
    }
    selectedDateRange = {
      startDate: '11/11/2022',
      endDate: '11/15/2022',
    }
  
    customDatePickerEvent(eventChange){
      this.selectedDateRange = eventChange.selectedDate;
      console.log(this.selectedDateRange);
    }
}
