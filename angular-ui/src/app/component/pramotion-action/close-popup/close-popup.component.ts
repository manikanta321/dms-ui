import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CloseSuccessComponent } from '../close-success/close-success.component';

@Component({
  selector: 'app-close-popup',
  templateUrl: './close-popup.component.html',
  styleUrls: ['./close-popup.component.css']
})
export class ClosePopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  deactive(){
this.dialog.open(CloseSuccessComponent,{panelClass: 'deactiveSuccessPop'})
this.dialogRef.close()
  }
  close(){
    this.dialogRef.close()
  }
}
