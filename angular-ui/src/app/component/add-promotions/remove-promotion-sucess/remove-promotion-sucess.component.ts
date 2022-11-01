import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-remove-promotion-sucess',
  templateUrl: './remove-promotion-sucess.component.html',
  styleUrls: ['./remove-promotion-sucess.component.css']
})
export class RemovePromotionSucessComponent implements OnInit {
  employeeId:any;
  employeename:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private sharedService:SharedService,) { }

  ngOnInit(): void {
    this.employeename=localStorage.getItem("employeeName");
    this.employeename = localStorage.getItem('Niname');
  }
  closeDialog(){
    this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}
