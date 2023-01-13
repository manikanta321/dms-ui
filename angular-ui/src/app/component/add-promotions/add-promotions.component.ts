import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionService } from 'src/app/services/promotion.service';
import { AddItemsPromotionComponent } from '../promotions/add-items-promotion/add-items-promotion.component';
import { RemovePromotionItemComponent } from './remove-promotion-item/remove-promotion-item.component';
import { elementAt, Subject } from 'rxjs';
import { CellClassParams, CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi, GridOptions, ModuleRegistry, ColumnResizedEvent, Grid, } from 'ag-grid-community';
import { MatTableDataSource } from '@angular/material/table';
import { AddPromotionGeographiesComponent } from './add-promotion-geographies/add-promotion-geographies.component';
import { DateAdapter } from '@angular/material/core';
import { AddpromoGeographyComponent } from './addpromo-geography/addpromo-geography.component';
import { PopupPscGridTableComponent } from '../promotions/product-group-add-item/popup-psc-grid-table/popup-psc-grid-table.component';
import { SharedServicesDealerService } from 'src/app/services/shared-services-dealer.service';
import { PromotionSharedServicesService } from 'src/app/services/promotion-shared-services.service';
import { MaterialaddedSuccessPopComponent } from '../materials-list/material-add-editpopup/materialadded-success-pop/materialadded-success-pop.component';
import { AddPromotionSuccessfulPopupComponent } from './add-promotion-successful-popup/add-promotion-successful-popup.component';
@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.css']
})
export class AddPromotionsComponent implements OnInit, AfterViewInit {
  selectedTeam = '';
  selectedDay: string = '';
  showDiv = {
    previous: false,
    current: false,
    next: false
  }
  // showdata = false;
  isDataValidToSubmit: boolean = false;

  promoName: string = '';
  errorMsg: any;
  buyGroupPlus: any = [
    {
      StockItemId: [],
      productselectedRows: [],
      productScselectedRows: [],
      pGselectedRows: [],
      productSubGselectedRows: [],
      MaxVolume: '',
      GroupId: '',
      MOQ: '',
      isDataValid: true
    }
  ];


  addgetgroup: any = [{

    StockItemId: [],
    productselectedRows: [],
    productScselectedRows: [],
    pGselectedRows: [],
    productSubGselectedRows: [],
    MaxVolume: '',
    GroupId: '',
    isDataValid: true
  }];




  addbuyset: any = [{
    GroupId: 1,
    BuyGroups: [{
      StockItemId: [],
      MaxVolume: '',
      Set: 1,
      MOQ: '',
      productselectedRows: [],
      isDataValid: true
    },
    ]

  }
  ];

  packingCharges: any = [{
    MinVolume: '',
    MaxVolume: '',
    DiscountPercentage: '',
    isDataValid: true
  }]


  packingVolume: any = [{
    MinVolume: '',
    MaxVolume: '',
    MaxPrice: '',
    isDataValid: true
  }]




  addgetset: any = [{
    GroupId: 1,
    GetGroups: [{
      StockItemId: [],
      MaxVolume: '',
      Set: 1,
      productselectedRows: [],
      isDataValid: true
    },
    ]

  }
  ];




  // addbuyset: any = [{ setitem: '' }];
  // addgetset: any = [{ gset: '' }]
  basicInfo: boolean = false;
  noPromotionSelected: boolean = true;
  buyab: boolean = false;
  volumedc: boolean = false;
  pricedc: boolean = false
  buysets: boolean = false;
  addCountryButton: boolean = false;
  removelist: boolean = false;
  base64textString = "";
  stateName: string[] = ['State 1', 'State 2',];
  fileupload: any;
  selectedRows: any;
  pGselectedRows: any
  promotionTypesId: any;
  saveAndDraft: any = [];
  storedNames123: any;
  aboveDefaultGeoOfName: any;
  selectedcount: any;
  tottalgeoCount: any;
  customerId: any;
  productselectedRows: any = [];
  productScselectedRows: any;
  productSubGselectedRows: any;
  loginData: any;
  loggedUserId: any;
  geographynameId: any = [];
  geographyyId: any = [];
  minumorderqualityPrice: any = '';
  productPromotionsId: any;
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
  dropdownSettings3: IDropdownSettings = {};
  disabled = false;
  dropdownSettings: IDropdownSettings = {};
  promotionlist: any[] | undefined;
  toppingList3: any = [];
  promotionTypedropdown: any = []
  toppingList: any;
  ShowFilter = false;
  imagepath: any;
  selecetdFile: any;
  startselectDate: any;
  EntityInstanceId: any = [];
  selectendDate: any;
  imagePreview: any;
  addImage: any;
  addImgpreview: boolean = false;
  showselectedgeovalue: boolean = false
  totalStepsCount: number | undefined;
  startDate = new FormControl(null);
  endDate = new FormControl(null);
  minDateToFinish = new Subject<string>();
  selectedDealers: any = [];
  // minDate;
  minDate = new Date();
  endMinDate = new Date();
  selectedStartDate: any;
  selectedEndDate: any
  VolumeSttockItemId: any = [];
  editlist: boolean = false;
  priceStockItemId: any = [];
  dateChange(e) {
    console.log(e)
    this.minDateToFinish.next(e.value.toString());

    this.endDate = new FormControl(null);
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.selectedStartDate = new Date(e.value).getFullYear() + '/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
    console.log(this.selectedStartDate);
  }
  enddateChange(e) {
    this.selectedEndDate = new Date(e.value).getFullYear() + '/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
    this.minDateToFinish.next(e.value.toString());
    console.log(this.selectedEndDate);
  }
  @ViewChild('stepper') private myStepper: MatStepper | any;

  // CategoryName:any;
  getgroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"]
  buygroup: string[] = ["Product Name", "Product Name", "Product Name", "Product Name"];
  CustomerSelect: string[] = ['Valiant Distributors', 'Global Movers', 'Somebody Sales']
  private gridApi!: GridApi;
  searchText;
  columnDefs: ColDef[] = [

    {
      headerName: "Code",
      field: 'code', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left', checkboxSelection: true
    },
    { headerName: "Dealer Name", field: 'dealerName', type: ['nonEditableColumn'] },
    { headerName: "", field: '', type: ['nonEditableColumn'] },

    {
      headerName: "Geography", field: 'geography', type: ['nonEditableColumn'],
      // cellStyle: { color: '#017EFA' },
    },

    {
      headerName: '',
      colId: 'action',
      // cellRenderer: UseractionComponent,
      editable: false,
      maxWidth: 75
      //    headerName: "",
      // field: '',  filter: false, sortable: false,width:20,
      // cellRenderer: function clickNextRendererFunc(){
      //   return '<i class="fa fa-ellipsis-v" aria-hidden="true" `(click)="editfn()`"></i>';
      // }, 
      //  cellEditorPopup: true,
      //  onCellClicked: (event: CellClickedEvent) => this.dialog.open(DeletecomponentComponent, {panelClass: 'editpopup'})
      // // onCellClicked: (event: CellClickedEvent) => this.iconDisabled = true
    },

    // {
    //   headerName: "Avatar",
    //   field: "avatar",
    //   width: 100,
    //   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
    //  },

  ];
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    // set background colour on every row, this is probably bad, should be using CSS classes
    rowStyle: { background: 'black' },

    // set background colour on even rows again, this looks bad, should be using CSS classes


