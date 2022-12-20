import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderCancelDonePopupComponent } from '../order-cancel-done-popup/order-cancel-done-popup.component';

@Component({
  selector: 'app-order-cancel-popup',
  templateUrl: './order-cancel-popup.component.html',
  styleUrls: ['./order-cancel-popup.component.css']
})
export class OrderCancelPopupComponent implements OnInit {
  orderNumber:any;



  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
   
    ) { }
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

   yes()
   {
    
       this.dialog.open(OrderCancelDonePopupComponent,{panelClass: 'deactiveSuccessPop'});

      
  
      this.dialogRef.close()
   }
  

  close(){
    this.dialogRef.close()
}


}
