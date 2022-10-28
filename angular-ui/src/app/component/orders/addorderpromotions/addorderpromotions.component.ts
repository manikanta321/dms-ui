import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddOrderPromotionlistComponent } from '../add-order-promotionlist/add-order-promotionlist.component';

@Component({
  selector: 'app-addorderpromotions',
  templateUrl: './addorderpromotions.component.html',
  styleUrls: ['./addorderpromotions.component.css']
})
export class AddorderpromotionsComponent implements OnInit {
  
  selectedTeam = '';
  selectedDay: string = '';

  dealerInfo = true;  
  orderitem = true;
  otherInfo = true;
  image1 = 'assets/img/maximize-arrow.png';
  image2 = 'assets/img/maximize-arrow.png';
  image3 = 'assets/img/maximize-arrow.png';

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
  toppingList3:  any= [];
  getgroup : string[]= ["Product Name","Product Name", "Product Name", "Product Name"]
  buygroup : string[]= ["Product Name","Product Name", "Product Name", "Product Name"];
  CustomerSelect : string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']

  constructor(private _formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  ngOnInit(): void {
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
   addCategory(){
    this.addButton =true;
  }

  expandDealerInfoDiv(){
    this.dealerInfo = !this.dealerInfo;

    if(this.dealerInfo === false){
      this.image1 = 'assets/img/minimize-tag.png';
    } else {
      this.image1 = 'assets/img/maximize-arrow.png';
    }
  }

  expandOrderItemsDiv(){
    this.orderitem = !this.orderitem;

    if(this.orderitem === false){
      this.image2 = 'assets/img/minimize-tag.png';
    } else {
      this.image2 = 'assets/img/maximize-arrow.png';
    }
    
  }

  expandOtherInfoDiv(){
    this.otherInfo = !this.otherInfo;

    if(this.otherInfo === false){
      this.image3 = 'assets/img/minimize-tag.png';
    } else {
      this.image3 = 'assets/img/maximize-arrow.png';
    }
  }

  addOrderPromotionList(){
    this.dialog.open( AddOrderPromotionlistComponent,{width: '900px'});
  }

}
