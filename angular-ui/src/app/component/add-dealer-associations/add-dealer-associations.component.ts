import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddOrderPromotionlistComponent } from '../orders/add-order-promotionlist/add-order-promotionlist.component';
import { OrderNonpromotionlistComponent } from '../orders/order-nonpromotionlist/order-nonpromotionlist.component';
import { AddPromotionGeographiesComponent } from '../add-promotions/add-promotion-geographies/add-promotion-geographies.component';
import { UserService } from 'src/app/services/user.service';
import { AssosiationServicesService } from 'src/app/services/assosiation-services.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { MaterialListService } from 'src/app/services/material-list.service';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { SharedServicesDealerService } from 'src/app/services/shared-services-dealer.service';

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
  flag: boolean = true;
  coutCatagory: any;
  catgname: any;
  toppings: any = [];
  topping1: any = [];
  topping2: any = [];
  catagData: any = [];
  subcatagData: any = [];
  catArray: any[] = [];
  subcatArray: any[] = [];
  catergory: any = [];
  selectedDealerInDropDown: any = [];
  mainarray: any;
  catagoryName: any;
  sub_category: any = [];
  sub_categorys: any = [];
  typeI: any = [];
  typesData: any = [];
  typesI: any = [];
  typessData: any = [];
  typessArray: any = [];
  Product: any;
  ProductList: any = [];
  prodData: any = [];
  prodArray: any[] = [];
  productID: any = [];
  ProductIdentifier: any = [];
  selectedProductId: any = [];
  tooltipData: any = [];
  tooltipDataDealer: any = [];
  slectedgeo: boolean = false;
  // seletedproduct1 : any;
  selectAllIdentifierProduct: any = [];
  selectedIdentifierProductArray: any = [];
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/minimize-tag.png';
  selectedProduct1: any;
  selectedDealer2: any;
  ProductListArray: any = []
  storedNames123: any;
  productSkuId: any;

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
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  dropdownSettings5: IDropdownSettings = {};
  disabled = false;
  toppingList3: any = [];
  dealerListArray: any = [];

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
  myFormDlr: any = FormGroup;
  myForm: any = FormGroup;
  myForm1: any = FormGroup;
  myForm2: any = FormGroup;
  myForm3: any = FormGroup;
  myForm4: any = FormGroup;
  selectedItems: any = [];
  productDlr: boolean = false;
  dealersArray: any = [];
  storedName124: any;
  loopingdata: any;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private user: UserService,
    private associationService: AssosiationServicesService,
    private materialList: MaterialListService,
    private addMaterials: AddMaterialsService,
    private sharedService: SharedServicesDealerService

  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.getdealerbasedonGeo()
    })
  }

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });
  copyDealersEntriesList:any = [];
  dealerList:any = [];

  ngOnInit(): void {
    this.ProductItems();
    this.dealerItems();
    this.tooltiptable();
    this.copyDealersEntriesList = [];
    this.dealerList = [];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'catId',
      textField: 'catName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'subCatId',
      textField: 'subCatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    };

    this.dropdownSettings4 = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    };
    this.dropdownSettings5 = {
      singleSelection: false,
      idField: 'productCustomIdentifierId',
      textField: 'productCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
    };
    this.myFormDlr = this.fb.group({
      city: [this.selectedItems],
    });
    this.myForm = this.fb.group({
      city1: [this.selectedItems],
    });
    this.myForm1 = this.fb.group({
      city2: [this.selectedItems],
    });
    this.myForm2 = this.fb.group({
      city3: [this.selectedItems],
    });
    this.myForm3 = this.fb.group({
      city4: [this.selectedItems],
    });
    this.myForm4 = this.fb.group({
      city5: [this.selectedItems],
    });
    this.getclassification();
    this.getProduct();
    this.customIdentifier();
  }

  getdealerbasedonGeo() {

    this.storedNames123 = localStorage.getItem("geoAsso");
    var objectsFromStorage = JSON.parse(this.storedNames123)
    alert(objectsFromStorage)
    this.storedName124 = objectsFromStorage;
    this.copyDealersEntriesList = [];
    this.dealerList = [];
    let data = {
      geoId: objectsFromStorage,
      search: "",
    }

    this.associationService.dealerdrop(data).subscribe((res) => {
      console.log(res.response);

      let localdata = res.response
      this.dealersArray = localdata.map((data: { customerId: any; customerName: any; }) => {
        return { customerId: data.customerId, customerName: data.customerName, };
      });
      this.dropdownSettings3 = {
        singleSelection: false,
        idField: 'customerId',
        textField: 'customerName',
        // selectAllText: 'Select All',
        // unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
      };

      this.dealersArray.push()
      this.dealersArray
    })

  }


  onDealerDeSelect(item: any) {
    this.selectedDealerInDropDown.splice(this.selectedDealerInDropDown.indexOf(item.customerId),1);
    this.dealerList.splice(this.dealerList.findIndex(x=> x.dealerId == item.customerId),1);

    // this.catagoryName = item.catName;
    // let dealerdata = {
    //   ProductId: this.productSkuId,
    //   DealerId: this.selectedDealerInDropDown,
    //   SelectedGeoIds: this.storedName124,
    // }
    // this.GetDealearsData(dealerdata);
  }

  onDealerSelect(item: any) {
    this.selectedDealerInDropDown.push(item.customerId);
    console.log("Catttyyyyy", item)
    console.log('item Subcatty', item)
    this.catagoryName = item.catName;
    let dealerdata = {
      ProductId: this.productSkuId,
      DealerId: this.selectedDealerInDropDown,
      SelectedGeoIds: this.storedName124,
    }
    this.GetDealearsData(dealerdata);
  }

  
  GetDealearsData(dealerdata){
    this.associationService.getdealerEntireList(dealerdata).subscribe((res) => {
      let data = res.response;
      debugger
      this.loopingdata = data;
      console.log(' this.loopingdata', this.loopingdata)


      this.ourGeoFormt(res.response)


    });
  }

  formatGeoDetailsObj(geographyData, heirarchyValue) {
    let formatedGeography: any = [];

    geographyData.forEach(element => {
      let copyObject = JSON.parse(JSON.stringify(element));
      let childObj = JSON.parse(JSON.stringify(element));
      for (var i = 0; i < heirarchyValue - 1; i++) {
        let tempObj = JSON.parse(JSON.stringify(childObj));
        if (tempObj.child) {
          delete tempObj.child;
          tempObj = { ...tempObj, ... this.CreateGeoPropertiesObject({ geographyName: tempObj.geographyName, geographyId: tempObj.geographyId }, true) };
          formatedGeography.push(tempObj);
        } else {
          delete tempObj.defaultLevels;
        }
        // delete tempObj.child;
        if (childObj.child) {
          childObj = JSON.parse(JSON.stringify(childObj.child[0]));
        } else {
          tempObj = { ...tempObj, ... this.CreateGeoPropertiesObject({ geographyName: tempObj.geographyName, geographyId: tempObj.geographyId }, true) };
          formatedGeography.push(tempObj);
          formatedGeography = [...formatedGeography, ...childObj.defaultLevels]
          // .push(childObj.defaultLevels);
        }
      }
    });
    return formatedGeography;
  }
  
  ourGeoFormt(reqObj) {
    console.log('req', reqObj);
    
    for (let item of reqObj) {
      console.log(item);
      let isDelaerDataAvailable = this.dealerList.some(x => x.dealerId == item.dealerId);
      if (!isDelaerDataAvailable && item.geoDetails) {

        let formatedGeoObj = this.formatGeoDetailsObj(item.geoDetails, item.defaultHeirarchyLevelId);
        item.formatedGeoGraphy = formatedGeoObj;
        this.dealerList.push(item);
      }

      console.log(this.dealerList);




      // let obj: any = {};
      // obj.dealerId = items.dealerId;
      // obj.dealerName = items.dealerName;
      // obj.defaultHeirarchyLevelId = items.defaultHeirarchyLevelId;

      // // for(let i=0;i>obj.defaultHeirarchyLevelId;i++){
      // // if(items.geoDetails?.child){

      // // }
      // // }
      // if (items?.geoDetails) {
      //   let copyObject = items?.geoDetails;
      //   delete copyObject[0].child;
      //   obj.geographySelected = [copyObject];
      //   obj.geoProperties = [this.CreateGeoPropertiesObject({ geoGraphyName: copyObject.geoGraphyName, geographyId: copyObject.geographyId })];
      // }

      // console.log('obj', obj)
      // let obj1: string[] = [];
      // obj1[0] = obj
      // let result: string[] = [];
      // return console.log('mainobj', obj1);

    }
  }

  CreateGeoPropertiesObject(propertyObj, isInputValueDisable = false) {
    let obj: any = {};
    obj.productSKUGeographyId = propertyObj.productSKUGeographyId ?? "";
    obj.minOrderQty = propertyObj.minOrderQty ?? "";
    obj.discountPercent = propertyObj.discountPercent ?? "";
    obj.maxOrderQty = propertyObj.maxOrderQty ?? "";
    obj.marginPercent = propertyObj.marginPercent ?? "";
    obj.mrp = propertyObj.mrp ?? "";
    obj.leadTime = propertyObj.leadTime ?? "";
    obj.geographyId = propertyObj.geographyId ?? "";
    obj.geographyName = propertyObj.geographyName ?? "";
    obj.registrationNumber = propertyObj.registrationNumber ?? "";
    obj.formDisable = isInputValueDisable;
    return obj;
  }


 
  ProductItems() {
    this.user.getproductlist().subscribe((res: any) => {
      let localdata = res.response;
      console.log('checkdata', localdata)

      this.ProductListArray = localdata.map((data: { productSKUId: any; stockItemName: any; stockItemId: any; }) => {
        return { productSKUId: data.productSKUId, stockItemName: data.stockItemName, stockItemId: data.stockItemId, };
      });

      this.ProductListArray.push()
      console.log('this.ProductListArray', this.ProductListArray)

    });
  }



  dealerItems() {
    this.associationService.getDealers().subscribe((res: any) => {
      let localdata = res.response;
      // console.log('checkdata', localdata)
      this.dealerListArray = localdata.map((data: { customerId: any; customerName: any; }) => {
        return { customerId: data.customerId, customerName: data.customerName };
      });

      this.dropdownSettings3 = {
        singleSelection: false,
        idField: 'customerId',
        textField: 'customerName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
      };

      this.dealerListArray.push()
      console.log('dealerListArray', this.dealerListArray)

    });

  }

  selectedProduct(event) {

    var arry = event.match(/[a-z0-9]+/gi)
    console.log('value', arry)
    let ProductId = arry[0];
    this.productSkuId = ProductId
    let stockItemId = arry[2];
    console.log('value', ProductId)
    this.selectedProduct1 = ProductId;
    this.slectedgeo = true;
    localStorage.setItem('ProductStockItemId', stockItemId);

    this.tooltiptable()
  }
  selectedProduct11(value) {
    let mani
  }

  selectedDealer(value) {
    // alert(value)
    let ProductId = value
    this.selectedDealer2 = ProductId
    localStorage.setItem('ProductStockItemId', ProductId);
    this.tooltiptable()

  }

  // onTypeSelect(item: any) {
  //   console.log(item);
  // }
  // onTypeAll(items: any) {
  //   console.log('onSelectAll', items);
  // }
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
  getclassification() {

    this.materialList.getclassification(this.flag).subscribe((res) => {
      let data = res.response;
      this.coutCatagory = res.totalRecords;
      this.catgname = data.allOtherCats;
      let dataCat = data.allOtherCats;
      this.toppings = new FormControl(this.catgname);
      console.log("coutCategory", this.coutCatagory);
      console.log("this.catgname", this.catgname);
      this.catagData = dataCat.map((data: { catId: any; catName: any; }) => {
        return { catId: data.catId, roleName: data.catName };
      });

      if (!this.catagData?.length) {
        this.catagData = dataCat.map((product: { designationName: any; }) => {
          return product.designationName;
        });
      }
      this.catagData.push()
      this.catagData.forEach(element => {
        return this.catArray.push(element.catId);

      })
    })
  }
  onItemSelect(item: any) {
    this.catergory.push(item.catId);
    console.log("Catttyyyyy", this.catergory)
    console.log('item Subcatty', item)
    this.catagoryName = item.catName;
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
    console.log('this.catergory', this.catergory);

  }
  onItemSelectOrAll(item: any) {
    this.catergory = this.catArray;
    let Subdataall = {
      catId: this.catergory
    }
    console.log("Category Array", this.catergory)
    // this.itemId = item.catId;
    this.catagoryName = item.catName;
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
    console.log("catArray", this.catergory)
  }
  onItemDeSelectOrAll(item: any) {
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    this.typesI = [];

  }
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
      console.log("Typess", this.typeI);
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
    console.log(' this.sub_categorys', this.sub_categorys)

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
    this.typesI = [];
  }
  onTypeSelect(item: any) {
    this.typesData.push(item.typeId);
    this.typesI = this.typesData;
  }
  onTypeDeSelect(item: any) {

    this.typesI.forEach((element, index) => {
      if (element == item.typeId) this.typesI.splice(index, 1);

    });

  }
  onTypeSelectOrAll() {

    this.typessData = this.typeI.map((data: { typeId: any; typeName: any; }) => {
      return { typeId: data.typeId, typeName: data.typeName };
    });

    if (!this.typessData?.length) {
      this.typessData = this.typeI.map((type: { designationName: any; }) => {
        return type.designationName;
      });
    }
    this.typessData.push()
    this.typessData.forEach(element => {
      return this.typessArray.push(element.typeId);

    })
    this.typesI = this.typessArray;
  }
  OnTypeDeselectOrAll() {
    this.typesI = [];
  }
  getProduct() {
    this.materialList.getProduct().subscribe((res) => {
      let data = res.response;
      let dataProd = res.response
      console.log("Product Data", data);
      this.Product = data;
      this.ProductList = new FormControl(this.Product);
      this.prodData = dataProd.map((data: { productGroupId: any; productGroupName: any; }) => {
        return { productGroupId: data.productGroupId, productGroupName: data.productGroupName };
      });

      if (!this.prodData?.length) {
        this.prodData = dataProd.map((category: { designationName: any; }) => {
          return category.designationName;
        });
      }
      this.prodData.push()
      this.prodData.forEach(element => {
        return this.prodArray.push(element.productGroupId);

      })
    })
  }
  onProductSelect(item: any) {
    this.productID.push(item.productGroupId);
  }
  onProductDeSelect(item: any) {
    this.productID.forEach((element, index) => {
      if (element == item.productGroupId) this.productID.splice(index, 1);

    });
  }
  onProductSelectOrAll(item: any) {
    this.productID = this.prodArray;
  }
  onProductDeSelectOrAll(item: any) {
    this.productID = [];
  }
  customIdentifier() {
    this.addMaterials.getProductCustomIdentifier().subscribe((res: any) => {
      this.ProductIdentifier = res.response;
      console.log("ProductIdentifier", this.ProductIdentifier);
    });
  }
  onSelectIdentifierProduct(item: any) {
    this.selectedProductId.push(item.productCustomIdentifierId)
    console.log("Selecteed Identifier", this.selectedProductId);
  }
  onDeSelectIdentifierProduct(item: any) {
    this.selectedProductId.forEach((element, index) => {
      if (element == item.productCustomIdentifierId) this.selectedProductId.splice(index, 1);
    });
    console.log("DeSelecteed Identifier", this.selectedProductId);
  }
  onDSelectOrAllIdentifierProduct(event) {
    this.selectedProductId = [];
    console.log("Deselected DAta", this.selectedProductId);
  }
  onSelectOrAllIdentifierProduct() {
    this.selectAllIdentifierProduct = this.ProductIdentifier.map((data: { productCustomIdentifierId: any; productCustomName: any; }) => {
      return { productCustomIdentifierId: data.productCustomIdentifierId, materilCustomName: data.productCustomName };
    });

    if (!this.selectAllIdentifierProduct?.length) {
      this.selectAllIdentifierProduct = this.ProductIdentifier.map((product: { designationName: any; }) => {
        return product.designationName;
      });
    }
    this.selectAllIdentifierProduct.push()
    this.selectAllIdentifierProduct.forEach(element => {
      return this.selectedIdentifierProductArray.push(element.productCustomIdentifierId);

    })
    this.selectedProductId = this.selectedIdentifierProductArray;
    console.log("All Selected", this.selectedProductId);
  }
  refresh() {
    this.myForm = this.fb.group({
      city1: [this.selectedItems],
    });
    this.myForm1 = this.fb.group({
      city2: [this.selectedItems],
    });
    this.myForm2 = this.fb.group({
      city3: [this.selectedItems],
    });
    this.myForm3 = this.fb.group({
      city4: [this.selectedItems],
    });
    this.myForm4 = this.fb.group({
      city5: [this.selectedItems],
    });
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    this.typesI = [];
    this.productID = [];
    this.selectedProductId = [];
  }
  tooltiptable() {
    // const data ={
    // ProductSKUId : ['49']
    // }
    //  let prodctId =  this.selectedProduct1;
    let prodctId = [this.selectedProduct1];
    this.associationService.tooltipStockItemDetailList(prodctId).subscribe((res: any) => {
      console.log(res.response);
      this.tooltipData = res.response
    })
  }
  tooltipDealerTable() {
    let prodctId = [this.selectedDealer2];
    this.associationService.tooltipStockItemDetailList(prodctId).subscribe((res: any) => {
      console.log(res.response);
      this.tooltipDataDealer = res.response;
    })
  }
}
