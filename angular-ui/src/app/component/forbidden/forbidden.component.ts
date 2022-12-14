import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DeactivateUserpopupComponent } from '../users/userPopups/deactivate-userpopup/deactivate-userpopup.component';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {
  collapsed = true;
  sideBarOpen = true;
  // sidebar = true;
  // sidenav : boolean = true;
  // @Output()toggleSidebar : EventEmitter <any> = new EventEmitter();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(public dialog: MatDialog,
    private observer: BreakpointObserver) { }
  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 1);
   }
ngOnInit(): void {
}
// sideBarToggler(){
//   this.sideBarOpen = !this.sideBarOpen;
// }
deactive(){
  this.dialog.open( DeactivateUserpopupComponent);
}
ToggleSideNav(value:any){
  this.sidenav.toggle()
}

}
