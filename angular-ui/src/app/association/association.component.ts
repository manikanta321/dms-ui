import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssociationTargetPopupComponent } from './association-target-popup/association-target-popup.component';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {
  selectedCar: number | undefined;
  toppings = new FormControl('');
  toppingList: string[] = ['Value1', 'Value2', 'Value3'];
  selectedPeople = [];
  cities: any[] = [
    { value: 1, text: "Vilnius" },
    { value: 2, text: "Kaunas" },
    { value: 3, text: "Pavilnys (Disabled)" },
    { value: 4, text: "Pabradė" }
  ];
  showUploadButton:boolean = false;
  bulkBtnClicked:boolean = false;
  // selectedCar: number;
  
  
  constructor(public dialog: MatDialog,) { }

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  ngOnInit(): void {
  }

  targetSetModal(){
    const dialogRef =  this.dialog.open( AssociationTargetPopupComponent, { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
