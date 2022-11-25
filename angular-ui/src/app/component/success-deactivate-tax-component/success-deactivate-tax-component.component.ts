

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-success-deactivate-tax-component',
  templateUrl: './success-deactivate-tax-component.component.html',
  styleUrls: ['./success-deactivate-tax-component.component.css']
})
export class SuccessDeactivateTaxComponentComponent implements OnInit {
  employeeId:any;
  employeename:any;
  taxId:any;
  taxTemplateName:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private sharedService:SharedService,
    ) { }

  ngOnInit(): void {
    this.taxId = localStorage.getItem("taxId");
    this.taxTemplateName=localStorage.getItem("taxTemplateName");


    setTimeout(() => {

      this.closeDialog()

    }, 5000);

  }
  closeDialog(){
    this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}

