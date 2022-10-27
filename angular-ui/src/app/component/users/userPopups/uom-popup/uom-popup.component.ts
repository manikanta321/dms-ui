import { Component, OnInit } from '@angular/core';
import { UomServicesService } from 'src/app/services/uom-services.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-services.service';

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

  })

}
}
