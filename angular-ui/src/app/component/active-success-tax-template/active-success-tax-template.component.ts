

import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-active-success-tax-template',
  templateUrl: './active-success-tax-template.component.html',
  styleUrls: ['./active-success-tax-template.component.css']
})
export class ActiveSuccessTaxTemplateComponent implements OnInit {
  taxId:any;
  taxTemplateName:any
  constructor(private dialogRef: MatDialogRef<any>,
    private elementRef: ElementRef) { }
//   ngAfterViewInit() {
//     this.elementRef.nativeElement.ownerDocument
//         .borderleft = '10px solid green';
// }
  ngOnInit(): void {
    this.taxId = localStorage.getItem("taxId");
    this.taxTemplateName=localStorage.getItem("taxTemplateName");

    setTimeout(() => {

      this.closeDialog()

    }, 5000);
  }
  closeDialog(){
    this.dialogRef.close();
  }
}

