
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { SharedServiceAddSubService } from 'src/app/services/shared-service-add-sub.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { TaxTemplateServiceService } from 'src/app/services/tax-template-service.service';
import { UserService } from 'src/app/services/user.service';
import { SuccessDeactivateTaxComponentComponent } from '../success-deactivate-tax-component/success-deactivate-tax-component.component';
@Component({
  selector: 'app-deactive-subcategory-compo',
  templateUrl: './deactive-subcategory-compo.component.html',
  styleUrls: ['./deactive-subcategory-compo.component.css']
})
export class DeactiveSubcategoryCompoComponent implements OnInit {
  employeeId:any;
  employeename:any
  LoginId:any;
  taxId:any;
  taxTemplateName:any;
  activeSubCatId:any;
  activeSubCatName:any;
  activeSubCatIsActive:any;
  headername:any;

  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private user:UserService,
    private sharedService: SharedServiceAddSubService,
    private tax:TaxTemplateServiceService,
    private calssification:ClassificationserviseService,
    ) { }

  ngOnInit(): void {
    
    this.LoginId=localStorage.getItem("logInId");
    // console.log('itemin cat',item)
    // localStorage.setItem('activeCatId',item.catId);
    // localStorage.setItem('activeCatName',item.catName)
    // localStorage.setItem('activeCatIsActive',item.isActive)

    this.activeSubCatId=localStorage.getItem("activeSubCatId");
    this.activeSubCatName=localStorage.getItem("activeSubCatName");
    this.activeSubCatIsActive=localStorage.getItem("activeSubCatIsActive");
if(this.activeSubCatIsActive == 'false'){
  this.headername= 'Activate'
}
else{
  this.headername= 'De-activate'

}
  }
  close(){
    this.dialogRef.close()
  }
  deactive(){
    if(this.activeSubCatIsActive == 'false'){
      const data1={
        SubCategoryId:this.activeSubCatId,
        logedUserId:this.LoginId,
        status:"Activate"
      }

this.calssification.deactivateSub(data1).subscribe((res)=>{
  this.sharedService.filter('Register click')
  this.dialogRef.close();
});
    }
    else{
      const data1={
        SubCategoryId:this.activeSubCatId,
        logedUserId:this.LoginId,
        status:"Deactivate"
          }
          
    this.calssification.deactivateSub(data1).subscribe((res)=>{
      this.sharedService.filter('Register click')
      this.dialogRef.close();
  
    
    })
        }

    }

}

