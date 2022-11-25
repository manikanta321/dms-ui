import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-deactive-success-pop',
  templateUrl: './deactive-success-pop.component.html',
  styleUrls: ['./deactive-success-pop.component.css']
})
export class DeactiveSuccessPopComponent implements OnInit {
  employeeId:any;
  employeename:any;
  materialListName:any;
  matValue:boolean =false;
  constructor(private dialogRef: MatDialogRef<any>,
    private sharedService:SharedService,
    ) { }

  ngOnInit(): void {


    


    this.employeename=localStorage.getItem("employeeName");
    this.employeename = localStorage.getItem('Niname');
    this.materialListName =localStorage.getItem('listName');

    this.materialList();

     setTimeout(() => {

      this.closeDialog()

     }, 5000);


  }
  materialList(){
    if(this.materialListName ==''){
    this.matValue = false;
    localStorage.setItem('listName','');
    }
    else {
      this.matValue = true;
    }
  }
  closeDialog(){
    this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}
