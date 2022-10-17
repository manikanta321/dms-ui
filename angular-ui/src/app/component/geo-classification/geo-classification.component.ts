import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-classification',
  templateUrl: './geo-classification.component.html',
  styleUrls: ['./geo-classification.component.css']
})
export class GeoClassificationComponent implements OnInit {
  countryName: string[] = ['Country 1 (Ct1)', 'Country 2 (Ct2)','Country 3 (Ct3)','Country 4 (Ct4)',];
  stateName: string[] = ['State 1', 'State 2',];
  DistrictName: string[] = ['Chennai1', 'Chennai2',];
  regionsName: string[] = ['Regions1', 'Regions2',];


  toprint:boolean=false;

  addCountryButton:boolean =false;
  addStateButton:boolean =false;
  addDistrictButton:boolean =false;
  addRegionButton:boolean =false;


  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem = null;
  // clData: string[] = ['Type TP 1', 'Type TP 2', 'Type TP 3','Type TP 4'];
  // subcat: string[] = ['sub category', 'sub category 2',];
  constructor() { }

  ngOnInit(): void {
  }

  printvalue(valueofprint:boolean){
    this.toprint=valueofprint;
  }
  addCountry(){
    this.addCountryButton =true;
  }

  addState(){
    this.addStateButton =true;
  }

  addDistrict(){
    this.addDistrictButton =true;
  }

  addRegion(){
    this.addRegionButton =true;
  }


  removecatg(index):void{
    this.countryName.splice(index, 1);
  }
  removesub(index){
    this.stateName.splice(index, 1);
  }
  removetype(index){
    this.DistrictName.splice(index, 1);
  }

  removeregions(index){
    this.regionsName.splice(index, 1);
  }

  onClick(item) {
    this.selectedItem = item;
  }

}
