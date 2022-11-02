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
  regionAreaForm!: FormGroup;
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
          if(data.firstGeography != null){
            this.regionSelctedItem = data.firstGeography.geographyId;
            this.getAreaList(data.firstGeography.geographyId);
          }
          
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
    this.addCountryButton =false;
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
        this.getStateList(localStorage.getItem('countryId'));
      })  
      this.addStateButton =false;        
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
      this.getDistrictList(localStorage.getItem("stateId"));
    });
    this.addDistrictButton =false;
  }

  //add city and refresh list
  addCityName(){
    let data = {
                "GeographyName":this.cityForm.value['cityFormTag'],
                "GeographyDesc":this.cityForm.value['citycode'],
                "GeographyParentId":localStorage.getItem('distId'),
                "CreatedById":this.LoginId
                };

    this.calssification.addCityName(data).subscribe((res)=>{
      this.cityForm.reset();
      this.getCityList(localStorage.getItem("distId"));
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

    this.calssification.addZoneName(data).subscribe((res)=>{
      this.regionForm.reset();
      this.getregionList(localStorage.getItem("cityId"));
    })
 
  }

   //add area and refresh list
   addAreaName(){
    let data = {
                "GeographyName":this.regionAreaForm.value['areaFormTag'],
                "GeographyDesc":this.regionAreaForm.value['areaCode'],
                "GeographyParentId": localStorage.getItem('regionId'),
                "CreatedById":this.LoginId
                };


    this.calssification.addRegionAreaName(data).subscribe((res)=>{
      this.regionAreaForm.reset();
      this.getAreaList(localStorage.getItem("regionId"));
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

    this.calssification.AddSubArea(data).subscribe((res)=>{
      this.subAreaForm.reset();
      this.getSubAreaList(localStorage.getItem("areaId"));
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

  removeSubAreaForm(){
    this.addSubAreaButton =false;
  }

  removeItem(id:any,status:any):void{
   
    var strName ="";
    if(status === 1){
      strName = "country";
    }

    if(status === 2){
      strName = "state"; 
    }

    if(status === 3){
      strName = "district";
      this.getCountryList();
    }

    if(status === 4){
      strName = "city"; 
    }

    if(status === 5){
      strName = "region";  
    }

    if(status === 6){
      strName = "area";  
    }

    if(status === 7){
      strName = "subarea";
    }
    
    if (confirm("Are you sure want to delete "+strName+"!") == true) {
      this.calssification.getDeleteListByCountry(id,status).subscribe((res)=>{
        let data=res.response;
      })
    }

    if(status === 1){
      this.getCountryList();
    }

    if(status === 2){
      this.getStateList(localStorage.getItem('countryId'));
    }

    if(status === 3){
      this.getDistrictList(localStorage.getItem("stateId"));
    }

    if(status === 4){
      this.getCityList(localStorage.getItem("distId"));
    }

    if(status === 5){
      this.getregionList(localStorage.getItem("cityId"));
    }

    if(status === 6){
      this.getAreaList(localStorage.getItem("regionId"));
    }

    if(status === 7){
      this.getSubAreaList(localStorage.getItem("areaId"));
    }

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
    this.regionAreaForm = this.fb.group({
      areaFormTag:["", [Validators.required]],
      areaCode:["", [Validators.required]],
    });
  }

  subAreaFormValidator(){
    this.subAreaForm = this.fb.group({
      subAreaFormTag: ["", [Validators.required]],
      SubAreaCode:["", [Validators.required]],
    });
  }

}
