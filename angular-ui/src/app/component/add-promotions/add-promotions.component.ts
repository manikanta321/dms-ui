import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.css']
})
export class AddPromotionsComponent implements OnInit {
  selectedTeam = '';
  selectedDay: string = '';

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
  }
/*-------*/


  dropdownSettings3: IDropdownSettings = {};
  disabled = false;
  toppingList3:  any= [];
  getgroup : string[]= ["Product Name","Product Name", "Product Name", "Product Name"]
  buygroup : string[]= ["Product Name","Product Name", "Product Name", "Product Name"];
  CustomerSelect : string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']
 
  constructor(private _formBuilder: FormBuilder) { }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  
/* on Select of Dropdown screen change */

  ngOnInit(): void {
  }
  onTypeSelect(item: any) {
    console.log(item);
  }
  onTypeAll(items: any) {
    console.log('onSelectAll', items);
  }
}
