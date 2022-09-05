import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-deletecomponent',
  templateUrl: './deletecomponent.component.html',
  styleUrls: ['./deletecomponent.component.css']
})
export class DeletecomponentComponent implements OnInit {
  panelOpenState = true;
  constructor(private dialogRef: MatDialogRef<any>) { }
   

  ngOnInit(): void {

  }
  closeDialog(){
    this.dialogRef.close();
  }
}