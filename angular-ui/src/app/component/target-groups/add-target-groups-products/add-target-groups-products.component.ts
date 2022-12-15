import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GridReadyEvent, GridApi, ColDef, GridOptions, CellValueChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-add-target-groups-products',
  templateUrl: './add-target-groups-products.component.html',
  styleUrls: ['./add-target-groups-products.component.css']
})
export class AddTargetGroupsProductsComponent implements OnInit {
  closeIcon :boolean = false;
  dropdownSettings: IDropdownSettings = {};
    dropdownSettings1: IDropdownSettings = {};
    dropdownSettings2: IDropdownSettings = {};
    dropdownSettings3: IDropdownSettings = {};
    dropdownSettings5: IDropdownSettings = {};
    dropdownSettings6: IDropdownSettings = {};
    catgname: any = [];
    statusTypes =[];
    catergory: any = [];
    itemId: any = [];
    sub_category: any = [];
    catagoryName: any;
    topping1: any = [];
    typeTosend:any[]=[]
    sub_categorys:any=[];
    productID: any = [];
    productIDentifire:any=[];
    searchText;
    public rowData5:any =[{productName:444,classification:"test",sku:"sku",productIdentifier:24, productGroup:"acd12", productCode:45}]
    allcatlist : any[] = [];
    typeI: any = [];
    disabled = false;
    myForm: any = FormGroup;
    selectedItems: any = [];
    subcatArray: any[] = [];
    allTypelist:any[]=[];
    typss: any;
    subcatagData: any = [];
    itemId1: any;
    types: any;
    type: any = FormGroup;
    Productarr: any = [];
    prodArray: any[] = [];
    products: any = FormGroup;
    toppingList: any = [];
    myForms: any = FormGroup;
    subCategory: any = FormGroup;
    productCustomIdentifierArray:any[]=[];
    public popupParent: HTMLElement = document.body;
    paginationPageSize = 10;
    stayScrolledToEnd = true;
    paginationScrollCount: any;
    selectedRows: any =[];
    
