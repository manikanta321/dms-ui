import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { PromotionSharedServicesService } from 'src/app/services/promotion-shared-services.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-view-promotion-popup',
  templateUrl: './view-promotion-popup.component.html',
  styleUrls: ['./view-promotion-popup.component.css']
})
export class ViewPromotionPopupComponent implements OnInit {
  private gridApi!: GridApi;
  public popupParent: HTMLElement = document.body;
  public rowData5 = ['D120SS0552', 'MINH PHUONG TRADE SERVICES MEDICAL-DENTISTRY CO. LTD', 'India, China, Afghanistan, Albania, Algeria'];
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  EntityInstanceId: any = [];
  buyab: boolean = false;
  volumedc: boolean = false;
  pricedc: boolean = false
  buysets: boolean = false;
  productPromotionsId: any;
 
  columnDefs: ColDef[] = [

    {
      headerName: "Code",
      field: 'code', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left', checkboxSelection: true
    },
    { headerName: "Dealer Name", field: 'dealerName', type: ['nonEditableColumn'] },
    { headerName: "", field: '', type: ['nonEditableColumn'] },

    {
      headerName: "Geography", field: 'geography', type: ['nonEditableColumn'],
      // cellStyle: { color: '#017EFA' },
    },

       

  ];
  public defaultColDef: ColDef = {

    suppressSizeToFit: true,
    width: 170,
    filter: 'agTextColumnFilter',
    flex: 1,
    minWidth: 100,
    resizable: true,

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
  constructor(public promotionTypes: PromotionService) { }

  ngOnInit(): void {
    let data = localStorage.getItem('promoclickId')
    this.promotionTypes.getPromotionById(data).subscribe((res) => {
    if (res.response.promotionTypesName == 'Buy (A+B..) get (X+Y..)') {
      this.productPromotionsId = res.response.productPromotionsId
           this.buyab = true;
            this.volumedc = false;
            this.buysets = false;
            this.pricedc = false;
    }
    if (res.response.promotionTypesId == 2){
      this.buyab = false;
      this.volumedc = false;
      this.buysets = true;
      this.pricedc = false;
    }

    if (res.response.promotionTypesName == 'Volume Discount') {
      this.buyab = false;
      this.volumedc = true;
      this.buysets = false;
      this.pricedc = false;
    }

    if (res.response.promotionTypesName == 'Price Discount') {
      this.buyab = false;
          this.volumedc = false;
          this.buysets = false;
          this.pricedc = true;
    }


  });

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
    // params.api.paginationGoToPage(4);
    params.api.forEachNode((node) =>
      node.setSelected(!!node.data && node.data.isProductSelected)
    );
  }
  openDialog() {
    // alert('mani')

  }
  onCellClicked(e): void {
    console.log('cellClicked', e);
       if (e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action') {
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
  handleScroll(event) {
    var tippyPopups: NodeListOf<Element> | null | undefined = document.querySelectorAll(".tippy-box[data-theme='user-tippy']");

    tippyPopups.forEach(element => {
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
    let customerId = selectedRows.map(x => x.customerId);
    this.EntityInstanceId = customerId
    //  const result = selectedRows.map((data : {customerId:any}) =>{
    //   return {custmId: data.customerId}
    //  })
    //  console.log('jj',result)
  }





}
