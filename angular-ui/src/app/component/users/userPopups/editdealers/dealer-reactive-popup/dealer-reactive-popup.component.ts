import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedServicesDealerService } from 'src/app/services/shared-services-dealer.service';
import { UserService } from 'src/app/services/user.service';
import { DealerReactvSuccessComponent } from '../dealer-reactv-success/dealer-reactv-success.component';

@Component({
  selector: 'app-dealer-reactive-popup',
  templateUrl: './dealer-reactive-popup.component.html',
  styleUrls: ['./dealer-reactive-popup.component.css']
})
export class DealerReactivePopupComponent implements OnInit {
  customerId:any;
  customerName:any;
  LoginId:any;


  constructor( private dialog: MatDialog,
    private user: UserService,
    private dialogRef: MatDialogRef<any>,
    private sharedService:SharedServicesDealerService) { 

    
  }

  ngOnInit(): void {
    this.customerId = localStorage.getItem("customerIdOfDealer");
    this.customerName=localStorage.getItem("employeeNameOfDealer");
    this.LoginId=localStorage.getItem("logInId");
  }
  reactv(){
    let data={
      CustomerId:this.customerId,
      logedUserId:this.LoginId,
      status:"activate"
    }
    
    this.user.activateDeactivateDealers(data).subscribe((res)=>{
      this.sharedService.filter('Register click');
      this.dialogRef.close();   
    })
    this.dialog.open(DealerReactvSuccessComponent ,{panelClass: 'deactiveSuccessPop'})
   }
}
