import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddOrderPromotionlistComponent } from '../add-order-promotionlist/add-order-promotionlist.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { MaterialListService } from 'src/app/services/material-list.service';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { GridApi } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { ConsoleEventLogger } from '@generic-ui/hermes/core/infrastructure/logger/event/console.event.logger';
import { AssosiationServicesService } from 'src/app/services/assosiation-services.service';
import { SharedServiceMaterialListService } from 'src/app/services/shared-service-material-list.service';
import { AddorderproSuccessPopupComponent } from './addorderpro-success-popup/addorderpro-success-popup.component';
@Component({
  selector: 'app-addorderpromotions',
  templateUrl: './addorderpromotions.component.html',
  styleUrls: ['./addorderpromotions.component.css']
})
export class AddorderpromotionsComponent implements OnInit {

  confirm_Order:boolean=true;

  selectedTeam = '';
  selectedDay: string = '';
  taxid: any = [];
  stockitemid: any = [];
  quantity: any = [];
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
  addressId: any;
  shippingaddressId: any;
  BillingaddressId: any = [];
  Billingaddress: any = [];
  shippingAddress: any = [];
  address: any = [];
  GeoGrapydropdownListdata: any;
  geographyId: any;
  searchText: any = " ";
  typesI: any = [];
  dealersbillingAddress: any = [];
  quantityadd: any = 0;
  mrp: any = [];
  mrpadd: any = "";
  price: any = 0;
  err: any = " ";
  nonpromotionlist: any = [];
  stockitemname: any;
  uomid: any;
  uomname: any;
  stock: any;
  discount: any;
  finalValue: any;
  taxes: any;
  amount: any;
  userType: any
  CompanyReferenceNo: any;
  DealerReferenceNo: any;
  DeliveryInstructions: any;
  AddorderNonpromotiondata: any = {};
  AddOrderPromotionData: any = [];
  startdate: any;
  minDate = new Date();
  selectedStartDate: any;
  CustomerPoId: any = 0;
  editorderbyID: any = {};
  copyEditOrderById: any;
  shippingPackingchargeDetails: any = {};
  confirmOrder: any;
  dealerDisabled: boolean = false
  dateChange(e) {

    this.selectedStartDate = new Date(e.value).getFullYear() + '/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
    console.log(this.selectedStartDate);
    // this.startdate = new Date(this.selectedStartDate).toLocaleDateString('en-US')
    // console.log(this.startdate);
  }

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
    localStorage.setItem('AddorEditpro', '');
    localStorage.setItem('AddorEditpro1', '');

