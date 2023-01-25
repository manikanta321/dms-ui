import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import tippy, { hideAll } from 'tippy.js';
import { OrdersReceiveShipmentComponent } from '../../orders-receive-shipment/orders-receive-shipment.component';
import { AddOrderPromotionlistComponent } from '../../orders/add-order-promotionlist/add-order-promotionlist.component';
import { AddorderpromotionsComponent } from '../../orders/addorderpromotions/addorderpromotions.component';
// import { OrderNonpromotionlistComponent } from '../../orders/order-nonpromotionlist/order-nonpromotionlist.component';

import { OrderCancelPopupComponent } from '../order-cancel-popup/order-cancel-popup.component';
import { OrderlistShipPopupComponent } from '../orderlist-ship-popup/orderlist-ship-popup.component';
@Component({
  selector: 'app-orderlist-action-popup',
  templateUrl: './orderlist-action-popup.component.html',
  styleUrls: ['./orderlist-action-popup.component.css']
})
export class OrderlistActionPopupComponent implements OnInit {
  private params;
  public isOpen = false;
  private tippyInstance;
  selected: boolean = false;
  offsetValue: number[] = [];
  currentActionMenu: string[] = [];

  @ViewChild('content') container;

  @ViewChild('trigger') button;

  orderStatusAction = {
    'ordered': ['confirm_order', 'cancel_order'], // done
    'returned': ['edit_order', 'cancel_order'], // NA
    'rejected': [], // done
    'confirmed': ['ship_order', 'close'], // done
    'cancelled': [], // need to check
    'preclosed': [], // NA
    'in-transit': ['ship_order', 'close'], //done
    'draft': ['edit_order', 'cancel_order'], //done
    'fulfilled': [], // Spelling check
    'to-ship': ['ship_order', 'close'],
    'received': [], // done
  }

  shipmentStatusAction = {
    'ordered': ['confirm_order', 'cancel_order'], // done
    'returned': ['edit_order', 'cancel_order'], // NA
    'rejected': [], // done
    'confirmed': ['ship_order', 'close'], // done
    'cancelled': [], // need to check
    'preclosed': [], // NA
    'in-transit': ['receive_shipment'], //done
    'draft': ['edit_order', 'cancel_order'], //done
    'fulfilled': [], // Spelling check
    'to-ship': ['ship_order', 'close'],
    'received': [], // done
  }
  showCaseMenuList:string[] = [];
  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog,
    private route: ActivatedRoute,) {
    this.route
      .data
      .subscribe(v => {
        let menuList = v['orderList'];
        this.showCaseMenuList = [];
        let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');
        userRolesData.forEach(element => {
          if (element.title == v['key']) {
            element.permission.forEach(item => {
              if (menuList.indexOf(item.action.toLowerCase()) !== -1 && item.status) {
                this.showCaseMenuList.push(item.action.toLowerCase());
              }
            })
          }
        })
        // switch (showCaseMenuList.length) {
        //   case 4:
        //     this.offsetValue = [-100, 200];
        //     break;
        //   case 3:
        //     this.offsetValue = [-72, 200];
        //     break;
        //   case 2:
        //     this.offsetValue = [-42, 200];
        //     break;
        //   case 1:
        //     this.offsetValue = [-15, 200];
        //     break;

        //   default:
        //     this.offsetValue = [-100, 200];
        //     break;
        // }
      });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params) {
    this.params = params;
    let menu = [];
    let ignoreMenus = ['close', 'cancel_order'];
    if(this.params?.data?.status){
      menu = this.orderStatusAction[this.params?.data?.status?.toLowerCase()] ?? [];
      
    // this.currentActionMenu.push('view');
    }else if(this.params?.data?.statusName){
      menu = this.shipmentStatusAction[this.params?.data?.statusName?.toLowerCase()] ?? [];

    // this.currentActionMenu.push('view');
    }

    

    // console.log("menu", menu);
    this.currentActionMenu = menu.filter(x => this.showCaseMenuList.indexOf(x) !== -1 || ignoreMenus.indexOf(x) !== -1);

    // this.currentActionMenu.push('view');
    // console.log(this.currentActionMenu.length);

    switch (this.currentActionMenu.length) {
      case 5:
        this.offsetValue = [-100, 200];
        break;
      case 4:
        this.offsetValue = [-72, 200];
        break;
      case 3:
        this.offsetValue = [-42, 200];
        break;
      case 2:
        this.offsetValue = [-15, 200];
        break;

      case 1:
        this.offsetValue = [-15, 200];
        break;

      default:
        this.offsetValue = [-100, 200];
        break;
    }
  }

  configureTippyInstance() {
    this.tippyInstance.enable();
    this.tippyInstance.show();

    this.tippyInstance.setProps({
      trigger: 'manual',
      placement: 'left',
      theme: 'user-tippy',
      arrow: false,
      interactive: true,
      appendTo: document.body,
      hideOnClick: false,
      offset: this.offsetValue,
      onShow: (instance) => {
        hideAll({ exclude: instance });
      },
      onClickOutside: (instance, event) => {
        this.isOpen = false;
        instance.unmount();
      },
    });
  }

  togglePopup() {
    this.isOpen = !this.isOpen;
    this.changeDetector.detectChanges();
    if (this.isOpen) {
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }

  orderedit() {
    // localStorage.setItem('edit-dealer','Edit')
    // this.dialog.open(OrderlistEditPopupComponent,{height:"570px"});
    // this.isOpen = false;
    sessionStorage.setItem("Confirm", "");
    localStorage.setItem("Edit", 'Edit')
    let dialogRef = this.dialog.open(AddorderpromotionsComponent, {
      // width: '100vw',
      maxWidth: '78vw',
      panelClass: 'order-add-edit'
    });
    this.isOpen = false;
    dialogRef.afterClosed().subscribe((res) => {

      localStorage.setItem('Edit', '');

    })
  }
  orderCancel() {
    this.dialog.open(OrderCancelPopupComponent);
    this.isOpen = false;
  }

  viewOrder() {
    sessionStorage.setItem("viewOrder", "View");
    this.dialog.open(OrderlistShipPopupComponent, { width: "987px", height: "1461px" });
    this.isOpen = false;
  }
  orderShip() {
    sessionStorage.setItem("viewOrder", "")

    this.dialog.open(OrderlistShipPopupComponent, {minWidth: '98vw',height:"95vh" });
    this.isOpen = false;
  }

  orderReceive() {
    this.dialog.open(OrdersReceiveShipmentComponent, {width:"2087px",height:"1661px"});
    this.isOpen = false;
  }
  ReceiveShipment() {
    localStorage.setItem('ViewOrReceive', 'Receive');
    localStorage.setItem('orderOrShipmentOrRecipt','shipment')
    this.dialog.open(OrdersReceiveShipmentComponent, {maxWidth: '95vw',height:"95vh"});
    this.isOpen = false;
  }
  confirmOrder() {
    localStorage.setItem("Edit", '')
    sessionStorage.setItem("Confirm", "Confirm");
    let dialogRef = this.dialog.open(AddorderpromotionsComponent, {
      // width: '100vw',
      maxWidth: '70vw',
      panelClass: 'order-add-edit'
    });
    this.isOpen = false;
    dialogRef.afterClosed().subscribe((res) => {
      sessionStorage.setItem("Confirm", "");
    })
  }
}
