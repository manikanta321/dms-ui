import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-materialadded-success-pop',
  templateUrl: './materialadded-success-pop.component.html',
  styleUrls: ['./materialadded-success-pop.component.css']
})
export class MaterialaddedSuccessPopComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    setTimeout(() => {

      this.closeDialog();
     }, 5000);
  }
  closeDialog(){
    this.dialogRef.close()
  }
}
