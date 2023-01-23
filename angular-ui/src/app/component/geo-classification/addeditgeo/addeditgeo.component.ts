import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';

import { GeoAddedPopupComponent } from '../geo-added-popup/geo-added-popup.component';

@Component({
  selector: 'app-addeditgeo',
  templateUrl: './addeditgeo.component.html',
  styleUrls: ['./addeditgeo.component.css']
})
export class AddeditgeoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddeditgeoComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService,private classification: ClassificationserviseService,) {}
    
    geoType:string = "";
    geoPlaceholder:any;
    isEditModal:boolean = false;
    name:string | null = null;
    code:string| null = null;
    showWarning:boolean = false;
    id:number | null = null;
    GeographyParentId:any;
    logedUserId:any;
    hirerachyIndex:any;
  ngOnInit(): void {
   
    console.log(this.data);
    this.logedUserId = Number(localStorage.getItem("logInId"));
    
    this.showWarning = false;
    this.geoType =  this.data.title;    
    this.geoPlaceholder = this.geoType.toLowerCase();
   
     this.isEditModal = this.data.isEdit;
    sessionStorage.setItem("EditModal",JSON.stringify(this.isEditModal));
    this.GeographyParentId = this.data.GeographyParentId;
    this.hirerachyIndex = this.data.hirerachyIndex;
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
      let saveObj = {name:this.name, code:this.code, id:this.id};


      this.AddEditGeography(saveObj, this.hirerachyIndex);
      sessionStorage.setItem("uomName",'');
      sessionStorage.setItem("uomCode",'');
      sessionStorage.setItem("GeoName",this.name);
      sessionStorage.setItem("GeoCode",this.code);

    }else{
      this.showWarning = true;
    }
    
  }

  AddEditGeography(result, hirerachyIndex) {
    let obj: any = {};
    obj.CompanyId = 1;
    obj.GeographyName = result.name;
    obj.GeographyCode = result.code;
    if (result.id) {
      obj.GeographyId = result.id;
    }

    obj.GeographyParentId = this.GeographyParentId; // Need to GeographyParentId
    obj.GeographyHierarchyId = hirerachyIndex;
    obj.logedUserId = this.logedUserId;

    console.log(obj);
    this.dialogRef.close();
     this.dialog.open(GeoAddedPopupComponent, {panelClass: 'activeSuccessPop'});
    this.spinner.show();
    this.classification.SaveGeography(obj).subscribe({
      next: (res) => {
        if (res.response.flag) {
          this.dialogRef.close({res, result});
          // this.dialog.open(GeoAddedPopupComponent, {panelClass: 'activeSuccessPop'});
          // alert(res.response.resultDetails);
        }else{   
          // Show warning message
          // this.dialogRef.close({res, result});
          alert(res.response.resultDetails);
        }
        this.spinner.hide();
      },
      error: (e) => {
        console.error(e)
        // alert("Something went wrong");
        this.spinner.hide();
      },
    })
  }


}
