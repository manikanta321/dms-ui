import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-materialclassification-edit-success',
  templateUrl: './materialclassification-edit-success.component.html',
  styleUrls: ['./materialclassification-edit-success.component.css']
})
export class MaterialclassificationEditSuccessComponent implements OnInit {
  activeCatId:any;
  activeCatName:any;
  CategoryName:any;
  CategoryCode:any;
  CategoryData:any;
  subCategoryName:any;
  subCategoryCode:any;
  typeName:any;
  typeCode:any;
  editsucces : boolean =false;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.CategoryName = sessionStorage.getItem("CategoryName");
    this.CategoryCode =sessionStorage.getItem("CategoryCode");
    this.subCategoryName = sessionStorage.getItem("subCategoryName");
    this.subCategoryCode = sessionStorage.getItem("subCategoryCode");
    this.typeName = sessionStorage.getItem("typeName");
    this.typeCode = sessionStorage.getItem("typeCode");
    setTimeout(() => {

      this.closeDialog();
     }, 5000);
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
