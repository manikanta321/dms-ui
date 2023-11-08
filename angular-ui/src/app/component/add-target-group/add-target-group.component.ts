import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTargetGroupsProductsComponent } from '../target-groups/add-target-groups-products/add-target-groups-products.component';
import { TargetListService } from 'src/app/services/target-list.service';
import { AddTargetGroupSuccessPopupComponent } from '../add-target-group-success-popup/add-target-group-success-popup.component';
import { TargetGroupService } from 'src/app/services/target-group.service';


@Component({
  selector: 'app-add-target-group',
  templateUrl: './add-target-group.component.html',
  styleUrls: ['./add-target-group.component.css']
})
export class AddTargetGroupComponent implements OnInit {
  instancePopup:any = null;
  stayScrolledToEnd = true;
  paginationPageSize = 10;
  rowData5:any= [];
  paginationScrollCount: any;
  public popupParent: HTMLElement = document.body;
  private gridApi!: GridApi;
  targetCode: any;
  targetGroupName:any ='';
  CreatedById:any;
  CreatedByIdValue:any;
  stockItemId:any =[];
  createTargetData:any= [];
  addTargetGrp:any;
  viewTargetGrp:any;
  editTargetGrp:any;
  targetGrpId:any;
  TargetGrpData:any =[];
  editTargetCode:any;
  selectedProducts:any = [];
  targetGrpName:any;
  selectedProductCount:any;
  selectedProductCounts:any;
  targetItemsArray:any = [];
  editStockItemId:any =[];
  constructor(public dialog: MatDialog,
    private targetList: TargetListService,
    private dialogRef: MatDialogRef<any>,
    private targetGroupService:TargetGroupService
    ) { }

  ngOnInit(): void {
    this.targetGrpId = sessionStorage.getItem("targetGrpId");
   console.log("SessionData",this.targetGrpId);
    this.addTargetGrp  = sessionStorage.getItem("AddTarget");
    this.viewTargetGrp = sessionStorage.getItem("viewTarget");
    this.editTargetGrp = sessionStorage.getItem("EditTarget");
    this.getTargetCodeG();
    this.CreatedById = localStorage.getItem("logInId");
    this.CreatedByIdValue = Number(this.CreatedById);
    this.editTargetData();
    if(this.addTargetGrp!= '') {
      // alert("Helloo");
      this.targetItemsArray = [];
    }
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
    
  }
  selectedDateRange = {
    startDate: '11/11/2022',
    endDate: '11/15/2022',
  }

