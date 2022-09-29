import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  collapsed = true;
  sideBarOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}
