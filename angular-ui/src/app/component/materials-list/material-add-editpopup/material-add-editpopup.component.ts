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
/**
 * @title Stepper animations
 */
@Component({
  selector: 'app-material-add-editpopup',
  templateUrl: './material-add-editpopup.component.html',
  styleUrls: ['./material-add-editpopup.component.css']
})
export class MaterialAddEditpopupComponent {
  disabled = false;
  catgname: any = [];
  base64textString = "";
  selecetdFile: any;
  imagePreview: any;
  Imgpreview: boolean = false;
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  toppingList2:  any= []; 
  toppingList3:  any= [];
  actineLabel:any ; // countryname: string[] = ['Malaysia (71/126)', 'India (178/178)','Philipines (0/135)'];
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
  // selectedItems: any;
  selectedItems1: any;
  selectedItems2: any;
  selectedItems3: any;
  selectedItems4: any;
  MaterialIdentifier: any;
  selectedItems5: any;
  selectedItems6: any;
  selectedItems7: any;
  sub_category:any;
  typeI:any;
  rowData5:any=[];
  selectId : any =[];
  subProduct:any = [];
  countryList:any =[];
  countStates:any;
  stateList:any =[];
  countDist:any;
  distList:any =[];
  countCity:any;
  cityList:any =[];
  session:any;
  getEditId:any;
  catId:any;
  subCatId:any;
  typeId:any;
  productId:any;
  subProductId:any;
  uomID:any;
  stateName:any;
  districtName:any;
  
  materialName:string ='';
  description:string ='';
  desc:any;
  nameM:any;
  expiryDate:string ='';
  BrandName:string = '';
  gloabKey:any;
  Sku:any;
  shortCode:any;
  Sort:any;
  AddSP:any;
  prodId:any;
  editData:boolean = false;
  orderitem1= true
  districtitem1:boolean =true;
  cityitem1:boolean = true;
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
  // geograhies related variables

  geoPropertiesList: any
  geoProperties:any
  gepGraphiesFormGroup!: FormGroup;
  UserId: any;
  geoGraphyHirerachyData: any;
  geoGraphyFullData: any;
  selectedGeographiesCityNames: any = [];
  cityCode: any = [];
  cityName: any = [];
  geographyHierarchyId: any;
  aarrayToPush: any[] = [];
  css: any[] = [];
  ProductId : any =[]
  checked: boolean = false
  selectAllIdentifier:any=[];
  selectAllIdentifierProduct:any=[];
  selectedIdentifierArray:any=[];
  selectedIdentifierProductArray:any=[];
  selectedProductId:any=[];
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
  @ViewChild('stepper') private stepper: MatStepper | any;;

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

