import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rest-pwsd-user-popup',
  templateUrl: './rest-pwsd-user-popup.component.html',
  styleUrls: ['./rest-pwsd-user-popup.component.css']
})
export class RestPwsdUserPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
