import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-cancel-done-popup',
  templateUrl: './order-cancel-done-popup.component.html',
  styleUrls: ['./order-cancel-done-popup.component.css']
})
export class OrderCancelDonePopupComponent implements OnInit {
  dialogRef: any;
  orderNumber:any;
  constructor() { }

  ngOnInit(): void {
    sessionStorage.getItem("orderNumber");
  this.OrderNumber();
  }
  OrderNumber(){
    let ordernum = sessionStorage.getItem("orderNumber");
    if(ordernum == 'null') {
      this.orderNumber = '';
    } else {
      this.orderNumber = ordernum;
    }
    }

  
  closeDialog() {
    

    this.dialogRef.close();
  }
}
