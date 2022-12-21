
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { OtherMasterService } from 'src/app/services/other-master.service';
import { TaxTemplateServiceService } from 'src/app/services/tax-template-service.service';
import { UserService } from 'src/app/services/user.service';
import { ActiveSuccessTaxTemplateComponent } from '../active-success-tax-template/active-success-tax-template.component';
@Component({
  selector: 'app-reactive-tax-coponent',
  templateUrl: './reactive-tax-coponent.component.html',
  styleUrls: ['./reactive-tax-coponent.component.css']
})
export class ReactiveTaxCoponentComponent implements OnInit {
  employeeId:any;
  employeename:any
  LoginId: any;
  taxId: any ;
  taxTemplateName:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,
    private dialog: MatDialog,
    private otherMasterService:OtherMasterService,
    private tax:TaxTemplateServiceService,
    ) { }

  ngOnInit() {
     this.taxId = localStorage.getItem("taxId");
    this.taxTemplateName=localStorage.getItem("taxTemplateName");
    // alert( this.taxTemplateName)
    this.LoginId=localStorage.getItem("logInId");
  }
  close(){
    this.dialogRef.close()
  }
  reactive(){
  //   const data={
  //     UserId:this.employeeId,
  //    logedUserId:this.LoginId,
  //    status:"activate"
  //  }
   this.tax.reactiveuser(this.taxId).subscribe((res) => {     
   });
   this.otherMasterService.filter('Register click');
   this.dialog.open(ActiveSuccessTaxTemplateComponent, {panelClass: 'activeSuccessPop'})
   this.otherMasterService.filter('Register click');
;
   this.dialogRef.close();
  }
}
