import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addorderpro-success-popup',
  templateUrl: './addorderpro-success-popup.component.html',
  styleUrls: ['./addorderpro-success-popup.component.css']
})
export class AddorderproSuccessPopupComponent implements OnInit {

  AddorEditpro:boolean=true
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {


    let isitem =localStorage.getItem('AddorEditpro')

 if(isitem=='edit'){
   this.AddorEditpro=false;
 }else{
  this.AddorEditpro=true;

 }

       setTimeout(() => {

         this.closeDialog()

         }, 5000);
  
  }
  
  
  closeDialog(){
    this.dialogRef.close();
  }
  }


