import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CellValueChangedEvent, CheckboxSelectionCallbackParams, ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent ,} from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { elementAt, Subject } from 'rxjs';
import { PromotionSharedServicesService } from 'src/app/services/promotion-shared-services.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { SharedService } from 'src/app/services/shared-services.service';


@Component({
  selector: 'app-view-promotion-popup',
  templateUrl: './view-promotion-popup.component.html',
  styleUrls: ['./view-promotion-popup.component.scss']
})
export class ViewPromotionPopupComponent implements OnInit {
  private gridApi!: GridApi;
  public popupParent: HTMLElement = document.body;
  public rowData5 :any= [];
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  buyab: boolean = false;
  volumedc: boolean = false;
  pricedc: boolean = false
  buysets: boolean = false;
  productPromotionsId: any;
  LoginId:any;
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
    suppressRowClickSelection: true,

    isRowSelectable: rowNode => rowNode.data=false,
 
    // set background colour on every row, this is probably bad, should be using CSS classes
    rowStyle: { background: 'black' },

    // set background colour on even rows again, this looks bad, should be using CSS classes


    // other grid options ...
  }
  // onFirstDataRendered(params: FirstDataRenderedEvent) {
  //   // params.api.paginationGoToPage(4);

    
  //   params.api.forEachNode((node) =>
  //   node.setSelected(!!node.data && node.data?.year !== 2012)
  //   );
  // }




  basicInfo: boolean = false;
  noPromotionSelected: boolean = true;

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
  selectedDay: string = '';
  promotionTypesName: any;

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


  minimumorderquantity: any = '';
  toppingList1: any = [];
  filterDictionary: any;
  sideBarOpen = true;
  scrolledIndex = 0;
  defaultPageSize = 12;
  geoGraphiesList:any=[];
  message: boolean = false;
  message1: boolean = true;
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
  promoName: string = '';
  Additional:any;
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


  columnDefs: ColDef[] = [

    {
      headerName: "Code",
      field: 'code', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',
      
        checkboxSelection: (params) => { 
        
        return params.node.data.isEnabled
      },
      
        showDisabledCheckboxes: true,

      
      

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
  constructor(public promotionTypes: PromotionService,
    private sharedServices :SharedService) { }

  ngOnInit(): void {
    let data = localStorage.getItem('promoclickId');
    this.LoginId=localStorage.getItem("logInId");
    let obj:any= {
      PromotionId:data,
      CurrentUserId:this.LoginId,
    }

    this.promotionTypes.viewPromotion(obj).subscribe((res) => {


        this.header = 'Edit';
        let data = localStorage.getItem('promoclickId')
        
          console.log('response EditPromotion', res)
          this.promoName = res.response.promotionName;
          this.selectedPromo = res.response.promotionTypesId;
          this.addImgpreview = true;
          this.base64textString = res.response.imageurl;
          this.geoGraphiesList=res.response.geographySection;
          this.startDate.setValue(res.response.startDate);
          this.selectedStartDate = this.sharedServices.dateformat(res.response.startDate);
          
          this.endDate.setValue(res.response.endDate)
          
          this.selectedEndDate = new Date(res.response.endDate).getFullYear() + '/' + (new Date(res.response.endDate).getMonth() + 1) + '/' + new Date(res.response.endDate).getDate();
          // alert(this.selectedEndDate)
          this.promoName = res.response.promotionName;
          this.selectedPromo = res.response.promotionTypesId;
       
          // alert(this.selectedPromo)
          this.addImgpreview = true;
          this.base64textString = res.response.imageurl;
          this.startDate.setValue(res.response.startDate);

           this.selectedEndDate = this.sharedServices.dateformat(res.response.startDate);
  this.promotionTypesName=res.response.promotionTypesName
          this.Remarks = res.response.remarks;
          this.EntityInstanceId = [];
          this.selectedDealers = res.response.selectedDealers
  
          this.selectedDealers.forEach(element => {
            this.EntityInstanceId.push(element.dealerId)
          });
  
          console.log('this.addbuyset', this.addbuyset);
          this.rowData5=res.response.selectedDealers;
     let rowData =res.response.selectedDealers;
         this.rowData5 = this.rowData5.map(x => {
            x.isProductSelected= true;
            return x;
          });
          const selectedRows = this.gridApi.getSelectedRows();

          res.response.selectedDealers.forEach(element=>{
          element.customerId  = selectedRows.map(x => x.customerId);
      })
         

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
  
  
  
        
  
      



    if (res.response.promotionTypesName == 'Buy (A+B..) get (X+Y..)') {
      this.productPromotionsId = res.response.productPromotionsId
           this.buyab = true;
            this.volumedc = false;
            this.buysets = false;
            this.pricedc = false;
    }
    if (res.response.promotionTypesId == 2){
      this.buyab = false;
      this.volumedc = false;
      this.buysets = true;
      this.pricedc = false;
    }

    if (res.response.promotionTypesName == 'Volume Discount') {
      this.buyab = false;
      this.volumedc = true;
      this.buysets = false;
      this.pricedc = false;
    }

    if (res.response.promotionTypesName == 'Price Discount') {
      this.buyab = false;
          this.volumedc = false;
          this.buysets = false;
          this.pricedc = true;
    }


  });

  }

  // onFirstDataRendered(params: FirstDataRenderedEvent) {
  //   // params.api.paginationGoToPage(4);
  //   params.api.forEachNode((node) =>
  //     node.setSelected(true)
  //   );
  // }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // params.api.paginationGoToPage(4);
    params.api.forEachNode((node) =>
      node.setSelected(!!node.data && node.data.isProductSelected)
    );

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    params.api.forEachNode((node) =>
    node.setSelected(true)
  );

  }
  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }

 
  openDialog() {
    // alert('mani')

  }
  onCellClicked(e): void {
    console.log('cellClicked', e);
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





}
