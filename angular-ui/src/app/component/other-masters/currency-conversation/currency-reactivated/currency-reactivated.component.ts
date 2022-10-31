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
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
  
}
