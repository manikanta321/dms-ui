import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrencyDefaultComponent } from '../currency-default/currency-default.component';

@Component({
  selector: 'app-make-default',
  templateUrl: './make-default.component.html',
  styleUrls: ['./make-default.component.css']
})
export class MakeDefaultComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,
    private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
  yes(){
    this.dialog.open(CurrencyDefaultComponent, {panelClass: 'activeSuccessPop'});
    this.dialogRef.close();
  }
}
