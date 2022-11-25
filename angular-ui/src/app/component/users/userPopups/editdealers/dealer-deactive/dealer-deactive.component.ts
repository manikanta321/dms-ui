import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer-deactive',
  templateUrl: './dealer-deactive.component.html',
  styleUrls: ['./dealer-deactive.component.css']
})
export class DealerDeactiveComponent implements OnInit {
  customerName:any
  constructor() { }

  ngOnInit(): void {

    this.customerName=localStorage.getItem("employeeNameOfDealer");

  }

}
