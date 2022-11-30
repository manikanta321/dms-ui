import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddOrderPromotionlistComponent } from '../orders/add-order-promotionlist/add-order-promotionlist.component';
import { OrderNonpromotionlistComponent } from '../orders/order-nonpromotionlist/order-nonpromotionlist.component';
import { AddPromotionGeographiesComponent } from '../add-promotions/add-promotion-geographies/add-promotion-geographies.component';

@Component({
  selector: 'app-add-dealer-associations',
  templateUrl: './add-dealer-associations.component.html',
  styleUrls: ['./add-dealer-associations.component.css'],
})
export class AddDealerAssociationsComponent implements OnInit {
  selectedTeam = '';
  selectedDay: string = '';

  dealerInfo = true;
  orderitem = false;
  orderitem1 = true;
  otherInfo = false;
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/minimize-tag.png';

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
  }
  /*-------*/
  countryname: string[] = [
    'Malaysia (71/126)',
    'India (178/178)',
    'Philipines (0/135)',
  ];
  statename: string[] = [
    'Johor(0/42)',
    'Kedah(36/36',
    'Perak(14/26)',
    'Penang(21/22)',
  ];
  regionname: string[] = ['North(4/4)', 'South(8/8)', 'East(6/6)', 'West(3/4)'];
  cityname: string[] = [
    'George town',
    'Balik Pulau',
    'Batu Refringi',
    'Teluk Bahang',
  ];
  AssociationDirection: any[] = ['Product to Dealer', 'Dealer to Product'];
  selectedItem = null;
  addButton: boolean = false;
  dropdownSettings3: IDropdownSettings = {};
  disabled = false;
  toppingList3: any = [];
  toppingList: any = [
    'Product Name12',
    'Product Name2',
    'Product Name3',
    'Product Name4',
  ];

  getgroup: string[] = [
    'Product Name12',
    'Product Name2',
    'Product Name3',
    'Product Name4',
  ];
  buygroup: string[] = [
    'Product Name',
    'Product Name',
    'Product Name',
    'Product Name',
  ];
  CustomerSelect: string[] = [
    'Valiant Distributors',
    'Global Movers',
    'Somebody Sales',
  ];
  screenValue: any = 0;
  myForm: any = FormGroup;
  selectedItems: any = [];
  productDlr: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });

  ngOnInit(): void {
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
    };
    this.myForm = this.fb.group({
      city1: [this.selectedItems],
    });
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
  addCategory() {
    this.addButton = true;
  }

  expandDealerInfoDiv() {
    this.dealerInfo = !this.dealerInfo;

    if (this.dealerInfo === false) {
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
    }
  }

  expandOrderItemsDiv() {
    this.orderitem = !this.orderitem;

    if (this.orderitem === false) {
      this.image2 = 'assets/img/minimize-tag.png';
    } else {
      this.image2 = 'assets/img/maximize-arrow.png';
    }
  }

  expandOrderItemsDiv1() {
    this.orderitem1 = !this.orderitem1;
    if (this.orderitem1 === false) {
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
    }
  }

  expandOtherInfoDiv() {
    this.otherInfo = !this.otherInfo;

    if (this.otherInfo === false) {
      this.image3 = 'assets/img/minimize-tag.png';
    } else {
      this.image3 = 'assets/img/maximize-arrow.png';
    }
  }

  selectedValue(value: any) {
    this.screenValue = value;
  }

  addOrderPromotionList() {
    this.dialog.open(AddOrderPromotionlistComponent, {
      width: '900px',
      height: '460px',
    });
  }

  addOrderNonPromotionList() {
    this.dialog.open(OrderNonpromotionlistComponent, {
      width: '1000px',
      height: '460px',
    });
  }
  geography() {
    this.dialog.open(AddPromotionGeographiesComponent, {
      width: '654px',
      height: '743px',
    });
  }
}
