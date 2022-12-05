import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-active-success-pop',
  templateUrl: './active-success-pop.component.html',
  styleUrls: ['./active-success-pop.component.scss']
})
export class ActiveSuccessPopComponent implements OnInit {
  employeeId:any;
  
  employeename:any;
  materialListName:any;
  matValue:boolean =false;
  activeCatId: any;
  activeCatName:any;
  activeSubCatName:any;
  activeTypeName:any;
  userName:boolean =false;
  stockNmae:boolean =false;
  stockSubCatName:boolean = false;
  stockTypeName:boolean =false;

  employeeCodeSet: any;
  employeedata:any;
  
  constructor(private dialogRef: MatDialogRef<any>,
    private elementRef: ElementRef) { }
//   ngAfterViewInit() {
//     this.elementRef.nativeElement.ownerDocument
//         .borderleft = '10px solid green';
// }
  ngOnInit(): void {
    this.activeCatId = localStorage.getItem("activeCatId");
    this.activeCatName = localStorage.getItem("activeCatName");
    this.activeSubCatName = localStorage.getItem("activeSubCatName");
    this.activeTypeName=localStorage.getItem("activeTypeName");
    this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
    this.materialListName =localStorage.getItem('listName');

    this.employeeCodeSet =localStorage.getItem('employeeCodeSet');
    
    this.employeedata= this.employeeCodeSet;


    this.materialList();





    //  setTimeout(() => {

    //   this.closeDialog()

    //  }, 5000);
   
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
  

  closeDialog(){
    this.dialogRef.close();
  }
}
