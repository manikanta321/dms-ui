import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer-reactv-success',
  templateUrl: './dealer-reactv-success.component.html',
  styleUrls: ['./dealer-reactv-success.component.css']
})
export class DealerReactvSuccessComponent implements OnInit {
  customerName:any;
  constructor(
    
  ) { }

  ngOnInit(): void {
    this.customerName=localStorage.getItem("employeeNameOfDealer");

  }

}
