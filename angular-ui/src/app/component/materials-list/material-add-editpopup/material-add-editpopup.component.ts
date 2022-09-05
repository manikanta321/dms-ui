import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-material-add-editpopup',
  templateUrl: './material-add-editpopup.component.html',
  styleUrls: ['./material-add-editpopup.component.css']
})
export class MaterialAddEditpopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MaterialAddEditpopupComponent>) { }

  ngOnInit(): void {
  }

  addEditMaterial(){
    this.dialogRef.close();
  }
}
