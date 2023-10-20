import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
// import { RestPwsdUserPopupComponent } from '../rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from
  '@angular/forms';
import { RestPwsdUserPopupComponent } from '../users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { MaterialClassificationStatusPopupComponent } from '../material-classification-status-popup/material-classification-status-popup.component';
import { MaterialclassificationEditSuccessComponent } from './materialclassification-edit-success/materialclassification-edit-success.component';
@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent implements OnInit {
  enterfirst: any;
  entersecond: any;
  userId: any;
  error: any = '';
  LoginId: any;
  addcat: any;
  addcatcode: any;
  numberValue: any;
  catsetName: any;
  activeCatId: any;
  errorMsg: any;

  adminPassword: boolean = false;
  showPassword: boolean = false;
  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private user: UserService,
    private calssification: ClassificationserviseService,
    private sharedService: SharedService,


  ) {


  }



  ngOnInit(): void {
    this.LoginId = localStorage.getItem("logInId");
    this.numberValue = Number(this.LoginId);
    this.userId = localStorage.getItem("userID");
    this.LoginId = localStorage.getItem("logInId");
    this.activeCatId = localStorage.getItem("activeCatId");
    this.catsetName = localStorage.getItem("catsetName");


    if (this.catsetName == 'Edit Category') {
      this.calssification.getCatDetailsById(this.activeCatId).subscribe((res) => {
        this.addcat = res.response.categoryName;
        this.addcatcode = res.response.categoryCode;
      })

    }





  }
 

  AddCat(){
    let data={
      CategoryName:this.addcat,
      CategoryCode:this.addcatcode,
      CreatedById:this.numberValue
  };
  this.calssification.addCatagory(data).subscribe((res)=>{
    // this.sharedService.filter('Register click')
    // this.addcat='';
    // this.addcatcode='';
    // this.dialogRef.close();
    if (res.response.result === 'Success') {
      sessionStorage.setItem("CategoryName",this.addcat);
      sessionStorage.setItem("CategoryCode",this.addcatcode);
      sessionStorage.setItem("subCategoryName",'');
      sessionStorage.setItem("subCategoryCode",'');
      sessionStorage.setItem("typeName",'');
      sessionStorage.setItem("typeCode",'');
      this.sharedService.filter('Register click')
      this.addcat='';
      this.addcatcode='';
      this.dialogRef.close();
      this.dialog.open(MaterialClassificationStatusPopupComponent,{panelClass:'MLCSP'});
      // {panelClass: 'activeSuccessPop'}

      }
      else {
        this.errorMsg = res.response.result;
      }

    })

  }

  editCat() {
    sessionStorage.setItem("CategoryName", this.addcat);
    sessionStorage.setItem("CategoryCode", this.addcatcode);
    sessionStorage.setItem("subCategoryName", '');
    sessionStorage.setItem("subCategoryCode", '');
    sessionStorage.setItem("typeName", '');
    sessionStorage.setItem("typeCode", '');
    const data = {
      CategoryId: this.activeCatId,
      CategoryName: this.addcat,
      CategoryCode: this.addcatcode,
      LastModifiedById: this.LoginId

    }

    this.calssification.updateCat(data).subscribe((res) => {
      this.sharedService.filter('Register click')
      this.addcat = '';
      this.addcatcode = '';
      this.dialogRef.close();
      this.dialog.open(MaterialclassificationEditSuccessComponent, {panelClass: 'MLCSP'});

      //  {panelClass: 'activeSuccessPop'}
    })
  }


  close() {
    this.dialogRef.close();

  }
  restrictToAlphabets(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^a-zA-Z]/g, '');
  }
}
