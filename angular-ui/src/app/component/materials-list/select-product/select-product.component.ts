import { Component, OnInit } from '@angular/core';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css']
})
export class SelectProductComponent implements OnInit {
  materialIdentifier:any=[];
  isSelected : boolean = false;
  constructor(private addMaterials: AddMaterialsService) { }
  matData:any=[];
  ngOnInit(): void {
    this.matData = [];
    this.getMaterialIdentifier();
  }
  getMaterialIdentifier(){
    this.addMaterials.getMaterialIdentifier().subscribe((res) => {
      let data = res.response;
     this.materialIdentifier =data;
     console.log("select Product", this.materialIdentifier);
    })
  }
  matIdentifier(item:any){
this.matData.push(item)
localStorage.setItem('session',JSON.stringify(this.matData));
// alert(this.matData)
// this.isSelected = !this.isSelected
// if(item){
//   this.isSelected = this.materialIdentifier
//   this.isSelected= true;
// }
// else{
//   this.isSelected = this.materialIdentifier
//   this.isSelected= false;
// }
  }
}
