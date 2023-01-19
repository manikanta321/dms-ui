import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AssosiationServicesService } from 'src/app/services/assosiation-services.service';
import { PromotionSharedServicesService } from 'src/app/services/promotion-shared-services.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { SharedServicesDealerService } from 'src/app/services/shared-services-dealer.service';
export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
@Component({
  selector: 'app-addpromo-geography',
  templateUrl: './addpromo-geography.component.html',
  styleUrls: ['./addpromo-geography.component.css']
})
export class AddpromoGeographyComponent implements OnInit {
  task: Task = {
    name: 'malaysia(3/4)',
    completed: false,
    subtasks: [
      {name: 'Kedah', completed: false,},
      {name: 'Penang', completed: false, },
      {name: 'Batu Refringi', completed: false,},
      {name:'Georgetown' , completed:false}
    ],
  }
  indtasks: any = ['karnataka','AndhraPradesh','kerala','maharastra']
  allComplete: boolean = false;
  completed : boolean = false;
  geodata:any=[];
  aarrayToPush:any=[];
  selectedcount:any=0;
  constructor(private assoservice:AssosiationServicesService,
    private dialogRef: MatDialogRef<any>,
    private sharedService:PromotionSharedServicesService,
    public promotionGeoservc: PromotionService) { }

  ngOnInit(): void {
    this.promotionGeography();
    let productId=localStorage.getItem('ProductStockItemIdpromo')
// let coustmerId=localStorage.getItem('dealerSelectedcoustmerIdpromo')
// let selectedGeoType=localStorage.getItem('selectedtypeassopromo')


// if(selectedGeoType=='dealer'){
//   this.assoservice.getgeoOfdealer(coustmerId).subscribe((res)=>{
//     let data =res.response;
//     this.geodata= data;
    
//   })
// }
// else{
//   this.assoservice.getgeo(productId).subscribe((res)=>{
//     let data =res.response;
//     this.geodata= data;
    
//   })
// }
  }
  promotionGeography(){
// const data = {
//   // stockitemid : 2,
// }
    // this.assoservice.getgeo(produId).subscribe((res)=>{
    //       this.geodata =res.response;
    //       // this.geodata= data;
    // });
    let promoGeographyId = this.geodata.map(x => x.aboveDefaultGeoId);
    console.log('gepid',promoGeographyId)
    this.promotionGeoservc.Promogetgeo().subscribe((res) => {
      this.geodata =res.response;
    });
  }
  updateAllComplete(event) {
    let productID = event;
          const index = this.aarrayToPush.indexOf(productID);
    
          if (index !== -1) {
            this.aarrayToPush.splice(index, 1);
            this.selectedcount=this.aarrayToPush.length
    
    
          }
          else {
            this.aarrayToPush.push(productID);
            this.selectedcount=this.aarrayToPush.length
    
          }
    
          console.log('aarrayToPush', this.aarrayToPush)
        // this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
      }
    
      someComplete(): boolean {
        if (this.task.subtasks == null) {
          return false;
        }
        return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
      }
    
      setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
          return;
        }
        this.task.subtasks.forEach(t => (t.completed = completed));
      }
      saveGeo(){
        localStorage.setItem("geopromo1", JSON.stringify(this.aarrayToPush));
        localStorage.setItem("aboveDefaultGeoOfNamepromo1", JSON.stringify(this.geodata[0].aboveDefaultGeoName));
        localStorage.setItem("selectedcountpromo1", JSON.stringify(this.selectedcount));
        localStorage.setItem("tottalgeoCountpromo1", JSON.stringify(this.geodata[0].geoCount));
    
    
    
        this.sharedService.filter('Register click')
        this.dialogRef.close();
    
      }
}
