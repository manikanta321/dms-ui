import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MaterialListService } from 'src/app/services/material-list.service';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { AddorderpromotionsComponent } from '../addorderpromotions/addorderpromotions.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-nonpromotionlist',
  templateUrl: './order-nonpromotionlist.component.html',
  styleUrls: ['./order-nonpromotionlist.component.css']
})
export class OrderNonpromotionlistComponent implements OnInit {
  buyGroup : any = [{proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'},
  {proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'},
  {proItem: 'Lays IPL edition classic magic masala..', sku:'KA123458AB98764',price:'20' , taxtemplete:['hj','hj'], amount:'0'}]
  private gridApi!: GridApi;
  promoList = true;
  myForms!:FormGroup;
  categoryForm: any = FormGroup;
  subcategoryForm: any = FormGroup;
  myFormsIdentifier:any = FormGroup;
  dropdownSettings1: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  dropdownSettings4: IDropdownSettings = {};
  category : any = ['cat1','cat2'];
  subCategory : any =['subcat'];
  type : any =['type1'];
  identifier : any =['identifier'];
  rowData: any;
  columnDefs:any;
  image = 'assets/img/maximize-arrow.png';
  flag:boolean=true;
  countCatagory:any;
  catagoryData:any;
  toppings: any = [];
  categoryMapData:any =[];
  categoryArray:any= [];
  catergory: any = [];
  sub_category: any = [];
  topping1: any = [];
  topping2: any = [];
  selectedItems: any = [];
  subcatagData:any=[];
  subcatArray:any=[];
  ShowFilter = false;
  disabled = false;
  subCategoryFilter = false;
  sub_categorys: any = [];
  typeI:any =[];
  typesData:any=[];
  typesMapData:any=[];
  typesArray:any=[];
  typeFilter = false;
  materialIdentifier:any = [];
  materialIdentifierData:any=[];
  materialIdentifierMapData:any=[];
  materialIdentifierArray:any=[];
  gridOptions = {
    resizable: true,
    onCellClicked: (event: CellClickedEvent) => console.log('Cell was clicked'),
    rowStyle: { background: 'black' },
}


  constructor( private user: UserService,
    private http: HttpClient,
    private materialList: MaterialListService,
    private addMaterials: AddMaterialsService,
    private fb: FormBuilder,private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.getclassification();
    this.selectMaterialIdentifier();
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
      idField: 'materilCustomIdentifierId',
      textField: 'materialCustomName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.typeFilter
    };
    this.categoryForm = this.fb.group({
      categoryy: [this.selectedItems]
    });
    this.subcategoryForm = this.fb.group({
      subCategory: [this.selectedItems]
    });
    this.type = this.fb.group({
      type: [this.selectedItems]
    });
    this.myFormsIdentifier = this.fb.group({
      identifiers: [this.selectedItems]
    });
  }

  orderPromoList(){
    this.promoList = !this.promoList;

    if(this.promoList === false){
      this.image = 'assets/img/minimize-tag.png';
    } else {
      this.image = 'assets/img/maximize-arrow.png';
    }

  }


  public rowData5 = [
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    {productname:'Republic',sku:'Argentina Republic',price:'100',tax:'10%',quantity:"1",amount:"1000"},
    ];
 
    public defaultColDef: ColDef = {
      // set the default column width
      width: 170,
      // make every column editable
      editable: true,
      // make every column use 'text' filter by default
      filter: 'agTextColumnFilter',
      // enable floating filters by default
      // make columns resizable
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
    // displayedColumns: string[] = ['shippingForm', 'shippingTo', 'shippingCharges'];

    headerList(){
      this.columnDefs= [
        {
          headerName: 'Product Name',field: 'productname', type: ['nonEditableColumn'], sort: 'desc', pinned: 'left',
        },
    
        { headerName: 'SKU', field: 'sku', type: ['nonEditableColumn'] },

        { headerName: 'Price', field: 'price', type: ['nonEditableColumn'] },

        { headerName: 'tax template', field: 'tax', type: ['nonEditableColumn'] },

        { headerName: 'Quantity', field: 'quantity', type: ['nonEditableColumn'] },
        
        { headerName: 'Amount', field: 'amount', type: ['nonEditableColumn'] },
       
      ];
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

    onGridReady(params: GridReadyEvent) {
      this.gridApi = params.api;
  
    }

    onCellClicked( e: CellClickedEvent): void {
      console.log('cellClicked', e);
    }

    onSearchChange($event){

    }

    onStatusDeSelect(item: any) {
    }

    onItemDeSelectOrAllStatus(item: any) {
      const data = {
        userTypes: "",
        statuss: [],
        search: "",
  
      }
      this.user.getuserDeatilsUser(data).subscribe((res) => {
        this.rowData5 = res.response;
      });
  
    }

    onItemSelectOrAllStatus(item: any) {
    
      const data = {
        userTypes: "",
        statuss: "",
        search: "",
  
      }
      this.user.getuserDeatilsUser(data).subscribe((res) => {
        this.rowData5 = res.response;
      });
     
    }
    addnonPromoItems(){
      console.log(this.buyGroup)
    }
    getclassification() {

      this.materialList.getclassification(this.flag).subscribe((res) => {
        let data = res.response;
        this.countCatagory = res.totalRecords;
        this.catagoryData = data.allOtherCats;
        let dataCat = data.allOtherCats;
        this.toppings = new FormControl(this.catagoryData);
        console.log("countCategory", this.countCatagory);
        console.log("catagoryData", this.catagoryData);
        this.categoryMapData = dataCat.map((data: { catId: any; catName: any; }) => {
          return { catId: data.catId, roleName: data.catName };
        });
  
        if (!this.categoryMapData?.length) {
          this.categoryMapData = dataCat.map((product: { designationName: any; }) => {
            return product.designationName;
          });
        }
        this.categoryMapData.push()
        this.categoryMapData.forEach(element => {
          return this.categoryArray.push(element.catId);
  
        })
      })
      this.dropdownSettings1 = {
        singleSelection: false,
        idField: 'catId',
        textField: 'catName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: this.ShowFilter
      };
    }
    onItemSelect(item: any) {
      // this.selectedItem = item;
      this.catergory.push(item.catId);
      console.log("Catttyyyyy", this.catergory)
      console.log('item Subcatty', item)
  
      // this.itemId = item.catId;
      // this.catagoryName = item.catName;
      let Subdata = {
        catId: this.catergory,
        flag:this.flag
      }
      this.materialList.onclickcat(Subdata).subscribe((res) => {
        let subcaty = res.response;
        console.log("response1", res)
        console.log("responseeee", subcaty);
        this.sub_category = subcaty.allOtherSubCAts;
        console.log("SubCategory", this.sub_category);
        this.topping1 = new FormControl(this.sub_category);
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
      this.subcategoryForm = this.fb.group({
        subCategory: [this.selectedItems]
      });
      this.type = this.fb.group({
        type: [this.selectedItems]
      });
    }
    onItemSelectOrAll(item: any) {
      this.catergory = this.categoryArray;
      let Subdataall = {
        catId: this.catergory
      }
      console.log("Category Array", this.catergory)
      // this.itemId = item.catId;
      // this.catagoryName = item.catName;
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
    }
    onItemDeSelectOrAll(item: any) {
      this.subcategoryForm = this.fb.group({
        subCategory: [this.selectedItems]
      });
      this.type = this.fb.group({
        type: [this.selectedItems]
      });
      this.catergory = [];
      this.sub_category = [];
      this.sub_categorys = [];
      this.typeI = [];

    }
    onSubCategorySelect(item: any) {
      console.log(" item Types", item);
      this.sub_categorys.push(item.subCatId);
      let Type = {
        subCatId: this.sub_categorys,
        flag:this.flag
      }
      this.materialList.onclicksubcat(Type).subscribe((res) => {
        let typs = res.response;
        console.log("types..res", typs);
        this.typeI = typs;
        this.topping2 = new FormControl(this.typeI);
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
        this.topping2 = new FormControl(this.typeI);
      });
      console.log(' this.typeI', this.typeI)
      this.type = this.fb.group({
        type: [this.selectedItems]
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
        this.topping2 = new FormControl(this.typeI);
      });
    }
    onSubCategoryDSelectOrAll(item: any) {
      this.sub_categorys = [];
      this.typeI = []
      this.type = this.fb.group({
        type: [this.selectedItems]
      });
    }
    onTypeSelect(item: any) {
      this.typesData.push(item.typeId);
    }
    onTypeDeSelect(item: any) {
  
      this.typesData.forEach((element, index) => {
        if (element == item.typeId) this.typesData.splice(index, 1);
  
      });
  
    }
    onTypeSelectOrAll() {
  
      this.typesMapData = this.typeI.map((data: { typeId: any; typeName: any; }) => {
        return { typeId: data.typeId, typeName: data.typeName };
      });
  
      if (!this.typesMapData?.length) {
        this.typesMapData = this.typeI.map((type: { designationName: any; }) => {
          return type.designationName;
        });
      }
      this.typesMapData.push()
      this.typesMapData.forEach(element => {
        return this.typesArray.push(element.typeId);
  
      })
      this.typesData = this.typesArray;
    }
    OnTypeDeselectOrAll() {
      this.typesData = [];
    }
    selectMaterialIdentifier() {
      this.addMaterials.getMaterialIdentifier().subscribe((res) => {
        this.materialIdentifier = res.response;
        console.log("materialIdentifier", this.materialIdentifier)
      })
      // }
  
    }
    onMaterialIdentifierSelect(item: any) {
      this.materialIdentifierData.push(item.materilCustomIdentifierId);
      console.log("materialIdentifier",this.materialIdentifierData);
    }
    onMaterialIdentifierDeSelect(item: any) {
  
      this.materialIdentifierData.forEach((element, index) => {
        if (element == item.materilCustomIdentifierId) this.materialIdentifierData.splice(index, 1);
  
      });
      console.log("materialIdentifier",this.materialIdentifierData);
    }
    onMaterialIdentifierSelectOrAll() {
  
      this.materialIdentifierMapData = this.materialIdentifier.map((data: { materilCustomIdentifierId: any; materialIdentifierName: any; }) => {
        return { materilCustomIdentifierId: data.materilCustomIdentifierId, materialIdentifierName: data.materialIdentifierName };
      });
  
      if (!this.materialIdentifierMapData?.length) {
        this.materialIdentifierMapData = this.materialIdentifier.map((type: { designationName: any; }) => {
          return type.designationName;
        });
      }
      this.materialIdentifierMapData.push()
      this.materialIdentifierMapData.forEach(element => {
        return this.materialIdentifierArray.push(element.materilCustomIdentifierId);
  
      })
      this.materialIdentifierData = this.materialIdentifierArray;
      console.log("materialIdentifier",this.materialIdentifierData);
    }
    onMaterialIdentifierDeSelectOrAll() {
      this.materialIdentifierData = [];
      console.log("materialIdentifier",this.materialIdentifierData);
    }
    refresh() {
      this.categoryForm = this.fb.group({
        categoryy: [this.selectedItems]
      });
      this.subcategoryForm = this.fb.group({
        subCategory: [this.selectedItems]
      });
      this.type = this.fb.group({
        type: [this.selectedItems]
      });
      this.myFormsIdentifier = this.fb.group({
        identifiers: [this.selectedItems]
      });
      this.catergory = [];
      this.sub_categorys = [];
      this.typesData = [];
      this.materialIdentifierData = [];
    }

    closePopup() {
    //   this.dialog.open(AddorderpromotionsComponent, {
    //     // width: '100vw',
    //     width: '900px',
    //     height:'663px',
    //     panelClass: 'material-add-edit'
    // });
    this.dialogRef.close();
  
    }
}
