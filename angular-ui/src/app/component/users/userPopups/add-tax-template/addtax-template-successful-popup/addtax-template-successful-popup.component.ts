import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-addtax-template-successful-popup',
  templateUrl: './addtax-template-successful-popup.component.html',
  styleUrls: ['./addtax-template-successful-popup.component.css']
})
export class AddtaxTemplateSuccessfulPopupComponent implements OnInit {
  editOrAdd:boolean=true; 
  taxTemplateName:any;
 
   


  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {

    this.taxTemplateName = localStorage.getItem("taxTemplateName");
    
let isitem =localStorage.getItem('AddOrEditTax')

if(isitem=='edit'){
  this.editOrAdd=false;
}else{
  this.editOrAdd=true;

}

    //  setTimeout(() => {

    //     this.closeDialog()

    //    }, 5000);
  
  }
  
  
  closeDialog(){
    this.dialogRef.close();
  }
}
