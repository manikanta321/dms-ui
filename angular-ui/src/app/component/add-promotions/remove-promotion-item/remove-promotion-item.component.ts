import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { UserService } from 'src/app/services/user.service';
import { RemovePromotionSucessComponent } from '../remove-promotion-sucess/remove-promotion-sucess.component';

@Component({
  selector: 'app-remove-promotion-item',
  templateUrl: './remove-promotion-item.component.html',
  styleUrls: ['./remove-promotion-item.component.css']
})
export class RemovePromotionItemComponent implements OnInit {
  panelOpenState = true;
  employeeId:any;
  employeename:any
  LoginId: any;
  showdata: any;
  
 
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private user:UserService,
    private sharedService:SharedService,) { }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
    this.LoginId=localStorage.getItem("logInId");
  }
  closeDialog(){
    this.dialogRef.close();
  }
  hidedata() {
    this.showdata = false;
  }
  close(){
    this.dialogRef.close()
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

    this.dialog.open(RemovePromotionSucessComponent, {panelClass: 'removeitemsucess'});
    this.sharedService.filter('Register click');
    this.dialogRef.close()
  }
}