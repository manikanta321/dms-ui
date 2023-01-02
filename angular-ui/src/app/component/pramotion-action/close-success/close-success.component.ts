import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-close-success',
  templateUrl: './close-success.component.html',
  styleUrls: ['./close-success.component.css']
})
export class CloseSuccessComponent implements OnInit {

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
