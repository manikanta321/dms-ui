import { Component, OnInit } from '@angular/core';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import * as moment from 'moment';
import dayjs from 'dayjs/esm';

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.css']
})
export class AdvancedFilterComponent implements OnInit {
  targetGroupList: any;
  UserId:any;
  geoGraphyIdentifierList: any;
  isTargetGroupSelected: boolean = false;
  isgeoGraphyIdentifierSelected: boolean =false;
  ProductCustomIdentifier: any;
  isProductCustomIdentifierSelected: boolean = false;
  ProductCustomIdentifierList: any;
  arrayElements: any;
  categoryList: any;
  isCategorySelected: boolean = false;
  isSubCategorySelected: boolean = false;
  subcaty: any;
  typeSelected: boolean = false;
  typeList: any;
  isShipmentDateSelected: boolean = false;
  selectedDateRange: any;
  startDateShip: any;
  endDateShip: any;
  shipmentDatalist: any;
  menuDateValues:any;
  isReceiptDateSelected: boolean =false;
  isTargetGroupNameSelected:boolean = false;
  selectedItem: any;
  selectedItemsList : string[] = [];
  values: any = [];
  checkedCount : number = 0;
  searchText;

  constructor(private salesService:SalesServicesService,
    private addMaterials: AddMaterialsService,
    public orders:OrdersApisService,) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("logInId");
    localStorage.removeItem("category");
    localStorage.removeItem("subcategory");

  }
  addTargetGroupElements(){
    this.isgeoGraphyIdentifierSelected = false;
    this.isProductCustomIdentifierSelected = false;
    this.isCategorySelected = false;
    this.isSubCategorySelected = false;
    this.typeSelected = false;
    this.isShipmentDateSelected = false;
    this.isReceiptDateSelected = false;
    this.isTargetGroupSelected = true;
    this.salesService.getTargetList().subscribe((res) => {
      this.targetGroupList = res.response;
      console.log("check target", this.targetGroupList);
  });
}
getGeoGraphyIdentifier() {
  this.isTargetGroupSelected = false;
  this.isProductCustomIdentifierSelected = false;
  this.isCategorySelected = false;
  this.isSubCategorySelected = false;
  this.typeSelected = false;
  this.isShipmentDateSelected = false;
  this.isReceiptDateSelected = false;
  this.isgeoGraphyIdentifierSelected = true;
  this.addMaterials.getGeographyIdentifier(this.UserId).subscribe(res => {
    this.geoGraphyIdentifierList = res.response;
    console.log("this", this.geoGraphyIdentifierList);

  });
}
getProductCustomIdentifier(){
  this.isTargetGroupSelected = false;
  this.isgeoGraphyIdentifierSelected = false;
  this.isCategorySelected = false;
  this.isSubCategorySelected = false;
  this.typeSelected = false;
  this.isShipmentDateSelected = false;
  this.isReceiptDateSelected = false;
  this.isProductCustomIdentifierSelected = true;
  this.addMaterials.getProductCustomIdentifier().subscribe((res: any) => {
     this.ProductCustomIdentifierList = res.response;
  });
}
getCategory(){
  this.isTargetGroupSelected = false;
  this.isgeoGraphyIdentifierSelected = false;
  this.isProductCustomIdentifierSelected = false;
  this.isSubCategorySelected = false;
  this.typeSelected = false;
  this.isShipmentDateSelected = false;
  this.isCategorySelected = true;
  this.addMaterials.getclassification(true).subscribe((res: any) => {
     this.categoryList = res.response;
  });
}
getSubCategory(){
  this.isTargetGroupSelected = false;
  this.isgeoGraphyIdentifierSelected = false;
  this.isProductCustomIdentifierSelected = false;
  this.isCategorySelected = false;
  this.typeSelected = false;
  this.isShipmentDateSelected = false;
  this.isReceiptDateSelected = false;
  this.isSubCategorySelected = true;
    let Subdata = {
     catId: localStorage.getItem("category"),
     flag:true
    }
    this.salesService.onClickSubCat(Subdata).subscribe((res) => {
    this.subcaty = res.response;
    });
}
getType(){
  this.isTargetGroupSelected = false;
  this.isgeoGraphyIdentifierSelected = false;
  this.isProductCustomIdentifierSelected = false;
  this.isCategorySelected = false;
  this.isSubCategorySelected = false;
  this.isShipmentDateSelected = false;
  this.isReceiptDateSelected = false;
  this.typeSelected = true;
    let Subdata = {
      subCatId: localStorage.getItem("subcategory"),
      flag:false
    }
    this.salesService.onclickType(Subdata).subscribe((res) => {
    this.typeList = res.response;
    console.log("fff" , this.typeList)
    });
}
getShipmentDate(){
  this.isTargetGroupSelected = false;
  this.isgeoGraphyIdentifierSelected = false;
  this.isProductCustomIdentifierSelected = false;
  this.isCategorySelected = false;
  this.isSubCategorySelected = false;
  this.typeSelected = false;
  this.isReceiptDateSelected = false;
  this.isShipmentDateSelected = true;
  this.getListOfdatesTypes();
}
 getListOfdatesTypes() {
  this.menuDateValues = [
    {
      title: 'Custom',
      range: null
    },
    {
      title: 'last 30 days',
      range: [dayjs().subtract(29, 'days'), dayjs()],
    },
    {
      title: 'last 60 days',
      range: [dayjs().subtract(59, 'days'), dayjs()],
    },
    {
      title: 'last 90 days',
      range: [dayjs().subtract(89, 'days'), dayjs()],
    },
    {
      title: 'last 180 days',
      range: [dayjs().subtract(179, 'days'), dayjs()],
    },
    {
      title: 'This Month',
      range: [dayjs().startOf('month'), dayjs().endOf('month')],
    },
    {
      title: 'This Quater',
      range: [dayjs(moment().startOf('quarter').format('DD MMM YY')), dayjs(moment().endOf('quarter').format('DD MMM YY'))],
    },
    {
      title: 'This Year',
      range: [dayjs().startOf('year'), dayjs().endOf('year')],
    },
    {
      title: 'Last Month',
      range: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
    },
    {
      title: 'Last Quater',
      range: [dayjs(moment().subtract(1, 'quarter').startOf('quarter').format('DD MMM YY')), dayjs(moment().subtract(1, 'quarter').endOf('quarter').format('DD MMM YY'))],
    },
    {
      title: 'Last Year',
      range: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
    }];

}
getReceiptDate(){
  this.isTargetGroupSelected = false;
  this.isgeoGraphyIdentifierSelected = false;
  this.isProductCustomIdentifierSelected = false;
  this.isCategorySelected = false;
  this.isSubCategorySelected = false;
  this.typeSelected = false;
  this.isShipmentDateSelected = false;
  this.isReceiptDateSelected = true;
  this.getListOfdatesTypes();
}
onItemClick(item : any){
  if(!(this.isCheckedForProduct(item))){
  this.values.push(item);
  }
  else if(this.isCheckedForProduct(item)){
    this.values.pop(item);
  }
}
onItemClickOfCategory(category : any){
  localStorage.removeItem("category");
  if(!(this.isCheckedForProduct(category.catName))){
    this.values.push(category.catName);
    }
    else if(this.isCheckedForProduct(category.catName)){
      this.values.pop(category.catName);
    }
    if(this.isCategorySelected){
      localStorage.setItem("category" , category.catId);
    }

}
onItemClickOfSubCategory(subcat : any){
  localStorage.removeItem("subcategory");
  if(!(this.isCheckedForProduct(subcat.subCatName))){
    this.values.push(subcat.subCatName);
    }
    else if(this.isCheckedForProduct(subcat.subCatName)){
      this.values.pop(subcat.subCatName);
    }
  if(this.isSubCategorySelected){
      localStorage.setItem("subcategory" , subcat.subCatId);
    }

}
onItemClickOfType(type: any){
    if(!(this.isCheckedForProduct(type.typeName))){
      this.values.push(type.typeName);
      }
      else if(this.isCheckedForProduct(type.typeName)){
        this.values.pop(type.typeName);
      }
    

}
updateCount(event) {
  if (event.checked) {
    this.checkedCount++;
  } else {
    this.checkedCount--;
  }
}
removeItem(item) {
  const index = this.values.indexOf(item);
  this.values.splice(index, 1);
  this.checkedCount--;
}
isCheckedForProduct(item:any){
  if(this.values.includes(item)){
    return true;
  }
  else{
   return false
  }
}
clearAll(){
  this.values.length = 0;
  this.checkedCount = 0;
}
}

