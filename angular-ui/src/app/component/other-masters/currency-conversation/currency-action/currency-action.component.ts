import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import tippy, { hideAll } from 'tippy.js'; 

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DeactiveCurrencyComponent } from '../deactive-currency/deactive-currency.component';
import { ReactiveCurrencyComponent } from '../reactive-currency/reactive-currency.component';
import { MakeDefaultComponent } from '../make-default/make-default.component';
// import { EditPopupComponent } from 'src/app/component/users/userPopups/edit-popup/edit-popup.component';
import { AddcurrencyComponent } from 'src/app/component/users/userPopups/addcurrency/addcurrency.component';

@Component({
  selector: 'app-currency-action',
  templateUrl: './currency-action.component.html',
  styleUrls: ['./currency-action.component.css']
})
export class CurrencyActionComponent implements OnInit {
  private params;
  public isOpen = false;
  private tippyInstance;
  selected:boolean=false;
  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  @ViewChild('content') container;

  @ViewChild('trigger') button;
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
     let dialogRef = this.dialog.open(AddcurrencyComponent);
      dialogRef.afterClosed().subscribe((res) => {
        localStorage.setItem('headerStatus','')
        })
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

  editpop(){
    localStorage.setItem('headerStatus','EditCurrency')
    let dialogRef = this.dialog.open( AddcurrencyComponent);
    dialogRef.afterClosed().subscribe((res) => {
      localStorage.setItem('headerStatus','')
      })
    this.isOpen = false;
  }
  Deactive(){
    this.dialog.open(DeactiveCurrencyComponent);
    this.isOpen = false;
  }

  reactive(){
    this.dialog.open(ReactiveCurrencyComponent);
    this.isOpen = false;
  }
  makedeflt(){
    this.dialog.open(MakeDefaultComponent );
    this.isOpen = false;
  }

  // deleteUom(){
  //   this.dialog.open(DeleteUomNewComponent);
  //   this.isOpen = false;
  // }
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
