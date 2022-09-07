import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-association-target-popup',
  templateUrl: './association-target-popup.component.html',
  styleUrls: ['./association-target-popup.component.css']
})
export class AssociationTargetPopupComponent implements OnInit {
  selctedPlan:string = "";
  constructor() { }

  ngOnInit(): void {
  }
  saveData(){    
  }

  onPlanChange(){
    
  }

}
