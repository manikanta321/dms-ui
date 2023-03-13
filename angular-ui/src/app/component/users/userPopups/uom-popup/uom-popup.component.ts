import { Component, OnInit } from '@angular/core';
import { UomServicesService } from 'src/app/services/uom-services.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { GeoAddedPopupComponent } from 'src/app/component/geo-classification/geo-added-popup/geo-added-popup.component';
import { OtherMasterService } from 'src/app/services/other-master.service';

@Component({
  selector: 'app-uom-popup',
  templateUrl: './uom-popup.component.html',
  styleUrls: ['./uom-popup.component.css']
})
export class UomPopupComponent implements OnInit {
  name:any;
  DisplayCode:any;
  constructor(
    private sharedService:SharedService,
    private uomservise:UomServicesService,
    private dialogRef: MatDialogRef<UomPopupComponent>,
    private dialog: MatDialog,
    private otherMasterService:OtherMasterService,

  ) { }

  ngOnInit(): void {
  }
addUom(){
  this.otherMasterService.filter('Register click')
  sessionStorage.setItem("GeoName",'');
  sessionStorage.setItem("GeoCode",'');
  sessionStorage.setItem("uomName",this.name);
  sessionStorage.setItem("uomCode",this.DisplayCode);
  let data={
    UoMName:this.name,
    UoMShortName:this.DisplayCode,
  }
  this.uomservise.adduom(data).subscribe((res:any)=>{
    this.otherMasterService.filter('Register click');

console.log(res)
this.dialogRef.close();
this.dialog.open(GeoAddedPopupComponent, {panelClass: 'UOMSuccessPop'});


  })

}
}
