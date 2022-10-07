import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPromotionsComponent } from '../add-promotions/add-promotions.component';
import { ImpactedAssociationComponent } from './impacted-association/impacted-association.component';
import { MaterialAddEditpopupComponent } from './material-add-editpopup/material-add-editpopup.component';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef,GridApi } from 'ag-grid-community';
import { UserService } from 'src/app/services/user.service';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';  
// import { ButtonRendererComponent } from './renderer/button-renderer.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  emailid:any;
  phonenum:number;
  status:any;
}


@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit {
  private gridApi!: GridApi;
  myForm:any= FormGroup;
  myForms:any= FormGroup;
  subCategory:any= FormGroup;
  type:any= FormGroup;
  product:any= FormGroup;
  selectedItems: any = [];
  selectedStatus: any = [];
  disabled = false;
  ShowFilter = false;
  subCategoryFilter = false;
  typeFilter = false;
  productFilter = false;
  StatusFilter = false;
  limitSelection = false;
  statusSelection =false;
  subCategorySelection =false;
  typeSelection =false;
  productSelection =false;
  toppingList: any= [];
  toppingList1:  any= [];
  toppingList2:  any= [];
  toppingList3:  any= [];
  toppingList4:  any= [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  constructor(public dialog: MatDialog,
    private user:UserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.toppingList = [
      { CategoryId: 1, CategoryName: 'Mumbai' },
      { CategoryId: 2, CategoryName: 'Bangaluru' },
      { CategoryId: 3, CategoryName: 'Pune' },
      { CategoryId: 4, CategoryName: 'Navsari' },
      { CategoryId: 5, CategoryName: 'New Delhi' }
    ];
    this.toppingList1 = [
      { statusId: 1, statusName: 'Mumbai' },
      { statusId: 2, statusName: 'Bangaluru' },
      { statusId: 3, statusName: 'Pune' },
      { statusId: 4, statusName: 'Navsari' },
      { statusId: 5, statusName: 'New Delhi' }
    ];
    this.toppingList3 = [
      { typeId: 1, typeText: 'Mumbai' },
      { typeId: 2, typeText: 'Bangaluru' },
      { typeId: 3, typeText: 'Pune' },
      { typeId: 4, typeText: 'Navsari' },
      { typeId: 5, typeText: 'New Delhi' }
    ];
    this.toppingList4 = [
      {  productId: 1,  productText: 'Mumbai' },
      {  productId: 2, productText: 'Bangaluru' },
      {  productId: 3, productText: 'Pune' },
      {  productId: 4, productText: 'Navsari' },
      {  productId: 5, productText: 'New Delhi' }
    ];
    this.toppingList2 = [
      {  subCategoryId: 1,  subCategoryText: 'Mumbai' },
      {  subCategoryId: 2, subCategoryText: 'Bangaluru' },
      {  subCategoryId: 3, subCategoryText: 'Pune' },
      {  subCategoryId: 4, subCategoryText: 'Navsari' },
      {  subCategoryId: 5, subCategoryText: 'New Delhi' }
    ];
    this.selectedItems = [];
    this.selectedStatus =[];
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'CategoryId',
    textField: 'CategoryName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: this.ShowFilter
};
this.dropdownSettings1 = {
  singleSelection: false,
  idField: 'statusId',
  textField: 'statusName',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 2,
  allowSearchFilter: this.StatusFilter
};
this.dropdownSettings2 = {
  singleSelection: false,
  idField: 'subCategoryId',
  textField: 'subCategoryText',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 2,
  allowSearchFilter: this.subCategoryFilter
};
this.dropdownSettings3 = {
  singleSelection: false,
  idField: 'typeId',
  textField: 'typeText',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 2,
  allowSearchFilter: this.typeFilter
};
this.dropdownSettings4 = {
  singleSelection: false,
  idField: 'productId',
  textField: 'productText',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 2,
  allowSearchFilter: this.productFilter
};
this.myForm = this.fb.group({
  city: [this.selectedItems]
});
this.myForms = this.fb.group({
citys: [this.selectedItems]
});
this.subCategory = this.fb.group({
  subCategory: [this.selectedItems]
  });
  this.type = this.fb.group({
    type: [this.selectedItems]
    });
    this.product = this.fb.group({
      product: [this.selectedItems]
      });
  }
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSubCategorySelect(item: any) {
    console.log(item);
  }
  onTypeSelect(item: any) {
    console.log(item);
  }
  onProductSelect(item: any) {
    console.log(item);
  }
  onStatusSelect(item: any) {
    console.log(item);
  }
  editfn(){
    alert('guru')
  }
  
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onSubCategoryAll(items: any) {
    console.log('onSelectAll', items);
  }
  onTypeAll(items: any) {
    console.log('onSelectAll', items);
  }
  onProductAll(items: any) {
    console.log('onSelectAll', items);
  }
  onStatusAll(items: any) {
  console.log('onSelectAll', items);
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
  toogleSubCategoryFilter() {
    this.subCategoryFilter = !this.subCategoryFilter;
    this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { allowSearchFilter: this.subCategoryFilter });
  }
  
  handleSubCategorySelection() {
    if (this.subCategorySelection) {
        this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { subCategorySelection: 2 });
    } else {
        this.dropdownSettings2 = Object.assign({}, this.dropdownSettings2, { subCategorySelection: null });
    }
  }
  toogleTypeFilter() {
    this.typeFilter = !this.typeFilter;
    this.dropdownSettings3 = Object.assign({}, this.dropdownSettings3, { allowSearchFilter: this.typeFilter });
  }
  
  handleTypeSelection() {
    if (this.subCategorySelection) {
        this.dropdownSettings3 = Object.assign({}, this.dropdownSettings3, { subCategorySelection: 2 });
    } else {
        this.dropdownSettings3 = Object.assign({}, this.dropdownSettings3, { subCategorySelection: null });
    }
  }
  toogleProductFilter() {
    this.productFilter = !this.productFilter;
    this.dropdownSettings4 = Object.assign({}, this.dropdownSettings4, { allowSearchFilter: this.productFilter });
  }
  
  handleProductSelection() {
    if (this.productSelection) {
        this.dropdownSettings4 = Object.assign({}, this.dropdownSettings4, { productSelection: 2 });
    } else {
        this.dropdownSettings4 = Object.assign({}, this.dropdownSettings4, { productSelection: null });
    }
  }
  toogleStatusFilter() {
  this.StatusFilter = !this.StatusFilter;
  this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { allowSearchFilter: this.StatusFilter });
  }
  
  handleStatusSelection() {
  if (this.statusSelection) {
      this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { statusSelection: 2 });
  } else {
      this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { statusSelection: null });
  }
  
  
    
    }
