import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import tippy, { hideAll } from 'tippy.js'; 
import { ActivatepopUpComponent } from '../users/userPopups/activatepop-up/activatepop-up.component';
import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { PswResetPopupComponent } from '../users/userPopups/psw-reset-popup/psw-reset-popup.component';

@Component({
  selector: 'app-pramotion-action',
  templateUrl: './pramotion-action.component.html',
  styleUrls: ['./pramotion-action.component.css']
})
export class PramotionActionComponent implements OnInit,  AfterViewInit {
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
  close(){
    this.isOpen = false;

  }
  resetpws(){
    this.dialog.open(PswResetPopupComponent);
    this.isOpen = false;
  }
  tickmark(){
    this.selected = true;
  }
  togglePopup() {
    this.isOpen = !this.isOpen;
    this.changeDetector.detectChanges();
    if (this.isOpen) {
      let data:any = localStorage.setItem('session','');
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }



}

