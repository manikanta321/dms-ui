import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dealer-reactv-success',
  templateUrl: './dealer-reactv-success.component.html',
  styleUrls: ['./dealer-reactv-success.component.css']
})
export class DealerReactvSuccessComponent implements OnInit {
  customerName:any;
  constructor(private dialogRef: MatDialogRef<any>,
    
    
  ) { }

  ngOnInit(): void {
    this.customerName=localStorage.getItem("employeeNameOfDealer");

     setTimeout(() => {

      this.closeDialog()

    }, 5000);

  }
  
  closeDialog() {

     this.dialogRef.close();
  }

  
}
