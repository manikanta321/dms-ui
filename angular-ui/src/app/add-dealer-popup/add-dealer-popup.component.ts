import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
//import { AddItemsPromotionComponent } from '/add-items-promotion/add-items-promotion.component';
import { FormArray } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedServicesDealerService } from '../services/shared-services-dealer.service';
import { Directive, HostListener, Optional, Output, EventEmitter } from '@angular/core';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-dealer-popup',
  templateUrl: './add-dealer-popup.component.html',
  styleUrls: ['./add-dealer-popup.component.css']
})



// @Directive({
//   selector: '[appOnClickControl]' // if you want to target specific form control then use custom selector else you use can use input:
//                                    // selector: 'input' to target all input elements
// })


export class AddDealerPopupComponent implements OnInit {
  @Output() emitFormControl = new EventEmitter<FormControl>();

  addAddressDetailsForm!: FormGroup;
  gepGraphiesFormGroup!: FormGroup;

  CreatedById: any;
  numberValue: any;
  statusList: any;
  addAddress: boolean = false;
  selectedTeam = '';
  // showDiv = {
  //   previous: false,
  //   current: false,
  //   next: false
  // }
  payloadArray = {
    enabled: false
  }
  errorMsg: any;
  addCountryButton: boolean = false;

  basicInfo: boolean = false;
  basi: boolean=true;

  

  

  removelist: boolean = false;



  CountryList: any = [];
  stateList: any = [];
  distList: any = [];
  cityList: any = [];
  dataGetById: any = {};
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
  showDiv: boolean = false
  stateName: any;
  CountryName: any;

  selectedItem = null;
  totalStepsCount: number | undefined;
  districtName: any;
  customerIDofDealer:any;
  dealerAction: any;
  addType: any;
  selectedItems:any=[];
  geoGraphyHirerachyData: any;
  geoGraphyFullData: any;
  userId:any;
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
  selectedHirerachyIndex: number = 0;

