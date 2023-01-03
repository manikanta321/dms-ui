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
  griddatapromotions: any = [];
  copyGridPromotions:any = [];
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
  // promotions payloads
  promotionstype3: any = [];
  promotionstype4: any = [];
  promotionstype1: any = [];
  promotionstype2: any = [];

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
    this.spinner.show();
    this.orders.orderpromotionimages(data).subscribe((res: any) => {
      this.imagesapis = res.response
      console.log(this.imagesapis, "imagesres");
      this.imagesapis.forEach(item => {
        this.spinner.hide();
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
    if(this.imagesid.indexOf(item.productPromotionsId) == -1){
      this.imagesid.push(item.productPromotionsId);

      let data = {
        "ProductPromotionId": this.imagesid,
        "Dealerid": this.dealerid,
        "GeographyIdid": this.geographyId
      }
  
      // this.spinner.show();
      console.log(this.imagesid, "listdatapromotionsids")
      this.orders.GetProductsOfPromotionForOrder(data).subscribe((res: any) => {
        // this.griddatapromotions = res.response;
  
        // this.griddatapromotions.map(item => {
        //   item.isShowPromos = false;
        //   item.isProductSelected = false;
        //   return item;
        // });
        this.orderPromotionFormatter(res.response);
        // this.griddata = this.orderNonPromotionFormatter(this.griddatapromotions);
        // this.griddatapromotions.sort((a, b) => b.isProductSelected - a.isProductSelected);
        this.spinner.hide();
        console.log(this.griddatapromotions, "griddata");
      });
    }else{

      this.imagesid.splice(this.imagesid.indexOf(item.productPromotionsId), 1);
      this.griddatapromotions.splice(this.griddatapromotions.findIndex(x => x.productPromotionsId == item.productPromotionsId), 1);
    }


  }

  appendStockItemFields(stockItem) {
    let formatObj: any = {};
    formatObj.stockItemId = stockItem.stockItemId;
    formatObj.stockItemName = stockItem.stockItemName;
    formatObj.productSKUName = stockItem.productSKUName;
    formatObj.mrp = stockItem.mrp;
    formatObj.stock = stockItem.stock
    formatObj.isProductSelected = stockItem.isProductSelected == undefined ? false : stockItem.isProductSelected;
    formatObj.Quantity = stockItem.quantity == undefined ? null : stockItem.quantity;
    formatObj.Taxid = stockItem.taxid == undefined ? null : stockItem.taxid;

    return formatObj;
  }

  orderPromotionFormatter(promotionList) {

    promotionList.forEach(item => {

      let exisitPromotion =  this.griddatapromotions.find(x => x.productPromotionsId === item.productPromotionsId);

      if(!exisitPromotion){
        switch (item.promotionTypesId) {
          case 1:
  
            if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
  
              item.promoDetails.buyGroups.forEach(stockItem => {
                if (stockItem.stockItemId.length != 0) {
                  stockItem.stockItemId = stockItem.stockItemId.map(stock => {
                    stock = this.appendStockItemFields(stock);
                    return stock
                  })
                }
  
              });
              item.promoDetails.buyGroups.totalQuantity = 0;
              item.promoDetails.buyGroups.totalAmount = 0;
            }
  
            // getgroups
            if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {
  
              item.promoDetails.getGroups.forEach(stockItem => {
                if (stockItem.stockItemId.length != 0) {
                  stockItem.stockItemId = stockItem.stockItemId.map(stock => {
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
  
            if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
              item.promoDetails.buySets.forEach(setItem => {
                setItem.buyGroups.forEach(stockItem => {
                  if (stockItem.stockItemId.length != 0) {
                    stockItem.stockItemId = stockItem.stockItemId.map(stock => {
                      stock = this.appendStockItemFields(stock);
                      return stock
                    })
                  }
                  stockItem.totalQuantity = 0;
                  stockItem.totalAmount = 0;
                });
              });
            }
  
            if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
              item.promoDetails.getSets.forEach(setItem => {
                setItem.getGroups.forEach(stockItem => {
                  if (stockItem.stockItemId.length != 0) {
                    stockItem.stockItemId = stockItem.stockItemId.map(stock => {
                      stock = this.appendStockItemFields(stock);
                      return stock
                    })
                  }
                  stockItem.totalQuantity = 0;
                  stockItem.totalAmount = 0;
                });
              });
            }
  
            break;
  
          case 3:
            if (item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0) {
              item.promoDetails.stockItems = item.promoDetails.stockItems.map(stockItem => {
                stockItem = this.appendStockItemFields(stockItem);
                return stockItem
              });
              item.promoDetails.totalQuantity = 0;
              item.promoDetails.totalAmount = 0;
            }
            break;
  
          case 4:
            if (item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0) {
              item.promoDetails.stockItems = item.promoDetails.stockItems.map(stockItem => {
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

        item.isShowPromos = false;
        item.isProductSelected = false;
        this.griddatapromotions.push(item);
      }

      

    });


    this.copyGridPromotions = JSON.parse(JSON.stringify(this.griddatapromotions));

  }


  quantityChange(data) {

    this.PromotionQtyCalculation(data);
  }

  PromotionQtyCalculation(item) {
    switch (item.promotionTypesId) {
      case 1:
        // buygroups
        if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
          item.promoDetails.buyGroups.totalQuantity = 0;
          item.promoDetails.buyGroups.totalAmount = 0;
          item.promoDetails.buyGroups.forEach(stockItem => {
            if (stockItem.stockItemId.length != 0) {
              stockItem.stockItemId.forEach(stock => {
                if (stock.isProductSelected) {
                  item.promoDetails.buyGroups.totalQuantity += stock.Quantity;
                  item.promoDetails.buyGroups.totalAmount += (stock.mrp * stock.Quantity);
                }
              })
            }

          });
        }
        // getgroups
        if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {
          item.promoDetails.getGroups.totalQuantity = 0;
          item.promoDetails.getGroups.totalAmount = 0;
          item.promoDetails.getGroups.forEach(stockItem => {
            if (stockItem.stockItemId.length != 0) {
              stockItem.stockItemId.forEach(stock => {
                if (stock.isProductSelected) {
                  item.promoDetails.getGroups.totalQuantity += stock.Quantity;
                  item.promoDetails.getGroups.totalAmount += (stock.mrp * stock.Quantity);
                }
              })
            }

          });
        }
        break;

      case 2:

        if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
          item.promoDetails.buySets.forEach(setItem => {
            setItem.buyGroups.forEach(stockItem => {
              stockItem.totalAmount = 0;
              stockItem.totalQuantity = 0;
              if (stockItem.stockItemId.length != 0) {
                stockItem.stockItemId.forEach(stock => {
                  if (stock.isProductSelected) {
                    stockItem.totalQuantity += stock.Quantity;
                    stockItem.totalAmount += (stock.mrp * stock.Quantity);
                  }
                })
              }
            });

          });
        }

        // getgroups


        if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
          item.promoDetails.getSets.forEach(setItem => {
            setItem.getGroups.forEach(stockItem => {
              stockItem.totalAmount = 0;
              stockItem.totalQuantity = 0;
              if (stockItem.stockItemId.length != 0) {
                stockItem.stockItemId.forEach(stock => {
                  if (stock.isProductSelected) {
                    stockItem.totalQuantity += stock.Quantity;
                    stockItem.totalAmount += (stock.mrp * stock.Quantity);
                  }
                })
              }
            });

          });
        }
        break;

      case 3:
        if (item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0) {
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.stockItems.forEach(stockItem => {
            if (stockItem.isProductSelected) {
              item.promoDetails.totalQuantity += stockItem.Quantity;
              item.promoDetails.totalAmount += (stockItem.mrp * stockItem.Quantity);
            }
          });
        }
        break;

      case 4:
        if (item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0) {
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.stockItems.forEach(stockItem => {
            if (stockItem.isProductSelected) {
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
    console.log(this.griddatapromotions, "data after slection");
    this.PromotionQtyCalculation(promotionItem);
  }

  addPromoItems() {

    // payload for 3 and 4th promotions

    this.griddatapromotions.forEach(item => {
      switch (item.promotionTypesId) {
        case 1:
          let selectedNonPromotionData1: any = [];
          let buysets:any =[];
          let getsets:any = [];
          this.promotionstype1 = [];

          // buygroups
          if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
            item.promoDetails.buyGroups.forEach(stockItem => {
              
              if (stockItem.stockItemId.length != 0) {
                stockItem.stockItemId.forEach(stock => {
                  if (stock.isProductSelected) {
                    let obj = {

                      "Taxid": stock.Taxid,
                      "stockItemId": stock.stockItemId,
                      "Quantity": stock.Quantity,

                    };
                    selectedNonPromotionData1.push(obj)

                  }
                })
              }

              let buyGroupdata = {
                "GroupId":stockItem.groupId,
                "AddItems":selectedNonPromotionData1

              }

              buysets.push(buyGroupdata)

            });
          }
          // getgroups
          if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {
            item.promoDetails.getGroups.forEach(stockItem => {
              if (stockItem.stockItemId.length != 0) {
                stockItem.stockItemId.forEach(stock => {
                  if (stock.isProductSelected) {
                    let obj = {

                      "Taxid": stock.Taxid,
                      "stockItemId": stock.stockItemId,
                      "Quantity": stock.Quantity,

                    };
                    selectedNonPromotionData1.push(obj)

                  }
                })
              }
              let getGroupdata = {
                "GroupId":stockItem.groupId,
                "AddItems":selectedNonPromotionData1
              }
              getsets.push(getGroupdata)             
            });
          }

          let data1 = {
            "PromotionId": item.productPromotionsId,
            "BuySets": buysets,
            "GetSets":getsets
          }
          this.promotionstype1.push(data1);

          break;
        case 2:

          let selectedNonPromotionData2: any = [];
          let buysets2:any =[];
          let gpidandBysets:any =[];
          let gpidandgetsets:any = [];
          let getsets2:any = [];
          this.promotionstype2 = [];

     
          // buygrops
          if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
            item.promoDetails.buySets.forEach(setItem => {
          
              setItem.buyGroups.forEach(stockItem => {
             
                if (stockItem.stockItemId.length != 0) {
                  stockItem.stockItemId.forEach(stock => {
                    if (stock.isProductSelected) {
                      let obj = {

                        "Taxid": stock.Taxid,
                        "stockItemId": stock.stockItemId,
                        "Quantity": stock.Quantity,
      
                      };
                      selectedNonPromotionData2.push(obj)
                    }
                  })
                }

                let buyGroupdata2 = {
                  "SetId":stockItem.set,
                  "AddItems":selectedNonPromotionData2
  
                }
  
                buysets2.push(buyGroupdata2) 
              });
              let groupid = {
                "GroupId": setItem.groupId,
                "Groups":buysets2
              }
              gpidandBysets.push(groupid)
            });
          }
          // getgroups

        if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
          item.promoDetails.getSets.forEach(setItem => {
            setItem.getGroups.forEach(stockItem => {

              if (stockItem.stockItemId.length != 0) {
                stockItem.stockItemId.forEach(stock => {
                  if (stock.isProductSelected) {
                    let obj = {

                      "Taxid": stock.Taxid,
                      "stockItemId": stock.stockItemId,
                      "Quantity": stock.Quantity,
    
                    };
                    selectedNonPromotionData2.push(obj)
                  }
                })
              }
              let getGroupdata2 = {
                "SetId":stockItem.set,
                "AddItems":selectedNonPromotionData2

              }

              getsets2.push(getGroupdata2)
            });

            let groupid2 = {
              "GroupId": setItem.groupId,
              "Groups":getsets2
            }
            gpidandgetsets.push(groupid2)

          });
        }


          let data2 = {
            "PromotionId": item.productPromotionsId,
            "BuySets":gpidandBysets,
            "GetSets":gpidandgetsets
            
          }

                  
          this.promotionstype2.push(data2);
          break;
        case 3:

          let selectedNonPromotionData: any = [];
          this.promotionstype3 = [];
          if (item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0) {
            item.promoDetails.stockItems.forEach(stockItem => {
              if (stockItem.isProductSelected) {
                let obj = {

                  "Taxid": stockItem.Taxid,
                  "stockItemId": stockItem.stockItemId,
                  "Quantity": stockItem.Quantity,

                };
                selectedNonPromotionData.push(obj)

              }
            });
          }
          let data3 = {
            "PromotionId": item.productPromotionsId,
            "AddItems": selectedNonPromotionData
          }
          this.promotionstype3.push(data3);
          break;
        case 4:
          let selectedNonPromotionData4: any = [];
          this.promotionstype4 = [];

          if (item.promoDetails && item.promoDetails.stockItems && item.promoDetails.stockItems.length != 0) {
            item.promoDetails.stockItems.forEach(stockItem => {
              if (stockItem.isProductSelected) {
                let obj = {

                  "Taxid": stockItem.Taxid,
                  "stockItemId": stockItem.stockItemId,
                  "Quantity": stockItem.Quantity,

                };
                selectedNonPromotionData4.push(obj)
              }
            });
          }
          let data4 = {
            "PromotionId": item.productPromotionsId,
            "AddItems": selectedNonPromotionData
          }
          this.promotionstype4.push(data4);
          break;
        default:
          break;
      }

    });
    // to get all promotions in common res
    let allopromotions: any = [...this.promotionstype1, ...this.promotionstype2,...this.promotionstype3, ...this.promotionstype4];


    let data = {
      "GeographyId": this.geographyId,
      "details": allopromotions,
    }
    console.log('data', data);


    this.orders.addorderPromotionsdata(data).subscribe(
      {
        next: (res: any) => {
          if (res) {
            console.log(res.response, "response after adding item in promotions")
          }
        },
        error: (err: any) => {

        }
      });
  }



}
