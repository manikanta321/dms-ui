import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionListService } from 'src/app/services/promotion-list.service';
import { GeographySettingSharedService } from '../services/geography-setting-shared.service';
import { UserService } from '../services/user.service';
import { AddGeolistSuccessPopupComponent } from './add-geolist-success-popup/add-geolist-success-popup.component';

@Component({
  selector: 'app-add-geolist-shipping-popup',
  templateUrl: './add-geolist-shipping-popup.component.html',
  styleUrls: ['./add-geolist-shipping-popup.component.css']
})
export class AddGeolistShippingPopupComponent implements OnInit {
  public packingCharges: any[] = [{
    startvalue: '',
    endvalue: '',
    cost: '',
  }];
  errorMsg: any;
  addCountryButton: boolean = false;
  removelist: boolean = false;
  stateName: string[] = ['State 1', 'State 2',];
  productLisst: any = [];
  product = new FormControl('');
  productSelected: any[] = [];
  promotionSelected: any[] = [];
  geographySelected: any[] = [];
  public rowData5 = [];
  userTypes: any = [];
  productarray: any[] = [];
  myForms: any = FormGroup;
  selectedItems: any = [];
  statusArray: any = [];
  userId: any;
  shippingcost:boolean=false;
  header: any = '';
  heading: any = '';
  uniqe: any;
  addOrAdit: boolean = true;
  dropdownSettings1: IDropdownSettings = {};
  disabled = false;
  subCost:any;