  // CategoryName:any;
  getgroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"]
  buygroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"];
  CustomerSelect: string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private spinner: NgxSpinnerService,
    private user: UserService,
    @Optional() private formControl: NgControl,
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
    this.CreatedById = localStorage.getItem("logInId");
    this.CreatedById = Number(this.CreatedById);
    this.statusForm();
    //geographies List
    this.getGeographyHierarchy();
    if (localStorage.getItem('edit-dealer') === 'Edit') {
      this.dealerAction = "Edit"
      let customerId = localStorage.getItem('customerIdOfDealer');
      this.customerIDofDealer = localStorage.getItem('customerIdOfDealer');


      this.calssification.getDealerDetailsById(customerId).subscribe((res) => {

        let data = res.response[0]
       let editdealerGeo=data.selectedGeos
        console.log('customerIdOfDealer', data) 

                      this.userId= data.userId


        // editdealerGeo.forEach(element => {
        //   debugger
        //   return this.selectedItems.push(element.geographyId);
          
    
        // })   
console.log('selectedItemsselectedItems',this.selectedItems)
        for (let detail of res.response[0].addresscount) {
          // alert(detail.taxCodeName)
          let AddressTypeId: FormControl = new FormControl('');
          let ConsigneeName: FormControl = new FormControl('');
          let Taxid: FormControl = new FormControl('');
          let AddressLine1: FormControl = new FormControl('');
          let AddressLine2: FormControl = new FormControl('');
          let CountryName: FormControl = new FormControl('');
          let StateName: FormControl = new FormControl('');
          let CityName: FormControl = new FormControl('');
          let ZipCode: FormControl = new FormControl('');
          let Telephone: FormControl = new FormControl('');
          let addressAssociationId: FormControl = new FormControl('');

          AddressTypeId.setValue(detail?.addressTypeId)
          ConsigneeName.setValue(detail?.consigneeName);
          Taxid.setValue(detail?.taxid);
          AddressLine1.setValue(detail?.addressLine1);
          AddressLine2.setValue(detail?.addressLine2);
          CountryName.setValue(detail?.countryName);
          StateName.setValue(detail?.stateName);
          CityName.setValue(detail?.cityName);
          ZipCode.setValue(detail?.zipCode);
          Telephone.setValue(detail?.telephone);
          addressAssociationId.setValue(detail?.addressAssociationId);
          

          this.getFormArray().push(new FormGroup({
            AddressTypeId: AddressTypeId,
            ConsigneeName: ConsigneeName,
            Taxid: Taxid,
            AddressLine1: AddressLine1,
            AddressLine2: AddressLine2,
            CountryName: CountryName,
            StateName: StateName,
            CityName: CityName,
            ZipCode: ZipCode,
            Telephone: Telephone,
            AddressId:addressAssociationId
          }));

          console.log('ConsigneeName', this.getFormArray())
          this.addAddressDetailsForm.patchValue({
            CustomerName: data?.customerName,
            Email: data?.email,
            Code: data?.customerCode,
            website: data?.website,
            Phoneno: data?.mobilePhone,
            company_id: data?.company_id,
            OtherIdentifier:data?.otherIdentifier,
            UserName: data?.userName, 
            EmailId: data?.emailId,
            Mobile: data?.telephone1, 
            FirstName: data?.firstName,
            lastName: data?.lastName,
            StatusId: data?.user_StatusId,


          });
          // this.addAddressDetailsForm = this._formBuilder.group({
          

          // });
        }

        console.log('this.getFormArray', this.getFormArray)
      })
      this.getGeographyForMaterial(0, this.customerIDofDealer);
    } else {
       this.dealerAction = ""
      this.addAddressForm1('7');
      this.addAddressForm1('6');
      this.getGeographyForMaterial(0, 0);

    }
    //  this.ConsigneeName2='';
  }
  getFormArray(): FormArray {
    return this.addAddressDetailsForm.get('addresscount') as FormArray;
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

  stockItemId: any;

  geographyFormat(currentObj, stockItemId) {
    // console.log(currentObj["hirearchyLevel"]);
    if (!Array.isArray(currentObj)) {
      if (!currentObj.all) return;
      let obj: any = {};
      let index = (Number(currentObj["hirearchyLevel"]) - 1);
      obj.allOtherGeography = currentObj.all;
      obj.geographyCount = obj.allOtherGeography.length;
      obj.showAddIcon = false;
      obj.geographyHierarchyName = currentObj.hirearchyName;
      if (currentObj.first) {
        let copyObject = JSON.parse(JSON.stringify(currentObj.first));
        delete copyObject.next;
        obj.geographySelected = [copyObject];
        obj.geoProperties = [this.CreateGeoPropertiesObject({ geographyName: copyObject.geographyName, geographyId: copyObject.geographyId })];
      }
      this.removeOtherGeographiesData(Number(currentObj["hirearchyLevel"]));
      this.geoGraphyFullData[index] = obj;
      this.selectedHirerachyIndex = index;
      if (currentObj.first.next) {
        this.geographyFormat(currentObj.first.next, stockItemId);
      }
    } else {
      // For the final defaulted value to append in geography view
      let objDefaut: any = {}
      objDefaut.allOtherGeography = currentObj;

      objDefaut.geoProperties = [];
      objDefaut.geographyNamesSelected = [];
      // Need to check on different conditions
      if (this.dataGetById && this.dataGetById.productGeographys && this.dataGetById.productGeographys.length != 0) {
        this.dataGetById.productGeographys.forEach(item => {
          let selectedCity = currentObj.find(x => x.geographyId == item.geographyId);
          if(selectedCity){
            objDefaut.geoProperties.push(this.CreateGeoPropertiesObject(item));
            selectedCity.isSelected = true;
          }
        })
        objDefaut.geographySelected = currentObj.filter(x => x.isSelected);
      }else{
        objDefaut.geographySelected = currentObj.filter(x => x.isSelected);
        objDefaut.geographySelected.map(x => {
          objDefaut.geoProperties.push(this.CreateGeoPropertiesObject({ geographyName: x.geographyName, geographyId: x.geographyId }));
        })
      }
      
      objDefaut.geographyHierarchyName = "City";
      if (objDefaut.geographySelected.length != 0) {
        this.selectedHirerachyIndex = currentObj[0].geographyHierarchyId - 1;
      }

      
      this.removeOtherGeographiesData(currentObj[0].geographyHierarchyId);
      this.geoGraphyFullData[currentObj[0].geographyHierarchyId - 1] = objDefaut;
    }
  }

  isItemSelected(item, geoItem) {
    // console.log(item.geographySelected, geoItem.geographyId)
    return item.geographySelected.findIndex(x => x.geographyId == geoItem.geographyId) == -1;
  }

  CreateGeoPropertiesObject(propertyObj) {
    let obj: any = {};
    obj.minOrderQty = propertyObj.minOrderQty ?? "";
    obj.discountPercent = propertyObj.discountPercent ?? "";
    obj.maxOrderQty = propertyObj.maxOrderQty ?? "";
    obj.marginPercent = propertyObj.marginPercent ?? "";
    obj.mrp = propertyObj.mrp ?? "";
    obj.leadTime = propertyObj.leadTime ?? "";
    obj.geographyId = propertyObj.geographyId ?? "";
    obj.geographyName = propertyObj.geographyName ?? "";
    obj.registrationNumber = propertyObj.registrationNumber ?? "";
    return obj;
  }



  selectGeoGraphy(clickedItem, hirerachyIndex,) {
    this.selectedItems=[];
    this.showDiv = true;
    this.selectedHirerachyIndex = (hirerachyIndex - 1);
    this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.forEach(element => {
      if (element.geographyId == clickedItem.geographyId) {
        let index = this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.findIndex(x => x.geographyId == element.geographyId);
        if (index == -1) {
          if (hirerachyIndex == this.geoGraphyFullData.length) {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.push(element);
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.push(element);
            this.geoGraphyFullData[hirerachyIndex - 1].geoProperties.push(this.CreateGeoPropertiesObject({ geographyName: element.geographyName, geographyId: element.geographyId }))
          } else {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [element];
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [element.geographyName];
            this.getGeographyForMaterial(element.geographyId, this.stockItemId);
            this.geoGraphyFullData[hirerachyIndex - 1].geoProperties = [this.CreateGeoPropertiesObject({ geographyName: element.geographyName, geographyId: element.geographyId })];
            // this.getGeographiesDataById(element.geographyId, (hirerachyIndex + 1));
            this.removeOtherGeographiesData(hirerachyIndex);
          }
        } else {
          this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.splice(index, 1);
          this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.splice(index, 1);
          this.geoGraphyFullData[hirerachyIndex - 1].geoProperties.splice(index, 1);
          this.removeOtherGeographiesData(hirerachyIndex);
        }
      }


    });



    if (hirerachyIndex == 1) {
      let Country = clickedItem.geographyName;
      let countryCode = clickedItem.geographyCode;
      this.CountryName = Country + "(" + countryCode + ")";
      console.log("CountryNAme", this.CountryName);
      console.log(clickedItem, hirerachyIndex);
    }
    else if (hirerachyIndex == 2) {
      let stateNamee = clickedItem.geographyName;
      let stateCode = clickedItem.geographyCode;
      this.stateName = stateNamee + "(" + stateCode + ")";
    }
    else if (hirerachyIndex == 3) {
      let districtNamee = clickedItem.geographyName;
      let districtCode = clickedItem.geographyCode;
      this.districtName = districtNamee + "(" + districtCode + ")";
    }
    else if (hirerachyIndex == 4) {

      // this.geoPropertiesList = this.CreatePropertiesObject({});


      // this.cityCode = this.geoGraphyFullData[this.geoGraphyFullData.length - 1].geographyCode;
      // this.cityName = [...this.selectedGeographiesCityNames,]
      // this.selectedGeographiesCityNames+"("+ this.cityCode+")";

      // console.log(this.selectedGeographiesCityNames, "selectedGeographies")
    }

    console.log(this.geoGraphyFullData);
  }

  getGeographyForMaterial(geographyId, stockItemId) {
    this.spinner.show();

    this.stockItemId = stockItemId;
    let data={
      
        "GeographyId":geographyId,
        "DealerId":stockItemId
    
    }
    this.classification.getGeographyForDealers(geographyId, stockItemId).subscribe(res => {
      // console.log(res);
      this.spinner.hide();
      this.geoGraphyHirerachyData = JSON.parse(JSON.stringify(res.response));
      this.geographyFormat(res.response, stockItemId);
      console.log(this.geoGraphyFullData);

      // this.getGeographiesDataById(null, 1);
    }, err => {
      console.log(err);
      this.spinner.hide();
    })
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
    this.basi=false;
  
    
    
  }
  goBack(stepper: MatStepper)
  {
   this.myStepper.previous();
  
  this.basicInfo=false;
    

    
  


   
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




  removeQuantity(i) {
    console.log(i)
    if (i >= 2) {
      this.addresscount().removeAt(i);
    }
  }

  @HostListener('click')
  getFormControl(): void {
      this.emitFormControl.emit(this.formControl.control as FormControl);
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
    selectedGeographies.forEach(element => {
      return this.selectedItems.push(element.geographyId);

    })   
     let data2 = {
      DefalultgeoId: this.selectedItems,
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
    let data3 = {
      CreatedById: this.CreatedById
    }

    let data = Object.assign(this.addAddressDetailsForm.value, data2, data3)

    console.log(data);

    this.calssification.addDealerData(data).subscribe((res) => {

      if (res.response.result == "Succesfully added") {
        this.dialogRef.close();
        this.sharedService.filter('Register click')

      }
      console.log(res);
    });

  }







  EditGeographiesList() {
    let selectedGeographies = this.geoGraphyFullData[this.geoGraphyFullData.length - 1].geographySelected;
    selectedGeographies.forEach(element => {

  

      return this.selectedItems.push(element.geographyId);

    })   
     let data2 = {
      DefalultgeoId: this.selectedItems,
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
    let data3 = {
      CreatedById: this.CreatedById
    }
    let data4 = {
      customerId: this.customerIDofDealer
    }
let data5={
  userId:this.userId
}
    let data = Object.assign(this.addAddressDetailsForm.value, data2,  data3, data4,data5)

    console.log(data);

    this.calssification.addDealerData(data).subscribe((res) => {

      if (res.response.result == "Succesfully updated") {
        this.dialogRef.close();
        this.sharedService.filter('Register click')

      }
      console.log(res);
    });

  }


}
