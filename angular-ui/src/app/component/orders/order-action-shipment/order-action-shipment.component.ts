
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import tippy, { hideAll } from 'tippy.js'; 

import { OrdersReceiveShipmentComponent } from '../../orders-receive-shipment/orders-receive-shipment.component';

@Component({
  selector: 'app-order-action-shipment',
  templateUrl: './order-action-shipment.component.html',
  styleUrls: ['./order-action-shipment.component.css']
})
export class OrderActionShipmentComponent implements OnInit {
  private params;
  public isOpen = false;
  Alertpp:boolean=false;
  private tippyInstance;
  constructor(private changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>
  ) {}

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params) {
    this.params = params;
  }

  ngOnInit(): void {
    
  }
  @ViewChild('content') container;

  @ViewChild('trigger') button;
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
      offset: [-100, 200],
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
  orderReceive()
  {
    this.dialog.open(OrdersReceiveShipmentComponent, {width:"1587px",height:"1661px"});
    this.isOpen=false;
  }
  closeAlertPopup()
  {
    this.dialogRef.close();
    
  }
}