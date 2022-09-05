import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials-classification',
  templateUrl: './materials-classification.component.html',
  styleUrls: ['./materials-classification.component.css']
})
export class MaterialsClassificationComponent implements OnInit {
  clData: string[] = ['Type TP 1', 'Type TP 2', 'Type TP 3','Type TP 4'];
  subcat: string[] = ['sub category', 'sub category 2',];
  constructor() { }

  ngOnInit(): void {
  }

}
