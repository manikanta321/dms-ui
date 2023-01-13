import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dealer-deactive',
  templateUrl: './dealer-deactive.component.html',
  styleUrls: ['./dealer-deactive.component.css']
})
export class DealerDeactiveComponent implements OnInit {
  customerName:any
  responseResult:boolean =false;
  responseData:any;
  constructor(private dialogRef: MatDialogRef<any>,) { }




  ngOnInit(): void {
    this.responseData =  sessionStorage.getItem("Response");
    if(this.responseData != ''){
     this.responseResult =true;
    }
    else {
     this.responseResult =false;
     this.customerName=localStorage.getItem("employeeNameOfDealer");
    }


    setTimeout(() => {

      this.closeDialog()

    }, 5000);
   
  }

  closeDialog() {

    this.dialogRef.close();
 }

}
