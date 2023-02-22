import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sales-success',
  templateUrl: './add-sales-success.component.html',
  styleUrls: ['./add-sales-success.component.css']
})
export class AddSalesSuccessComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {

    
     setTimeout(() => {

       this.closeDialog();
      }, 5000);
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
