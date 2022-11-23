import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { UserService } from 'src/app/services/user.service';
import { ActiveSuccessPopComponent } from '../active-success-pop/active-success-pop.component';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
@Component({
  selector: 'app-activatepop-up',
  templateUrl: './activatepop-up.component.html',
  styleUrls: ['./activatepop-up.component.css']
})
export class ActivatepopUpComponent implements OnInit {
  employeeId:any;
  employeename:any
  LoginId: any;
  localName:any;
  localData:any;
  session:any;
  activateData:any= [];
  employeedata:any;
  employeeCodeSet:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,
    private dialog: MatDialog,
    private addMaterials: AddMaterialsService,
    private sharedService:SharedService,
    ) { }

  ngOnInit() {
    this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
    this.employeeCodeSet =localStorage.getItem('employeeCodeSet');
    this.employeedata= this.employeeCodeSet+"/"+this.employeeId;
    this.activateMaterial();
    this.LoginId=localStorage.getItem("logInId");
  }
  close(){
    this.dialogRef.close()
  }
  activateMaterial(){
    let data = localStorage.getItem('session');
    if(data!=="MaterialList"){
      this.session =false;
      localStorage.setItem('listData','');
      localStorage.setItem('listName','');
    }
    else {
      this.session =true;
       this.localData = localStorage.getItem('listData');
      this.localName = localStorage.getItem('listName');
    }
  }
  reactive(){
    const data={
      UserId:this.employeeId,
     logedUserId:this.LoginId,
     status:"activate"
   }
   this.user.activeDeavtive(data).subscribe((res) => {     
   });
   this.dialog.open(ActiveSuccessPopComponent, {panelClass: 'activeSuccessPop'})
   this.sharedService.filter('Register click')
;
   this.dialogRef.close();
  }
 reactiveData(){
  this.addMaterials.onReactivate(this.localData).subscribe((res) => {
    let newData = res.response;
    console.log("LocalData",res.response);
    this.activateData = newData;
  });
  this.dialog.open(ActiveSuccessPopComponent, {panelClass: 'activeSuccessPop'})
  this.sharedService.filter('Register click')
;
  this.dialogRef.close();
 }
}
