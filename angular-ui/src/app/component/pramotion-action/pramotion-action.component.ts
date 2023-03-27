import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { PromotionSharedServicesService } from 'src/app/services/promotion-shared-services.service';

import tippy, { hideAll } from 'tippy.js'; 
import { AddPromotionsComponent } from '../add-promotions/add-promotions.component';
import { ActivatepopUpComponent } from '../users/userPopups/activatepop-up/activatepop-up.component';
import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { EditPopupComponent } from '../users/userPopups/edit-popup/edit-popup.component';
import { PswResetPopupComponent } from '../users/userPopups/psw-reset-popup/psw-reset-popup.component';
import { ClosePopupComponent } from './close-popup/close-popup.component';
import { ViewPromotionPopupComponent } from './view-promotion-popup/view-promotion-popup.component';

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
  offsetValue: number[] = [];

  ngOnInit(){}
  @ViewChild('content') container;

  @ViewChild('trigger') button;

  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog,
    private route: ActivatedRoute,  ) {
      this.route
      .data
      .subscribe(v => {
        
        let menuList = v['promotionList'];
        let showCaseMenuList: string[] = ['View'];
        let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');
        userRolesData.forEach(element => {
          if (element.title == v['key']) {
            element.permission.forEach(item => {
              if (menuList.indexOf(item.action.toLowerCase()) !== -1 && item.status) {
                showCaseMenuList.push(item.action);
              }
            })
          }
        })
        
        switch (showCaseMenuList.length) {
          case 4:{
            this.offsetValue = [-100, 200];
            break;
          }
            
          case 3:{
            this.offsetValue = [-72, 200];
            break;
          }
            
          case 2:
            this.offsetValue = [-42, 200];
            break;
          case 1:
            this.offsetValue = [-15, 200];
            break;

          default:
            this.offsetValue = [-100, 200];
            break;
        }
      });
    }

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params) {
    this.params = params;
  }


  configureTippyInstance() {
    // this.tippyInstance = tippy(this.button.nativeElement);
    if(this.tippyInstance.enable){
      this.tippyInstance.enable();
    }
        
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
  close(){
    // this.isOpen = false;
    this.isOpen = false;

    this.dialog.open( ClosePopupComponent);

  }
  resetpws(){
    this.dialog.open(PswResetPopupComponent);
    this.isOpen = false;
  }
  tickmark(){
    this.selected = true;
  }
  editPromo(){
    localStorage.setItem('addOrEdit','editpromo');
    
    const config: MatDialogConfig = {
      minWidth: '90vw',      
      height: '610px',
     
    };
    this.isOpen = false;

   this.dialog.open( AddPromotionsComponent, config);

  }

  viewPromo(){
    const config: MatDialogConfig = {
      minWidth: '90vw',      
      height: '610px',
      autoFocus:false
    };
    this.isOpen = false;
    this.dialog.open( ViewPromotionPopupComponent,config);
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

