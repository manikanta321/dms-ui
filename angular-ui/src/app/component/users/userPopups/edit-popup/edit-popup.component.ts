import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {
  panelOpenState = true;
  constructor() { }

  ngOnInit(): void {
  }

}
