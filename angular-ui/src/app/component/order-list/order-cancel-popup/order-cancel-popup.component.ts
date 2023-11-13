import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderCancelDonePopupComponent } from '../order-cancel-done-popup/order-cancel-done-popup.component';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-order-cancel-popup',
  templateUrl: './order-cancel-popup.component.html',
  styleUrls: ['./order-cancel-popup.component.css'],
})
export class OrderCancelPopupComponent implements OnInit {
  orderNumber: any;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private service: OrdersApisService,
    private SS: SharedService
  ) {}
  CustomerPoId: any;
  LoginId: any;
  ngOnInit(): void {
    this.CustomerPoId = localStorage.getItem('CustomerPoId');
    this.LoginId = localStorage.getItem('logInId');
    sessionStorage.getItem('orderNumber');
    this.OrderNumber();
  }
  OrderNumber() {
    let ordernum = sessionStorage.getItem('orderNumber');
    if (ordernum == 'null') {
      this.orderNumber = '';
    } else {
      this.orderNumber = ordernum;
    }
  }

  yes() {
    this.dialog.open(OrderCancelDonePopupComponent, {
      panelClass: 'deactiveSuccessPop',
    });
    let statustype = localStorage.getItem('statustype');
    const data = {
      CustomerPoId: this.CustomerPoId,
      CurrentUserId: this.LoginId,
      StatusToBeUpdated: statustype,
    };
    this.service.closeOrder(data).subscribe((res: any) => {
      console.log(res.response.result);
      if (res.response.result == 'Success') {
        this.SS.deletepromo();
        this.dialogRef.close();
      }
    });
  }

  close() {
    localStorage.setItem('status', 'no');
    this.dialogRef.close();
  }
}
