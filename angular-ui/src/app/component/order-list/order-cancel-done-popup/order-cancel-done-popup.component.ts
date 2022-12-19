import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-cancel-done-popup',
  templateUrl: './order-cancel-done-popup.component.html',
  styleUrls: ['./order-cancel-done-popup.component.css']
})
export class OrderCancelDonePopupComponent implements OnInit {
  dialogRef: any;

  constructor() { }

  ngOnInit(): void {

  
  }
 

  
  closeDialog() {
    

    this.dialogRef.close();
  }
}
