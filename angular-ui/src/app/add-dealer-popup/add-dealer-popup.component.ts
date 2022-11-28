import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
//import { AddItemsPromotionComponent } from '/add-items-promotion/add-items-promotion.component';
import { FormArray } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedServicesDealerService } from '../services/shared-services-dealer.service';

//import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-dealer-popup',
  templateUrl: './add-dealer-popup.component.html',
  styleUrls: ['./add-dealer-popup.component.css']
})
export class AddDealerPopupComponent implements OnInit {

  addAddressDetailsForm!: FormGroup;
  gepGraphiesFormGroup!: FormGroup;

  CreatedById: any;
  numberValue: any;
  statusList: any;
  addAddress: boolean = false;
  selectedTeam = '';
  showDiv = {
    previous: false,
    current: false,
    next: false
  }
  payloadArray = {
    enabled: false
  }
  errorMsg: any;
  addCountryButton: boolean = false;

  basicInfo: boolean = false;

  removelist: boolean = false;
  stateName: string[] = ['State 1', 'State 2',];



  CountryList: any = [];
  stateList: any = [];
  distList: any = [];
  cityList: any = [];

  catagoryroouting = '';
  subcatRoouting = '';
  selectedtypeItem = '';
  subcatcount = '';
  typecount = '';
  ConsigneeName1: any;
  ConsigneeName2: any;
  stateselectedItem: any;
  distselectedItem: any;
  citySelectedItem: any;

  selectedItem = null;
  totalStepsCount: number | undefined;

  dealerAction: any;
  addType: any;
  geoGraphyHirerachyData: any;
  geoGraphyFullData: any;
  // geoGraphyFullData1: any;
  geographyHierarchyId: any;
  aarrayToPush: any[] = [];
  css: any[] = [];

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



  @ViewChild('stepper') private myStepper: MatStepper | any;

  // CategoryName:any;
  getgroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"]
  buygroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"];
  CustomerSelect: string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private spinner: NgxSpinnerService,
    private user: UserService,
    private classification: ClassificationserviseService,
    private calssification: ClassificationserviseService,
    private sharedService: SharedServicesDealerService,