   ngOnInit():void {
this.selectProduct();
this.customIdentifier()
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
    this.getGeographyHierarchy();

    this.getProductList();
    this.selectedItems1 = ["Shivam"];
    this.selectedItems2 = [];
    this.selectedItems3 = [];
    this.selectedItems4 = [];
    this.selectedItems5 = [];
    this.selectedItems6 = [];
    this.selectedItems7 = [];
     this.editList()
this.getclassification();
this.getAllUom();
// this.getMaterialIdentifier();
this.countryData();
   }
   onKey(event) {
    let inputName = event.target.value;
    this.materialName = inputName;
    console.log("inputName", this.materialName)
  }
  onKeyDesc(event) {
    let inputDesc = event.target.value;
    this.description = inputDesc;
    console.log("description", this.description)
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
    if (editV == 'Edit') {
      this.actineLabel = "Edit Material";
      this.addMaterials.onEditList(this.getEditId).subscribe((res) => {
        let data = res.response;
        console.log("EditData", data);
        this.editData = true;
      })
    }
    else {
      this.actineLabel = "Add Material";
      this.editData = false;
    }
  }
  getclassification() {

    this.addMaterials.getclassification().subscribe((res) => {
      let data = res.response;
      this.catgname = data.allOtherCats;
      // let dataCat = data.allOtherCats;
      this.selectedItems1 = new FormControl(this.catgname);
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
  // getMaterialIdentifier() {
  //   this.MaterialIdentifier = localStorage.getItem('session');
  //   console.log("Daatatatatatat5", this.MaterialIdentifier)
  //   this.selectedItems5 = JSON.parse(this.MaterialIdentifier);
  //   console.log("Selected Item 5", this.selectedItems5)
  // }

  addMaterialProduct() {
    let selectedGeographies = this.geoGraphyFullData[this.geoGraphyFullData.length - 1].geographySelected;
    let data2={
      DefalultgeoId:selectedGeographies,
    }
    this.saveMaterialList();
    let data = {
      DoneById: this.UserId,
      StockItemSubCategoryId: this.subCatId,
      StockItemTypeId: this.typeId,
      StockItemName: this.materialName,
      StockItemDesc: this.description,
      BaseUoMId: this.uomID,
      Imageurl: this.base64textString,
      Materialcustomidentifier: this.selectedItems5,
      ExpiryPeriod: this.expiryDate,
      ProductCustomIdentifierId:this.selectedProductId,
      IsProduct: +!this.checked,
      BrandName: this.BrandName,
      GlobalCode: this.gloabKey,
      ProductSKUName: this.Sku,
      ShortCode: this.shortCode,
      ManualShortOrder: this.Sort,
      ProductLink: this.AddSP,
      ProductSubGroupId: this.subProductId,
      ProductGeographys:this.geoProperties

    }
    
    // console.log(data)
    this.addMaterials.addMaterialIfProduct(data).subscribe((res)=>{
      console.log(res,"addmaterialProduct")
    })

    this.addMaterials.defaultGeoIdProduct(data2).subscribe((res)=>{
      console.log(res,"defaultGeoID")
    })
  }
  addMaterialIfNotProduct() {
    let data = {
      DoneById: this.UserId,
      StockItemSubCategoryId: this.subCatId,
      StockItemTypeId: this.typeId,
      StockItemName: this.materialName,
      StockItemDesc: this.description,
      BaseUoMId: this.uomID,
      Imageurl: this.base64textString,
      Materialcustomidentifier: this.selectedItems5,
      ExpiryPeriod: this.expiryDate,
      IsProduct: +!this.checked
    }
    this.addMaterials.MaterialIfNotProduct(data).subscribe((res)=>{
      console.log(res,"addmaterialProduct")
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
  // getCountryList(){
  //   this.calssification.getCountryList().subscribe((res)=>{
  //         let data=res.response;
  //         this.countCountry=res.response.allOtherCountries.length;
  //         this.CountryList=data.allOtherCountries;
  //         this.firstCountr =data.firstCountr;
  //         this.getStateList(data.firstCountr.countryId);
  //         this.selectedItem=data.firstCountr.countryId;

  //       })  
  // }
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
  selectProduct(){
    // this.dialog.open(SelectProductComponent);
    // this.getMaterialIdentifier();
    // getMaterialIdentifier(){
     
      this.addMaterials.getMaterialIdentifier().subscribe((res) => {
        this.selectId = res.response;
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
  customIdentifier(){
    // this.dialog.open(AddIdentifierComponent);
    this.addMaterials.getProductCustomIdentifier().subscribe((res: any) => {

      this.ProductId = res.response;
  
    });
  }


  // geograhies related apis

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

    this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.forEach(element => {
      if (element.geographyId == clickedItem.geographyId) {
        let index = this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.indexOf(element.geographyId);
        if (index == -1) {
          if (hirerachyIndex == this.geoGraphyFullData.length) {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.push(element.geographyId);
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.push(element.geographyName);
            this.geoGraphyFullData[hirerachyIndex - 1].geoProperties.push(this.CreateGeoPropertiesObject({GeographyName:element.geographyName, GeographyId:element.geographyId}))
          } else {
            this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [element.geographyId];
            this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [element.geographyName];
            this.getGeographiesDataById(element.geographyId, (hirerachyIndex + 1));
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

  CreateGeoPropertiesObject(propertyObj){
    let obj:any = {};
    obj.MinOrderQty = propertyObj.MinOrderQty ?? "";
    obj.DiscountPercent = propertyObj.DiscountPercent ?? "";
    obj.MaxOrderQty = propertyObj.MaxOrderQty ?? "";
    obj.MarginPercent = propertyObj.MarginPercent ?? "";
    obj.MRP = propertyObj.MRP ?? "";
    obj.LeadTime = propertyObj.LeadTime ?? "";
    obj.GeographyId = propertyObj.GeographyId ?? "";
    obj.GeographyName = propertyObj.GeographyName ?? "";
    obj.RegistrationNumber = propertyObj.RegistrationNumber ?? "";
    return obj;
  }

  saveMaterialList(){
    this.geoProperties = JSON.parse(JSON.stringify(this.geoGraphyFullData[3].geoProperties));
    this.geoProperties = this.geoProperties.map(item => {
      delete item.GeographyName;
      return item;
    })
    console.log(this.geoProperties);

    
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
        this.goBack(this.stepper)
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
    console.log(this.base64textString, "base64")
  }
  onSelectIdentifier(item:any){
    this.selectedItems5.push(item.materilCustomIdentifierId)
console.log("Selecteed Identifier",this.selectedItems5);
  }
  onDeSelectIdentifier(item:any){
    this.selectedItems5.forEach((element, index) => {
      if (element == item.materilCustomIdentifierId) this.selectedItems5.splice(index, 1);

    });
    console.log("DeSelecteed Identifier",this.selectedItems5);
  }
  onDSelectOrAllIdentifier(event){
  this.selectedItems5 =[];
  console.log("Deselected DAta",this.selectedItems5);
  }
  onSelectOrAllIdentifier(){
    this.selectAllIdentifier = this.selectId.map((data: { materilCustomIdentifierId: any; materilCustomName: any; }) => {
      return { materilCustomIdentifierId: data.materilCustomIdentifierId, materilCustomName: data.materilCustomName };
    });

    if (!this.selectAllIdentifier?.length) {
      this.selectAllIdentifier = this.selectId.map((product: { designationName: any; }) => {
        return product.designationName;
      });
    }
    this.selectAllIdentifier.push()
    this.selectAllIdentifier.forEach(element => {
      return this.selectedIdentifierArray.push(element.materilCustomIdentifierId);

    })
this.selectedItems5 =this.selectedIdentifierArray;
console.log("All Selected",this.selectedItems5);
  }
  onSelectIdentifierProduct(item:any){
    this.selectedProductId.push(item.productCustomIdentifierId)
console.log("Selecteed Identifier",this.selectedProductId);
  }
  onDeSelectIdentifierProduct(item:any){
    this.selectedProductId.forEach((element, index) => {
      if (element == item.productCustomIdentifierId) this.selectedProductId.splice(index, 1);
    });
    console.log("DeSelecteed Identifier",this.selectedProductId);
  }
  onDSelectOrAllIdentifierProduct(event){
  this.selectedProductId =[];
  console.log("Deselected DAta",this.selectedProductId);
  }
  onSelectOrAllIdentifierProduct(){
    this.selectAllIdentifierProduct = this.ProductId.map((data: { productCustomIdentifierId: any; productCustomName: any; }) => {
      return { productCustomIdentifierId: data.productCustomIdentifierId, materilCustomName: data.productCustomName };
    });

    if (!this.selectAllIdentifierProduct?.length) {
      this.selectAllIdentifierProduct = this.ProductId.map((product: { designationName: any; }) => {
        return product.designationName;
      });
    }
    this.selectAllIdentifierProduct.push()
    this.selectAllIdentifierProduct.forEach(element => {
      return this.selectedIdentifierProductArray.push(element.productCustomIdentifierId);

    })
this.selectedProductId =this.selectedIdentifierProductArray;
console.log("All Selected",this.selectedProductId);
  }
}



