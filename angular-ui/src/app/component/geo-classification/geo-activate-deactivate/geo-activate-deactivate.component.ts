import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-geo-activate-deactivate',
  templateUrl: './geo-activate-deactivate.component.html',
  styleUrls: ['./geo-activate-deactivate.component.css']
})
export class GeoActivateDeactivateComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<GeoActivateDeactivateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  headername:string = "";
  activeCatName:string = "";
  geographyItem:any;
  ngOnInit(): void {
    console.log(this.data);
    this.geographyItem = this.data;
  }


  updateGeoClick() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
