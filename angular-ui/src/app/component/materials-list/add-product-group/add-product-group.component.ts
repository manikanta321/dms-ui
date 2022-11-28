import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { SharedServicesMaterialService } from 'src/app/services/shared-services-material.service';
@Component({
  selector: 'app-add-product-group',
  templateUrl: './add-product-group.component.html',
  styleUrls: ['./add-product-group.component.css']
})
export class AddProductGroupComponent implements OnInit {
  productGroup:any;
  constructor(
    private addMaterials: AddMaterialsService,
    private sharedService:SharedServicesMaterialService,
    private dialogRef: MatDialogRef<AddProductGroupComponent>,

  ) { 
    
  }

  ngOnInit(): void {
  }
  onProductGroup(event){
    let prod =event.target.value;
    this.productGroup = prod ;
    console.log("productG",this.productGroup)
  }
  addProduct(){
    let dataP = this.productGroup;
    let loggedUserId = localStorage.getItem('logInId')
    let data ={
      ProductGroupName:dataP,
      CurrentLoggedUserId :loggedUserId

    }
    this.addMaterials.addProductItem(data).subscribe((res) => {
      let ProdItem = res;
      console.log("ProdItem", ProdItem);
      this.sharedService.filter('Register click')
      this.dialogRef.close();
    });
  }
}
