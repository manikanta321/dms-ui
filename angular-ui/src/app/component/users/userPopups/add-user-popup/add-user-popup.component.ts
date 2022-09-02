import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.css']
})
export class AddUserPopupComponent implements OnInit {
  userType: string[] = ['Admin', 'Business Manager', 'Order Manager', 'Viewer'];
  constructor() { }

  ngOnInit(): void {
  }

}
