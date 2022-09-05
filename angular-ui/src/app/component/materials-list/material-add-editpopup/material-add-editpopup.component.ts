import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-material-add-editpopup',
  templateUrl: './material-add-editpopup.component.html',
  styleUrls: ['./material-add-editpopup.component.css']
})
export class MaterialAddEditpopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MaterialAddEditpopupComponent>) { }
  isExpriySelected:boolean = false;

  ngOnInit(): void {
  }

  addEditMaterial(){
    this.dialogRef.close();
  }

  expiryDateChange(event:any){
    console.log(event.target.value);
    this.isExpriySelected = event.target.value == "Yes" ? true:false;
  }
}
