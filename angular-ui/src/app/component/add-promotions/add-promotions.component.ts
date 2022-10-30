import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.css']
})
export class AddPromotionsComponent implements OnInit, AfterViewInit {
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
  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
     
  }
/*-------*/
  countryname: string[] = ['Malaysia (71/126)', 'India (178/178)','Philipines (0/135)'];
  statename: string[] = ['Johor(0/42)', 'Kedah(36/36','Perak(14/26)','Penang(21/22)'];
  regionname: string[] = ['North(4/4)', 'South(8/8)', 'East(6/6)','West(3/4)'];
  cityname:string[] =['George town','Balik Pulau','Batu Refringi','Teluk Bahang'];
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
 
  constructor(private _formBuilder: FormBuilder) { }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  
/* on Select of Dropdown screen change */

  ngOnInit(): void {
    this.toppingList3 = [
      { CategoryId: 1, CategoryName: 'Buy(A+B..) get(X+Y..)' },
      { CategoryId: 2, CategoryName: 'Buy(A or B +C or D...) get(X+Y or Y+Z..)' },
      { CategoryId: 3, CategoryName: 'Volume Discount' },
      { CategoryId: 4, CategoryName: 'Price Discount' },
         ];
         
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
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings3 = Object.assign({}, this.dropdownSettings3, { allowSearchFilter: this.ShowFilter });
  }

  addCountry() {
    this.addCountryButton = true;
  }
  removesub(uId: number) {
    const index = this.packingCharges.findIndex((address) => address.id === uId);
    this.packingCharges.splice(index, 1);
  }
  addFields() {
    this.packingCharges.push({
      sValue: '',
      eValue: '',
      pValue: '',
    });
  }
}

