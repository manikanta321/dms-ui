import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPromotionsComponent } from '../add-promotions/add-promotions.component';
import { ImpactedAssociationComponent } from './impacted-association/impacted-association.component';
import { MaterialAddEditpopupComponent } from './material-add-editpopup/material-add-editpopup.component';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi, GridOptions } from 'ag-grid-community';
import { UserService } from 'src/app/services/user.service';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MaterialListService } from 'src/app/services/material-list.service';
import { MaterialListActionComponent } from '../material-list-action/material-list-action.component';
import { SharedServiceMaterialListService } from 'src/app/services/shared-service-material-list.service';
// import { ButtonRendererComponent } from './renderer/button-renderer.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  emailid: any;
  phonenum: number;
  status: any;
}


@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit {
  private gridApi!: GridApi;
  myForm: any = FormGroup;
  myForms: any = FormGroup;
  subCategory: any = FormGroup;
  type: any = FormGroup;
  product: any = FormGroup;
  selectedItems: any = [];
  selectedStatus: any = [];
  disabled = false;
  ShowFilter = false;
  subCategoryFilter = false;
  typeFilter = false;
  productFilter = false;
  StatusFilter = false;
  limitSelection = false;
  statusSelection = false;
  subCategorySelection = false;
  typeSelection = false;
  productSelection = false;
  coutCatagory: any;
  catgname: any;
  catNamee: any;
  toppings: any = [];
  topping1: any = [];
  itemId: any = [];
  catagoryName: any;
  subCatty: any = [];
  prodItem: any;
  itemId1: any;
  types: any;
  typss: any;
  Product: any;
  statusList: any;
  topping2: any = [];
  ProductList: any = [];
  toppingList: any = [];
  catergory: any = [];
  ProdData: any = [];
  sub_category: any = [];
  sub_categorys: any = [];
  typeI: any = [];
  typesI: any = [];
  typesData: any = [];
  typeD: any = [];
  typessData: any = [];
  typessArray: any = [];
  searchText: any ='';
  statusTypes: any = [];
  productID: any = [];
  statusData: any = [];
  catArray: any[] = [];
  subcatArray: any[] = [];
  typeArray: any[] = [];
  prodArray: any[] = [];
  catagData: any = [];
  paginationScrollCount: any;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  userId: any;
  employeeName: any;
  prodData: any = [];
  subcatagData: any = [];
  typeData: any = [];
  statusArray: any = [];
  toppingList1: any = [];
  toppingList2: any = [];
  toppingList3: any = [];
  toppingList4: any = [];
  stockItemId: any;
  stockItemName: any;
  instancePopup: any = null;
  allComplete: boolean = true;
  isproduct:any;
  color:any='primary';

  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    }
  }
  public defaultColDef: ColDef = {
    suppressSizeToFit: true,
    width: 170,
    filter: 'agTextColumnFilter',
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
  };

  constructor(public dialog: MatDialog,
    private user: UserService,
    private fb: FormBuilder,
    private materialList: MaterialListService,
    private sharedService: SharedServiceMaterialListService) {

      this.sharedService.listen().subscribe((m: any) => {
        console.log(m)
        this.getMaterialList();
  
      })
      this.sharedService.getClickEvent().subscribe(() => {
        this.getMaterialList();
      })
      sort: [];
    }

  ngOnInit(): void {

if(    this.allComplete == true ){
  this.isproduct=1
}
else
{
  this.isproduct=0

}
    this.getMaterialList();
    this.getclassification();
    this.getProduct();
    this.getStatusList();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'catId',
      textField: 'catName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.ShowFilter
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'statusId',
      textField: 'statusName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.StatusFilter
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'subCatId',
      textField: 'subCatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.subCategoryFilter
    };
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'typeId',
      textField: 'typeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.typeFilter
    };
    this.dropdownSettings4 = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
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



  setAll(completed: boolean) {
    this.allComplete = completed;
    if(this.allComplete == true ){
      this.isproduct=1
    }
    else
    {
      this.isproduct=0
    
    }
  
    const data = {
      Cat: [],
      Sub_Cat: [],
      type: [],
      product: [],
      status: [],
      Search: "",
      isProduct:this.isproduct
    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      console.log("Material List", res);
      this.rowData5 = res.response;
      console.log('tableDaaaata', this.rowData5)
      if (this.rowData5.length >= 1) {
        this.catgname.forEach((element: { [x: string]: any; }) => {
          if (element['status'] == 'Active') {
          }
          else {
            element['isActive'] == 'Inactive'

          }
          console.log('element', element['isActive'])
        });
      }

      console.log('row data', this.catgname)

    });
  
  
  }


  getclassification() {

    this.materialList.getclassification().subscribe((res) => {
      let data = res.response;
      this.coutCatagory = res.totalRecords;
      this.catgname = data.allOtherCats;
      let dataCat = data.allOtherCats;
      this.toppings = new FormControl(this.catgname);
      // this.catNamee = this.catgname.catName;
      console.log("materialList", this.materialList);
      console.log("coutCategory", this.coutCatagory);
      console.log("this.catgname", this.catgname);
      console.log("this.catnamee", this.catNamee);
      this.catagData = dataCat.map((data: { catId: any; catName: any; }) => {
        return { catId: data.catId, roleName: data.catName };
      });

      if (!this.catagData?.length) {
        this.catagData = dataCat.map((product: { designationName: any; }) => {
          return product.designationName;
        });
      }
      this.catagData.push()
      this.catagData.forEach(element => {
        return this.catArray.push(element.catId);

      })
    })
  }
  getProduct() {
    this.materialList.getProduct().subscribe((res) => {
      let data = res.response;
      let dataProd = res.response
      console.log("Product Data", data);
      this.Product = data;
      this.ProductList = new FormControl(this.Product);
      this.prodData = dataProd.map((data: { productGroupId: any; productGroupName: any; }) => {
        return { productGroupId: data.productGroupId, productGroupName: data.productGroupName };
      });

      if (!this.prodData?.length) {
        this.prodData = dataProd.map((category: { designationName: any; }) => {
          return category.designationName;
        });
      }
      this.prodData.push()
      this.prodData.forEach(element => {
        return this.prodArray.push(element.productGroupId);

      })
    })
  }
  getStatusList() {
    // this.statusTypes.push(item.statusId);
    this.materialList.getStatusList().subscribe((res) => {
      let data = res.response;
      this.statusList = data;
      console.log("StatusList", this.statusList);
      this.statusData = new FormControl(this.statusList);
      this.statusList.forEach(element => {
        return this.statusArray.push(element.statusId);

      })
    })
    this.selectedStatus = [];
  }
  getMaterialList() {
    const data = {
      Cat: [],
      Sub_Cat: [],
      type: [],
      product: [],
      status: [],
      Search: "",
      isProduct:this.isproduct
    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      console.log("Material List", res);
      this.rowData5 = res.response;
      console.log('tableDaaaata', this.rowData5)
      if (this.rowData5.length >= 1) {
        this.catgname.forEach((element: { [x: string]: any; }) => {
          if (element['status'] == 'Active') {
          }
          else {
            element['isActive'] == 'Inactive'

          }
          console.log('element', element['isActive'])
        });
      }

      console.log('row data', this.catgname)

    });
  }
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
      type: this.typeI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText
    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onItemSelect(item: any) {
    // this.selectedItem = item;
    this.catergory.push(item.catId);
    console.log("Catttyyyyy", this.catergory)
    console.log('item Subcatty', item)

    this.itemId = item.catId;
    this.catagoryName = item.catName;
    let Subdata = {
      catId: this.catergory
    }
    this.materialList.onclickcat(Subdata).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      console.log("SubCategory", this.sub_category);
      this.topping1 = new FormControl(this.sub_category);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onItemDeSelect(item: any) {
    this.catergory.forEach((element, index) => {
      if (element == item.catId) this.catergory.splice(index, 1);

    });
    let SubdataD = {
      catId: this.catergory
    }
    this.materialList.onclickcat(SubdataD).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
    });
    console.log('this.catergory', this.catergory);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onItemSelectOrAll(item: any) {
    this.catergory = this.catArray;
    let Subdataall = {
      catId: this.catergory
    }
    console.log("Category Array", this.catergory)
    this.itemId = item.catId;
    this.catagoryName = item.catName;
    this.materialList.onclickcat(Subdataall).subscribe((res) => {
      let subcaty = res.response;
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
      let allSub_cats = subcaty.allOtherSubCAts;
      console.log("SubCategory", this.sub_category);
      this.subcatagData = allSub_cats.map((data: { subCatId: any; subCatName: any; }) => {
        return { subCatId: data.subCatId, subCatName: data.subCatName };
      });
  
      if (!this.subcatagData?.length) {
        this.subcatagData = allSub_cats.map((subCatData: { designationName: any; }) => {
          return subCatData.designationName;
        });
      }
      this.subcatagData.push()
      this.subcatagData.forEach(element => {
        return this.subcatArray.push(element.subCatId);
  
      })
      this.topping1 = new FormControl(this.sub_category);
    });
    console.log("catArray", this.catergory)
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onItemDeSelectOrAll(item: any) {
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    this.typesI = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onSubCategorySelect(item: any) {
    console.log(" item Types", item);
    this.sub_categorys.push(item.subCatId);
    let Type = {
      subCatId: this.sub_categorys
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onSubCategoryDeSelect(item: any) {
    this.sub_categorys.forEach((element, index) => {
      if (element == item.subCatId) this.sub_categorys.splice(index, 1);

    });
    let subCat = {
      subCatId: this.sub_categorys
    }
    this.materialList.onclicksubcat(subCat).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      if (this.typeI.length == 0) {
        this.typesI = [];
      }
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
    console.log(' this.sub_categorys', this.sub_categorys)
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onSubCategorySelectOrAll() {
    this.sub_categorys = this.subcatArray;
    let Type = {
      subCatId: this.sub_categorys
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onSubCategoryDSelectOrAll(item: any) {
    this.sub_categorys = [];
    this.typesI = [];
    this.typeI = []
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onTypeSelect(item: any) {
    this.typesData.push(item.typeId);
    this.typesI = this.typesData;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
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
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onTypeSelectOrAll() {

    this.typessData = this.typeI.map((data: { typeId: any; typeName: any; }) => {
      return { typeId: data.typeId, typeName: data.typeName };
    });

    if (!this.typessData?.length) {
      this.typessData = this.typeI.map((type: { designationName: any; }) => {
        return type.designationName;
      });
    }
    this.typessData.push()
    this.typessData.forEach(element => {
      return this.typessArray.push(element.typeId);

    })
    this.typesI = this.typessArray;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  OnTypeDeselectOrAll() {
    this.typesI = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onProductSelect(item: any) {
    this.productID.push(item.productGroupId);
    console.log(item);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onProductDeSelect(item: any) {
    this.productID.forEach((element, index) => {
      if (element == item.productGroupId) this.productID.splice(index, 1);

    });
    console.log(' this.catergory', this.catergory)

    // this.userTypes.pop(item.roleId);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onProductSelectOrAll(item: any) {
    this.productID = this.prodArray;
    console.log("ProdData", this.ProdData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onProductDeSelectOrAll(item: any) {
    this.productID = [];
    this.productID.forEach((element, index) => {
      if (element == item.productGroupId) this.productID.splice(index, 1);

    });
    console.log(' this.productID', this.productID)

    // this.userTypes.pop(item.roleId);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onStatusSelect(item: any) {
    this.statusTypes.push(item.statusId);
    console.log(item);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onStatusDeSelect(item: any) {
    this.statusTypes.forEach((element, index) => {
      if (element == item.statusId) this.statusTypes.splice(index, 1);
    });
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onItemDeSelectOrAllStatus(item: any) {
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onItemSelectOrAllStatus(item: any) {
    this.statusTypes = this.statusArray;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typesI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log('rolefilter', this.statusTypes)
  }
  editfn() {
  }

  // onSelectAll(items: any) {
  //   console.log('onSelectAll', items);
  // }
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
  handleScroll(event) {
    if(this.instancePopup){
      this.instancePopup.togglePopup();
      this.instancePopup = null;
    }
    
    const grid = document.getElementById('gridContainer');
    if (grid) {
      const gridBody = grid.querySelector('.ag-body-viewport') as any;
      const scrollPos = gridBody.offsetHeight+event.top;
      const scrollDiff = gridBody.scrollHeight - scrollPos;
      //const api =  this.rowData5;
      this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
      this.paginationScrollCount = this.rowData5.length;
    }

  }
  addMaterials() {
    this.dialog.open(MaterialAddEditpopupComponent, {
      // width: '100vw',
      maxWidth: '70vw',
      panelClass: 'material-add-edit'
  });

  }
  onCellClicked(e): void {
    console.log('cellClicked', e);
    this.userId = e.data.userId;
    this.employeeName = e.data.userName;
    this.stockItemId = e.data.stockItemId;
    this.stockItemName = e.data.stockItemName;
    console.log('userID', this.userId);
    localStorage.setItem('userID', this.userId)
    localStorage.setItem('employeeName', this.employeeName);
    localStorage.setItem('listData', this.stockItemId);
    localStorage.setItem('listName', this.stockItemName);
    if (e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action') {
      const cellRendererInstances = e.api.getCellRendererInstances({
        rowNodes: [e.node],
        columns: [e.column],
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        this.instancePopup = instance;
        instance.togglePopup();
      }
    }
  }
  refresh() {
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
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    this.typesI = [];
    this.productID = [];
    this.statusTypes = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
      type: this.typeI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText,
      isProduct:this.isproduct

    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: 'stockItemName', type: ['nonEditableColumn'], sort: 'desc', minWidth: 200
    },

    {
      headerName: "Classification",
      field: 'classification', type: ['nonEditableColumn'], minWidth: 250
    },

    {
      headerName: "UoM",
      field: 'uoMName', type: ['nonEditableColumn'], minWidth: 40
    },
    {
      headerName: "Product Group",
      field: 'productGroupName', type: ['nonEditableColumn'], minWidth: 200
    },
    {
      headerName: "SKU",
      field: 'productSKUName', type: ['nonEditableColumn'], minWidth: 130
    },
    {
      headerName: "Status",
      field: 'statusName',
      type: ['nonEditableColumn'],
      cellEditor: 'agSelectCellEditor',
      maxWidth: 200,
      cellEditorParams: {
        values: ['Active', 'Inactive']
      },
      cellClass: params => {
        return params.value == 'InActive' ? 'my-class-1' : params.value == 'Active' ? 'my-class-2' : 'my-class-4'
      },
      tooltipField: "statusName",
    },
    {
      headerName: '',
      colId: 'action',
      cellRenderer: MaterialListActionComponent,
      editable: false,
      maxWidth: 60
    },

  ];
  // public defaultColDef: ColDef = {
  //   editable: true,
  //   filter: 'agTextColumnFilter',
  //   resizable: true,
  //   sortable: true,
  // };
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
  public rowData5 = [];
  public popupParent: HTMLElement = document.body;
  onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
  openDialog() {
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