  customDatePickerEvent(eventChange){
    this.selectedDateRange = eventChange.selectedDate;
    console.log(this.selectedDateRange);
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  onCellValueChanged(event: CellValueChangedEvent) {
    // alert(event.value)
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  openDialog(){

  }
  onCellClicked( e): void {
    let cellCLickedpromotion = '1'
    localStorage.setItem('cellCLickedpromotion', cellCLickedpromotion)
    if ( e.event.target.dataset.action == 'toggle' && e.column.getColId() == 'action' ) {
      const cellRendererInstances = e.api.getCellRendererInstances({
        rowNodes: [e.node],
        columns: [e.column],
        checkbox: true
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        this.instancePopup = instance;
        instance.togglePopup();
      }
    }
}
editProducts() {
  sessionStorage.setItem("addTProducts","");
  if(this.targetItemsArray.length == 0) {
    this.editStockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]')
    console.log("Target",this.targetItemsArray.length)
  } 
  else {
    const stockId =  sessionStorage.getItem("stockItemId");
    if(stockId == "[]"){
      this.editStockItemId = JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]').concat(this.targetItemsArray?this.targetItemsArray:'[]');
      console.log("this.editStockItemId",this.editStockItemId.length)
      console.log("this.selectedProductCount",this.selectedProductCount)
    }
    else {
    this.editStockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]');

    }
    // this.editStockItemId =(this.targetItemsArray?this.targetItemsArray:'[]').concat(JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]'));
    // this.editStockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]');
    console.log("stockItemId",sessionStorage.getItem("stockItemId"));
    console.log("targetItemsArray",this.targetItemsArray)
  // this.editStockItemId = JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]').concat(this.targetItemsArray?this.targetItemsArray:'[]');

    // this.editStockItemId =(this.targetItemsArray?this.targetItemsArray:'[]')
    // alert("Helloo");
    console.log("Target",this.editStockItemId)
  }
  // this.editStockItemId = JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]').concat(this.targetItemsArray?this.targetItemsArray:'[]');
    sessionStorage.setItem("addTProducts","");
const dialogRef =  this.dialog.open(AddTargetGroupsProductsComponent,{data: this.editStockItemId }) 
console.log("SelectedID1",this.editStockItemId)
  dialogRef.afterClosed().subscribe((res) => {

    this.editStockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]');
    console.log("SelectedID2",this.editStockItemId)
    this.rowData5 = JSON.parse(localStorage.getItem("targetselectedRows") ?? '[]');
      // this.stockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]');
      this.editStockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]');
      this.selectedProductCount = this.editStockItemId.length+" "+ " products selected";
      console.log("SelectedID3",this.editStockItemId)
      this.selectedProducts = this.rowData5;
    console.log("RowData5",this.rowData5);
    })
} 
  addTProducts() {
    if(this.addTargetGrp != '')
    {
      this.targetItemsArray= [];
    }
    sessionStorage.setItem("addTProducts","addTProducts");
    
    localStorage.setItem("targetselectedRows","")
    if(this.targetItemsArray.length == 0) {
      this.editStockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]')
      // alert("Helloo");
      console.log("Target",this.targetItemsArray.length)
    } 
    else {
      this.editStockItemId =(this.targetItemsArray?this.targetItemsArray:'[]');

      // alert("Helloo1");
      console.log("Target",this.targetItemsArray.length)
    }
    // this.editStockItemId = JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]').concat(this.targetItemsArray?this.targetItemsArray:'[]');
  const dialogRef =  this.dialog.open(AddTargetGroupsProductsComponent,{data: this.editStockItemId }) 
  console.log("SelectedID1",this.editStockItemId)
    dialogRef.afterClosed().subscribe((res) => {
      console.log("SelectedID2",this.editStockItemId)
    // sessionStorage.setItem('AddtargetselectedRows', JSON.stringify(this.targetselectedRows))

      this.rowData5 = JSON.parse( sessionStorage.getItem('AddtargetselectedRows') ?? '[]');
        this.stockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]');
        this.editStockItemId =JSON.parse(sessionStorage.getItem("stockItemId") ?? '[]');
        console.log("SelectedID3",this.editStockItemId)
        this.selectedProducts = this.rowData5;
        sessionStorage.setItem("SelectedProducts",this.selectedProducts)
       this.selectedProductCounts = this.rowData5.length +" "+ "Products selected"
      console.log("RowData5",this.rowData5);
      })
  } 
  targetName(event:any){
this.targetGroupName = event.target.value;
console.log("targetgrpName",this.targetGroupName);
  }
  handleScroll(event) {
    if(this.instancePopup && this.instancePopup.isOpen){
      this.instancePopup.togglePopup();
      this.instancePopup = null;
    }
    
    const grid = document.getElementById('gridContainer');
    if (grid) {
      const gridBody = grid.querySelector('.ag-body-viewport') as any;
      const scrollPos = gridBody.offsetHeight + event.top;
      const scrollDiff = gridBody.scrollHeight - scrollPos;
      //const api =  this.rowData5;
      this.stayScrolledToEnd = (scrollDiff <= this.paginationPageSize);
      if(this.editStockItemId.length == 0) {
        this.paginationScrollCount = this.selectedProducts.length;
      }
      else {
        this.paginationScrollCount = this.editStockItemId.length;
      }
    }
  }
  columnDefs: ColDef[] = [
    // { headerName:"",checkboxSelection:true , maxWidth:40, },
   
    {   headerName: "Product Name",field: 'productName' ,cellStyle: { color: '#686E74' },      tooltipField:"productName",type: ['nonEditableColumn']
  },
  
    {  headerName: "Classification",field: 'classification', cellStyle: { color: '#686E74' },     tooltipField:"classification   ",type: ['nonEditableColumn']
  },     
  
    {  headerName: "SKU",
       field: 'sku', maxWidth:160, cellStyle: { color: '#686E74' },    tooltipField:"sku",type: ['nonEditableColumn']
      },
  
    {   headerName: "Product Identifier",
      field: 'productIdentifier', cellStyle: { color: '#686E74' },     tooltipField:"productIdentifier",
      type: ['nonEditableColumn']},

      {   headerName: "Product group",
      field: 'productGroup',cellStyle: { color: '#686E74' },      tooltipField:"productGroup",
      type: ['nonEditableColumn']},
  ];
  public defaultColDef: ColDef = {

    suppressSizeToFit: true,
    // set the default column width
    // make every column editable
    // editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    // make columns resizable
    flex:1,
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

  getTargetCodeG(){
    this.targetList.getTargetCode().subscribe((res) => {
      this.targetCode = res.response;
      console.log("code target",this.targetCode);
      })
  }
  createTarget() {
    let data = {
      TargetGroupName: this.targetGroupName,
      TargetGroupCode: this.targetCode,
      CreatedById: this.CreatedByIdValue,
      StockItemId: this.stockItemId,
    }
    this.targetList.createTargetGroup(data).subscribe((res) => {
      this.createTargetData = res.response;
      console.log("code target",this.createTargetData);
      // this.dialog.closeAll()
      if(this.createTargetData.result == 'Added Succesfully') {
        sessionStorage.setItem("AddTargetGrp","TargetAdded");
        sessionStorage.setItem("EditTargetGrp","");
        this.dialog.open(AddTargetGroupSuccessPopupComponent, {panelClass: 'activeSuccessPop'});
        console.log("code target",this.createTargetData);
        this.targetGroupService.filter('Register click');
        this.dialogRef.close();
      }
      else {
        // alert(this.createTargetData.result)
      }
      })
  }
  // editTarget() {
  //   sessionStorage.setItem("stockItemId","[]")
  //   let data = {
  //     TargetGroupName: this.targetGroupName?this.targetGroupName:this.targetGrpName,
  //     TargetGroupCode: this.editTargetCode,
  //     CreatedById: this.CreatedByIdValue,
  //     StockItemId: this.editStockItemId,
  //     TargetGroupId: this.targetGrpId,
  //   }
  //   this.targetList.createTargetGroup(data).subscribe((res:any) => {
  //     this.createTargetData = res.response;
  //     console.log("response",this.createTargetData);
  //     console.log("response Result",res.response.result);
  //     if(this.createTargetData.result == 'Updated Succesfully') {
  //       sessionStorage.setItem("AddTargetGrp","");
  //       sessionStorage.setItem("EditTargetGrp","EditedTarget")
  //       this.dialog.open(AddTargetGroupSuccessPopupComponent, {panelClass: 'activeSuccessPop'});
  //       console.log("code target",this.createTargetData);
  //       this.dialogRef.close();
  //     }
  //     else {
  //       alert(res.response.result);
  //     }
  //     })
  // }
  editTarget() {
    // sessionStorage.setItem("stockItemId","[]")
    let data = {
      TargetGroupName: this.targetGroupName?this.targetGroupName:this.targetGrpName,
      TargetGroupCode: this.editTargetCode,
      CreatedById: this.CreatedByIdValue,
      StockItemId: this.editStockItemId,
      TargetGroupId: this.targetGrpId,
    }
    this.targetList.createTargetGroup(data).subscribe((res:any) => {
      this.createTargetData = res.response;
      console.log("response",this.createTargetData);
      console.log("response Result",res.response.result);
      if(this.createTargetData.result == 'Updated Succesfully') {
        sessionStorage.setItem("AddTargetGrp","");
        sessionStorage.setItem("EditTargetGrp","EditedTarget")
        this.dialog.open(AddTargetGroupSuccessPopupComponent, {panelClass: 'activeSuccessPop'});
        console.log("code target",this.createTargetData);
        this.dialogRef.close();
      }
      else {
        // alert(res.response.result);
      }
      })
  }
  closeDialog() {
    this.dialogRef.close(); 
  }
  editTargetData() {
    // this.rowData5 = []
    sessionStorage.setItem("stockItemId","[]")
    let data = {
      TargetGroupId: this.targetGrpId,
      CurrentUserId: this.CreatedByIdValue
    }
    // sessionStorage.setItem("stockItemId","[]");
    this.targetList.editTargetGroup(data).subscribe((res) => {
      this.TargetGrpData = res.response;
      this.editTargetCode = this.TargetGrpData.targetGroupCode;
      this.targetGrpName =this.TargetGrpData.targetGroupName;
        this.selectedProducts = this.TargetGrpData.selectedproducts.concat(this.rowData5);
      console.log("Selected Rows", this.selectedProducts);
      let targetData = this.selectedProducts;
      targetData.forEach(element => {
        return this.targetItemsArray.push(element.stockItemId);
  
      })
      this.selectedProductCount = this.selectedProducts.length + " products selected";
      console.log("Edit target",this.TargetGrpData);
      })
  }
}
