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
  quantityadd: any= 0;
  price: any =0;
  griddata: any =[];

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

        return item;
        
      })
      
      // this.griddata = this.orderNonPromotionFormatter(this.griddatapromotions);
      // this.griddatapromotions.sort((a, b) => b.isPromotionSelected - a.isPromotionSelected);
      this.spinner.hide();
      console.log(this.griddata, "griddata");
    });
  }

  orderPromotionFormatter(items) {
    let formattedList: any = [];
    items.forEach(item => {
      let obj: any = {}
      let selectedNonPromotionItem = this.griddata.find(x => x.stockitemid == item.stockItemId);
      obj.mrp = item.mrp;
      obj.productSKUName = item.productSKUName;
      obj.stockItemId = item.stockItemId;
      obj.stockItemName = item.stockItemName;
      obj.isPromotionSelected = selectedNonPromotionItem == undefined ? false : true;
      obj.Quantity = selectedNonPromotionItem == undefined ? null : selectedNonPromotionItem.quantity;
      obj.Taxid = selectedNonPromotionItem == undefined ? null : selectedNonPromotionItem.taxid;
      // obj.price = (item.Quantity ?? 0) * item.mrp
      formattedList.push(obj);
    });
    // (Item.Quantity ?? 0) * Item.mrp
    return formattedList;

  }


  quantityChange() {
    let quantityadd = 0;
    let price = 0;
    this.griddatapromotions.forEach(item => {
      if (item.isPromotionSelected) {
        quantityadd += item.Quantity;
        price += ((item.Quantity ?? 0) * item.mrp);
      }
    });

    this.quantityadd = quantityadd;
    this.price = price;
  }

  checkboxChange(event, changedPromotionObj) {
    console.log(event, changedPromotionObj,"event, changedPromotionObj");
    changedPromotionObj.isPromotionSelected = event.target.checked;

    this.quantityadd = 0;
    this.price = 0;
    this.griddatapromotions.forEach(item => {
      if (item.isPromotionSelected) {
        this.quantityadd += item.Quantity;
        this.price += ((item.Quantity ?? 0) * item.mrp);
      }
    });
  }

  addPromoItems() {

    let selectedNonPromotionData: any = [];
    this.griddata.forEach(item => {
      if (item.isPromotionSelected) {
        let obj = {
          "Taxid": item.Taxid,
          "stockItemId": item.stockItemId,
          "Quantity": item.Quantity,
        };

        selectedNonPromotionData.push(obj)
      }
    });
    let data = {
      "GeographyId": this.geographyId,
      "AddItems": selectedNonPromotionData
    }
    console.log('data', data);
  }


}