refresh(){
  this.myForm = this.fb.group({
    city: [this.selectedItems]
});
this.myForms = this.fb.group({
  citys: [this.selectedItems]
});
this.subCategory = this.fb.group({
  subCategory: [this.selectedItems]
  });
  this.type = this.fb.group({
    type: [this.selectedItems]
    });
    this.product = this.fb.group({
      product: [this.selectedItems]
      });
  }
  columnDefs: ColDef[] = [
  { headerName: "User Id",
    field: 'employeeCode' , sort: 'desc'},

  {   headerName: "User Name",field: 'employeeName' },

  { field: 'role', },

  {  headerName: "Email Id",
     field: 'emailId' },

  {   headerName: "Phone no",
    field: 'mobilePhone',},

  {   headerName: "Last Login",
    // field: 'lastLoginDate',type: ['dateColumn', 'nonEditableColumn'], width: 220  },
    field: 'lastLoginDate',type: ['nonEditableColumn']},


  { headerName: "Status",
     field: 'status', 
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['Active', 'Inactive', 'Invited', 'Locked',],
  }
},
// {
//   headerName: "Avatar",
//   field: "avatar",
//   width: 100,
//   cellRenderer: `<img style="height: 14px; width: 14px" src='../../../assets/img/edit.svg' />`
//  },

];
public defaultColDef: ColDef = {
  editable: true,
  filter: 'agTextColumnFilter',
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
public rowData5=[];
public popupParent: HTMLElement = document.body;
onCellValueChanged(event: CellValueChangedEvent) {
  // alert(event.value)
  console.log(
    'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
  );
}
onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.sizeColumnsToFit();
}
openDialog(){
  alert('Shivam')
}
onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
}
}
