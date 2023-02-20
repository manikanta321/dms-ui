import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-success-popup',
  templateUrl: './edit-profile-success-popup.component.html',
  styleUrls: ['./edit-profile-success-popup.component.css']
})
export class EditProfileSuccessPopupComponent implements OnInit {
  
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {


    setTimeout(() => {

      this.closeDialog()

    }, 5000);


  }

  closeDialog() {
    this.dialogRef.close();
  }

}