  dropdownList:any = [];
  selectedItems11:any = [];
  dropdownSettings:any = {};
  constructor(
    private promotin: PromotionListService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddGeolistShippingPopupComponent>,
    private sharedService: GeographySettingSharedService,
    private user: UserService,
    private fb: FormBuilder,) { }


    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }

    isDataModified:boolean = false;
  ngOnInit(): void {
    let addOrAdit = localStorage.getItem("addOreditGeoGraphySettings");
    let item = localStorage.getItem('packingChargeOrShipingCharge')
    let uniqe = localStorage.getItem('GeoSettingUniqueKey')
    this.uniqe = localStorage.getItem('GeoSettingUniqueKey')

    
    
    this.dropdownList = [ { "geographyId": 1263, "geographyName": "Bhatkal" } ];
    this.selectedItems11 = [ { "geographyId": 1263, "geographyName": "Bhatkal" } ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'geographyId',
      textField: 'geographyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  

    if (addOrAdit == 'edit') {
      this.addOrAdit = false;
      this.heading = 'Edit Charges'
      if (item == 'shippingCharge') {
        let Data: any = {
          "uniquekey": uniqe,
          "CurrentUserId": this.userId,
          "shipping": true
        }
        this.user.editById(Data).subscribe((res) => {
          console.log(res)
          this.packingCharges = [];
          this.packingCharges = res.response.charges;
          this.myForms = this.fb.group({
            city2: [res.response.geonames]
          });
          this.productSelected = res.response.geonames;
          this.PackingPriceChange();
          // res.response.geonames.forEach(element => {

          //   this.productSelected.push(element.geographyId);

          // })

        })


      } else {
        // this.addOrAdit = true;

        let Data: any = {
          "uniquekey": uniqe,
          "CurrentUserId": this.userId,
          "shipping": false
        }

        this.user.editById(Data).subscribe((res) => {
          this.packingCharges = [];
          this.packingCharges = res.response.charges;
          this.myForms = this.fb.group({
            city2: [res.response.geonames]
          });
          this.productSelected = res.response.geonames;
          // res.response.geonames.forEach(element => {

          //   this.productSelected.push(element.geographyId);

          // })
          this.PackingPriceChange();
        })

      }
    } else {

      this.heading = 'Add Charges'

    }
    this.userId = localStorage.getItem("logInId");

    this.myForms = this.fb.group({
      city2: [this.selectedItems]
    });
    this.product = new FormControl(this.productLisst);
    this.productSelected = [];
    this.promotionSelected = [];
    this.geographySelected = [];
    this.getGeo()

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'geographyId',
      textField: 'geographyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    if (item == 'shippingCharge') {
      this.header = 'Shipping Charge'
      this.subCost = 'Shipping Cost'
    } else {
      this.header = 'Packing Charge'
      this.subCost = 'Packing Cost'
    }

  }

  packingPriceChargeValid:boolean = true;

  PackingPriceChange(){
    this.packingPriceChargeValid = true;
    this.isDataModified = true;
    this.packingCharges.forEach((element, index) => {
      console.log(element);

      if (element.startvalue && element.endvalue && element.cost) {
        element.isDataValid = true;
        if (Number(element.startvalue) > Number(element.endvalue)) {
          element.isDataValid = false;
          this.packingPriceChargeValid = false;
        }
        else if ((this.packingCharges[index - 1] && element.startvalue <= this.packingCharges[index - 1].endvalue)) {
          element.isDataValid = false;
          this.packingPriceChargeValid = false;
        }
      } else {
        element.isDataValid = false;
        this.packingPriceChargeValid = false;
      }

    });
    
  }

  getGeo() {
    this.user.GetGeoDetailsForGeographySettings(this.userId).subscribe((res: any) => {
      this.productLisst = res.response;
      console.log('we have to check here', this.productLisst)
      this.productLisst.forEach(element => {
        return this.statusArray.push(element.geographyId);

      })
      console.log('statusArray', this.statusArray)
      // this.toppingList = res.response;
      

    });
  }
  addCountry() {
    this.addCountryButton = true;
  }
  removesub(index: number) {
     this.packingCharges.splice(index, 1);
     this.PackingPriceChange();
  }
  addFields() {
    this.packingCharges.push({
      startvalue: '',
      endvalue: '',
      cost: '',
    });
  }
  onProductSelect(item: any) {
    this.packingCharges = [{
      startvalue: '',
      endvalue: '',
      cost: '',
    }];;
    // alert(item.roleName)
    this.isDataModified = true;
    this.productSelected.push(item);

    console.log('productSelected', this.productSelected)
  }

  onProductDeSelect(item: any) {
    this.packingCharges = [{
      startvalue: '',
      endvalue: '',
      cost: '',
    }];;
    this.isDataModified = true;
    this.productSelected.forEach((element, index) => {
      if (element.geographyId == item.geographyId) this.productSelected.splice(index, 1);
    });
    console.log(' this.userTypes', this.userTypes)

    // this.userTypes.pop(item.roleId);
    console.log('productSelected', this.productSelected)


  }
  onItemDeSelectOrAllProduct(item: any) {
    this.packingCharges = [{
      startvalue: '',
      endvalue: '',
      cost: '',
    }];;
    this.productSelected = [];
    this.isDataModified = true;
    console.log('productSelected', this.productSelected)

  }
  msg:any
  showMessage: boolean = false;
  finalAddVAlue() {
    let item = localStorage.getItem('packingChargeOrShipingCharge')
    if (item == 'shippingCharge') {
      let data: any = {
        "geographyids": this.productSelected.map(x=> x.geographyId),
        "CurrentUserId": this.userId,
        "AddCharges": this.packingCharges
      }
      this.user.addStockPrice(data).subscribe((res) => {
        if (res.response.status) {
          //  alert(res.response.result);
           if(res.response.result=="Successfully added"){ 
              localStorage.setItem('ShippingPackingCharges', 'ShippingAdded');
              this.dialog.open(AddGeolistSuccessPopupComponent,{ panelClass: 'AddgeoSuccessPopcompoment' });
           }else{
            // alert(res.response.result);
           }
          this.sharedService.filter('Register click');
          this.dialogRef.close();
        } else {
          this.msg=res.response.result
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 5000); 
          //  alert(res.response.result);
        }

      })
      console.log('packingCharges', this.packingCharges)
    } else {

      let data: any = {
        "geographyids": this.productSelected.map(x=> x.geographyId),
        "CurrentUserId": this.userId,
        "AddCharges": this.packingCharges
      }

      this.user.addPackingCharge(data).subscribe((res) => {
        if (res.response.status) {
            // alert(res.response.result);
           if(res.response.result=="Successfully added")
           {
                   localStorage.setItem('ShippingPackingCharges','PackingAdded');
                   this.dialog.open(AddGeolistSuccessPopupComponent,{ panelClass: 'AddgeoSuccessPopcompoment' });
           }
          this.sharedService.filter('Register click');
          this.dialogRef.close();

        } else {
          this.msg=res.response.result
          // alert(res.response.result);
        }

      })
      console.log('packingCharges', this.packingCharges)

    }

  }

  finalAddVAlue1() {


    let item = localStorage.getItem('packingChargeOrShipingCharge')
    if (item == 'shippingCharge') {

      let data: any = {
        'uniquekey': this.uniqe,
        "geographyids": this.productSelected.map(x=> x.geographyId),
        "CurrentUserId": this.userId,
        "AddCharges": this.packingCharges
      }

      this.user.UpdateStockPrice(data).subscribe((res) => {
        if (res.response.status) {
          //  alert(res.response.result);

           if(res.response.result=="succesfully updated")
           {
                   
              localStorage.setItem('ShippingPackingCharges', 'ShippingUpdated');
              this.dialog.open(AddGeolistSuccessPopupComponent,{ panelClass: 'AddgeoSuccessPopcompoment' });
           }
           else
           {
            // alert(res.response.result);
           }
           
         
          this.sharedService.filter('Register click');
          this.dialogRef.close();

        } else {
          // alert(res.response.result);
        }

      })
      console.log('packingCharges', this.packingCharges)
    } else {

      let data: any = {
        'uniquekey': this.uniqe,
        "geographyids": this.productSelected.map(x=> x.geographyId),
        "CurrentUserId": this.userId,
        "AddCharges": this.packingCharges
      }

      this.user.UpdatePackingCharge(data).subscribe((res) => {
        if (res.response.status) { 
            // alert(res.response.result);
          if(res.response.result=="succesfully updated")
           {
                  
                  localStorage.setItem('ShippingPackingCharges','PackingUpdated');
                  this.dialog.open(AddGeolistSuccessPopupComponent,{ panelClass: 'AddgeoSuccessPopcompoment' });
           }
          this.sharedService.filter('Register click');
          this.dialogRef.close();

        } else {
          // alert(res.response.result);
        }

      })
      console.log('packingCharges', this.packingCharges)

    }

  }
  onItemSelectOrAllProduct(item: any) {
    this.productSelected = this.productLisst.slice();
    this.isDataModified = true;
    console.log('productSelected', this.productSelected)

  }

}


