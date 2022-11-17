import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-services.service';
import { UomServicesService } from 'src/app/services/uom-services.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-uom-popup',
  templateUrl: './edit-uom-popup.component.html',
  styleUrls: ['./edit-uom-popup.component.css']
})
export class EditUomPopupComponent implements OnInit {
  uomId:any;
  uoMName:any='';
  uoMShortName:any=''
  constructor(
    private sharedService:SharedService,
    private uomservise:UomServicesService,
    private dialogRef: MatDialogRef<EditUomPopupComponent>,
  ) { }

  ngOnInit(): void {
    this.uomId = localStorage.getItem('niId');
this.uomservise.edititems(this.uomId).subscribe((res)=>{
console.log(res)
let data= res.response;
this.uoMName=data.uoMName;
this.uoMShortName=data.uoMShortName

})
  }

  editUom(){
    this.sharedService.filter('Register click')

    let data={
      UoMName:this.uoMName,
      UoMShortName:this.uoMShortName,
      UoMId:this.uomId
    }
    
    this.uomservise.adduom(data).subscribe((res:any)=>{
      this.sharedService.filter('Register click')
  
  console.log(res)
  this.dialogRef.close();
  
    })
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
