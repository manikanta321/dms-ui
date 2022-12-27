import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-types-successful-done-popup',
  templateUrl: './add-types-successful-done-popup.component.html',
  styleUrls: ['./add-types-successful-done-popup.component.css']
})
export class AddTypesSuccessfulDonePopupComponent implements OnInit {
  
  
 
  typeName:any;
  typeCode:any;
  

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {

    this.typeName = sessionStorage.getItem("typeName");
    this.typeCode = sessionStorage.getItem("typeCode");


     setTimeout(() => {

       this.closeDialog();
      }, 5000);
  
  }



  closeDialog()
  {
    this.dialogRef.close();
  }
 
}
