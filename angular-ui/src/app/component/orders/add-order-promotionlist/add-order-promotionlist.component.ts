import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-add-order-promotionlist',
  templateUrl: './add-order-promotionlist.component.html',
  styleUrls: ['./add-order-promotionlist.component.css']
})
export class AddOrderPromotionlistComponent implements OnInit {
  // taxtemplete :any =['hj','hj'];
  buyGroup : any = [{proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'},
  {proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'},
  {proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'}]
  private gridApi!: GridApi;
  promoList = true;
priceD = true;
buysets = true;
  rowData: any;
  columnDefs:any;
  image = 'assets/img/maximize-arrow.png';

  gridOptions = {
    resizable: true,
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    rowStyle: { background: 'black' },
}
  buygg: any;
  selectedrowList: any= [];
  ischecked : boolean= false;

  constructor( private user: UserService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.buygg =localStorage.getItem('buygroupromo');
    this.headerList();
  }

  orderPromoList(){
    this.promoList = !this.promoList;

    if(this.promoList === false){
      this.image = 'assets/img/minimize-tag.png';
    } else {
      this.image = 'assets/img/maximize-arrow.png';
    }
  }
  priceDiscount(){
    this.priceD = !this.priceD;

    if(this.priceD === false){
      this.image = 'assets/img/minimize-tag.png';
    } else {
      this.image = 'assets/img/maximize-arrow.png';
    }
  }
  buysetsGroups(){
    this.buysets = !this.buysets;

    if(this.buysets === false){
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
          headerName: 'Product Name',field: 'productname', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',checkboxSelection: true,
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
      
      // this.userId=e.data.userId;
      // this.employeeName=e.data.employeeName
      // console.log('userID',this.userId)
      // localStorage.setItem('userID',this.userId )
      // localStorage.setItem('employeeName',this.employeeName )
    }

    onSearchChange($event){

    }
    addPromoItems(){
      console.log('item',this.selectedrowList);
      // var grid = document.getElementById("Table1");
    
    }
    // selectrows(proItem:any){
    //   this.selectedrowList = proItem;
    //   console.log('rows')
    // }
    // clickedList(index){
    //   if(this.selectedrowList === index.proItem){
    //     this.selectedrowList = index.proItem;
    //     return true;
    //   }
    //   else
    //   {
    //     return false
    //   }
    // }
    RowSelected(item:any):void{
      // for (var i = 0; i < this.buyGroup.length; i++) {
      //   this.buyGroup[i].selected = this.selectedrowList;
      // }
      console.log(item);
     if(item.checked ==true){
      this.selectedrowList = item;
      console.log('item', this.selectedrowList);
       // var index = this.selectedrowList.map(function(id){
      //   return id.item;
      // }).indexOf(item.id);
      // if(index == -1){
      //   this.selectedrowList.push(item)
      // }
     }
     else{
      this.selectedrowList == 0
     }
    }
    
}
