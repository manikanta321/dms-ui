import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { DeactivateUserpopupComponent } from 'src/app/component/users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  collapsed = true;
  sideBarOpen = false;
  // sidebar = true;
  // sidenav : boolean = true;
  // @Output()toggleSidebar : EventEmitter <any> = new EventEmitter();
  
  constructor(public dialog: MatDialog,
    ) { }

  
  ngOnInit(): void {
  }
  // sideBarToggler(){
  //   this.sideBarOpen = !this.sideBarOpen;
  // }
  deactive(){
    this.dialog.open( DeactivateUserpopupComponent);
  }
 
  // sidebartoggle(){
  // this.sidenav = ! this.sidenav;
  // }
  
}
