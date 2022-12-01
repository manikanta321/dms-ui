import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-deactive-success-pop',
  templateUrl: './deactive-success-pop.component.html',
  styleUrls: ['./deactive-success-pop.component.css']
})
export class DeactiveSuccessPopComponent implements OnInit {
  employeeId: any;
  employeename: any;
  materialListName: any;
  matValue: boolean = false;
  userName: boolean = false;
  stockNmae: boolean = false;
  stockSubCatName:boolean = false;
  stockTypeName:boolean = false;
  activeCatId: any;
  activeCatName: any;
  activeSubCatName:any;
  activeTypeName:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {



    this.activeCatId = localStorage.getItem("activeCatId");
    this.activeCatName = localStorage.getItem("activeCatName");
    this.activeSubCatName = localStorage.getItem("activeSubCatName");
    this.activeTypeName=localStorage.getItem("activeTypeName");
    this.employeename = localStorage.getItem("employeeName");
    // this.employeename = localStorage.getItem('Niname');
    this.materialListName = localStorage.getItem('listName');

    this.materialList();

    setTimeout(() => {

      this.closeDialog()

    }, 5000);


  }
  materialList() {

    if (this.employeename != '') {
      this.userName = true;
      localStorage.setItem('listName', '');
      localStorage.setItem('activeCatName', '');
      localStorage.setItem("activeSubCatName",'');
      localStorage.setItem("activeTypeName",'');
    }
    if (this.materialListName !== '') {
      this.matValue = true;
      localStorage.setItem('activeCatName', '');
      localStorage.setItem("employeeName", '');
      localStorage.setItem("activeSubCatName",'');
      localStorage.setItem("activeTypeName",'');
    }
    if (this.activeCatName !== '') {
      this.matValue = false;
      this.userName = false;
      this.stockNmae = true;
      localStorage.setItem('listName', '');
      localStorage.setItem("employeeName", '');
      localStorage.setItem("activeSubCatName",'');
      localStorage.setItem("activeTypeName",'');
    }
    if (this.activeSubCatName !== '') {
      this.matValue = false;
      this.userName = false;
      this.stockNmae = false;
      this.stockSubCatName = true;
      localStorage.setItem('listName', '');
      localStorage.setItem("employeeName", '');
      localStorage.setItem('activeCatName', '');
      localStorage.setItem("activeTypeName",'');
    }
    if (this.activeTypeName !== '') {
      this.matValue = false;
      this.userName = false;
      this.stockNmae = false;
      this.stockSubCatName = false;
      this.stockTypeName = true;
      localStorage.setItem('listName', '');
      localStorage.setItem("employeeName", '');
      localStorage.setItem('activeCatName', '');
      localStorage.setItem("activeSubCatName",'');
    }
  }

  // successpop(){
  //   if(this.materialListName ==''){
  //     this.matValue = false;
  //     localStorage.setItem('listName','');
  //     }else if (this.activeCatId == '') {

  //     } else {

  //     }
  // }


  closeDialog() {
    this.sharedService.filter('Register click');

    this.dialogRef.close();
  }
}
