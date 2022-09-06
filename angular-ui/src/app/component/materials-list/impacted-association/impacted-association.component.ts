import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impacted-association',
  templateUrl: './impacted-association.component.html',
  styleUrls: ['./impacted-association.component.css']
})
export class ImpactedAssociationComponent implements OnInit {
  userTestStatus: { dealer: string, uom: string, }[] = [
    { "dealer": 'readable', "uom": "Boxes", },
    { "dealer": 'readable', "uom": "boxes" },
    
];

  constructor() { }

  ngOnInit(): void {
  }
  ClickedRow(){

  }
}
