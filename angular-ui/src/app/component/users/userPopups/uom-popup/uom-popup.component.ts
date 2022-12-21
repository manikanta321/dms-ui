import { Component, OnInit } from '@angular/core';
import { UomServicesService } from 'src/app/services/uom-services.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';
import { GeoAddedPopupComponent } from 'src/app/component/geo-classification/geo-added-popup/geo-added-popup.component';

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

  ) { }

  ngOnInit(): void {
  }
addUom(){
  this.sharedService.filter('Register click')

  let data={
    UoMName:this.name,
    UoMShortName:this.DisplayCode,
  }
  this.uomservise.adduom(data).subscribe((res:any)=>{
    this.sharedService.filter('Register click')

console.log(res)
this.dialogRef.close();
this.dialog.open(GeoAddedPopupComponent, {panelClass: 'activeSuccessPop'});


  })

}
}
