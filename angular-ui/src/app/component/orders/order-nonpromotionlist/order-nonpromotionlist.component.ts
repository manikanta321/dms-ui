import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-order-nonpromotionlist',
  templateUrl: './order-nonpromotionlist.component.html',
  styleUrls: ['./order-nonpromotionlist.component.css']
})
export class OrderNonpromotionlistComponent implements OnInit {

  private gridApi!: GridApi;
  promoList = true;
  myForms!:FormGroup;

  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  rowData: any;
  columnDefs:any;
  image = 'assets/img/maximize-arrow.png';

  gridOptions = {
    resizable: true,
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    rowStyle: { background: 'black' },
}


  constructor( private user: UserService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  orderPromoList(){
    this.promoList = !this.promoList;

    if(this.promoList === false){
      this.image = 'assets/img/minimize-tag.png';
    } else {
      this.image = 'assets/img/maximize-arrow.png';
    }

  }


  public rowData5 = [
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    ];
 
    public defaultColDef: ColDef = {
      // set the default column width
      width: 170,
      // make every column editable
      editable: true,
      // make every column use 'text' filter by default
      filter: 'agTextColumnFilter',
      // enable floating filters by default
      // make columns resizable
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
    // displayedColumns: string[] = ['shippingForm', 'shippingTo', 'shippingCharges'];

    headerList(){
      this.columnDefs= [
        {
          headerName: 'Product Name',field: 'productname', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',
        },
    
        { headerName: 'SKU', field: 'sku', type: ['nonEditableColumn'] },

        { headerName: 'Price', field: 'price', type: ['nonEditableColumn'] },

        { headerName: 'tax template', field: 'tax', type: ['nonEditableColumn'] },

        { headerName: 'Quantity', field: 'quantity', type: ['nonEditableColumn'] },
        
        { headerName: 'Amount', field: 'amount', type: ['nonEditableColumn'] },
       
      ];
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

    onGridReady(params: GridReadyEvent) {
      this.gridApi = params.api;
  
    }

    onCellClicked( e: CellClickedEvent): void {
      console.log('cellClicked', e);
    }

    onSearchChange($event){

    }

    onStatusDeSelect(item: any) {
    }

    onItemDeSelectOrAllStatus(item: any) {
      const data = {
        userTypes: "",
        statuss: [],
        search: "",
  
      }
      this.user.getuserDeatilsUser(data).subscribe((res) => {
        this.rowData5 = res.response;
      });
  
    }

    onItemSelectOrAllStatus(item: any) {
    
      const data = {
        userTypes: "",
        statuss: "",
        search: "",
  
      }
      this.user.getuserDeatilsUser(data).subscribe((res) => {
        this.rowData5 = res.response;
      });
     
    }

}
