import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-default',
  templateUrl: './currency-default.component.html',
  styleUrls: ['./currency-default.component.css']
})
export class CurrencyDefaultComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}
