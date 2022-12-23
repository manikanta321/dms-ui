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
      MOQ: ''
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

  }];




  addbuyset: any = [{
    addsubBuy: [{
      StockItemId: [],
      MaxVolume: '',
      GroupId: '',
      MOQ: '',
      BuySet: 1,
      productselectedRows: []
    },
    ]

  }
  ];

  packingCharges: any = [{
    MinVolume: '',
    MaxVolume: '',
    DiscountPercentage: ''
  }]

  packingVolume: any = [{
    MinVolume: '',
    MaxVolume: '',
    MaxPrice: ''
  }]




  addgetset: any = [{
    addsubBuy: [{
      StockItemId: [],
      MaxVolume: '',
      GroupId: '',
      GetSet: 1,
      productselectedRows: []
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
  productselectedRows: any;
  productScselectedRows: any;
  productSubGselectedRows: any;
  loginData: any;
  loggedUserId: any;
  geographynameId: any = [];
  geographyyId: any = [];
  minumorderqualityPrice: any = '';
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
  EntityInstanceId: any;
  selectendDate: any;
  imagePreview: any;
  addImage: any;
  addImgpreview: boolean = false;
  showselectedgeovalue: boolean = false
  totalStepsCount: number | undefined;
  startDate = new FormControl(null);
  endDate = new FormControl(null);
  minDateToFinish = new Subject<string>();
  // minDate;
  minDate = new Date();
  endMinDate = new Date();
  selectedStartDate: any;
  selectedEndDate: any
  VolumeSttockItemId: any;
  priceStockItemId
  dateChange(e) {
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
      cellStyle: { color: '#017EFA' },
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
  header: any;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private sharedService: SharedServicesDealerService,
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
      this.header = 'Edit';
      let data
      this.promotionTypes.getPromotionById(data).subscribe((res) => {
        console.log('res', res)
      })

    }
    else {
      this.header = 'Add';
    }


    localStorage.setItem('pGselectedRows', '')
    localStorage.setItem('productSubGselectedRows', '');
    localStorage.setItem('productselectedRows', '')
    localStorage.setItem('pGselectedRows', '')

    //   this.firstFormGroup = new FormGroup({
    //     promoname : new FormControl('', [Validators.required]),
    // });
    this.GetPromotionTypes();
    this.addimg();
    // this.promotionType1();
    this.addpromotionGeoTable();
    // this.toppingList3 = [
    //   { CategoryId: 1, CategoryName: 'Buy(A+B..) get(X+Y..)' },
    //   { CategoryId: 2, CategoryName: 'Buy(A/B..) get(C/D...)' },
    //   { CategoryId: 3, CategoryName: 'Volume Discount' },
    //   { CategoryId: 4, CategoryName: 'Price Discount' },
    // ];
    console.log('this.addbuyset', this.addbuyset)
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
    params.api.paginationGoToPage(4);
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
    alert(i)
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
    });
  }

  // addplus(){
  //   const index = this.buyGroupPlus.findIndex((itemss) => itemss.id === u);
  // }


  removegetGroup(u: any) {
    const index = this.addgetgroup.findIndex((itemss) => itemss.id === u);
    this.addgetgroup.splice(index, 1);
  }
  addbuyAB(i) {
    this.addbuyset.push({

      addsubBuy: [{
        StockItemId: [],
        MaxVolume: '',
        GroupId: '',
        MOQ: '',
        BuySet: this.addbuyset.length + 1,
        productselectedRows: []
      },
      ]
    })

    console.log('this.addbuyset', this.addbuyset)
  }


  addsubbuy(i, j) {
    alert(i)
    console.log('this.addbuyset[i]', this.addbuyset[i])
    this.addbuyset[i].addsubBuy.push({

      StockItemId: [],
      MaxVolume: '',
      GroupId: '',
      MOQ: '',
      BuySet: i + 1,
      productselectedRows: [],

    })
    console.log('this.addbuyset', this.addbuyset)
  }


  addsubGetbuy(i, j) {
    alert(i)
    console.log('this.addbuyset[i]', this.addbuyset[i])
    this.addgetset[i].addsubBuy.push({

      StockItemId: [],
      MaxVolume: '',
      GroupId: '',
      GetSet: i + 1,
      productselectedRows: [],

    })
    console.log('this.addbuyset', this.addbuyset)
  }


  addgetAB(i) {
    this.addgetset.push({

      addsubBuy: [{
        StockItemId: [],
        MaxVolume: '',
        GroupId: '',
        GetSet: this.addgetset.length + 1,
        productselectedRows: []
      },
      ]
    })
  }

  removeGetGroup(u: any) {
    const index = this.addgetset[u].addsubBuy.findIndex((itemss) => itemss.id === u);
    this.addgetset[u].addsubBuy.splice(index, 1);
    console.log('remv', index)
  }

  removebuyGroup(u: any) {
    const index = this.addbuyset[u].addsubBuy.findIndex((itemss) => itemss.id === u);
    this.addbuyset[u].addsubBuy.splice(index, 1);
    console.log('remv', index)
  }

  removeaddbuyAB(u: any) {
    const index = this.addbuyset.findIndex((setitem) => setitem.id === u);
    this.addbuyset.splice(index, 1);
  }

  removeaddgetAB(u: any) {
    const index = this.addgetset.findIndex((gset) => gset.id === u);
    this.addgetset.splice(index, 1);
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  goForward(stepper: MatStepper) {
    stepper.next();
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
    const index = this.packingCharges.findIndex((address) => address.id === uId);
    this.packingCharges.splice(index, 1);
  }
  removesubOfPrice(uId: number) {
    const index = this.packingVolume.findIndex((address) => address.id === uId);
    this.packingVolume.splice(index, 1);
  }
  addFields() {
    this.packingCharges.push({
      MinVolume: '',
      MaxVolume: '',
      DiscountPercentage: ''
    });

    console.log('this.packingCharges', this.packingCharges)
  }

  addFieldsPrice() {
    this.packingVolume.push({
      MinVolume: '',
      MaxVolume: '',
      MaxPrice: ''
    });

    console.log('this.packingCharges', this.packingCharges)
  }
  addItems(index: any = null) {
    // debugger
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px' });
    dialogRef.afterClosed().subscribe((res) => {
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

      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }



  addItems1(index: any = null, j: any = null) {
    debugger
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px' });
    dialogRef.afterClosed().subscribe((res) => {
      this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
      // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
      // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
      // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
      console.log('dd', this.productSubGselectedRows);
      console.log(this.productselectedRows);

      if (index != null) {
        this.addbuyset[index].addsubBuy[j].productselectedRows = this.productselectedRows;
        //  this.buyGroupPlus[index].productScselectedRows = this.productScselectedRows;
        //  this.buyGroupPlus[index].pGselectedRows = this.pGselectedRows;
        //  this.buyGroupPlus[index].productSubGselectedRows = this.productSubGselectedRows;

        let productselectedRows = this.productselectedRows.map(x => x.stockItemId);
        // let productScselectedRows=this.productScselectedRows.map(x => x.stockItemId);
        // let pGselectedRows=this.pGselectedRows.map(x => x.stockItemId);
        // let productSubGselectedRows=this.productSubGselectedRows.map(x => x.stockItemId);
        // console.log('araray',)
        let jointarray = productselectedRows

        this.addbuyset[index].addsubBuy[j].StockItemId = jointarray;
        this.addbuyset[index].addsubBuy[j].GroupId = this.addbuyset[index].addsubBuy.length;

        //  this.buyGroupPlus[index].MaxVolume = this.buyGroupPlus[index].qtyValue.map(x => x.qtyValue);
        //  this.buyGroupPlus[index].moqValue = this.qtyValue.map(x => x.qtyValue);
        console.log('this.addbuyset', this.addbuyset)


      }

      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }

  addItems1forGetGroup(index: any = null, j: any = null) {
    debugger
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px' });
    dialogRef.afterClosed().subscribe((res) => {
      this.productselectedRows = JSON.parse(localStorage.getItem("productselectedRows") ?? '[]')
      // this.productScselectedRows = JSON.parse(localStorage.getItem("productScselectedRows") ?? '[]');
      // this.pGselectedRows = JSON.parse(localStorage.getItem("pGselectedRows") ?? '[]');
      // this.productSubGselectedRows = JSON.parse(localStorage.getItem("productSubGselectedRows") ?? '[]');
      console.log('dd', this.productSubGselectedRows);
      console.log(this.productselectedRows);

      if (index != null) {
        this.addgetset[index].addsubBuy[j].productselectedRows = this.productselectedRows;
        let productselectedRows = this.productselectedRows.map(x => x.stockItemId);

        let jointarray = productselectedRows

        this.addgetset[index].addsubBuy[j].StockItemId = jointarray;
        this.addgetset[index].addsubBuy[j].GroupId = this.addgetset[index].addsubBuy.length;
        console.log('this.addbuyset', this.addgetset)


      }

      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }





  addItemsforGetGroup(index: any = null) {
    debugger
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px' });
    dialogRef.afterClosed().subscribe((res) => {
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

      //  let localdata = res.response;
      //       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //         return { customerId: data.customerId, code: data.code };
      //       });
    })
  }


  addItemsVolume() {
    alert('volume')
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px' });
    dialogRef.afterClosed().subscribe((res) => {
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

    })
  }



  addItemsPrice() {
    alert('volume')
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent, { width: '1043px' });
    dialogRef.afterClosed().subscribe((res) => {
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
      console.log('productselectedRows', this.productselectedRows)

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

    let stockitemOfindex = this.addbuyset[i].addsubBuy[j].StockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.addbuyset[i].addsubBuy[j].StockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.addbuyset[i].addsubBuy[j].StockItemId = stockitemOfindex
    }
    console.log('this.addbuyset[index].addsubBuy[j].StockItemId', this.addbuyset[i].addsubBuy[j].StockItemId)
  }

  updateAllCompleteforGetGroup(StockItemID, i, j) {

    let stockitemOfindex = this.addgetset[i].addsubBuy[j].StockItemId;
    const index = stockitemOfindex.indexOf(StockItemID);

    if (index !== -1) {
      stockitemOfindex.splice(index, 1);
      this.addgetset[i].addsubBuy[j].StockItemId = stockitemOfindex
    }
    else {
      stockitemOfindex.push(StockItemID);
      this.addgetset[i].addsubBuy[j].StockItemId = stockitemOfindex
    }
    console.log('this.addgetset[index].addsubBuy[j].StockItemId', this.addgetset[i].addsubBuy[j].StockItemId)
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
    this.EntityInstanceId = customerId
    //  const result = selectedRows.map((data : {customerId:any}) =>{
    //   return {custmId: data.customerId}
    //  })
    //  console.log('jj',result)
  }
  addgeography() {
    this.dialog.open(AddpromoGeographyComponent, { width: '654px', height: '743px' })
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


  AddPromosaveAndSubmit() {
alert(this.selectedPromo)
    this.loggedUserId = localStorage.getItem('logInId')

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
        EntityInstanceId: this.EntityInstanceId

      }


      this.promotionTypes.firstPromotion(obj).subscribe((res) => {
        console.log(res.response)

        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.dialogRef.close();
        }
        else {
          alert(res.response.result);
        }
      })

    }

    if (this.selectedPromo == 2) {

      console.log('addbuyset', this.addbuyset)
      console.log('addGetset', this.addgetset)
      let obj: any = [];
      let obj1: any = [];


      for (let i = 0; i < this.addbuyset.length; i++) {
        this.addbuyset[i].addsubBuy.forEach(element => {
          delete element.productselectedRows;
          obj.push(element)
          console.log('finalobject', obj)


        })

      }


      for (let i = 0; i < this.addgetset.length; i++) {
        this.addgetset[i].addsubBuy.forEach(element => {
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
        BuySets: [mainobj],
        GetSets: [GetSets],
        EntityInstanceId: this.EntityInstanceId

      }
      console.log('object to send opis', obj3)
      // let BuySets=[{
      //   BuyGroups:obj
      // }]
      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.dialogRef.close();
        }
        else {
          alert(res.response.result);
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


      }

      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.dialogRef.close();
        }
        else {
          alert(res.response.result);
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


      }

      this.promotionTypes.firstPromotion(obj3).subscribe((res) => {
        console.log(res.response)
        if (res.response.result == 'Added Succesfully') {
          alert('Added Succesfully')
          this.dialogRef.close();
        }
        else {
          alert(res.response.result);
        }
      })

    }

  }



  addpromotionGeoTable1() {

    this.showselectedgeovalue = true;
    this.storedNames123 = localStorage.getItem("geopromo1");
    this.aboveDefaultGeoOfName = localStorage.getItem("aboveDefaultGeoOfNamepromo1");
    this.selectedcount = localStorage.getItem("selectedcountpromo1");
    this.tottalgeoCount = localStorage.getItem("tottalgeoCountpromo1");

    var objectsFromStorage = JSON.parse(this.storedNames123)
    this.geographyyId = objectsFromStorage;


    const data = {
      Geography: this.geographyyId,
      Search: this.searchText,
    }
    this.promotionTypes.GetPromotionDealerList(data).subscribe((res) => {
      this.rowData5 = res.response;
      console.log();
      this.geographynameId = localStorage.getItem("geopromo");
      console.log('geochecks', this.geographynameId)
      this.geographynameId.forEach(element => {
        return this.geographyyId.push(element.geographynameId);
        // console.log('rolecheck',rolecheck)

      })
      // let localdata = res.response;
      // this.custmerid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //   return { customerId: data.customerId, code: data.code };
      // });
    });
  }




  addpromotionGeoTable() {

    const data = {
      Geography: this.geographyyId,
      Search: this.searchText,
    }
    this.promotionTypes.GetPromotionDealerList(data).subscribe((res) => {
      this.rowData5 = res.response;
      console.log();
      this.geographynameId = localStorage.getItem("geopromo");
      console.log('geochecks', this.geographynameId)
      this.geographynameId.forEach(element => {
        return this.geographyyId.push(element.geographynameId);
        // console.log('rolecheck',rolecheck)

      })
      // let localdata = res.response;
      // this.custmerid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //   return { customerId: data.customerId, code: data.code };
      // });
    });
  }




  selectedValue(event: any) {
    console.log(event)
    this.selectedPromo = event.promotionTypesId;
    if(event == undefined) return;
    this.promotionTypesId = event;
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
    this.promotionTypes.GetPromotionDealerList(data).subscribe((res) => {
      this.rowData5 = res.response;
      console.log();
      this.geographynameId = localStorage.getItem("geopromo");
      console.log('geochecks', this.geographynameId)
     if(this.geographynameId){
      this.geographynameId.forEach(element => {
        return this.geographyyId.push(element.geographynameId);
        // console.log('rolecheck',rolecheck)

      })
     }
      // let localdata = res.response;
      // this.custmerid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //   return { customerId: data.customerId, code: data.code };
      // });
    });

  }
}

