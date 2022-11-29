import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatepopUpComponent } from '../users/userPopups/activatepop-up/activatepop-up.component';
import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { MaterialAddEditpopupComponent } from '../materials-list/material-add-editpopup/material-add-editpopup.component';
import tippy, { hideAll } from 'tippy.js'; 

@Component({
  selector: 'app-material-list-action',
  templateUrl: './material-list-action.component.html',
  styleUrls: ['./material-list-action.component.css']
})
export class MaterialListActionComponent implements OnInit {
  private params;
  public isOpen = false;
  private tippyInstance;
  unActiveList:any;
  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog) {}

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
      this.unActiveList ="MaterialList"
      localStorage.setItem('session', this.unActiveList);
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }
  edit(){
    localStorage.setItem("Edit",'Edit')
    let dialogRef =this.dialog.open(MaterialAddEditpopupComponent, {
      // width: '100vw',
      maxWidth: '70vw',
      panelClass: 'material-add-edit'
  });
    this.isOpen = false;
    dialogRef.afterClosed().subscribe((res) => {

    localStorage.setItem('Edit','');

   })
  }
  deactive(){
    this.dialog.open(DeactivateUserpopupComponent);
    this.isOpen = false;
  }

  activate(){
    this.dialog.open(ActivatepopUpComponent);
    this.isOpen = false;
  }
}
