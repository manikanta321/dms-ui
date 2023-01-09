import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-promotion-successful-popup',
  templateUrl: './add-promotion-successful-popup.component.html',
  styleUrls: ['./add-promotion-successful-popup.component.css']
})
export class AddPromotionSuccessfulPopupComponent implements OnInit {
  updatesavePromo:boolean=false;
  saveMaterial : any;
  saveProduct :boolean= false;
  success : boolean = false;
  saveAssociationbtn: any;
  updatedraft:boolean=false;
  AddorSave: boolean = true;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    let AddEdit = localStorage.getItem('updatePromotionPopup')
  if(AddEdit == 'edit'){
    this.updatesavePromo = true;
   
  }
  else{
    this.updatesavePromo = false;
   
  }

  // let SaveDraft = localStorage.getItem('updateSaveDraft')
  // if( SaveDraft== 'edit'){
  //   this.updatedraft = true;

  // }
  // else{
  //   this.updatedraft = false;

  // }

  // let headername = localStorage.getItem('addorSave');
  // if (headername == 'savedraft') {
  //   this.AddorSave = true;
  // }
  // else{
  //   this.AddorSave=false;
  // }


  setTimeout(() => {

    this.closeDialog();
   }, 50*5000);
}
closeDialog(){
  this.dialogRef.close()
}

  }
  
