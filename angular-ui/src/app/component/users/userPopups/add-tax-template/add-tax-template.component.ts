import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-add-tax-template',
  templateUrl: './add-tax-template.component.html',
  styleUrls: ['./add-tax-template.component.css']
})
export class AddTaxTemplateComponent implements OnInit {
  panelOpenState = true;
  
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
