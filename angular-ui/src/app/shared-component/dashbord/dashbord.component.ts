import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivateUserpopupComponent } from 'src/app/component/users/userPopups/activate-userpopup/activate-userpopup.component';
import { DeactivateUserpopupComponent } from 'src/app/component/users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  collapsed = true;
  sideBarOpen = true;
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  deactive(){
    this.dialog.open( DeactivateUserpopupComponent);
  }
  active(){
 this.dialog.open(ActivateUserpopupComponent )
  }
}
