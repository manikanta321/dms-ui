import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { CellClassParams, CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi, GridOptions, ModuleRegistry, ColumnResizedEvent, Grid, CheckboxSelectionCallbackParams, } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductShortCodeComponent } from '../product-short-code/product-short-code.component';
import { ProductGroupAddItemComponent } from '../product-group-add-item/product-group-add-item.component';
import { ProductSubGroupComponent } from '../product-sub-group/product-sub-group.component';
import { PromotionService } from 'src/app/services/promotion.service';
import { AddPromotionsComponent } from '../../add-promotions/add-promotions.component';
import { MatStepper } from '@angular/material/stepper';
import { PopupPscGridTableComponent } from '../product-group-add-item/popup-psc-grid-table/popup-psc-grid-table.component';
import { PopupGridTableComponent } from '../product-group-add-item/popup-grid-table/popup-grid-table.component';
import { PopupPsubgGridTableComponent } from '../product-group-add-item/popup-psubg-grid-table/popup-psubg-grid-table.component';
export interface PeriodicElement {

  name: any;
  position: string;
  weight: number;
  symbol: string;
  emailid: any;
  phonenum: number;
  status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: '6004005001', name: 'Rajasheka S', weight: 1.0079, symbol: 'Customer', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Active' },
  { position: '6004005002', name: 'Manoranjan B', weight: 1.0079, symbol: 'Dealer', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Inactive' },
  { position: '6004005003', name: 'Vishnu M', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Active' },
  { position: '6004005004', name: 'Mahendra S', weight: 1.0079, symbol: 'Dealer', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Invited' },
  { position: '6004005005', name: 'Veerendra kr', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },
  { position: '6004005006', name: 'mahathi Br', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Active' },
  { position: '6004005007', name: 'chetheshwar T', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },
  { position: '6004005008', name: 'Swami swami', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },

  { position: '6004005006', name: 'narendra gs', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },

  { position: '6004005006', name: 'prajwal vT', weight: 1.0079, symbol: 'Admin', emailid: 'you@smartgig', phonenum: 9448282822, status: 'Locked' },

];
@Component({
  selector: 'app-add-items-promotion',
  templateUrl: './add-items-promotion.component.html',
  styleUrls: ['./add-items-promotion.component.css']
})
export class AddItemsPromotionComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  private gridApi!: GridApi;
  gridApi2!: GridApi;
  gridApi3!: GridApi;
  gridApi4!: GridApi;
  searchText;
  columnDefs: ColDef[] = [

    {
      headerName: "Product Name",
      field: 'productName', type: ['nonEditableColumn'], pinned: 'left',
      checkboxSelection: true,
      // (
      //   params: CheckboxSelectionCallbackParams<any>
      // ) => {
      //   return !!params.data && params.data.isProductSelected ;
      // }
    },

    { headerName: "Classification", field: 'classification', type: ['nonEditableColumn'] },

    { headerName: "SKU", field: 'sku', type: ['nonEditableColumn'] },

    {
      headerName: "Product Identifier",
      field: 'productIdentifier', type: ['nonEditableColumn']
    },

    {
      headerName: "Product Group",
      field: 'productGroup', type: ['nonEditableColumn'],
    },
    {
      headerName: "Product Code",
      field: 'productCode', type: ['nonEditableColumn'],
    },
    {
      headerName: "Product Shot Code",
      field: 'productShortCode', type: ['nonEditableColumn'],
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
  columnDefs1: ColDef[] = [

    {
      headerName: "Product Shot Code",
      field: 'productShortCode', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left', checkboxSelection: true
    },
    { headerName: "", field: '', type: ['nonEditableColumn'] },
    { headerName: "", field: '', type: ['nonEditableColumn'] },

    {
      headerName: "#of Products", field: 'noofproducts', type: ['nonEditableColumn'],
      cellStyle: { color: '#017EFA' },
      cellEditorPopup: true,
      onCellClicked: (event: CellClickedEvent) => this.dialog.open(PopupGridTableComponent, { panelClass: 'pscgrid-popup', width: '999px' })
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
  columnDefs2: ColDef[] = [

    {
      headerName: "Product Group",
      field: 'productGroupName', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left', checkboxSelection: true
    },

    { headerName: "", field: '', type: ['nonEditableColumn'] },

    { headerName: "", field: '', type: ['nonEditableColumn'] },

    {
      headerName: "",
      field: '', type: ['nonEditableColumn']
    },

    {
      headerName: "#of products",
      field: 'noofproducts', type: ['nonEditableColumn'],
      cellStyle: { color: '#017EFA' },
      cellEditorPopup: true,
      onCellClicked: (event: CellClickedEvent) => this.dialog.open(PopupGridTableComponent, { panelClass: 'grid-popup' })
    },

    {
      headerName: '',
      colId: 'action',
      // cellRenderer: UseractionComponent,
      editable: false,
      maxWidth: 75

    },
  ];
  columnDefs3: ColDef[] = [

    {
      headerName: "Product Sub-Group",
      field: 'productSubGroupName', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left', checkboxSelection: true
    },

    { headerName: "", field: '', type: ['nonEditableColumn'] },

    { headerName: "Product Group", field: 'productGroupName', type: ['nonEditableColumn'] },

    {
      headerName: "",
      field: '', type: ['nonEditableColumn']
    },

    {
      headerName: "#of Products",
      field: 'noofproducts', type: ['nonEditableColumn'],
      cellStyle: { color: '#017EFA' },
      cellEditorPopup: true,
      onCellClicked: (event: CellClickedEvent) => this.dialog.open(PopupGridTableComponent, { panelClass: 'psubgrid-popup' })
    },

    // suppressMovable:true,
    {
      headerName: '',
      colId: 'action',
      // cellRenderer: UseractionComponent,
      editable: false,
      maxWidth: 75
    },

  ];
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    // set background colour on every row, this is probably bad, should be using CSS classes
    rowStyle: { background: 'black' },

  }
  public defaultColDef: ColDef = {

    suppressSizeToFit: true,
    width: 170,
    // set the default column width
    // make every column editable
    // editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    // make columns resizable
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
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
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // toppings = new FormControl('');
  // toppings1 = new FormControl('');

  // toppingList: string[] = ['Admin', 'Dealer','Customer'];
  toppingList: any = [];
  addcategory: any = [];
  catgadd: any = [];
  toppingList1: any = [];
  filterDictionary: any;
  sideBarOpen = true;
  scrolledIndex = 0;
  defaultPageSize = 12;
  paginationScrollCount: any;
  public rowData5:any = [];
  rowDatashortcode = [];
  rowDataproductGroup = [];
  rowDataProductSubG = [];
  public popupParent: HTMLElement = document.body;
  stayScrolledToEnd = true;
  message: boolean = false;
  message1: boolean = true;
  paginationPageSize = 10;
  disabled = false;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings5: IDropdownSettings = {};
  dropdownSettings6: IDropdownSettings = {};
  productchk: boolean = true;
  prodShtCode: boolean = false;
  productGrpChk: boolean = false;
  productSubGChk: boolean = false;
  myForm: any = FormGroup;
  subCategory: any = FormGroup;
  type: any = FormGroup;
  selectedItems: any = [];
  allOtherSubCAts: any = [];
  productg: any = [];
  addtypes: any = [];
  statusTypes = [];
  userTypes = [];
  catgname: any = [];
  catergory: any = [];
  productIDentifire: any = [];
  sub_category: any = [];
  topping1: any = [];
  itemId: any = [];
  catagoryName: any;
  typeI: any = [];
  myForms: any = FormGroup;
  products: any = FormGroup;
  productidentifier: any = FormGroup;
  Productarr: any = [];
  productID: any = [];
  prodArray: any[] = [];
  prodData: any = [];
  sub_categorys: any = [];
  typeTosend: any[] = []
  itemId1: any;
  types: any;
  subcatagData: any = [];
  subcatArray: any[] = [];
  typss: any;
  allcatlist: any[] = [];
  closeIcon: boolean = false;
  typesI: any = [];
  allTypelist: any[] = []
  ShowFilter = false;
  limitSelection = false;
  StatusFilter = false;
  productCustomIdentifierArray: any[] = []
  @ViewChild('stepper') myStepper: MatStepper | any;
  productselectedRows: any = [];
  productSubGselectedRows: any = [];
  pGselectedRows: any = [];
  productScselectedRows: any = [];
  searchfeild: any;
  productData: any = [];
  ProductList: any = [];
  productSubGroupDrpdwn = [];
  // showproductfropdown : any;
  constructor(private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    public promotionTypes: PromotionService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.productidentify()
    this.productListtable();
    this.oncatselect();
    this.getProductSelect();
    this.GetProductShortCodeList();
    this.AddProductGroupList();
    this.GetProductSubGroupList1()
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'catId',
      textField: 'catName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.StatusFilter
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'subCatId',
      textField: 'subCatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      // allowSearchFilter: this.StatusFilter
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'typeId',
      textField: 'typeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    }
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    }
    this.dropdownSettings5 = {
      singleSelection: false,
      idField: 'productCustomIdentifierId',
      textField: 'productCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    }
    this.dropdownSettings6 = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    }
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
    this.subCategory = this.fb.group({
      subcatty: [this.selectedItems]
    });
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
    this.products = this.fb.group({
      products: [this.selectedItems]
    });
    this.productidentifier = this.fb.group({
      productidentifier: [this.selectedItems]
    });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }
  onGridReady2(params: GridReadyEvent) {
    this.gridApi2 = params.api;
    params.api.sizeColumnsToFit();
  }
  onGridReady3(params: GridReadyEvent) {
    this.gridApi3 = params.api;
    params.api.sizeColumnsToFit();
  }
  onGridReady4(params: GridReadyEvent) {
    this.gridApi4 = params.api;
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
    if (e.data.productShortCode) {
      localStorage.setItem('selectedtable', 'productshortCode')
      localStorage.setItem('selectedtableId', e.data.productShortCode);

    }
    if (e.data.productGroupId) {
      localStorage.setItem('selectedtable', 'productgroup')
      localStorage.setItem('selectedtableId', e.data.productGroupId)
    }
    if (e.data.productSubGroupId) {
      localStorage.setItem('selectedtable', 'productSubgroup')
      localStorage.setItem('selectedtableId', e.data.productSubGroupId)
      localStorage.setItem('selectedtableId2', e.data.productGroupId)
    }
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

  productListtable() {
    const data = {
      category: [],
      subCategory: [],
      type: [],
      productgroup: [],
      productidentifier: [],
      search: ''
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      console.log("*******************");
      console.log(this.data);
      
      let rowData = res.response;

      rowData = rowData.map(x => {
        let index = this.data.findIndex(y=> y.stockItemId == x.stockItemId)
        x.isProductSelected = index == -1 ?  false : true;
        return x;
      });
      this.rowData5 = rowData.sort((a, b) => b.isProductSelected - a.isProductSelected);
    })
  }
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      category: [],
      subCategory: [],
      type: [],
      productgroup: [],
      productidentifier: [],
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('search data', res);
      this.rowData5 = res.response;

    })
  }
  onProductRowSelect(event) {
    const productselectedRows = this.gridApi.getSelectedRows();
    console.log(productselectedRows);
    return productselectedRows;
  }
  addproductitems() {
    this.productselectedRows = this.gridApi.getSelectedRows();
    console.log(this.productselectedRows);
    localStorage.setItem('productselectedRows', JSON.stringify(this.productselectedRows))
    this.dialogRef.close(true);

    // this.productScselectedRows.map((data:{stockItemId: any;}) => {
    //   return { stockItemId: data.stockItemId};
    // });
  }

  additemsProductShortCode(item: any) {
    // this.productScselectedRows = this.gridApi2.getSelectedRows();
    // console.log(this.productScselectedRows);
    localStorage.setItem('productselectedRows', JSON.stringify(this.productScselectedRows))
    this.dialogRef.close(true);

    // this.goForward(this.myStepper)

  }

  addproductGroup() {
    // this.pGselectedRows = this.gridApi3.getSelectedRows();
    // console.log(this.pGselectedRows);
    localStorage.setItem('productselectedRows', JSON.stringify(this.pGselectedRows))
    this.dialogRef.close(true);

  }



  addItemProductSubG() {
    // this.productSubGselectedRows = this.gridApi4.getSelectedRows();
    // console.log('rowl',this.productSubGselectedRows);
    localStorage.setItem('productselectedRows', JSON.stringify(this.productSubGselectedRows));

    this.dialogRef.close(true);
  }

  oncatselect() {
    this.promotionTypes.GetCategories().subscribe((res) => {

      this.catgname = res.response.allOtherCats;
      console.log('search data', this.catgname);
      this.catgname.forEach(element => {
        return this.allcatlist.push(element.catId);
      })
      console.log('allcatlist', this.allcatlist)
    })
    // let localdata = res.response.allOtherCats;
    // this.toppingList = localdata.map((data: { promotionTypesId: any; promotionTypesName: any; }) => {

    //   return { promotionTypesId: data.promotionTypesId, promotionTypesName: data.promotionTypesName };

    // });

  }
  addItemSelect(item: any) {
    // this.selectedItem = item;
    this.catergory.push(item.catId);
    console.log("Catttyyyyy", this.catergory)
    console.log('item Subcatty', item)

    this.itemId = item.catId;
    this.catagoryName = item.catName;
    let Subdata = {
      catId: this.catergory
    }
    this.promotionTypes.GetSUbCAtsOfMultiCats(Subdata).subscribe((res) => {
      this.sub_category = res.response.allOtherSubCAts;
      console.log("response1", res)
      // console.log("responseeee", subcaty);
      // this.sub_category = subcaty.allOtherSubCAts;
      console.log("SubCategory", this.sub_category);
      this.topping1 = new FormControl(this.sub_category);
    });
    const data = {
      // Cat: this.catergory,
      // Sub_Cat: this.sub_categorys,
      // type: this.typeTosend,
      // productgroup: this.productID,
      // productidentifier:this.productIDentifire,
      //  status: this.statusTypes,
      // Search: this.searchText
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }
  addItemDeSelect(item: any) {
    this.catergory.forEach((element, index) => {
      if (element == item.catId) this.catergory.splice(index, 1);

    });
    let SubdataD = {
      catId: this.catergory
    }
    this.promotionTypes.GetSUbCAtsOfMultiCats(SubdataD).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
    });
    console.log('this.catergory', this.catergory);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })

  }
  addItemDeSelectOrAll(item: any) {
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeTosend = [];
    this.typeI = [];
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  addItemSelectOrAll(item: any) {
    this.catergory = this.allcatlist
    let Subdataall = {
      catId: this.catergory
    }
    console.log("Category Array", this.catergory)
    this.itemId = item.catId;
    this.catagoryName = item.catName;
    this.promotionTypes.GetSUbCAtsOfMultiCats(Subdataall).subscribe((res) => {
      let subcaty = res.response;
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      console.log("SubCategory", this.sub_category);
      this.topping1 = new FormControl(this.sub_category);
    });
    console.log("catArray", this.catergory)
    const data = {

      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText

    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  addTypeSelect(item: any) {
    // alert(this.typeI)
    this.typeTosend.push(item.typeId);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    // alert(data)
    console.log("tttttt", data)
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
      console.log("this TYpe", this.typeI)
    });
    console.log(item);
  }
  addTypeDeSelect(item: any) {

    this.typeTosend.forEach((element, index) => {
      if (element == item.typeId) this.typeTosend.splice(index, 1);

    });

    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })

  }

  addTypeDeSelectOrAll(item: any) {

    this.typeTosend = [];
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }


  addTypeSelectOrAll(item: any) {
    this.typeTosend = this.allTypelist;

    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }


  productidentify() {
    this.promotionTypes.GetProductIdentifier().subscribe((res) => {
      console.log('search data', this.toppingList);

      this.toppingList = res.response;

      this.toppingList.forEach(element => {
        return this.productCustomIdentifierArray.push(element.productCustomIdentifierId);

      })

      // this.categorydrp = res.response
    })
  }
  onProductSelect(item: any) {
    this.productID.push(item.productGroupId);
    console.log(item);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductGroupList(data).subscribe((res) => {
      // this.rowData5 = res.response;
      this.rowData5 = res.response;
      console.log('product lis', this.Productarr)
    });
  }
  getProductSelect() {
    this.promotionTypes.GetProductGroupList1().subscribe((res) => {
      // this.rowData5 = res.response;
      this.Productarr = res.response;
      //  this.productData.forEach(element => {
      //     return this.prodArray.push(element.productGroupId);

      //   })
      let dataProd = res.response
      this.ProductList = new FormControl(this.Productarr);
      this.productData = dataProd.map((data: { productGroupId: any; productGroupName: any; }) => {
        return { productGroupId: data.productGroupId, productGroupName: data.productGroupName };
      });

      if (!this.productData?.length) {
        this.productData = dataProd.map((prod: { designationName: any; }) => {
          return prod.designationName;
        });
      }
      this.productData.push()
      this.productData.forEach(element => {
        return this.prodArray.push(element.productGroupId);

      })
      console.log('product lis', this.prodArray)
    });
  }
  onProductDeSelect(item: any) {
    this.productID.forEach((element, index) => {
      if (element == item.productGroupId) this.productID.splice(index, 1);

    });
    console.log(' this.catergory', this.catergory)

    // this.userTypes.pop(item.roleId);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onProductDeSelectOrAll(item: any) {
    this.productID = [];
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onProductSelectOrAll(item: any) {
    this.productID = this.prodArray;
    console.log("ProdData", this.productID);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onproductIdentifierSelect(item: any) {
    this.productIDentifire.push(item.productCustomIdentifierId);
    console.log(item);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductGroupList(data).subscribe((res) => {
      // this.rowData5 = res.response;
      this.rowData5 = res.response;
      console.log('product lis', this.Productarr)
    });
  }

  onproductIdentifierDeSelect(item: any) {
    this.productIDentifire.forEach((element, index) => {
      if (element == item.productCustomIdentifierId) this.productIDentifire.splice(index, 1);

    });
    console.log(' this.catergory', this.catergory)

    // this.userTypes.pop(item.roleId);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onproductIdentifierDeSelectOrAll(item: any) {
    this.productIDentifire = [];
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onproductIdentifierSelectOrAll(item: any) {
    this.productIDentifire = this.productCustomIdentifierArray;
    // console.log("ProdData", this.ProdData);
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }


  //   onproductSelect(item : any){
  //     const data = {
  //       Search : ''
  //     }
  //     this.promotionTypes.GetProductGroupList(data).subscribe((res) =>{
  // console.log('CHECK',this.productg );
  // this.productg = res.response;
  // this.rowData5 = this.productg;
  //     })
  //   }
  onStatusDeSelect(item: any) {
    this.statusTypes.forEach((element, index) => {
      if (element == item.statusId) this.statusTypes.splice(index, 1);
    });
    // this.statusTypes.pop(item.statusId);
    console.log(' this.statusTypes', this.userTypes)
    const data = {

      statuss: this.statusTypes,
      search: this.searchText,

    }
    this.promotionTypes.GetProductGroupList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.userTypes)
    console.log('onItemSelect', item);
  }
  // onsubcatg(item : any){
  //   const data = {
  //     catId : []
  //   }
  //   this.promotionTypes.GetSUbCAtsOfMultiCats(data).subscribe((res) =>{
  //     console.log('search data', this.sub_category);
  //       this.sub_category = res.response;
  //   })
  // }
  addSubCategorySelect(item: any) {
    console.log(" item Types", item);
    // this.sub_category =[];
    this.sub_categorys.push(item.subCatId);
    const datajson = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(datajson).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })

    let data1 = {
      subCatId: this.sub_categorys
    }
    console.log("Typeess Catttyy", this.subcatArray)
    this.promotionTypes.GettypesOfMultiSubCats(data1).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      this.typeI.forEach(element => {
        return this.allTypelist.push(element.typeId);
      })
      console.log("Typess", this.typss);
      // this.topping2 = new FormControl(this.typeI);
    });
    this.subcatagData = item.map((data: { subCatId: any; subCatName: any; }) => {
      return { subCatId: data.subCatId, subCatName: data.subCatName };
    });

    if (!this.subcatagData?.length) {
      this.subcatagData = item.map((subCatData: { designationName: any; }) => {
        return subCatData.designationName;
      });
    }
    this.subcatagData.push()
    this.subcatagData.forEach(element => {
      return this.subcatArray.push(element.subCatId);

    })

  }
  addSubCategoryDeSelect(item: any) {
    this.sub_categorys.forEach((element, index) => {
      if (element == item.subCatId) this.sub_categorys.splice(index, 1);

    });
    let data1 = {
      subCatId: this.sub_categorys
    }
    this.promotionTypes.GetSUbCAtsOfMultiCats(data1).subscribe((res) => {
      let typs = res.response;
      this.typeI = typs;
      this.typeI.forEach(element => {
        return this.allTypelist.push(element.typeId);
      })

    });
    console.log(' this.sub_category', this.sub_category)
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    })
  }
  addSubCategoryDSelectOrAll(item: any) {
    this.sub_categorys = [];
    this.typeI = []
    this.allTypelist = []

    this.typeTosend = []
    // this.sub_category=[];
    this.type = [];
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }
  addSubCategorySelectOrAll(item: any) {
    console.log(" item Types", item);
    this.sub_category.push(item.subCatId);
    this.itemId1 = item.subCatId;
    this.types = item.subCatName;
    this.subcatagData = item.map((data: { subCatId: any; subCatName: any; }) => {
      return { subCatId: data.subCatId, subCatName: data.subCatName };
    });

    if (!this.subcatagData?.length) {
      this.subcatagData = item.map((subCatData: { designationName: any; }) => {
        return subCatData.designationName;
      });
    }
    this.subcatagData.push()
    this.subcatagData.forEach(element => {
      return this.subcatArray.push(element.subCatId);
      // alert(this.subcatArray);

    })

    let data1 = {
      subCatId: this.subcatArray,
    }
    // this.sub_category = this.subcatArray;
    console.log("Typeess Catttyy", this.subcatArray)
    this.promotionTypes.GettypesOfMultiSubCats(data1).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      this.typeI.forEach(element => {
        return this.allTypelist.push(element.typeId);
      })
      console.log("Typess", this.typss);
      // this.topping2 = new FormControl(this.typeI);
    });
    this.sub_categorys = this.subcatArray;
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }
  closeicon() {
    // this.closeIcon
    this.dialogRef.close();
    //   this.dialog.open(AddPromotionsComponent);
    //   this.goForward(this.myStepper);
    // }
    // goForward(stepper: MatStepper) {
    //   stepper.next();
  }
  addItemRefresh() {
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.myForms = this.fb.group({
      citys: [this.selectedItems]
    });
    this.subCategory = this.fb.group({
      subcatty: [this.selectedItems]
    });
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
    this.products = this.fb.group({
      products: [this.selectedItems]
    });
    this.productidentifier = this.fb.group({
      productidentifier: [this.selectedItems]
    });
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    this.typesI = [];
    this.typeTosend = [];
    // this.Productarr = [];
    this.productID = [];
    this.searchText = ''
    this.productIDentifire = [];
    // this.productID = [];
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      //  status: this.statusTypes,
      search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
  GetProductShortCodeList() {
    const data = {
      Search: ''
    }
    this.promotionTypes.GetProductShortCodeList(data).subscribe((res) => {
      console.log('shortcodeworks', res);
      this.rowDatashortcode = res.response;

      // this.rowDatashortcode = rowData.map(x => {
        // let index = this.data.findIndex(y=> y.stockItemId == x.stockItemId)
        // x.isProductSelected = index == -1 ?  false : true;
        // return x;
      // });
    })
  }
  onSearchChangeShortcode($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      search: this.searchText,
    }
    this.promotionTypes.GetProductShortCodeList(data).subscribe((res) => {
      console.log('shortcodeworks', res);
      this.rowDatashortcode = res.response;
    })
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
  ProductShortCodeRowSelect(event) {
    const productScselectedRows = this.gridApi2.getSelectedRows();
    console.log(productScselectedRows);
    let productShortCodeOfSelected = productScselectedRows.map(x => x.productShortCode);
    console.log('productShortCodeOfSelected', productShortCodeOfSelected)
    let data = {
      ProductShortCode: productShortCodeOfSelected,
    }

    this.promotionTypes.getProductsubgropStockitemID(data).subscribe((res) => {
      console.log(res.response)
      this.productScselectedRows = res.response
    })
    console.log('slct');
  }
  // add product group
  AddProductGroupList() {
    const data = {
      Search: ''
    }
    this.promotionTypes.GetProductGroupList(data).subscribe((res) => {
      console.log('check productGlist', res);
      this.rowDataproductGroup = res.response;
    })
  }
  onLoad() {
    const data = {
      Search: ''
    }
    this.promotionTypes.GetProductGroupList(data).subscribe((res) => {
      this.rowDataproductGroup = res.response;
    });

  }
  onSearchChangeProductGroup($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      search: this.searchText,
    }
    this.promotionTypes.GetProductGroupList(data).subscribe((res) => {
      this.rowDataproductGroup = res.response;
    });

  }
  onRowSelectProductGroup(event) {
    const pGselectedRows = this.gridApi3.getSelectedRows();
    console.log('pGselectedRows', pGselectedRows);
    let productShortCodeOfSelected = pGselectedRows.map(x => x.productGroupId);

    pGselectedRows
    let data = {
      id: productShortCodeOfSelected
    }
    this.promotionTypes.getProductGroup(data).subscribe((res) => {
      console.log(res.response)
      this.pGselectedRows = res.response
      console.log('this.pGselectedRows', this.pGselectedRows)
    })



  }

  // product SubGroup
  ProductSubGroupDrpdwn(item: any) {

    // this.statusTypes.push(item.statusId);

    this.promotionTypes.GetProductGroupList1().subscribe((res) => {

      this.Productarr = res.response;

      console.log('product lis', this.Productarr)

    });



  }
  ProductsubGroupDeselect(item: any) {
    this.statusTypes.forEach((element, index) => {
      if (element == item.statusId) this.statusTypes.splice(index, 1);
    });
    // this.statusTypes.pop(item.statusId);
    console.log(' this.statusTypes', this.userTypes)
    const data = {
      productgroup: []
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res) => {
      this.rowDataProductSubG = res.response;
    });
    console.log('products', this.promotionTypes)
    console.log('onItemSelect', item);
  }
  ProductsubGroupDeSelectAll(item: any) {
    const data = {
      productgroup: []
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res) => {
      this.rowDataProductSubG = res.response;
    });
    console.log('rolefilter', this.userTypes)
  }
  ProductsubGroupSelectAll(item: any) {
    this.productID = this.prodArray;
    // console.log("ProdData", this.ProdData);
    const data = {
      status: this.statusTypes,
      Search: this.searchText,
      productgroup: [],
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res) => {
      this.rowDataProductSubG = res.response;
    });
  }
  GetProductSubGroupList1() {
    const data = {
      productgroup: [],
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res) => {
      console.log('productsubgroup is works', res);
      this.rowDataProductSubG = res.response;
    })
  }
  ProductSubGroupRowSelect(event) {
    const productSubGselectedRows = this.gridApi4.getSelectedRows();

    let productShortCodeOfSelected = productSubGselectedRows.map(x => x.productSubGroupId);

    let data = {
      id: productShortCodeOfSelected
    }
    this.promotionTypes.getProductSubGroup(data).subscribe((res) => {
      this.productSubGselectedRows = res.response
    })
    console.log(productSubGselectedRows);
  }

  matsteptabClick(tab) {

    if (tab.matStepLabel == 'productlb') {
      this.searchfeild = false;
    }
    else if (tab.matStepLabel == 'productgroup') {
      this.searchfeild = true;
    }
    else if (tab.step == 2) {
      this.searchfeild = true;
    }
  }
}
