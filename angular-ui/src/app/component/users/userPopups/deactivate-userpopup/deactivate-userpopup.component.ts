import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { UserService } from 'src/app/services/user.service';
import { DeactiveSuccessPopComponent } from '../deactive-success-pop/deactive-success-pop.component';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { duration } from 'moment';
@Component({
  selector: 'app-deactivate-userpopup',
  templateUrl: './deactivate-userpopup.component.html',
  styleUrls: ['./deactivate-userpopup.component.css']
})
export class DeactivateUserpopupComponent implements OnInit {
  employeeId:any;
  employeename:any
  LoginId:any;
  session:any;
  localName:any;
  localData:any;
  employeedata:any;
  employeeCodeSet:any;
  
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private user:UserService,
    private sharedService:SharedService,
    private addMaterials: AddMaterialsService
    ) { }

  ngOnInit(): void {
     this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
    this.employeeCodeSet =localStorage.getItem('employeeCodeSet');
    this.employeedata= this.employeeCodeSet+"/"+this.employeeId;
    
  
    this.LoginId=localStorage.getItem("logInId");
    this.deactivateMaterial();
  }
  close(){
    this.dialogRef.close()
  }
  deactivateMaterial(){
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
  deactive(){
    const data={
      UserId:this.employeeId,
     logedUserId:this.LoginId,
     status:"deactivate"
   }
    this.user.activeDeavtive(data).subscribe((res) => {     
    });

    this.sharedService.filter('Register click');
     
    
    this.dialog.open(DeactiveSuccessPopComponent, {panelClass: 'deactiveSuccessPop'});
    this.sharedService.filter('Register click');
    this.dialogRef.close()
  }
  deactiveList(){
    this.addMaterials.onDeactivate(this.localData).subscribe((res) => {
      let newData = res.response;
      console.log("LocalData",newData);
      // this.activateData = newData;
    });
    this.sharedService.filter('Register click');

    this.dialog.open(DeactiveSuccessPopComponent,{panelClass: 'deactiveSuccessPop'});
    this.sharedService.filter('Register click');
    this.dialogRef.close()
  }

}
