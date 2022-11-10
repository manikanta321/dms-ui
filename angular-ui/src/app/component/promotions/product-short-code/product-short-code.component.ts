import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { CellClassParams, CellClassRules, CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi, GridOptions, ModuleRegistry, ColumnResizedEvent, Grid, } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddItemsPromotionComponent } from '../add-items-promotion/add-items-promotion.component';
import { ProductGroupAddItemComponent } from '../product-group-add-item/product-group-add-item.component';
import { ProductSubGroupComponent } from '../product-sub-group/product-sub-group.component';
import { PromotionService } from 'src/app/services/promotion.service';
import { PopupPscGridTableComponent } from '../product-group-add-item/popup-psc-grid-table/popup-psc-grid-table.component';
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
  selector: 'app-product-short-code',
  templateUrl: './product-short-code.component.html',
  styleUrls: ['./product-short-code.component.css']
})
export class ProductShortCodeComponent implements OnInit {
  private gridApi!: GridApi;
  searchText;
  columnDefs: ColDef[] = [

    {
      headerName: "Product Shot Code",
      field: 'shortCode', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',  checkboxSelection: true
    },
    { headerName: "", field: '', type: ['nonEditableColumn'] },
    { headerName: "", field: '', type: ['nonEditableColumn'] },

    { headerName: "#of Products", field: 'noofproducts', type: ['nonEditableColumn'],
    cellStyle: {color: '#017EFA'},
    cellEditorPopup: true,
       onCellClicked: (event: CellClickedEvent) => this.dialog.open(PopupPscGridTableComponent, {panelClass: 'pscgrid-popup'})
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
    prodShtCode:boolean=true;
    productGrpChk:boolean=false;
    productSubGChk:boolean=false;
    isRowSelectable : boolean = true;
  constructor(private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    public promotionTypes : PromotionService) { }

  ngOnInit(): void {
    this.GetProductShortCodeList();
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
  //   this.dialog.open( AddItemsPromotionComponent, {width:'1043px'});
  //   this.dialogRef.close()
  // }
  // productShotCode(){
  //   this.dialog.open(  ProductShortCodeComponent, {width:'1043px'});
  //   this.dialogRef.close()
  // }
  // productGrp(){
  //   this.dialog.open( ProductGroupAddItemComponent, {width:'1043px'});
  //   this.dialogRef.close()
  // }
  // productSubG(){
  //   this.dialog.open( ProductSubGroupComponent, {width:'1043px'});
  //   this.dialogRef.close()
  // }
  GetProductShortCodeList(){
   const data = {
      Search : ''
    }
    this.promotionTypes.GetProductShortCodeList(data).subscribe((res) =>{
      console.log('shortcodeworks', res);
      this.rowData5 = res.response;
    })
  }
  onSearchChange($event: any, anything?: any){
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      search: this.searchText,
    }
    this.promotionTypes.GetProductShortCodeList(data).subscribe((res) =>{
      console.log('shortcodeworks', res);
      this.rowData5 = res.response;
    })
  }
  additems(){
    console.log('revathi');
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }
  onRowSelect(event) {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }
}
