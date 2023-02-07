import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-target-group-success-popup',
  templateUrl: './add-target-group-success-popup.component.html',
  styleUrls: ['./add-target-group-success-popup.component.css']
})
export class AddTargetGroupSuccessPopupComponent implements OnInit {
  addTargetGrp:any;
  editTargetGrp:any;
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.addTargetGrp = sessionStorage.getItem("AddTargetGrp");
    this.editTargetGrp =sessionStorage.getItem("EditTargetGrp");
    setTimeout(() => {

      this.closeDialog();
     }, 5000);
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
