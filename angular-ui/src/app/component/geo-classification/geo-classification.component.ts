import { Component, createPlatform, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';

@Component({
  selector: 'app-geo-classification',
  templateUrl: './geo-classification.component.html',
  styleUrls: ['./geo-classification.component.css']
})
export class GeoClassificationComponent implements OnInit {
  countryForm!: FormGroup;
  stateForm!: FormGroup;
  districtForm!: FormGroup;
  regionForm!: FormGroup;
  cityForm!: FormGroup;
  areaForm!: FormGroup;
  subAreaForm!: FormGroup;

  toprint:boolean=false;
  addCountryButton:boolean =false;
  addStateButton:boolean =false;
  addDistrictButton:boolean =false;
  addCityButton:boolean =false;
  addRegionButton:boolean =false;
  addAreaButton:boolean = false;
  addSubAreaButton:boolean = false;

  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem = null;
  

  LoginId:any;
  numberValue:any;

  CountryList:any=[];
  stateList: any=[];
  distList:any=[];
  cityList:any=[];
  areaList:any=[];
  regionList:any=[];
  subAreaList:any=[];
  
  countCountry='';
  countStates="";
  countDist="";
  countCity="";
  countRegion="";
  countArea="";
  firstCountr="";
  countSubArea="";

  catagoryroouting='';
  subcatRoouting='';
  selectedtypeItem='';
  subcatcount='';
  typecount='';


  stateselectedItem:any;
  distselectedItem:any;
  citySelectedItem:any;
  regionSelctedItem:any;
  areaselectedItem:any;
  subAreaSelectedItem:any;

  
  constructor(private fb: FormBuilder,
    private calssification:ClassificationserviseService) {
    this.createform();
    this.stateFormValidators();
    this.districtFormValidator();
    this.regionFormValidator();
    this.cityFormValidator();
    this.areaFormValidator();
    this.subAreaFormValidator();
   }

  ngOnInit(): void {
    this.LoginId=localStorage.getItem("logInId");
    this.numberValue = Number(this.LoginId);

    this.getCountryList();
  }

  //get Country List
  getCountryList(){
    this.calssification.getCountryList().subscribe((res)=>{
          let data=res.response;
          this.countCountry=res.response.allOtherCountries.length;
          this.CountryList=data.allOtherCountries;
          this.firstCountr =data.firstCountr;
          this.getStateList(data.firstCountr.countryId);
          this.selectedItem=data.firstCountr.countryId;
         
        })
       
  }

  //get State List
  getStateList(id:any){
    localStorage.setItem('countryId',id);
    this.selectedItem= id;
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countStates=data.allOtherGeography.length;
          this.stateList=data.allOtherGeography;
          this.stateselectedItem = data.firstGeography.geographyId;
          this.getDistrictList(data.firstGeography.geographyId)
        })
  }

  //get Dist List
  getDistrictList(id:any){
    this.stateselectedItem = id;
    localStorage.setItem("stateId",id);
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countDist=data.allOtherGeography.length;
          this.distList=data.allOtherGeography;
          this.distselectedItem = data.firstGeography.geographyId;
          this.getCityList(data.firstGeography.geographyId);
        })
  }

  //get Dist List
  getCityList(id:any){
    this.distselectedItem = id;
    localStorage.setItem('distId',id);
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countCity=data.allOtherGeography.length;
          this.cityList=data.allOtherGeography;
          this.citySelectedItem = data.firstGeography.geographyId;
          this.getregionList(data.firstGeography.geographyId);
        })
  }



  //get Region List
  getregionList(id:any){
    this.citySelectedItem = id;
    localStorage.setItem('cityId',id);
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countRegion=data.allOtherGeography.length;
          this.regionList=data.allOtherGeography;
          this.regionSelctedItem = data.firstGeography.geographyId;
          this.getAreaList(data.firstGeography.geographyId);
        })
  }

  //get Area List
  getAreaList(id:any){
    this.regionSelctedItem = id;
    localStorage.setItem('regionId',id);
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countArea=data.allOtherGeography.length;
          this.areaList=data.allOtherGeography;
          this.areaselectedItem = data.firstGeography.geographyId;
          this.getSubAreaList(data.firstGeography.geographyId);
        })
  }

   //get sub Area List
   getSubAreaList(id:any){
    this.areaselectedItem = id;
    localStorage.setItem('areaId',id);
    this.subAreaSelectedItem = id;
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countSubArea = data.allOtherGeography.length;
          this.subAreaList=data.allOtherGeography;
         
        })
  }

  //add conurty and refresh list
  addCountry(){
    let data = {
              "GeographyName":this.countryForm.value['countryFormTag'],
              "GeographyDesc":this.countryForm.value['countryCodeTag'],
              "CreatedById":this.LoginId
              };

    this.calssification.addCountryName(data).subscribe((res)=>{
      this.getCountryList();
      this.countryForm.reset();
    })

  }

  //add state and refresh list
  addState(){
      let data = {
        "GeographyName":this.stateForm.value['stateFormTag'],
        "GeographyDesc":this.stateForm.value['statecodeFormTag'],
        "GeographyParentId":localStorage.getItem('countryId'),
        "CreatedById":this.LoginId
        };
  
      this.calssification.addStateName(data).subscribe((res)=>{
        this.stateForm.reset();
      })          
  }

   //add dist and refresh list
   addDist(){

    let data = {
              "GeographyName":this.districtForm.value['distirictFormTag'],
              "GeographyDesc":this.districtForm.value['districtcode'],
              "GeographyParentId":localStorage.getItem('stateId'),
              "CreatedById":this.LoginId
              };

    this.calssification.addDistName(data).subscribe((res)=>{
      this.districtForm.reset();
    });

  }

  //add city and refresh list
  addCityName(){
    let data = {
                "GeographyName":this.cityForm.value['cityFormTag'],
                "GeographyDesc":this.cityForm.value['citycode'],
                "GeographyParentId":localStorage.getItem('distId'),
                "CreatedById":this.LoginId
                };

    console.log(data);

    this.calssification.addCityName(data).subscribe((res)=>{
      console.log(res);
      this.cityForm.reset();
    })
 
  }

  //add zone and refresh list
  addZoneName(){
    let data = {
                "GeographyName":this.regionForm.value['regionFormTag'],
                "GeographyDesc":this.regionForm.value['regionCode'],
                "GeographyParentId": localStorage.getItem('cityId'),
                "CreatedById":this.LoginId
                };

    console.log(data);

    this.calssification.addZoneName(data).subscribe((res)=>{
      console.log(res);
      this.regionForm.reset();
    })
 
  }

   //add area and refresh list
   addAreaName(){

    let data = {
                "GeographyName":this.areaForm.value['areaFormTag'],
                "GeographyDesc":this.areaForm.value['areaCode'],
                "GeographyParentId": localStorage.getItem('regionId'),
                "CreatedById":this.LoginId
                };

    console.log(data);

    this.calssification.addAreaName(data).subscribe((res)=>{
      console.log(res);
      this.areaForm.reset();
    })
 
  }

  //add subArea and refresh list
  addSubAreaName(){
    let data = {
                "GeographyName":this.subAreaForm.value['subAreaFormTag'],
                "GeographyDesc":this.subAreaForm.value['SubAreaCode'],
                "GeographyParentId": localStorage.getItem('areaId'),
                "CreatedById":this.LoginId
                };

    console.log(data);

    this.calssification.AddSubArea(data).subscribe((res)=>{
      console.log(res);
      this.subAreaForm.reset();
    })
 
  }

  printvalue(valueofprint:boolean){
    this.toprint=valueofprint;
  }

  addCountryForm(){
    this.addCountryButton =true;
  }

  addStateForm(){
    this.addStateButton =true;
  }

  addDistrict(){
    this.addDistrictButton =true;
  }

  addCity(){
    this.addCityButton =true;
  }

  addRegionForm(){
    this.addRegionButton =true;
  }

  addAreaForm(){
    this.addAreaButton =true;
  }

  addSubAreaForm(){
    this.addSubAreaButton =true;
  }

  removeItem(id:any):void{
    this.calssification.getDeleteListByCountry(id).subscribe((res)=>{
      let data=res.response;
    })
  }

  createform(){
    this.countryForm = this.fb.group({
      countryFormTag: ["", [Validators.required]],
      countryCodeTag:["", [Validators.required]],
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

  cityFormValidator(){
    this.cityForm = this.fb.group({
      cityFormTag: ["", [Validators.required]],
      citycode:["", [Validators.required]],
    });
  }

  areaFormValidator(){
    this.areaForm = this.fb.group({
      areaFormTag: ["", [Validators.required]],
      areacode:["", [Validators.required]],
    });
  }

  subAreaFormValidator(){
    this.subAreaForm = this.fb.group({
      subAreaFormTag: ["", [Validators.required]],
      SubAreaCode:["", [Validators.required]],
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

  removeCitymoreFileds(){
    this.addCityButton = true;
  }

  removeregionsMore(){
    this.addRegionButton = false;
  }

  removeareaMore(){
    this.addAreaButton = false;
  }

}
