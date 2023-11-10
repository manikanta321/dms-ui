import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  CellValueChangedEvent,
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { Subject } from 'rxjs';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { OtherMasterService } from 'src/app/services/other-master.service';
import { SharedServicesShipmentService } from 'src/app/services/shared-services-shipment.service';
import { ShipOrderSuccessPopupComponent } from 'src/app/ship-order-success-popup/ship-order-success-popup.component';
import { CustomDatePopupComponent } from '../orders/custom-date-popup/custom-date-popup.component';
import { NgChanges } from '@generic-ui/ngx-grid/feature/common/src/cdk/component/lib';
import { AddorderpromotionsComponent } from '../orders/addorderpromotions/addorderpromotions.component';

@Component({
  selector: 'app-orders-receive-shipment',
  templateUrl: './orders-receive-shipment.component.html',
  styleUrls: ['./orders-receive-shipment.component.css'],
})
export class OrdersReceiveShipmentComponent implements OnInit ,OnChanges{
 
  dealerInfo = false;
  orderitem = false;
  shipmentone = false;
  shipmenttwo = false;
  orderhistory = false;
  ReceiptComments: any;
  image1 = 'assets/img/expandarrows.svg';
  image2 = 'assets/img/expandarrows.svg';
  image3 = 'assets/img/expandarrows.svg';
  image4 = 'assets/img/expandarrows.svg';
  image5 = 'assets/img/expandarrows.svg';
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  shipmentArray: any = {};
  invoicedata = new FormControl(null);
  shippingDate = new FormControl(null);
  recivedate = new FormControl(null);
  startDate = new FormControl(null);
  minDateToFinish = new Subject<string>();
  minDate = new Date();
  selectedStartDate: any;
  Invoicedate: any;
  shippingDateChange: any;
  reciveDateChange: any;
  invoicedateChange1: any;
  subtotal: any;
  taxElement: any;
  PackingCharge: any;
  boxalert: boolean = false;
  ShippingCharge: any;
  Total: any;
  viewList: boolean = false;
  itemsArray: any = [];
  currentShipArray: any = [];
  currentShipment: any = [];
  ViewOrReceive: boolean = false;
  LostOrDamage: boolean = false;
  orderNUmber: any = '';
  headerName: any;
  status:string | null | undefined;
  checkstatus: boolean | undefined;
  public popupParent: HTMLElement = document.body;
  
  
  public rowData5: any = [
    {
      date: '14-Oct-22',
      createdBy: 'Bruce Wayne',
      action: 'Creation',
      subAction: 'Save Draft',
      invoiceNo: '23AB67',
      comments: 'Lorem ipsum dsjh sdhsujdi ',
    },
  ];
  public itemremoved: any[] = [
    {
      sValue: '',
      eValue: '',
      pValue: '',
    },
  ];
  private gridApi!: GridApi;
  columnDefs: ColDef[] = [
    {
      headerName: 'Date',
      field: 'date',
      type: ['nonEditableColumn'],
      pinned: 'left',
      maxWidth: 120,
    },

    {
      headerName: 'Created by',
      field: 'createdBy',
      type: ['nonEditableColumn'],
      maxWidth: 140,
    },

    {
      headerName: 'Action',
      field: 'action',
      type: ['nonEditableColumn'],
      maxWidth: 120,
    },

    {
      headerName: 'Sub Action',
      field: 'subAction',
      type: ['nonEditableColumn'],
      maxWidth: 140,
    },

    {
      headerName: 'Invoice No.',
      field: 'invoiceNo',
      type: ['nonEditableColumn'],
      maxWidth: 140,
    },
    {
      headerName: 'Comments',
      field: 'comments',
      type: ['nonEditableColumn'],
      maxWidth: 150,
    },
    // {
    //   headerName:"",  cellRenderer: this.daysSunshineRenderer
    // }

    {
      headerName: '',
      cellRenderer: this.daysSunshineRenderer,
    },
  ];
  InvoiceId: any;
  currentshipmentname: any = '';
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
  };
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
  invoice: any;
  DispachComments: any = '';
  userId: any;
  constructor(
    public dialog: MatDialog,
    public orders: OrdersApisService,
    private otherMasterService: OtherMasterService,
    private dialogRef: MatDialogRef<OrdersReceiveShipmentComponent>,
    private sharedserviceForshipment: SharedServicesShipmentService
  ) {}
  userType: any;
  rowVisible: boolean[] = [];
  allExpanded = true; 
  actineLabel: any; 
   updateOrSave: boolean = false
   public promoVisibility: { [promo: string]: boolean } = {};
   public shipmentVisibility: { [shipName: string]: boolean } = {};
  ngOnInit(): void { 
    this.userId = localStorage.getItem('logInId');
    this.userType = localStorage.getItem('userType');
    let item = localStorage.getItem("ViewOrReceive");
    if (item == 'Receive') {
      this.ViewOrReceive = true;
      this.headerName = 'Receive Shipment';
    } else {
      this.orderNUmber = localStorage.getItem('OrderNumberToShow');
      this.ViewOrReceive = false;
      this.headerName = 'View: Order No.';
    }
    this.itemsArray.forEach((data) => {
      this.promoVisibility[data.promo] = true;
    });
    this.currentShipArray.forEach((data) => {
      this.shipmentVisibility[data.shipName] = true;
    });
    let identifier = localStorage.getItem('orderOrShipmentOrRecipt');
    if (identifier == 'order') {
      // alert('order');

      let data = localStorage.getItem('customerPOIdForShipment');
      this.InvoiceId = data;
      let obj = {
        orderId: Number(data),
        CurrentUserId: this.userId,
      };
      this.orders.reciveshipmentfororder(obj).subscribe((res) => {
        console.log(res);
        this.shipmentArray = res.response;
        this.shipmentArray.itemcount.forEach((element) => {
          element.itemDetails.forEach((element1) => {
            let arraybj: any = [];
            arraybj.push(element1);
            let obj: any = {
              promo: element.promocode,
              promoName:element.promotionTypesNmae,
              customerPOProductId: element1.customerPOProductId,
              stockitemid: element1.customerPOProductId,
              stockitemname: element1.stockitemname,
              productSKUName: element1.productSKUName,
              uomid: element1.uomid,
              uomname: element1.uomname,
              quantity: element1.quantity,
              stock: element1.stock,
              price: element1.price,
              discount: element1.discount,
              finalPrice: element1.finalPrice,
              finalValue: element1.finalValue,
              taxvalue: element1.taxvalue,
              amount: element1.amount,
              taxid: element1.taxid,
              isFreeItem:element1.isFreeItem,
            };
            this.itemsArray.push(obj);
          });
          console.log('element1', this.itemsArray);
        });
        console.log('shipmentArray', this.shipmentArray);

        // this.subtotal=Number(this.shipmentArray.currentshipDetails.subTotal);
        // this.taxElement=Number(this.shipmentArray.currentshipDetails.taxElement);
        // this.PackingCharge=Number(this.shipmentArray.currentshipDetails.pakingCharge);
        // this.ShippingCharge=Number(this.shipmentArray.currentshipDetails.shipingcharge);
        // this.Total=Number(this.shipmentArray.currentshipDetails.total);

        this.shipmentArray.previousshipRecieveDetails.forEach((element) => {
          let internalArray: any = [];

          element.promodetails.forEach((element1) => {
            element1.itemDetailsshipReceive.forEach((element2) => {
              let obj = {
                promocode: element1.promocode,
                promoName:element1.promotionTypesNmae,
                InvoiceCPOProductId: element2.invoiceCPOProductId,
                balanceQty:element2.balanceQty,
                ReceivedQty: element2.receivedQty,
                LostDamaged: element2.lostDamaged,
                stockitemid: element2.stockitemid,
                stockitemname: element2.stockitemname,
                promotioncode: element2.promotioncode,
                productSKUName: element2.productSKUName,
                uomid: element2.uomid,
                uomname: element2.uomname,
                quantity: element2.quantity,
                stock: element2.stock,
                price: element2.price,
                discount: element2.discount,
                finalValue: element2.finalValue,
                taxvalue: element2.taxvalue,
                amount: element2.amount,
                taxid: element2.taxid,
                shipedTill: element2.shipedTill,
                shipedQty: element2.shipedQty,
                isFreeItem:element2.isFreeItem,
              };
              internalArray.push(obj);
            });
          });
          let obj2: any = {
            shipName: element.shipName,
            id: element.id,
            invoiceno: element.invoiceno,
            invoiceDate:
              new Date(element.invoiceDate).getFullYear() +
              '/' +
              (new Date(element.invoiceDate).getMonth() + 1) +
              '/' +
              new Date(element.invoiceDate).getDate(),
            invoiceReceivedDate:
              element.invoiceReceivedDate == null
                ? ''
                : new Date(element.invoiceReceivedDate).getFullYear() +
                  '/' +
                  (new Date(element.invoiceReceivedDate).getMonth() + 1) +
                  '/' +
                  new Date(element.invoiceReceivedDate).getDate(),
            shipmentDate:
              new Date(element.shipmentDate).getFullYear() +
              '/' +
              (new Date(element.shipmentDate).getMonth() + 1) +
              '/' +
              new Date(element.shipmentDate).getDate(),
            shipmentNumber: element.shipmentNumber,
            subTotal: element.subTotal,
            taxElement: element.taxElement,
            pakingCharge: element.pakingCharge,
            shipingcharge: element.shipingcharge,
            total: element.total,
            invoiceComments: element.invoiceComments,
            currentReceiveshipment: element.currentReceiveshipment,
            arrayIside: internalArray,
          };
          // obj2.invoiceDate.setValue(obj2.invoiceDate);
          // obj2.invoiceReceivedDate.setValue(obj2.invoiceReceivedDate);
          // obj2.shipmentDate.setValue(obj2.shipmentDate);

          this.currentShipArray.push(obj2);
        });

        console.log('currentShipArray', this.currentShipArray);
      });
    } else if (identifier == 'shipment') {
      // alert('shipment');
      let data = localStorage.getItem('customerPOIdForShipment');
      this.InvoiceId = data;
      let obj = {
        InvoiceId: data,
        CurrentUserId: this.userId,
      };

      this.orders.reciveshipment(obj).subscribe((res) => {
        console.log(res);
        this.shipmentArray = res.response;

        this.shipmentArray.itemcount.forEach((element) => {
          element.itemDetails.forEach((element1) => {
            let arraybj: any = [];
            arraybj.push(element1);
            let obj: any = {
              promo: element.promocode,
              customerPOProductId: element1.customerPOProductId,
              stockitemid: element1.customerPOProductId,
              stockitemname: element1.stockitemname,
              productSKUName: element1.productSKUName,
              uomid: element1.uomid,
              uomname: element1.uomname,
              quantity: element1.quantity,
              stock: element1.stock,
              price: element1.price,
              discount: element1.discount,
              finalPrice: element1.finalPrice,
              finalValue: element1.finalValue,
              taxvalue: element1.taxvalue,
              amount: element1.amount,
              taxid: element1.taxid,
              isFreeItem:element1.isFreeItem,
            };
            this.itemsArray.push(obj);
          });
          console.log('element1', this.itemsArray);
        });
        console.log('shipmentArray', this.shipmentArray);

        // this.subtotal=Number(this.shipmentArray.currentshipDetails.subTotal);
        // this.taxElement=Number(this.shipmentArray.currentshipDetails.taxElement);
        // this.PackingCharge=Number(this.shipmentArray.currentshipDetails.pakingCharge);
        // this.ShippingCharge=Number(this.shipmentArray.currentshipDetails.shipingcharge);
        // this.Total=Number(this.shipmentArray.currentshipDetails.total);

        this.shipmentArray.previousshipRecieveDetails.forEach((element) => {
          let internalArray: any = [];

          element.promodetails.forEach((element1) => {
            element1.itemDetailsshipReceive.forEach((element2) => {
              let obj = {
                promocode: element1.promocode,
                promoName:element1.promotionTypesNmae,
                InvoiceCPOProductId: element2.invoiceCPOProductId,
                balanceQty:element2.balanceQty,
                ReceivedQty: element2.receivedQty,
                LostDamaged: element2.lostDamaged,
                stockitemid: element2.stockitemid,
                stockitemname: element2.stockitemname,
                promotioncode: element2.promotioncode,
                productSKUName: element2.productSKUName,
                uomid: element2.uomid,
                uomname: element2.uomname,
                quantity: element2.quantity,
                stock: element2.stock,
                price: element2.price,
                discount: element2.discount,
                finalValue: element2.finalValue,
                taxvalue: element2.taxvalue,
                amount: element2.amount,
                taxid: element2.taxid,
                shipedTill: element2.shipedTill,
                shipedQty: element2.shipedQty,
                isFreeItem:element2.isFreeItem,
              };
              internalArray.push(obj);
            });
          });
          let obj2: any = {
            shipName: element.shipName,
            id: element.id,
            invoiceno: element.invoiceno,
            invoiceDate:
              new Date(element.invoiceDate).getFullYear() +
              '/' +
              (new Date(element.invoiceDate).getMonth() + 1) +
              '/' +
              new Date(element.invoiceDate).getDate(),
            invoiceReceivedDate:
              element.invoiceReceivedDate == null
                ? ''
                : new Date(element.invoiceReceivedDate).getFullYear() +
                  '/' +
                  (new Date(element.invoiceReceivedDate).getMonth() + 1) +
                  '/' +
                  new Date(element.invoiceReceivedDate).getDate(),
            shipmentDate:
              new Date(element.shipmentDate).getFullYear() +
              '/' +
              (new Date(element.shipmentDate).getMonth() + 1) +
              '/' +
              new Date(element.shipmentDate).getDate(),
            shipmentNumber: element.shipmentNumber,
            subTotal: element.subTotal,
            taxElement: element.taxElement,
            pakingCharge: element.pakingCharge,
            shipingcharge: element.shipingcharge,
            total: element.total,
            invoiceComments: element.invoiceComments,
            currentReceiveshipment: element.currentReceiveshipment,
            arrayIside: internalArray,
          };
          // obj2.invoiceDate.setValue(obj2.invoiceDate);
          // obj2.invoiceReceivedDate.setValue(obj2.invoiceReceivedDate);
          // obj2.shipmentDate.setValue(obj2.shipmentDate);

          this.currentShipArray.push(obj2);
        });

        console.log('currentShipArray', this.currentShipArray);
      });
    } else if (identifier == 'receipts') {
      // alert('receipts');

      let data = localStorage.getItem('customerPOIdForShipment');
      this.InvoiceId = data;
      let obj = {
        orderId: Number(data),
        CurrentUserId: this.userId,
      };

      this.orders.reciveshipmentfororder(obj).subscribe((res) => {
        console.log(res);
        this.shipmentArray = res.response;

        this.shipmentArray.itemcount.forEach((element) => {
          element.itemDetails.forEach((element1) => {
            let arraybj: any = [];
            arraybj.push(element1);
            let obj: any = {
              promo: element.promocode,
              customerPOProductId: element1.customerPOProductId,
              stockitemid: element1.customerPOProductId,
              stockitemname: element1.stockitemname,
              productSKUName: element1.productSKUName,
              uomid: element1.uomid,
              uomname: element1.uomname,
              quantity: element1.quantity,
              stock: element1.stock,
              price: element1.price,
              discount: element1.discount,
              finalPrice: element1.finalPrice,
              finalValue: element1.finalValue,
              taxvalue: element1.taxvalue,
              amount: element1.amount,
              taxid: element1.taxid,
              isFreeItem:element1.isFreeItem,
            };
            this.itemsArray.push(obj);
          });
          console.log('element1', this.itemsArray);
        });
        console.log('shipmentArray', this.shipmentArray);

        // this.subtotal=Number(this.shipmentArray.currentshipDetails.subTotal);
        // this.taxElement=Number(this.shipmentArray.currentshipDetails.taxElement);
        // this.PackingCharge=Number(this.shipmentArray.currentshipDetails.pakingCharge);
        // this.ShippingCharge=Number(this.shipmentArray.currentshipDetails.shipingcharge);
        // this.Total=Number(this.shipmentArray.currentshipDetails.total);

        this.shipmentArray.previousshipRecieveDetails.forEach((element) => {
          let internalArray: any = [];

          element.promodetails.forEach((element1) => {
            element1.itemDetailsshipReceive.forEach((element2) => {
              let obj = {
                promocode: element1.promocode,
                promoName:element1.promotionTypesNmae,
                InvoiceCPOProductId: element2.invoiceCPOProductId,
                balanceQty: element2.balanceQty,
                ReceivedQty: element2.receivedQty,
                LostDamaged: element2.lostDamaged,
                stockitemid: element2.stockitemid,
                stockitemname: element2.stockitemname,
                promotioncode: element2.promotioncode,
                productSKUName: element2.productSKUName,
                uomid: element2.uomid,
                uomname: element2.uomname,
                quantity: element2.quantity,
                stock: element2.stock,
                price: element2.price,
                discount: element2.discount,
                finalValue: element2.finalValue,
                taxvalue: element2.taxvalue,
                amount: element2.amount,
                taxid: element2.taxid,
                shipedTill: element2.shipedTill,
                shipedQty: element2.shipedQty,
                isFreeItem:element2.isFreeItem,
              };
              internalArray.push(obj);
            });
          });
          let obj2: any = {
            shipName: element.shipName,
            id: element.id,
            invoiceno: element.invoiceno,
            invoiceDate:
              new Date(element.invoiceDate).getFullYear() +
              '/' +
              (new Date(element.invoiceDate).getMonth() + 1) +
              '/' +
              new Date(element.invoiceDate).getDate(),
            invoiceReceivedDate:
              element.invoiceReceivedDate == null
                ? ''
                : new Date(element.invoiceReceivedDate).getFullYear() +
                  '/' +
                  (new Date(element.invoiceReceivedDate).getMonth() + 1) +
                  '/' +
                  new Date(element.invoiceReceivedDate).getDate(),
            shipmentDate:
              new Date(element.shipmentDate).getFullYear() +
              '/' +
              (new Date(element.shipmentDate).getMonth() + 1) +
              '/' +
              new Date(element.shipmentDate).getDate(),
            shipmentNumber: element.shipmentNumber,
            subTotal: element.subTotal,
            taxElement: element.taxElement,
            pakingCharge: element.pakingCharge,
            shipingcharge: element.shipingcharge,
            total: element.total,
            invoiceComments: element.invoiceComments,
            currentReceiveshipment: element.currentReceiveshipment,
            arrayIside: internalArray,
          };
          // obj2.invoiceDate.setValue(obj2.invoiceDate);
          // obj2.invoiceReceivedDate.setValue(obj2.invoiceReceivedDate);
          // obj2.shipmentDate.setValue(obj2.shipmentDate);

          this.currentShipArray.push(obj2);
        });

        console.log('currentShipArray', this.currentShipArray);
      });
  
    }
  // Based on status
    this.status =  sessionStorage.getItem('OrderStatus');
    console.log("staus", this.status )
    if (this.status === 'Draft' || this.status === 'Processed' || this.status === 'Ordered'|| this.status==='Confirmed') {
      this.checkstatus = true;
    }
    else {
     this.checkstatus = false;
    }
    this.viewOrderData();
  }
