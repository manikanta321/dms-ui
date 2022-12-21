import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddIdentifierComponent } from '../add-identifier/add-identifier.component';
import { AddProductGroupComponent } from '../add-product-group/add-product-group.component';
import { AddProductSubGroupComponent } from '../add-product-sub-group/add-product-sub-group.component';
import { SelectProductComponent } from '../select-product/select-product.component';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { MatStepper } from '@angular/material/stepper';
import { SharedServicesMaterialService } from 'src/app/services/shared-services-material.service';
import { MatChip, MatChipList } from '@angular/material/chips';
/**
 * @title Stepper animations
 */
@Component({
  selector: 'app-material-add-editpopup',
  templateUrl: './material-add-editpopup.component.html',
  styleUrls: ['./material-add-editpopup.component.css']
})
export class MaterialAddEditpopupComponent {
  chipControl = new FormControl(new Set());
  labelPosition:any = 'before';
  disabled = false;
  catgname: any = [];
  base64textString = "";
  selecetdFile: any;
  imagePreview: any;
  Imgpreview: boolean = false;
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  toppingList2: any = [];
  toppingList3: any = [];
  actineLabel: any; // countryname: string[] = ['Malaysia (71/126)', 'India (178/178)','Philipines (0/135)'];
  // statename: string[] = ['Johor(0/42)', 'Kedah(36/36','Perak(14/26)','Penang(21/22)'];
  regionname: string[] = ['North(4/4)', 'South(8/8)', 'East(6/6)', 'West(3/4)'];
  cityname: string[] = ['George town', 'Balik Pulau', 'Batu Refringi', 'Teluk Bahang'];
  toprint: boolean = false;
  addButton: boolean = false;
  removelist: boolean = false;
  toggle: boolean = true;
  selectedItem: any = [];
  stateselectedItem: any = [];
  distselectedItem: any = [];
  citySelectedItem: any = []
  ShowFilter = false;
  subCategoryFilter = false;
  myForm: any = FormGroup;
  toppings: any = [];
  toppings1: any = [];
  toppings2: any = [];
  productList: any = [];
  materialIdentifier: any = [];
  selectedProductIdEdit: any = [];
  // selectedItems: any;
  categeoryData: any;
  subCategoryData: any;
  typesData: any;
  baseUoMData: any;
  MaterialIdentifier: any;
  MaterialCustomIdentifiers: any[] = [];
  MaterialCustomIdentifiersEdit: any[] = [];
  productGroupData: any;
  subproductGroupData: any;
  sub_category: any;
  typeI: any;
  rowData5: any = [];
  selectId: any = [];
  subProduct: any = [];
  countryList: any = [];
  countStates: any;
  stateList: any = [];
  countDist: any;
  distList: any = [];
  countCity: any;
  cityList: any = [];
  session: any;
  getEditId: any;
  catId: any;
  subCatId: any;
  typeId: any;
  productId: any;
  subProductId: any;
  uomID: any;
  stateName: any;
  districtName: any;


  materialName: any = '';
  stockItemDesc: string = '';
  desc: any;
  nameM: any;
  expiryDate: any = '';
  BrandName: string = '';
  gloabKey: any;
  Sku: any;
  shortCode: any;
  Sort: any;
  AddSP: any;
  prodId: any;
  editData: boolean = false;
  orderitem1 = true
  districtitem1: boolean = true;
  cityitem1: boolean = true;
  dropdownSettings: IDropdownSettings = {};
  selectfld: any = ['mrp', 'aty'];
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/minimize-tag.png';
  image4 = 'assets/img/minimize-tag.png';
  countrySelected = true;
  RegionExpanded = true;
  CityExpanded = true;
  CountryName: any;
  showDiv: boolean = false
  updateOrSave: boolean = false
  // geograhies related variables



  
  

