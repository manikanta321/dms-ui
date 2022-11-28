import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-identifier',
  templateUrl: './add-identifier.component.html',
  styleUrls: ['./add-identifier.component.css']
})
export class AddIdentifierComponent implements OnInit {
  isSelected : any;
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(item): void {
    // if(item){
    //   this.isSelected = true
    // }
    // else{
    //   this. unselect = true
    // }
   
    }
    
}
