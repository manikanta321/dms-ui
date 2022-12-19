import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-geo-added-popup',
  templateUrl: './geo-added-popup.component.html',
  styleUrls: ['./geo-added-popup.component.css']
})
export class GeoAddedPopupComponent implements OnInit {
  employeeId:any;
  employeename:any;
  materialListName:any;
  geographyName:any;
  geographyCode:any;
  matValue:boolean =false;
  constructor(public dialogRef: MatDialogRef<GeoAddedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    sessionStorage.getItem("GeoName");
    sessionStorage.getItem("GeoCode");
    setTimeout(()=>{
      this.dialogRef.close();
    }, 5*1000);
    this.geoData();
  }
  geoData(){
    let geoName =sessionStorage.getItem("GeoName");
    let geoCode = sessionStorage.getItem("GeoCode");
    this.geographyName =geoName;
    this.geographyCode =geoCode;
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
