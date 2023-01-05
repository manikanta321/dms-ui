import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edituom-successfulpopup',
  templateUrl: './edituom-successfulpopup.component.html',
  styleUrls: ['./edituom-successfulpopup.component.css']
})
export class EdituomSuccessfulpopupComponent implements OnInit {


  
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {

      
 
    
     setTimeout(() => {

       this.closeDialog()

      }, 5000);
  }

  


  closeDialog(){
    this.dialogRef.close();
  }
}
