import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
@Output()ToggleSideNav : EventEmitter <any> = new EventEmitter();
sideBarOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
togglesidebar(){
  this.ToggleSideNav.emit();
 
  
}
}