  geoPropertiesList: any
  geoProperties: any
  gepGraphiesFormGroup!: FormGroup;
  UserId: any;
  geoGraphyHirerachyData: any;
  geoGraphyFullData: any = [];
  selectedGeographiesCityNames: any = [];
  cityCode: any = [];
  cityName: any = [];
  geographyHierarchyId: any;
  aarrayToPush: any[] = [];
  css: any[] = [];
  ProductId: any = []
  businessData: any = [];
  productData: any = [];
  productSettingData: any = [];
  checked: boolean = false
  selectAllIdentifier: any = [];
  selectAllIdentifierProduct: any = [];
  selectedIdentifierArray: any = [];
  selectedIdentifierProductArray: any = [];
  selectedProductId: any = [];
  materialIdentifierPopup: boolean = false;
  selectedData: boolean = false;
  selctedIdentifier: any = [];
  businessSelctedIdentifier: any = [];
  productSelctedIdentifier: any = [];
  productSettingIdentifier: any = [];
  productIdentifierPopup: boolean = false;
  selectable: boolean = true;
  removable: boolean = true;
  bussinessIdentifiers: any;
  ProductIdentifiersId: any;
  ProductIdentifiersSettingId: any;
  seletedItem: any = [];
  MaterialCustomIdentifiersNames:any=[];
  image5 = 'assets/img/minimize-tag.png';
  materialIdentifierexpand = true;
  ProductIdentifiersSettingsNames:any=[];
  ProductIdentifiersNames:any=[];
  businessIdentifiersNames:any=[];
  selectedProductIdentifierData:any=[];
  colorsList = [
    { primaryColor: { background: '#00187A', color: '#fff' }, secondaryColor: { background: "#EAEEFF", color: "#00187A" }, },
    { primaryColor: { background: '#0C5A3E', color: '#fff' }, secondaryColor: { background: "#E6FFF6", color: "#0C5A3E" }, },
    { primaryColor: { background: '#C32F27', color: '#fff' }, secondaryColor: { background: "#FFEDEC", color: "#C32F27" }, },
    { primaryColor: { background: '#3D1A00', color: '#fff' }, secondaryColor: { background: "#D6C8C3", color: "#3D1A00" }, },
    { primaryColor: { background: '#DC0063', color: '#fff' }, secondaryColor: { background: "#FFE1EE", color: "#DC0063" }, },
    { primaryColor: { background: '#8000E2', color: '#fff' }, secondaryColor: { background: "#EFDAFF", color: "#8000E2" }, },
    { primaryColor: { background: '#0E4C6D', color: '#fff' }, secondaryColor: { background: "#D6F1FF", color: "#0E4C6D" }, },
    { primaryColor: { background: '#00187A', color: '#fff' }, secondaryColor: { background: "#EAEEFF", color: "#00187A" }, },
    { primaryColor: { background: '#0C5A3E', color: '#fff' }, secondaryColor: { background: "#E6FFF6", color: "#0C5A3E" }, },
    { primaryColor: { background: '#C32F27', color: '#fff' }, secondaryColor: { background: "#FFEDEC", color: "#C32F27" }, },
    { primaryColor: { background: '#3D1A00', color: '#fff' }, secondaryColor: { background: "#D6C8C3", color: "#3D1A00" }, },
    { primaryColor: { background: '#DC0063', color: '#fff' }, secondaryColor: { background: "#FFE1EE", color: "#DC0063" }, },
  ];
  @ViewChild(MatChipList)
  chipList!: MatChipList;
  value: string[] = [];
  @ViewChild('stepper') private stepper: MatStepper | any;
  dataGetById: any = {};
  selectedHirerachyIndex: number = 0;


  constructor(private fb: FormBuilder, public dialog: MatDialog,
    private spinner: NgxSpinnerService, private addMaterials: AddMaterialsService,
    private sharedService: SharedServicesMaterialService,

    private classification: ClassificationserviseService) {
    this.sharedService.listen().subscribe((m: any) => {
      this.getProductList();

      let item = localStorage.getItem('productId');

      this.addMaterials.getProductSubGroup(item).subscribe((res) => {
        let subProd = res.response;
        console.log("subProd", subProd);
        this.subProduct = subProd;
        // this.toppings2 = new FormControl(this.typeI);
      });

      console.log(m)

    })


  }
  firstFormGroup: FormGroup = this.fb.group({ firstCtrl: [''] });

  secondFormGroup: FormGroup = this.fb.group({ secondCtrl: [''] });

  thirdformGroup: FormGroup = this.fb.group({ thirdCtrl: [''] });

  selectedGeoField: string = "";
  updateGeographyValue: string = "";
  
  applySelectedValue() {
    console.log(this.updateGeographyValue, this.selectedGeoField);

    this.geoGraphyFullData[this.selectedHirerachyIndex].geoProperties.map(x => x[this.selectedGeoField] = this.updateGeographyValue);
    this.selectedGeoField ='';
    this.updateGeographyValue = '';
  }

  ngOnInit(): void {
    this.selectProduct();
    // this.customIdentifier()
    const user = localStorage.getItem("logInId");

    this.UserId = user
    this.dropdownSettings4 = {
      singleSelection: false,
      idField: 'materilCustomIdentifierId',
      textField: 'materialCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: this.ShowFilter
    };
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'productCustomIdentifierId',
      textField: 'productCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: this.ShowFilter
    };
    // this.getGeographyHierarchy();

