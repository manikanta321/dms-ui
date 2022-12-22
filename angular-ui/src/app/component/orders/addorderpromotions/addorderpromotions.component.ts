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
  quantityadd: any=0;
  mrp: any= [];
  mrpadd: any="";
  price: any = 0;
  err: any=" ";
  nonpromotionlist: any=[];
  stockitemname: any;
  uomid: any;
  uomname: any;
  quantity: any;
  stock: any;
  discount: any;
  finalValue: any;
  taxes: any;
  amount: any;

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
    this.orderNonPromotionsList();
    this.Non_promotions = true;
  }
  removeNonPromotionItem(clickedItem) {
    let index = this.nonpromotionlist.findIndex(x => x.stockItemId == clickedItem.stockItemId);
    this.nonpromotionlist.splice(index, 1);

    this.nonpromotionlist = this.nonpromotionlist.map((x, i) => {
      x.promotionName = 'NP' + (i+1);
      return x;
    })
    // this.itemremoved.splice(0);
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
      console.log(BillingAddress,"billing address");
      console.log(this.dealersbillingAddress,"billing address2");
    });
    console.log(this.customerId, "dealrs id")
  }

  onItemSelectgeo(item: any) {
    this.geographyId = item.geographyId;
    
    console.log(this.geographyId, "geographyId")
  }
  onItemSelectshippingAddress(item: any) {
    this.addressId = item.addressId;
    console.log(this.addressId, "addressId")
  }
  onItemSelectBillingAddress(item: any) {
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
    if(this.catergory.length == 0) {
      this.sub_categorys =[];
      this.sub_category = [];
      this.typeI =[];
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
      console.log("SubCategoryArrayy",this.subcatArray);
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
    this.typeI  = [];
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
    if(this.sub_categorys.length == 0) {
      this.typeI =[];
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
    console.log("subCattyyArrayy",this.sub_categorys);
    let Type = {
      subCatId: this.sub_categorys
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
    console.log("subcategoriesssss",this.sub_categorys)
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
      if (element == item.typeId)this.typesI.splice(index, 1);

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
      "GeographyId": this.geographyId
    }
    this.spinner.show();
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;

      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(orderNonPromotionsData);
      this.orderNonPromotionsdata.sort((a, b) => b.isPromotionSelected - a.isPromotionSelected);
      this.spinner.hide();
    });
  }

  orderNonPromotionFormatter(items) {
    let formattedList: any = [];
    items.forEach(item => {
      let obj: any = {}
      let selectedNonPromotionItem =  this.nonpromotionlist.find(x=> x.stockitemid == item.stockItemId);
      obj.classification = item.classification;
      obj.materialCustomName = item.materialCustomName;
      obj.mrp = item.mrp;
      obj.productSKUName = item.productSKUName;
      obj.stockItemId = item.stockItemId;
      obj.stockItemName = item.stockItemName;
      obj.isPromotionSelected = selectedNonPromotionItem == undefined ? false :true;
      obj.Quantity = selectedNonPromotionItem == undefined ? null : selectedNonPromotionItem.quantity;
      obj.Taxid = selectedNonPromotionItem == undefined ? null : selectedNonPromotionItem.taxid;
      // obj.price = (item.Quantity ?? 0) * item.mrp
      formattedList.push(obj);
    });
// (Item.Quantity ?? 0) * Item.mrp
    return formattedList;

  }

  quantityChange(){
    let quantityadd = 0;
    let price = 0;
    this.orderNonPromotionsdata.forEach(item=>{
      if(item.isPromotionSelected){
        quantityadd += item.Quantity;
        price += ((item.Quantity ?? 0) * item.mrp);
      }
    });

    this.quantityadd = quantityadd;
    this.price = price;
  }


  checkboxChange(event, changedPromotionObj) {
    console.log(event, changedPromotionObj);
    changedPromotionObj.isPromotionSelected = event.target.checked;

    this.quantityadd = 0;
    this.price = 0;
    this.orderNonPromotionsdata.forEach(item=>{
      if(item.isPromotionSelected){
        this.quantityadd += item.Quantity;
        this.price += ((item.Quantity ?? 0) * item.mrp);
      }
    });
  }

  addnonPromoItems() {
    let selectedNonPromotionData:any  = [];
     this.orderNonPromotionsdata.forEach(item => {
      if(item.isPromotionSelected){
        let obj = {
            "Taxid": item.Taxid,
            "stockItemId": item.stockItemId,
            "Quantity": item.Quantity,
          };

        selectedNonPromotionData.push(obj) 
      }
     });
    let data = {
      "GeographyId": this.geographyId,
      "AddItems": selectedNonPromotionData
    }
    this.orders.addorderNonPromotionsdata(data).subscribe(
      {
        next: (res: any) => {
          if (res) {
            console.log(data, "addnonpromotions");
            this.nonpromotionlist = res.response;
            this.nonpromotionlist = this.nonpromotionlist.map((x, i) => {
              x.promotionName = 'NP' + (i+1);
              return x;
            })
            this.Non_promotions = false;
            console.log(this.nonpromotionlist, "addnonpromotions");
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
}
