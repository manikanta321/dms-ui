import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PromotionSharedServicesService } from 'src/app/services/promotion-shared-services.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { CloseSuccessComponent } from '../close-success/close-success.component';

@Component({
  selector: 'app-close-popup',
  templateUrl: './close-popup.component.html',
  styleUrls: ['./close-popup.component.css']
})
export class ClosePopupComponent implements OnInit {
  promoId:any;
  promoName:any;
  constructor(private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private sharedService: PromotionSharedServicesService,
    public promotionTypes: PromotionService,) { }

  ngOnInit(): void {

    this.promoId=localStorage.getItem('promoclickId')
    this.promoName=localStorage.getItem('promoclickName')
  }
  deactive(){

this.promotionTypes.closePromotion(this.promoId).subscribe((res)=>{
  this.dialog.open(CloseSuccessComponent,{panelClass: 'deactiveSuccessPop'})
  this.dialogRef.close();
  this.sharedService.filter('Register click')

    })

  }
  close(){


    this.dialogRef.close()
  }
}
