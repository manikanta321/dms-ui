import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CellClickedEvent, CellValueChangedEvent, ColDef, Color, FirstDataRenderedEvent, GridApi, GridReadyEvent, RowValueChangedEvent, SideBarDef } from 'ag-grid-community';
import { GuiColumn, GuiColumnMenu, GuiPaging, GuiPagingDisplay, GuiSearching, GuiSorting } from '@generic-ui/ngx-grid';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OrdersApisService } from 'src/app/services/orders-apis.service';

@Component({
  selector: 'app-add-sales-popup',
  templateUrl: './add-sales-popup.component.html',
  styleUrls: ['./add-sales-popup.component.css']
})
export class AddSalesPopupComponent implements OnInit {
  dealerInfo = true;
  orderitem = false;
  productInfo= true
  otherInfo = false;
  receipts = true;
  sales = true;
  dealerAdressToDisplay:any='';
  SelectedCoustmerId:any='';
  addSalesdropdown: any = []
  addsalesGeoDropDown: any = []
  productDetails:any=[]
  AddSales :any =[]
  productCustomIdentifier= true;
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/minimize-tag.png';
  disabled = false;
  dropdownSettings3: IDropdownSettings = {};
  toppingList3:  any= [];
  private gridApi!: GridApi;
  public rowData5=[];
  public popupParent: HTMLElement = document.body;
  instancePopup:any = null;
  paginationPageSize = 10;
  stayScrolledToEnd = true;
  paginationScrollCount:any;
  selectedCoustmerName:any='';
  showdealerName:boolean=false;
  visibleProcuct:boolean=false;
brandname:any;
productGroupName:any;
productsubgroupName:any;
productSKUName:any;
productLink:any;
productSelectedId:any;
productselectedName:any;

SalesObj:any=[{
  SalesDate:'',
  Quantity:'',
  CustomerSpecification :'',
}]
  columnDefs: ColDef[] = [
    // { headerName: "User Id",
    //   field: 'employeeCode' , sort: 'desc'},
  
    {   headerName: "Dealer",field: 'promotionName' ,      tooltipField:"promotionName",
  },
  
    {  headerName: "Quantity",field: 'promotionTypesName',      tooltipField:"promotionTypesName",
  },
  
    {  headerName: "Invoice No",
       field: '',      tooltipField:"",
      },
      {  headerName: "Order Confirmation No.",
      field: '',      tooltipField:"",
    }, 
  
  ];
  public defaultColDef: ColDef = {

    suppressSizeToFit: true,
    flex:1,
      minWidth: 100,
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
  columns: Array<GuiColumn> = [
		{
			header: 'Name',
			field: 'name' 			//source {name: 'T-shirt'}
		},
		{
			header: 'Type',
			field: 'type' 			//source {type: 'clothes'}
		},
		{
			header: 'Price',
			field: 'price'			//source {price: '15$'}
		}];

	source: Array<any> = [
		{
			name: 'T-shirt',		//columns {header: 'Name', field: 'name'}
			type: 'clothes',		//columns {header: 'Type', field: 'type'}
			price: '15$' 			//columns {header: 'Price', field: 'price'}
		},
		{
			name: 'Shoes',
			type: 'footwear',
			price: '100$'
		},
		{
			name: 'Ball cap',
			type: 'headgear',
			price: '50$'
		}];

    sorting: GuiSorting = {
	    enabled: true
	};

	paging: GuiPaging = {
		enabled: true,
		page: 1,
		pageSize: 10,
		pageSizes: [10, 25, 50],
		pagerTop: true,
		pagerBottom: true,
		display: GuiPagingDisplay.BASIC
	};

	searching: GuiSearching = {
		enabled: true,
		placeholder: 'Search heroes'
	};

  columnMenu: GuiColumnMenu = {
		enabled: true,
		sort: true,
		columnsManager: true,

  };
  selectedDealersID: any;
  slectedGeoId: any;
  CreatedById:any;
  userType: any;
  customerId: any;
  geographyId:any;
  GeoGrapydropdownListdata: any;
  dealersShippingAddress: any;
  dealersbillingAddress: any;
  dealerDisabled: boolean = false;
  clickNextRendererFunc(){
    alert('hlo');
  }
  constructor(
private salesService:SalesServicesService,
private dialogRef: MatDialogRef<AddSalesPopupComponent>,
private orders: OrdersApisService,
  ) { }

  ngOnInit(): void {
    this.userType =localStorage.getItem("userType");
    let loginid=localStorage.getItem("logInId");
    if(this.userType=='Dealer Admin'){
      this.orders.dealersDetails(loginid).subscribe((res)=>{
        console.log(res.response);
        this.customerId =res.response.dealerId;
        this.SelectedCoustmerId=res.response.dealerId;
       this.dealerInfo =  false;
       this.productInfo = false;
       this.sales= false;
      let obj:any={
        customerId: this.customerId

      }
        this.onItemSelectdealers(obj);
        this.dealerDisabled=true

      })
    }
    this.getDealersDropDown();
    this.CreatedById = localStorage.getItem("logInId");

  }


addsalesobj(i){
this.SalesObj.push(
  {
    SalesDate:'',
    Quantity:'',
    CustomerSpecification :'',
}
)
}

removeobj(i){
  console.log(this.SalesObj)

  this.SalesObj.forEach((element, index) => {
   this.SalesObj.splice(index, 1);
  });

  console.log(this.SalesObj)
}

  getDealersDropDown(){
    this.salesService.getdealersaleDropDown().subscribe((res)=>{
      console.log(res.response)
      this.addSalesdropdown=res.response;
    this.selectedDealersID =this.addSalesdropdown.customerId;

    })
  }

getdealersGeography(data){
  this.salesService.getdealerGeoDropDown(data).subscribe((res)=>{
    console.log(res.response)
    this.addsalesGeoDropDown=res.response;
  })
}

  expandDealerInfoDiv(){
    this.dealerInfo = !this.dealerInfo;
    if(this.dealerInfo === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandDealerInfoDiv1(){
    this.productInfo = !this.productInfo;
    if(this.productInfo === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
    }
  }
  expandDealerInfoDiv2(){
    this.productCustomIdentifier = !this.productCustomIdentifier;
    if(this.productCustomIdentifier === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandDealerInfoDiv3(){
    this.receipts = !this.receipts;
    if(this.receipts === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandDealerInfoDiv4(){
    this.sales = !this.sales;
    if(this.sales === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }
//   onTypeSelect(item: any) {
//     this.showdealerName=true;
//     console.log(item);
//     this.SelectedCoustmerId=item.customerId;
//     this.selectedCoustmerName=item.customerName;
//     this.dealerAdress(this.SelectedCoustmerId);

//     this.productDetails=[];
// this.productSelectedId='';
// this.productselectedName='';
// this.visibleProcuct=false;
// this.brandname='';
// this.productGroupName='';
// this.productsubgroupName='';
// this.productSKUName='';
// this.productLink='';

//     this.getdealersGeography(this.SelectedCoustmerId);
//     this.getProductDetalis();
//   }

  onGeoSelect(item:any){

    console.log(item)
    this.slectedGeoId =item.geographyId;
    this.productDetails=[];
    this.productSelectedId='';
    this.productselectedName='';
    this.visibleProcuct=false;
    this.brandname='';
    this.productGroupName='';
    this.productsubgroupName='';
    this.productSKUName='';
    this.productLink='';
    this.getProductDetalis();
      }
  onProductTypeSelect(item: any){

this.productSelectedId=item.stockItemId;
this.productselectedName=item.stockItemName;
this.visibleProcuct=true;


this.salesService.getProductInfo(this.productSelectedId).subscribe((res)=>{
  console.log(res.response)
  this.brandname=res.response.brandName;
  this.productGroupName=res.response.productGroupName;
  this.productsubgroupName=res.response.productsubgroupName;
  this.productSKUName=res.response.productSKUName;
  this.productLink=res.response.productLink;

})

  }
dealerAdress(id){
  this.salesService.getDealerAdress(id).subscribe((res)=>{
    console.log(res.response);
    this.dealerAdressToDisplay=res.response[0].address
  })

}


getProductDetalis(){
  let data={
    CustomerId:this.customerId,
    GeographyId:this.slectedGeoId,
  }
this.salesService.getDealerProduct(data).subscribe((res)=>{

  console.log(res.response)

this.productDetails=res.response

})
}


  
  onTypeAll(items: any) {
    console.log('onSelectAll', items);
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.paginationGoToPage(4);
  }
  onCellValueChanged(event: CellValueChangedEvent) {
    alert(event.value)
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
      });
      if (cellRendererInstances.length > 0) {
        const instance = cellRendererInstances[0];
        this.instancePopup = instance;
        instance.togglePopup();
      }
    }
  }



  saveSales(){

let mainobj={
  CustomerId:this.SelectedCoustmerId,
  GeographyId:this.slectedGeoId,
  Productid:this.productSelectedId,
  items:this.SalesObj,
  CreatedById:this.CreatedById,
}



this.salesService.AddSales(mainobj).subscribe((res)=>{
  console.log(res.response);

  if(res.response.result=='Succesfully sales added'){
    this.dialogRef.close();
  }

})

console.log(mainobj)

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
      this.paginationScrollCount = this.rowData5.length;
    }
  }
  expandOrderItemsDiv() {
    this.orderitem = !this.orderitem;

    if (this.orderitem === false) {
      this.image2 = 'assets/img/minimize-tag.png';
    } else {
      this.image2 = 'assets/img/maximize-arrow.png';
    }

  }
  onItemSelectdealers(item: any) {
    this.customerId = item.customerId;
    localStorage.setItem("dealerid", this.customerId);
    localStorage.removeItem("geographyId");
    this.geographyId = null;
    this.orders.GetGeoGrapydropdownList(this.customerId).subscribe((res) => {
      let GeoGrapydropdownList = res.response;
      console.log(GeoGrapydropdownList, "GeoGrapydropdownList")
      this.GeoGrapydropdownListdata = GeoGrapydropdownList.map((ele) => ele.geographyName); this.GeoGrapydropdownListdata = GeoGrapydropdownList.map((data: { geographyId: any; geographyName: any; }) => {
        return { geographyId: data.geographyId, geographyName: data.geographyName };
      });
      });
    // billing api
    this.orders.GetBillingAddress(this.customerId).subscribe((res: any) => {
      let BillingAddress = res.response;
      this.dealersbillingAddress = BillingAddress.map((ele) => ele.address);
    });
  }
}
