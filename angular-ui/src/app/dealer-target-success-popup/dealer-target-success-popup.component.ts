import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dealer-target-success-popup',
  templateUrl: './dealer-target-success-popup.component.html',
  styleUrls: ['./dealer-target-success-popup.component.css']
})
export class DealerTargetSuccessPopupComponent implements OnInit {
  updatesaveTarget:boolean=false;
  saveMaterial : any;
  saveProduct :boolean= false;
  success : boolean = false;
  saveAssociationbtn: any;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    let AddEditTarget = localStorage.getItem('updateAddEditTarget')
    
    if(AddEditTarget == 'edit'){
      this.updatesaveTarget = true;
    }
    else{
      this.updatesaveTarget = false;
    }
 
    setTimeout(() => {

      this.closeDialog();
     },5000);
  }
  closeDialog(){
    this.dialogRef.close()
  }
  
  }


