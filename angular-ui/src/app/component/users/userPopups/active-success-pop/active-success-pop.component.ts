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
  userName:boolean =false;
  stockNmae:boolean =false;
  constructor(private dialogRef: MatDialogRef<any>,
    private elementRef: ElementRef) { }
//   ngAfterViewInit() {
//     this.elementRef.nativeElement.ownerDocument
//         .borderleft = '10px solid green';
// }
  ngOnInit(): void {
    this.activeCatId = localStorage.getItem("activeCatId");
    this.activeCatName = localStorage.getItem("activeCatName");
    this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
    this.materialListName =localStorage.getItem('listName');
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
    }
    if (this.materialListName !== '') {
      this.matValue = true;
      localStorage.setItem('activeCatName', '');
      localStorage.setItem("employeeName", '');
    }
    if (this.activeCatName !== '') {
      this.matValue = false;
      this.userName = false;
      this.stockNmae = true;
      localStorage.setItem('listName', '');
      localStorage.setItem("employeeName", '');
    }
  }
  

  closeDialog(){
    this.dialogRef.close();
  }
}
