

import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { UomServicesService } from 'src/app/services/uom-services.service';
import { UserService } from 'src/app/services/user.service';
import { DeactiveSuccessPopComponent } from '../users/userPopups/deactive-success-pop/deactive-success-pop.component';

import { interval } from 'rxjs';

@Component({
  selector: 'app-delete-uom-new',
  templateUrl: './delete-uom-new.component.html',
  styleUrls: ['./delete-uom-new.component.css']
})
export class DeleteUomNewComponent implements OnInit {
  uomId:any;
  UomName:any='';
  LoginId:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private user:UserService,
    private sharedService:SharedService,
    private uomservise:UomServicesService,

    ) { }

  ngOnInit() {
   
    this.uomId = localStorage.getItem('niId');
    this.UomName = localStorage.getItem('Niname');

    // this.LoginId=localStorage.getItem("logInId");

  }
  close(){
    this.dialogRef.close()
  }
  deactive(){
    
    this.uomservise.deleteUom(this.uomId).subscribe((res) => {     
    });
    this.sharedService.filter('Register click');

    this.dialog.open(DeactiveSuccessPopComponent, {panelClass: 'deactiveSuccessPop'});
    this.sharedService.filter('Register click');
    this.dialogRef.close()
  }

}
