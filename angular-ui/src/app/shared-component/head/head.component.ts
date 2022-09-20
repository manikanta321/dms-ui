import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
@Output()toggleSidebar : EventEmitter <any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
togglesidebar(){
  this.toggleSidebar.emit();
}
}