//   expandedRows: { [key: number]: boolean } = {};
//   toggleRow(index: number): void {
//     this.expandedRows[index] = !this.expandedRows[index];
// }

expandedPromocode: string = '';

    toggleRow(promocode: string): void {
        if (this.expandedPromocode === promocode) {
            this.expandedPromocode = ''; // Close the currently open rows
        } else {
            this.expandedPromocode = promocode; // Open the rows for the selected promocode
        }
    }
  ngOnChanges(): void {
    this.status = this.shipmentArray.status;
    console.log("staus", this.status )
    if (this.status === 'Draft' || this.status === 'Processed' || this.status === 'Ordered') {
      this.checkstatus = true;
    }
    else {
     this.checkstatus = false;
    }
  }
  
  toggleRowVisibility(promo: number) {
    this.promoVisibility[promo] = !this.promoVisibility[promo];
  }
  
  viewOrderData() {
    let viewData = sessionStorage.getItem('viewOrder');

    console.log('ViewOrder', viewData);

    if (viewData == 'View') {
      this.viewList = true;
    } else {
      this.viewList = false;
    }
  }
  addTotal() {
    this.Total =
      this.subtotal +
      this.taxElement +
      this.PackingCharge +
      this.ShippingCharge;
  }
  convertDateFormat(value) {
    return new Date(value);
  }

  isShippedEntryQtyValid = true;

  shipingNow() {
    // let objarray: any = []
    this.isShippedEntryQtyValid = true;
    this.currentShipArray.forEach((element) => {
      //   {
      //     "promocode": "P1",
      //     "InvoiceCPOProductId": 180095,
      //     "ReceivedQty": 3,
      //     "LostDamaged": 0,
      //     "stockitemid": 1683,
      //     "stockitemname": "blue roses",
      //     "promotioncode": null,
      //     "uomid": 1566,
      //     "uomname": "Box",
      //     "quantity": 20,
      //     "stock": 0,
      //     "price": 100,
      //     "discount": 0,
      //     "finalValue": 2000,
      //     "taxvalue": 80,
      //     "amount": 2080,
      //     "taxid": 8200,
      //     "shipedTill": 0,
      //     "shipedQty": 4
      // }

      element.arrayIside.forEach((item) => {
        item.LostDamaged = item.shipedQty - item.ReceivedQty;
        if (item.shipedQty < item.ReceivedQty)
          this.isShippedEntryQtyValid = false;
      });

      // let obj: any = {
      //   "unitprice": element.price,
      //   "TaxTemplateId": element.taxid,
      //   "shipingNow": element.shipingNow != null ? element.shipingNow : 0
      // }
      // objarray.push(obj)
    });

    // let data: any = {
    //   OrderId: this.shipmentArray.customerPOId,
    //   EachModel: objarray
    // }
    // this.orders.calculateTotal(data).subscribe((res) => {

    //   this.subtotal = res.response.subTotal;
    //   this.taxElement = res.response.taxElement;
    //   this.PackingCharge = res.response.packingCharges;
    //   this.ShippingCharge = res.response.shippingCharges;

    //   this.addTotal();

    // })
    // console.log('obj', objarray)

    // console.log('this.currentShipment', this.currentShipment)
  }

  invoicedateChange(e) {
    console.log(e);
    this.minDateToFinish.next(e.value.toString());

    // this.endDate = new FormControl(null);
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.invoicedateChange1 =
      new Date(e.value).getFullYear() +
      '/' +
      (new Date(e.value).getMonth() + 1) +
      '/' +
      new Date(e.value).getDate();
    console.log(this.Invoicedate);
  }
  shippingDatechange(e) {
    console.log(e);
    this.minDateToFinish.next(e.value.toString());

    // this.endDate = new FormControl(null);
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.shippingDateChange =
      new Date(e.value).getFullYear() +
      '/' +
      (new Date(e.value).getMonth() + 1) +
      '/' +
      new Date(e.value).getDate();
    console.log(this.shippingDateChange);
  }

  ReciveDateChange(e) {
    this.reciveDateChange = null;
    console.log(e);
    this.minDateToFinish.next(e.value.toString());

    // this.endDate = new FormControl(null);
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.reciveDateChange =
      new Date(e.value).getFullYear() +
      '/' +
      (new Date(e.value).getMonth() + 1) +
      '/' +
      new Date(e.value).getDate();
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
  checkSaveValid() {
    if (!this.reciveDateChange) {
      window.alert('Please Select receive date');
      return false;
    }
    if (!this.isShippedEntryQtyValid) {
      window.alert('Please enter valid recieved qty');
      return false;
    }

    return true;
  }
  saveShipment(item) {
    localStorage.setItem('AddShipment', 'edit');
    let Receiveship: any = [];

    this.currentShipArray.forEach((element) => {
      if (element.currentReceiveshipment == true) {
        element.arrayIside.forEach((element1) => {
          let obj: any = {
            InvoiceCPOProductId: element1.InvoiceCPOProductId,
            ReceivedQty: element1.ReceivedQty,
            LostDamaged: element1.LostDamaged,
          };
          Receiveship.push(obj);
        });
      }
    });

    if (item == 'save') {
      let obj: any = {
        Id: Number(this.InvoiceId),
        InvoiceReceivedDate: this.reciveDateChange,
        ReceiptComments: this.ReceiptComments,
        AddType: 'save',
        CreatedById: this.userId,
        Receiveship: Receiveship,
      };
      this.orders.saveReciveShipment(obj).subscribe((res) => {
        console.log(res.response);
        if (res.response.result == 'Succesfully Receiveship order added') {
          this.sharedserviceForshipment.filter('Register click');

          // alert('Succesfully added');
          this.dialog.open(ShipOrderSuccessPopupComponent, {
            panelClass: 'activeSuccessPop',
          });
          this.dialogRef.close();
        }
        if (this.reciveDateChange == null) {
          // alert('Please enter Received Date');
        }
      });
      console.log('objshipment', obj);
    } else {
      let obj: any = {
        Id: Number(this.InvoiceId),
        InvoiceReceivedDate: this.reciveDateChange,
        ReceiptComments: this.ReceiptComments,
        AddType: 'complete',
        CreatedById: this.userId,
        Receiveship: Receiveship,
      };
      this.orders.saveReciveShipment(obj).subscribe((res) => {
        console.log(res.response);
        if (res.response.result == 'Succesfully Receiveship order added') {
          // alert('Succesfully added');
          this.otherMasterService.filter('Register click');
          this.dialog.open(ShipOrderSuccessPopupComponent, {
            panelClass: 'activeSuccessPop',
          });
          this.dialogRef.close();
        } else {
          // alert(res.response.result);
          this.boxalert = true;
        }
      });
    }

    // let filterArray: any = []

    // this.currentShipment.forEach(element => {
    //   let filterobj: any = {
    //     "CustomerPOProductId": element.customerPOProductId,

    //     "qty": element.quantity,

    //     "UnitPrice": element.price,

    //     "TaxTemplatedId": element.taxid,

    //     "total": element.amount,

    //     "shipedTill": element.shipedTill,

    //     "shipingNow": element.shipingNow,
    //   }
    //   filterArray.push(filterobj)

    // })

    // if (item == 'save') {

    //   let obj: any = {
    //     "CustomerPOId": this.shipmentArray.customerPOId,

    //     "DispachComments": this.DispachComments,

    //     "CreatedById": this.userId,

    //     "InvoiceNo": this.invoice,

    //     "InvoiceDate": this.invoicedateChange1,

    //     "shipingDate": this.shippingDateChange,

    //     "InvoiceReceivedDate": this.reciveDateChange,
    //     "shipcount": filterArray,
    //     "subtotal": this.subtotal,
    //     "taxelement": this.taxElement,
    //     "packingcharges": this.PackingCharge,
    //     "shipingcharges": this.ShippingCharge,
    //     "total": this.Total,
    //     "AddType": "save",
    //   }
    //   this.orders.saveShipOrder(obj).subscribe((res) => {
    //     console.log(res.response)
    //     if (res.response.result == 'Succesfully added') {
    //       alert('Succesfully added');
    //       this.dialogRef.close();

    //     }
    //     else {

    //     }
    //   })

    // }
    // else {

    //   let obj: any = {
    //     "CustomerPOId": this.shipmentArray.customerPOId,

    //     "DispachComments": this.DispachComments,

    //     "CreatedById": this.userId,

    //     "InvoiceNo": this.invoice,

    //     "InvoiceDate": this.invoicedateChange1,

    //     "shipingDate": this.shippingDateChange,

    //     "InvoiceReceivedDate": this.reciveDateChange,
    //     "shipcount": filterArray,
    //     "subtotal": this.subtotal,
    //     "taxelement": this.taxElement,
    //     "packingcharges": this.PackingCharge,
    //     "shipingcharges": this.ShippingCharge,
    //     "total": this.Total,
    //     "AddType": "draft",
    //   }
    //   this.orders.saveShipOrder(obj).subscribe((res) => {
    //     console.log(res.response)
    //     if (res.response.result == 'Succesfully added') {
    //       alert('Succesfully added');
    //       this.dialogRef.close();

    //     }
    //     else {

    //     }
    //   })

    // }

    // console.log('savedship', this.currentShipment)
  }
  onCellClicked(e): void {
    console.log('cellClicked', e);

    if (
      e.event.target.dataset.action == 'toggle' &&
      e.column.getColId() == 'action'
    ) {
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
    imageElement.className = 'new-window-arrow';
    imageElement.src = 'assets/img/new-window-array.png';
    tooltip.className = 'tooltip';
    imageElement.classList.add('custom-tooltip');
    imageElement.innerHTML = '<span class="tooltip">hhhhh</span>';
    element.appendChild(document.createTextNode(params.value));
    element.appendChild(imageElement);
    return element;
  }
  handleScroll(event) {
    var tippyPopups: NodeListOf<Element> | null | undefined =
      document.querySelectorAll(".tippy-box[data-theme='user-tippy']");

    tippyPopups.forEach((element) => {
      element.parentNode?.removeChild(element);
    });
    const grid = document.getElementById('gridContainer');
    if (grid) {
      const gridBody = grid.querySelector('.ag-body-viewport') as any;
      const scrollPos = gridBody.offsetHeight + event.top;
      const scrollDiff = gridBody.scrollHeight - scrollPos;
      //const api =  this.rowData5;
      this.stayScrolledToEnd = scrollDiff <= this.paginationPageSize;
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
      this.image1 = 'assets/img/expandarrows.svg';
    } else {
      this.image1 = 'assets/img/expandarrows.svg';
    }
  }
  expandOrderItemsDiv() {
    this.orderitem = !this.orderitem;

    if (this.orderitem === false) {
      this.image2 = 'assets/img/expandarrows.svg';
    } else {
      this.image2 = 'assets/img/expandarrows.svg';
    }
  }
  expandShipmentOneDiv() {
    this.shipmentone = !this.shipmentone;

    if (this.shipmentone === false) {
      this.image3 = 'assets/img/expandarrows.svg';
    } else {
      this.image3 = 'assets/img/expandarrows.svg';
    }
  }
  // expandShipmentTwoDiv() {
  //   this.shipmenttwo = !this.shipmenttwo;

  //   if (this.shipmenttwo === false) {
  //     this.image4 = 'assets/img/expandarrows.svg';
  //   } else {
  //     this.image4 = 'assets/img/expandarrows.svg';
  //   }
  // }
  expandOrderHistoryDiv() {
    this.orderhistory = !this.orderhistory;

    if (this.orderhistory === false) {
      this.image5 = 'assets/img/expandarrows.svg';
    } else {
      this.image5 = 'assets/img/expandarrows.svg';
    }
  }

  selectedDateRange = {
    startDate: '11/11/2022',
    endDate: '11/15/2022',
  };
  customDatePickerEvent(eventChange) {
    this.selectedDateRange = eventChange.selectedDate;
    console.log(this.selectedDateRange);
  }
  selectdays() {
    this.dialog.open(CustomDatePopupComponent, { panelClass: 'custmdays' });
  }
  removeItem() {
    this.itemremoved.splice(0);
  }
  


  public isOpen = false;
  editButton() {
     localStorage.setItem("Edit", 'Edit')
    let dialogRef = this.dialog.open(AddorderpromotionsComponent, {
       minWidth: '100vw',
       height: '730px',
      panelClass: 'order-add-edit'
    });
    this.isOpen = false;
    dialogRef.afterClosed().subscribe((res) => {
      localStorage.setItem('Edit', '');
    })
  }
}
