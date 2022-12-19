import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderCancelDonePopupComponent } from '../order-cancel-done-popup/order-cancel-done-popup.component';

@Component({
  selector: 'app-order-cancel-popup',
  templateUrl: './order-cancel-popup.component.html',
  styleUrls: ['./order-cancel-popup.component.css']
})
export class OrderCancelPopupComponent implements OnInit {




  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
   
    ) { }
  ngOnInit(): void {
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
