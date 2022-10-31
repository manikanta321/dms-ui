import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrencyDonePopupComponent } from '../currency-done-popup/currency-done-popup.component';

@Component({
  selector: 'app-deactive-currency',
  templateUrl: './deactive-currency.component.html',
  styleUrls: ['./deactive-currency.component.css']
})
export class DeactiveCurrencyComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,
    private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
  yes(){
    this.dialog.open(CurrencyDonePopupComponent, {panelClass: 'deactiveSuccessPop'});
    this.dialogRef.close();
  }
}
