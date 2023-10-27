import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-geolist-success-popup',
  templateUrl: './add-geolist-success-popup.component.html',
  styleUrls: ['./add-geolist-success-popup.component.css']
})
export class AddGeolistSuccessPopupComponent implements OnInit {
  Addshipping:boolean=false;
  updatingchaning:boolean=false;
  Addpacking:boolean=false;
  updatingpacking:boolean=false;

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {

    let isitem =localStorage.getItem('ShippingPackingCharges');

 if(isitem=='ShippingAdded'){
   this.Addshipping=true;
   this.updatingchaning=false;
   this.Addpacking=false;
   this.updatingpacking=false;

 }
 else if(isitem=='ShippingUpdated')
 {
   this.updatingchaning=true;
   this.Addshipping=false;
   this.Addpacking=false;
   this.updatingpacking=false;


 }

 else if(isitem=='PackingAdded')
 {
     this.Addpacking=true;
     this.updatingpacking=false;
     this.updatingchaning=false;
     this.Addshipping=false;
 }
 else if(isitem=='PackingUpdated')
 {
    this.updatingpacking=true;
    this.updatingchaning=false;
     this.Addshipping=false;
     this.Addpacking=false;
 }

     setTimeout(() => {

        this.closeDialog()

      }, 5000);
}
  closeDialog() {
    this.dialogRef.close();
  }
}
