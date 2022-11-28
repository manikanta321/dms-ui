import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-identifier',
  templateUrl: './add-identifier.component.html',
  styleUrls: ['./add-identifier.component.css']
})
export class AddIdentifierComponent implements OnInit {
  isSelected = false;
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(): void {
   this.isSelected = true
    }
}
