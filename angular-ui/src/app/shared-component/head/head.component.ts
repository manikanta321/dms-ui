import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
// @Output()ToggleSideNav : EventEmitter <any> = new EventEmitter();
@Output() ToggleSideNav : EventEmitter <any> = new EventEmitter();
sideBarOpen = true;
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
  constructor(private observer: BreakpointObserver) { }

  ngOnInit(): void {
  }
// togglesidebar(){
//   this.ToggleSideNav.emit();
 
  
// }
sidenavtoggle(){
  this.ToggleSideNav.emit();
}
}
