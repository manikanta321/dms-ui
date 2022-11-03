import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
//import { AddItemsPromotionComponent } from '/add-items-promotion/add-items-promotion.component';
import { FormArray } from '@angular/forms' 
import { UserService } from 'src/app/services/user.service';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
//import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-dealer-popup',
  templateUrl: './add-dealer-popup.component.html',
  styleUrls: ['./add-dealer-popup.component.css']
})
export class AddDealerPopupComponent implements OnInit {

  addAddressDetailsForm!: FormGroup;
  gepGraphiesFormGroup!: FormGroup;

  LoginId:any;
  numberValue:any;
  statusList:any;

  selectedTeam = '';
  selectedDay: string = '';
  showDiv = {
    previous : false,
    current : false,
    next : false
  }
  showdata=false;
  public packingCharges: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  errorMsg: any;
  addCountryButton: boolean = false;
  removelist: boolean = false;
  stateName: string[] = ['State 1', 'State 2',];


  CountryList:any=[];
  stateList: any=[];
  distList:any=[];
  cityList:any=[];

  catagoryroouting='';
  subcatRoouting='';
  selectedtypeItem='';
  subcatcount='';
  typecount='';

  stateselectedItem:any;
  distselectedItem:any;
  citySelectedItem:any;




  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
     
  }
