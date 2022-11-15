import { Component, OnInit } from '@angular/core';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
@Component({
  selector: 'app-add-product-group',
  templateUrl: './add-product-group.component.html',
  styleUrls: ['./add-product-group.component.css']
})
export class AddProductGroupComponent implements OnInit {
  productGroup:any;
  constructor(
    private addMaterials: AddMaterialsService
  ) { }

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
      alert("heyProd");
      let ProdItem = res;
      console.log("ProdItem", ProdItem);

    });
  }
}
