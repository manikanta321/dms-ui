import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { SharedService } from 'src/app/services/shared-services.service';



@Component({
  selector: 'app-order-cancel-done-popup',
  templateUrl: './order-cancel-done-popup.component.html',
  styleUrls: ['./order-cancel-done-popup.component.css']
})
export class OrderCancelDonePopupComponent implements OnInit {
  orderNumber:any;
  constructor( private dialogRef: MatDialogRef<any>,
    private sharedService: SharedService,) { }
    

  ngOnInit(): void {
    sessionStorage.getItem("orderNumber");
  this.OrderNumber();
  
  setTimeout(() => {

    this.closeDialog()
   }, 5000);       



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
