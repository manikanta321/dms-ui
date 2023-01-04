import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dealer-success-popup',
  templateUrl: './dealer-success-popup.component.html',
  styleUrls: ['./dealer-success-popup.component.css']
})
export class DealerSuccessPopupComponent implements OnInit {

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
