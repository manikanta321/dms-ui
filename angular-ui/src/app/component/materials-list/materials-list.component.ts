import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImpactedAssociationComponent } from './impacted-association/impacted-association.component';
import { MaterialAddEditpopupComponent } from './material-add-editpopup/material-add-editpopup.component';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  emailid:any;
  phonenum:number;
  status:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554,status:'active'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554,status:'inactive'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554 , status:'active'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'invited'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'active'},
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',emailid:'you@smartgig',phonenum:8762287554, status:'locked'},
];

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'classification', 'unitofMeasure','productgroup','sku','status','edit','activateSection','action'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  selected = 'Search';

  addEditMaterial(){
    const dialogRef =  this.dialog.open( MaterialAddEditpopupComponent, { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  impactedAssociation(){
    const dialogRef =  this.dialog.open( ImpactedAssociationComponent , { panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
