
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { TaxTemplateServiceService } from 'src/app/services/tax-template-service.service';
import { UserService } from 'src/app/services/user.service';
import { SuccessDeactivateTaxComponentComponent } from '../success-deactivate-tax-component/success-deactivate-tax-component.component';
@Component({
  selector: 'app-deactivate-tax-coponent',
  templateUrl: './deactivate-tax-coponent.component.html',
  styleUrls: ['./deactivate-tax-coponent.component.css']
})
export class DeactivateTaxCoponentComponent implements OnInit {
  employeeId:any;
  employeename:any
  LoginId:any;
  taxId:any;
  taxTemplateName;
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private user:UserService,
    private sharedService:SharedService,
    private tax:TaxTemplateServiceService,
    ) { }

  ngOnInit(): void {
    this.taxId = localStorage.getItem("taxId");
    this.taxTemplateName=localStorage.getItem("taxTemplateName");
    this.LoginId=localStorage.getItem("logInId");
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
   this.tax.deactiveuser(this.taxId).subscribe((res) => {     
  });
    this.sharedService.filter('Register click');

    this.dialog.open(SuccessDeactivateTaxComponentComponent, {panelClass: 'deactiveSuccessPop'});
    this.sharedService.filter('Register click');
    this.dialogRef.close()
  }

}
