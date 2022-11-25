import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-geo-status-pop',
  templateUrl: './geo-status-pop.component.html',
  styleUrls: ['./geo-status-pop.component.css']
})
export class GeoStatusPopComponent implements OnInit {

  employeeId:any;
  employeename:any;
  materialListName:any;
  matValue:boolean =false;
  constructor(private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
//   ngAfterViewInit() {
//     this.elementRef.nativeElement.ownerDocument
//         .borderleft = '10px solid green';
// }
  ngOnInit(): void {
    console.log(this.data);
    setTimeout(()=>{
      this.dialogRef.close();
    }, 5*1000);
    
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
