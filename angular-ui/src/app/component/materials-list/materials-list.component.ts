import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPromotionsComponent } from '../add-promotions/add-promotions.component';
import { ImpactedAssociationComponent } from './impacted-association/impacted-association.component';
import { MaterialAddEditpopupComponent } from './material-add-editpopup/material-add-editpopup.component';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridReadyEvent, RowValueChangedEvent, SideBarDef, GridApi } from 'ag-grid-community';
import { UserService } from 'src/app/services/user.service';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MaterialListService } from 'src/app/services/material-list.service';

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
  sub_categorys:any=[];
  typeI: any = [];
  typeD: any = [];
  searchText: any;
  statusTypes: any = [];
  productID: any = [];
  statusData: any = [];
  catArray: any[] = [];
  subcatArray: any[] = [];
  typeArray: any[] = [];
  prodArray: any[] = [];
  catagData: any = [];

  prodData: any = [];
  subcatagData: any = [];
  typeData: any = [];
  statusArray: any = [];
  toppingList1: any = [];
  toppingList2: any = [];
  toppingList3: any = [];
  toppingList4: any = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  constructor(public dialog: MatDialog,
    private user: UserService,
    private fb: FormBuilder,
    private materialList: MaterialListService) { }

  ngOnInit(): void {
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
        // alert(this.catArray);

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
        // alert(this.catArray);

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
      Search: ""
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
    console.log("Catttyyyyy",this.catergory)
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
      console.log("SubCategory", this.sub_category);
      this.topping1 = new FormControl(this.sub_category);
    });
    console.log("catArray", this.catergory)
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
  onItemDeSelectOrAll(item: any) {
    this.catergory = [];
    this.sub_category = [];
    this.typeI = [];
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
  onSubCategorySelect(item: any) {
    console.log(" item Types", item);
    // this.sub_category =[];
    this.sub_categorys.push(item.subCatId);
    console.log("typesss2",this.sub_category)
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

    })
    // let Type = {
    //   subCatId: this.subcatArray
    // }
        let Type = {
      subCatId: this.sub_categorys
    }
    this.sub_category = this.subcatArray;
    console.log("Typeess Catttyy",this.subcatArray)
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
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
  onSubCategoryDeSelect(item: any) {

    this.sub_category.forEach((element, index) => {
      if (element == item.subCatId) this.sub_category.splice(index, 1);

    });
    //    this.subcatagData = item.map((data: { subCatId: any; subCatName: any; }) => {
    //     return { subCatId: data.subCatId, subCatName: data.subCatName };
    //   });

    //   if (!this.subcatagData?.length) {
    //     this.subcatagData = item.map((subCatData: { designationName: any; }) => {
    //       return subCatData.designationName;
    //     });
    //   }
    //   this.subcatagData.push()
    //  this.subcatagData.forEach(element=>{
    //  return   this.subcatArray.push(element.subCatId);

    //   })
    //   let Type = {
    //     subCatId:this.subcatArray
    //    }
    this.materialList.onclicksubcat(this.sub_category).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
    console.log(' this.sub_category', this.sub_category)

    // this.userTypes.pop(item.roleId);
    // this.type=[];
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
  onSubCategorySelectOrAll(item: any) {
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
    let Type = {
      subCatId: this.subcatArray
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
    this.sub_category = this.subcatArray;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.subcatArray,
      type: this.typeI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText
    }
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onSubCategoryDSelectOrAll(item: any) {
    // this.sub_category=[];
    this.type = [];
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
  onTypeSelect(item: any) {
    // alert(this.typeI)
    this.typeI.push(item.typeId);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
      type: this.typeI,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText
    }
    // alert(data)
    console.log("tttttt",data)
    this.materialList.getMaterialList(data).subscribe((res) => {
      this.rowData5 = res.response;
      console.log("this TYpe",this.rowData5)
    });
    console.log(item);
  }
  onTypeDeSelect(item: any) {

    this.typeI.forEach((element, index) => {
      if (element == item.typeId) this.catergory.splice(index, 1);

    });
    console.log(' this.catergory', this.catergory)

    // this.userTypes.pop(item.roleId);
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
  onProductSelect(item: any) {
    this.productID.push(item.productGroupId);
    console.log(item);
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
  onProductDeSelect(item: any) {
    this.productID.forEach((element, index) => {
      if (element == item.productGroupId) this.productID.splice(index, 1);

    });
    console.log(' this.catergory', this.catergory)

    // this.userTypes.pop(item.roleId);
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
  onProductSelectOrAll(item: any) {
    this.productID = this.prodArray;
    console.log("ProdData", this.ProdData);
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
  onProductDeSelectOrAll(item: any) {
    this.productID = [];
    this.productID.forEach((element, index) => {
      if (element == item.productGroupId) this.productID.splice(index, 1);

    });
    console.log(' this.productID', this.productID)

    // this.userTypes.pop(item.roleId);
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
  onStatusSelect(item: any) {
    this.statusTypes.push(item.statusId);
    console.log(item);
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
  onStatusDeSelect(item: any) {
    this.statusTypes.forEach((element, index) => {
      if (element == item.statusId) this.statusTypes.splice(index, 1);
    });
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
  onItemDeSelectOrAllStatus(item: any) {
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
  onItemSelectOrAllStatus(item: any) {
    this.statusTypes = this.statusArray;
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
    console.log('rolefilter', this.statusTypes)
  }
  editfn() {
    alert('guru')
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
  addMaterials() {
    this.dialog.open(MaterialAddEditpopupComponent);

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
    this.typeI = [];
    this.productID = [];
    this.statusTypes = [];
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
  columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: 'stockItemName', type: ['nonEditableColumn'], sort: 'desc'
    },

    {
      headerName: "Classification",
      field: 'classification'
    },

    {
      headerName: "UoM",
      field: 'uoMName', type: ['nonEditableColumn']
    },
    {
      headerName: "Product Group",
      field: 'productGroupName', type: ['nonEditableColumn']
    },
    {
      headerName: "SKU",
      field: 'productSKUName', type: ['nonEditableColumn']
    },
    {
      headerName: "Status",

      field: 'statusName',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Active', 'Inactive', 'Invited', 'Locked',],
      }
    },

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
  public rowData5 = [];
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
  openDialog() {
    alert('Shivam')
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
