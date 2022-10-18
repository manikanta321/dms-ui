import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
// @Output()ToggleSideNav : EventEmitter <any> = new EventEmitter();
@Output() ToggleSideNav : EventEmitter <any> = new EventEmitter();
sideBarOpen = true;
userName:any;
@ViewChild(MatSidenav)
  sidenav!: MatSidenav;
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
  constructor(private observer: BreakpointObserver,
    private router: Router,) { }

  ngOnInit(): void {

    this.userName = localStorage.getItem("userName");

    
  }
// togglesidebar(){
//   this.ToggleSideNav.emit();
 
  
// }
sidenavtoggle(){
  this.ToggleSideNav.emit();
}

logout() {
  this.router.navigate(['']);

  localStorage.removeItem("token");
  localStorage.removeItem("expires_at");
}
}
