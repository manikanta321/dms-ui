import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tax-template',
  templateUrl: './add-tax-template.component.html',
  styleUrls: ['./add-tax-template.component.css']
})
export class AddTaxTemplateComponent implements OnInit {
  panelOpenState = true;
  
  constructor() { }

  ngOnInit(): void {
  }


}
