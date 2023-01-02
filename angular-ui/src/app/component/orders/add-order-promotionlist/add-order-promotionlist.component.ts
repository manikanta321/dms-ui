import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersApisService } from 'src/app/services/orders-apis.service';

@Component({
  selector: 'app-add-order-promotionlist',
  templateUrl: './add-order-promotionlist.component.html',
  styleUrls: ['./add-order-promotionlist.component.css']
})
export class AddOrderPromotionlistComponent implements OnInit {
  // taxtemplete :any =['hj','hj'];
  buyGroup: any = [{ proItem: 'Lays IPL edition classic magic masala..', sku: 'KA123458AB98764', price: '20', taxtemplete: ['hj', 'hj'], amount: '0' },
  { proItem: 'Lays IPL edition classic magic masala..', sku: 'KA123458AB98764', price: '20', taxtemplete: ['hj', 'hj'], amount: '0' },
  { proItem: 'Lays IPL edition classic magic masala..', sku: 'KA123458AB98764', price: '20', taxtemplete: ['hj', 'hj'], amount: '0' }]
  private gridApi!: GridApi;
  promoList = true;
  priceD = true;
  buysets = true;
  rowData: any;
  columnDefs: any;
  griddatapromotions: any = []
  actineLabel: any;
  updateOrSave: boolean = false
  editData: boolean = false;
  image = 'assets/img/maximize-arrow.png';

  buygg: any;
  selectedrowList: any = [];
  ischecked: boolean = false;

  geographyId: any;
  dealerid: any;
  arrayOfImages: any = [];
  imagesapis: any = [];
  imagesid: any = [];
  taxdropdowndata: any = [];
  quantityadd: any = 0;
  price: any = 0;
  griddata: any = [];

  constructor(private user: UserService,
    private orders: OrdersApisService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<any>,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.buygg = localStorage.getItem('buygroupromo');
    this.taxdropdown();

    let editV = localStorage.getItem('Edit');

    if (editV == 'Edit') {
      this.actineLabel = "Edit order";
      this.updateOrSave = !this.updateOrSave;
    }
    else {
      this.actineLabel = "Add order";
      this.editData = false;
      // this.updateOrSave= this.updateOrSave;
      // this.editorderbyID = {};
    }


    this.geographyId = localStorage.getItem("geographyId");
    console.log(this.geographyId, "this.geographyId")
    this.dealerid = localStorage.getItem("dealerid");
    console.log(this.dealerid, "this.this.dealerid")
    this.getPromotionsImages();
  }


  buysetsGroups(item) {
    // this.buysets = !this.buysets;
    let selectedGrp = this.griddatapromotions.find(x => x.productPromotionsId == item.productPromotionsId);
    selectedGrp.isShowPromos = !selectedGrp.isShowPromos;
  }

  taxdropdown() {
    this.orders.taxtemplatedropdown().subscribe((res) => {
      this.taxdropdowndata = res.response;
      console.log(this.taxdropdowndata, "tax data")

    });
  }

  onSearchChange($event) {

  }


  // promotion 

  getPromotionsImages() {
    let data = {
      "Dealerid": this.dealerid,
      "GeographyIdid": this.geographyId
    }
    console.log(data, "dealer and ge data");
    this.orders.orderpromotionimages(data).subscribe((res: any) => {
      this.imagesapis = res.response
      console.log(this.imagesapis, "imagesres");
      this.imagesapis.forEach(item => {

        let obj = {

          "productPromotionsId": item.productPromotionsId,
          "promotionTypesId": item.promotionTypesId,
          "promotionName": item.promotionName,
          "imageurl": item.imageurl

        }
        this.arrayOfImages.push(obj);
        console.log(this.arrayOfImages, "arrayofimagesg");
      });
    });
  }


  getpromotionlistById(e, item) {
    // console.log(e, item);
    this.imagesid.push(item.productPromotionsId);
    this.imagesid = this.imagesid.filter((v, i) => this.imagesid.indexOf(v) === this.imagesid.lastIndexOf(v));


    let data = {
      "ProductPromotionId": this.imagesid,
      "Dealerid": this.dealerid,
      "GeographyIdid": this.geographyId
    }

    // this.spinner.show();
    console.log(this.imagesid, "listdatapromotionsids")
    this.orders.GetProductsOfPromotionForOrder(data).subscribe((res: any) => {
      this.griddatapromotions = res.response;

      this.griddatapromotions.map(item => {
        item.isShowPromos = false;
        item.isProductSelected = false;
        return item;
      });
      this.orderPromotionFormatter();
      // this.griddata = this.orderNonPromotionFormatter(this.griddatapromotions);
      // this.griddatapromotions.sort((a, b) => b.isProductSelected - a.isProductSelected);
      this.spinner.hide();
      console.log(this.griddatapromotions, "griddata");
    });
  }

  appendStockItemFields(stockItem){
    let formatObj:any = {};
    formatObj.stockItemId = stockItem.stockItemId;
    formatObj.stockItemName = stockItem.stockItemName;
    formatObj.productSKUName = stockItem.productSKUName;
    formatObj.mrp = stockItem.mrp;

    formatObj.isProductSelected = stockItem.isProductSelected == undefined ? false : stockItem.isProductSelected;    
    formatObj.Quantity = stockItem.quantity == undefined ? null : stockItem.quantity;
    formatObj.Taxid = stockItem.taxid == undefined ? null : stockItem.taxid;

    return formatObj;
  }