    //private toastrService: ToastrService,
    private dialogRef: MatDialogRef<any>) {
    this.formReader();
  }


  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });

  ngOnInit(): void {
    this.CreatedById= localStorage.getItem("logInId");
    this.CreatedById= Number(this.CreatedById);
    this.addAddressForm1('6');
    this.addAddressForm1('7');

    this.statusForm();
    //geographies List
    this.getGeographyHierarchy();
    if (localStorage.getItem('edit-dealer') === 'Edit') {
      this.dealerAction = "Edit"
    } else {
      this.dealerAction = "Add"
    }
    //  this.ConsigneeName2='';
  }




  getGeographyHierarchy() {
    this.spinner.show();
    this.geoGraphyHirerachyData = null;
    this.classification.getGeographyHierarchy().subscribe(res => {
      // console.log(res);
      this.spinner.hide();
      this.geoGraphyHirerachyData = res.response;

      console.log('geoGraphyHirerachyData', this.geoGraphyHirerachyData);


      this.geoGraphyFullData = JSON.parse(JSON.stringify(res.response));
      console.log('geoGraphyFullData', this.geoGraphyFullData);
      const hdata = this.geoGraphyFullData.find(a => a.primaryGeographyAssociation == 'Y');

      console.log('hdata', hdata)

      this.geographyHierarchyId = hdata.geographyHierarchyId
      const data = this.geoGraphyFullData.findIndex(a => a.primaryGeographyAssociation == 'Y');
      this.geoGraphyFullData = this.geoGraphyFullData.slice(0, data + 1)

      console.log('data to console1', this.geoGraphyFullData.slice(0, data + 1))


      console.log('geoGraphyFullData', this.geoGraphyFullData);

      this.getGeographiesDataById(null, 1);
    }, err => {
      console.log(err);
      this.spinner.hide();
    })

  }


  selectGeoGraphy(clickedItem, hirerachyIndex,) {

    console.log(clickedItem, hirerachyIndex);


    // if (this.geographyHierarchyId == hirerachyIndex) {
    //   this.css.push(clickedItem)

    //   const index = this.aarrayToPush.indexOf(clickedItem.geographyId);

    //   if (index !== -1) {
    //     this.aarrayToPush.splice(index, 1);
    //   }
    //   else {
    //     this.aarrayToPush.push(clickedItem.geographyId);

    //   }

    //   console.log('aarrayToPush', this.aarrayToPush)
    // }
    // else {
    //   this.aarrayToPush = []
    // }

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
    console.log(this.geoGraphyFullData);
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


  //status dropdownlist
  onKeyName(event) {
    this.ConsigneeName1 = event.target.value;
  }
  Checked() {
    this.ConsigneeName2 = this.ConsigneeName1;
  }
  statusForm() {
    this.user.getstatusDeatils().subscribe((res: any) => {
      this.statusList = res.response;
    })
  }


  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  disableBackbutton() {
    this.goForward(this.myStepper);
    this.basicInfo = true;
    // alert(this.basicInfo);
  }





  getCategory(event: any) {
    if (event.CategoryName == 'Buy(A+B..) get(X+Y..)') {
      this.goForward(this.myStepper);
    }
    if (event.CategoryName == 'Price Discount') {
      this.goForward(this.myStepper);
    }
    if (event.CategoryName == 'Volume Discount') {
      this.goForward(this.myStepper);
    }
  }


  addresscount(): FormArray {
    return this.addAddressDetailsForm.controls["addresscount"] as FormArray
  }

  initAddress(defaultType): FormGroup {
    defaultType = defaultType ?? '';
    console.log(defaultType);
    return this._formBuilder.group({
      AddressTypeId: [defaultType, [Validators.required]],
      ConsigneeName: ['', [Validators.required]],
      Taxid: ['', [Validators.required]],
      AddressLine1: ['', [Validators.required]],
      AddressLine2: ['', [Validators.required]],
      CountryName: ['', [Validators.required]],
      StateName: ['', [Validators.required]],
      CityName: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      Telephone: ['', [Validators.required]],
    })
  }

  addAddressForm() {
    this.addAddress = true;
    this.addresscount().push(this.initAddress(''));
  }

  addAddressForm1(defaultType) {
    // this.addType = 1;

    this.addAddress = true;
    this.addresscount().push(this.initAddress(defaultType));
  }




  removeQuantity(i: number) {
    if (i >= 2) {
      this.addresscount().removeAt(i);
    }
  }


  saveDealerData() {
    this.goForward(this.myStepper);
    console.log(this.addAddressDetailsForm.value);
  }


  


  formReader() {
    this.addAddressDetailsForm = this._formBuilder.group({
      CustomerName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Code: ['', [Validators.required]],
      website: ['', [Validators.required]],
      Phoneno: ['', [Validators.required]],
      company_id: ['', [Validators.required]],
      OtherIdentifier: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      StatusId: ['', [Validators.required]],
      addresscount: this._formBuilder.array([]),
    });
  }

  //get Country List  - geographies
  getCountryList() {

    this.calssification.getCountryList().subscribe((res) => {
      let data = res.response;
      this.CountryList = data.allOtherCountries;
      this.getStateList(data.firstCountr.countryId);
      this.selectedItem = data.firstCountr.countryId;

    })
  }

  //get State List
  getStateList(id: any) {
    this.stateList.length = 0;
    this.distList.length = 0;
    this.cityList.length = 0;

    localStorage.setItem('cityId', '');
    localStorage.setItem("stateId", '');
    localStorage.setItem('distId', '');

    localStorage.setItem('countryId', id);
    this.selectedItem = id;
    this.calssification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.stateList = data.allOtherGeography;
      this.stateselectedItem = data.firstGeography.geographyId;
      this.getDistrictList(data.firstGeography.geographyId)


    })
  }

  //get Dist List
  getDistrictList(id: any) {
    this.cityList.length = 0;
    localStorage.setItem('cityId', '');
    localStorage.setItem('distId', '');
    this.stateselectedItem = id;
    localStorage.setItem("stateId", id);
    this.calssification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.distList = data.allOtherGeography;
      this.distselectedItem = data.firstGeography.geographyId;
      this.getCityList(data.firstGeography.geographyId);
    })
  }

  //get Dist List
  getCityList(id: any) {

    this.distselectedItem = id;
    localStorage.setItem('distId', id);
    this.calssification.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.cityList = data.allOtherGeography;
      this.citySelectedItem = data.firstGeography.geographyId;
      this.getSelectedCity(data.firstGeography.geographyId);
    })
  }

  getSelectedCity(id: any) {
    localStorage.setItem('cityId', id);
    this.citySelectedItem = id;
  }

  saveGeographiesList() {

    

    let selectedGeographies = this.geoGraphyFullData[this.geoGraphyFullData.length - 1].geographySelected;
    let data2={
      DefalultgeoId:selectedGeographies,
    }
    if (selectedGeographies.length == 0) {
      alert("Please select default geography grid");
      return;
    }
    console.log(selectedGeographies);
    // let countrydata = {
    //   "CountryId": localStorage.getItem('countryId'),
    //   "StateId": localStorage.getItem('stateId'),
    //   "RegionId": localStorage.getItem('distId'),
    //   "CityId": localStorage.getItem('cityId'),
    //   "CreatedById": this.LoginId
    // };
    let data3={
      CreatedById:this.CreatedById
    }

    let data = Object.assign(this.addAddressDetailsForm.value,data2, data3)

    console.log(data);

    this.calssification.addDealerData(data).subscribe((res) => {

      if(res.response.result=="Succesfully added"){
        this.dialogRef.close();
        this.sharedService.filter('Register click')

      }
      console.log(res);
    });

  }



}
