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

  toprint:boolean=false;
  addCountryButton:boolean =false;
  addStateButton:boolean =false;
  addDistrictButton:boolean =false;
  addRegionButton:boolean =false;
  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem = null;

  LoginId:any;
  numberValue:any;

  CountryList:any=[];
  stateList: any=[];
  distList:any=[];
  regionList:any=[];
  
  countCountry='';
  countStates="";
  countDist="";
  countRegion="";

  catagoryroouting='';
  subcatRoouting='';
  selectedtypeItem='';
  subcatcount='';
  typecount='';

  
  constructor(private fb: FormBuilder,
    private calssification:ClassificationserviseService) {
    this.createform();
    this.stateFormValidators();
    this.districtFormValidator();
    this.regionFormValidator();
   }

  ngOnInit(): void {
    this.LoginId=localStorage.getItem("logInId");
    this.numberValue = Number(this.LoginId);

    this.getCountryList();
    this.getStateList();
    this.getDistrictList();
    this.getregionList();
  }

  //get Country List
  getCountryList(){
    this.calssification.getclassification().subscribe((res)=>{
          let data=res.response;
          this.countCountry=res.totalRecords;
          this.CountryList=data.allOtherCats
        })
  }

  //get State List
  getStateList(){
    this.calssification.getclassification().subscribe((res)=>{
          let data=res.response;
          this.countStates=res.totalRecords;
          this.stateList=data.allOtherCats
        })
  }

  //get City List
  getDistrictList(){
    this.calssification.getclassification().subscribe((res)=>{
          let data=res.response;
          this.countDist=res.totalRecords;
          this.distList=data.allOtherCats
        })
  }

  //get Region List
  getregionList(){
    this.calssification.getclassification().subscribe((res)=>{
          let data=res.response;
          this.countRegion=res.totalRecords;
          this.regionList=data.allOtherCats
        })
  }

  //add conurty and refresh country list
  addCountry(){
    let data = {
              CategoryName:this.countryForm.value['countryFormTag'],
              CategoryCode:this.countryForm.value['countryCodeTag'],
              };
  console.log(data);
  // this.calssification.addCatagory(data).subscribe((res)=>{
  //   this.addcat='';
  //   this.addcatcode='';
  // })
   this.getCountryList();
  }

  //add state and refresh state list
  addState(){
    let data = {
              CategoryName:this.stateForm.value['stateFormTag'],
              CategoryCode:this.stateForm.value['statecodeFormTag'],
              };
  console.log(data);
  // this.calssification.addCatagory(data).subscribe((res)=>{
  //   this.addcat='';
  //   this.addcatcode='';
  // })
   this.getStateList();
  }

   //add dist and refresh dist list
   addDist(){
    let data = {
              CategoryName:this.districtForm.value['distirictFormTag'],
              CategoryCode:this.districtForm.value['districtcode'],
              };
  console.log(data);
  // this.calssification.addCatagory(data).subscribe((res)=>{
  //   this.addcat='';
  //   this.addcatcode='';
  // })
   this.getDistrictList();
  }

  //add region and refresh dist list
  addRegion(){
    let data = {
              CategoryName:this.regionForm.value['regionFormTag'],
              CategoryCode:this.regionForm.value['regionCode'],
              };
  console.log(data);
  // this.calssification.addCatagory(data).subscribe((res)=>{
  //   this.addcat='';
  //   this.addcatcode='';
  // })
   this.getDistrictList();
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

  addRegionForm(){
    this.addRegionButton =true;
  }

  removecatg(index):void{
    this.CountryList.splice(index, 1);
  }

  removesub(index){
    this.stateList.splice(index, 1);
  }

  removetype(index){
    this.distList.splice(index, 1);
  }

  removeregions(index){
    this.regionList.splice(index, 1);
  }

  onClick(item) {
    this.selectedItem = item;
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
