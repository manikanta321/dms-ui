import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FirstDataRenderedEvent } from 'ag-grid-community';
import { PswResetPopupComponent } from 'src/app/component/users/userPopups/psw-reset-popup/psw-reset-popup.component';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
// @Output()ToggleSideNav : EventEmitter <any> = new EventEmitter();
@Output() ToggleSideNav : EventEmitter <any> = new EventEmitter();
sideBarOpen = true;
userType:any;
userName:any;
ProfileImage:any;
public isOpen = false;
@ViewChild(MatSidenav)
  sidenav!: MatSidenav;
ngAfterViewInit() {
  setTimeout(() => {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.ProfileImage = sessionStorage.getItem("profileImage")
        console.log("ProfileImage",this.ProfileImage);
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.ProfileImage = sessionStorage.getItem("profileImage")
        console.log("ProfileImage",this.ProfileImage);
      }
    });
  }, 1);
 }
  constructor(private observer: BreakpointObserver,
    private router: Router,private dialog: MatDialog,) { }

  ngOnInit(): void {
    let Image = sessionStorage.getItem("profileImage");
    this.ProfileImage = sessionStorage.getItem("profileImage")
    console.log("ProfileImage",this.ProfileImage);
    this.userName = localStorage.getItem("userName");
    this.userType=localStorage.getItem("userType");
    
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // this.TargetGroupService.listen().subscribe((m: any) => {
    //   console.log("RefreshData",m)
    //   setTimeout (() => {
    //     this.ngOnInit();
    //  }, 2000);
     
    // })
  }
sidenavtoggle(){
  this.ToggleSideNav.emit();
}
logout() {
  this.router.navigate(['']);

  localStorage.removeItem("token");
  localStorage.removeItem("expires_at");
  window.localStorage.clear();
}
resetpws(){
  sessionStorage.setItem("admin","adminPassword")
  this.dialog.open(PswResetPopupComponent);
  this.isOpen = false;
}
}
