import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adduser-successful-popup',
  templateUrl: './adduser-successful-popup.component.html',
  styleUrls: ['./adduser-successful-popup.component.css']
})
export class AdduserSuccessfulPopupComponent implements OnInit {

  editOrAdd: boolean = true;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {


    let isitem = localStorage.getItem('addorEditUser')

    if (isitem == 'edit') {
      this.editOrAdd = false;
    } else {
      this.editOrAdd = true;

    }

    setTimeout(() => {

      this.closeDialog()

    }, 5000);


  }

  closeDialog() {
    this.dialogRef.close();
  }
}