    private gridApi!: GridApi;
    columnDefs: ColDef[] = [

      {
        headerName: "Product Name",
        field: 'productName', type: ['nonEditableColumn'], pinned: 'left',checkboxSelection: true
      },
  
      { headerName: "Classification", field: 'classification', type: ['nonEditableColumn'] },
  
      { headerName: "SKU", field: 'sku', type: ['nonEditableColumn'], maxWidth:100 },
  
      {
        headerName: "Product Identifier",
        field: 'productIdentifier', type: ['nonEditableColumn']
      },
  
      {
        headerName: "Product Group",
        field: 'productGroup', type: ['nonEditableColumn'],maxWidth:170
      },
      {
        headerName: "Product Code",
        field: 'productCode', type: ['nonEditableColumn'],
      },
     
        
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


  constructor(  public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    public promotionTypes : PromotionService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
  }
  addItemSelect(item: any) {
    // this.selectedItem = item;
    this.catergory.push(item.catId);
    console.log("Catttyyyyy",this.catergory)
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
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
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

      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText

    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  addItemDeSelectOrAll(item: any) {
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys=[];
    this.typeTosend=[];
    this.typeI = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      product: this.productID,
      status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
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
    this.promotionTypes.GetSUbCAtsOfMultiCats(SubdataD).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("responseeee", subcaty);
      this.sub_category = subcaty.allOtherSubCAts;
    });
    console.log('this.catergory', this.catergory);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })

  }
  addSubCategorySelect(item: any) {
    console.log(" item Types", item);
    // this.sub_category =[];
    this.sub_categorys.push(item.subCatId);
    const datajson = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(datajson).subscribe((res) =>{
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  
    let data1 = {
      subCatId: this.sub_categorys
    }
    console.log("Typeess Catttyy",this.subcatArray)
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
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
      this.rowData5 = res.response;
    })
  }
  addSubCategoryDSelectOrAll(item: any) {
    this.sub_categorys=[];
    this.typeI=[]
    this.allTypelist=[]
  
    this.typeTosend=[]
    // this.sub_category=[];
    // this.type = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
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
      subCatId:  this.subcatArray,
    }
    // this.sub_category = this.subcatArray;
    console.log("Typeess Catttyy",this.subcatArray)
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
      Cat: this.catergory,
        Sub_Cat: this.sub_categorys,
        type: this.typeTosend,
        productgroup: this.productID,
        productidentifier:this.productIDentifire,
         status: this.statusTypes,
        Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }
  addTypeSelect(item: any) {
    // alert(this.typeI)
    this.typeTosend.push(item.typeId);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    // alert(data)
    console.log("tttttt",data)
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
      console.log("this TYpe",this.typeI)
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
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })

  }
  addTypeDeSelectOrAll(item:any){
    
    this.typeTosend=[];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }
  addTypeSelectOrAll(item:any){
    this.typeTosend =this.allTypelist;
    
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) =>{
      console.log('productlist is works', res);
      this.rowData5 = res.response;
    })
  }
  onProductSelect(item: any) {
    this.productID.push(item.productGroupId);
    console.log(item);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductGroupList(data).subscribe((res) => {
      // this.rowData5 = res.response;
      this.rowData5 = res.response;
      console.log('product lis', this.Productarr)
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
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onProductDeSelectOrAll(item: any) {
    this.productID = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });

  }
  onProductSelectOrAll(item: any) {
    this.productID = this.prodArray;
    // console.log("ProdData", this.ProdData);
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_categorys,
      type: this.typeTosend,
      productgroup: this.productID,
      productidentifier:this.productIDentifire,
       status: this.statusTypes,
      Search: this.searchText
    }
    this.promotionTypes.GetProductList(data).subscribe((res) => {
      this.rowData5 = res.response;
    });
  }
  addItemRefresh(){
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
    this.Productarr = this.fb.group({
      Productarr: [this.selectedItems]
    });
    this.catergory = [];
    this.sub_category = [];
    this.sub_categorys =[];
    this.typeI = [];
    // this.typesI = [];
    this.Productarr = [];
    this.toppingList = [];
    const data = {
      Cat: this.catergory,
      Sub_Cat: this.sub_category,
      type: this.typeI,
      Products: this.Productarr,
      city: this.toppingList,
      Search: this.searchText
    }
     }
     onproductIdentifierSelect(item: any) {
      this.productIDentifire.push(item.productCustomIdentifierId);
      console.log(item);
      const data = {
        Cat: this.catergory,
        Sub_Cat: this.sub_categorys,
        type: this.typeTosend,
        product: this.productID,
        productidentifier:this.productIDentifire,
        status: this.statusTypes,
        Search: this.searchText
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
        Cat: this.catergory,
        Sub_Cat: this.sub_categorys,
        type: this.typeTosend,
        productgroup: this.productID,
        productidentifier:this.productIDentifire,
        status: this.statusTypes,
        Search: this.searchText
      }
      this.promotionTypes.GetProductList(data).subscribe((res) => {
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
        productidentifier:this.productIDentifire,
        status: this.statusTypes,
        Search: this.searchText
      }
      this.promotionTypes.GetProductList(data).subscribe((res) => {
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
        productidentifier:this.productIDentifire,
         status: this.statusTypes,
        Search: this.searchText
      }
      this.promotionTypes.GetProductList(data).subscribe((res) => {
        this.rowData5 = res.response;
      });
    }
    onSearchChange($event: any, anything?: any){
      const { target } = $event;
      this.searchText = target.value;
      const data = {
        category : [],
        subCategory : [],
        type : [],
        productgroup : [],
        productidentifier :[],
        search : this.searchText
      }
      this.promotionTypes.GetProductList(data).subscribe((res) =>{
        console.log('search data', res);
        this.rowData5 = res.response;
        
      })
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
    onCellClicked(e): void {
      console.log('cellClicked', e);
       
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
    onRowSelect(event) {
      const selectedRows = this.gridApi.getSelectedRows();
      console.log(selectedRows);
    }
    addproductitems(){
      const selectedRows = this.gridApi.getSelectedRows();
      console.log(selectedRows);
      this.dialogRef.close(selectedRows);
    }
    addItemProductSubG(){
      const selectedRows = this.gridApi.getSelectedRows();
      console.log('rowl',selectedRows);
      localStorage.setItem('selectedRows',JSON.stringify(this.selectedRows) )
    }
  closeicon(){
    // this.closeIcon
    this.dialogRef.close();
  }
}
