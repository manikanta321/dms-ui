import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { CurrencyReactivatedComponent } from '../currency-reactivated/currency-reactivated.component';

@Component({
  selector: 'app-reactive-currency',
  templateUrl: './reactive-currency.component.html',
  styleUrls: ['./reactive-currency.component.css']
})
export class ReactiveCurrencyComponent implements OnInit {
  LoginId:any;
  UoMId:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.LoginId=localStorage.getItem("logInId");
    this.UoMId = localStorage.getItem('UomId');
  }
  closeDialog(){
    // this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
  yes(){
    const data={
      UoMId:this.UoMId,
     logedUserId:this.LoginId,
     status:"Activate"
   }
    this.user.activeDeavtiveCurrency(data).subscribe((res) => {     
    });
    this.dialog.open(CurrencyReactivatedComponent, {panelClass: 'activeSuccessPop'});
    this.dialogRef.close();
  }
}
