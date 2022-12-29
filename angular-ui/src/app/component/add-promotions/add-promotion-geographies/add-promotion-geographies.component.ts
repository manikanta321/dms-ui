import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AssosiationServicesService } from 'src/app/services/assosiation-services.service';
import { SharedServicesDealerService } from 'src/app/services/shared-services-dealer.service';


export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
@Component({
  selector: 'app-add-promotion-geographies',
  templateUrl: './add-promotion-geographies.component.html',
  styleUrls: ['./add-promotion-geographies.component.css']
})
export class AddPromotionGeographiesComponent implements OnInit {
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
  selectedcountGeo:any=0;
  constructor(
 private assoservice:AssosiationServicesService,
 private dialogRef: MatDialogRef<any>,
 private sharedService:SharedServicesDealerService
 ) { }

  ngOnInit(): void {
let productId=localStorage.getItem('ProductStockItemId')
let coustmerId=localStorage.getItem('dealerSelectedcoustmerId')
let selectedGeoType=localStorage.getItem('selectedtypeasso')


if(selectedGeoType=='dealer'){
  this.assoservice.getgeoOfdealer(coustmerId).subscribe((res)=>{
    let data =res.response;
    this.geodata= data;
  })
}
else{
  this.assoservice.getgeo(productId).subscribe((res)=>{
    let data =res.response;
    this.geodata= data;
    
  })
}
  }
  updateAllComplete(event) {
let productID = event;
      const index = this.aarrayToPush.indexOf(productID);

      if (index !== -1) {
        this.aarrayToPush.splice(index, 1);
        this.selectedcountGeo=this.aarrayToPush.length


      }
      else {
        this.aarrayToPush.push(productID);
        this.selectedcountGeo=this.aarrayToPush.length

      }

      console.log('aarrayToPush', this.aarrayToPush)
      let allgeoItemCount = this.geodata[0].geoCount;
      let selectedGeoItemCount = this.selectedcountGeo;
      if(allgeoItemCount == selectedGeoItemCount) {
        this.allComplete = true;
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
      }
      else {
        this.allComplete = false;
      }
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
    localStorage.setItem("geoAsso", JSON.stringify(this.aarrayToPush));
    localStorage.setItem("aboveDefaultGeoOfName", JSON.stringify(this.geodata[0].aboveDefaultGeoName));
    localStorage.setItem("selectedcountGeo", JSON.stringify(this.selectedcountGeo));
    localStorage.setItem("tottalgeoCount", JSON.stringify(this.geodata[0].geoCount));



    this.sharedService.filter('Register click')
    this.dialogRef.close();

  }
}
