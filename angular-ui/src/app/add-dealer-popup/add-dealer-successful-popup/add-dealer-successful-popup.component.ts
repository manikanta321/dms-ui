import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dealer-successful-popup',
  templateUrl: './add-dealer-successful-popup.component.html',
  styleUrls: ['./add-dealer-successful-popup.component.css']
})
export class AddDealerSuccessfulPopupComponent implements OnInit {
  updatesave:boolean=false;
  saveMaterial : any;
  saveProduct :boolean= false;
  success : boolean = false;
  saveAssociationbtn: any;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    let AddEdit = localStorage.getItem('updateAddEdit')
    
    if(AddEdit == 'edit'){
      this.updatesave = true;
    }
    else{
      this.updatesave = false;
    }
 
    setTimeout(() => {

      this.closeDialog();
     },5000);
  }
  closeDialog(){
    this.dialogRef.close()
  }
  

}
