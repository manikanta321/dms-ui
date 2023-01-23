import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersApisService } from 'src/app/services/orders-apis.service';

@Component({
  selector: 'app-add-order-promotionlist',
  templateUrl: './add-order-promotionlist.component.html',
  styleUrls: ['./add-order-promotionlist.component.css']
})
export class AddOrderPromotionlistComponent implements OnInit {
  // taxtemplete :any =['hj','hj'];

  private gridApi!: GridApi;
  promoList = true;
  priceD = true;
  buysets = true;
  rowData: any;
  columnDefs: any;
  griddatapromotions: any = [];
  copyGridPromotions: any = [];
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
  currentSelectedPromos: any = [];

  isOrderPromotionValid: boolean = false;

  constructor(private user: UserService,
    private orders: OrdersApisService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
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
    this.currentSelectedPromos = this.data ?? [];
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
      this.spinner.hide();
      console.log(this.imagesapis, "imagesres");
      this.imagesapis.forEach(item => {
        console.log(this.currentSelectedPromos);
        let index = this.currentSelectedPromos.findIndex(x => (x.promotionId == item.promotionId || x.promotionId == item.productPromotionsId));
        let obj = {
          "productPromotionsId": item.productPromotionsId,
          // shd kep is selected as flase
          "isSelected": index !== -1 ? true : false,
          "promotionTypesId": item.promotionTypesId,
          "promotionName": item.promotionName,
          "imageurl": item.imageurl
        }
        this.arrayOfImages.push(obj);
      });

      // let previousSelectedPromos = []
      this.arrayOfImages.forEach(x => {
        if (x.isSelected) this.imagesid.push(x.productPromotionsId);
      })
      if (this.imagesid.length > 0)
        this.getProductsOfPromotionForOrder();

    });
  }


  getpromotionlistById(e, item) {
    // console.log(e, item);

    if (this.imagesid.indexOf(item.productPromotionsId) == -1) {
      item.isSelected = true;
      this.imagesid.push(item.productPromotionsId);
      this.getProductsOfPromotionForOrder();
    } else {
      item.isSelected = false;
      this.imagesid.splice(this.imagesid.indexOf(item.productPromotionsId), 1);
      this.griddatapromotions.splice(this.griddatapromotions.findIndex(x => x.productPromotionsId == item.productPromotionsId), 1);
      this.orderPromotionEnableValidate();
    }
  }
  ProductPromotionOrderList: any[] = [];
  getProductsOfPromotionForOrder() {
    let data = {
      "ProductPromotionId": this.imagesid,
      "Dealerid": this.dealerid,
      "GeographyIdid": this.geographyId
    }

    this.spinner.show();
    console.log(this.imagesid, "listdatapromotionsids")
    this.orders.GetProductsOfPromotionForOrder(data).subscribe((res: any) => {
      // this.griddatapromotions = res.response;

      // this.griddatapromotions.map(item => {
      //   item.isShowPromos = false;
      //   item.isProductSelected = false;
      //   return item;
      // });

      this.ProductPromotionOrderList = res.response;
      this.orderPromotionFormatter(this.ProductPromotionOrderList);
      // this.griddata = this.orderNonPromotionFormatter(this.griddatapromotions);
      // this.griddatapromotions.sort((a, b) => b.isProductSelected - a.isProductSelected   );
      this.spinner.hide();
      console.log(this.griddatapromotions, "griddata");
    });
  }

  appendStockItemFields(stockItem, productPromotions) {
    let formatObj: any = {};
    console.log(this.currentSelectedPromos);
    let promotion = this.currentSelectedPromos.find(x => x.promotionId == productPromotions.productPromotionsId);
    if (promotion) {
      let exisistItem = promotion.itemDetails.find(y => y.stockitemid == stockItem.stockitemid);
      if (exisistItem) {
        stockItem = JSON.parse(JSON.stringify(exisistItem));
        stockItem.isProductSelected = true;
        productPromotions.isShowPromos = true;
      }
    }

    formatObj.customerPOProductId = stockItem.customerPOProductId ?? 0;
    formatObj.stockitemid = stockItem.stockitemid;
    formatObj.stockitemname = stockItem.stockitemname;
    formatObj.productSKUName = stockItem.productSKUName;
    formatObj.price = stockItem.price;
    formatObj.stock = stockItem.stock
    formatObj.isProductSelected = stockItem.isProductSelected == undefined ? false : stockItem.isProductSelected;
    formatObj.Quantity = stockItem.quantity == undefined ? null : stockItem.quantity;
    formatObj.Taxid = stockItem.taxid;

    return formatObj;
  }

  orderPromotionFormatter(promotionList) {

    promotionList.forEach(item => {

      let exisitPromotion = this.griddatapromotions.find(x => x.productPromotionsId === item.productPromotionsId);

      if (!exisitPromotion) {
        item.isShowPromos = false;
        item.isProductSelected = false;
        item.showWarningMsg = false;

        switch (item.promotionTypesId) {
          case 1:

            if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
              item.promoDetails.buyGroups.forEach(stockItem => {
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                    stock = this.appendStockItemFields(stock, item);
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
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                    stock = this.appendStockItemFields(stock, item);
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
                  if (stockItem.stockitemid.length != 0) {
                    stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                      stock = this.appendStockItemFields(stock, item);
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
                  if (stockItem.stockitemid.length != 0) {
                    stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                      stock = this.appendStockItemFields(stock, item);
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
            if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
              item.promoDetails.stockitems = item.promoDetails.stockitems.map(stockItem => {
                stockItem = this.appendStockItemFields(stockItem, item);
                return stockItem
              });
              item.promoDetails.totalQuantity = 0;
              item.promoDetails.totalAmount = 0;
            }
            break;

          case 4:
            if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
              item.promoDetails.stockitems = item.promoDetails.stockitems.map(stockItem => {
                stockItem = this.appendStockItemFields(stockItem, item);
                return stockItem
              });
              item.promoDetails.totalQuantity = 0;
              item.promoDetails.totalAmount = 0;
            }
            break;

          default:
            break;
        }


        this.griddatapromotions.push(item);
      }


      this.PromotionQtyCalculation(item);
    });


    this.copyGridPromotions = JSON.parse(JSON.stringify(this.griddatapromotions));

  }

  updateInputEnableStatus(item) {

    item.promoDetails.buySets.forEach(setItem => {
      setItem.buyGroups.forEach(stockItem => {
        stockItem.isEnable = false;
        stockItem.stockitemid.forEach(stock => {
          if (setItem.isInputEnable || !(item.promoDetails.isBuyItemSelected)) {
            stockItem.isEnable = true;
          }
        });

      });
    });

    item.promoDetails.getSets.forEach(setItem => {
      setItem.getGroups.forEach(stockItem => {
        stockItem.isEnable = false;
        stockItem.stockitemid.forEach(stock => {
          if (setItem.isInputEnable || !(item.promoDetails.isGetItemSelected)) {
            stockItem.isEnable = true;
          }
        });

      });
    });
  }

  quantityChange(data, updatedItem) {
    if (!updatedItem.isProductSelected) {
      updatedItem.isProductSelected = true;
    } else if (!updatedItem.Quantity) {
      updatedItem.isProductSelected = false;
    }
    data.showWarningMsg = true;
    this.PromotionQtyCalculation(data);
  }

  orderPromotionEnableValidate() {
    console.log(this.griddatapromotions);
    this.isOrderPromotionValid = true;
    this.griddatapromotions.forEach(x => {
      if (x.promotionTypesId == 3 || x.promotionTypesId == 4) {
        if (!x.promoDetails.isItemValid) {
          this.isOrderPromotionValid = false;
        }
      }
      if (x.promotionTypesId == 2 || x.promotionTypesId == 1) {
        if (!x.promoDetails.isGetItemValid || !x.promoDetails.isBuyItemValid) {
          this.isOrderPromotionValid = false;
        }
      }

    })
  }

  calculateDiscountVolumeAmount(item) {
    item.promoDetails.stockitems.forEach(stockItem => {
      stockItem.DiscountAmount = 0;
      if (stockItem.isProductSelected) {
        item.promoDetails.volumes.forEach(element => {
          if (element.minVolume <= item.promoDetails.totalQuantity && element.maxVolume >= item.promoDetails.totalQuantity) {
            stockItem.DiscountAmount = (stockItem.Quantity) * (stockItem.price) * (100 - element.discountPercentage) / 100;
          }
        });
      }
    });
  }

  calculateDiscountAmount(item) {
    item.promoDetails.stockitems.forEach(stockItem => {
      stockItem.DiscountAmount = 0;
      if (stockItem.isProductSelected) {
        item.promoDetails.prices.forEach(element => {
          if (element.minVolume <= item.promoDetails.totalQuantity && element.maxVolume >= item.promoDetails.totalQuantity) {
            stockItem.DiscountAmount = (stockItem.Quantity) * (element.maxPrice);
          }
        });
      }
    });
  }
  PromotionQtyCalculation(item) {
    switch (item.promotionTypesId) {
      case 1:
        // buygroups
        item.promoDetails.isBuyItemValid = true;
        if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
          item.promoDetails.buyGroupsQty = 0;
          item.promoDetails.requiredGetGroupsQty = 0;
          item.promoDetails.buyGroups.forEach(stockItem => {
            stockItem.totalQuantity = 0;
            stockItem.totalAmount = 0;
            stockItem.isItemValid = true;
            if (stockItem.stockitemid.length != 0) {
              stockItem.stockitemid.forEach(stock => {
                if (stock.isProductSelected) {
                  stockItem.totalQuantity += stock.Quantity;
                  stockItem.totalAmount += (stock.price * stock.Quantity);
                }
              })

              if (stockItem.maxVolume) {
                item.promoDetails.buyGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
              }
              if (stockItem.totalQuantity < stockItem.moq) {
                stockItem.isItemValid = false;
                item.promoDetails.isBuyItemValid = false;
              }
            }

          });
        }
        // getgroups
        item.promoDetails.getGroupsQty = 0;
        item.promoDetails.isGetItemValid = true;
        if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {
          item.promoDetails.getGroups.forEach(stockItem => {
            stockItem.totalQuantity = 0;
            stockItem.totalAmount = 0;
            stockItem.isItemValid = true;
            if (stockItem.stockitemid.length != 0) {
              stockItem.stockitemid.forEach(stock => {
                if (stock.isProductSelected) {
                  stockItem.totalQuantity += stock.Quantity;
                  stockItem.totalAmount += (stock.price * stock.Quantity);
                }
              })
            }

            if (stockItem.maxVolume) {
              item.promoDetails.getGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
            }

            if (!(item.promoDetails.buyGroupsQty) || item.promoDetails.buyGroupsQty !== item.promoDetails.getGroupsQty) {
              stockItem.isItemValid = false;
              item.promoDetails.isGetItemValid = false;
            } else if (item.promoDetails.buyGroupsQty && item.promoDetails.buyGroupsQty === item.promoDetails.getGroupsQty) {
              stockItem.isItemValid = true;
              item.promoDetails.isGetItemValid = true;
            }
          });
        }
        break;

      case 2:

        if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
          item.promoDetails.isBuyItemValid = true;
          item.promoDetails.isBuyItemSelected = false;
          item.promoDetails.buyGroupsQty = 0;
          item.promoDetails.buySets.forEach(setItem => {
            setItem.isInputEnable = false;
            setItem.buyGroups.forEach(stockItem => {
              stockItem.totalAmount = 0;
              stockItem.totalQuantity = 0;
              stockItem.isItemValid = true;
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    item.promoDetails.isBuyItemSelected = true;
                    setItem.isInputEnable = true;
                    stockItem.totalQuantity += stock.Quantity;
                    stockItem.totalAmount += (stock.price * stock.Quantity);
                  }
                })

                if (stockItem.maxVolume && stockItem.totalQuantity) {
                  item.promoDetails.buyGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
                }

                if (setItem.isInputEnable && stockItem.totalQuantity < stockItem.moq) {
                  stockItem.isItemValid = false;
                  item.promoDetails.isBuyItemValid = false;
                }
              }
            });

          });
        }

        // getgroups
        if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
          item.promoDetails.getGroupsQty = 0;
          item.promoDetails.isGetItemValid = true;
          item.promoDetails.isGetItemSelected = false;
          item.promoDetails.getSets.forEach(setItem => {
            setItem.isInputEnable = false;
            setItem.getGroups.forEach(stockItem => {
              stockItem.totalAmount = 0;
              stockItem.totalQuantity = 0;
              stockItem.isItemValid = true;
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    item.promoDetails.isGetItemSelected = true;
                    setItem.isInputEnable = true;
                    stockItem.totalQuantity += stock.Quantity;
                    stockItem.totalAmount += (stock.price * stock.Quantity);
                  }
                })

                if (stockItem.maxVolume && stockItem.totalQuantity) {
                  item.promoDetails.getGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
                }
                if (setItem.isInputEnable && item.promoDetails.buyGroupsQty !== item.promoDetails.getGroupsQty) {
                  stockItem.isItemValid = false;
                  item.promoDetails.isGetItemValid = false;
                } else if (setItem.isInputEnable && item.promoDetails.buyGroupsQty == item.promoDetails.getGroupsQty) {
                  stockItem.isItemValid = true;
                  item.promoDetails.isGetItemValid = true;
                }
              }
            });

          });
        }

        this.updateInputEnableStatus(item);
        break;

      case 3:
        if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.isItemValid = true;
          item.promoDetails.stockitems.forEach(stockItem => {
            if (stockItem.isProductSelected) {
              item.promoDetails.totalQuantity += stockItem.Quantity;
              item.promoDetails.totalAmount += (stockItem.price * stockItem.Quantity);
            }
          });
          if (item.promoDetails.totalQuantity < item.promoDetails.moq) {
            item.promoDetails.isItemValid = false;
          }
        }
        this.calculateDiscountVolumeAmount(item);
        break;

      case 4:
        if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.isItemValid = true;
          item.promoDetails.stockitems.forEach(stockItem => {
            if (stockItem.isProductSelected) {
              item.promoDetails.totalQuantity += stockItem.Quantity;
              item.promoDetails.totalAmount += (stockItem.price * stockItem.Quantity);
              // stockItem.DiscountAmount = this.calculateDiscountAmount(item.promoDetails.prices, stockItem)
            }
          });
          if (item.promoDetails.totalQuantity < item.promoDetails.moq) {
            item.promoDetails.isItemValid = false;
          }
          this.calculateDiscountAmount(item);
        }
        break;

      default:
        break;
    }

    this.orderPromotionEnableValidate();
  }
  checkboxChange(event, changedPromotionObj, promotionItem) {
    console.log(event, changedPromotionObj, "event, changedPromotionObj");
    changedPromotionObj.isProductSelected = event.target.checked;

    this.quantityadd = 0;
    this.price = 0;
    console.log(this.griddatapromotions, "data after slection");
    promotionItem.showWarningMsg = true;
    this.PromotionQtyCalculation(promotionItem);
  }

  doubleClick(itemList, taxId) {
    if (taxId) {
      itemList.forEach(element => {
        if (element.isProductSelected) {
          element.Taxid = taxId;
        }
      });
    }
  }

  addPromoItems() {

    // payload for 3 and 4th promotions
    this.promotionstype1 = [];
    this.promotionstype2 = [];
    this.promotionstype3 = [];
    this.promotionstype4 = [];

    this.griddatapromotions.forEach(item => {
      switch (item.promotionTypesId) {
        case 1:


          let buysets: any = [];
          let getsets: any = [];


          // buygroups
          if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
            item.promoDetails.buyGroups.forEach(stockItem => {
              let selectedPromotionDatabuyset: any = [];
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    let obj = {

                      "Taxid": stock.Taxid,
                      "stockitemid": stock.stockitemid,
                      "Quantity": stock.Quantity,
                      "stock": stock.stock

                    };
                    selectedPromotionDatabuyset.push(obj)

                  }
                })
              }

              let buyGroupdata = {
                "GroupId": stockItem.groupId,
                "AddItems": selectedPromotionDatabuyset

              }

              buysets.push(buyGroupdata)

            });
          }
          // getgroups
          if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {
            item.promoDetails.getGroups.forEach(stockItem => {
              let selectedPromotionDatagetset: any = [];
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    let obj = {
                      "Taxid": stock.Taxid,
                      "stockitemid": stock.stockitemid,
                      "Quantity": stock.Quantity,
                      "stock": stock.stock

                    };
                    selectedPromotionDatagetset.push(obj)

                  }
                })
              }
              let getGroupdata = {
                "GroupId": stockItem.groupId,
                "AddItems": selectedPromotionDatagetset
              }
              getsets.push(getGroupdata)
            });
          }

          let data1 = {
            "PromotionId": item.productPromotionsId,
            "buySet": buysets,
            "getSet": getsets
          }
          this.promotionstype1.push(data1);

          break;
        case 2:
          let gpidandBysets: any = [];
          let gpidandgetsets: any = [];

          // buygrops
          if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
            item.promoDetails.buySets.forEach(setItem => {
              let buysets2: any = [];
              setItem.buyGroups.forEach(stockItem => {
                let selectedPromotionDatabuyset2: any = [];
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid.forEach(stock => {
                    if (stock.isProductSelected) {
                      let obj = {
                        "Taxid": stock.Taxid,
                        "stockitemid": stock.stockitemid,
                        "Quantity": stock.Quantity,
                        "stock": stock.stock
                      };
                      selectedPromotionDatabuyset2.push(obj)
                    }
                  })
                }

                let buyGroupdata2 = {
                  "SetId": stockItem.set,
                  "AddItems": selectedPromotionDatabuyset2

                }

                buysets2.push(buyGroupdata2)
              });

              let groupid = {
                "GroupId": setItem.groupId,
                "Groups": buysets2
              }
              gpidandBysets.push(groupid)
            });
          }
          // getgroups

          if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
            item.promoDetails.getSets.forEach(setItem => {
              let getsets2: any = [];
              setItem.getGroups.forEach(stockItem => {
                let selectedPromotionDatagetset2: any = [];
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid.forEach(stock => {
                    if (stock.isProductSelected) {
                      let obj = {

                        "Taxid": stock.Taxid,
                        "stockitemid": stock.stockitemid,
                        "Quantity": stock.Quantity,
                        "stock": stock.stock

                      };
                      selectedPromotionDatagetset2.push(obj)
                    }
                  })
                }
                let getGroupdata2 = {
                  "SetId": stockItem.set,
                  "AddItems": selectedPromotionDatagetset2

                }

                getsets2.push(getGroupdata2)
              });

              let groupid2 = {
                "GroupId": setItem.groupId,
                "Groups": getsets2
              }
              gpidandgetsets.push(groupid2)

            });
          }
          let data2 = {
            "PromotionId": item.productPromotionsId,
            "BuySets": gpidandBysets,
            "GetSets": gpidandgetsets

          }

          this.promotionstype2.push(data2);
          break;
        case 3:

          let selectedPromotionData3: any = [];

          if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
            item.promoDetails.stockitems.forEach(stockItem => {
              if (stockItem.isProductSelected) {
                let obj = {

                  "Taxid": stockItem.Taxid,
                  "stockitemid": stockItem.stockitemid,
                  "Quantity": stockItem.Quantity,
                  "stock": stockItem.stock

                };
                selectedPromotionData3.push(obj)

              }
            });
          }
          let data3 = {
            "PromotionId": item.productPromotionsId,
            "AddItems": selectedPromotionData3
          }
          this.promotionstype3.push(data3);
          break;
        case 4:
          let selectedPromotionData4: any = [];

          if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
            item.promoDetails.stockitems.forEach(stockItem => {
              if (stockItem.isProductSelected) {
                let obj = {

                  "Taxid": stockItem.Taxid,
                  "stockitemid": stockItem.stockitemid,
                  "Quantity": stockItem.Quantity,
                  "stock": stockItem.stock

                };
                selectedPromotionData4.push(obj)
              }
            });
          }
          let data4 = {
            "PromotionId": item.productPromotionsId,
            "AddItems": selectedPromotionData4
          }
          this.promotionstype4.push(data4);
          break;
        default:
          break;
      }

    });
    // to get all promotions in common res
    let allopromotions: any = [...this.promotionstype1, ...this.promotionstype2, ...this.promotionstype3, ...this.promotionstype4];


    let data = {
      "GeographyId": this.geographyId,
      "details": allopromotions,
      "Dealerid": this.dealerid,
    }
    console.log('data', data);


    this.orders.addorderPromotionsdata(data).subscribe(
      {
        next: (res: any) => {
          if (res) {
            console.log(res.response, "response after adding item in promotions");

            this.dialogRef.close(res.response);
          }
        },
        error: (err: any) => {

        }
      });
  }



}
