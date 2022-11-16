import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-date-popup',
  templateUrl: './custom-date-popup.component.html',
  styleUrls: ['./custom-date-popup.component.css']
})
export class CustomDatePopupComponent implements OnInit {
selectdays :any = ['last 30 days', 'last 60 days','last 90 days','Last 180 Days','This Month','This Quater','This Year','Last Month','Last Quater','Last Year']
  constructor() { }

  ngOnInit(): void {
  }

}
