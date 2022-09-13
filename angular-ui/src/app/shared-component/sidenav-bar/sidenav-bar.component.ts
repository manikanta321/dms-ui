import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.css']
})
export class SidenavBarComponent implements OnInit {
  mobMuenuStatus = true;
  toggle = true;
  status = "Enable";
  panelOpenState: boolean = true;


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
  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? "Enable" : "Disable";
  }


  closePanel() {
    this.panelOpenState = true;
  }
}