  orderPromotionFormatter() {


    this.griddatapromotions.forEach(item => {
      switch (item.promotionTypesId) {
        case 1:
        
          if(item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0){
    
            item.promoDetails.buyGroups.forEach(stockItem=>{
              if(stockItem.stockItemId.length !=0){
                stockItem.stockItemId = stockItem.stockItemId.map(stock=>{
                  stock = this.appendStockItemFields(stock);
                  return stock
                })
              }
  
            });
            item.promoDetails.buyGroups.totalQuantity = 0;
            item.promoDetails.buyGroups.totalAmount = 0;
          }

          // getgroups
          if(item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0){
    
            item.promoDetails.getGroups.forEach(stockItem=>{
              if(stockItem.stockItemId.length !=0){
                stockItem.stockItemId = stockItem.stockItemId.map(stock=>{
                  stock = this.appendStockItemFields(stock);
                  return stock
                })
              }
  
            });
            item.promoDetails.getGroups.totalQuantity = 0;
            item.promoDetails.getGroups.totalAmount = 0;
          }




      
          break;

        case 2:

          break;

        case 3:
          if(item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0){
            item.promoDetails.stockItems = item.promoDetails.stockItems.map(stockItem=>{
              stockItem = this.appendStockItemFields(stockItem);
              return stockItem
            });
            item.promoDetails.totalQuantity = 0;
            item.promoDetails.totalAmount = 0;
          }
          break;

        case 4:
          if(item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0){
            item.promoDetails.stockItems = item.promoDetails.stockItems.map(stockItem=>{
              stockItem = this.appendStockItemFields(stockItem);
              return stockItem
            });
            item.promoDetails.totalQuantity = 0;
            item.promoDetails.totalAmount = 0;
          }
          break;

        default:
          break;
      }

    });

  }


  quantityChange(data) {

    this.PromotionQtyCalculation(data);
  }

  PromotionQtyCalculation(item){
    switch (item.promotionTypesId) {
      case 1:
        
        // buygroups
        if(item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0){
          item.promoDetails.buyGroups.totalQuantity = 0;
          item.promoDetails.buyGroups.totalAmount = 0;
          item.promoDetails.buyGroups.forEach(stockItem=>{
            if(stockItem.stockItemId.length !=0){
              stockItem.stockItemId.forEach(stock=>{
                if(stock.isProductSelected){
                 item.promoDetails.buyGroups.totalQuantity+= stock.Quantity;
                 item.promoDetails.buyGroups.totalAmount += (stock.mrp * stock.Quantity);
                }
              })
            }

          });
        }
        // getgroups
        if(item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0){
          item.promoDetails.getGroups.totalQuantity = 0;
          item.promoDetails.getGroups.totalAmount = 0;
          item.promoDetails.getGroups.forEach(stockItem=>{
            if(stockItem.stockItemId.length !=0){
              stockItem.stockItemId.forEach(stock=>{
                if(stock.isProductSelected){
                 item.promoDetails.getGroups.totalQuantity+= stock.Quantity;
                 item.promoDetails.getGroups.totalAmount += (stock.mrp * stock.Quantity);
                }
              })
            }

          });
        }
        break;

      case 2:

        break;

      case 3:
        if(item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0){
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.stockItems.forEach(stockItem=>{
            if(stockItem.isProductSelected){
              item.promoDetails.totalQuantity += stockItem.Quantity;
              item.promoDetails.totalAmount += (stockItem.mrp * stockItem.Quantity);
            }
          });
        }
        break;

      case 4:
        if(item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0){
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.stockItems.forEach(stockItem=>{
            if(stockItem.isProductSelected){
              item.promoDetails.totalQuantity += stockItem.Quantity;
              item.promoDetails.totalAmount += (stockItem.mrp * stockItem.Quantity);
            }
          });
        }
        break;

      default:
        break;
    }
  }
  checkboxChange(event, changedPromotionObj, promotionItem) {
    console.log(event, changedPromotionObj, "event, changedPromotionObj");
    changedPromotionObj.isProductSelected = event.target.checked;

    this.quantityadd = 0;
    this.price = 0;
    console.log(this.griddatapromotions,"data after slection");
    this.PromotionQtyCalculation(promotionItem);
  }

  addPromoItems() {

    // payload for 3 and 4th promotions
    let promotionstype1 :any = [];
    let selectedNonPromotionData: any = [];
    this.griddatapromotions.forEach(item => {
      let data ={
        "PromotionId" : item.productPromotionsId,
        "AddItems": selectedNonPromotionData
      }
      promotionstype1.push(data);

      if(item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0){
        item.promoDetails.stockItems.forEach(stockItem=>{
          if(stockItem.isProductSelected){
            let obj = {

              "Taxid": stockItem.Taxid,
              "stockItemId": stockItem.stockItemId,
              "Quantity": stockItem.Quantity,

            };
            selectedNonPromotionData.push(obj)

            
            
          }
        });
      }
    });

    let data = {
      "GeographyId": this.geographyId,
      "details":promotionstype1
    }
    console.log('data', data);
  }


}