    this.getProductList();
    this.categeoryData = [];
    this.subCategoryData = [];
    this.typesData = [];
    this.baseUoMData = [];
    this.MaterialCustomIdentifiers = [];
    this.bussinessIdentifiers = [];
    this.ProductIdentifiersId = [];
    this.ProductIdentifiersSettingId = [];
    this.selectedProductId = [];
    this.productGroupData = [];
    this.subproductGroupData = [];
    this.editList()
    this.getclassification();
    this.getAllUom();
    // this.getMaterialIdentifier();
    // this.countryData();
  }
  onKey(event) {
    let inputName = event.target.value;
    this.materialName = inputName;
    console.log("inputName", this.materialName)
  }
  onKeyDesc(event) {
    let inputDesc = event.target.value;
    this.stockItemDesc = inputDesc;
    console.log("stockItemDesc", this.stockItemDesc)
  }
  onKeyExpry(event) {
    let inputExpry = event.target.value;
    this.expiryDate = inputExpry;
    console.log("expiryDate", this.expiryDate)
  }
  onKeyBrand(event) {
    let brandName = event.target.value;
    this.BrandName = brandName;
    console.log("BrandName", this.BrandName)
  }
  onKeyGloabal(event) {
    let gloabK = event.target.value;
    this.gloabKey = gloabK;
    console.log("gloabKey", this.gloabKey)
  }
  onKeySKU(event) {
    let sku = event.target.value;
    this.Sku = sku;
    console.log("Sku", this.Sku)
  }
  onKeyShortCode(event) {
    let shortC = event.target.value;
    this.shortCode = shortC;
    console.log("shortCode", this.shortCode)
  }
  onKeySort(event) {
    let sort = event.target.value;
    this.Sort = sort;
    console.log("Sort", this.Sort)
  }
  onKeyAddSP(event) {
    let AddSp = event.target.value;
    this.AddSP = AddSp;
    console.log("AddSP", this.AddSP)
  }
  editList() {
    this.getEditId = localStorage.getItem('listData');
    console.log("ListData", this.getEditId)
    let editV = localStorage.getItem('Edit');
    this.checked = false;
    if (editV == 'Edit') {
      this.actineLabel = "Edit Material";
      this.updateOrSave = !this.updateOrSave
      this.spinner.show();
      this.addMaterials.onEditList(this.getEditId).subscribe((res) => {
        this.dataGetById = res.response;
        // let isProduct = this.dataGetById.isProduct
        console.log("EditData", this.dataGetById);


        this.getGeographyForMaterial(0, this.getEditId);
        this.editData = true;
        this.dataPreLoadByID();
        if (this.base64textString == " ") {
          this.Imgpreview = false;
        } else {
          this.Imgpreview = true;
        }
        this.spinner.hide();
      })
    }
    else {
      this.actineLabel = "Add Material";
      this.editData = false;
      // this.updateOrSave= this.updateOrSave;
      this.dataGetById = {};
      if (this.base64textString == '') {
        this.Imgpreview = false;
      }


      this.getGeographyForMaterial(0, 0);
    }
  }

  dataPreLoadByID() {

    this.stockItemDesc = this.dataGetById.stockItemDesc
    this.materialName = this.dataGetById.stockItemName
    this.base64textString = this.dataGetById.imageurl

    this.expiryDate = this.dataGetById.expiryPeriod
    this.MaterialCustomIdentifiersEdit = this.dataGetById.materialcustomidentifier
    this.categeoryData = this.dataGetById.categoryId
    if (this.categeoryData != '') {
      this.addMaterials.onclickcat(this.categeoryData).subscribe((res) => {
        let subcaty = res.response;
        console.log("response1", res)
        console.log("catId", this.catId);
        this.sub_category = subcaty.allOtherSubCAts;
        this.toppings1 = new FormControl(this.sub_category);
      });
      this.subCategoryData = this.dataGetById.stockItemSubCategoryId
    }

    if (this.subCategoryData != '') {
      this.addMaterials.onclicksubcat(this.subCategoryData).subscribe((res) => {
        let typs = res.response;
        console.log("subCatId", this.subCatId);
        this.typeI = typs;
        console.log("Typess", this.typeI);
        this.toppings2 = new FormControl(this.typeI);
      });
      this.typesData = this.dataGetById.stockItemTypeId
    }

    if (this.typesData != '') {
      this.getAllUom();
    }
    this.baseUoMData = this.dataGetById.baseUoMId
    this.gloabKey = this.dataGetById.globalCode
    this.Sku = this.dataGetById.productSKUName
    this.shortCode = this.dataGetById.shortCode
    this.BrandName = this.dataGetById.brandName
    this.Sort = this.dataGetById.manualShortOrder
    this.AddSP = this.dataGetById.productLink
    this.productGroupData = this.dataGetById.productGroupId
    if (this.productGroupData != '') {
      this.addMaterials.getProductSubGroup(this.productGroupData).subscribe((res) => {
        let subProd = res.response;
        console.log("subProd", subProd);
        this.subProduct = subProd;
        // this.toppings2 = new FormControl(this.typeI);
      });
      this.subproductGroupData = this.dataGetById.productSubGroupId
    }

    this.selectedProductIdEdit = this.dataGetById.productCustomIdentifierId



    // "materialcustomidentifier": null,
    // "productSubGroupId": 0,
    // "productGeographys": null


  }
  getclassification() {

    this.addMaterials.getclassification().subscribe((res) => {
      let data = res.response;
      this.catgname = data.allOtherCats;
      // let dataCat = data.allOtherCats;
      // this.categeoryData = new FormControl(this.catgname);
    })
  }
  getProductList() {
    this.addMaterials.getProductGroup().subscribe((res) => {
      let data = res.response;
      this.productList = data;
      let prodG = localStorage.getItem('productG')
      console.log("prodG", prodG)
    })
  }

  // productSKUGeographyId
  addMaterialProduct() {
    this.selectedProductId = [...this.bussinessIdentifiers, ...this.ProductIdentifiersSettingId, ...this.ProductIdentifiersId]
    let selectedGeographies = this.geoGraphyFullData[this.geoGraphyFullData.length - 1].geographySelected;
    let data2 = {
      DefalultgeoId: selectedGeographies,
    }
    if (this.geoGraphyFullData[3].geoProperties.length == 0) {
      alert("Plz select atleast one city");
      return;
    }

    this.geoProperties = JSON.parse(JSON.stringify(this.geoGraphyFullData[3].geoProperties));
    this.geoProperties = this.geoProperties.map(item => {
      delete item.geographyName;
      delete item.productSKUGeographyId;
      return item;
    })

    let data = {
      DoneById: this.UserId,
      StockItemSubCategoryId: this.subCatId,
      StockItemTypeId: this.typeId,
      StockItemName: this.materialName,
      StockItemDesc: this.stockItemDesc,
      BaseUoMId: this.uomID,
      Imageurl: this.base64textString,
      Materialcustomidentifier: this.MaterialCustomIdentifiers,
      ExpiryPeriod: this.expiryDate,
      ProductCustomIdentifierId: this.selectedProductId,
      IsProduct: +!this.checked,
      BrandName: this.BrandName,
      GlobalCode: this.gloabKey,
      ProductSKUName: this.Sku,
      ShortCode: this.shortCode,
      ManualShortOrder: this.Sort,
      ProductLink: this.AddSP,
      ProductSubGroupId: this.subProductId,
      ProductGeographys: this.geoProperties

    }

    console.log(data)
    this.addMaterials.addMaterialIfProduct(data).subscribe((res) => {
      console.log(res, "addmaterialProduct")
    })

    this.addMaterials.defaultGeoIdProduct(data2).subscribe((res) => {
      console.log(res, "defaultGeoID")
    })
    this.dialog.closeAll()
  }
  addMaterialProductAfterEdit() {

    if (this.geoGraphyFullData[3].geoProperties.length == 0) {
      alert("Plz select atleast one city");
      return;
    }
    this.geoProperties = JSON.parse(JSON.stringify(this.geoGraphyFullData[3].geoProperties));
    debugger
    this.geoProperties = this.geoProperties.map(item => {
      delete item.geographyName;
      return item;
    })

    let data = {
      stockItemId: this.stockItemId,
      DoneById: this.UserId,
      StockItemSubCategoryId: this.subCategoryData,
      StockItemTypeId: this.typesData,
      StockItemName: this.materialName,
      StockItemDesc: this.stockItemDesc,
      BaseUoMId: this.baseUoMData,
      Imageurl: this.base64textString,
      Materialcustomidentifier: this.MaterialCustomIdentifiersEdit,
      ExpiryPeriod: this.expiryDate,
      ProductCustomIdentifierId: this.selectedProductIdEdit,
      IsProduct: +!this.checked,
      BrandName: this.BrandName,
      GlobalCode: this.gloabKey,
      ProductSKUName: this.Sku,
      ShortCode: this.shortCode,
      ManualShortOrder: this.Sort,
      ProductLink: this.AddSP,
      ProductSubGroupId: this.subproductGroupData,
      ProductGeographys: this.geoProperties

    }

    // console.log(data)
    this.addMaterials.addMaterialIfProduct(data).subscribe((res) => {
      console.log(res, "addmaterialProduct")
    })



  }
  addMaterialIfNotProduct() {
    let data = {
      DoneById: this.UserId,
      StockItemSubCategoryId: this.subCatId,
      StockItemTypeId: this.typeId,
      StockItemName: this.materialName,
      StockItemDesc: this.stockItemDesc,
      BaseUoMId: this.uomID,
      Imageurl: this.base64textString,
      Materialcustomidentifier: this.MaterialCustomIdentifiers,
      ExpiryPeriod: this.expiryDate,
      IsProduct: +!this.checked
    }
    this.addMaterials.MaterialIfNotProduct(data).subscribe((res) => {
      console.log(res, "addmaterialProduct")
    })
    this.dialog.closeAll()
    console.log(data)
  }

  addMaterialIfNotProductAfterEdit() {
    let data = {
      stockItemId: this.stockItemId,
      DoneById: this.UserId,
      StockItemSubCategoryId: this.subCatId,
      StockItemTypeId: this.typeId,
      StockItemName: this.materialName,
      StockItemDesc: this.stockItemDesc,
      BaseUoMId: this.uomID,
      Imageurl: this.base64textString,
      Materialcustomidentifier: this.MaterialCustomIdentifiers,
      ExpiryPeriod: this.expiryDate,
      IsProduct: +!this.checked
    }
    this.addMaterials.MaterialIfNotProduct(data).subscribe((res) => {
      console.log(res, "addmaterialProduct")
    })
    console.log(data)
  }
  onSubCategoryAll(items: any) {
    console.log('onSelectAll', items);
  }
  onItemSelect(item: any) {
    this.catId = item.catId;
    this.addMaterials.onclickcat(item.catId).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("catId", this.catId);
      this.sub_category = subcaty.allOtherSubCAts;
      this.toppings1 = new FormControl(this.sub_category);
    });
  }

  onSubCategorySelect(item: any) {
    this.subCatId = item.subCatId;
    this.addMaterials.onclicksubcat(item.subCatId).subscribe((res) => {
      let typs = res.response;
      console.log("subCatId", this.subCatId);
      this.typeI = typs;
      console.log("Typess", this.typeI);
      this.toppings2 = new FormControl(this.typeI);
    });
  }
  onUomSelect(item: any) {
    this.uomID = item.uoMId
    console.log("this.uomID", this.uomID)

  }
  onProductSelect(item: any) {
    // alert(item.productGroupId);
    this.prodId = item.productGroupId;
    let prodName = item.productGroupName; localStorage
    sessionStorage.setItem("productId", this.prodId)
    sessionStorage.setItem("productName", prodName);
    localStorage.setItem("productId", this.prodId)
    localStorage.setItem("productName", prodName);
    console.log("item.productGroupId", item.productGroupId);
    this.productId = item.productGroupId;
    this.addMaterials.getProductSubGroup(item.productGroupId).subscribe((res) => {
      let subProd = res.response;
      console.log("subProd", subProd);
      this.subProduct = subProd;
      // this.toppings2 = new FormControl(this.typeI);
    });
  }
  onSubProductSelect(item: any) {
    // alert(item.productGroupId);
    console.log("item.productGroupId", item.productGroupId);
    this.subProductId = item.productGroupId;
  }
  countryData() {
    this.addMaterials.getCountryList().subscribe((res) => {
      let data = res.response;
      this.countryList = data.allOtherCountries;
      console.log("country LIst");
      //  let firstCountr =data.firstCountr;
      this.getStateList(data.firstCountr.countryId);
      this.selectedItem = data.firstCountr.countryId;
    })
  }

  getStateList(id: any) {
    localStorage.setItem('countryId', id);
    this.selectedItem = id;
    this.addMaterials.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countStates = data.allOtherGeography.length;
      this.stateList = data.allOtherGeography;
      this.stateselectedItem = data.firstGeography.geographyId;
      this.getDistrictList(data.firstGeography.geographyId)
    })
  }
  getDistrictList(id: any) {
    this.stateselectedItem = id;
    localStorage.setItem("stateId", id);
    this.addMaterials.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countDist = data.allOtherGeography.length;
      this.distList = data.allOtherGeography;
      this.distselectedItem = data.firstGeography.geographyId;
      this.getCityList(data.firstGeography.geographyId);
    })
  }
  getCityList(id: any) {
    this.distselectedItem = id;
    localStorage.setItem('distId', id);
    this.addMaterials.getAllListByCountry(id).subscribe((res) => {
      let data = res.response;
      this.countCity = data.allOtherGeography.length;
      this.cityList = data.allOtherGeography;
      this.citySelectedItem = data.firstGeography.geographyId;
    })
  }
  getAllUom() {
    const data = {
      search: "",
    }
    this.addMaterials.getuomDeatils(data).subscribe((res: any) => {
      console.log('uom list', res.response)

      this.rowData5 = res.response;
    });
  }
  onIdentiSelect(item: any) {
    // alert(item.materialCustomName)
  }
  onTypeSelect(item: any) {
    this.typeId = item.typeId;
  }
  onTypeAll(item: any) {
    console.log(item);
  }
  cname1(cname: string, i: any) {

    if (cname == 'Eectronics') {
      // this.Sname= ['mobile', 'earphone','mouse'];
    }
    if (cname != 'Eectronics') {
      // this.Sname= ['fan','fridge'];


    }
  }
  printvalue(valueofprint: boolean) {
    this.toprint = valueofprint;
  }
  addCategory() {
    this.addButton = true;
  }

  onClick(item) {
    this.selectedItem = item;
  }
  selectProduct() {
    // this.dialog.open(SelectProductComponent);
    // this.getMaterialIdentifier();
    // getMaterialIdentifier(){

    this.addMaterials.getMaterialIdentifier().subscribe((res) => {
      this.selectId = res.response;
      console.log("Selected Data", this.selectId)
      //  this.materialIdentifier =data;
      // this.selectId =  this.materialIdentifier;
      console.log("select Product", this.selectId);
    })
    // }

  }
  addproduct() {
    this.dialog.open(AddProductGroupComponent);
  }
  addproductsubgroup() {
    this.dialog.open(AddProductSubGroupComponent);

  }
  customIdentifier() {
    // this.dialog.open(AddIdentifierComponent);
    this.addMaterials.getProductCustomIdentifier().subscribe((res: any) => {
      this.ProductId = res.response;
      console.log("ProductID", this.ProductId);
      this.businessData = res.response[0].productCustomeIdentifiers;
      console.log("BusinessIdentifier", this.businessData);
      this.productData = res.response[1].productCustomeIdentifiers;
      console.log("ProductIdentifier", this.productData);
      this.productSettingData = res.response[2].productCustomeIdentifiers;
      console.log("productSettingData", this.productSettingData)


    });
  }

  geographyFormat(currentObj, stockItemId) {
    // console.log(currentObj["hirearchyLevel"]);
    if (!Array.isArray(currentObj)) {
      if(currentObj.all == undefined && currentObj.next != undefined) this.geographyFormat(currentObj.next, stockItemId);
      if (!currentObj.all) return;
      let obj: any = {};
      let index = (Number(currentObj["hirearchyLevel"]) - 1);
      obj.allOtherGeography = currentObj.all;
      obj.geographyCount = obj.allOtherGeography.length;
      obj.showAddIcon = false;
      obj.geographyHierarchyName = currentObj.hirearchyName;
      if (currentObj.first) {
        let copyObject = JSON.parse(JSON.stringify(currentObj.first));
        delete copyObject.next;
        obj.geographySelected = [copyObject];
        obj.geographyNamesSelected = [copyObject.geographyName];
        obj.geoProperties = [this.CreateGeoPropertiesObject({ geographyName: copyObject.geographyName, geographyId: copyObject.geographyId })];
      }
      this.removeOtherGeographiesData(Number(currentObj["hirearchyLevel"]));
      this.geoGraphyFullData[index] = obj;
      this.selectedHirerachyIndex = index;
      if (currentObj.first.next) {
        this.geographyFormat(currentObj.first.next, stockItemId);
      }
    } else {
      // For the final defaulted value to append in geography view
      let objDefaut: any = {}
      objDefaut.allOtherGeography = currentObj;

      objDefaut.geoProperties = [];
      objDefaut.geographyNamesSelected = [];
      // Need to check on different conditions
      if (this.dataGetById && this.dataGetById.productGeographys && this.dataGetById.productGeographys.length != 0) {
        this.dataGetById.productGeographys.forEach(item => {
          let selectedCity = currentObj.find(x => x.geographyId == item.geographyId);
          if (selectedCity) {
            objDefaut.geoProperties.push(this.CreateGeoPropertiesObject(item));
            selectedCity.isSelected = true;
          }
        })
        objDefaut.geographySelected = currentObj.filter(x => x.isSelected);
      } else {
        objDefaut.geographySelected = currentObj.filter(x => x.isSelected);
        objDefaut.geographySelected.map(x => {
          objDefaut.geoProperties.push(this.CreateGeoPropertiesObject({ geographyName: x.geographyName, geographyId: x.geographyId }));
        })
      }

      objDefaut.geographyHierarchyName = "City";
      if (objDefaut.geographySelected.length != 0) {
        this.selectedHirerachyIndex = currentObj[0].geographyHierarchyId - 1;
      }


      this.removeOtherGeographiesData(currentObj[0].geographyHierarchyId);
      this.geoGraphyFullData[currentObj[0].geographyHierarchyId - 1] = objDefaut;
    }
  }

  // geograhies related apis
  stockItemId: any;

  getGeographyForMaterial(geographyId, stockItemId) {
    this.spinner.show();

    this.stockItemId = stockItemId;
    this.classification.getGeographyForMaterial(geographyId, stockItemId).subscribe(res => {
      // console.log(res);
      this.spinner.hide();
      this.geoGraphyHirerachyData = JSON.parse(JSON.stringify(res.response));
      this.geographyFormat(res.response, stockItemId);
      console.log(this.geoGraphyFullData);

      // this.getGeographiesDataById(null, 1);
    }, err => {
      console.log(err);
      this.spinner.hide();
    })
  }

  isItemSelected(item, geoItem) {
    // console.log(item.geographySelected, geoItem.geographyId)
    return item.geographySelected.findIndex(x => x.geographyId == geoItem.geographyId) == -1;
  }

  getGeographyHierarchy() {
    this.spinner.show();
    this.geoGraphyHirerachyData = null;
    this.classification.getGeographyHierarchy().subscribe(res => {
      // console.log(res);
      this.spinner.hide();
      this.geoGraphyHirerachyData = res.response;

      console.log('geoGraphyHirerachyData', this.geoGraphyHirerachyData);


      this.geoGraphyFullData = JSON.parse(JSON.stringify(res.response));
      console.log('geoGraphyFullData', this.geoGraphyFullData);
      const hdata = this.geoGraphyFullData.find(a => a.primaryGeographyAssociation == 'Y');

      console.log('hdata', hdata)

      this.geographyHierarchyId = hdata.geographyHierarchyId
      const data = this.geoGraphyFullData.findIndex(a => a.primaryGeographyAssociation == 'Y');
      this.geoGraphyFullData = this.geoGraphyFullData.slice(0, data + 1)

      console.log('data to console1', this.geoGraphyFullData.slice(0, data + 1))


      console.log('geoGraphyFullData', this.geoGraphyFullData);

      this.getGeographiesDataById(null, 1);
    }, err => {
      console.log(err);
      this.spinner.hide();
    })

  }


  selectGeoGraphy(clickedItem, hirerachyIndex,) {
    this.showDiv = true;
    this.selectedHirerachyIndex = (hirerachyIndex - 1);
    this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.forEach(element => {
      if (element.geographyId == clickedItem.geographyId) {
        let index = this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.findIndex(x => x.geographyId == element.geographyId);
        if (index == -1) {
          if (hirerachyIndex == this.geoGraphyFullData.length) {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.push(element);
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.push(element);
            this.geoGraphyFullData[hirerachyIndex - 1].geoProperties.push(this.CreateGeoPropertiesObject({ geographyName: element.geographyName, geographyId: element.geographyId }))
          } else {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [element];
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [element.geographyName];
            this.getGeographyForMaterial(element.geographyId, this.stockItemId);
            this.geoGraphyFullData[hirerachyIndex - 1].geoProperties = [this.CreateGeoPropertiesObject({ geographyName: element.geographyName, geographyId: element.geographyId })];
            // this.getGeographiesDataById(element.geographyId, (hirerachyIndex + 1));
            this.removeOtherGeographiesData(hirerachyIndex);
          }
        } else {
          this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.splice(index, 1);
          this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.splice(index, 1);
          this.geoGraphyFullData[hirerachyIndex - 1].geoProperties.splice(index, 1);
          this.removeOtherGeographiesData(hirerachyIndex);
        }
      }


    });



    if (hirerachyIndex == 1) {
      let Country = clickedItem.geographyName;
      let countryCode = clickedItem.geographyCode;
      this.CountryName = Country + "(" + countryCode + ")";
      console.log("CountryNAme", this.CountryName);
      console.log(clickedItem, hirerachyIndex);
    }
    else if (hirerachyIndex == 2) {
      let stateNamee = clickedItem.geographyName;
      let stateCode = clickedItem.geographyCode;
      this.stateName = stateNamee + "(" + stateCode + ")";
    }
    else if (hirerachyIndex == 3) {
      let districtNamee = clickedItem.geographyName;
      let districtCode = clickedItem.geographyCode;
      this.districtName = districtNamee + "(" + districtCode + ")";
    }
    else if (hirerachyIndex == 4) {

      // this.geoPropertiesList = this.CreatePropertiesObject({});


      // this.cityCode = this.geoGraphyFullData[this.geoGraphyFullData.length - 1].geographyCode;
      // this.cityName = [...this.selectedGeographiesCityNames,]
      // this.selectedGeographiesCityNames+"("+ this.cityCode+")";

      // console.log(this.selectedGeographiesCityNames, "selectedGeographies")
    }

    console.log(this.geoGraphyFullData);
  }

  CreateGeoPropertiesObject(propertyObj) {
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
    return obj;
  }



  removeOtherGeographiesData(hirerachyIndex) {
    for (var i = hirerachyIndex; i < this.geoGraphyFullData.length; i++) {
      this.geoGraphyFullData[i].allOtherGeography = [];
      this.geoGraphyFullData[i].geographySelected = [];
      this.geoGraphyFullData[i].geographyNamesSelected = [];
      this.geoGraphyFullData[i].geoProperties = [];
      this.geoGraphyFullData[i].geographyCount = 0;
      this.geoGraphyFullData[i].showAddIcon = false;
    }

  }
  getGeographiesDataById(id, hirerachyIndex = 0) {
    this.spinner.show();
    console.log(id, hirerachyIndex);
    this.classification.getGeographiesById(id, hirerachyIndex).subscribe(geographiesRes => {
      console.log(geographiesRes);
      this.spinner.hide();
      this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography = geographiesRes.response.allOtherGeography ?? [];
      this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [];
      this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [];
      this.geoGraphyFullData[hirerachyIndex - 1].geographyCount = this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.length;
      this.geoGraphyFullData[hirerachyIndex - 1].geoProperties = [];
      this.geoGraphyFullData[hirerachyIndex - 1].showAddIcon = true;

    }, err => {
      console.log(err);
      this.spinner.hide();
    })
  }
  maxImage = 'assets/img/maximize-arrow.png';
  minImage = 'assets/img/minimize-tag.png';
  expandOrderItemsDiv1() {

    this.orderitem1 = !this.orderitem1;
    if (this.orderitem1 === false) {
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';

    }

  }
  expandDistrictItemsDiv2() {
    this.districtitem1 = !this.districtitem1;
    if (this.districtitem1 === false) {
      this.image2 = 'assets/img/maximize-arrow.png';
    } else {
      this.image2 = 'assets/img/minimize-tag.png';

    }

  }
  expandCityItemsDiv3() {
    this.cityitem1 = !this.cityitem1;
    if (this.cityitem1 === false) {
      this.image3 = 'assets/img/maximize-arrow.png';
    } else {
      this.image3 = 'assets/img/minimize-tag.png';

    }

  }
  // id ptoduct condition

  goBack(stepper: MatStepper) {
    stepper.previous();
  }


  change(e) {


    if (!this.checked) {
      if (confirm("Are you sure")) {
        this.checked = !this.checked;
        this.goBack(this.stepper);

        console.log("toggle")
      }
      else {
        e.source.checked = true;
        console.log("toggle should not change if I click the cancel button")
      }
    } else {
      this.checked = !this.checked;
    }
  }

  // image uploader and converter to base64
  public onFileChanged(event) {
    this.selecetdFile = event.target.files[0];
    if (this.selecetdFile.size <= 1 * 1024 * 1024) {
      this.handleInputChange(this.selecetdFile);
    }
    else {
      alert('File size should not be greater than 1MB');
    }
  }
  handleInputChange(files) {
    this.imagePreview = files
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.imagePreview);
  }
  handleReaderLoaded(e) {
    let reader = e.target;
    this.base64textString = reader.result.substr(reader.result.indexOf(',') + 1);
    if (this.base64textString != '') {
      this.Imgpreview = true;
    }
    console.log(this.base64textString, "base64")
  }

  popup() {
    this.materialIdentifierPopup = true;
  }
  closePopup() {
    this.materialIdentifierPopup = false;
    this.productIdentifierPopup = false;

  }

  productIdentifier() {
    this.productIdentifierPopup = true;
    this.customIdentifier();
  }
  isSelectedMaterialIdentifier(materialIdentifier: any): boolean {
    const index = this.selctedIdentifier.indexOf(materialIdentifier);
    return index >= 0;
  }

  selectMaterialIdentifier(materialIdentifier: any): void {
    // let index = this.selctedIdentifier.indexOf(materialIdentifier);
    let index = this.selctedIdentifier.findIndex(x => x.materilCustomIdentifierId == materialIdentifier.materilCustomIdentifierId)
    if (index >= 0) {
      this.selctedIdentifier.splice(index, 1);
       this.MaterialCustomIdentifiersNames = this.selctedIdentifier.map((materialIdentifier) => materialIdentifier.materialCustomName);
      this.MaterialCustomIdentifiers = this.selctedIdentifier.map((materialIdentifier) => materialIdentifier.materilCustomIdentifierId);
      console.log("MaterialCustomIdentifiers", this.MaterialCustomIdentifiers);
      console.log("MaterialCustomIdentifiersNames", this.MaterialCustomIdentifiersNames);
    } else {
      this.selctedIdentifier.push(materialIdentifier);
       this.MaterialCustomIdentifiersNames = this.selctedIdentifier.map((materialIdentifier) => materialIdentifier.materialCustomName);
      this.MaterialCustomIdentifiers = this.selctedIdentifier.map((materialIdentifier) => materialIdentifier.materilCustomIdentifierId);
      console.log("MaterialCustomIdentifiersNames", this.MaterialCustomIdentifiersNames);
      console.log("MaterialCustomIdentifiers", this.MaterialCustomIdentifiers);
    }
  }
  isSelectedBusiness(businessIdentifier: any): boolean {
    const index = this.businessSelctedIdentifier.indexOf(businessIdentifier);
    return index >= 0;
  }

  selectBusinessProduct(businessIdentifier: any, temp): void {
    let index = this.businessSelctedIdentifier.findIndex(x => x.productCustomIdentifierId == businessIdentifier.productCustomIdentifierId);

    if (index >= 0) {
      this.businessSelctedIdentifier.splice(index, 1);
      this.businessIdentifiersNames = this.businessSelctedIdentifier.map((businessIdentifier) => businessIdentifier.productCustomName);
      this.bussinessIdentifiers = this.businessSelctedIdentifier.map((businessIdentifier) => businessIdentifier.productCustomIdentifierId);
      console.log("bussinessIdentifiers", this.bussinessIdentifiers);
  this.selectedProductIdentifierData = this.businessIdentifiersNames+this.ProductIdentifiersNames+this.ProductIdentifiersSettingsNames;
  console.log("this.selectedProductIdentifierData",this.selectedProductIdentifierData);
      // console.log("businessIdentifiersNames", businessIdentifiersNames);
    } else {
      this.businessSelctedIdentifier.push(businessIdentifier);
      this.businessIdentifiersNames = this.businessSelctedIdentifier.map((businessIdentifier) => businessIdentifier.productCustomName);
      this.bussinessIdentifiers = this.businessSelctedIdentifier.map((businessIdentifier) => businessIdentifier.productCustomIdentifierId);
      // console.log("businessIdentifiersNames", businessIdentifiersNames);
  this.selectedProductIdentifierData = this.businessIdentifiersNames+this.ProductIdentifiersNames+this.ProductIdentifiersSettingsNames;
  console.log("this.selectedProductIdentifierData",this.selectedProductIdentifierData);
      console.log("bussinessIdentifiers", this.bussinessIdentifiers);
    }
  }

  isSelectedProductIdentifier(IdentifierProduct: any): boolean {
    const index = this.productSelctedIdentifier.indexOf(IdentifierProduct);
    return index >= 0;
  }

  selectProductIdentifier(IdentifierProduct: any,temp): void {
    debugger
    let index = this.productSelctedIdentifier.findIndex(x=>x.productCustomIdentifierId==IdentifierProduct.productCustomIdentifierId);

    if (index >= 0) {
      this.productSelctedIdentifier.splice(index, 1);
      this.ProductIdentifiersNames = this.productSelctedIdentifier.map((IdentifierProduct) => IdentifierProduct.productCustomName);
      this.ProductIdentifiersId = this.productSelctedIdentifier.map((IdentifierProduct) => IdentifierProduct.productCustomIdentifierId);
      console.log("ProductIdentifiersId", this.ProductIdentifiersId);
  this.selectedProductIdentifierData = this.businessIdentifiersNames+this.ProductIdentifiersNames+this.ProductIdentifiersSettingsNames;
  console.log("this.selectedProductIdentifierData",this.selectedProductIdentifierData);

      // console.log("ProductIdentifiersNames", ProductIdentifiersNames);
    } else {
      this.productSelctedIdentifier.push(IdentifierProduct);
      this.ProductIdentifiersNames = this.productSelctedIdentifier.map((IdentifierProduct) => IdentifierProduct.productCustomName);
      this.ProductIdentifiersId = this.productSelctedIdentifier.map((IdentifierProduct) => IdentifierProduct.productCustomIdentifierId);
      // console.log("ProductIdentifiersNames", ProductIdentifiersNames);
      console.log("ProductIdentifiersId", this.ProductIdentifiersId);
  this.selectedProductIdentifierData = this.businessIdentifiersNames+this.ProductIdentifiersNames+this.ProductIdentifiersSettingsNames;
  console.log("this.selectedProductIdentifierData",this.selectedProductIdentifierData);

    }
  }


  isSelectedProductIdentifierSetting(IdentifierSetting: any): boolean {
    const index = this.productSettingIdentifier.indexOf(IdentifierSetting);
    return index >= 0;
  }

  selectProductIdentifierSetting(IdentifierSetting: any): void {
    let index = this.productSettingIdentifier.findIndex(x => x.productCustomIdentifierId == IdentifierSetting.productCustomIdentifierId);

    if (index >= 0) {
      this.productSettingIdentifier.splice(index, 1);
      this.ProductIdentifiersSettingsNames = this.productSettingIdentifier.map((IdentifierSetting) => IdentifierSetting.productCustomName);
      this.ProductIdentifiersSettingId = this.productSettingIdentifier.map((IdentifierSetting) => IdentifierSetting.productCustomIdentifierId);
      console.log("ProductSettingIdentifiersId", this.ProductIdentifiersSettingId);
      // console.log("ProductSettingIdentifiersNames", ProductIdentifiersSettingsNames);
  this.selectedProductIdentifierData = this.businessIdentifiersNames+this.ProductIdentifiersNames+this.ProductIdentifiersSettingsNames;
  console.log("this.selectedProductIdentifierData",this.selectedProductIdentifierData);

    } else {
      this.productSettingIdentifier.push(IdentifierSetting);
      this.ProductIdentifiersSettingsNames = this.productSettingIdentifier.map((IdentifierSetting) => IdentifierSetting.productCustomName);
      this.ProductIdentifiersSettingId = this.productSettingIdentifier.map((IdentifierSetting) => IdentifierSetting.productCustomIdentifierId);
      // console.log("ProductSettingIdentifiersNames", ProductIdentifiersSettingsNames);
      console.log("PProductSettingIdentifiersId", this.ProductIdentifiersSettingId);
  this.selectedProductIdentifierData = this.businessIdentifiersNames+this.ProductIdentifiersNames+this.ProductIdentifiersSettingsNames;
  console.log("this.selectedProductIdentifierData",this.selectedProductIdentifierData);

    }
  }
  // this.bussinessIdentifiers,this.ProductIdentifiersSettingId,this.ProductIdentifiersId


   goForward(stepper: MatStepper) {
     stepper.next();
     
  }
   gobackward(stepper: MatStepper) {
    stepper.previous();
    
  }

  
  nextbutton() {
    this.goForward(this.stepper);
      
    
    
   
    
  }

  Backbutton() {
    this.gobackward(this.stepper);

    
    
  
  }
  expandMaterialIdentifier() {

    this.materialIdentifierexpand = !this.materialIdentifierexpand;
    if (this.materialIdentifierexpand === false) {
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';

    }

  }
  refresh() {
    this.selectedGeoField ='';
    this.updateGeographyValue = '';
  }
}



