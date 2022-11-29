import { Component, OnInit } from '@angular/core';
import { AddMaterialsService } from 'src/app/services/add-materials.service';

@Component({
  selector: 'app-add-identifier',
  templateUrl: './add-identifier.component.html',
  styleUrls: ['./add-identifier.component.css']
})
export class AddIdentifierComponent implements OnInit {
  isSelected : any;
  ProductCustomIdentifier:any=[];
  productBusinessName:any=[];
  productIndentifier:any=[];
  productSettingIdentifier:any=[];

  constructor(private addMaterials: AddMaterialsService) { }

  ngOnInit(): void {
    this.getProductCustomIdentifier();
  }
  getProductCustomIdentifier(){
    this.addMaterials.getProductCustomIdentifier().subscribe((res) => {
      let data = res.response;
     this.ProductCustomIdentifier =data;
     this.productBusinessName =  this.ProductCustomIdentifier[0].productCustomName;

     this.productIndentifier =  this.ProductCustomIdentifier[1].productCustomName;
     console.log(this.productIndentifier)
     this.productSettingIdentifier =  this.ProductCustomIdentifier[2].productCustomName;
     console.log(this.productSettingIdentifier)
     console.log("select Product",  this.ProductCustomIdentifier);
    })
  }
  onSelect(): void {
   this.isSelected = true;
   
    }
    
}
