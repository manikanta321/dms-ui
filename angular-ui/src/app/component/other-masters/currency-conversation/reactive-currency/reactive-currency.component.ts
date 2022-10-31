import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrencyReactivatedComponent } from '../currency-reactivated/currency-reactivated.component';

@Component({
  selector: 'app-reactive-currency',
  templateUrl: './reactive-currency.component.html',
  styleUrls: ['./reactive-currency.component.css']
})
export class ReactiveCurrencyComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,
    private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
  yes(){
    this.dialog.open(CurrencyReactivatedComponent, {panelClass: 'activeSuccessPop'});
    this.dialogRef.close();
  }
}
