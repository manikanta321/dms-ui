import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
// import { RestPwsdUserPopupComponent } from '../rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from 
             '@angular/forms';
import { RestPwsdUserPopupComponent } from '../users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { SharedService } from 'src/app/services/shared-services.service';
@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent implements OnInit {
  enterfirst:any;
  entersecond:any;
  userId:any;
  error:any='';
  LoginId:any;
  addcat:any;
  addcatcode:any;
  numberValue:any;
  catsetName:any;
  activeCatId:any;

  adminPassword:boolean =false;
  showPassword: boolean = false;
  constructor( private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private user:UserService,
    private calssification:ClassificationserviseService,
    private sharedService: SharedService,


    ) { 

   
    }

  

  ngOnInit(): void {
    this.LoginId=localStorage.getItem("logInId");
    this.numberValue = Number(this.LoginId);
    this.userId = localStorage.getItem("userID");
    this.LoginId=localStorage.getItem("logInId");
    this.activeCatId=localStorage.getItem("activeCatId");
    this.catsetName=localStorage.getItem("catsetName");


    if(this.catsetName=='Edit Category'){
this.calssification.getCatDetailsById(this.activeCatId).subscribe((res)=>{
this.addcat=res.response.categoryName;
this.addcatcode=res.response.categoryCode;
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
    this.sharedService.filter('Register click')
    this.addcat='';
    this.addcatcode='';
    this.dialogRef.close();

  })

  }

  editCat(){
    const data={
            CategoryId:this.activeCatId,
            CategoryName:this.addcat,
            CategoryCode:this.addcatcode,
            LastModifiedById:this.LoginId

    }

    this.calssification.updateCat(data).subscribe((res)=>{
      this.sharedService.filter('Register click')
      this.addcat='';
      this.addcatcode='';
      this.dialogRef.close();
    })
  }


  close(){
    this.dialogRef.close();

  }
  
}
