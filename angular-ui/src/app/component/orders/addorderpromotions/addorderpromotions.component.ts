import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { ViewPromotionPopupComponent } from '../../pramotion-action/view-promotion-popup/view-promotion-popup.component';
import { PromotionService } from 'src/app/services/promotion.service';
import { Item } from '@generic-ui/ngx-grid/core/structure/source/src/api/item/item';
import { SharedimageService } from 'src/app/sharedimage.service';
import { OrderActionShipmentComponent } from '../order-action-shipment/order-action-shipment.component';

@Component({
  selector: 'app-addorderpromotions',
  templateUrl: './addorderpromotions.component.html',
  styleUrls: ['./addorderpromotions.component.css'],
})
export class AddorderpromotionsComponent implements OnInit {
  statusTypes: any = [];
  StatusFilter = false;
  statusSelection = false;
  toppingList1: any = [];
  toppings1 = new FormControl('');
  statusData: any = [];
  statusArray: any = [];
  selectedStatus: any = [];
  userTypes: any = [];
  limitSelection = false;
  ProductnamecodeForm: any = FormGroup;
  discountAmount: any;
  hidereset: boolean = false;

  NotVisibleProArrow: boolean = true;
  VisibleValumePromotion: boolean = true;
  NotVisibleNonProArrow: boolean = true;
  products: any = FormGroup;
  ProductCodeName: any = FormGroup;
  isAdminLoggedIn: boolean = true;
  inputValue: number | null = null;

  isLoggedIn: boolean = false;
  //  RK IMP Item: any = { quantity: null };
  selectedPromotionTypeName: any;

  enteredValue!: number;
  ProductList: any = [];

  prodArray: any[] = [];
  showdata: boolean = false;
  toggleState: boolean = false;
  tableData: any[] = [];
  allItemsSelected: boolean = false;
  selectedOnly = false;
  allItemsUnselected: boolean = false;
  selectedData: any[] = [];
  showSelectedData: boolean = false;
  isSelected: boolean = false;
  productID: any = [];
  currentSelectedPromos: any = [];

  confirm_Order: boolean = true;

  selectedTeam = '';
  selectedDay: string = '';
  taxid: any = [];
  stockitemid: any = [];
  quantity: any = [];
  dealerInfo = false;
  orderitem = false;
  otherInfo = false;
  PromoExpand = true;
  PromoExpandVlaumepro = true;
  NonPromotion = true;
  viewpromotions = false;
  ConfiromViewPro = false;
  image1 = 'assets/img/expandarrows.svg';
  image2 = 'assets/img/expandarrows.svg';
  image3 = 'assets/img/expandarrows.svg';
  Image44 = 'assets/img/expandarrows.svg';
  image55 = 'assets/img/expand.png';
  buygroupromo: any;
  actineLabel: any;
  updateOrSave: boolean = false;
  editData: boolean = false;
  // non_promotins
  orderNonPromotionsdata: any = [];
  taxdropdowndata: any = [];
  dropdownSettingscat: IDropdownSettings = {};
  dropdownSettingssubcat: IDropdownSettings = {};
  dropdownSettingstypeid: IDropdownSettings = {};
  dropdownproductgroup: IDropdownSettings = {};
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
  getproductForm: any = FormGroup;
  subCategoryFilter = false;
  typeFilter = false;
  type: any = [];
  myFormsIdentifier: any = FormGroup;
  selectedItems: any = [];
  sub_category: any = [];
  sub_categorys: any = [];
  GetProductcategory: any = [];
  proSUBGroup: any = [];
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
  prosubgroupdropdown: any = [];
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
  searchText: any = '';
  typesI: any = [];
  dealersbillingAddress: any = [];
  quantityadd: any = 0;

  promos: any[] = [];

