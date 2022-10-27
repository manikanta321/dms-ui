
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-delete-uom-successfull-popup',
  templateUrl: './delete-uom-successfull-popup.component.html',
  styleUrls: ['./delete-uom-successfull-popup.component.css']
})
export class DeleteUomSuccessfullPopupComponent implements OnInit {
  employeeId:any;
  employeename:any;
  UomName:any;
  UomId:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private sharedService:SharedService,
    ) { }

  ngOnInit(): void {
    this.UomName = localStorage.getItem('UomName');
    let UomId = localStorage.getItem('UomId');
  }
  closeDialog(){
    this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}
