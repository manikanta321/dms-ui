import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddOrderPromotionlistComponent } from '../add-order-promotionlist/add-order-promotionlist.component';
// import { OrderNonpromotionlistComponent } from '../order-nonpromotionlist/order-nonpromotionlist.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { MaterialListService } from 'src/app/services/material-list.service';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { GridApi } from 'ag-grid-community';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { ConsoleEventLogger } from '@generic-ui/hermes/core/infrastructure/logger/event/console.event.logger';
import { AssosiationServicesService } from 'src/app/services/assosiation-services.service';
import { SharedServiceMaterialListService } from 'src/app/services/shared-service-material-list.service';
@Component({
  selector: 'app-addorderpromotions',
  templateUrl: './addorderpromotions.component.html',
  styleUrls: ['./addorderpromotions.component.css']
})
export class AddorderpromotionsComponent implements OnInit {

  selectedTeam = '';
  selectedDay: string = '';
  Taxid: any = [];
  stockItemId: any = [];
  Quantity: any = [];
  dealerInfo = false;
  orderitem = false;
  otherInfo = false;
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/minimize-tag.png';
  buygroupromo: any;
  actineLabel: any;
  updateOrSave: boolean = false
  editData: boolean = false;
  // non_promotins
  orderNonPromotionsdata: any = [];
  taxdropdowndata: any = [];
  // buyGroup : any = [{proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'},
  // {proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'},
  // {proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'}]

  dropdownSettingscat: IDropdownSettings = {};
  dropdownSettingssubcat: IDropdownSettings = {};
  dropdownSettingstypeid: IDropdownSettings = {};
  dropdownSettingsmaterialid: IDropdownSettings = {};
  countCatagory: any;
  catagoryData: any;
  toppings: any = [];
  categoryMapData: any = [];
  categoryArray: any = [];
  catergory: any = [];
  flag: boolean = true;
  ShowFilter = false;
  Non_promotions: boolean = false;
  private gridApi!: GridApi;
  promoList = true;
  myForms!: FormGroup;
  categoryForm: any = FormGroup;
  subcategoryForm: any = FormGroup;
  subCategoryFilter = false;
  typeFilter = false;
  type: any = [];
  myFormsIdentifier: any = FormGroup;
  selectedItems: any = [];
  sub_category: any = [];
  sub_categorys: any = [];
  typesData: any = [];
  materialIdentifierData: any = [];
  topping1: any = [];
  topping2: any = [];
  subcatagData: any = [];
  subcatArray: any = [];
  disabled = false;
  typeI: any = [];

