import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import tippy, { hideAll } from 'tippy.js'; 
import { OrderlistEditPopupComponent } from '../orderlist-edit-popup/orderlist-edit-popup.component';
@Component({
  selector: 'app-orderlist-action-popup',
  templateUrl: './orderlist-action-popup.component.html',
  styleUrls: ['./orderlist-action-popup.component.css']
})
export class OrderlistActionPopupComponent implements OnInit {
  private params;
  public isOpen = false;
  private tippyInstance;
  selected:boolean=false;

  @ViewChild('content') container;

  @ViewChild('trigger') button
  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params) {
    this.params = params;
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

  orderedit(){
    // localStorage.setItem('edit-dealer','Edit')
    this.dialog.open(OrderlistEditPopupComponent,{height:"570px"});
    this.isOpen = false;
  }
}
