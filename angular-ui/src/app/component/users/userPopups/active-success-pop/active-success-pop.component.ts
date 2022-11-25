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
  constructor(private dialogRef: MatDialogRef<any>,
    private elementRef: ElementRef) { }
//   ngAfterViewInit() {
//     this.elementRef.nativeElement.ownerDocument
//         .borderleft = '10px solid green';
// }
  ngOnInit(): void {
    this.employeeId = localStorage.getItem("userID");
    this.employeename=localStorage.getItem("employeeName");
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
    this.dialogRef.close();
  }
}
