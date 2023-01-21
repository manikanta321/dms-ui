import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { CustomDatePopupComponent } from '../../orders/custom-date-popup/custom-date-popup.component';


@Component({
  selector: 'app-orderlist-ship-popup',
  templateUrl: './orderlist-ship-popup.component.html',
  styleUrls: ['./orderlist-ship-popup.component.css']
})
export class OrderlistShipPopupComponent implements OnInit {
  dealerInfo = false;
  orderitem = false;
  shipmentone = false;
  shipmenttwo = false;
  orderhistory = false;
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/minimize-tag.png';
  image4 = 'assets/img/minimize-tag.png';
  image5 = 'assets/img/minimize-tag.png';
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  shipmentArray: any;
  invoicedata = new FormControl(null);
  shippingDate = new FormControl(null);
  recivedate = new FormControl(null);
  startDate = new FormControl(null);
  minDateToFinish = new Subject<string>();
  selectedStartDate: any;
  Invoicedate:any;
  shippingDateChange:any;
  reciveDateChange:any;
  invoicedateChange1:any;
  subtotal:any;
  taxElement:any;
  PackingCharge:any;
  ShippingCharge:any;
  Total:any;
  viewList:boolean=false;
  itemsArray:any=[]
  currentShipment: any = [];
  public popupParent: HTMLElement = document.body;
  public rowData5: any = [{ date: "14-Oct-22", createdBy: "Bruce Wayne", action: "Creation", subAction: "Save Draft", invoiceNo: "23AB67", comments: "Lorem ipsum dsjh sdhsujdi " }]
  public itemremoved: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  private gridApi!: GridApi;
  columnDefs: ColDef[] = [

    {
      headerName: "Date",
      field: 'date', type: ['nonEditableColumn'], pinned: 'left', maxWidth: 120
    },

    { headerName: "Created by", field: 'createdBy', type: ['nonEditableColumn'], maxWidth: 140 },

    { headerName: "Action", field: 'action', type: ['nonEditableColumn'], maxWidth: 120 },

    {
      headerName: "Sub Action",
      field: 'subAction', type: ['nonEditableColumn'], maxWidth: 140
    },

    {
      headerName: "Invoice No.",
      field: 'invoiceNo', type: ['nonEditableColumn'], maxWidth: 140
    },
    {
      headerName: "Comments",
      field: 'comments', type: ['nonEditableColumn'], maxWidth: 150
    },
    // {
    //   headerName:"",  cellRenderer: this.daysSunshineRenderer
    // }
     
    {
      headerName: "", cellRenderer: this.daysSunshineRenderer
    }

  ];
  currentshipmentname:any='';
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
    invoice:any;
  DispachComments: any='';
  userId:any;
  constructor(public dialog: MatDialog,
    public orders: OrdersApisService,
    private dialogRef: MatDialogRef<OrderlistShipPopupComponent>,

  ) { }

