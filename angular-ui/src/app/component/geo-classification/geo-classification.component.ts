import { Component, createPlatform, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { AddeditgeoComponent } from './addeditgeo/addeditgeo.component';
import { GeoActivateDeactivateComponent } from './geo-activate-deactivate/geo-activate-deactivate.component';
import { GeoStatusPopComponent } from './geo-status-pop/geo-status-pop.component';

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

  toprint: boolean = false;
  addCountryButton: boolean = false;
  addStateButton: boolean = false;
  addDistrictButton: boolean = false;
  addCityButton: boolean = false;
  addRegionButton: boolean = false;
  addAreaButton: boolean = false;
  addSubAreaButton: boolean = false;

  removelist: boolean = false;
  toggle: boolean = true;
  selectedItem = null;


  logedUserId: any;
  userIdNumber: any;

  CountryList: any = [];
  stateList: any = [];
  distList: any = [];
  cityList: any = [];
  areaList: any = [];
  regionList: any = [];
  subAreaList: any = [];

  countCountry = '';
  countStates = "";
  countDist = "";
  countCity = "";
  countRegion = "";
  countArea = "";
  firstCountr = "";
  countSubArea = "";

  catagoryroouting = '';
  subcatRoouting = '';
  selectedtypeItem = '';
  subcatcount = '';
  typecount = '';


  stateselectedItem: any;
  distselectedItem: any;
  citySelectedItem: any;
  regionSelctedItem: any;
  areaselectedItem: any;
  subAreaSelectedItem: any;


  geoGraphyHirerachyData: any;
  geoGraphyFullData: any;

  colorsList = [
    { primaryColor: { background: '#00187A', color: '#fff' }, secondaryColor: { background: "#EAEEFF", color: "#00187A" }, },
    { primaryColor: { background: '#0C5A3E', color: '#fff' }, secondaryColor: { background: "#E6FFF6", color: "#0C5A3E" }, },
    { primaryColor: { background: '#C32F27', color: '#fff' }, secondaryColor: { background: "#FFEDEC", color: "#C32F27" }, },
    { primaryColor: { background: '#3D1A00', color: '#fff' }, secondaryColor: { background: "#D6C8C3", color: "#3D1A00" }, },
    { primaryColor: { background: '#DC0063', color: '#fff' }, secondaryColor: { background: "#FFE1EE", color: "#DC0063" }, },
    { primaryColor: { background: '#8000E2', color: '#fff' }, secondaryColor: { background: "#EFDAFF", color: "#8000E2" }, },
    { primaryColor: { background: '#0E4C6D', color: '#fff' }, secondaryColor: { background: "#D6F1FF", color: "#0E4C6D" }, },
    { primaryColor: { background: '#00187A', color: '#fff' }, secondaryColor: { background: "#EAEEFF", color: "#00187A" }, },
    { primaryColor: { background: '#0C5A3E', color: '#fff' }, secondaryColor: { background: "#E6FFF6", color: "#0C5A3E" }, },
    { primaryColor: { background: '#C32F27', color: '#fff' }, secondaryColor: { background: "#FFEDEC", color: "#C32F27" }, },
    { primaryColor: { background: '#3D1A00', color: '#fff' }, secondaryColor: { background: "#D6C8C3", color: "#3D1A00" }, },
    { primaryColor: { background: '#DC0063', color: '#fff' }, secondaryColor: { background: "#FFE1EE", color: "#DC0063" }, },
  ];


  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private classification: ClassificationserviseService, private sanitizer: DomSanitizer) {
    this.createform();
    this.stateFormValidators();
    this.districtFormValidator();
    this.regionFormValidator();
    this.cityFormValidator();
    this.areaFormValidator();
    this.subAreaFormValidator();
  }

  ngOnInit(): void {
    this.logedUserId = localStorage.getItem("logInId");
    this.userIdNumber = Number(this.logedUserId);
    console.log(this.userIdNumber);
    // this.getCountryList();
    this.getGeographyHierarchy();
  }

  getGeographyHierarchy() {
    this.spinner.show();
    this.geoGraphyHirerachyData = null;
    this.classification.getGeographyHierarchy().subscribe(res => {
      // console.log(res);
      this.spinner.hide();
      this.geoGraphyHirerachyData = res.response;
      this.geoGraphyFullData = JSON.parse(JSON.stringify(res.response));
      this.getGeographiesDataById(null, 1);
    }, err => {
      console.log(err);
      this.spinner.hide();
    })
  }

  selectGeoGraphy(clickedItem, hirerachyIndex) {
    console.log(clickedItem, hirerachyIndex);
    this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.forEach(element => {
      if (element.geographyId == clickedItem.geographyId) {
        let index = this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.indexOf(element.geographyId);
        if (index == -1) {
          if (hirerachyIndex == this.geoGraphyFullData.length) {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.push(element.geographyId);
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.push(element.geographyName);
          } else {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [element.geographyId];
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [element.geographyName];
            this.getGeographiesDataById(element.geographyId, (hirerachyIndex + 1));
            this.removeOtherGeographiesData(hirerachyIndex);
          }
        } else {
          this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.splice(index, 1);
          this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.splice(index, 1);
          this.removeOtherGeographiesData(hirerachyIndex);
        }
      }


    });
  }

  removeOtherGeographiesData(hirerachyIndex) {
    for (var i = hirerachyIndex; i < this.geoGraphyFullData.length; i++) {
      this.geoGraphyFullData[i].allOtherGeography = [];
      this.geoGraphyFullData[i].geographySelected = [];
      this.geoGraphyFullData[i].geographyNamesSelected = [];
      this.geoGraphyFullData[i].geographyCount = 0;
      this.geoGraphyFullData[i].showAddIcon = false;
    }

  }

  getGeographiesDataById(id, hirerachyIndex = 0) {
    this.spinner.show();
    console.log(id, hirerachyIndex);
    this.classification.getGeographiesById(id, hirerachyIndex).subscribe(geographiesRes => {
      console.log(geographiesRes);
      this.spinner.hide();
      this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography = geographiesRes.response.allOtherGeography ?? [];
      this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [];
      this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [];
      this.geoGraphyFullData[hirerachyIndex - 1].geographyCount = this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.length;
      this.geoGraphyFullData[hirerachyIndex - 1].showAddIcon = true;

    }, err => {
      console.log(err);
      this.spinner.hide();
    })
  }

  geoGraphyBreadCrumb(index) {
    let breadCrumb = "";
    for (var i = index - 2; i <= (index - 1); i++) {
      if (this.geoGraphyFullData[i] && this.geoGraphyFullData[i].geographyNamesSelected) {
        breadCrumb += this.geoGraphyFullData[i].geographyNamesSelected.join(',');
        if (i != (index - 1)) {
          breadCrumb += ' <strong style="color:#000" > &#62; </strong> '
        }
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(breadCrumb);
  }

  activateDeactivateGeography(event, geoItem, hirerachyIndex) {
    event.stopPropagation();
    console.log(geoItem);
    const dialogRef = this.dialog.open(GeoActivateDeactivateComponent, { disableClose: true, data: geoItem });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) this.ActivateDeactivateGeography(geoItem, hirerachyIndex);
    });
  }

  editGeography(event, geoItem, geographyHierarchyName, hirerachyIndex) {
    event.stopPropagation();
    console.log(geoItem);
    let data = { geography: geoItem, title: geographyHierarchyName, isEdit: true, GeographyParentId: this.geoGraphyFullData[hirerachyIndex - 2]?.geographySelected[0], hirerachyIndex: hirerachyIndex };
    const dialogRef = this.dialog.open(AddeditgeoComponent, { height: '320px', disableClose: true, data: data });
    dialogRef.afterClosed().subscribe(({ res, result }) => {
      console.log(result);
      this.addEditapiResponse(res,result,hirerachyIndex);
      
      // this.AddEditGeography(result, hirerachyIndex);
    });
  }
  addEditapiResponse(apiResponse, result,hirerachyIndex){
    let geoGraphyObj = this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.find(x => x.geographyId == result.id);
    if (geoGraphyObj) {
      geoGraphyObj.geographyName = result.name;
      geoGraphyObj.geographyCode = result.code;
    } else {
      // Need to updated based on the response success
      // let temp = { geographyName: result.name, geographyCode: result.code, geographyId: null }

      this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.push(apiResponse.response.geography);
    }
  }

  addGeographyForm(geoGraphyGrid, hirerachyIndex) {
    // console.log(geoGraphyGrid);
    let data = { geography: {}, title: geoGraphyGrid.geographyHierarchyName, isEdit: false, GeographyParentId: this.geoGraphyFullData[hirerachyIndex - 2]?.geographySelected[0], hirerachyIndex: hirerachyIndex  };
    const dialogRef = this.dialog.open(AddeditgeoComponent, { height: '320px', disableClose: true, data: data });
    dialogRef.afterClosed().subscribe(({ res, result }) => {
      console.log(result);
      this.addEditapiResponse(res,result,hirerachyIndex);
      
      // this.AddEditGeography(result, hirerachyIndex);
    });
  }


  ActivateDeactivateGeography(geoItem, hirerachyIndex) {
    this.spinner.show();
    this.classification.ActivateDeActivateGeoGraphy(geoItem.geographyId, this.userIdNumber, hirerachyIndex).subscribe({
      next: (res) => {
        if (res.response.result.indexOf("Successfully") != -1) {
          let geoGraphyObj = this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.find(x => x.geographyId == geoItem.geographyId);
          if (geoGraphyObj) {
            geoGraphyObj.isActive = !geoGraphyObj.isActive;
            let geoGraphyIndex = this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.indexOf(geoGraphyObj.geographyId);
            if (geoGraphyIndex != -1) {
              this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.splice(geoGraphyIndex, 1);
              this.removeOtherGeographiesData(hirerachyIndex);
            }

            this.dialog.open(GeoStatusPopComponent, { panelClass: (geoGraphyObj.isActive ? 'activeSuccessPop' : 'deactiveSuccessPop'), data: geoGraphyObj });

          }
        }
        this.spinner.hide();
      },
      error: (e) => {
        console.error(e)
        this.spinner.hide();
      },
    })
  }


  // AddEditGeography(result, hirerachyIndex) {
  //   let obj: any = {};
  //   obj.CompanyId = 1;
  //   obj.GeographyName = result.name;
  //   obj.GeographyCode = result.code;
  //   if (result.id) {
  //     obj.geographyId = result.id;
  //   }

  //   obj.GeographyParentId = this.geoGraphyFullData[hirerachyIndex - 2]?.geographySelected[0]; // Need to GeographyParentId
  //   obj.GeographyHierarchyId = hirerachyIndex;
  //   obj.logedUserId = this.userIdNumber;

  //   console.log(obj);
  //   this.spinner.show();
  //   this.classification.SaveGeography(obj).subscribe({
  //     next: (res) => {
  //       if (res.response.result.indexOf("Succes") != -1 || res.response.result.indexOf("Added") != -1) {
  //         let geoGraphyObj = this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.find(x => x.geographyId == result.id);
  //         if (geoGraphyObj) {
  //           geoGraphyObj.geographyName = result.name;
  //           geoGraphyObj.geographyCode = result.code;
  //         } else {
  //           // Need to updated based on the response success
  //           let temp = { geographyName: result.name, geographyCode: result.code, geographyId: null }
  //           this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.push(temp);
  //         }
  //       }
  //       this.spinner.hide();
  //     },
  //     error: (e) => {
  //       console.error(e)
  //       this.spinner.hide();
  //     },
  //   })
  // }

  //get Country List
  getCountryList() {
    this.classification.getCountryList().subscribe((res) => {
      let data = res.response;
      this.countCountry = res.response.allOtherCountries.length;
      this.CountryList = data.allOtherCountries;
      this.firstCountr = data.firstCountr;
      this.getStateList(data.firstCountr.countryId);
      this.selectedItem = data.firstCountr.countryId;

    })
  }

  //get State List
  getStateList(id: any) {
    localStorage.setItem('countryId', id);
    this.selectedItem = id;
    this.classification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countStates = data.allOtherGeography.length;
      this.stateList = data.allOtherGeography;
      this.stateselectedItem = data.firstGeography.geographyId;
      this.getDistrictList(data.firstGeography.geographyId);

    })
  }

  //get Dist List
  getDistrictList(id: any) {
    this.stateselectedItem = id;
    localStorage.setItem("stateId", id);
    this.classification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countDist = data.allOtherGeography.length;
      this.distList = data.allOtherGeography;
      this.distselectedItem = data.firstGeography.geographyId;
      this.getCityList(data.firstGeography.geographyId);
    })
  }

  //get Dist List
  getCityList(id: any) {
    this.distselectedItem = id;
    localStorage.setItem('distId', id);
    this.classification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countCity = data.allOtherGeography.length;
      this.cityList = data.allOtherGeography;
      this.citySelectedItem = data.firstGeography.geographyId;
      this.getregionList(data.firstGeography.geographyId);
    })
  }

  //get Region List
  getregionList(id: any) {
    this.citySelectedItem = id;
    localStorage.setItem('cityId', id);
    this.classification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countRegion = data.allOtherGeography.length;
      this.regionList = data.allOtherGeography;
      if (data.firstGeography != null) {
        this.regionSelctedItem = data.firstGeography.geographyId;
        this.getAreaList(data.firstGeography.geographyId);
      }

    })
  }

  //get Area List
  getAreaList(id: any) {
    this.regionSelctedItem = id;
    localStorage.setItem('regionId', id);
    this.classification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countArea = data.allOtherGeography.length;
      this.areaList = data.allOtherGeography;
      this.areaselectedItem = data.firstGeography.geographyId;
      this.getSubAreaList(data.firstGeography.geographyId);
    })
  }

  //get sub Area List
  getSubAreaList(id: any) {
    this.areaselectedItem = id;
    localStorage.setItem('areaId', id);
    this.subAreaSelectedItem = id;
    this.classification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countSubArea = data.allOtherGeography.length;
      this.subAreaList = data.allOtherGeography;

    })
  }

  //add conurty and refresh list
  addCountry() {
    let data = {
      "GeographyName": this.countryForm.value['countryFormTag'],
      "GeographyDesc": this.countryForm.value['countryCodeTag'],
      "CreatedById": this.logedUserId
    };

    this.classification.addCountryName(data).subscribe((res) => {
      this.getCountryList();
      this.countryForm.reset();
    })
    this.addCountryButton = false;
  }

  //add state and refresh list
  addState() {
    let data = {
      "GeographyName": this.stateForm.value['stateFormTag'],
      "GeographyDesc": this.stateForm.value['statecodeFormTag'],
      "GeographyParentId": localStorage.getItem('countryId'),
      "CreatedById": this.logedUserId
    };

    this.classification.addStateName(data).subscribe((res) => {
      this.stateForm.reset();
      this.getStateList(localStorage.getItem('countryId'));
    })
    this.addStateButton = false;
  }

  //add dist and refresh list
  addDist() {
    let data = {
      "GeographyName": this.districtForm.value['distirictFormTag'],
      "GeographyDesc": this.districtForm.value['districtcode'],
      "GeographyParentId": localStorage.getItem('stateId'),
      "CreatedById": this.logedUserId
    };

    this.classification.addDistName(data).subscribe((res) => {
      this.districtForm.reset();
      this.getDistrictList(localStorage.getItem("stateId"));
    });
    this.addDistrictButton = false;
  }

  //add city and refresh list
  addCityName() {
    let data = {
      "GeographyName": this.cityForm.value['cityFormTag'],
      "GeographyDesc": this.cityForm.value['citycode'],
      "GeographyParentId": localStorage.getItem('distId'),
      "CreatedById": this.logedUserId
    };

    this.classification.addCityName(data).subscribe((res) => {
      this.cityForm.reset();
      this.getCityList(localStorage.getItem("distId"));
    })

  }

  //add zone and refresh list
  addZoneName() {
    let data = {
      "GeographyName": this.regionForm.value['regionFormTag'],
      "GeographyDesc": this.regionForm.value['regionCode'],
      "GeographyParentId": localStorage.getItem('cityId'),
      "CreatedById": this.logedUserId
    };

    this.classification.addZoneName(data).subscribe((res) => {
      this.regionForm.reset();
      this.getregionList(localStorage.getItem("cityId"));
    })

  }

  //add area and refresh list
  addAreaName() {
    let data = {
      "GeographyName": this.regionAreaForm.value['areaFormTag'],
      "GeographyDesc": this.regionAreaForm.value['areaCode'],
      "GeographyParentId": localStorage.getItem('regionId'),
      "CreatedById": this.logedUserId
    };

    this.classification.addRegionAreaName(data).subscribe((res) => {
      this.regionAreaForm.reset();
      this.getAreaList(localStorage.getItem("regionId"));
    })

  }

  //add subArea and refresh list
  addSubAreaName() {
    let data = {
      "GeographyName": this.subAreaForm.value['subAreaFormTag'],
      "GeographyDesc": this.subAreaForm.value['SubAreaCode'],
      "GeographyParentId": localStorage.getItem('areaId'),
      "CreatedById": this.logedUserId
    };

    this.classification.AddSubArea(data).subscribe((res) => {
      this.subAreaForm.reset();
      this.getSubAreaList(localStorage.getItem("areaId"));
    })

  }

  printvalue(valueofprint: boolean) {
    this.toprint = valueofprint;
  }

  addCountryForm() {
    this.addCountryButton = true;
  }

  addStateForm() {
    this.addStateButton = true;
  }

  addDistrict() {
    this.addDistrictButton = true;
  }

  addCity() {
    this.addCityButton = true;
  }

  addRegionForm() {
    this.addRegionButton = true;
  }

  addAreaForm() {
    this.addAreaButton = true;
  }

  addSubAreaForm() {
    this.addSubAreaButton = true;
  }

  removeSubAreaForm() {
    this.addSubAreaButton = false;
  }

  removeItem(id: any, status: any): void {

    var strName = "";
    if (status === 1) {
      strName = "country";
    }

    if (status === 2) {
      strName = "state";
    }

    if (status === 3) {
      strName = "district";
      this.getCountryList();
    }

    if (status === 4) {
      strName = "city";
    }

    if (status === 5) {
      strName = "region";
    }

    if (status === 6) {
      strName = "area";
    }

    if (status === 7) {
      strName = "subarea";
    }

    if (confirm("Are you sure want to delete " + strName + "!") == true) {
      this.classification.getDeleteListByCountry(id).subscribe((res) => {
        let data = res.response;
        if (status === 1) {
          this.getCountryList();
        }

        if (status === 2) {
          this.getStateList(localStorage.getItem('countryId'));
        }

        if (status === 3) {
          this.getDistrictList(localStorage.getItem("stateId"));
        }

        if (status === 4) {
          this.getCityList(localStorage.getItem("distId"));
        }

        if (status === 5) {
          this.getregionList(localStorage.getItem("cityId"));
        }

        if (status === 6) {
          this.getAreaList(localStorage.getItem("regionId"));
        }

        if (status === 7) {
          this.getSubAreaList(localStorage.getItem("areaId"));
        }
      });

    }

  }

  removemoreFileds() {
    this.addCountryButton = false;
  }

  removeStatemoreFileds() {
    this.addStateButton = false;
  }

  removeDistmoreFileds() {
    this.addDistrictButton = false;
  }

  removeCitymoreFileds() {
    this.addCityButton = true;
  }

  removeregionsMore() {
    this.addRegionButton = false;
  }

  removeareaMore() {
    this.addAreaButton = false;
  }

  createform() {
    this.countryForm = this.fb.group({
      countryFormTag: ["", [Validators.required]],
      countryCodeTag: ["", [Validators.required]],
    });
  }

  stateFormValidators() {
    this.stateForm = this.fb.group({
      stateFormTag: ["", [Validators.required]],
      statecodeFormTag: ["", [Validators.required]],
    });
  }

  districtFormValidator() {
    this.districtForm = this.fb.group({
      distirictFormTag: ["", [Validators.required]],
      districtcode: ["", [Validators.required]],
    });
  }

  regionFormValidator() {
    this.regionForm = this.fb.group({
      regionFormTag: ["", [Validators.required]],
      regionCode: ["", [Validators.required]],
    });
  }

  cityFormValidator() {
    this.cityForm = this.fb.group({
      cityFormTag: ["", [Validators.required]],
      citycode: ["", [Validators.required]],
    });
  }

  areaFormValidator() {
    this.regionAreaForm = this.fb.group({
      areaFormTag: ["", [Validators.required]],
      areaCode: ["", [Validators.required]],
    });
  }

  subAreaFormValidator() {
    this.subAreaForm = this.fb.group({
      subAreaFormTag: ["", [Validators.required]],
      SubAreaCode: ["", [Validators.required]],
    });
  }

}
