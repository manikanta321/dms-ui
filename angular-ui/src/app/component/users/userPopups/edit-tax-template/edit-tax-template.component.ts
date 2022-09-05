import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-tax-template',
  templateUrl: './edit-tax-template.component.html',
  styleUrls: ['./edit-tax-template.component.css']
})
export class EditTaxTemplateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
