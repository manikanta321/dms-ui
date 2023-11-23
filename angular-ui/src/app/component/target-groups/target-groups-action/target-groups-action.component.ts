import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {  MatDialog, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import tippy, { hideAll } from 'tippy.js';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AddTargetGroupComponent } from '../../add-target-group/add-target-group.component';

@Component({
  selector: 'app-target-groups-action',
  templateUrl: './target-groups-action.component.html',
  styleUrls: ['./target-groups-action.component.css']
})
export class TargetGroupsActionComponent implements OnInit {
  private params;
  public isOpen = false;
  private tippyInstance;
  usertype:any
  selected:boolean=false;

  ngOnInit(): void {
    this.usertype = localStorage.getItem('userType')
  }
  
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

  editUser(){
    sessionStorage.setItem("AddTarget","");
    sessionStorage.setItem("viewTarget","");
    sessionStorage.setItem("EditTarget","EditTarget");
    this.dialog.open(AddTargetGroupComponent) 
    
    this.isOpen = false;
  }
  ViewTarget() {
    sessionStorage.setItem("AddTarget","");
    sessionStorage.setItem("viewTarget","viewTarget");
    sessionStorage.setItem("EditTarget","");
    this.dialog.open(AddTargetGroupComponent) 
    
    this.isOpen = false;
  }
  deactive(){

    this.isOpen = false;
  }

  activate(){
  
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



