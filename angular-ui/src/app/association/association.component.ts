import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssociationTargetPopupComponent } from './association-target-popup/association-target-popup.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {
  toppings1 = new FormControl('');
  toppingList1:  any= [];
  
  constructor(public dialog: MatDialog,
    private user:UserService,) { }

   

  ngOnInit(): void {
  }
  statusItems(){
    this.user.getstatusDeatils().subscribe((res: any) => {
        
      let localdata=res.response;
  
  
      this.toppingList1 = localdata.map((data: { statusId: any; statusname: any; }) => {
        return {status_id: data.statusId, status_name: data.statusname };
      });
  
      if (!this.toppingList1?.length) {
        this.toppingList1 = localdata.map((status: { statusname: any; }) => {
          return status.statusname;
        });
      }
      this.toppingList1.push()
      // this.toppingList = res.response;
      this.toppings1 = new FormControl(this.toppingList1);
  
      console.log('status',this.toppingList1)
  
  
  
  
    });
  }
  // targetSetModal(){
  //   const dialogRef =  this.dialog.open( AssociationTargetPopupComponent, { panelClass: 'custom-dialog-container' });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

}
