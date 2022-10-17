import { Component, createPlatform, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

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

  countryForm!: FormGroup;
  stateForm!: FormGroup;
  districtForm!: FormGroup;
  regionForm!: FormGroup;

  toprint:boolean=false;

  addCountryButton:boolean =false;
  addStateButton:boolean =false;
  addDistrictButton:boolean =false;
  addRegionButton:boolean =false;


  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem = null;
  //formBuilder: any;
  // clData: string[] = ['Type TP 1', 'Type TP 2', 'Type TP 3','Type TP 4'];
  // subcat: string[] = ['sub category', 'sub category 2',];
  constructor(private fb: FormBuilder) {
    this.createform();
    this.stateFormValidators();
    this.districtFormValidator();
    this.regionFormValidator();
   }

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

  createform(){
    this.countryForm = this.fb.group({
      countryFormTag: ["", [Validators.required]],
      statecodeFormTag:["", [Validators.required]],
    });
  }

  stateFormValidators(){
    this.stateForm = this.fb.group({
      stateFormTag: ["", [Validators.required]],
      statecodeFormTag:["", [Validators.required]],
    });
  }

  districtFormValidator(){
    this.districtForm = this.fb.group({
      distirictFormTag: ["", [Validators.required]],
      districtcode:["", [Validators.required]],
    });
  }

  regionFormValidator(){
    this.regionForm = this.fb.group({
      regionFormTag: ["", [Validators.required]],
      regionCode:["", [Validators.required]],
    });
  }

  removemoreFileds(){
    this.addCountryButton =false;
  }

  removeStatemoreFileds(){
    this.addStateButton =false;
  }

  removeDistmoreFileds(){
    this.addDistrictButton =false;
  }

  removeregionsMore(){
    this.addRegionButton = false;
  }
}