/*-------*/

  selectedItem = null;
  addButton:boolean =false;
  dropdownSettings3: IDropdownSettings = {};
  disabled = false;
  promotionlist: any[] | undefined;
  toppingList3:  any= [];
  ShowFilter = false;
  totalStepsCount: number | undefined;

  @ViewChild('stepper') private myStepper: MatStepper | any;
  
  // CategoryName:any;
  getgroup : string[]= ["Product Name","Product Name", "Product Name", "Product Name"]
  buygroup : string[]= ["Product Name","Product Name", "Product Name", "Product Name"];
  CustomerSelect : string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']
 
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private user: UserService,
    private calssification:ClassificationserviseService,
    //private toastrService: ToastrService,
    private dialogRef: MatDialogRef<any>) {
      

      this.formReader();
     
     }

     
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  
/* on Select of Dropdown screen change */

  ngOnInit(): void {
    this.LoginId=localStorage.getItem("logInId");
    this.numberValue = Number(this.LoginId);
     this.addAddressForm();
     this.statusForm();

     //geographies List
     this.getCountryList();

  }

  statusForm(){
    this.user.getstatusDeatils().subscribe((res: any) => {
        this.statusList = res.response;
    })
  }

  onTypeSelect(item: any) {
    console.log(item);
  }

  onTypeAll(items: any) {
    console.log('onSelectAll', items);
  }

  onClick(item) {
    this.selectedItem = item;
  }

  displaydata(){
    this.showdata=true;
  }

  hidedata(){
    this.showdata=false;
  }

  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  getCategory(event: any){
    if (event.CategoryName=='Buy(A+B..) get(X+Y..)'){
      this.goForward(this.myStepper);
      }
      if (event.CategoryName=='Price Discount'){
        this.goForward(this.myStepper);
        }
        if (event.CategoryName=='Volume Discount'){
          this.goForward(this.myStepper);
          }
    }
    // alert(event.CategoryName);
  
  addCategory(){
    this.addButton =true;
  }

  toogleShowFilter(){
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings3 = Object.assign({}, this.dropdownSettings3, { allowSearchFilter: this.ShowFilter });
  }

  addCountry(){
    this.addCountryButton = true;
  }

  removesub(uId: number) {
    const index = this.packingCharges.findIndex((address) => address.id === uId);
    this.packingCharges.splice(index, 1);
  }

  addFields(){
    this.packingCharges.push({
      sValue: '',
      eValue: '',
      pValue: '',
    });
  }

  quantities(): FormArray {  
    return this.addAddressDetailsForm.controls["quantities"] as FormArray  
  }  
     
  initAddress(): FormGroup {  
    return this._formBuilder.group({  
      addType:['',[Validators.required]], 
      consigName:['',[Validators.required]],
      tax: ['',[Validators.required]],
      addressLine: ['',[Validators.required]],
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      cityAndZip: ['',[Validators.required]],
      phoneNo: ['',[Validators.required]],  
    })  
  }  
     
  addAddressForm() {  
    this.quantities().push(this.initAddress());  
  }  

 

  removeQuantity(i:number) {
    
    if( i >= 1){
      this.quantities().removeAt(i);  
    }
    
  }  


  saveDealerData(){
   
    for(let i=0;i<this.quantities().length;i++){

      console.log(this.quantities().value[i].consigName)

    let data = {
      "CustomerName":this.addAddressDetailsForm.value['dealerName'],
      "Email":this.addAddressDetailsForm.value['email'],
      "Code":this.addAddressDetailsForm.value['dealerCode'],
      "Website":this.addAddressDetailsForm.value['website'],
      "Phoneno":this.addAddressDetailsForm.value['phone'],
      "CompanyId":parseInt(this.addAddressDetailsForm.value['companyId']),
      "OtherIdentifier":this.addAddressDetailsForm.value['identifier'],
      "UserName":this.addAddressDetailsForm.value['userName'],
      "EmailId":this.addAddressDetailsForm.value['userEmail'],
      "Mobile":this.addAddressDetailsForm.value['usermobile'],
      "FirstName":this.addAddressDetailsForm.value['firstName'],
      "LastName":this.addAddressDetailsForm.value['lastName'],
      "StatusId":parseInt(this.addAddressDetailsForm.value['status']),
      "AddressTypeId":parseInt(this.quantities().value[i].addType),
      "ConsigneeName":this.quantities().value[i].consigName,
      "Taxid":parseInt(this.quantities().value[i].tax),
      "AddressLine1":this.quantities().value[i].addressLine,
       "AddressLine2":this.quantities().value[i].addressLine,
      "CountryName":this.quantities().value[i].country,
      "StateName":this.quantities().value[i].state,
      "CityName":this.quantities().value[i].cityAndZip,
      "ZipCode": this.quantities().value[i].cityAndZip,
      "Telephone":this.quantities().value[i].phoneNo,
      "CreatedById":this.LoginId
      };

      this.calssification.addDealerData(data).subscribe((res)=>{
      
      })  

    }
     
     
  }

 
  formReader(){
    this.addAddressDetailsForm = this._formBuilder.group({  
      dealerName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dealerCode:['', [Validators.required]],
      website: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      companyId: ['', [Validators.required]],
      identifier: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      userEmail:['', [Validators.required]],
      usermobile: ['', [Validators.required]],
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      status: ['', [Validators.required]],
      quantities: this._formBuilder.array([]) ,  
    });  
  }

  //get Country List  - geographies
  getCountryList(){
    
    this.calssification.getCountryList().subscribe((res)=>{
          let data=res.response;
          this.CountryList=data.allOtherCountries;
          this.getStateList(data.firstCountr.countryId);
          this.selectedItem=data.firstCountr.countryId;
           
        })  
  }

  //get State List
  getStateList(id:any){
    this.stateList.length = 0;
    this.distList.length = 0;
    this.cityList.length = 0;

    localStorage.setItem('cityId','');
    localStorage.setItem("stateId",'');
    localStorage.setItem('distId','');

    localStorage.setItem('countryId',id);
    this.selectedItem= id;
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.stateList=data.allOtherGeography;
          this.stateselectedItem = data.firstGeography.geographyId;
           this.getDistrictList(data.firstGeography.geographyId)
    

        })
  }

  //get Dist List
  getDistrictList(id:any){
    this.cityList.length = 0;
    localStorage.setItem('cityId','');
    localStorage.setItem('distId','');
    this.stateselectedItem = id;
    localStorage.setItem("stateId",id);
    this.calssification.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
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
          this.cityList=data.allOtherGeography;
          this.citySelectedItem = data.firstGeography.geographyId;
          this.getSelectedCity(data.firstGeography.geographyId);
        })
  }

  getSelectedCity(id:any){
    localStorage.setItem('cityId',id);
    this.citySelectedItem = id;
  }

  saveGeographiesList(){

    let data = {
      "country":localStorage.getItem('countryId'),
      "state":localStorage.getItem('stateId'),
      "dist":localStorage.getItem('distId'),
      "city":localStorage.getItem('cityId'),
      "CreatedById":this.LoginId
      };

      console.log(data);

    // this.calssification.addCityName(data).subscribe((res)=>{
    //       this.getCityList(localStorage.getItem("distId"));
    // })

  }



}
