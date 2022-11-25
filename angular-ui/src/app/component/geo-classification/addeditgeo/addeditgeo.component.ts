import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';

@Component({
  selector: 'app-addeditgeo',
  templateUrl: './addeditgeo.component.html',
  styleUrls: ['./addeditgeo.component.css']
})
export class AddeditgeoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddeditgeoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService,private classification: ClassificationserviseService,) {}
    
    geoType:string = "";
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
    this.isEditModal = this.data.isEdit;
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
    this.spinner.show();
    this.classification.SaveGeography(obj).subscribe({
      next: (res) => {
        if (res.response.flag) {
          this.dialogRef.close({res, result});
          alert(res.response.resultDetails);
        }else{
          // Show warning message
          alert(res.response.resultDetails);
        }
        this.spinner.hide();
      },
      error: (e) => {
        console.error(e)
        alert("Something went wrong");
        this.spinner.hide();
      },
    })
  }


}
