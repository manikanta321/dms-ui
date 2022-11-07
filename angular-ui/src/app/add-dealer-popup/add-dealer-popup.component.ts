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
  showDiv = {
    previous : false,
    current : false,
    next : false
  }
  payloadArray={
    enabled:false
  }
  errorMsg: any;
  addCountryButton: boolean = false;

  basicInfo:boolean=false;

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

  selectedItem = null;
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

  ngOnInit(): void {
    this.LoginId=localStorage.getItem("logInId");
    this.numberValue = Number(this.LoginId);
     this.addAddressForm();
     this.statusForm();
     //geographies List
     this.getCountryList();

  }

  //status dropdownlist
  statusForm(){
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

  disableBackbutton(){
       this.goForward(this.myStepper);
      this.basicInfo=true;
      // alert(this.basicInfo);
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
      console.log(this.addAddressDetailsForm.value);
      this.calssification.addDealerData(this.addAddressDetailsForm.value).subscribe((res)=>{
          console.log(res);
      });  
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
