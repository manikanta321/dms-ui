import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { SharedServicesMaterialService } from 'src/app/services/shared-services-material.service';
@Component({
  selector: 'app-add-product-sub-group',
  templateUrl: './add-product-sub-group.component.html',
  styleUrls: ['./add-product-sub-group.component.css']
})
export class AddProductSubGroupComponent implements OnInit {
  productSubGroup:any;
  prodName:any;
  constructor(
    private dialogRef: MatDialogRef<AddProductSubGroupComponent>,

    private addMaterials: AddMaterialsService,
    private sharedService:SharedServicesMaterialService,

  ) { }

  ngOnInit(): void {
    this.prodName = sessionStorage.getItem("productName");
  }
  onSubProductGroup(event){
    let prod =event.target.value;
    this.productSubGroup = prod ;
    console.log("productG",this.productSubGroup)
  }
  addSubProduct(){
    let dataSP = this.productSubGroup;
    let loggedUserId = localStorage.getItem('logInId')
    let prodId = sessionStorage.getItem("productId")

    let data ={
      ProductSubGroupName:dataSP,
      CurrentLoggedUserId :loggedUserId,
      ParentId:Number(prodId)
    }
    this.addMaterials.addSubProductItem(data).subscribe((res) => {
      let ProdSbItem = res;
      console.log("ProdSbItem", ProdSbItem);
      this.dialogRef.close();
      this.sharedService.filter('Register click')

    });
  }
}
