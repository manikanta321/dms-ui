import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addeditgeo',
  templateUrl: './addeditgeo.component.html',
  styleUrls: ['./addeditgeo.component.css']
})
export class AddeditgeoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddeditgeoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
    geoType:string = "";
    isEditModal:boolean = false;
    name:string | null = null;
    code:string| null = null;
    showWarning:boolean = false;
    id:number | null = null;

  ngOnInit(): void {
    console.log(this.data);
    this.showWarning = false;
    this.geoType =  this.data.title;    
    this.isEditModal = this.data.isEdit;
    if(this.data.geography){
      this.name = this.data.geography.geographyName;
      this.code = this.data.geography.geographyCode;
      this.id = this.data.geography.geographyId;
    }else{
      this.name = null;
      this.code = null;
      this.id= null;
    }
    
    console.log(this.name);
  }

  SaveData(){
    if(this.name && this.code){
      this.dialogRef.close({name:this.name, code:this.code, id:this.id});
    }else{
      this.showWarning = true;
    }
    
  }

}