  ngOnInit(): void {
    this.viewOrderData();
    this.userId = localStorage.getItem("logInId");

    let data = localStorage.getItem('CustomerPoId')
    this.orders.shipOrder(data).subscribe((res) => {
      console.log(res)
      this.shipmentArray = res.response;
      
    this.shipmentArray.itemcount.forEach(element=>{
      element.itemDetails.forEach(element1=>{
let arraybj:any=[]
arraybj.push(element1)
let obj:any={
  promo:element.promocode,
    "customerPOProductId": element1.customerPOProductId,
    "stockitemid":  element1.customerPOProductId,
    "stockitemname": element1.stockitemname,
    "productSKUName": element1.productSKUName,
    "uomid": element1.uomid,
    "uomname": element1.uomname,
    "quantity": element1.quantity,
    "stock": element1.stock,
    "price": element1.price,
    "discount": element1.discount,
    "finalPrice": element1.finalPrice,
    "finalValue": element1.finalValue,
    "taxvalue": element1.taxvalue,
    "amount": element1.amount,
    "taxid": element1.taxid
}
        this.itemsArray.push(obj);
      
      })
      console.log('element1',this.itemsArray)
      
          })
      console.log('shipmentArray', this.shipmentArray);
    
this.subtotal=Number(this.shipmentArray.currentshipDetails.subTotal);
this.taxElement=Number(this.shipmentArray.currentshipDetails.taxElement);
this.PackingCharge=Number(this.shipmentArray.currentshipDetails.pakingCharge);
this.ShippingCharge=Number(this.shipmentArray.currentshipDetails.shipingcharge);
this.Total=Number(this.shipmentArray.currentshipDetails.total);



      this.invoice= this.shipmentArray.currentshipDetails.invoiceno; 
      this.currentshipmentname= this.shipmentArray.currentshipDetails.shipName
      this.shipmentArray.currentshipDetails.promodetails.forEach(element => {
let mainArray:any=[];
        element.itemDetailsship.forEach(element1 => {
          let obj: any = {
            promotionName: element.promotionName,
            promocode: element.promocode,
            customerPOProductId: element1.customerPOProductId,
            stockitemid: element1.stockitemid,
            stockitemname: element1.stockitemname,
            productSKUName: element1.productSKUName,
            uomid: element1.uomid,
            uomname: element1.uomname,
            quantity: element1.quantity,
            stock: element1.stock,
            price: element1.price,
            discount: element1.discount,
            finalValue: element1.finalValue,
            taxvalue: element1.taxvalue,
            amount: element1.amount,
            taxid: element1.taxid,
            shipedTill: element1.shipedTill,
            shipingNow: element1.shipingNow
          }

          this.currentShipment.push(obj)


        })

      })

    })
    console.log('currentShipment', this.currentShipment)
    debugger

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
  addTotal(){
    this.Total= this.subtotal + this.taxElement + this.PackingCharge + this.ShippingCharge;

  }

  shipingNow(){
    let objarray:any=[]
this.currentShipment.forEach(element=>{

  let obj:any={
    "unitprice":element.price,
    "TaxTemplateId":element.taxid,
    "shipingNow":element.shipingNow != null?element.shipingNow:0
  }
  objarray.push(obj)
}




)


let data:any={
  OrderId:this.shipmentArray.customerPOId,
  EachModel:objarray
}
this.orders.calculateTotal(data).subscribe((res)=>{

this.subtotal=res.response.subTotal;
this.taxElement=res.response.taxElement;
this.PackingCharge=res.response.packingCharges;
this.ShippingCharge=res.response.shippingCharges;

this.addTotal();


})
console.log('obj',objarray)

console.log('this.currentShipment', this.currentShipment)
  }

  invoicedateChange(e) {
    console.log(e)
    this.minDateToFinish.next(e.value.toString());

    // this.endDate = new FormControl(null);
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.invoicedateChange1 = new Date(e.value).getFullYear() + '/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
    console.log(this.Invoicedate);
  }
 shippingDatechange(e) {
    console.log(e)
    this.minDateToFinish.next(e.value.toString());

    // this.endDate = new FormControl(null);
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.shippingDateChange = new Date(e.value).getFullYear() + '/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
    console.log(this.shippingDateChange);
  }

  ReciveDateChange(e) {
    console.log(e)
    this.minDateToFinish.next(e.value.toString());

    // this.endDate = new FormControl(null);
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.reciveDateChange = new Date(e.value).getFullYear() + '/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
    console.log(this.reciveDateChange);
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
  saveShipment(item){

let filterArray:any=[]

this.currentShipment.forEach(element=>{
let filterobj:any={
  "CustomerPOProductId":element.customerPOProductId,

  "qty":element.quantity,
  
  "UnitPrice":element.price,
  
  "TaxTemplatedId":element.taxid,
  
  "total":element.amount,
  
  "shipedTill":element.shipedTill,
  
  "shipingNow":element.shipingNow,
}
filterArray.push(filterobj)

})



if(item=='save'){

  let obj:any={
    "CustomerPOId":this.shipmentArray.customerPOId,
    
    "DispachComments":this.DispachComments,
    
    "CreatedById":this.userId,
    
    "InvoiceNo":this.invoice,
    
    "InvoiceDate":this.invoicedateChange1,
    
    "shipingDate":this.shippingDateChange,
    
    "InvoiceReceivedDate":this.reciveDateChange,
    "shipcount":filterArray,
    "subtotal":this.subtotal,
    "taxelement":this.taxElement,
    "packingcharges":this.PackingCharge,
    "shipingcharges":this.ShippingCharge,
    "total": this.Total,
    "AddType":"save",
    }
    this.orders.saveShipOrder(obj).subscribe((res)=>{
      console.log(res.response)
      if(res.response.result =='Succesfully added'){
        alert('Succesfully added');
        this.dialogRef.close();
      
      }
      else{
      
      }
      })
      
}
else{

  
let obj:any={
  "CustomerPOId":this.shipmentArray.customerPOId,
  
  "DispachComments":this.DispachComments,
  
  "CreatedById":this.userId,
  
  "InvoiceNo":this.invoice,
  
  "InvoiceDate":this.invoicedateChange1,
  
  "shipingDate":this.shippingDateChange,
  
  "InvoiceReceivedDate":this.reciveDateChange,
  "shipcount":filterArray,
  "subtotal":this.subtotal,
  "taxelement":this.taxElement,
  "packingcharges":this.PackingCharge,
  "shipingcharges":this.ShippingCharge,
  "total": this.Total,
  "AddType":"draft",
  }
  this.orders.saveShipOrder(obj).subscribe((res)=>{
    console.log(res.response)
    if(res.response.result =='Succesfully added'){
      alert('Succesfully added');
      this.dialogRef.close();
    
    }
    else{
    
    }
    })
    
}





console.log('savedship',this.currentShipment)
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
  daysSunshineRenderer(params) {
    const divelement = document.createElement('div');
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    const tooltip = document.createElement('tooltip');
    imageElement.className = "new-window-arrow";
    imageElement.src = 'assets/img/new-window-array.png';
    tooltip.className = 'tooltip';
    imageElement.classList.add('custom-tooltip');
    imageElement.innerHTML = '<span class="tooltip">hhhhh</span>'
    element.appendChild(document.createTextNode(params.value));
    element.appendChild(imageElement);
    return element;
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
  }
  expandDealerInfoDiv() {
    this.dealerInfo = !this.dealerInfo;

    if (this.dealerInfo === false) {
      this.image1 = 'assets/img/maximize.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';

    }
  }
  expandOrderItemsDiv() {
    this.orderitem = !this.orderitem;

    if (this.orderitem === false) {
      this.image2 = 'assets/img/maximize.png';
    } else {
      this.image2 = 'assets/img/minimize-tag.png';
    }

  }
  expandShipmentOneDiv() {
    this.shipmentone = !this.shipmentone;

    if (this.shipmentone === false) {
      this.image3 = 'assets/img/maximize.png';
    } else {
      this.image3 = 'assets/img/minimize-tag.png';
    }

  }
  expandShipmentTwoDiv() {
    this.shipmenttwo = !this.shipmenttwo;

    if (this.shipmenttwo === false) {
      this.image4 = 'assets/img/maximize.png';
    } else {
      this.image4 = 'assets/img/minimize-tag.png';
    }

  }
  expandOrderHistoryDiv() {
    this.orderhistory = !this.orderhistory;

    if (this.orderhistory === false) {
      this.image5 = 'assets/img/maximize.png';
    } else {
      this.image5 = 'assets/img/minimize-tag.png';
    }

  }


  selectedDateRange = {
    startDate: '11/11/2022',
    endDate: '11/15/2022',
  }
  customDatePickerEvent(eventChange) {
    this.selectedDateRange = eventChange.selectedDate;
    console.log(this.selectedDateRange);
  }
  selectdays() {
    this.dialog.open(CustomDatePopupComponent, { panelClass: 'custmdays' })
  }
  removeItem() {
    this.itemremoved.splice(0);
  }

}
