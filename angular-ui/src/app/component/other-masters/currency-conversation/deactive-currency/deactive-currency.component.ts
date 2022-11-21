import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrencyDonePopupComponent } from '../currency-done-popup/currency-done-popup.component';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-deactive-currency',
  templateUrl: './deactive-currency.component.html',
  styleUrls: ['./deactive-currency.component.css']
})
export class DeactiveCurrencyComponent implements OnInit {
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
     status:"Deactivate"
   }
    this.user.activeDeavtiveCurrency(data).subscribe((res) => {     
    });
    this.dialog.open(CurrencyDonePopupComponent, {panelClass: 'deactiveSuccessPop'});
    this.dialogRef.close();
  }
}
