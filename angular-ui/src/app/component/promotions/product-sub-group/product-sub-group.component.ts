import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { CellClassParams, CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi, GridOptions, ModuleRegistry, ColumnResizedEvent, Grid, } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductShortCodeComponent } from '../product-short-code/product-short-code.component';
import { ProductGroupAddItemComponent } from '../product-group-add-item/product-group-add-item.component';
import { AddItemsPromotionComponent } from '../add-items-promotion/add-items-promotion.component';
import { UserService } from 'src/app/services/user.service';
import { PromotionService } from 'src/app/services/promotion.service';
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
  selector: 'app-product-sub-group',
  templateUrl: './product-sub-group.component.html',
  styleUrls: ['./product-sub-group.component.css']
})
export class ProductSubGroupComponent implements OnInit {
  private gridApi!: GridApi;
  searchText;
  columnDefs: ColDef[] = [

    {
      headerName: "Product Sub-Group",
      field: 'productSubGroup', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left', checkboxSelection: true
    },

    { headerName: "", field: '', type: ['nonEditableColumn'] },

    { headerName: "Product Group", field: 'productGroup', type: ['nonEditableColumn'] },

    {
      headerName: "",
      field: '', type: ['nonEditableColumn']
    },

    {
      headerName: "#of Products",
      field: 'noofproducts', type: ['nonEditableColumn'],
      cellStyle: {color: '#017EFA'},
      cellEditorPopup: true,
       onCellClicked: (event: CellClickedEvent) => this.dialog.open(PopupPsubgGridTableComponent, {panelClass: 'psubgrid-popup'})
    },  

    // suppressMovable:true,
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
    myForm:any= FormGroup;
    myForms:any= FormGroup;
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
    disabled = false;
    dropdownSettings: IDropdownSettings = {};
    dropdownSettings1: IDropdownSettings = {};
    productchk:boolean=false;
    prodShtCode:boolean=false;
    productGrpChk:boolean=false;
    productSubGChk:boolean=true;
    userTypes: any = [];
    statusTypes: any = [];
    statusArray: any = [];
    toppings = new FormControl('');
    toppings1 = new FormControl('');
    selectedStatus: any = [];
    StatusFilter = false;
    Productarr: any = [];
    productID: any = [];
    prodArray: any[] = [];
  constructor(private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    public promotionTypes : PromotionService) { }

  ngOnInit(): void {
    this.statusItems();
    this.productselt();
    this.GetProductSubGroupList1();
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    }
  }
   statusItems() {
    const data = {
      productgroup : []
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res: any) => {
      this.toppingList1 = res.response;
      // this.toppingList1 = localdata.map((data: { status_id: any; status_name: any; }) => {
      //   return {status_id: data.status_id, status_name: data.status_name };
      // });

      // if (!this.toppingList1?.length) {
      //   this.toppingList1 = localdata.map((status: { status_name: any; }) => {
      //     return status.status_name;
      //   });
      // }
      // this.toppingList1.push()
      console.log('we have to check here', this.toppingList1)
      this.toppingList1.forEach(element => {
        return this.statusArray.push(element.statusId);
        // console.log('rolecheck',rolecheck)

      })
      console.log('statusArray', this.statusArray)
      // this.toppingList = res.response;
      this.selectedStatus = [];
      this.toppings1 = new FormControl(this.toppingList1);

    });
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
  // product(){
  //   this.dialog.open( AddItemsPromotionComponent,{width:'1043px'});
  //   this.dialogRef.close()
  // }
  // productShotCode(){
  //   this.dialog.open(  ProductShortCodeComponent,{width:'1043px'});
  //   this.dialogRef.close()
  // }
  // productGrp(){
  //   this.dialog.open( ProductGroupAddItemComponent,{width:'1043px'});
  //   this.dialogRef.close()
  // }
  // productSubG(){
  //   this.dialog.open( ProductSubGroupComponent,{width:'1043px'});
  //   this.dialogRef.close()
  // }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onProductSelect(item: any) {
    // this.statusTypes.push(item.statusId);
     this.promotionTypes.GetProductGroupList1().subscribe((res) => {
      this.Productarr = res.response;
      console.log('product lis', this.Productarr)
    });

  }
  productselt(){
    this.promotionTypes.GetProductGroupList1().subscribe((res) => {
      // this.rowData5 = res.response;
      this.Productarr = res.response;
      console.log('product lis', this.Productarr)
    });
  }
  onStatusDeSelect(item: any) {
    this.statusTypes.forEach((element, index) => {
      if (element == item.statusId) this.statusTypes.splice(index, 1);
    });
    // this.statusTypes.pop(item.statusId);
    console.log(' this.statusTypes', this.userTypes)
    const data = {
     productgroup : []
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('products', this.promotionTypes)
    console.log('onItemSelect', item);
  }
  onItemDeSelectOrAllStatus(item: any) {
    const data = {
      productgroup : []
     }
     this.promotionTypes.GetProductSubGroupList(data).subscribe((res)  => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.userTypes)
  }
  onItemSelectOrAllStatus(item: any) {
    this.productID = this.prodArray;
    // console.log("ProdData", this.ProdData);
    const data = {
      status: this.statusTypes,
      Search: this.searchText,
      productgroup : [],
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  GetProductSubGroupList1(){
    const data = {
      productgroup : [],
    }
    this.promotionTypes.GetProductSubGroupList(data).subscribe((res) =>{
      console.log('productsubgroup is works', res);
      this.rowData5 = res.response;
    })
  }
  onRowSelect(event) {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }
  addsubg(){
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }
}
