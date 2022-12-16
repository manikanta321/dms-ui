import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionService } from 'src/app/services/promotion.service';
import { AddItemsPromotionComponent } from '../promotions/add-items-promotion/add-items-promotion.component';
import { RemovePromotionItemComponent } from './remove-promotion-item/remove-promotion-item.component';
import { Subject } from 'rxjs';
import { CellClassParams, CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi, GridOptions, ModuleRegistry, ColumnResizedEvent, Grid, } from 'ag-grid-community';
import { MatTableDataSource } from '@angular/material/table';
import { AddPromotionGeographiesComponent } from './add-promotion-geographies/add-promotion-geographies.component';
import { DateAdapter } from '@angular/material/core';
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
  public packingCharges: any[] = [{
    sValue: '',
    eValue: '',
    pValue: '',
  }];
  promoName : string = '';
  errorMsg: any;
  buyGroupPlus : any = [{itemss : ''}];
  addgetgroup : any = [{ getItems: ''}];
  addbuyset : any = [{setitem: ''}];
  addgetset : any = [{gset: ''}]
  basicInfo:boolean=false;
  noPromotionSelected:boolean = true;
  buyab: boolean = false;
  volumedc: boolean = false;
  pricedc: boolean = false
  buysets: boolean = false;
  addCountryButton: boolean = false;
  removelist: boolean = false;
  base64textString= "";
  stateName: string[] = ['State 1', 'State 2',];
  fileupload: any;
  selectedRows: any;
  pGselectedRows : any
  promotionTypesId: any;
  saveAndDraft : any = [];
  storedNames123: any;
  aboveDefaultGeoOfName: any;
  selectedcount: any;
  tottalgeoCount:any;
  customerId: any;
  productselectedRows: any;
  productScselectedRows: any;
  productSubGselectedRows: any;
  loginData: any;
  loggedUserId: any;
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
  promotionTypedropdown :any =[]
  toppingList: any;
  ShowFilter = false;
  imagepath :any;
  selecetdFile: any;
  startselectDate : any;
  selectendDate : any;
  imagePreview: any;
  addImage : any;
  showselectedgeovalue : boolean=false
  totalStepsCount: number | undefined;
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  minDateToFinish = new Subject<string>();
  minDate;
  selectedStartDate : any;
  selectedEndDate : any
  dateChange(e) {
    this.minDateToFinish.next(e.value.toString());
    // alert(e.value);
    // console.log("This is the DATE:", e.value);
    this.selectedStartDate = new Date(e.value).getFullYear() +'/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
    console.log(this.selectedStartDate);
  }
  enddateChange(e){
    this.selectedEndDate = new Date(e.value).getFullYear() +'/' + (new Date(e.value).getMonth() + 1) + '/' + new Date(e.value).getDate();
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
      field: 'code', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',  checkboxSelection: true
    },
    { headerName: "Dealer Name", field: 'dealerName', type: ['nonEditableColumn'] },
    { headerName: "", field: '', type: ['nonEditableColumn'] },

    { headerName: "Geography", field: 'geography', type: ['nonEditableColumn'],
    cellStyle: {color: '#017EFA'},
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
    productchk:boolean=false;
    prodShtCode:boolean=true;
    productGrpChk:boolean=false;
    productSubGChk:boolean=false;
    isRowSelectable : boolean = true;
    qtyMaxNum : any = [];
    MoqMaxNum : any = [];
    group : any =[];
    qtyValue :any;
    moqValue:any;
    GetqtyValue: any;
    selectedPromo : any;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
    private dialogRefModal: MatDialogRef<any>,
    
    private dateAdapter: DateAdapter<Date>,
    public promotionTypes: PromotionService) { 
      this.minDateToFinish.subscribe(r => {
        this.minDate = new Date(r);
      });
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    }
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });


  /* on Select of Dropdown screen change */

  ngOnInit(): void {
  //   this.firstFormGroup = new FormGroup({
  //     promoname : new FormControl('', [Validators.required]),
  // });
    this.GetPromotionTypes(Event);
    this.addimg();
    // this.promotionType1();
    this.addpromotionGeoTable();
    // this.toppingList3 = [
    //   { CategoryId: 1, CategoryName: 'Buy(A+B..) get(X+Y..)' },
    //   { CategoryId: 2, CategoryName: 'Buy(A/B..) get(C/D...)' },
    //   { CategoryId: 3, CategoryName: 'Volume Discount' },
    //   { CategoryId: 4, CategoryName: 'Price Discount' },
    // ];
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
    
      tippyPopups.forEach(element=> {
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

    if ( e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action' ) {
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
    this.buyGroupPlus.push({
      itemss: '',
      // qtyMaxNum: '',
      // MoqMaxNum: '',
    });
		console.log(i);
  }
  // addplus(){
  //   const index = this.buyGroupPlus.findIndex((itemss) => itemss.id === u);
  // }
  removebuyGroup(u: any) {
    const index = this.buyGroupPlus.findIndex((itemss) => itemss.id === u);
    this.buyGroupPlus.splice(index, 1);
    console.log('remv',index)
  }
  adddgetGroup(){
    this.addgetgroup.push({
      getItems: '',
    });
  }
  removegetGroup(u:any){
    const index = this.addgetgroup.findIndex((itemss) => itemss.id === u);
    this.addgetgroup.splice(index, 1);
  }
  addbuyAB(){
this.addbuyset.push({
  setitem:'',
})
  }
  removeaddbuyAB(u:any){
    const index = this.addbuyset.findIndex((setitem) => setitem.id === u);
    this.addbuyset.splice(index, 1);
  }
  addgetAB(){
    this.addgetset.push({
      gset:'',
    })
  }
  removeaddgetAB(u:any){
    const index = this.addgetset.findIndex((gset) => gset.id === u);
    this.addgetset.splice(index, 1);
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }
  GetPromotionTypes(event: any) {
    //  const data = {
    //   promotionTypesId : this.promotionTypesId,
    //   promotionTypesName: this.promotionTypesName
    // }
    this.promotionTypes.GetPromotionTypes().subscribe((res) => {
      console.log('check promotiontypes',this.promotionTypesId);
      this.promotionTypedropdown = res.response;
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

    })
  }

  disableBackbutton(){
    this.goForward(this.myStepper);
   this.basicInfo=true;
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
  addFields() {
    this.packingCharges.push({
      sValue: '',
      eValue: '',
      pValue: '',
    });
  }
  addItems() {
    // this.dialog.open(AddItemsPromotionComponent, {width:'1043px'});
    const dialogRef = this.dialog.open(AddItemsPromotionComponent,{width:'1043px'});
    dialogRef.afterClosed().subscribe((res) => {
      this.productselectedRows=JSON.parse(localStorage.getItem("productselectedRows" ) ?? '')
       this.productScselectedRows=JSON.parse(localStorage.getItem("productScselectedRows" ) ?? '');
       this.pGselectedRows=JSON.parse(localStorage.getItem("pGselectedRows" ) ?? '');
       this.productSubGselectedRows=JSON.parse(localStorage.getItem("productSubGselectedRows" ) ?? '');
       console.log('dd',this.productSubGselectedRows)
//  let localdata = res.response;
//       this.sltdid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
//         return { customerId: data.customerId, code: data.code };
//       });
    })
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
addimg(){
  const data ={
//  const addImage = this.base64textString
  }
  this.promotionTypes.Image(data).subscribe((res) => {
    console.log ('image', res)
      })
     
}
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
    console.log(this.base64textString,"base64")
  }
  onRowSelect(event) {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  //  const result = selectedRows.map((data : {customerId:any}) =>{
  //   return {custmId: data.customerId}
  //  })
  //  console.log('jj',result)
  }
  addgeography(){
    this.dialog.open( AddPromotionGeographiesComponent, {width: '654px', height:'743px'})
    this.storedNames123 = localStorage.getItem("geoAsso");
    this.aboveDefaultGeoOfName = localStorage.getItem("aboveDefaultGeoOfName");
    this.selectedcount = localStorage.getItem("selectedcount");
    this.tottalgeoCount = localStorage.getItem("tottalgeoCount");
  }
  
  promotionType1(){
    const data ={
      PromotionName : this.promoName,
      PromotionTypesId : this.selectedPromo,
      StartDate : this.selectedStartDate,
      EndDate : this.selectedEndDate,
      DoneById : this.loggedUserId,
      Imageurl : this.base64textString,
      BuyGroups : [{
        StockItemId:[428,430,435],
        MaxVolume:this.qtyValue,
        GroupId:1,
        MOQ:this.moqValue
    },],
    GetGroups : [
      {
        StockItemId:[417,418],
        MaxVolume:this.GetqtyValue,
        GroupId:1
    }
    ],
    EntityInstanceId : []
    }
    this.promotionTypes.DropDownPromotionType(data).subscribe((res) => {
      // this.dialogRefModal.close("success");
    });
    console.log('addpro',[this.qtyValue,this.moqValue]);
  }
  AddPromosaveAndSubmit(){
    console.log('added items')
    // const AddpromotionData = {
    //   promotionName : this.promoName,
    //   PromotionTypesId : this.selectedPromo,
    //   StartDate : this.startselectDate,
    //   EndDate : this.selectendDate,
    //   qty: this.qtyValue,
    //   mty:this.moqValue,
    // }
    // console.log('dats',AddpromotionData);
    // localStorage.setItem("addpromo", JSON.stringify(AddpromotionData));
    this.dialogRefModal.close("success");
    this.loggedUserId = localStorage.getItem('logInId')
    console.log('log',this.loggedUserId)
    this.promotionType1()
  }
  addpromotionGeoTable(){
    const data = {
      Geography : [],
      Search : '',
    }
    this.promotionTypes.GetPromotionDealerList(data).subscribe((res) => {
      this.rowData5 = res.response;
      console.log()
      // let localdata = res.response;
      // this.custmerid = localdata.map((data: { customerId: any; code: any; dealerName:any,geography:any }) => {
      //   return { customerId: data.customerId, code: data.code };
      // });
    });
  }
  selectedValue(value: any) {
    this.promotionTypesId = value;
    console.log('promcheck',this.promotionTypesId.val,)
  }
}

