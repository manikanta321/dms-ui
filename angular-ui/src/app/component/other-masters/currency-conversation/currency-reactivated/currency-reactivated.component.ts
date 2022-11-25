import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-reactivated',
  templateUrl: './currency-reactivated.component.html',
  styleUrls: ['./currency-reactivated.component.css']
})
export class CurrencyReactivatedComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {

    setTimeout(() => {

      this.closeDialog()

    }, 5000);
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
  
}
