import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SharedServicesDealerService } from 'src/app/services/shared-services-dealer.service';
import { UserService } from 'src/app/services/user.service';
import { DealerDeactiveComponent } from '../dealer-deactive/dealer-deactive.component';
import { DealerReactvSuccessComponent } from '../dealer-reactv-success/dealer-reactv-success.component';

@Component({
  selector: 'app-deactive-reactive-popup',
  templateUrl: './deactive-reactive-popup.component.html',
  styleUrls: ['./deactive-reactive-popup.component.css']
})
export class DeactiveReactivePopupComponent implements OnInit {
  dealer : any;
  customerId:any;
  customerName:any;
  LoginId:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<any>,
  private dialog: MatDialog,
  private user: UserService,
  private sharedService:SharedServicesDealerService

  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this. dealer = this.data;
    this.customerId = localStorage.getItem("customerIdOfDealer");
    this.customerName=localStorage.getItem("employeeNameOfDealer");
    this.LoginId=localStorage.getItem("logInId");

  }


  dectrv(){
   this.dialog.open(DealerDeactiveComponent ,{panelClass: 'deactiveSuccessPop'});
   this.dialogRef.close();
   let data={
   CustomerId:this.customerId,
   logedUserId:this.LoginId,
   status:"deactivate"
           }
  this.user.activateDeactivateDealers(data).subscribe((res)=>{
  this.sharedService.filter('Register click');
  this.dialogRef.close()

})
   this.dialog.open(DealerDeactiveComponent ,{panelClass: 'deactiveSuccessPop'})
  }
}
