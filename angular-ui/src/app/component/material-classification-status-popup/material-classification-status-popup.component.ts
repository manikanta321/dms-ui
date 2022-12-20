import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-material-classification-status-popup',
  templateUrl: './material-classification-status-popup.component.html',
  styleUrls: ['./material-classification-status-popup.component.css']
})
export class MaterialClassificationStatusPopupComponent implements OnInit {
  activeCatId:any;
  activeCatName:any;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
