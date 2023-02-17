import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AddDealerPopupComponent } from 'src/app/add-dealer-popup/add-dealer-popup.component';

import tippy, { hideAll } from 'tippy.js'; 
import { DeactiveReactivePopupComponent } from './deactive-reactive-popup/deactive-reactive-popup.component';
import { DealerReactivePopupComponent } from './dealer-reactive-popup/dealer-reactive-popup.component';

@Component({
  selector: 'app-editdealers',
  templateUrl: './editdealers.component.html',
  styleUrls: ['./editdealers.component.css']
})
export class EditdealersComponent implements OnInit,AfterViewInit {
  DeactiveDealer : any;
  ReactiveDealer : any;
  private params;
  public isOpen = false;
  private tippyInstance;
  selected:boolean=false;
deactv :any = ['name', 'dfdfdd'];
  ngOnInit(){}
  @ViewChild('content') container;

  @ViewChild('trigger') button;
  offsetValue: number[] = [];

  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog,
    private route: ActivatedRoute,) {

    this.route.data.subscribe(v => {
      let menuList = v['DealerMenuList'];
      let showCaseMenuList: string[] = [];
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
        case 4:
          this.offsetValue = [-100, 200];
          break;
        case 3:
          this.offsetValue = [-72, 200];
          break;
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

  editDealer(){
    localStorage.setItem('edit-dealer','Edit')
    this.dialog.open(AddDealerPopupComponent,{ minWidth :'88vw',height:'670px' });
    this.isOpen = false;
  }

  deaActivate(){
    console.log('thisd', this.deactv);
    this.dialog.open(DeactiveReactivePopupComponent);
    this.isOpen = false;

    // const dialogRef = this.dialog.open(DeactiveReactivePopupComponent, { disableClose: true, data: dealer});
  }

  reActivate(){
    this.dialog.open( DealerReactivePopupComponent);
    this.isOpen = false;

    // const dialogRef = this.dialog.open(DeactiveReactivePopupComponent, { disableClose: true, data: dealer});
  }

}
