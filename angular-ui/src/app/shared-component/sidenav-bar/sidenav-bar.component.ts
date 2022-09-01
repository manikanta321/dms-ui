import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.css']
})
export class SidenavBarComponent implements OnInit {
  panelOpenState = false;
  mobMuenuStatus = true;
  constructor() { }

  ngOnInit(): void {
  }
  mobBurgerMenuAction() {
    console.log('g');
    this.mobMuenuStatus = !this.mobMuenuStatus;
  }
  closeBurgerMenu() {
    this.mobMuenuStatus = false;
  }
 
}
