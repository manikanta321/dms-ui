import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-done-popup',
  templateUrl: './currency-done-popup.component.html',
  styleUrls: ['./currency-done-popup.component.css']
})
export class CurrencyDonePopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,) { }
  uoMName:any;

  ngOnInit(): void {


    this.uoMName = localStorage.getItem('UomName');
   
    setTimeout(() => {

      this.closeDialog()

    }, 5000);

  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}