  typesMapData: any = [];
  typesArray: any = [];
  materialIdentifier: any = [];
  materialIdentifierMapData: any = [];
  materialIdentifierArray: any = [];
  datanonpromotions: any = [];
  datanonpromotion: any = [];
  dealerListArray: any = [];
  dealersShippingAddress: any = [];
  dealerid: any = [];
  customerId: any = [];
  addressId: any = [];
  shippingAddress: any = [];
  address: any = [];
  GeoGrapydropdownListdata: any;
  geographyId: any;
  searchText: any = " ";
  typesI: any= [];
  dealersbillingAddress: any = [];

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
  }
  /*-------*/
  countryname: string[] = ['Malaysia (71/126)', 'India (178/178)', 'Philipines (0/135)'];
  statename: string[] = ['Johor(0/42)', 'Kedah(36/36', 'Perak(14/26)', 'Penang(21/22)'];
  regionname: string[] = ['North(4/4)', 'South(8/8)', 'East(6/6)', 'West(3/4)'];
  cityname: string[] = ['George town', 'Balik Pulau', 'Batu Refringi', 'Teluk Bahang'];
  selectedItem = null;
  addButton: boolean = false;
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  selectgeo: any = ['country', 'state'];
  selectbillAddress: any = ['address1', 'address2'];
  selectShippingAddress: any = ['shippingAddress1', 'shipping2']
  getgroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"]
  buygroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"];
  CustomerSelect: string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']
  public itemremoved: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  constructor(private _formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private http: HttpClient,
    private orders: OrdersApisService,
    private materialList: MaterialListService,
    private addMaterials: AddMaterialsService,
    private dealersList: AssosiationServicesService,
    private sharedService: SharedServiceMaterialListService,
    private fb: FormBuilder, private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m)
      this.orderNonPromotionsList();

    })
    this.sharedService.getClickEvent().subscribe(() => {
      this.orderNonPromotionsList();
    })
    sort: [];
  }

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });

  ngOnInit(): void {
    this.ordersDealers();

    this.taxdropdown();
    this.getclassification();
    this.selectMaterialIdentifier();
    this.dropdownSettingssubcat = {
      singleSelection: false,
      idField: 'subCatId',
      textField: 'subCatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.subCategoryFilter
    };
    this.dropdownSettingstypeid = {
      singleSelection: false,
      idField: 'typeId',
      textField: 'typeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.typeFilter
    };
    this.dropdownSettingsmaterialid = {
      singleSelection: false,
      idField: 'materilCustomIdentifierId',
      textField: 'materialCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.typeFilter
    };
    this.categoryForm = this.fb.group({
      categoryy: [this.selectedItems]
    });
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems]
    });
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
    this.myFormsIdentifier = this.fb.group({
      identifiers: [this.selectedItems]
    });
    let editV = localStorage.getItem('Edit');

    if (editV == 'Edit') {
      this.actineLabel = "Edit order";
      this.updateOrSave = !this.updateOrSave
      // this.spinner.show();
      // this.spinner.hide();

    }
    else {
      this.actineLabel = "Add order";
      this.editData = false;
      // this.updateOrSave= this.updateOrSave;

    }


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

  expandOtherInfoDiv() {
    this.otherInfo = !this.otherInfo;

    if (this.otherInfo === false) {
      this.image3 = 'assets/img/minimize-tag.png';
    } else {
      this.image3 = 'assets/img/maximize-arrow.png';
    }
  }

  addOrderPromotionList() {
    this.dialog.open(AddOrderPromotionlistComponent, { width: '1043px', height: '900px' });
    localStorage.setItem('buygroupromo', '')
  }

  addOrderNonPromotionList() {
    // this.dialog.open( OrderNonpromotionlistComponent,{width: '1043px',height:'663px'});
    this.Non_promotions = true;
  }
  removeItem() {
    this.itemremoved.splice(0);
  }
  // non-prmotions

  refresh() {
    this.categoryForm = this.fb.group({
      categoryy: [this.selectedItems]
    });
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems]
    });
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
    this.myFormsIdentifier = this.fb.group({
      identifiers: [this.selectedItems]
    });
    this.catergory = [];
    this.sub_categorys = [];
    this.typesData = [];
    this.materialIdentifierData = [];
  }
  closePopup() {
    this.Non_promotions = false
    // this.dialogRef.close();
  }

  ordersDealers() {
    this.dealersList.getDealers().subscribe((res: any) => {
      let localdata = res.response;
      console.log('checkdata', localdata)

      this.dealerListArray = localdata.map((data: { customerId: any; customerName: any; }) => {
        return { customerId: data.customerId, customerName: data.customerName };
      });

      // this.dealerListArray.push()
      console.log(this.dealerListArray, "dealersdata")
    });
  }

  onItemSelectdealers(item: any) {
    this.customerId = item.customerId;
    this.orders.GetGeoGrapydropdownList(this.customerId).subscribe((res) => {
      let GeoGrapydropdownList = res.response;
      console.log(GeoGrapydropdownList, "GeoGrapydropdownList")
      this.GeoGrapydropdownListdata = GeoGrapydropdownList.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      console.log(this.GeoGrapydropdownListdata, "GeoGrapydropdownListdata")
    });
    // shipping api
    this.orders.GetShipingAddress(this.customerId).subscribe((res:any)=>{
      let shippingAddress = res.response;

      this.dealersShippingAddress = shippingAddress.map((data: { addressId: any; address: any; }) => {
        return { addressId: data.addressId, address  : data.address };
      });
      console.log(shippingAddress,"shipping address");
      console.log(this.dealersShippingAddress,"shipping address1");
    });
     // billing api
    this.orders.GetBillingAddress(this.customerId).subscribe((res:any)=>{
      let BillingAddress = res.response;

      this.dealersbillingAddress = BillingAddress.map((data: { addressId: any; address: any; }) => {
        return { addressId: data.addressId, address  : data.address };
      });
      console.log(BillingAddress,"shipping address");
      console.log(this.dealersbillingAddress,"shipping address1");
    });
    console.log(this.customerId, "dealrs id")
  }

  onItemSelectgeo(item: any) {
    this.geographyId = item.geographyId;
    this.orderNonPromotionsList();
    console.log(this.geographyId, "geographyId")
  }
  onItemSelectshippingAddress(item: any) {
    this.addressId = item.addressId;
    console.log(this.addressId, "addressId")
  }
  // on search 
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data =
    {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
      type: this.typesData,
      MaterialCustomIdentifier: this.materialIdentifierData,
      Search: this.searchText,
      GeographyId: this.geographyId
    }
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);
    });

  }


  getclassification() {

    this.materialList.getclassification(this.flag).subscribe((res) => {
      let data = res.response;
      this.countCatagory = res.totalRecords;
      this.catagoryData = data.allOtherCats;
      let dataCat = data.allOtherCats;
      this.toppings = new FormControl(this.catagoryData);
      this.categoryMapData = dataCat.map((data: { catId: any; catName: any; }) => {
        return { catId: data.catId, roleName: data.catName };
      });

      if (!this.categoryMapData?.length) {
        this.categoryMapData = dataCat.map((product: { designationName: any; }) => {
          return product.designationName;
        });
      }
      this.categoryMapData.push()
      this.categoryMapData.forEach(element => {
        return this.categoryArray.push(element.catId);

      })
    })
    this.dropdownSettingscat = {
      singleSelection: false,
      idField: 'catId',
      textField: 'catName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.ShowFilter
    };
  }
  // cat select
  onItemSelect(item: any) {
    // this.selectedItem = item;
    this.catergory.push(item.catId);
    console.log("Catttyyyyy", this.catergory)
    console.log('item Subcatty', item)

    // this.itemId = item.catId;
    // this.catagoryName = item.catName;
    let Subdata = {
      catId: this.catergory,
      flag: this.flag
    }
    this.materialList.onclickcat(Subdata).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      console.log("SubCategory", this.sub_category);
      this.topping1 = new FormControl(this.sub_category);
    });
    const data =
    {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
      type: this.typesData,
      MaterialCustomIdentifier: this.materialIdentifierData,
      Search: this.searchText,
      GeographyId: this.geographyId
    }
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);
    });
  }
  onItemDeSelect(item: any) {
    this.catergory.forEach((element, index) => {
      if (element == item.catId) this.catergory.splice(index, 1);

    });
    let SubdataD = {
      catId: this.catergory
    }
    this.materialList.onclickcat(SubdataD).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
    });
    const data =
    {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      Search: this.searchText,
      GeographyId: this.geographyId
    }
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);
    });
    console.log('this.catergory', this.catergory);
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems]
    });
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
  }
  onItemSelectOrAll(item: any) {
    this.catergory = this.categoryArray;
    let Subdataall = {
      catId: this.catergory
    }
    console.log("Category Array", this.catergory)
    // this.itemId = item.catId;
    // this.catagoryName = item.catName;
    this.materialList.onclickcat(Subdataall).subscribe((res) => {
      let subcaty = res.response;
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      let allSub_cats = subcaty.allOtherSubCAts;
      console.log("SubCategory", this.sub_category);
      this.subcatagData = allSub_cats.map((data: { subCatId: any; subCatName: any; }) => {
        return { subCatId: data.subCatId, subCatName: data.subCatName };
      });

      if (!this.subcatagData?.length) {
        this.subcatagData = allSub_cats.map((subCatData: { designationName: any; }) => {
          return subCatData.designationName;
        });
      }
      this.subcatagData.push()
      this.subcatagData.forEach(element => {
        return this.subcatArray.push(element.subCatId);

      })
      this.topping1 = new FormControl(this.sub_category);
    });
    const data =
    {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      Search: this.searchText,
      GeographyId: this.geographyId
    }
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);
    });
    console.log("catArray", this.catergory)
  }
  onItemDeSelectOrAll(item: any) {
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems]
    });
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    const data =
    {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      Search: this.searchText,
      GeographyId: this.geographyId
    }
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);
    });

  }
  // sub cat
  onSubCategorySelect(item: any) {
    console.log(" item Types", item);
    this.sub_categorys.push(item.subCatId);
    let Type = {
      subCatId: this.sub_categorys,
      flag: this.flag
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
  }
  onSubCategoryDeSelect(item: any) {
    this.sub_categorys.forEach((element, index) => {
      if (element == item.subCatId) this.sub_categorys.splice(index, 1);

    });
    let subCat = {
      subCatId: this.sub_categorys
    }
    this.materialList.onclicksubcat(subCat).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
    console.log(' this.typeI', this.typeI)
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
  }
  onSubCategorySelectOrAll() {
    this.sub_categorys = this.subcatArray;
    let Type = {
      subCatId: this.sub_categorys
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
  }
  onSubCategoryDSelectOrAll(item: any) {
    this.sub_categorys = [];
    this.typeI = []
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
  }
  // typeselect
  onTypeSelect(item: any) {
    this.typesData.push(item.typeId);
  }
  onTypeDeSelect(item: any) {

    this.typesData.forEach((element, index) => {
      if (element == item.typeId) this.typesData.splice(index, 1);

    });

  }
  onTypeSelectOrAll() {

    this.typesMapData = this.typeI.map((data: { typeId: any; typeName: any; }) => {
      return { typeId: data.typeId, typeName: data.typeName };
    });

    if (!this.typesMapData?.length) {
      this.typesMapData = this.typeI.map((type: { designationName: any; }) => {
        return type.designationName;
      });
    }
    this.typesMapData.push()
    this.typesMapData.forEach(element => {
      return this.typesArray.push(element.typeId);

    })
    this.typesData = this.typesArray;
  }
  OnTypeDeselectOrAll() {
    this.typesData = [];
  }
  // material select
  selectMaterialIdentifier() {
    this.addMaterials.getMaterialIdentifier().subscribe((res) => {
      this.materialIdentifier = res.response;
      console.log("materialIdentifier", this.materialIdentifier)
    })
    // }

  }
  onMaterialIdentifierSelect(item: any) {
    this.materialIdentifierData.push(item.materilCustomIdentifierId);
    console.log("materialIdentifier", this.materialIdentifierData);
  }
  onMaterialIdentifierDeSelect(item: any) {

    this.materialIdentifierData.forEach((element, index) => {
      if (element == item.materilCustomIdentifierId) this.materialIdentifierData.splice(index, 1);

    });
    console.log("materialIdentifier", this.materialIdentifierData);
  }
  onMaterialIdentifierSelectOrAll() {

    this.materialIdentifierMapData = this.materialIdentifier.map((data: { materilCustomIdentifierId: any; materialIdentifierName: any; }) => {
      return { materilCustomIdentifierId: data.materilCustomIdentifierId, materialIdentifierName: data.materialIdentifierName };
    });

    if (!this.materialIdentifierMapData?.length) {
      this.materialIdentifierMapData = this.materialIdentifier.map((type: { designationName: any; }) => {
        return type.designationName;
      });
    }
    this.materialIdentifierMapData.push()
    this.materialIdentifierMapData.forEach(element => {
      return this.materialIdentifierArray.push(element.materilCustomIdentifierId);

    })
    this.materialIdentifierData = this.materialIdentifierArray;
    console.log("materialIdentifier", this.materialIdentifierData);
  }
  onMaterialIdentifierDeSelectOrAll() {
    this.materialIdentifierData = [];
    console.log("materialIdentifier", this.materialIdentifierData);
  }


  // non promotions list table data
  orderNonPromotionsList() {
    const data =
    {
      "Cat": [],
      "Sub_Cat": [],
      "type": [],
      "MaterialCustomIdentifier": [],
      "Search": "",
      "GeographyId": this.geographyId
    }

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;

      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);

    });
  }

  orderNonPromotionFormatter(items) {
    let formattedList: any = [];
    items.forEach(item => {
      let obj: any = {}
      obj.classification = item.classification;
      obj.materialCustomName = item.materialCustomName;
      obj.mrp = item.mrp;
      obj.productSKUName = item.productSKUName;
      obj.stockItemId = item.stockItemId;
      obj.stockItemName = item.stockItemName;
      obj.isPromotionSelected = false;
      obj.Quantity = null;
      obj.Taxid = null;
      formattedList.push(obj);
    });

    return formattedList;

  }
  checkboxChange(event, changedPromotionObj) {
    console.log(event, changedPromotionObj);
    changedPromotionObj.isPromotionSelected = event.target.checked;


    this.Taxid = changedPromotionObj.Taxid
    this.stockItemId = changedPromotionObj.stockItemId
    this.Quantity = changedPromotionObj.Quantity
    let nonprmodata = {
      "Taxid": this.Taxid,
      "stockItemId": this.stockItemId,
      "Quantity": this.Quantity,
    }
    this.datanonpromotions.push(nonprmodata);
    // const ids = this.datanonpromotions.map(o => o.stockItemId)
    // this.datanonpromotion = this.datanonpromotions.filter(({stockItemId}, index) => !ids.includes(stockItemId, index + 1))

    // console.log(filtered)
    console.log(nonprmodata)
    console.log(this.datanonpromotions)
  }

  addnonPromoItems() {

    console.log(this.datanonpromotions, "addnonpromotions");
  }

  taxdropdown() {
    this.orders.taxtemplatedropdown().subscribe((res) => {
      this.taxdropdowndata = res.response;
      console.log(this.taxdropdowndata, "tax data")

    });
  }
}