    this.userType = localStorage.getItem("userType");
    let loginid = localStorage.getItem("logInId");
    if (this.userType == 'Dealer Admin') {
      this.orders.dealersDetails(loginid).subscribe((res) => {
        console.log(res.response)
        this.customerId = res.response.dealerId;
        let obj: any = {
          customerId: this.customerId

        }
        this.onItemSelectdealers(obj)
        this.dealerDisabled = true

      })
    }
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
      // 1  allowSearchFilter: this.subCategoryFilter,
      allowSearchFilter: true
    };
    this.dropdownSettingstypeid = {
      singleSelection: false,
      idField: 'typeId',
      textField: 'typeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      //2  allowSearchFilter: this.typeFilter
      allowSearchFilter: true
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
    this.confirmOrder = sessionStorage.getItem("Confirm")
    if (this.confirmOrder == "Confirm") {
      this.actineLabel = "Confirm order";
      this.updateOrSave = !this.updateOrSave;
      this.GetOrdersToEdit();
    }
    if (editV == 'Edit') {
      this.actineLabel = "Edit order";
      this.updateOrSave = !this.updateOrSave;
      this.GetOrdersToEdit();
    }
    else {
      this.actineLabel = "Add order";
      this.editData = false;
      // this.updateOrSave= this.updateOrSave;
      this.editorderbyID = {};
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

    localStorage.setItem("geographyId", this.geographyId);
    localStorage.setItem("dealerid", this.customerId);

    if (this.geographyId == null || this.customerId == null) {
      alert("Plz select geography and dealer");
      return;
    }

    const dialogRef = this.dialog.open(AddOrderPromotionlistComponent, { width: '1043px', height: '900px', data: this.AddOrderPromotionData });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.AddOrderPromotionData = res;
        this.getShippingandPackingcharges();
      }
    })
    // localStorage.setItem('buygroupromo', '')
  }

  addOrderNonPromotionList() {

    localStorage.setItem("geographyId", this.geographyId);
    localStorage.setItem("dealerid", this.customerId);

    if (this.geographyId == null || this.customerId == null) {
      alert("Plz select geography and dealer");
      return;
    }
    this.orderNonPromotionsList();
    this.Non_promotions = true;
  }
  removePromotionItem(clickedItem, promotionId) {
    // let ClickedPromotionObj = this.AddOrderPromotionData.find(x => x.promotionId == promotionId);
    let index = this.AddOrderPromotionData.findIndex(x => x.promotionId == promotionId);
    this.AddOrderPromotionData.splice(index, 1);
    // if (ClickedPromotionObj) {
    //   let index = ClickedPromotionObj.itemDetails.findIndex(x => x.stockitemid == clickedItem.stockitemid);
    // }
    this.getShippingandPackingcharges();
  }
  removeNonPromotionItem(clickedItem) {
    let index = this.nonpromotionlist.findIndex(x => x.stockitemid == clickedItem.stockitemid);
    this.nonpromotionlist.splice(index, 1);

    this.nonpromotionlist = this.nonpromotionlist.map((x, i) => {
      x.promotionName = 'NP' + (i + 1);
      return x;
    });

    this.AddorderNonpromotiondata.itemDetails = this.nonpromotionlist;
    this.getShippingandPackingcharges();
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
    this.sub_category = [];
    this.sub_categorys = [];
    this.typesI = [];
    this.typeI = [];
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
    localStorage.setItem("dealerid", this.customerId);
    localStorage.removeItem("geographyId");
    this.geographyId = null;
    this.orders.GetGeoGrapydropdownList(this.customerId).subscribe((res) => {
      let GeoGrapydropdownList = res.response;
      console.log(GeoGrapydropdownList, "GeoGrapydropdownList")
      this.GeoGrapydropdownListdata = GeoGrapydropdownList.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      console.log(this.GeoGrapydropdownListdata, "GeoGrapydropdownListdata")
    });
    // shipping api
    this.orders.GetShipingAddress(this.customerId).subscribe((res: any) => {
      let shippingAddress = res.response;

      this.dealersShippingAddress = shippingAddress.map((data: { addressId: any; address: any; }) => {
        return { addressId: data.addressId, address: data.address };
      });
      console.log(shippingAddress, "shipping address");
      console.log(this.dealersShippingAddress, "shipping address1");
    });
    // billing api
    this.orders.GetBillingAddress(this.customerId).subscribe((res: any) => {
      let BillingAddress = res.response;

      this.dealersbillingAddress = BillingAddress.map((data: { addressId: any; address: any; }) => {
        return { BillingaddressId: data.addressId, Billingaddress: data.address };
      });
      console.log(BillingAddress, "billing address");
      console.log(this.dealersbillingAddress, "billing address2");
    });
    console.log(this.customerId, "dealrs id")
  }

  onItemSelectgeo(item: any) {
    this.geographyId = item.geographyId;
    localStorage.setItem("geographyId", this.geographyId)
    console.log(this.geographyId, "geographyId")
  }
  onItemSelectshippingAddress(item: any) {
    this.shippingaddressId = item.addressId;
    console.log(this.shippingaddressId, "shippingaddressId")
  }
  onItemSelectBillingAddress(item: any) {
    this.BillingaddressId = item.BillingaddressId;
    console.log(this.BillingaddressId, "BillingaddressId")
  }
  // on search 
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data =
    {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
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
      // 3 allowSearchFilter: this.ShowFilter
      allowSearchFilter: true
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
  onItemDeSelect(item: any) {
    this.catergory.forEach((element, index) => {
      if (element == item.catId) this.catergory.splice(index, 1);

    });
    let SubdataD = {
      catId: this.catergory
    }
    if (this.catergory.length == 0) {
      this.sub_categorys = [];
      this.sub_category = [];
      this.typeI = [];
      this.typesI = [];
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
      console.log("SubCategoryArrayy", this.subcatArray);
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
    this.typesI = [];
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
  onSubCategoryDeSelect(item: any) {
    this.sub_categorys.forEach((element, index) => {
      if (element == item.subCatId) this.sub_categorys.splice(index, 1);

    });
    let subCat = {
      subCatId: this.sub_categorys
    }
    if (this.sub_categorys.length == 0) {
      this.typeI = [];
      this.typesI = [];
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
  onSubCategorySelectOrAll() {
    this.sub_categorys = this.subcatArray;
    console.log("subCattyyArrayy", this.sub_categorys);
    let Type = {
      subCatId: this.sub_categorys
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
    console.log("subcategoriesssss", this.sub_categorys)
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
  onSubCategoryDSelectOrAll(item: any) {
    this.sub_categorys = [];
    this.typesI = [];
    this.typeI = [];
    this.type = this.fb.group({
      type: [this.selectedItems]
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
  }
  // typeselect
  onTypeSelect(item: any) {
    this.typesI.push(item.typeId);
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
  onTypeDeSelect(item: any) {

    this.typesI.forEach((element, index) => {
      if (element == item.typeId) this.typesI.splice(index, 1);

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
    this.typesI = this.typesArray;
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
  OnTypeDeselectOrAll() {
    this.typesI = [];
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
  onMaterialIdentifierDeSelect(item: any) {

    this.materialIdentifierData.forEach((element, index) => {
      if (element == item.materilCustomIdentifierId) this.materialIdentifierData.splice(index, 1);

    });
    console.log("materialIdentifier", this.materialIdentifierData);
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
  onMaterialIdentifierDeSelectOrAll() {
    this.materialIdentifierData = [];
    console.log("materialIdentifier", this.materialIdentifierData);
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


  // non promotions list table data
  orderNonPromotionsList() {
    const data =
    {
      "Cat": [],
      "Sub_Cat": [],
      "type": [],
      "MaterialCustomIdentifier": [],
      "Search": "",
      "GeographyId": this.geographyId,
      "Dealerid": this.customerId,
    }
    this.spinner.show();

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      console.log(orderNonPromotionsData, "orderNonPromotionsData tockeck");

      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);
      this.spinner.hide();
    });
  }

  orderNonPromotionFormatter(items) {
    let formattedList: any = [];
    items.forEach(item => {
      let obj: any = {}
      let selectedNonPromotionItem = this.nonpromotionlist.find(x => x.stockitemid == item.stockitemid);
      obj.classification = item.classification;
      obj.materialCustomName = item.materialCustomName;
      obj.price = item.price;
      obj.stock = selectedNonPromotionItem == undefined ? item.stock : selectedNonPromotionItem.quantity;
      obj.productSKUName = item.productSKUName;
      obj.stockitemid = item.stockitemid;
      obj.stockitemname = item.stockitemname;
      obj.isPromotionSelected = selectedNonPromotionItem == undefined ? false : true;
      obj.quantity = selectedNonPromotionItem == undefined ? null : selectedNonPromotionItem.quantity;
      obj.taxid = selectedNonPromotionItem == undefined ? null : selectedNonPromotionItem.taxid;
      formattedList.push(obj);
    });

    formattedList.sort((a, b) => b.isPromotionSelected - a.isPromotionSelected);
    return formattedList;

  }

  quantityChange(updatedItem) {


    if (!updatedItem.isPromotionSelected) {
      updatedItem.isPromotionSelected = true;
    } else if (!updatedItem.quantity) {
      updatedItem.isPromotionSelected = false;
    }
    this.nonPromotionCalculation(updatedItem);

    // let quantityadd = 0;
    // let price = 0;
    // this.orderNonPromotionsdata.forEach(item => {
    //   if (item.isPromotionSelected) {
    //     quantityadd += item.quantity;
    //     price += ((item.quantity ?? 0) * item.price);
    //   }
    // });

    // this.quantityadd = quantityadd;
    // this.price = price;
  }

  
  doubleClick(taxId) {
    if (taxId) {
      this.orderNonPromotionsdata.forEach(element => {
        if (element.isPromotionSelected) {
          element.taxid = taxId;
        }
      });
    }
  }

  nonPromotionCalculation(changedPromotionObj) {
    this.quantityadd = 0;
    this.price = 0;
    this.orderNonPromotionsdata.forEach(item => {
      if (item.isPromotionSelected) {
        this.quantityadd += item.quantity;
        this.price += ((item.quantity ?? 0) * item.price);
      }
    });

    let index = this.nonpromotionlist.findIndex(x => x.stockitemid == changedPromotionObj.stockitemid);

    if (index == -1) {
      this.nonpromotionlist.push(changedPromotionObj);
    } else {
      this.nonpromotionlist.splice(index, 1);
    }
  }


  checkboxChange(event, changedPromotionObj) {
    console.log(event, changedPromotionObj);
    changedPromotionObj.isPromotionSelected = event.target.checked;

    this.nonPromotionCalculation(changedPromotionObj);
    // this.quantityadd = 0;
    // this.price = 0;
    // this.orderNonPromotionsdata.forEach(item => {
    //   if (item.isPromotionSelected) {
    //     this.quantityadd += item.quantity;
    //     this.price += ((item.quantity ?? 0) * item.price);
    //   }
    // });

    // let index = this.nonpromotionlist.findIndex(x => x.stockitemid == changedPromotionObj.stockitemid);

    // if (index == -1) {
    //   this.nonpromotionlist.push(changedPromotionObj);
    // } else {
    //   this.nonpromotionlist.splice(index, 1);
    // }

  }

  addnonPromoItems() {
    let selectedNonPromotionData: any = [];
    this.orderNonPromotionsdata.forEach(item => {
      if (item.isPromotionSelected) {
        let obj = {
          "Taxid": item.taxid,
          "stockitemid": item.stockitemid,
          "Quantity": item.quantity,
          "stock": item.stock
        };

        selectedNonPromotionData.push(obj)
      }
    });
    let data = {
      "GeographyId": this.geographyId,
      "AddItems": selectedNonPromotionData,
      "Dealerid": this.customerId,
    }
    this.orders.addorderNonPromotionsdata(data).subscribe(
      {
        next: (res: any) => {
          if (res) {
            console.log(data, "addnonpromotions");
            this.nonpromotionlist = res.response;

            this.AddorderNonpromotiondata = { itemDetails: [], promocode: 'NP', promotionId: 0 };
            this.nonpromotionlist.forEach(item => {
              // Promocode: this.promotionName,
              let obj = {
                // "Promocode": item.promotionName,
                "stockitemid": item.stockitemid,
                "stockitemname": item.stockitemname,
                "uomid": item.uomid,
                "uomname": item.uomname,
                "quantity": item.quantity,
                "stock": item.stock,
                "price": item.price,
                "discount": item.discount,
                "finalValue": item.finalValue,
                "taxvalue": item.taxvalue,
                "amount": item.amount,
                "taxid": item.taxid,
              }
              this.AddorderNonpromotiondata.itemDetails.push(obj);
            });
            this.Non_promotions = false;
            this.getShippingandPackingcharges();
          }
        },
        error: (err: any) => {
          this.Non_promotions = true;
          this.err = err.error

        }
      })

    console.log(data, "addnonpromotions");
  }

  taxdropdown() {
    this.orders.taxtemplatedropdown().subscribe((res) => {
      this.taxdropdowndata = res.response;
      console.log(this.taxdropdowndata, "tax data")

    });
  }

  close(){
this.Non_promotions=false;
  
  }
  closeconfirmorder()
  {
    this.confirm_Order=false;
  }
  ordersubmit(submitType) {
    if(localStorage.getItem('AddorEditpro')!='edit'){
      localStorage.setItem('AddorEditpro1', submitType);

    }

    let loggedUserId = localStorage.getItem('logInId')
    console.log(this.startdate, "date")
    let itemsCount: any = [];



    let copyItemsData = this.copyEditOrderById?.itemcount ?? [];
    // Push Non Promotion data to itemscount variable
    if (this.AddorderNonpromotiondata && this.AddorderNonpromotiondata.itemDetails && this.AddorderNonpromotiondata.itemDetails.length != 0) {
      let tempObj = JSON.parse(JSON.stringify(this.AddorderNonpromotiondata));
      let previousObj = copyItemsData.find(x => x.promotionId == tempObj.promotionId);
      if (previousObj) {
        tempObj.itemDetails.map(x => {
          let previousValue = previousObj.itemDetails.find(y => y.stockitemid == x.stockitemid);
          if (previousValue) {
            x.customerPOProductId = previousValue.customerPOProductId;
          }
        })

      }

      itemsCount.push(tempObj);
    }

    if (this.AddOrderPromotionData) {
      this.AddOrderPromotionData.forEach((promoObj, index) => {
        let tempObj = JSON.parse(JSON.stringify(promoObj));
        let previousObj = copyItemsData.find(x => x.promotionId == tempObj.promotionId);
        if (previousObj) {

          tempObj.itemDetails.map(x => {
            let previousValue = previousObj.itemDetails.find(y => y.stockitemid == x.stockitemid);
            if (previousValue) {
              x.customerPOProductId = previousValue.customerPOProductId;


            }

          })
        }
        let obj: any = {};
        obj.promotionId = tempObj.promotionId;
        obj.itemDetails = tempObj.itemDetails;
        obj.promocode = 'P' + (index + 1);
        itemsCount.push(obj);
      })
    }



    // Push Promotion data to itemscount variable

   this.startdate = new Date(this.selectedStartDate).toLocaleDateString('en-US');

    let data = {
      "CustomerId": this.customerId,
      "geoid": this.geographyId,
      "billingaddid": this.BillingaddressId,
      "dealerrefno": this.DealerReferenceNo,
      "comrefno": this.CompanyReferenceNo,
      "shippingaddid": this.addressId,
      "deliveryistruction": this.DeliveryInstructions,
      "requirementdate": this.startdate ,
      "CreatedById": loggedUserId,
      "itemcount": itemsCount,
      "AddType": submitType,
      "CustomerPOId": this.CustomerPoId
    }


    this.orders.addorderNonPromotions(data).subscribe((res) => {




      this.dialog.open(AddorderproSuccessPopupComponent, { panelClass: 'activeSuccessPop' });




      console.log(data, "data");

      this.dialogRef.close(true);

      // localStorage.removeItem('geographyId');
      localStorage.removeItem('dealerid');
      // localStorage.removeItem('buygroupromo');
    });


  }

  GetOrdersToEdit() {
    this.CustomerPoId = localStorage.getItem("CustomerPoId");
    // alert(this.CustomerPoId)
    console.log(this.CustomerPoId, 'this.CustomerPoId')
    this.copyEditOrderById = null;
    this.orders.GetOrdersToEdit(this.CustomerPoId).subscribe((res) => {


      this.editorderbyID = res.response;
      this.copyEditOrderById = res.response;
      console.log(res.response, "GetOrdersToEdit")


      this.datapreloadbyID();
      this.getShippingandPackingcharges();
    })
    localStorage.setItem('AddorEditpro', 'edit');
    this.sharedService.filter('Register click');
  }
  GetConfirmOrders() {
    this.CustomerPoId = localStorage.getItem("CustomerPoId");
    console.log(this.CustomerPoId, 'this.CustomerPoId');
    let data = {
      OrderId: this.CustomerPoId,
      flag: "Confirmed"
    }
    this.orders.GetConfirmOrder(data).subscribe((res) => {
      console.log(res.response, "GetConfirmOrdersToEdit")



    })
    this.dialogRef.close(true);
    this.sharedService.filter('Register click');


  }
  GetRejectOrders() {
    this.CustomerPoId = localStorage.getItem("CustomerPoId");
    console.log(this.CustomerPoId, 'this.CustomerPoId');
    let data = {
      OrderId: this.CustomerPoId,
      flag: "Rejected"
    }
    this.orders.GetConfirmOrder(data).subscribe((res) => {
      console.log(res.response, "GetConfirmOrdersToEdit")
    })
    this.dialogRef.close(true);
    this.sharedService.filter('Register click');
  }
  datapreloadbyID() {
    this.customerId = this.editorderbyID.customerid;

    if (this.customerId != '') {
      this.orders.GetGeoGrapydropdownList(this.customerId).subscribe((res) => {
        let GeoGrapydropdownList = res.response;
        console.log(GeoGrapydropdownList, "GeoGrapydropdownList")
        this.GeoGrapydropdownListdata = GeoGrapydropdownList.map((data: { geographyId: any; geographyName: any; }) => {
          return { geographyId: data.geographyId, geographyName: data.geographyName };
        });
        console.log(this.GeoGrapydropdownListdata, "GeoGrapydropdownListdata")
      });
      this.geographyId = this.editorderbyID.geoid;

      // shipping api
      this.orders.GetShipingAddress(this.customerId).subscribe((res: any) => {
        let shippingAddress = res.response;

        this.dealersShippingAddress = shippingAddress.map((data: { addressId: any; address: any; }) => {
          return { addressId: data.addressId, address: data.address };
        });
        console.log(shippingAddress, "shipping address");
        console.log(this.dealersShippingAddress, "shipping address1");
      });
      this.addressId = this.editorderbyID.shippingaddid

      // billing api
      this.orders.GetBillingAddress(this.customerId).subscribe((res: any) => {
        let BillingAddress = res.response;

        this.dealersbillingAddress = BillingAddress.map((data: { addressId: any; address: any; }) => {
          return { BillingaddressId: data.addressId, Billingaddress: data.address };
        });
        console.log(BillingAddress, "billing address");
        console.log(this.dealersbillingAddress, "billing address2");
      });
      localStorage.setItem("dealerid", this.customerId);
      this.BillingaddressId = this.editorderbyID.billingaddid;

      this.DealerReferenceNo = this.editorderbyID.dealerrefno
      this.CompanyReferenceNo = this.editorderbyID.comrefno
      // this.DealerReferenceNo = this.editorderbyID.dealerReferenceNo
      if (this.editorderbyID.requirementdate) {
        this.startdate = new Date(this.editorderbyID.requirementdate)
      }
      this.DeliveryInstructions = this.editorderbyID.deliveryistruction

      this.AddOrderPromotionData = this.editorderbyID.itemcount.filter(x => x.promocode.toLowerCase().indexOf('np') == -1);


      this.nonpromotionlist = [];
      this.editorderbyID.itemcount.filter(x => x.promocode.toLowerCase().indexOf('np') != -1).forEach(y => {
        this.nonpromotionlist = this.nonpromotionlist.concat(y.itemDetails);
      })

      console.log(this.nonpromotionlist);
      this.AddorderNonpromotiondata = { itemDetails: [], promocode: 'NP', promotionId: 0 };
      this.nonpromotionlist.forEach(item => {
        // Promocode: this.promotionName,
        let obj = {
          // "Promocode": item.promotionName,

          "customerPOProductId": item.customerPOProductId,
          "stockitemid": item.stockitemid,
          "stockitemname": item.stockitemname,
          "uomid": item.uomid,
          "uomname": item.uomname,
          "quantity": item.quantity,
          "stock": item.stock,
          "price": item.price,
          "discount": item.discount,
          "finalValue": item.finalValue,
          "taxvalue": item.taxvalue,
          "taxid": item.taxid,
          "amount": item.amount
        }
        this.AddorderNonpromotiondata.itemDetails.push(obj);
      });

    }


  }


  getShippingandPackingcharges() {

    let payload: any = {};

    payload.GeographyId = this.geographyId;
    payload.EachModel = [];

    console.log(this.AddOrderPromotionData);
    console.log(this.AddorderNonpromotiondata);
    if (this.AddOrderPromotionData && this.AddOrderPromotionData.length != 0) {
      this.AddOrderPromotionData.forEach(element => {
        element.itemDetails.forEach(prod => {
          let obj: any = {};
          obj.TaxTemplateId = prod.taxid;
          obj.finalValue = prod.finalValue;
          payload.EachModel.push(obj);
        });
      });
    }

    if (this.AddorderNonpromotiondata && this.AddorderNonpromotiondata.itemDetails) {
      this.AddorderNonpromotiondata.itemDetails.forEach(element => {
        let obj: any = {};
        obj.TaxTemplateId = element.taxid;
        obj.finalValue = element.finalValue;
        payload.EachModel.push(obj);
      });
    }



    this.spinner.show();
    this.orders.getShippingandPackingcharges(payload).subscribe((res: any) => {
      this.spinner.hide();
      this.shippingPackingchargeDetails = res.response;
    });
  }

}
