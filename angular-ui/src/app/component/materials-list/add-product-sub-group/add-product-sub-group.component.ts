import { Component, OnInit } from '@angular/core';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
@Component({
  selector: 'app-add-product-sub-group',
  templateUrl: './add-product-sub-group.component.html',
  styleUrls: ['./add-product-sub-group.component.css']
})
export class AddProductSubGroupComponent implements OnInit {
  productSubGroup:any;
  prodName:any;
  constructor(
    private addMaterials: AddMaterialsService
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
      ProductGroupName:dataSP,
      CurrentLoggedUserId :loggedUserId,
      ParentId:prodId
    }
    this.addMaterials.addSubProductItem(data).subscribe((res) => {
      alert("heySbProd");
      let ProdSbItem = res;
      console.log("ProdSbItem", ProdSbItem);

    });
  }
}
