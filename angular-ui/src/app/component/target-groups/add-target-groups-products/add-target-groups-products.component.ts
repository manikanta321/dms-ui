import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GridReadyEvent, GridApi, ColDef, GridOptions, CellValueChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import { MaterialListService } from 'src/app/services/material-list.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionService } from 'src/app/services/promotion.service';
import { TargetListService } from 'src/app/services/target-list.service';
@Component({
  selector: 'app-add-target-groups-products',
  templateUrl: './add-target-groups-products.component.html',
  styleUrls: ['./add-target-groups-products.component.css']
})
export class AddTargetGroupsProductsComponent implements OnInit {
  closeIcon: boolean = false;
  category: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  subCategorys: IDropdownSettings = {};
  productType: IDropdownSettings = {};
  dropdownSettings5: IDropdownSettings = {};
  productGroups: IDropdownSettings = {};
  catgname: any = [];
  statusTypes = [];
  catergory: any = [];
  itemId: any = [];
  sub_category: any = [];
  catagoryName: any;
  topping1: any = [];
  typeTosend: any[] = []
  sub_categorys: any = [];
  productID: any = [];
  productIDentifire: any = [];
  searchText = "";
  public rowData5: any = [{ productName: 444, classification: "test", sku: "sku", productIdentifier: 24, productGroup: "acd12", productCode: 45 }]
  allcatlist: any[] = [];
  typeI: any = [];
  disabled = false;
  myForm: any = FormGroup;
  subCattyForm: any = FormGroup;
  selectedItems: any = [];
  subcatArray: any[] = [];
  allTypelist: any[] = [];
  typss: any;
  subcatagData: any = [];
  itemId1: any;
  types: any;
  typess: any = FormGroup;
  Product: any = [];
  prodArray: any[] = [];
  product: any = FormGroup;
  toppingList: any = [];
  myForms: any = FormGroup;
  subCategory: any = FormGroup;
  identifier: any = FormGroup;
  productCustomIdentifierArray: any[] = [];
  public popupParent: HTMLElement = document.body;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount: any;
  selectedRows: any = [];
  ShowFilter = false;
  flag: boolean = true;
  subCategoryFilter = false;
  typeFilter = false;
  productFilter = false;
  typesI: any = [];
  typessData: any = [];
  typessArray: any = [];
  targetselectedRows: any
  private gridApi!: GridApi;
  columnDefs: ColDef[] = [

    {
      headerName: "Product Name",
      field: 'productName', type: ['nonEditableColumn'], pinned: 'left', checkboxSelection: true
    },

    { headerName: "Classification", field: 'classification', type: ['nonEditableColumn'] },

    { headerName: "SKU", field: 'classification', type: ['nonEditableColumn'], maxWidth: 100 },

    {
      headerName: "Product Identifier",
      field: 'productIdentifier', type: ['nonEditableColumn']
    },

    {
      headerName: "Product Group",
      field: 'productGroup', type: ['nonEditableColumn'], maxWidth: 170
    },
    // {
    //   headerName: "Product Code",
    //   field: 'productCode', type: ['nonEditableColumn'],
    // },


  ];
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
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
  limitSelection = false;
  isproduct: any;
  coutCatagory: any;
  toppings: any;
  catagData: any;
  catArray: any = [];
  subCategorySelection = false;
  topping2: any = [];
  ProdData: any = [];
  ProductList: any = [];
  prodData: any = [];
  productSelection = false;
  targetItemsData: any = [];
  targetItemsArray: any = [];
  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    public promotionTypes: PromotionService,
    private fb: FormBuilder,
    private targetList: TargetListService,
    private materialList: MaterialListService,
  ) { }

  ngOnInit(): void {
    this.getclassification();
    this.getProduct();
    this.displayTargetGroup();
    this.productidentify();
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.subCattyForm = this.fb.group({
      subcatty: [this.selectedItems]
    });
    this.product = this.fb.group({
      product: [this.selectedItems]
    });
    this.identifier = this.fb.group({
      identifier: [this.selectedItems]
    });
    this.typess = this.fb.group({
      typess: [this.selectedItems]
    });
    this.category = {
      singleSelection: false,
      idField: 'catId',
      textField: 'catName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.ShowFilter
    };
    this.subCategorys = {
      singleSelection: false,
      idField: 'subCatId',
      textField: 'subCatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.subCategoryFilter
    };
    this.productType = {
      singleSelection: false,
      idField: 'typeId',
      textField: 'typeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.typeFilter
    };
    this.dropdownSettings5 = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.productFilter
    };
    this.productGroups = {
      singleSelection: false,
      idField: 'productGroupId',
      textField: 'productGroupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.productFilter
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'productCustomIdentifierId',
      textField: 'productCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
    }
  }
  addItemSelect(item: any) {
    this.catergory.push(item.catId);
    this.itemId = item.catId;
    this.catagoryName = item.catName;
    let Subdata = {
      catId: this.catergory,
      flag: this.flag
    }
    this.materialList.onclickcat(Subdata).subscribe((res) => {
      let subcaty = res.response;
      this.sub_category = subcaty.allOtherSubCAts;
      this.topping1 = new FormControl(this.sub_category);
    });
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
  }
  getclassification() {

    this.materialList.getclassification(this.flag).subscribe((res) => {
      let data = res.response;
      this.coutCatagory = res.totalRecords;
      this.catgname = data.allOtherCats;
      let dataCat = data.allOtherCats;
      console.log("DataCat", dataCat)
      this.toppings = new FormControl(this.catgname);
      // this.catNamee = this.catgname.catName;
      console.log("materialList", this.materialList);
      console.log("coutCategory", this.coutCatagory);
      console.log("this.catgname", this.catgname);
      // console.log("this.catnamee", this.catNamee);
      this.catagData = dataCat.map((data: { catId: any; catName: any; }) => {
        return { catId: data.catId, roleName: data.catName };
      });

      if (!this.catagData?.length) {
        this.catagData = dataCat.map((product: { designationName: any; }) => {
          return product.designationName;
        });
      }
      this.catagData.push()
      console.log("catagData", this.catagData)
      this.catagData.forEach(element => {
        return this.catArray.push(element.catId);

      })
    })
    console.log("hellooo")
    console.log("Categoryyyyyy", this.catArray)
  }
  // catNamee(arg0: string, catNamee: any) {
  //   throw new Error('Method not implemented.');
  // }
  addItemSelectOrAll(item: any) {
    console.log("categoryArry", this.catArray);
    console.log("catList", this.allcatlist);
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
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
  }
  addItemDeSelectOrAll(item: any) {
    this.subCategory = this.fb.group({
      subCategory: [this.selectedItems]
    });
    this.typess = this.fb.group({
      typess: [this.selectedItems]
    });
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    this.typeTosend = [];
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
  }
  addItemDeSelect(item: any) {
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
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
    this.subCategory = this.fb.group({
      subCategory: [this.selectedItems]
    });
    this.typess = this.fb.group({
      typess: [this.selectedItems]
    });
  }
  addSubCategorySelect(item: any) {
    console.log(" item Types", item);
    this.sub_categorys.push(item.subCatId);
    let Type = {
      subCatId: this.sub_categorys,
      flag: this.flag
    }
    this.materialList.onclicksubcat(Type).subscribe((res) => {
      let typs = res.response;
      console.log("types..res", typs);
      this.typeI = typs;
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });

  }
  addSubCategoryDeSelect(item: any) {
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
        this.typeTosend = [];
      }
      console.log("Typess", this.typss);
      this.topping2 = new FormControl(this.typeI);
    });
    console.log(' this.sub_categorys', this.sub_categorys)
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
    this.typess = this.fb.group({
      typess: [this.selectedItems]
    });
  }
  addSubCategoryDSelectOrAll(item: any) {
    this.sub_categorys = [];
   this.typeTosend = [];
    this.typeI = []
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type:this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
    this.typess = this.fb.group({
      typess: [this.selectedItems]
    });
  }
  addSubCategorySelectOrAll(item: any) {
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
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
  }
  addTypeSelect(item: any) {
    // alert(this.typeI)
    this.typeTosend.push(item.typeId);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    // alert(data)
    console.log("tttttt", data)
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
    console.log(item);
  }
  addTypeDeSelect(item: any) {

    this.typeTosend.forEach((element, index) => {
      if (element == item.typeId) this.typeTosend.splice(index, 1);

    });

    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  addTypeDeSelectOrAll(item: any) {

    this.typeTosend = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  addTypeSelectOrAll() {

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
    this.typeTosend = this.typessArray;
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onProductSelect(item: any) {
    this.productID.push(item.productGroupId);
    console.log(item);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
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
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
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
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });

  }
  onProductSelectOrAll(item: any) {
    this.productID = this.prodArray;
    console.log("ProdData", this.ProdData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  addItemRefresh() {
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
    this.subCattyForm = this.fb.group({
      subcatty: [this.selectedItems]
    });
    this.typess = this.fb.group({
      typess: [this.selectedItems]
    });
    this.product = this.fb.group({
      product: [this.selectedItems]
    });
    this.identifier = this.fb.group({
      identifier: [this.selectedItems]
    });
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys = [];
    this.typeI = [];
    this.typeTosend = [];
    this.productID = [];
    this.productIDentifire = [];
    this.searchText = '';
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onproductIdentifierSelect(item: any) {
    this.productIDentifire.push(item.productCustomIdentifierId);
    console.log(item);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      product: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onproductIdentifierDeSelect(item: any) {
    this.productIDentifire.forEach((element, index) => {
      if (element == item.productCustomIdentifierId) this.productIDentifire.splice(index, 1);

    });
    console.log(' this.catergory', this.catergory)

    // this.userTypes.pop(item.roleId);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onproductIdentifierDeSelectOrAll(item: any) {
    this.productIDentifire = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onproductIdentifierSelectOrAll(item: any) {
    this.productIDentifire = this.productCustomIdentifierArray;
    // console.log("ProdData", this.ProdData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      Search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  onSearchChange($event: any, anything?: any) {
    const { target } = $event;
    this.searchText = target.value;
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.productIDentifire,
      search: this.searchText
    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

  }

  onTargetRowSelect(event) {
    const targetselectedRows = this.gridApi.getSelectedRows();
    console.log(targetselectedRows);
    return targetselectedRows;
  }
  addTargetitemsSelected() {
    this.targetselectedRows = this.gridApi.getSelectedRows();
    localStorage.setItem('targetselectedRows',JSON.stringify(this.targetselectedRows) )
    let targetData = this.targetselectedRows;
    targetData.forEach(element => {
      return this.targetItemsArray.push(element.stockItemId);

    })
    sessionStorage.setItem("stockItemId",JSON.stringify(this.targetItemsArray));
    console.log("TargetArray", this.targetItemsArray)
    let data = {
      Id: this.targetItemsArray
    }
    this.promotionTypes.addTargetGroup(data).subscribe((res) => {
      const responseTargetData = res.response;
      console.log("responseTargetData", responseTargetData);
    })
    localStorage.setItem('targetselectedRows', JSON.stringify(this.targetselectedRows))
    this.dialogRef.close();
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
  // onRowSelect(event) {
  //   const selectedRows = this.gridApi.getSelectedRows();
  //   console.log(selectedRows);
  // }
  // addproductitems() {
  //   const selectedRows = this.gridApi.getSelectedRows();
  //   console.log(selectedRows);
  //   this.dialogRef.close(selectedRows);
  // }
  addItemProductSubG() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('rowl', selectedRows);
    localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows))
  }
  closeicon() {
    // this.closeIcon
    localStorage.setItem('targetselectedRows',JSON.stringify(this.targetselectedRows) )
    this.dialogRef.close();
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.category = Object.assign({}, this.category, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.category = Object.assign({}, this.category, { limitSelection: 2 });
    } else {
      this.category = Object.assign({}, this.category, { limitSelection: null });
    }
  }

  toogleSubCategoryFilter() {
    this.subCategoryFilter = !this.subCategoryFilter;
    this.subCategorys = Object.assign({}, this.subCategorys, { allowSearchFilter: this.subCategoryFilter });
  }

  handleSubCategorySelection() {
    if (this.subCategorySelection) {
      this.subCategorys = Object.assign({}, this.subCategorys, { subCategorySelection: 2 });
    } else {
      this.subCategorys = Object.assign({}, this.subCategorys, { subCategorySelection: null });
    }
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
  toogleProductFilter() {
    this.productFilter = !this.productFilter;
    this.productGroups = Object.assign({}, this.productGroups, { allowSearchFilter: this.productFilter });
  }

  handleProductSelection() {
    if (this.productSelection) {
      this.productGroups = Object.assign({}, this.productGroups, { productSelection: 2 });
    } else {
      this.productGroups = Object.assign({}, this.productGroups, { productSelection: null });
    }
  }
  toogleTypeFilter() {
    this.typeFilter = !this.typeFilter;
    this.productType = Object.assign({}, this.productType, { allowSearchFilter: this.typeFilter });
  }

  handleTypeSelection() {
    if (this.subCategorySelection) {
      this.productType = Object.assign({}, this.productType, { subCategorySelection: 2 });
    } else {
      this.productType = Object.assign({}, this.productType, { subCategorySelection: null });
    }
  }

  displayTargetGroup() {
    const data = {
      category: this.catergory,
      subCategory: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier: this.statusTypes,
      search: this.searchText
      // isProduct:this.isproduct

    }
    this.targetList.getTargetListAll(data).subscribe((res) => {
      this.rowData5 = res.response;

    });
  }
}
