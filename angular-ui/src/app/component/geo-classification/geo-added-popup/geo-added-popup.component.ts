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
  uomData:boolean =false;
  geoDatas:boolean = false;
  uomName:any;
  uomCode:any;
  matValue:boolean =false;
  constructor(public dialogRef: MatDialogRef<GeoAddedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.dialogRef.close();
    }, 5*1000);
    this.geoData();
  }
  geoData(){
    let geoName =sessionStorage.getItem("GeoName");
    let geoCode = sessionStorage.getItem("GeoCode");
    let uomName = sessionStorage.getItem("uomName");
    let uomCode = sessionStorage.getItem("uomCode");
    if(geoName !='')
    {
      sessionStorage.setItem("uomName",'');
      sessionStorage.setItem("uomCode",'');
      this.geoDatas =true;
      this.uomData = false;
      this.geographyName =geoName;
      this.geographyCode =geoCode;
      console.log("GeoName",geoName);
      console.log("GeoCode",geoCode);
      console.log("uomName",uomName);
      console.log("uomCode",uomCode)
    }
    else if(uomName != '') {
      sessionStorage.setItem("GeoName",'')
      sessionStorage.setItem("GeoCode",'');
      this.uomData = true;
      this.geoDatas = false;
      this.uomName = uomName;
      this.uomCode =uomCode;
      console.log("GeoName",geoName);
      console.log("GeoCode",geoCode);
      console.log("uomName",uomName);
      console.log("uomCode",uomCode)
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
