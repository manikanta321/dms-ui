

import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import tippy, { hideAll } from 'tippy.js'; 
import { DeleteUomNewComponent } from '../delete-uom-new/delete-uom-new.component';
import { DeleteUomPopupComponent } from '../delete-uom-popup/delete-uom-popup.component';
import { ActivatepopUpComponent } from '../users/userPopups/activatepop-up/activatepop-up.component';
import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { EditUomPopupComponent } from '../users/userPopups/edit-uom-popup/edit-uom-popup.component';
import { PswResetPopupComponent } from '../users/userPopups/psw-reset-popup/psw-reset-popup.component';

@Component({
  selector: 'app-uom-action',
  templateUrl: './uom-action.component.html',
  styleUrls: ['./uom-action.component.css']
})
export class UomActionComponent implements OnInit,  AfterViewInit {
  private params;
  public isOpen = false;
  private tippyInstance;
  selected:boolean=false;

  ngOnInit(){}
  @ViewChild('content') container;

  @ViewChild('trigger') button;

  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params) {
    this.params = params;
  }

  onClickHandler(option) {
    this.togglePopup();
    if (option === 'create') {
      this.params.api.applyTransaction({
        add: [{}],
      });
    }
    if (option === 'delete') {
      this.params.api.applyTransaction({ remove: [this.params.data] });
    }

    if (option === 'edit') {
      // this.params.api.startEditingCell({
      //   rowIndex: this.params.rowIndex,
      //   colKey: 'make',
      // });
      this.dialog.open( EditPopupComponent,);
      // this.dialogRef.close()
    }
  }

  configureTippyInstance() {
    this.tippyInstance.enable();
    this.tippyInstance.show();

    this.tippyInstance.setProps({
      trigger: 'manual',
      placement: 'left',
      arrow: false,
      interactive: true,
      appendTo: document.body,
      hideOnClick: false,
      offset: [0, 200],
      onShow: (instance) => {
        hideAll({ exclude: instance });
      },
      onClickOutside: (instance, event) => {
        this.isOpen = false;
        instance.unmount();
      },
    });
  }

  editUser(){
   
    this.dialog.open( EditUomPopupComponent,);
    this.isOpen = false;
  }
  deactive(){
    this.dialog.open(DeactivateUserpopupComponent);
    this.isOpen = false;
  }

  activate(){
    this.dialog.open(ActivatepopUpComponent);
    this.isOpen = false;
  }
  resetpws(){
    this.dialog.open(PswResetPopupComponent);
    this.isOpen = false;
  }

  deleteUom(){
    this.dialog.open(DeleteUomNewComponent);
    this.isOpen = false;
  }
  tickmark(){
    this.selected = true;
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



}