    // other grid options ...
  }
  public defaultColDef: ColDef = {

    suppressSizeToFit: true,
    width: 170,
    filter: 'agTextColumnFilter',
    flex: 1,
    minWidth: 100,
    resizable: true,

  };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
      numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
      medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
      nonEditableColumn: { editable: false },
      dateColumn: {
        // specify we want to use the date filter
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split('/');
            const day = Number(dateParts[0]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[2]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';

  displayedColumns: string[] = ['position', 'name', 'symbol', 'email', 'phonenum', 'login', 'status', 'edit'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // toppings = new FormControl('');
  // toppings1 = new FormControl('');

  // toppingList: string[] = ['Admin', 'Dealer','Customer'];
  // toppingList: any = [];
  minimumorderquantity: any = '';
  toppingList1: any = [];
  filterDictionary: any;
  sideBarOpen = true;
  scrolledIndex = 0;
  defaultPageSize = 12;
  paginationScrollCount: any;
  public rowData5 = [];
  public popupParent: HTMLElement = document.body;
  stayScrolledToEnd = true;
  message: boolean = false;
  message1: boolean = true;
  paginationPageSize = 10;
  // disabled = false;
  dropdownSettings1: IDropdownSettings = {};
  productchk: boolean = false;
  prodShtCode: boolean = true;
  productGrpChk: boolean = false;
  productSubGChk: boolean = false;
  isRowSelectable: boolean = true;
  qtyMaxNum: any = [];
  MoqMaxNum: any = [];
  group: any = [];
  qtyValue: any;
  moqValue: any;
  GetqtyValue: any;
  selectedPromo: any;
  Remarks: any = '';
  header: any;
  myForm1: any = FormGroup;

  SaveOrEdit: boolean = true;
  private subject = new Subject<any>();
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private sharedService: PromotionSharedServicesService,
    private dialogRefModal: MatDialogRef<any>,
    private dialogRef: MatDialogRef<AddPromotionsComponent>,
    private dateAdapter: DateAdapter<Date>,
    public promotionTypes: PromotionService) {

    this.sharedService.listen().subscribe((m: any) => {
      console.log(m);
      this.addpromotionGeoTable1();

    })



    this.minDateToFinish.subscribe(r => {
      // console.log(r);
      this.endMinDate = new Date(r);
    });
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });


  /* on Select of Dropdown screen change */

  ngOnInit() {
    let headername = localStorage.getItem('addOrEdit');
    if (headername == 'editpromo') {
      this.SaveOrEdit = false;
      this.header = 'Edit';
      let data = localStorage.getItem('promoclickId')
      this.promotionTypes.getPromotionById(data).subscribe((res) => {
        console.log('response EditPromotion', res)
        this.promoName = res.response.promotionName;
        this.selectedPromo = res.response.promotionTypesId;
        this.addImgpreview = true;
        this.base64textString = res.response.imageurl;
        this.startDate.setValue(res.response.startDate);
        this.selectedStartDate = new Date(res.response.startDate).getFullYear() + '/' + (new Date(res.response.startDate).getMonth() + 1) + '/' + new Date(res.response.startDate).getDate();

        this.endDate.setValue(res.response.endDate)
        this.selectedEndDate = new Date(res.response.endDate).getFullYear() + '/' + (new Date(res.response.endDate).getMonth() + 1) + '/' + new Date(res.response.endDate).getDate();
        // alert(this.selectedEndDate)
        this.promoName = res.response.promotionName;
        this.selectedPromo = res.response.promotionTypesId;
        // alert(this.selectedPromo)
        this.addImgpreview = true;
        this.base64textString = res.response.imageurl;
        this.startDate.setValue(res.response.startDate);

        this.Remarks = res.response.remarks;
        this.EntityInstanceId = [];
        this.selectedDealers = res.response.selectedDealers

        this.selectedDealers.forEach(element => {
          this.EntityInstanceId.push(element.dealerId)
        });

        console.log('this.addbuyset', this.addbuyset);
        this.addpromotionGeoTable();

        if (res.response.promotionTypesName == 'Buy (A+B..) get (X+Y..)') {
          this.productPromotionsId = res.response.productPromotionsId
          this.buyGroupPlus = [];
          this.addgetgroup = [];
          this.editlist = true
          // this.goForward(this.myStepper);
          this.noPromotionSelected = false;
          this.buyab = true;
          this.volumedc = false;
          this.buysets = false;
          this.pricedc = false;

          let mainobjbuyGroups = res.response.promoDetails.buyGroups;
          

          mainobjbuyGroups.forEach((element) => {
            let stockItemArraay: any = []

            element.stockItemId.forEach((element1) => {
              stockItemArraay.push(element1.stockItemId)
            })

            let obj1: any = [];

            element.stockItemId.forEach((element2) => {
              obj1.push({
                stockItemId: element2.stockItemId,
                productName: element2.stockItemName
              });


            })

            let obj: any = {}
            obj.GroupId = element?.groupId
            obj.MaxVolume = element?.maxVolume
            obj.MOQ = element?.moq
            obj.productPromotionDetailsId = element?.productPromotionDetailsId
            obj.productselectedRows = obj1;
            obj.StockItemId = stockItemArraay;
            obj.isDataValid = true;
            console.log('modifiedmainobj', obj)

            this.buyGroupPlus.push(obj);
            console.log('this.buyGroupPlus', this.buyGroupPlus)
          })


          let mainobjGetGroups = res.response.promoDetails.getGroups;

          mainobjGetGroups.forEach((element) => {
            let stockItemArraay: any = []
            element.stockItemId.forEach((element1) => {
              stockItemArraay.push(element1.stockItemId)
            })

            let obj1: any = []

            element.stockItemId.forEach((element2) => {
              obj1.push({
                stockItemId: element2.stockItemId,
                productName: element2.stockItemName
              });




            })

            let obj: any = {}
            obj.GroupId = element.groupId
            obj.MaxVolume = element.maxVolume
            obj.MOQ = element.moq
            obj.productPromotionDetailsId = element.productPromotionDetailsId
            obj.productselectedRows = obj1;
            obj.StockItemId = stockItemArraay;
            obj.isDataValid = true;


            console.log('modifiedmainobj', obj)

            this.addgetgroup.push(obj);
            console.log('this.mainobjGetGroups', this.addgetgroup)
          })
        }
        if (res.response.promotionTypesId == 2) {
          this.addbuyset = [];
          this.noPromotionSelected = false;
          this.buyab = false;
          this.volumedc = false;
          this.buysets = true;
          this.pricedc = false;
          // this.goForward(this.myStepper);
          // this.selectedDealers = res.response.selectedDealers
          // this.selectedDealers.forEach(element => {
          //   this.EntityInstanceId.push(element.dealerId)
          // });

          let mainarray = []
          let promo = res.response.promoDetails.buySets;
          let promo1 = res.response.promoDetails.getSets;

          this.productPromotionsId = res.response?.productPromotionsId
          promo.forEach((element3) => {
            let obj: any = {};
            let bugruparray: any[] = [];
            element3.buyGroups.forEach((element) => {
              let stockItemArraay: any = []
              element.stockItemId.forEach((element1) => {
                stockItemArraay.push(element1.stockItemId)
              })
              let obj1: any = []
              element.stockItemId.forEach((element2) => {
                obj1.push({
                  stockItemId: element2.stockItemId,
                  productName: element2.stockItemName
                });
              })
              obj.MaxVolume = element.maxVolume;
              obj.MOQ = element.moq;
              obj.Set = element.set;
              obj.productselectedRows = obj1;
              obj.StockItemId = stockItemArraay;
              obj.productPromotionDetailsId = element.productPromotionDetailsId;
              obj.isDataValid = true;
              bugruparray.push({ ...obj })
              console.log('final  bugruparray', bugruparray)
            })

            let apiObj: any = {}
            apiObj.GroupId = element3.groupId;
            apiObj.BuyGroups = bugruparray;
            this.addbuyset.push(apiObj);
            console.log('finalfinal', this.addbuyset)
          })
          this.addgetset = []

          promo1.forEach((element3) => {
            let obj: any = {};
            let bugruparray: any[] = [];
            element3.getGroups.forEach((element) => {
              let stockItemArraay: any = []
              element.stockItemId.forEach((element1) => {
                stockItemArraay.push(element1.stockItemId)
              })
              let obj1: any = []
              element.stockItemId.forEach((element2) => {
                obj1.push({
                  stockItemId: element2.stockItemId,
                  productName: element2.stockItemName
                });
              })
              obj.MaxVolume = element.maxVolume;
              obj.Set = element.set;
              obj.productselectedRows = obj1;
              obj.StockItemId = stockItemArraay;
              obj.productPromotionDetailsId = element.productPromotionDetailsId;
              obj.isDataValid = true;
              bugruparray.push({ ...obj })
              console.log('final  addgetset', bugruparray)
            })

            let apiObj: any = {}
            apiObj.GroupId = element3.groupId;
            apiObj.GetGroups = bugruparray;
            this.addgetset.push(apiObj);
            console.log('addgetset', this.addgetset)
          })

        }
        if (res.response.promotionTypesName == 'Volume Discount') {
          this.productPromotionsId = res.response?.productPromotionsId;
          this.productselectedRows = [];
          this.noPromotionSelected = false;
          this.buyab = false;
          this.volumedc = true;
          this.buysets = false;
          this.pricedc = false;
          // this.goForward(this.myStepper);
          // this.selectedDealers = res.response.selectedDealers

          // this.selectedDealers.forEach(element => {
          //   this.EntityInstanceId.push(element.dealerId)
          // });
          console.log('this.selectedDealers', this.selectedDealers)

          this.minimumorderquantity = res.response.promoDetails.moq;
          let volume: any = res.response.promoDetails.volumes;
          this.packingCharges = [];
          let obj1: any = {}
          volume.forEach((element) => {


            this.packingCharges.push({
              MinVolume: element.minVolume,
              MaxVolume: element.maxVolume,
              DiscountPercentage: element.discountPercentage,
              ProductPromotionDetailsId: element.productPromotionDetailsId,
              isDataValid:true
            })
          })


          console.log('this.packingCharges', this.packingCharges)

          let promoname = res.response.promoDetails.stockItems;
          let extractstockItemId = res.response.promoDetails.stockItems;

          let obj: any = {

          }
          promoname.forEach((element) => {
            this.productselectedRows.push({
              productName: element.stockItemName,
              stockItemId: element.stockItemId
            });
          })

          extractstockItemId.forEach((element) => {
            this.VolumeSttockItemId.push(element.stockItemId)
          })
          console.log('VolumeSttockItemId', this.VolumeSttockItemId)
        }
        if (res.response.promotionTypesName == 'Price Discount') {

          this.productPromotionsId = res.response?.productPromotionsId;
          this.productselectedRows = [];

          this.noPromotionSelected = false;
          // this.goForward(this.myStepper);
          this.buyab = false;
          this.volumedc = false;
          this.buysets = false;
          this.pricedc = true;

          // this.selectedDealers = res.response.selectedDealers;
          // this.selectedDealers.forEach(element => {
          //   this.EntityInstanceId.push(element.dealerId)
          // });
          this.minumorderqualityPrice = res.response.promoDetails.moq;

          let volume: any = res.response.promoDetails.prices;
          this.packingVolume = [];
          let obj1: any = {}
          volume.forEach((element) => {
            this.packingVolume.push({
              MinVolume: element.minVolume,
              MaxVolume: element.maxVolume,
              MaxPrice: element.maxPrice,
              productPromotionDetailsId: element.productPromotionDetailsId,
              isDataValid:true
            })
          })


          console.log('this.packingVolume', this.packingVolume)

          let promoname = res.response.promoDetails.stockItems;
          let extractstockItemId = res.response.promoDetails.stockItems;
          promoname.forEach((element) => {
            this.productselectedRows.push({
              productName: element.stockItemName,
              stockItemId: element.stockItemId
            });
          })

          extractstockItemId.forEach((element) => {
            this.priceStockItemId.push(element.stockItemId)
          })


        }

        console.log('priceStockItemId', this.priceStockItemId)



      })

    }
    else {
      this.header = 'Add';
      console.log('this.addbuyset', this.addbuyset);
      this.addpromotionGeoTable();
    }


    localStorage.setItem('pGselectedRows', '')
    localStorage.setItem('productSubGselectedRows', '');
    localStorage.setItem('productselectedRows', '')
    localStorage.setItem('pGselectedRows', '')

    //   this.firstFormGroup = new FormGroup({
    //     promoname : new FormControl('', [Validators.required]),
    // });
    this.GetPromotionTypes();
    // this.addimg();
    // this.promotionType1();
    // this.toppingList3 = [
    //   { CategoryId: 1, CategoryName: 'Buy(A+B..) get(X+Y..)' },
    //   { CategoryId: 2, CategoryName: 'Buy(A/B..) get(C/D...)' },
    //   { CategoryId: 3, CategoryName: 'Volume Discount' },
    //   { CategoryId: 4, CategoryName: 'Price Discount' },
    // ];
    // console.log('this.addbuyset', this.addbuyset);
    // this.addpromotionGeoTable();

  }

  isMOQValid = true;
  isPromotionTypeDataValid = true;
  isPromotionTypeDataValid2 = true;


  moqChange3() {
    this.isMOQValid = false;
    let packingCharge = this.packingCharges[0];
    if ((packingCharge.MinVolume && packingCharge.MaxVolume  && packingCharge.MinVolume <= this.minimumorderquantity && packingCharge.MaxVolume >= this.minimumorderquantity ) && this.VolumeSttockItemId && this.VolumeSttockItemId.length !== 0) {
      this.isMOQValid = true;
    }
  }

  moqChange4() {
    this.isMOQValid = false;
    let packingCharge = this.packingVolume[0];
    if ((packingCharge.MinVolume && packingCharge.MaxVolume  && packingCharge.MinVolume <= this.minumorderqualityPrice && packingCharge.MaxVolume >= this.minumorderqualityPrice) && this.priceStockItemId && this.priceStockItemId.length !== 0) {
      this.isMOQValid = true;
    }
  }

  promotionABSetChange() {
    this.isPromotionTypeDataValid = true;
    console.log(this.addbuyset);
    this.addbuyset.forEach(item => {
      item.BuyGroups.forEach(element => {
        element.isDataValid = true;
        if (element.MaxVolume == '' || element.MOQ == '' || element.MaxVolume > element.MOQ || !element.StockItemId || element.StockItemId.length == 0) {
          element.isDataValid = false;
          this.isPromotionTypeDataValid = false;
        }
      });
    });
  }

  promotionABGetChange(){
    this.isPromotionTypeDataValid2 = true;
    this.addgetset.forEach(item => {
      item.GetGroups.forEach(element => {
        element.isDataValid = true;
        if (!element.MaxVolume || !element.StockItemId || element.StockItemId.length == 0) {
          element.isDataValid = false;
          this.isPromotionTypeDataValid2 = false;
        }
      });
    });
  }

  promotionBuyGet1() {
    this.isPromotionTypeDataValid = true;
    this.buyGroupPlus.forEach(element => {
      element.isDataValid = true;
      console.log(element.MaxVolume, element.MOQ);
      if (element.MaxVolume == '' || element.MOQ == '' || element.MaxVolume > element.MOQ|| !element.StockItemId || element.StockItemId.length == 0) {
        element.isDataValid = false;
        this.isPromotionTypeDataValid = false;
      }
    });
  }

  promotionBuyGet2() {
    this.isPromotionTypeDataValid2 = true;
    this.addgetgroup.forEach(element => {
      element.isDataValid = true;

      if (!element.MaxVolume || !element.StockItemId || element.StockItemId.length == 0) {
        element.isDataValid = false;
        this.isPromotionTypeDataValid2 = false;
      }
    });
  }

  PackingPriceChange() {
    this.isPromotionTypeDataValid = true;

    this.packingVolume.forEach((element, index) => {
      console.log(element);

      if (element.MinVolume && element.MaxVolume && element.MaxPrice) {
        element.isDataValid = true;
        if (Number(element.MinVolume) > Number(element.MaxVolume)) {
          element.isDataValid = false;
          this.isPromotionTypeDataValid = false;
        }
        else if ((this.packingVolume[index - 1] && element.MinVolume <= this.packingVolume[index - 1].MaxVolume)) {
          element.isDataValid = false;
          this.isPromotionTypeDataValid = false;
        }
      } else {
        element.isDataValid = false;
        this.isPromotionTypeDataValid = false;
      }

    });
    this.moqChange4();
  }

  packingChargeChange() {
    this.isPromotionTypeDataValid = true;

    this.packingCharges.forEach((element, index) => {
      console.log(element);

      if ((element.MinVolume && element.MaxVolume && element.DiscountPercentage )) {
        element.isDataValid = true;
        if (Number(element.MinVolume) > Number(element.MaxVolume)) {
          element.isDataValid = false;
          this.isPromotionTypeDataValid = false;
        }
        else if ((this.packingCharges[index - 1] && element.MinVolume <= this.packingCharges[index - 1].MaxVolume) ) {
          element.isDataValid = false;
          this.isPromotionTypeDataValid = false;
        }
      } else {
        element.isDataValid = false;
        this.isPromotionTypeDataValid = false;
      }

    });
    this.moqChange3();
  }




  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

  }
  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // params.api.paginationGoToPage(4);
    params.api.forEachNode((node) =>
      node.setSelected(!!node.data && node.data.isProductSelected)
    );
  }
  openDialog() {
    // alert('mani')

  }
  handleScroll(event) {
    var tippyPopups: NodeListOf<Element> | null | undefined = document.querySelectorAll(".tippy-box[data-theme='user-tippy']");

    tippyPopups.forEach(element => {
      element.parentNode?.removeChild(element)
    })
    const grid = document.getElementById('gridContainer');
    if (grid) {
      const gridBody = grid.querySelector('.ag-body-viewport') as any;
      const scrollPos = gridBody.offsetHeight + event.top;
      const scrollDiff = gridBody.scrollHeight - scrollPos;
      //const api =  this.rowData5;
      this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
      this.paginationScrollCount = this.rowData5.length;
    }
  }
  onCellClicked(e): void {
    console.log('cellClicked', e);
    // this.userId = e.data.userId;
    // this.employeeName = e.data.userName;
    // console.log('userID', this.userId);
    // localStorage.setItem('userID', this.userId)
    // localStorage.setItem('employeeName', this.employeeName);

    if (e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action') {
      const cellRendererInstances = e.api.getCellRendererInstances({
        rowNodes: [e.node],
        columns: [e.column],
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        instance.togglePopup();
      }
    }

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
  addbuyGroup(i) {
    // this.showdata = true;
    console.log(this.buyGroupPlus);
    this.buyGroupPlus.push(
      {
        StockItemId: [],
        productselectedRows: [],
        productScselectedRows: [],
        pGselectedRows: [],
        productSubGselectedRows: [],
        MaxVolume: this.buyGroupPlus.qtyValue,
        GroupId: this.buyGroupPlus.length == 0 || '' || undefined ? 0 : this.buyGroupPlus.length,
        MOQ: this.buyGroupPlus.moqValue,
        isDataValid: true,
      });
    console.log('this.buyGroupPlus.length', this.buyGroupPlus.length);
  }


  adddgetGroup(i) {
    this.addgetgroup.push({
      StockItemId: [],
      productselectedRows: [],
      productScselectedRows: [],
      pGselectedRows: [],
      productSubGselectedRows: [],
      MaxVolume: '',
      GroupId: i == '' ? 0 : i,
      isDataValid: true
    });
  }

  // addplus(){
  //   const index = this.buyGroupPlus.findIndex((itemss) => itemss.id === u);
  // }

  removebuyGroup(u: any) {
    // const index = this.buyGroupPlus.findIndex((itemss) => itemss.id === u);
    this.buyGroupPlus.splice(u, 1);
    this.promotionBuyGet1();
  }
  removegetGroup(u: any) {
    this.addgetgroup.splice(u, 1);
    this.promotionBuyGet2();
  }
  addbuyAB(i) {
    this.addbuyset.push({
      GroupId: this.addbuyset.length + 1,
      BuyGroups: [{
        StockItemId: [],
        MaxVolume: '',
        Set: 1,
        MOQ: '',
        productselectedRows: [],
        isDataValid: true
      },
      ]
    })

    console.log('this.addbuyset', this.addbuyset)
  }


  addsubbuy(i, j) {
    console.log('this.addbuyset[i]', this.addbuyset[i])
    this.addbuyset[i].BuyGroups.push({

      StockItemId: [],
      MaxVolume: '',
      Set: this.addbuyset[i].BuyGroups.length + 1,
      MOQ: '',
      productselectedRows: [],
      isDataValid: true
    })
    console.log('this.addbuyset', this.addbuyset)
  }


  addsubGetbuy(i, j) {
    console.log('this.addbuyset[i]', this.addbuyset[i])
    this.addgetset[i].GetGroups.push({
      StockItemId: [],
      MaxVolume: '',
      Set: this.addgetset[i].GetGroups.length + 1,
      productselectedRows: [],
      isDataValid: true
    })
    console.log('this.addbuyset', this.addbuyset)
  }


  addgetAB(i) {
    this.addgetset.push({
      GroupId: this.addgetset.length + 1,
      GetGroups: [{
        StockItemId: [],
        MaxVolume: '',
        Set: 1,
        productselectedRows: [],
        isDataValid: true
      },
      ]
    })
  }

  removeGetGroup(i: any, u: any) {
    // const index = this.addgetset[u].GetGroups.findIndex((itemss) => itemss.id === u);
    this.addgetset[i].GetGroups.splice(u, 1);
    this.promotionABGetChange();
    // console.log('remv', index)
  }

  removebuyGroup1(i: any, u: any) {
    // const index = this.addbuyset[u].BuyGroups.findIndex((itemss) => itemss.id === u);
    this.addbuyset[i].BuyGroups.splice(u, 1);
    this.promotionABSetChange();
  }

  removeaddbuyAB(u: any) {
    // const index = this.addbuyset.findIndex((setitem) => setitem.id === u);
    this.addbuyset.splice(u, 1);
    this.promotionABSetChange();
  }

  removeaddgetAB(u: any) {
    // const index = this.addgetset.findIndex((gset) => gset.id === u);
    this.addgetset.splice(u, 1);
    this.promotionABGetChange();
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  GetPromotionTypes() {
    //  const data = {
    //   promotionTypesId : this.promotionTypesId,
    //   promotionTypesName: this.promotionTypesName
    // }
    // this.promotionTypesId = event;
    this.promotionTypes.GetPromotionTypes().subscribe((res) => {
      console.log('check promotiontypes', this.promotionTypesId);
      this.promotionTypedropdown = res.response;
    })
  }

  disableBackbutton() {
    this.goForward(this.myStepper);
    this.basicInfo = true;

    // alert(this.basicInfo);
  }
  prevStepper() {
    this.goBack(this.myStepper);
    this.basicInfo = false;
  }
  addCategory() {
    this.addButton = true;
  }
  // toogleShowFilter() {
  //   this.ShowFilter = !this.ShowFilter;
  //   this.dropdownSettings3 = Object.assign({}, this.dropdownSettings3, { allowSearchFilter: this.ShowFilter });
  // }

  addCountry() {
    this.addCountryButton = true;
  }
  removesub(uId: number) {
    // const index = this.packingCharges.findIndex((address) => address.id === uId);
    this.packingCharges.splice(uId, 1);
    this.packingChargeChange();
    this.moqChange3();
  }
  removesubOfPrice(uId: number) {
    // const index = this.packingVolume.findIndex((address) => address.id === uId);
    this.packingVolume.splice(uId, 1);
    this.PackingPriceChange();
    this.moqChange4();
  }
  addFields() {
    this.packingCharges.push({
      MinVolume: '',
      MaxVolume: '',
      DiscountPercentage: '',
      isDataValid: true
    });

    console.log('this.packingCharges', this.packingCharges)
  }

  addFieldsPrice() {
    this.packingVolume.push({
      MinVolume: '',
      MaxVolume: '',
      MaxPrice: '',
      isDataValid: true
    });

    console.log('this.packingCharges', this.packingCharges)
  }
  addItems(index: any = null) {
    // debugger
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px', data: this.buyGroupPlus[index].productselectedRows });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
        // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
        // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
        // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
        console.log('dd', this.productSubGselectedRows);
        console.log(this.productselectedRows);

        if (index != null) {
          this.buyGroupPlus[index].productselectedRows = this.productselectedRows;
          //  this.buyGroupPlus[index].productScselectedRows = this.productScselectedRows;
          //  this.buyGroupPlus[index].pGselectedRows = this.pGselectedRows;
          //  this.buyGroupPlus[index].productSubGselectedRows = this.productSubGselectedRows;

          let productselectedRows = this.productselectedRows.map(x => x.stockItemId);
          // let productScselectedRows=this.productScselectedRows.map(x => x.stockItemId);
          // let pGselectedRows=this.pGselectedRows.map(x => x.stockItemId);
          // let productSubGselectedRows=this.productSubGselectedRows.map(x => x.stockItemId);
          // console.log('araray',)
          let jointarray = productselectedRows

          this.buyGroupPlus[index].StockItemId = jointarray;
          this.buyGroupPlus[index].GroupId = this.buyGroupPlus.length;

          //  this.buyGroupPlus[index].MaxVolume = this.buyGroupPlus[index].qtyValue.map(x => x.qtyValue);
          //  this.buyGroupPlus[index].moqValue = this.qtyValue.map(x => x.qtyValue);
          console.log('this.buygroups', this.buyGroupPlus)


        }

        this.promotionBuyGet1();

      }
      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }



  addItems1(index: any = null, j: any = null) {

    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px', data: this.addbuyset[index].BuyGroups[j].productselectedRows });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
        // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
        // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
        // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
        console.log('dd', this.productSubGselectedRows);
        console.log(this.productselectedRows);

        if (index != null) {
          this.addbuyset[index].BuyGroups[j].productselectedRows = this.productselectedRows;
          //  this.buyGroupPlus[index].productScselectedRows = this.productScselectedRows;
          //  this.buyGroupPlus[index].pGselectedRows = this.pGselectedRows;
          //  this.buyGroupPlus[index].productSubGselectedRows = this.productSubGselectedRows;

          let productselectedRows = this.productselectedRows.map(x => x.stockItemId);
          // let productScselectedRows=this.productScselectedRows.map(x => x.stockItemId);
          // let pGselectedRows=this.pGselectedRows.map(x => x.stockItemId);
          // let productSubGselectedRows=this.productSubGselectedRows.map(x => x.stockItemId);
          // console.log('araray',)
          let jointarray = productselectedRows

          this.addbuyset[index].BuyGroups[j].StockItemId = jointarray;
          // this.addbuyset[index].BuyGroups[j].Set = this.addbuyset[index].BuyGroups.length;

          //  this.buyGroupPlus[index].MaxVolume = this.buyGroupPlus[index].qtyValue.map(x => x.qtyValue);
          //  this.buyGroupPlus[index].moqValue = this.qtyValue.map(x => x.qtyValue);
          console.log('this.addbuyset', this.addbuyset)
        }
        this.promotionABSetChange();

      }

      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }

  addItems1forGetGroup(index: any = null, j: any = null) {

    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px', data: this.addgetset[index].GetGroups[j].productselectedRows ?? [] });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
        // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
        // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
        // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
        console.log('dd', this.productSubGselectedRows);
        console.log(this.productselectedRows);

        if (index != null) {
          this.addgetset[index].GetGroups[j].productselectedRows = this.productselectedRows;
          let productselectedRows = this.productselectedRows.map(x => x.stockItemId);

          let jointarray = productselectedRows

          this.addgetset[index].GetGroups[j].StockItemId = jointarray;
          // this.addgetset[index].GetGroups[j].Set = this.addgetset[index].GetGroups.length;
          console.log('this.addgetset', this.addgetset)


        }
        this.promotionABGetChange();
      }

      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }





  addItemsforGetGroup(index: any = null) {
    console.log(this.addgetgroup);
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px', data: this.addgetgroup[index].productselectedRows ?? [] });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
        // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
        // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
        // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
        console.log('dd', this.productSubGselectedRows);
        console.log(this.productselectedRows);

        if (index != null) {
          this.addgetgroup[index].productselectedRows = this.productselectedRows;
          // this.addgetgroup[index].productScselectedRows = this.productScselectedRows;
          // this.addgetgroup[index].pGselectedRows = this.pGselectedRows;
          // this.addgetgroup[index].productSubGselectedRows = this.productSubGselectedRows;
          let productselectedRows = this.productselectedRows.map(x => x.stockItemId);
          // let productScselectedRows=this.productScselectedRows.map(x => x.stockItemId);
          // let pGselectedRows=this.pGselectedRows.map(x => x.stockItemId);
          // let productSubGselectedRows=this.productSubGselectedRows.map(x => x.stockItemId);
          // console.log('araray',)
          let jointarray = productselectedRows;

          this.addgetgroup[index].StockItemId = jointarray;
          this.addgetgroup[index].GroupId = this.addgetgroup.length;

          console.log('this.addgetgroup', this.addgetgroup)


        }
        this.promotionBuyGet2();
      }

      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }


  addItemsVolume() {
    // alert('volume')
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px', data: this.productselectedRows ?? [] });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
        // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
        // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
        // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
        console.log('dd', this.productSubGselectedRows);
        console.log(this.productselectedRows);


        //  this.buyGroupPlus[index].productselectedRows = this.productselectedRows;
        let productselectedRows = this.productselectedRows.map(x => x.stockItemId);
        let jointarray = productselectedRows
        this.VolumeSttockItemId = jointarray;
        console.log('productselectedRows', this.productselectedRows)
        this.moqChange3();
      }

    })
  }



  addItemsPrice() {
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px', data: this.productselectedRows ?? [] });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
        // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
        // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
        // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
        console.log('dd', this.productSubGselectedRows);
        console.log(this.productselectedRows);


        //  this.buyGroupPlus[index].productselectedRows = this.productselectedRows;
        let productselectedRows = this.productselectedRows.map(x => x.stockItemId);
        let jointarray = productselectedRows
        this.priceStockItemId = jointarray;
        // console.log('productselectedRows', this.productselectedRows)
        this.moqChange4();
      }

    })
  }


  updateAllComplete(StockItemID, i) {

    let stockitemOfindex = this.buyGroupPlus[i].StockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.buyGroupPlus[i].StockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.buyGroupPlus[i].StockItemId = stockitemOfindex
    }
    console.log('this.buyGroupPlus', this.buyGroupPlus)
  }
  updateAllComplete1(StockItemID, i) {

    let stockitemOfindex = this.addgetgroup[i].StockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.addgetgroup[i].StockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.addgetgroup[i].StockItemId = stockitemOfindex
    }
    console.log('this.buyGroupPlus', this.addgetgroup)
  }






  updateAllCompleteforBuyGroup(StockItemID, i, j) {

    let stockitemOfindex = this.addbuyset[i].BuyGroups[j].StockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.addbuyset[i].BuyGroups[j].StockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.addbuyset[i].BuyGroups[j].StockItemId = stockitemOfindex
    }
    console.log('this.addbuyset[index].addsubBuy[j].StockItemId', this.addbuyset[i].BuyGroups[j].StockItemId)
  }

  updateAllCompleteforGetGroup(StockItemID, i, j) {

    let stockitemOfindex = this.addgetset[i].GetGroups[j].StockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.addgetset[i].GetGroups[j].StockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.addgetset[i].GetGroups[j].StockItemId = stockitemOfindex
    }
    console.log('this.addgetset[index].addsubBuy[j].StockItemId', this.addgetset[i].GetGroups[j].StockItemId)
  }


  updateAllCompleteforGetGroupVolume(StockItemID) {

    let stockitemOfindex = this.VolumeSttockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.VolumeSttockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.VolumeSttockItemId = stockitemOfindex
    }
    console.log('VolumeSttockItemId', this.VolumeSttockItemId)
  }




  updateAllCompleteforGetGroupPrice(StockItemID) {

    let stockitemOfindex = this.priceStockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.priceStockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.priceStockItemId = stockitemOfindex
    }
    console.log('priceStockItemId', this.priceStockItemId)
  }



  addRemoveitem() {

    this.dialog.open(RemovePromotionItemComponent);
  }
  // GetPromotionTypes(){
  // this.promotionTypes.GetPromotionTypes().subscribe ((res)=> {
  //   console.log('check promotiontypes', res);
  // })
  // }
  // addimage(item : any){
  //   console.log(item.target.files[0])
  //   this.fileupload = item.target.files[0]
  // //   const data = {
  // // this.fileupload = item.target.files[0]
  // //   }
  //   this.promotionTypes.Image(this.fileupload).subscribe((res) => {
  // console.log ('image', res)

  //   })
  // }
  addimg() {
    const data = {
      //  const addImage = this.base64textString
    }
    this.promotionTypes.Image(data).subscribe((res) => {
      console.log('image', res)
    })

  }
  public onFileChanged(event) {
    this.selecetdFile = event.target.files[0];
    if (this.selecetdFile.size <= 1 * 1024 * 1024) {
      this.handleInputChange(this.selecetdFile);
      this.addImgpreview = true;
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
  onRowSelect(event) {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    let customerId = selectedRows.map(x => x.customerId);
    this.EntityInstanceId = customerId;
    this.selectedDealers = this.EntityInstanceId.map(x => {
      return {dealerId : x}
    });
    //  const result = selectedRows.map((data : {customerId:any}) =>{
    //   return {custmId: data.customerId}
    //  })
    //  console.log('jj',result)
  }
  addgeography() {
    this.dialog.open(AddpromoGeographyComponent, { width: '654px', height: '650px' })
    this.storedNames123 = localStorage.getItem("geoAssopromo");
    this.aboveDefaultGeoOfName = localStorage.getItem("aboveDefaultGeoOfNamepromo");
    this.selectedcount = localStorage.getItem("selectedcountpromo");
    this.tottalgeoCount = localStorage.getItem("tottalgeoCountpromo");
  }

  promotionType1() {
    let stockItems = this.productselectedRows.map(x => x.stockItemId);

    const data = {
      PromotionName: this.promoName,
      PromotionTypesId: this.selectedPromo,
      StartDate: this.selectedStartDate,
      EndDate: this.selectedEndDate,
      DoneById: this.loggedUserId,
      Imageurl: this.base64textString,
      BuyGroups: [{
        StockItemId: stockItems,
        MaxVolume: this.qtyValue,
        GroupId: 1,
        MOQ: this.moqValue
      },],
      GetGroups: [
        {
          StockItemId: [417, 418],
          MaxVolume: this.GetqtyValue,
          GroupId: 1
        }
      ],
      EntityInstanceId: []
    }
    this.promotionTypes.DropDownPromotionType(data).subscribe((res) => {
      // this.dialogRefModal.close("success");
    });
    console.log('addpro', [this.qtyValue, this.moqValue]);
  }

  remarksChange(){
    console.log(this.Remarks);
  }

  AddPromosaveAndSubmit(type) {
    // alert(this.selectedPromo)
    localStorage.setItem("updatePromotionPopup", 'add');
    this.loggedUserId = localStorage.getItem('logInId')
    if (!this.checkValidation(this.selectedPromo)) return;

    if (this.selectedPromo == 1) {
      console.log('added items', this.buyGroupPlus)
      console.log('addgetgroup', this.addgetgroup)

      this.buyGroupPlus.forEach(element => {
        delete element.productselectedRows;
        delete element.productScselectedRows;
        delete element.pGselectedRows;
        delete element.productSubGselectedRows;
      })

      this.addgetgroup.forEach(element => {
        delete element.productselectedRows;
        delete element.productScselectedRows;
        delete element.pGselectedRows;
        delete element.productSubGselectedRows;
      })



      let obj: any = {

        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        BuyGroups: this.buyGroupPlus,
        GetGroups: this.addgetgroup,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''

      }

      
      this.promotionTypes.firstPromotion(obj).subscribe((res) => {
        console.log(res.response)

        if (res.response.result == 'Added Succesfully') {
          // alert('Added Succesfully')
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.sharedService.filter('Register click')

          this.dialogRef.close();


        }
        else {
          // alert(res.response.result);

          this.sharedService.filter('Register click')
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.dialogRef.close();
        }
      })

    }

    if (this.selectedPromo == 2) {

      console.log('addbuyset', this.addbuyset)
      console.log('addGetset', this.addgetset)
      let obj: any = [];
      let obj1: any = [];



      for (let i = 0; i < this.addbuyset.length; i++) {
        this.addbuyset[i].BuyGroups.forEach(element => {
          delete element.productselectedRows;
          obj.push(element)
          console.log('finalobject', obj)


        })

      }


      for (let i = 0; i < this.addgetset.length; i++) {
        this.addgetset[i].GetGroups.forEach(element => {
          delete element.productselectedRows;
          obj1.push(element)
          console.log('finalobject1', obj1)


        })

      }


      let BuyGroups: any = []
      let GetGroups: any = []
      BuyGroups.push(obj);
      GetGroups.push(obj1);

      let mainobj: any = {
        BuyGroups: obj,
      }
      let GetSets: any = {
        GetGroups: obj1
      }
      console.log('mainobj', mainobj)

      let obj3: any = {

        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        BuySets: this.addbuyset,
        GetSets: this.addgetset,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''
      }
      console.log('object to send opis', obj3)
      // let BuySets=[{
      //   BuyGroups:obj
      // }]
      
      

      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.sharedService.filter('Register click')
          this.dialogRef.close();
        }
        else {
          // alert(res.response.result);
          this.sharedService.filter('Register click')
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.dialogRef.close();
        }
      })


    }

    if (this.selectedPromo == 3) {
      console.log('VolumeSttockItemId', this.VolumeSttockItemId)
      let obj3: any = {
        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        MOQ: this.minimumorderquantity,
        StockItemId: this.VolumeSttockItemId,
        Volume: this.packingCharges,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''

      }

      
      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.sharedService.filter('Register click')

          this.dialogRef.close();
        }
        else {
          // alert(res.response.result);
          this.sharedService.filter('Register click')
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.dialogRef.close();

        }
      })

    }


    if (this.selectedPromo == 4) {
      let obj3: any = {
        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        MOQ: this.minumorderqualityPrice,
        StockItemId: this.priceStockItemId,
        Price: this.packingVolume,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''


      }
      
      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully');
          this.sharedService.filter('Register click')

          this.dialogRef.close();
        }
        else {
          // alert(res.response.result);
          this.sharedService.filter('Register click')
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.dialogRef.close();

        }
      })

    }

  }




  checkValidation(type) {

    let isDataValid = true;

    if(!this.EntityInstanceId || this.EntityInstanceId.length == 0){
      isDataValid = false;
    }

    
    if (type == 3) {
      this.isPromotionTypeDataValid2 = true;
      this.packingChargeChange();
    }

    if (type == 4) {
      this.isPromotionTypeDataValid2 = true;
      this.PackingPriceChange();
    }

    if (type == 1) {
      this.isMOQValid = true;
      this.promotionBuyGet1();
      this.promotionBuyGet2();
    }

    if(type == 2){
      this.isMOQValid = true;
      this.promotionABGetChange();
      this.promotionABSetChange();
    }




    if ( !(isDataValid) || !(this.base64textString) || !(this.selectedStartDate) || !(this.selectedEndDate) || !(this.promoName) || !type ||!this.isMOQValid || !this.isPromotionTypeDataValid || !this.isPromotionTypeDataValid2) {
      alert("Required data is missing");
      return false;
    }

    return true;
  }


  AddPromosaveAndSubmitEdit(type) {
    // alert('error');
    localStorage.setItem("updatePromotionPopup", 'edit');
    this.loggedUserId = localStorage.getItem('logInId')

    if (!this.checkValidation(this.selectedPromo)) return;

    if (this.selectedPromo == 1) {
      console.log('added items', this.buyGroupPlus)
      console.log('addgetgroup', this.addgetgroup)

      this.buyGroupPlus.forEach(element => {
        delete element.productselectedRows;
        delete element.productScselectedRows;
        delete element.pGselectedRows;
        delete element.productSubGselectedRows;
      })

      this.addgetgroup.forEach(element => {
        delete element.productselectedRows;
        delete element.productScselectedRows;
        delete element.pGselectedRows;
        delete element.productSubGselectedRows;
      })



      let obj: any = {
        ProductPromotionsId: this.productPromotionsId,
        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        BuyGroups: this.buyGroupPlus,
        GetGroups: this.addgetgroup,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''

      }

      
      this.promotionTypes.firstPromotion(obj).subscribe((res) => {
        console.log(res.response)

        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.sharedService.filter('Register click')

          this.dialogRef.close();

        }

        else {
          // alert(res.response.result);
          this.sharedService.filter('Register click')
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.dialogRef.close();

        }
      })

    }

    if (this.selectedPromo == 2) {

      console.log('addbuyset', this.addbuyset)
      console.log('addGetset', this.addgetset)
      let obj: any = [];
      let obj1: any = [];



      for (let i = 0; i < this.addbuyset.length; i++) {
        this.addbuyset[i].BuyGroups.forEach(element => {
          delete element.productselectedRows;
          obj.push(element)
          console.log('finalobject', obj)


        })

      }


      for (let i = 0; i < this.addgetset.length; i++) {
        this.addgetset[i].GetGroups.forEach(element => {
          delete element.productselectedRows;
          obj1.push(element)
          console.log('finalobject1', obj1)


        })

      }


      let BuyGroups: any = []
      let GetGroups: any = []
      BuyGroups.push(obj);
      GetGroups.push(obj1);

      let mainobj: any = {
        BuyGroups: obj,
      }
      let GetSets: any = {
        GetGroups: obj1
      }
      console.log('mainobj', mainobj)

      let obj3: any = {
        ProductPromotionsId: this.productPromotionsId,
        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        BuySets: this.addbuyset,
        GetSets: this.addgetset,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''
      }
      console.log('object to send opis', obj3)
      // let BuySets=[{
      //   BuyGroups:obj
      // }]
      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.sharedService.filter('Register click')

          this.dialogRef.close();
        }
        else {
          // alert(res.response.result);
          this.sharedService.filter('Register click')
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })

          this.dialogRef.close();
        }
      })


    }

    if (this.selectedPromo == 3) {
      console.log('VolumeSttockItemId', this.VolumeSttockItemId)
      let obj3: any = {
        ProductPromotionsId: this.productPromotionsId,
        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        MOQ: this.minimumorderquantity,
        StockItemId: this.VolumeSttockItemId,
        Volume: this.packingCharges,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''

      }

      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully');
          this.sharedService.filter('Register click')

          this.dialogRef.close();
        }
        else {
          // alert(res.response.result);
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.dialogRef.close();

        }
      })

    }


    if (this.selectedPromo == 4) {
      // alert(this.productPromotionsId,)
      let obj3: any = {
        ProductPromotionsId: this.productPromotionsId,
        PromotionName: this.promoName,
        PromotionTypesId: this.selectedPromo,
        StartDate: this.selectedStartDate,
        EndDate: this.selectedEndDate,
        DoneById: this.loggedUserId,
        Imageurl: this.base64textString,
        MOQ: this.minumorderqualityPrice,
        StockItemId: this.priceStockItemId,
        Price: this.packingVolume,
        EntityInstanceId: this.EntityInstanceId,
        Status: type,
        Remarks: this.Remarks ?? ''
      }

      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully');
          this.sharedService.filter('Register click')

          this.dialogRef.close();
        }
        else {
          // alert(res.response.result);
          this.sharedService.filter('Register click');
          this.dialog.open(AddPromotionSuccessfulPopupComponent, { panelClass: 'activeSuccessPop' })
          this.dialogRef.close();

        }
      })
    }
  }


  // AddPromosaveAndSubmitDraftEdit() {
  //   alert(this.selectedPromo)
  //   this.loggedUserId = localStorage.getItem('logInId')

  //   if (this.selectedPromo == 1) {
  //     console.log('added items', this.buyGroupPlus)
  //     console.log('addgetgroup', this.addgetgroup)

  //     this.buyGroupPlus.forEach(element => {
  //       delete element.productselectedRows;
  //       delete element.productScselectedRows;
  //       delete element.pGselectedRows;
  //       delete element.productSubGselectedRows;
  //     })

  //     this.addgetgroup.forEach(element => {
  //       delete element.productselectedRows;
  //       delete element.productScselectedRows;
  //       delete element.pGselectedRows;
  //       delete element.productSubGselectedRows;
  //     })



  //     let obj: any = {
  //       ProductPromotionsId: this.productPromotionsId,
  //       PromotionName: this.promoName,
  //       PromotionTypesId: this.selectedPromo,
  //       StartDate: this.selectedStartDate,
  //       EndDate: this.selectedEndDate,
  //       DoneById: this.loggedUserId,
  //       Imageurl: this.base64textString,
  //       BuyGroups: this.buyGroupPlus,
  //       GetGroups: this.addgetgroup,
  //       EntityInstanceId: this.EntityInstanceId,
  //       Status: "Draft",
  //       Remarks: this.Remarks ?? ''

  //     }


  //     this.promotionTypes.firstPromotion(obj).subscribe((res) => {
  //       console.log(res.response)

  //       if (res.response.result == 'Added Succesfully') {
  //         alert('Added Succesfully')
  //         this.sharedService.filter('Register click');

  //         this.dialogRef.close();
  //       }
  //       else {
  //         this.sharedService.filter('Register click');
  //         alert(res.response.result);
  //       }
  //     })

  //   }

  //   if (this.selectedPromo == 2) {

  //     console.log('addbuyset', this.addbuyset)
  //     console.log('addGetset', this.addgetset)
  //     let obj: any = [];
  //     let obj1: any = [];


  //     for (let i = 0; i < this.addbuyset.length; i++) {
  //       this.addbuyset[i].BuyGroups.forEach(element => {
  //         delete element.productselectedRows;
  //         obj.push(element)
  //         console.log('finalobject', obj)


  //       })

  //     }


  //     for (let i = 0; i < this.addgetset.length; i++) {
  //       this.addgetset[i].GetGroups.forEach(element => {
  //         delete element.productselectedRows;
  //         obj1.push(element)
  //         console.log('finalobject1', obj1)


  //       })

  //     }


  //     let BuyGroups: any = []
  //     let GetGroups: any = []
  //     BuyGroups.push(obj);
  //     GetGroups.push(obj1);

  //     let mainobj: any = {
  //       BuyGroups: obj,
  //     }
  //     let GetSets: any = {
  //       GetGroups: obj1
  //     }
  //     console.log('mainobj', mainobj)

  //     let obj3: any = {
  //       ProductPromotionsId: this.productPromotionsId,
  //       PromotionName: this.promoName,
  //       PromotionTypesId: this.selectedPromo,
  //       StartDate: this.selectedStartDate,
  //       EndDate: this.selectedEndDate,
  //       DoneById: this.loggedUserId,
  //       Imageurl: this.base64textString,
  //       BuySets: [mainobj],
  //       GetSets: [GetSets],
  //       EntityInstanceId: this.EntityInstanceId,
  //       Status: "Draft",
  //       Remarks: this.Remarks ?? ''
  //     }
  //     console.log('object to send opis', obj3)
  //     // let BuySets=[{
  //     //   BuyGroups:obj
  //     // }]
  //     this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
  //       console.log(res.response)
  //       if (res.response.result == 'Added Succesfully') {
  //         alert('Added Succesfully');
  //         this.sharedService.filter('Register click');

  //         this.dialogRef.close();
  //       }
  //       else {
  //         this.sharedService.filter('Register click');
  //         alert(res.response.result);
  //       }
  //     })


  //   }

  //   if (this.selectedPromo == 3) {
  //     console.log('VolumeSttockItemId', this.VolumeSttockItemId)
  //     let obj3: any = {
  //       ProductPromotionsId: this.productPromotionsId,
  //       PromotionName: this.promoName,
  //       PromotionTypesId: this.selectedPromo,
  //       StartDate: this.selectedStartDate,
  //       EndDate: this.selectedEndDate,
  //       DoneById: this.loggedUserId,
  //       Imageurl: this.base64textString,
  //       MOQ: this.minimumorderquantity,
  //       StockItemId: this.VolumeSttockItemId,
  //       Volume: this.packingCharges,
  //       EntityInstanceId: this.EntityInstanceId,
  //       Status: "Draft",
  //       Remarks: this.Remarks ?? ''

  //     }

  //     this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
  //       console.log(res.response)
  //       if (res.response.result == 'Added Succesfully') {
  //         alert('Added Succesfully');
  //         this.sharedService.filter('Register click')

  //         this.dialogRef.close();
  //       }
  //       else {
  //         this.sharedService.filter('Register click');
  //         alert(res.response.result);
  //       }
  //     })

  //   }


  //   if (this.selectedPromo == 4) {
  //     let obj3: any = {
  //       ProductPromotionsId: this.productPromotionsId,
  //       PromotionName: this.promoName,
  //       PromotionTypesId: this.selectedPromo,
  //       StartDate: this.selectedStartDate,
  //       EndDate: this.selectedEndDate,
  //       DoneById: this.loggedUserId,
  //       Imageurl: this.base64textString,
  //       MOQ: this.minumorderqualityPrice,
  //       StockItemId: this.priceStockItemId,
  //       Price: this.packingVolume,
  //       EntityInstanceId: this.EntityInstanceId,
  //       Status: "Draft",
  //       Remarks: this.Remarks ?? ''


  //     }

  //     this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
  //       console.log(res.response)
  //       if (res.response.result == 'Added Succesfully') {
  //         alert('Added Succesfully');
  //         this.sharedService.filter('Register click')

  //         this.dialogRef.close();
  //       }
  //       else {
  //         this.sharedService.filter('Register click');
  //         alert(res.response.result);
  //       }
  //     })

  //   }

  // }







  addpromotionGeoTable1() {

    this.showselectedgeovalue = true;
    this.storedNames123 = localStorage.getItem("geopromo1");
    this.aboveDefaultGeoOfName = localStorage.getItem("aboveDefaultGeoOfNamepromo1");
    this.selectedcount = localStorage.getItem("selectedcountpromo1");
    this.tottalgeoCount = localStorage.getItem("tottalgeoCountpromo1");

    var objectsFromStorage = JSON.parse(this.storedNames123)
    this.geographyyId = objectsFromStorage;

    this.addpromotionGeoTable();
    // const data = {
    //   Geography: this.geographyyId,
    //   Search: this.searchText,
    // }
    

    // this.promotionTypes.GetPromotionDealerList(data).subscribe((res) => {
    //   this.rowData5 = res.response;
    //   console.log();
    //   this.geographynameId = localStorage.getItem("geopromo");
    //   console.log('geochecks', this.geographynameId)
    //   this.geographynameId.forEach(element => {
    //     return this.geographyyId.push(element.geographynameId);
    //     // console.log('rolecheck',rolecheck)

    //   })
    //   // let localdata = res.response;
    //   // this.custmerid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
    //   //   return { customerId: data.customerId, code: data.code };
    //   // });
    // });
  }




  addpromotionGeoTable() {

    const data = {
      Geography: this.geographyyId,
      Search: this.searchText,
    }
    this.promotionTypes.GetPromotionDealerList(data).subscribe((res) => {

      let rowData: any = res.response;
      console.log('DealerowData', rowData)
      rowData = rowData.map(x => {
        let index = this.selectedDealers.findIndex(y => y.dealerId == x.customerId)
        x.isProductSelected = index == -1 ? false : true;
        return x;
      });
      this.rowData5 = rowData.sort((a, b) => b.isProductSelected - a.isProductSelected);
      console.log('this.rowData5', this.rowData5)
      this.geographynameId = localStorage.getItem("geopromo");
      console.log('geochecks', this.geographynameId)
      if (this.geographynameId) {
        this.geographynameId.forEach(element => {
          return this.geographyyId.push(element.geographynameId);
          // console.log('rolecheck',rolecheck)

        })
      }
    });

    console.log('EntityInstanceId1', this.EntityInstanceId)
  }




  selectedValue(event: any) {
    console.log(event)
    this.selectedPromo = event.promotionTypesId;
    if (event == undefined) return;
    this.promotionTypesId = event;
    console.log(this.buyGroupPlus);
    if (event.promotionTypesName == 'Buy (A+B..) get (X+Y..)') {
      // this.goForward(this.myStepper);
      this.noPromotionSelected = false;
      this.buyab = true;
      this.volumedc = false;
      this.buysets = false;
      this.pricedc = false;
    }
    if (event.promotionTypesName == 'Buy (A or B + C or D..) get (X+Y or Y+Z..)') {
      this.noPromotionSelected = false;
      this.buyab = false;
      this.volumedc = false;
      this.buysets = true;
      this.pricedc = false;
      // this.goForward(this.myStepper);

    }
    if (event.promotionTypesName == 'Volume Discount') {
      this.noPromotionSelected = false;
      this.buyab = false;
      this.volumedc = true;
      this.buysets = false;
      this.pricedc = false;
      // this.goForward(this.myStepper);

    }
    if (event.promotionTypesName == 'Price Discount') {
      this.noPromotionSelected = false;
      // this.goForward(this.myStepper);
      this.buyab = false;
      this.volumedc = false;
      this.buysets = false;
      this.pricedc = true;
    }
  }


  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      Geography: this.geographyyId,
      Search: this.searchText,
    }
    this.addpromotionGeoTable();

    // this.promotionTypes.GetPromotionDealerList(data).subscribe((res) => {
    //   this.rowData5 = res.response;
    //   console.log();
    //   this.geographynameId = localStorage.getItem("geopromo");
    //   console.log('geochecks', this.geographynameId)
    //   if (this.geographynameId) {
    //     this.geographynameId.forEach(element => {
    //       return this.geographyyId.push(element.geographynameId);
    //       // console.log('rolecheck',rolecheck)

    //     })
    //   }
    //   // let localdata = res.response;
    //   // this.custmerid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
    //   //   return { customerId: data.customerId, code: data.code };
    //   // });
    // });

  }
}

