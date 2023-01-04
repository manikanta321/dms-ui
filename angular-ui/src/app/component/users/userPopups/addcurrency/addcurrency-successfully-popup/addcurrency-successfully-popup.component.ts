import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addcurrency-successfully-popup',
  templateUrl: './addcurrency-successfully-popup.component.html',
  styleUrls: ['./addcurrency-successfully-popup.component.css']
})
export class AddcurrencySuccessfullyPopupComponent implements OnInit {

  editOrAdd:boolean=true; 

  
  constructor(private dialogRef: MatDialogRef<any>) { }

 
  ngOnInit(): void {

    

    let isitem =localStorage.getItem('Addoreditcurrency')

    if(isitem=='edit'){
      this.editOrAdd=false;
    }else{
      this.editOrAdd=true;
    
    }



    setTimeout(() => {

      this.closeDialog()

     }, 5000);
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
