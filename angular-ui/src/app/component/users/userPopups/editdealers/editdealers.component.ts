import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AddDealerPopupComponent } from 'src/app/add-dealer-popup/add-dealer-popup.component';

import tippy, { hideAll } from 'tippy.js'; 

@Component({
  selector: 'app-editdealers',
  templateUrl: './editdealers.component.html',
  styleUrls: ['./editdealers.component.css']
})
export class EditdealersComponent implements OnInit,AfterViewInit {

  private params;
  public isOpen = false;
  private tippyInstance;
  selected:boolean=false;

  ngOnInit(){}
  @ViewChild('content') container;

  @ViewChild('trigger') button;

  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog) { }

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

  editDealer(){
    localStorage.setItem('edit-dealer','Edit')
    this.dialog.open(AddDealerPopupComponent,{height:"570px"});
    this.isOpen = false;
  }

  deaActivate(){

  }

  reActivate(){

  }

}