  mrp: any = [];
  mrpadd: any = '';
  price: any = 0;
  err: any = ' ';
  nonpromotionlist: any = [];
  stockitemname: any;
  productSKUName: any;
  materialCustomName: any;
  materialcustomidentifier: any;
  registrationNumber: any;
  uomid: any;
  uomname: any;
  stock: any;
  discount: any;
  finalValue: any;
  taxes: any;
  amount: any;
  userType: any;
  CompanyReferenceNo: any;
  DealerReferenceNo: any;
  DeliveryInstructions: any;
  AddorderNonpromotiondata: any = {};
  AddOrderPromotionData: any = [];
  clickedPromotion: any = null;
  startdate: any;
  minDate = new Date();
  selectedStartDate: any;
  CustomerPoId: any = 0;
  editorderbyID: any = {};
  copyEditOrderById: any;
  shippingPackingchargeDetails: any = {};
  confirmOrder: any;
  dealerDisabled: boolean = false;
  imagesid: any = [];
  arrayOfImages: any = [];
  imagesapis: any = [];
  requestCount = 0;
  resCount = 0;
  rowDataproductGroup = [];
  data: any;
  PromoExpand1: any = true;
  PromoExpand3: any = true;
  dateChange(e) {
    this.selectedStartDate =
      new Date(e.value).getFullYear() +
      '/' +
      (new Date(e.value).getMonth() + 1) +
      '/' +
      new Date(e.value).getDate();
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
  selectedItem = null;
  addButton: boolean = false;
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings11: IDropdownSettings = {};
  DropropDownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  productData: any = [];
  Productarr: any = [];
  selectgeo: any = ['country', 'state'];
  selectbillAddress: any = ['address1', 'address2'];
  selectShippingAddress: any = ['shippingAddress1', 'shipping2'];
  getgroup: string[] = [
    'Product Name',
    'Product Name',
    'Product Name',
    'Product Name',
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
  loginid: any;

  productType: any;
  promotionName: any;
  promotionTypeId: boolean = false;
  promotionTypesName: any;

  public itemremoved: any[] = [
    {
      sValue: '',
      eValue: '',
      pValue: '',
    },
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private productsubgroup: PromotionService,
    private ordersApisService: OrdersApisService,
    private sharedImageService: SharedimageService,
    private http: HttpClient,
    private orders: OrdersApisService,
    private materialList: MaterialListService,
    private addMaterials: AddMaterialsService,
    private dealersList: AssosiationServicesService,
    private sharedService: SharedServiceMaterialListService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>
  ) {
    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.orderNonPromotionsList();
    });
    this.sharedService.getClickEvent().subscribe(() => {
      this.orderNonPromotionsList();
    });
    sort: [];
  }

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });
  promocalculation: any = []
  ngOnInit(): void {
    localStorage.setItem('AddorEditpro', '');
    localStorage.setItem('AddorEditpro1', '');
    this.userType = localStorage.getItem('userType');
    let loginid = localStorage.getItem('logInId');
    this.loginid = localStorage.getItem('logInId');
    if (this.userType == 'Dealer Admin') {
      this.orders.dealersDetails(loginid).subscribe((res) => {
        console.log(res.response);
        this.customerId = res.response.dealerId;
        let obj: any = {
          customerId: this.customerId,
        };
        this.onItemSelectdealers(obj);

        this.dealerDisabled = true;
      });
    }
    this.ordersDealers();

    this.taxdropdown();
    this.getclassification();
    this.selectMaterialIdentifier();
    this.Productgroupset();
    this.onItemProductNameandcodeSelect();
    this.statusItems();

    this.dropdownSettingssubcat = {
      singleSelection: false,
      idField: 'subCatId',
      textField: 'subCatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      // 1  allowSearchFilter: this.subCategoryFilter,
      allowSearchFilter: true,
    };
    console.log(this.dropdownSettingssubcat, 'Check data');
    this.dropdownSettingstypeid = {
      singleSelection: false,
      idField: 'typeId',
      textField: 'typeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      //2  allowSearchFilter: this.typeFilter
      allowSearchFilter: true,
    };
    this.dropdownSettingsmaterialid = {
      singleSelection: false,
      idField: 'materilCustomIdentifierId',
      textField: 'materialCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.typeFilter,
    };
    this.dropdownproductgroup = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };

    this.DropropDownSettings1 = {
      singleSelection: false,
      idField: 'stockItemId',
      textField: 'produCtCodeValue',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };

    (this.dropdownSettings11 = {
      singleSelection: false,
      idField: 'stockItemId',
      textField: 'produCtCodeValue',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    }),
      (this.ProductnamecodeForm = this.fb.group({
        citys: [this.selectedItems],
      }));

    this.categoryForm = this.fb.group({
      categoryy: [this.selectedItems],
    });
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems],
    });
    this.getproductForm = this.fb.group({
      getprocategroy: [this.selectedItems],
    });

    this.type = this.fb.group({
      type: [this.selectedItems],
    });
    this.myFormsIdentifier = this.fb.group({
      identifiers: [this.selectedItems],
    });
    let editV = localStorage.getItem('Edit');
    this.confirmOrder = sessionStorage.getItem('Confirm');
    if (this.confirmOrder == 'Confirm') {
      this.actineLabel = 'Confirm order';
      this.updateOrSave = !this.updateOrSave;
      this.GetOrdersToEdit();
    }
    if (editV == 'Edit') {
      this.actineLabel = 'Edit order';
      this.updateOrSave = !this.updateOrSave;
      this.GetOrdersToEdit();
    } else {
      this.actineLabel = 'Add Order';
      this.editData = false;
      // this.updateOrSave= this.updateOrSave;
      this.editorderbyID = {};
    }
  }

  toggleVisibility() {
    this.NotVisibleProArrow = !this.NotVisibleProArrow;
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
      this.image1 = 'assets/img/expandarrows.svg';
    } else {
      this.image1 = 'assets/img/expandarrows.svg';
    }
  }
  expandPromotions() {
    this.viewpromotions = !this.viewpromotions;

    if (this.viewpromotions === false) {
      this.image1 = 'assets/img/expandarrows.svg';
    } else {
      this.image1 = 'assets/img/expandarrows.svg';
    }
  }

  expandConfirmPromotions() {
    this.ConfiromViewPro = !this.ConfiromViewPro;

    if (this.ConfiromViewPro === false) {
      this.image1 = 'assets/img/expandarrows.svg';
    } else {
      this.image1 = 'assets/img/expandarrows.svg';
    }
  }

  expandOrderItemsDiv() {
    this.orderitem = !this.orderitem;

    if (this.orderitem === false) {
      this.image2 = 'assets/img/expandarrows.svg';
    } else {
      this.image2 = 'assets/img/expandarrows.svg';
    }
  }

  expandOtherInfoDiv() {
    this.otherInfo = !this.otherInfo;

    if (this.otherInfo === false) {
      this.image3 = 'assets/img/expandarrows.svg';
    } else {
      this.image3 = 'assets/img/expandarrows.svg';
    }
  }
  searchTextt: any = '';
  GeographyIdid: any;
  searchData($event: any) {
    const { target } = $event;
    this.searchTextt = target.value;

    const filteredImages = [...this.imagesapis];

    this.arrayOfImages = filteredImages.filter((item: any) => {
      // console.log(this.searchTextt);
      // console.log(item);
      return (
        item.promotionName
          .toLowerCase()
          .includes(this.searchTextt.toLowerCase()) ||
        item.promotionTypesName
          .toLowerCase()
          .includes(this.searchTextt.toLowerCase())
      );
    });
  }

  ExpandPromotion(type: any) {
    if (this.AddOrderPromotionData[type].isOpen == false) {
      this.AddOrderPromotionData[type].isOpen = true;
    } else {
      this.AddOrderPromotionData[type].isOpen = false;
    }
  }

  shouldShowRowq = false;
  public rowVisibility: boolean[] = [];

  toggleRow(index: number) {
    this.rowVisibility[index] = !this.rowVisibility[index];
  }

  ExpandNonPromotion() {
    this.NonPromotion = !this.NonPromotion;

    if (this.NonPromotion === false) {
      this.Image44 = 'assets/img/expand.png';
    } else {
      this.Image44 = 'assets/img/expand.png';
    }
  }

  addEditOrderPromotionList() {
    localStorage.setItem('geographyId', this.geographyId);
    localStorage.setItem('dealerid', this.customerId);

    if (this.geographyId == null || this.customerId == null) {
      // alert('Plz select geography and dealer');
      return;
    }
    console.log('SelectedPromotion', this.AddOrderPromotionData);
    let selectedPromotion = this.AddOrderPromotionData.filter(
      (x) => x.promotionId === this.clickedPromotion
    );
    const dialogRef = this.dialog.open(AddOrderPromotionlistComponent, {
      minWidth: '100vw',
      height: '730px',
      panelClass: 'orders-add-Promotions',
      data: {
        imagesid: [this.clickedPromotion],
        selectedData: selectedPromotion,
      },
      // data: this.AddOrderPromotionData}
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.AddOrderPromotionData = [
          ...this.AddOrderPromotionData.filter(
            (x) => x.promotionId !== this.clickedPromotion
          ),
          ...res,
        ];
        this.clickedPromotion = null;
        console.log(this.AddOrderPromotionData, 'AddOrderPromotionData');
        this.arrayOfImages.forEach((x) => {x.isSelected =this.AddOrderPromotionData.findIndex((y) => y.promotionId === x.productPromotionsId) !== -1;});
        this.caliculateProductAmount();
        this.AddOrderPromotionData.forEach((element) => {
          element.isOpen = true;
          // element.push({ isOpen: false }); // Corrected this part
        });
        this.getShippingandPackingcharges();
        this.promotionName = localStorage.getItem('PromotionName');
        this.promotionTypesName = localStorage.getItem('PromotionTypeName');
      }

    });
    // localStorage.setItem('buygroupromo', '')
  }

  promotionQTY :number = 0;
  promotionAmount :number = 0;
  nonPromotionQTY:number = 0;
  nonPromotionAmount:number = 0;
  caliculateProductAmount() {
    const allExtractedData: any = [];
    let overallQty = 0;
    let overallAmount = 0;

    
    function extractInformation(item) {
      const itemDetails = item.itemDetails.filter((subItem) => subItem.isBuyProduct);
      const totalQuantity = itemDetails.reduce((total, subItem) => total + subItem.quantity, 0);
      const totalPrice = itemDetails.reduce((total, subItem) => total + subItem.price, 0);
      const totalFinalPrice = itemDetails.reduce((total, subItem) => total + subItem.finalValue, 0);
      overallQty += totalQuantity;
      overallAmount += totalFinalPrice;
      
      const extractedItem = {
        promotionId: item.promotionId,
        previousValues: {
          quantity: totalQuantity,
          price: totalPrice,
          finalPrice: totalFinalPrice,
        },
      };
      allExtractedData.push(extractedItem);
    }
    this.AddOrderPromotionData.forEach(extractInformation);
    this.promotionAmount = overallAmount;
    this.promotionQTY = overallQty;
    this.nonPromotionQTY = 0;
    this.nonPromotionAmount = 0; 

    this.orderNonPromotionsdata.forEach((item) => {
      if (item.isPromotionSelected) {
        this.nonPromotionQTY += item.quantity; // update here
        this.nonPromotionAmount += (item.quantity ?? 0) * item.price;// update here
      }
    });

    // console.log("******************************************");
    const overallData = {
      overallQty: overallQty + this.nonPromotionQTY,
      overallAmount: overallAmount + this.nonPromotionAmount,
      extractedData: allExtractedData,
    };
    localStorage.setItem('calculation', JSON.stringify(overallData));
    console.log(overallData);
  }

  
  getPromotionsImages() {
    let data = {
      Dealerid: this.customerId,
      GeographyIdid: this.geographyId,
    };
    console.log(data, 'dealer and ge data');
    this.showSpinner();
    this.arrayOfImages = [];
    this.orders.orderpromotionimages(data).subscribe({
      next: (res: any) => {
        this.imagesapis = res.response;
        if (this.imagesapis == '') {
          this.arrayOfImages = [];
        }
        this.hideSpinner();
        console.log(this.imagesapis, 'imagesres');
        this.imagesapis.forEach((item) => {
          console.log(this.AddOrderPromotionData);
          let index = this.AddOrderPromotionData.findIndex(
            (x) =>
              x.promotionId == item.promotionId ||
              x.promotionId == item.productPromotionsId
          );
          let obj = {
            productPromotionsId: item.productPromotionsId,
            isSelected: index !== -1 ? true : false,
            promotionTypesId: item.promotionTypesId,
            promotionName: item.promotionName,
            imageurl: item.imageurl,
            promotionTypesName: item.promotionTypesName,
          };
          this.arrayOfImages.push(obj);
          // onFileChange(event: any) {
          // const file = item.imageurl;
          // if (file) {
          //   const reader = new FileReader();
          //   reader.onloadend = () => {
          //     const imageData = reader.result as string;
          //     this.sharedImageService.setSelectedImage(imageData);
          //   };
          //   reader.readAsDataURL(file);
          // }
          // }
        });
        // console.log("ArrayOfImagessss", this.arrayOfImages)
        // let previousSelectedPromos = []
        // this.arrayOfImages.forEach(x => {
        //   if (x.isSelected) this.imagesid.push(x.productPromotionsId);
        // })
        // if (this.imagesid.length > 0)
        //   this.getProductsOfPromotionForOrder();
        // console.log("ArrayOfImages", this.arrayOfImages)
      },
      error: () => {
        this.hideSpinner();
      },
    });
  }

  showSpinner() {
    this.requestCount++;
    this.spinner.show();
  }
  hideSpinner() {
    this.resCount++;
    this.resCount == this.requestCount
      ? this.spinner.hide()
      : this.spinner.show();
    console.log(this.resCount, this.requestCount);
  }
  // getProductsOfPromotionForOrder() {
  //   alert("Helloo")
  // }
  totalQuantity: any;
  totalAmount: any;
  ForthPromotionsSelectedQuantity: number | any = 0;
  ForthPromotionTotalAmount: number | any = 0;
  ThreePromotionTotalselectedQTY: number | any = 0;
  ThreePromotionTotalAmount: number | any = 0;
  addOrderNonPromotionList() {

    this.promocalculation = JSON.parse(localStorage.getItem('calculation') || 'null')
    console.log(this.promocalculation, 'calculationpart');
    // 4 Promotion Calculations
    this.ForthPromotionsSelectedQuantity = localStorage.getItem(
      'ForthPromotionSelectedQTy'
    );
    this.ForthPromotionsSelectedQuantity = JSON.parse(
      this.ForthPromotionsSelectedQuantity
    );

    this.ForthPromotionTotalAmount = localStorage.getItem(
      'ForthPromotionTotalAmount'
    );
    this.ForthPromotionTotalAmount = JSON.parse(this.ForthPromotionTotalAmount);

    //  3 Promotion calculations
    this.ThreePromotionTotalselectedQTY = localStorage.getItem(
      'ThreePrommotionTotalselectedQuantity'
    );
    this.ThreePromotionTotalselectedQTY = JSON.parse(
      this.ThreePromotionTotalselectedQTY
    );

    this.ThreePromotionTotalAmount = localStorage.getItem(
      'ThreePromotionTotalAmount'
    );
    this.ThreePromotionTotalAmount = JSON.parse(this.ThreePromotionTotalAmount);

    localStorage.setItem('geographyId', this.geographyId);
    localStorage.setItem('dealerid', this.customerId);

    if (this.geographyId == null || this.customerId == null) {
      // alert('Plz select geography and dealer');
      return;
    }

    const storedValue = localStorage.getItem('totalQuantity');
    if (storedValue) {
      this.totalQuantity = JSON.parse(storedValue);
    } else {
      this.totalQuantity = 0;
    }

    const storedAmount = localStorage.getItem('totalAmount');
    if (storedAmount) {
      this.totalAmount = JSON.parse(storedAmount);
    } else {
      this.totalAmount = 0;
    }

    this.orderNonPromotionsList();
    this.Non_promotions = true;
  }

  editPromotionItem(promotionId) {
    this.imagesid = [];
    this.arrayOfImages.forEach((x) => {
      if (x.isSelected) this.imagesid.push(x.productPromotionsId);
    });
    this.clickedPromotion = promotionId;
    this.addEditOrderPromotionList();
  }
  removePromotionItem(clickedItem, promotionId) {
    console.log(promotionId);
    // alert(promotionId);
    let calculationRemove = JSON.parse(localStorage.getItem('calculation') || '[]');
    console.log(calculationRemove, 'calculation');

    const indexToRemove = calculationRemove.extractedData.findIndex((x) => x.promotionId === promotionId);
    if (indexToRemove !== -1) {
      const removedItem = calculationRemove.extractedData[indexToRemove];
      calculationRemove.extractedData.splice(indexToRemove, 1);
      // Subtract the removed item's values from overallQty and overallAmount
      calculationRemove.overallQty -= removedItem.previousValues.quantity;
      calculationRemove.overallAmount -= removedItem.previousValues.finalPrice;
      localStorage.setItem("calculation", JSON.stringify(calculationRemove));
    }
    console.log(calculationRemove, 'afterremove data');
    // this.productType = localStorage.removeItem('PromotionType');
    this.promotionName = localStorage.getItem('PromotionName');
    this.promotionTypesName = localStorage.getItem('PromotionTypeName');
    // let ClickedPromotionObj = this.AddOrderPromotionData.find(x => x.promotionId == promotionId);
    let index = this.AddOrderPromotionData.findIndex(
      (x) => x.promotionId == promotionId
    );
    this.AddOrderPromotionData.splice(index, 1);

    this.arrayOfImages.map((x) => {
      x.isSelected =
        this.AddOrderPromotionData.findIndex(
          (y) => y.promotionId == x.productPromotionsId
        ) !== -1;
    });
    this.getShippingandPackingcharges();
    // localStorage.removeItem('totalQuantity');
    // localStorage.removeItem('totalAmount');

    // 4 Promotions
    localStorage.removeItem('ForthPromotionTotalAmount');
    localStorage.removeItem('ForthPromotionSelectedQTy');

    // 3 Promotions
    localStorage.removeItem('ThreePrommotionTotalselectedQuantity');
    localStorage.removeItem('ThreePromotionTotalAmount');
  }
  
  toggledata:any
  toggleStateNonPromodata:boolean=false;
  toggleDATA() {
    this.toggleStateNonPromodata = !this.toggleStateNonPromodata;
  
    if (this.toggleStateNonPromodata) {
      this.toggledata = this.orderNonPromotionsdata.filter(
        (Item) => Item.isPromotionSelected === true
      );
    } else {
      this.toggledata = this.orderNonPromotionsdata;
    }
  }



  removeNonPromotionItem(clickedItem) {
    let index = this.nonpromotionlist.findIndex(
      (x) => x.stockitemid == clickedItem.stockitemid
    );
    this.nonpromotionlist.splice(index, 1);

  //  this.UpdatedQty=this.stockitemid.splice(index,1);

    this.nonpromotionlist = this.nonpromotionlist.map((x, i) => {
      x.promotionName = 'NP' + (i + 1);
      return x;
    });

    this.AddorderNonpromotiondata.itemDetails = this.nonpromotionlist;
    this.getShippingandPackingcharges();
    this.clearQuantity();
    this.resetQuantity();
    // localStorage.removeItem('totalQuantity');
    // localStorage.removeItem('totalAmount');

    // 1 Promotions Calculations
    // localStorage.removeItem('FirstPromotionCalculation');
    // localStorage.removeItem('FirstPromotionTotalAmountValue');

    // 4 Promotions Calculations
    // localStorage.removeItem('ForthPromotionCalculationsTotalQty');
    // localStorage.removeItem('ForthPromotionCalculationsAmount');

    // 3 Promotions calculations
    //  localStorage.removeItem('ThreeePromotionCalculationsTotalQty');
    //   localStorage.removeItem('ThreePromotionCalculationsAmount');

    this.DisplayNonpromotion = false;
   
    
  }

  // non-prmotions

  refresh() {
    this.ProductnamecodeForm = this.fb.group({
      citys: [this.selectedItems],
    });
    this.categoryForm = this.fb.group({
      categoryy: [this.selectedItems],
    });
    this.ProductnamecodeForm = this.fb.group({
      citys: [this.selectedItems],
    });
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems],
    });
    this.getproductForm = this.fb.group({
      getprocategroy: [this.selectedItems],
    });

    this.type = this.fb.group({
      type: [this.selectedItems],
    });
    this.myFormsIdentifier = this.fb.group({
      identifiers: [this.selectedItems],
    });
    const data = {
      Statuss: [],
      //  ProductNameAndCode:[],
      ProductNameAndCode: this.statusTypes,
      Search: '',
    };
    this.orders.GetProductNameCode().subscribe((res) => {
      this.toppingList1 = res.response;
      console.log(this.toppingList1, 'RK');
    });

    this.catergory = [];
    this.sub_category = [];
    this.GetProductcategory = [];
    this.sub_categorys = [];
    this.typesI = [];
    this.statusTypes = [];
    this.typeI = [];
    this.materialIdentifierData = [];

    this.onItemProductNameandcodeSelect();
  }
  closePopup() {
    this.Non_promotions = false;
    // this.dialogRef.close();
  }

  ordersDealers() {
    this.dealersList.getDealers().subscribe((res: any) => {
      let localdata = res.response;
      console.log('checkdata', localdata);

      this.dealerListArray = localdata.map(
        (data: { customerId: any; customerName: any }) => {
          return {
            customerId: data.customerId,
            customerName: data.customerName,
          };
        }
      );

      // this.dealerListArray.push()
      console.log(this.dealerListArray, 'dealersdata');
    });
  }

  onItemSelectdealers(item: any) {
    let prev_dealer = JSON.parse(localStorage.getItem('dealerid')||'null')
    if(prev_dealer !==item.customerId){
    // alert('removing previous dealer items')
    localStorage.removeItem('calculation')
    }
    localStorage.removeItem('totalQuantity');
    localStorage.removeItem('totalAmount');
    this.customerId = item.customerId;
    localStorage.setItem('dealerid', this.customerId);
    localStorage.removeItem('geographyId');
    this.geographyId = null;
    this.AddOrderPromotionData = [];
    this.orders.GetGeoGrapydropdownList(this.customerId).subscribe((res) => {
      let GeoGrapydropdownList = res.response;
      console.log(GeoGrapydropdownList, 'GeoGrapydropdownList');
      this.GeoGrapydropdownListdata = GeoGrapydropdownList.map(
        (data: { geographyId: any; geographyName: any }) => {
          return {
            geographyId: data.geographyId,
            geographyName: data.geographyName,
          };
        }
      );

      if (this.GeoGrapydropdownListdata.length != 0) {
        this.onItemSelectgeo(this.GeoGrapydropdownListdata[0]);
      }
      console.log(this.GeoGrapydropdownListdata, 'GeoGrapydropdownListdata');
    });
    // shipping api
    this.orders.GetShipingAddress(this.customerId).subscribe((res: any) => {
      let shippingAddress = res.response;

      this.dealersShippingAddress = shippingAddress.map(
        (data: { addressId: any; address: any }) => {
          return { addressId: data.addressId, address: data.address };
        }
      );

      if (this.dealersShippingAddress.length != 0) {
        this.onItemSelectshippingAddress(this.dealersShippingAddress[0]);
      }
      console.log(shippingAddress, 'shipping address');
      console.log(this.dealersShippingAddress, 'shipping address1');
    });
    // billing api
    this.orders.GetBillingAddress(this.customerId).subscribe((res: any) => {
      let BillingAddress = res.response;

      this.dealersbillingAddress = BillingAddress.map(
        (data: { addressId: any; address: any }) => {
          return {
            BillingaddressId: data.addressId,
            Billingaddress: data.address,
          };
        }
      );

      if (this.dealersbillingAddress.length != 0) {
        this.onItemSelectBillingAddress(this.dealersbillingAddress[0]);
      }
      console.log(BillingAddress, 'billing address');
      console.log(this.dealersbillingAddress, 'billing address2');
    });
    console.log(this.customerId, 'dealrs id');
    // this.getPromotionsImages();
    console.log('geoooo', this.geographyId);
    console.log('customerId', this.customerId);
  }

  onItemSelectgeo(item: any) {
    this.geographyId = item.geographyId;
    localStorage.setItem('geographyId', this.geographyId);
    console.log(this.geographyId, 'geographyId');
    this.getPromotionsImages();
    console.log('CustomerID', this.customerId);
    console.log('GeographyId', this.geographyId);
  }
  onItemSelectshippingAddress(item: any) {
    this.addressId = item.addressId;
    // console.log(this.shippingaddressId, "shippingaddressId")
  }
  onItemSelectBillingAddress(item: any) {
    this.BillingaddressId = item.BillingaddressId;
    console.log(this.BillingaddressId, 'BillingaddressId');
  }
  // on search
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
      CurrentUserId: this.loginid,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  getclassification() {
    this.materialList.getclassification(this.flag).subscribe((res) => {
      let data = res.response;
      this.countCatagory = res.totalRecords;
      this.catagoryData = data.allOtherCats;
      let dataCat = data.allOtherCats;
      this.toppings = new FormControl(this.catagoryData);
      this.categoryMapData = dataCat.map(
        (data: { catId: any; catName: any }) => {
          return { catId: data.catId, roleName: data.catName };
        }
      );

      if (!this.categoryMapData?.length) {
        this.categoryMapData = dataCat.map(
          (product: { designationName: any }) => {
            return product.designationName;
          }
        );
      }
      this.categoryMapData.push();
      this.categoryMapData.forEach((element) => {
        return this.categoryArray.push(element.catId);
      });
    });
    this.dropdownSettingscat = {
      singleSelection: false,
      idField: 'catId',
      textField: 'catName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      //  allowSearchFilter: this.ShowFilter,
      allowSearchFilter: true,
    };
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings11 = Object.assign({}, this.dropdownSettings11, {
      allowSearchFilter: this.ShowFilter,
    });
  }
  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings11 = Object.assign({}, this.dropdownSettings11, {
        limitSelection: 2,
      });
    } else {
      this.dropdownSettings11 = Object.assign({}, this.dropdownSettings11, {
        limitSelection: null,
      });
    }
  }
  onItemProductNameandcodeSelect() {
    const data = {
      ProductNameAndCode: this.statusTypes,
      Search: this.searchText,
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };

    this.orders.GetProductNameCode().subscribe((res) => {
      this.toppingList1 = res.response;
      console.log(this.toppingList1, 'RK');
    });
  }

  statusItems() {
    this.orders.GetProductNameCode().subscribe((res: any) => {
      this.toppingList1 = res.response;
      let dataCat = this.toppingList1;
      this.statusData = dataCat.map(
        (data: { stockItemId: any; produCtCodeValue: any }) => {
          return {
            stockItemId: data.stockItemId,
            produCtCodeValue: data.produCtCodeValue,
          };
        }
      );
      if (!this.statusData?.length) {
        this.statusData = dataCat.map((product: { designationName: any }) => {
          return product.designationName;
        });
      }
      this.statusData.push();
      console.log('StatusData', this.statusData);
      this.statusData.forEach((element) => {
        return this.statusArray.push(element.stockItemId);
      });
      console.log('statusArray', this.statusArray);
      this.dropdownSettings11 = {
        singleSelection: false,
        idField: 'stockItemId',
        textField: 'produCtCodeValue',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true,
      };
      this.selectedStatus = [];
      this.toppings1 = new FormControl(this.toppingList1);
    });
  }

  onProductcodenameSelect(item: any) {
    console.log(this.statusTypes, '=======');
    this.statusTypes.push(item.stockItemId);
    const data = {
      ProductNameAndCode: this.statusTypes,
      Search: this.searchText,
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onProductCodeNameDeSelect(item: any) {
    this.statusTypes.forEach((element, index) => {
      if (element == item.stockItemId) this.statusTypes.splice(index, 1);
    });
    console.log(' this.statusTypes', this.userTypes);
    const data = {
      ProductNameAndCode: this.statusTypes,
      Search: this.searchText,
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onItemDeSelectOrAllProductNameCode(item: any) {
    this.statusTypes = [];
    const data = {
      ProductNameAndCode: this.statusTypes,
      Search: this.searchText,
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onItemSelectOProductCodeName(item: any) {
    this.statusTypes = this.statusArray;
    console.log('StatusArray', this.statusArray);
    console.log('y this is not coming', this.statusTypes);
    const data = {
      ProductNameAndCode: this.statusTypes,
      Search: this.searchText,
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  // cat selectorders
  onItemSelect(item: any) {
    // this.selectedItem = item;
    this.catergory.push(item.catId);
    console.log('Catttyyyyy', this.catergory);
    console.log('item Subcatty', item);

    // this.itemId = item.catId;
    // this.catagoryName = item.catName;
    let Subdata = {
      catId: this.catergory,
      flag: this.flag,
    };
    this.materialList.onclickcat(Subdata).subscribe((res) => {
      let subcaty = res.response;
      console.log('response1', res);
      console.log('responseeee', subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      console.log('SubCategory', this.sub_category);
      this.topping1 = new FormControl(this.sub_category);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  onItemDeSelect(item: any) {
    this.catergory.forEach((element, index) => {
      if (element == item.catId) this.catergory.splice(index, 1);
    });
    let SubdataD = {
      catId: this.catergory,
    };
    if (this.catergory.length == 0) {
      this.sub_categorys = [];
      this.GetProductcategory = [];
      this.sub_category = [];
      this.typeI = [];
      this.typesI = [];
    }
    this.materialList.onclickcat(SubdataD).subscribe((res) => {
      let subcaty = res.response;
      console.log('response1', res);
      console.log('responseeee', subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
    console.log('this.catergory', this.catergory);
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems],
    });
    this.type = this.fb.group({
      type: [this.selectedItems],
    });
    this.getproductForm = this.fb.group({
      getprocategroy: [this.selectedItems],
    });
  }
  onItemSelectOrAll(item: any) {
    this.catergory = this.categoryArray;
    let Subdataall = {
      catId: this.catergory,
    };
    console.log('Category Array', this.catergory);
    // this.itemId = item.catId;
    // this.catagoryName = item.catName;
    this.materialList.onclickcat(Subdataall).subscribe((res) => {
      let subcaty = res.response;
      console.log('responseeee', subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      let allSub_cats = subcaty.allOtherSubCAts;
      console.log('SubCategory', this.sub_category);
      this.subcatagData = allSub_cats.map(
        (data: { subCatId: any; subCatName: any }) => {
          return { subCatId: data.subCatId, subCatName: data.subCatName };
        }
      );

      if (!this.subcatagData?.length) {
        this.subcatagData = allSub_cats.map(
          (subCatData: { designationName: any }) => {
            return subCatData.designationName;
          }
        );
      }
      this.subcatagData.push();
      this.subcatagData.forEach((element) => {
        return this.subcatArray.push(element.subCatId);
      });
      console.log('SubCategoryArrayy', this.subcatArray);
      this.topping1 = new FormControl(this.sub_category);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
    console.log('catArray', this.catergory);
  }
  onItemDeSelectOrAll(item: any) {
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems],
    });
    this.type = this.fb.group({
      type: [this.selectedItems],
    });
    this.catergory = [];
    this.sub_category = [];
    (this.GetProductcategory = []), (this.sub_categorys = []);
    this.typesI = [];
    this.typeI = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  // sub cat
  onSubCategorySelect(item: any) {
    console.log(' item Types', item);
    this.sub_categorys.push(item.subCatId);
    let Type = {
      subCatId: this.sub_categorys,
      flag: this.flag,
    };
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log('types..res', typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onSubCategoryDeSelect(item: any) {
    this.sub_categorys.forEach((element, index) => {
      if (element == item.subCatId) this.sub_categorys.splice(index, 1);
    });
    let subCat = {
      subCatId: this.sub_categorys,
    };
    if (this.sub_categorys.length == 0) {
      this.typeI = [];
      this.typesI = [];
    }
    this.materialList.onclicksubcat(subCat).subscribe((res) => {
      let typs = res.response;
      console.log('types..res', typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
    console.log(' this.typeI', this.typeI);
    this.type = this.fb.group({
      type: [this.selectedItems],
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      Search: this.searchText,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  onSubCategorySelectOrAll() {
    this.sub_categorys = this.subcatArray;
    console.log('subCattyyArrayy', this.sub_categorys);
    let Type = {
      subCatId: this.sub_categorys,
    };
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log('types..res', typs);
      this.typeI = typs;
      this.topping2 = new FormControl(this.typeI);
    });
    console.log('subcategoriesssss', this.sub_categorys);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  onSubCategoryDSelectOrAll(item: any) {
    this.sub_categorys = [];
    this.typesI = [];
    this.typeI = [];
    this.type = this.fb.group({
      type: [this.selectedItems],
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  // typeselect
  onTypeSelect(item: any) {
    this.typesI.push(item.typeId);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onTypeDeSelect(item: any) {
    this.typesI.forEach((element, index) => {
      if (element == item.typeId) this.typesI.splice(index, 1);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,

      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onTypeSelectOrAll() {
    this.typesMapData = this.typeI.map(
      (data: { typeId: any; typeName: any }) => {
        return { typeId: data.typeId, typeName: data.typeName };
      }
    );

    if (!this.typesMapData?.length) {
      this.typesMapData = this.typeI.map((type: { designationName: any }) => {
        return type.designationName;
      });
    }
    this.typesMapData.push();
    this.typesMapData.forEach((element) => {
      return this.typesArray.push(element.typeId);
    });
    this.typesI = this.typesArray;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  productMapData: any = [];
  productArray: any = [];

  OnTypeDeselectOrAll() {
    this.typesI = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  // material select
  selectMaterialIdentifier() {
    this.addMaterials.getMaterialIdentifier().subscribe((res) => {
      this.materialIdentifier = res.response;
      console.log('materialIdentifier', this.materialIdentifier);
    });
    // }
  }
  Productgroupset() {
    // const  data = {
    //   Search : ''
    //   }
    const data = {
      category: [],
      subCategory: [],
      type: [],
      productgroup: [],
      productidentifier: [],
      search: '',
    };
    this.productsubgroup.GetProductGroupList(data).subscribe((res) => {
      this.prosubgroupdropdown = res.response;
      console.log(
        'check the data is coming or not GetProductGroupList ',
        this.prosubgroupdropdown
      );
    });
  }
  onLoad() {
    const data = {
      Search: '',
    };
    this.prosubgroupdropdown.GetProductGroupList(data).subscribe((res) => {
      this.rowDataproductGroup = res.response;
    });
  }

  onMaterialIdentifierSelect(item: any) {
    this.materialIdentifierData.push(item.materilCustomIdentifierId);
    console.log('materialIdentifier', this.materialIdentifierData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  onMaterialIdentifierDeSelect(item: any) {
    this.materialIdentifierData.forEach((element, index) => {
      if (element == item.materilCustomIdentifierId)
        this.materialIdentifierData.splice(index, 1);
    });
    console.log('materialIdentifier', this.materialIdentifierData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  onMaterialIdentifierSelectOrAll() {
    this.materialIdentifierMapData = this.materialIdentifier.map(
      (data: {
        materilCustomIdentifierId: any;
        materialIdentifierName: any;
      }) => {
        return {
          materilCustomIdentifierId: data.materilCustomIdentifierId,
          materialIdentifierName: data.materialIdentifierName,
        };
      }
    );

    if (!this.materialIdentifierMapData?.length) {
      this.materialIdentifierMapData = this.materialIdentifier.map(
        (type: { designationName: any }) => {
          return type.designationName;
        }
      );
    }
    this.materialIdentifierMapData.push();
    this.materialIdentifierMapData.forEach((element) => {
      return this.materialIdentifierArray.push(
        element.materilCustomIdentifierId
      );
    });
    this.materialIdentifierData = this.materialIdentifierArray;
    console.log('materialIdentifier', this.materialIdentifierData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
  onMaterialIdentifierDeSelectOrAll() {
    this.materialIdentifierData = [];
    console.log('materialIdentifier', this.materialIdentifierData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      GeographyId: this.geographyId,
    };
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      // this.orderNonPromotionsdata = res.response;
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  // non promotions list table data
  orderNonPromotionsList() {
    const data = {
      Cat: [],
      Sub_Cat: [],
      // "GetproductGroup": [],
      productGroup: [],
      type: [],
      MaterialCustomIdentifier: [],
      Search: '',
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
      ProductNameAndCode: [],
    };
    this.showSpinner();

    this.orders.getorderNonPromotionslist(data).subscribe({
      next: (res) => {
        // this.orderNonPromotionsdata = res.response;
        let orderNonPromotionsData = res.response;
        console.log(orderNonPromotionsData, 'orderNonPromotionsData tockeck');

        this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
          orderNonPromotionsData
        );
        this.caliculateProductAmount();
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      },
    });
  }

  orderNonPromotionFormatter(items) {
    let formattedList: any = [];
    items.forEach((item) => {
      let obj: any = {};
      let selectedNonPromotionItem = this.nonpromotionlist.find(
        (x) => x.stockitemid == item.stockitemid
      );
      obj.classification = item.classification;
      obj.materialCustomName = item.materialCustomName;
      obj.price = item.price;
      (obj.materialcustomidentifier = item.materialcustomidentifier),
        (obj.isInPromotion = item.isInPromotion);
      obj.isBuyProduct = item.isBuyProduct;
      obj.stock =
        selectedNonPromotionItem == undefined
          ? item.stock
          : selectedNonPromotionItem.quantity;
      obj.productSKUName = item.productSKUName;
      obj.stockitemid = item.stockitemid;
      obj.stockitemname = item.stockitemname;
      obj.registrationNumber = item.registrationNumber;
      obj.isPromotionSelected =
        selectedNonPromotionItem == undefined ? false : true;
      obj.quantity =
        selectedNonPromotionItem == undefined
          ? null
          : selectedNonPromotionItem.quantity;
      obj.taxid =
        selectedNonPromotionItem == undefined
          ? null
          : selectedNonPromotionItem.taxid;
      formattedList.push(obj);
    });

    formattedList.sort((a, b) => b.isPromotionSelected - a.isPromotionSelected);
    return formattedList;
  }
  UpdatedQty: any;
  quantityChange(updatedItem) {
    this.UpdatedQty = updatedItem.quantity;
    console.log(updatedItem);

    if (!updatedItem.isPromotionSelected) {
      updatedItem.isPromotionSelected = true;
    } else if (!updatedItem.quantity) {
      updatedItem.isPromotionSelected = false;
    }
    this.nonPromotionCalculation(updatedItem);
    // this.value = event.target.value;
    // console.log('Quantity changed:', item.quantity);
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
      this.orderNonPromotionsdata.forEach((element) => {
        if (element.isPromotionSelected) {
          element.taxid = taxId;
        }
      });
    }
  }

  nonPromotionCalculation(changedPromotionObj) {
    console.log(changedPromotionObj);
    this.quantityadd = 0;
    this.price = 0;
    this.caliculateProductAmount();
    let index = this.nonpromotionlist.findIndex(
      (x) => x.stockitemid == changedPromotionObj.stockitemid
    );

    if (index == -1) {
      this.nonpromotionlist.push(changedPromotionObj);
    } else {
      this.nonpromotionlist.splice(index, 1);
    }
  }

  checkboxChange(event, changedPromotionObj) {
    console.log(event, changedPromotionObj);
    changedPromotionObj.isPromotionSelected = event.target.checked;

    this.quantityChange(changedPromotionObj);

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

  DisplayNonpromotion: boolean = false;
  addnonPromoItems() {
    if (this.UpdatedQty == null) {
      const dialogRef = this.dialog.open(OrderActionShipmentComponent, {
        data: {
          // Alertpp: true,
        },
      });
    } else {
      let selectedNonPromotionData: any = [];
      this.orderNonPromotionsdata.forEach((item) => {
        if (item.isPromotionSelected) {
          let obj = {
            Taxid: item.taxid,
            stockitemid: item.stockitemid,
            Quantity: item.quantity,
            stock: item.stock,
          };

          selectedNonPromotionData.push(obj);
        }
      });
      let data = {
        GeographyId: this.geographyId,
        AddItems: selectedNonPromotionData,
        Dealerid: this.customerId,
      };
      this.orders.addorderNonPromotionsdata(data).subscribe({
        next: (res: any) => {
          if (res) {
            // console.log(data, 'addnonpromotions');
            this.nonpromotionlist = res.response;

            this.AddorderNonpromotiondata = {
              itemDetails: [],
              promocode: 'NP',
              promotionId: 0,
            };
            this.nonpromotionlist.forEach((item) => {
              // Promocode: this.promotionName,
              let obj = {
                // "Promocode": item.promotionName,
                stockitemid: item.stockitemid,
                stockitemname: item.stockitemname,
                uomid: item.uomid,
                uomname: item.uomname,
                quantity: item.quantity,
                stock: item.stock,
                price: item.price,
                discount: item.discount,
                finalValue: item.finalValue,
                taxvalue: item.taxvalue,
                amount: item.amount,
                taxid: item.taxid,
                registrationNumber: item.registrationNumber,
                productSKUName: item.productSKUName,
                materialcustomidentifier: item.materialcustomidentifier,
                materialCustomName: item.materialCustomName,
              };
              this.AddorderNonpromotiondata.itemDetails.push(obj);
            });

            this.Non_promotions = false;
            this.getShippingandPackingcharges();
            this.DisplayNonpromotion = true;
          }
        },
        error: (err: any) => {
          this.Non_promotions = true;
          this.err = err.error;
        },
      });

      console.log(data, 'addnonpromotions');
      // 1 Promotions Calculations
      localStorage.setItem('FirstPromotionCalculation', this.quantityadd);
      localStorage.setItem('FirstPromotionTotalAmountValue', this.price);

      // 4 Promotions Calculations
      localStorage.setItem('ForthPromotionCalculationsTotalQty', this.quantityadd);
      localStorage.setItem('ForthPromotionCalculationsAmount', this.price);

      // 3 Promotions Calculations
      localStorage.setItem('ThreeePromotionCalculationsTotalQty', this.quantityadd
      );
      localStorage.setItem('ThreePromotionCalculationsAmount', this.price);
      // }
    }
  }
  // quantityAdd:any|number=0;

  taxdropdown() {
    this.orders.taxtemplatedropdown().subscribe((res) => {
      this.taxdropdowndata = res.response;
      console.log(this.taxdropdowndata, 'tax data');
    });
  }

  close() {
    this.Non_promotions = false;
  }
  initialValue: number | null = 0;
  visibilitybutton: boolean = true;
  clearQuantity() {
    this.Item.quantity = null;
    this.Item.quantity = '';
    this.quantityadd = '';
    this.quantityadd = this.initialValue;
  }

  resetQuantity() {
    this.price = null;
    this.price = '';
    this.price = this.initialValue;
  }

  Uclose() {
    this.Non_promotions = false;
  }

  closeconfirmorder() {
    this.confirm_Order = false;
  }
  ordersubmit(submitType) {
    this.promotionTypesName = localStorage.removeItem('PromotionTypeName');
    if (localStorage.getItem('AddorEditpro') != 'edit') {
      localStorage.setItem('AddorEditpro1', submitType);
    }

    let loggedUserId = localStorage.getItem('logInId');
    console.log(this.startdate, 'date');
    let itemsCount: any = [];

    let copyItemsData = this.copyEditOrderById?.itemcount ?? [];
    // Push Non Promotion data to itemscount variable
    if (
      this.AddorderNonpromotiondata &&
      this.AddorderNonpromotiondata.itemDetails &&
      this.AddorderNonpromotiondata.itemDetails.length != 0
    ) {
      let tempObj = JSON.parse(JSON.stringify(this.AddorderNonpromotiondata));
      let previousObj = copyItemsData.find(
        (x) => x.promotionId == tempObj.promotionId
      );
      if (previousObj) {
        tempObj.itemDetails.map((x) => {
          let previousValue = previousObj.itemDetails.find(
            (y) => y.stockitemid == x.stockitemid
          );
          if (previousValue) {
            x.customerPOProductId = previousValue.customerPOProductId;
          }
        });
      }

      itemsCount.push(tempObj);
    }

    if (this.AddOrderPromotionData) {
      this.AddOrderPromotionData.forEach((promoObj, index) => {
        let tempObj = JSON.parse(JSON.stringify(promoObj));
        let previousObj = copyItemsData.find(
          (x) => x.promotionId == tempObj.promotionId
        );
        if (previousObj) {
          tempObj.itemDetails.map((x) => {
            let previousValue = previousObj.itemDetails.find(
              (y) => y.stockitemid == x.stockitemid
            );
            if (previousValue) {
              x.customerPOProductId = previousValue.customerPOProductId;
            }
          });
        }
        let obj: any = {};
        obj.promotionId = tempObj.promotionId;
        obj.itemDetails = tempObj.itemDetails;
        obj.promocode = 'P' + (index + 1);
        itemsCount.push(obj);
      });
    }

    // Push Promotion data to itemscount variable

    if (this.selectedStartDate) {
      this.startdate = new Date(this.selectedStartDate).toLocaleDateString(
        'en-US'
      );
    }

    let data = {
      CustomerId: this.customerId,
      geoid: this.geographyId,
      billingaddid: this.BillingaddressId,
      dealerrefno: this.DealerReferenceNo,
      comrefno: this.CompanyReferenceNo,
      shippingaddid: this.addressId,
      deliveryistruction: this.DeliveryInstructions,
      requirementdate: this.startdate,
      CreatedById: loggedUserId,
      itemcount: itemsCount,
      AddType: submitType,
      CustomerPOId: this.CustomerPoId,
    };

    this.orders.addorderNonPromotions(data).subscribe((res) => {
      if (res.response.result.toLowerCase().indexOf('succesfully') == -1) {
        // if (res.response.status == false) {
        // alert(res.response.result);
      } else {
        this.dialog.open(AddorderproSuccessPopupComponent, {
          panelClass: 'addorderpromosuccess',
        });

        // panelClass: 'activeSuccessPop'

        console.log(data, 'data');

        this.dialogRef.close(true);

        // localStorage.removeItem('geographyId');
        localStorage.removeItem('dealerid');
        // localStorage.removeItem('buygroupromo');
      }
    });
  }

  GetOrdersToEdit() {
    this.CustomerPoId = localStorage.getItem('CustomerPoId');
    //  alert(this.CustomerPoId)
    console.log(this.CustomerPoId, 'this.CustomerPoId');
    this.copyEditOrderById = null;
    this.orders.GetOrdersToEdit(this.CustomerPoId).subscribe((res) => {
      this.editorderbyID = res.response;
      this.copyEditOrderById = res.response;
      console.log(res.response, 'GetOrdersToEdit');

      this.datapreloadbyID();
      this.getShippingandPackingcharges();
    });
    localStorage.setItem('AddorEditpro', 'edit');
    this.sharedService.filter('Register click');
  }
  GetConfirmOrders() {
    this.CustomerPoId = localStorage.getItem('CustomerPoId');
    console.log(this.CustomerPoId, 'this.CustomerPoId');
    let data = {
      OrderId: this.CustomerPoId,
      flag: 'Confirmed',
    };
    this.orders.GetConfirmOrder(data).subscribe((res) => {
      console.log(res.response, 'GetConfirmOrdersToEdit');
    });
    this.dialogRef.close(true);
    this.sharedService.filter('Register click');
  }
  GetRejectOrders() {
    this.CustomerPoId = localStorage.getItem('CustomerPoId');
    console.log(this.CustomerPoId, 'this.CustomerPoId');
    let data = {
      OrderId: this.CustomerPoId,
      flag: 'Rejected',
    };
    this.orders.GetConfirmOrder(data).subscribe((res) => {
      console.log(res.response, 'GetConfirmOrdersToEdit');
    });
    this.dialogRef.close(true);
    this.sharedService.filter('Register click');
  }
  datapreloadbyID() {
    this.customerId = this.editorderbyID.customerid;

    if (this.customerId != '') {
      this.orders.GetGeoGrapydropdownList(this.customerId).subscribe((res) => {
        let GeoGrapydropdownList = res.response;
        console.log(GeoGrapydropdownList, 'GeoGrapydropdownList');
        this.GeoGrapydropdownListdata = GeoGrapydropdownList.map(
          (data: { geographyId: any; geographyName: any }) => {
            return {
              geographyId: data.geographyId,
              geographyName: data.geographyName,
            };
          }
        );
        console.log(this.GeoGrapydropdownListdata, 'GeoGrapydropdownListdata');
      });
      this.geographyId = this.editorderbyID.geoid;

      // shipping api
      this.orders.GetShipingAddress(this.customerId).subscribe((res: any) => {
        let shippingAddress = res.response;

        this.dealersShippingAddress = shippingAddress.map(
          (data: { addressId: any; address: any }) => {
            return { addressId: data.addressId, address: data.address };
          }
        );
        console.log(shippingAddress, 'shipping address');
        console.log(this.dealersShippingAddress, 'shipping address1');
      });
      this.addressId = this.editorderbyID.shippingaddid;

      // billing api
      this.orders.GetBillingAddress(this.customerId).subscribe((res: any) => {
        let BillingAddress = res.response;

        this.dealersbillingAddress = BillingAddress.map(
          (data: { addressId: any; address: any }) => {
            return {
              BillingaddressId: data.addressId,
              Billingaddress: data.address,
            };
          }
        );
        console.log(BillingAddress, 'billing address');
        console.log(this.dealersbillingAddress, 'billing address2');
      });
      localStorage.setItem('dealerid', this.customerId);
      this.BillingaddressId = this.editorderbyID.billingaddid;

      this.DealerReferenceNo = this.editorderbyID.dealerrefno;
      this.CompanyReferenceNo = this.editorderbyID.comrefno;
      // this.DealerReferenceNo = this.editorderbyID.dealerReferenceNo
      if (this.editorderbyID.requirementdate) {
        this.startdate = new Date(this.editorderbyID.requirementdate);
      }
      this.DeliveryInstructions = this.editorderbyID.deliveryistruction;

      this.AddOrderPromotionData = this.editorderbyID.itemcount.filter(
        (x) => x.promocode.toLowerCase().indexOf('np') == -1
      );

      this.nonpromotionlist = [];
      this.editorderbyID.itemcount
        .filter((x) => x.promocode.toLowerCase().indexOf('np') != -1)
        .forEach((y) => {
          this.nonpromotionlist = this.nonpromotionlist.concat(y.itemDetails);
        });

      console.log(this.nonpromotionlist);
      this.AddorderNonpromotiondata = {
        itemDetails: [],
        promocode: 'NP',
        promotionId: 0,
      };
      this.nonpromotionlist.forEach((item) => {
        // Promocode: this.promotionName,
        let obj = {
          // "Promocode": item.promotionName,

          customerPOProductId: item.customerPOProductId,
          stockitemid: item.stockitemid,
          stockitemname: item.stockitemname,
          uomid: item.uomid,
          uomname: item.uomname,
          quantity: item.quantity,
          stock: item.stock,
          price: item.price,
          discount: item.discount,
          finalValue: item.finalValue,
          taxvalue: item.taxvalue,
          taxid: item.taxid,
          amount: item.amount,
          registrationNumber: item.registrationNumber,
          productSKUName: item.productSKUName,
          materialcustomidentifier: item.materialcustomidentifier,
          materialCustomName: item.materialCustomName,
        };
        this.AddorderNonpromotiondata.itemDetails.push(obj);
      });

      this.getPromotionsImages();
    }
  }

  getShippingandPackingcharges() {
    let payload: any = {};

    payload.GeographyId = this.geographyId;
    payload.EachModel = [];

    console.log(this.AddOrderPromotionData);
    console.log(this.AddorderNonpromotiondata);
    if (this.AddOrderPromotionData && this.AddOrderPromotionData.length != 0) {
      this.AddOrderPromotionData.forEach((element) => {
        element.itemDetails.forEach((prod) => {
          let obj: any = {};
          obj.TaxTemplateId = prod.taxid;
          obj.finalValue = prod.finalValue;
          payload.EachModel.push(obj);
        });
      });
    }

    if (
      this.AddorderNonpromotiondata &&
      this.AddorderNonpromotiondata.itemDetails
    ) {
      this.AddorderNonpromotiondata.itemDetails.forEach((element) => {
        let obj: any = {};
        obj.TaxTemplateId = element.taxid;
        obj.finalValue = element.finalValue;
        payload.EachModel.push(obj);
      });
    }

    this.showSpinner();
    this.orders.getShippingandPackingcharges(payload).subscribe({
      next: (res: any) => {
        this.hideSpinner();
        this.shippingPackingchargeDetails = res.response;
      },
      error: (res) => {
        this.hideSpinner();
      },
    });
  }

  removePromotion(e, promotionItem) {
    // alert("Promotion has been removed");
    console.log(promotionItem);
    // alert(promotionItem.productPromotionsId);
    let calculationRemove = JSON.parse(localStorage.getItem('calculation') || '[]');
    console.log(calculationRemove, 'calculation');

    const indexToRemove = calculationRemove.extractedData.findIndex((x) => x.promotionId === promotionItem.productPromotionsId);
    if (indexToRemove !== -1) {
      const removedItem = calculationRemove.extractedData[indexToRemove];
      calculationRemove.extractedData.splice(indexToRemove, 1);
      // Subtract the removed item's values from overallQty and overallAmount
      calculationRemove.overallQty -= removedItem.previousValues.quantity;
      calculationRemove.overallAmount -= removedItem.previousValues.finalPrice;
      localStorage.setItem("calculation", JSON.stringify(calculationRemove));
    }
    console.log(calculationRemove, 'afterremove data');

    // this.productType = localStorage.removeItem('PromotionType');
    this.promotionName = localStorage.getItem('PromotionName');
    this.promotionTypesName = localStorage.getItem('PromotionTypeName');

    e.stopPropagation();
    promotionItem.isSelected = false;
    this.AddOrderPromotionData = this.AddOrderPromotionData.filter(
      (x) => x.promotionId !== promotionItem.productPromotionsId
    );
    this.getShippingandPackingcharges();
    // localStorage.removeItem('totalQuantity');
    // localStorage.removeItem('totalAmount');
    // 4 Promotion calculations
    localStorage.removeItem('ForthPromotionTotalAmount');
    localStorage.removeItem('ForthPromotionSelectedQTy');
    // 3 Promotion calculations
    localStorage.removeItem('ThreePrommotionTotalselectedQuantity');
    localStorage.removeItem('ThreePromotionTotalAmount');
  }


  showPromotionInfo(e, promotionItem) {
    e.stopPropagation();
    localStorage.setItem('promoclickId', promotionItem.productPromotionsId);
    localStorage.setItem('promoclickName', promotionItem.promotionName);
    const config: MatDialogConfig = {
      minWidth: '90vw',
      height: '610px',
      autoFocus: false,
      data: { hideGeoDealer: true },
    };
    this.dialog.open(ViewPromotionPopupComponent, config);
  }

  // Important  convertImageUrlToBase64(imageUrl: string): void {
  //   this.http.get(imageUrl, { responseType: 'blob' }).subscribe((response) => {
  //     const fileReader = new FileReader();
  //     fileReader.onloadend = () => {
  //       const base64data = fileReader.result as string;
  //       console.log(base64data);
  //     };
  //     fileReader.readAsDataURL(response);
  //   });
  // }
  Item: any = {
    // Your Item properties here...
    imageurl: 'imageurl',
  };
  selectPrmotionItem(promotionItem) {
    console.log('promotionItemUrl', promotionItem.imageurl);
    localStorage.setItem(
      'clickedImageURL',
      JSON.stringify(promotionItem.imageurl)
    );
    let fileInput: any;
    // Important fileInput = this.convertImageUrlToBase64(promotionItem.imageurl);
    console.log('MethaDalla', fileInput);
    localStorage.setItem('clickedImage', JSON.stringify(fileInput));
    console.log('Imageeeee0', fileInput);
    this.sharedImageService.setSelectedImage(fileInput);
    console.log(promotionItem);
    this.imagesid = [];
    this.arrayOfImages.forEach((x) => {
      if (x.isSelected) this.imagesid.push(x.productPromotionsId);
    });
    if (promotionItem.isSelected == false) {
      this.imagesid.push(promotionItem.productPromotionsId);
    }
    this.clickedPromotion = promotionItem.productPromotionsId;
    localStorage.setItem('imageData', this.Item.imageurl);
    this.addEditOrderPromotionList();
  }

  toggleStatefreeitems:boolean=false;
Freeitemsguygroup:any
// toggleDatapromotionmfreeitems()
// {
//   this.toggleStatefreeitems = !this.toggleStatefreeitems;
//   if(this.toggleStatefreeitems==true)
//   {
//     this.Freeitemsguygroup =this.orderNonPromotionsdata.filter(
//       (Item)=> Item.isPromotionSelected == true
//     );
    
//   }
//   else
//   {
//     this.Freeitemsguygroup=this.orderNonPromotionsdata;
//   }
// }






 
  toggleData(updatedItem) {
    this.toggleState = !this.toggleState;
    if (this.toggleState == true) {
      this.orderNonPromotionsdata = this.orderNonPromotionsdata.filter(
        (item) => item.isPromotionSelected==true
      );
     
    } else {
      this.orderNonPromotionsList();
       this.Non_promotions = true;
      console.log(this.orderNonPromotionsdata, 'tockeck');
      console.log(this.Non_promotions,"Checking")
      this.orderNonPromotionsdata.isPromotionSelected=true;
      console.log(this.orderNonPromotionsdata.isPromotionSelected,"==========");
        this.quantityChange(updatedItem);
    }
  }
  imageurl: string | null = 'base64 image data here';
  sendImage(): void {
    if (this.imageurl) {
      localStorage.setItem('imageData', this.imageurl);
    }
  }

  onProductSelect(item: any) {
    this.GetProductcategory.push(item.productGroupId);
    console.log(item);

    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      // payload
      productgroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };
    console.log(data);
    console.log(this.GetProductcategory);
    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onProductDeSelect(item: any) {
    const index = this.GetProductcategory.indexOf(item.productGroupId);
    if (index !== -1) {
      this.GetProductcategory.splice(index, 1);
    }

    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      productgroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };

    console.log(data);
    console.log(this.GetProductcategory);

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onProductSelectOrAll(item: any) {
    // Assuming `this.productArray` contains the available product group IDs
    this.GetProductcategory = this.productArray;

    let Productdata = {
      ProductcatId: this.GetProductcategory,
    };
    console.log('Product Category Array', this.GetProductcategory);

    this.productsubgroup.GetProductGroupList(Productdata).subscribe((res) => {
      let Prosubcaty = res.response;
      this.prosubgroupdropdown = res.response;
      console.log('API calling', this.prosubgroupdropdown);
    });

    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      productgroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }

  onProductDeSelectOrAll(item: any) {
    this.GetProductcategory = [];

    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      MaterialCustomIdentifier: this.materialIdentifierData,
      // GetproductGroup: this.GetProductcategory,
      productGroup: this.GetProductcategory,
      Search: this.searchText,
      productgroup: this.GetProductcategory,
      GeographyId: this.geographyId,
      Dealerid: this.customerId,
    };

    this.orders.getorderNonPromotionslist(data).subscribe((res) => {
      let orderNonPromotionsData = res.response;
      this.orderNonPromotionsdata = this.orderNonPromotionFormatter(
        orderNonPromotionsData
      );
    });
  }
}