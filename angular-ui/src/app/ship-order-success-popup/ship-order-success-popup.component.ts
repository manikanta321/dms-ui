import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ship-order-success-popup',
  templateUrl: './ship-order-success-popup.component.html',
  styleUrls: ['./ship-order-success-popup.component.css']
})
export class ShipOrderSuccessPopupComponent implements OnInit {
  AddorEditpro:boolean=true;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    let isitem =localStorage.getItem('AddShipment')

 if(isitem=='edit'){
   this.AddorEditpro=false;
 }else{
  this.AddorEditpro=true;

 }

       setTimeout(() => {

         this.closeDialog()

         }, 5000);
  
  }
  
  
  closeDialog(){
    this.dialogRef.close();
  }


}
