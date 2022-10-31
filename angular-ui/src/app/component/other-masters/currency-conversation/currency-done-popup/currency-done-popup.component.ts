import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-done-popup',
  templateUrl: './currency-done-popup.component.html',
  styleUrls: ['./currency-done-popup.component.css']
})
export class CurrencyDonePopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}
