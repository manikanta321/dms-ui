import { Component, OnInit } from '@angular/core';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import * as moment from 'moment';
import dayjs from 'dayjs/esm';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  GeoCheckedCount : number = 0;
  searchText;
  startDate: any;
  endDate: any;
  statusList: any;
  targetLists: any = [];
  itemOfgeogrphy: any = [];
  ProductCustomIdentifierElements: any = [];
  categoryItems: any = [];
  subcatItems: any = [];
  typeItems: any=[];
  PCICheckedCount: number = 0;
  categorycheckedCount:  number = 0;

  constructor(private salesService:SalesServicesService,
    private addMaterials: AddMaterialsService,
    public orders:OrdersApisService,
    private dialogRef: MatDialogRef<any>,) { }

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
      // this.targetGroupList.map((ele) => {
      //  console.log( this.isCheckedForProduct(ele.targetGroupName));
      // })
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
onItemClickOfTargetGroup(item : any){
  if(!(this.isCheckedForProduct(item.targetGroupName, 'target'))){
  this.values.push(item.targetGroupName);
  this.targetLists.push(item.targetGroupId);
  }
  else if(this.isCheckedForProduct(item.targetGroupName, 'target')){
    this.values.pop(item.targetGroupName);
    this.targetLists.pop(item.targetGroupId);
  }
  
}
onItemClick(item : any){
  if(!(this.isCheckedForProduct(item.productCustomName, 'product'))){
  this.values.push(item.productCustomName);
  this.ProductCustomIdentifierElements.push(item.productCustomId);
  }
  else if(this.isCheckedForProduct(item.productCustomName, 'product')){
    this.values.pop(item.productCustomName);
    this.ProductCustomIdentifierElements.pop(item.productCustomId)
  }
}
onItemClickOfGeograpy(item : any){
  if(!(this.isCheckedForProduct(item?.geographyIdentifierName,'geo'))){
  this.values.push(item?.geographyIdentifierName);
  this.itemOfgeogrphy.push(item.geographyIdentifierId);
  }
  else if(this.isCheckedForProduct(item?.geographyIdentifierName,'geo')){
    this.values.pop(item?.geographyIdentifierName);
    this.itemOfgeogrphy.pop(item.geographyIdentifierId);
  }

}

onItemClickOfCategory(category : any){
  localStorage.removeItem("category");
  if(!(this.isCheckedForProduct(category.catName, 'category'))){
    this.values.push(category.catName);
    this.categoryItems.push(category.catId);
    }
    else if(this.isCheckedForProduct(category.catName, 'category')){
      this.values.pop(category.catName);
      this.categoryItems.pop(category.catId);
    }
    if(this.isCategorySelected){
      localStorage.setItem("category" , category.catId);
    }
    
}
onItemClickOfSubCategory(subcat : any){
  localStorage.removeItem("subcategory");
  if(!(this.isCheckedForProduct(subcat.subCatName,'subcategory'))){
    this.values.push(subcat.subCatName);
    this.subcatItems.push(subcat.subCatId);
    }
    else if(this.isCheckedForProduct(subcat.subCatName,'subcategory')){
      this.values.pop(subcat.subCatName);
      this.subcatItems.pop(subcat.subCatId);
    }
  if(this.isSubCategorySelected){
      localStorage.setItem("subcategory" , subcat.subCatId);
    }

}
onItemClickOfType(type: any){
    if(!(this.isCheckedForProduct(type.typeName, 'type'))){
      this.values.push(type.typeName);
      this.typeItems.push(type.typeId);
      }
      else if(this.isCheckedForProduct(type.typeName, 'type')){
        this.values.pop(type.typeName);
        this.typeItems.pop(type.typeId);
      }
    

}
updateCount(event) {
    if(this.isTargetGroupSelected){
      if (event.checked) {
    this.checkedCount++;
    }
    else if(this.checkedCount > 0){
      this.checkedCount--;
    }
  }
  //  ||  || isSubCategorySelected || typeSelected"
}
updateCountForGeo(event:any){
 if(this.isgeoGraphyIdentifierSelected){
  if (event.checked) {
    this.GeoCheckedCount++;
    }
    else if(this.GeoCheckedCount > 0){
      this.GeoCheckedCount--;
     }
}
}
updateCountForPCI(event:any){
   if(this.isProductCustomIdentifierSelected){
  if (event.checked) {
    this.PCICheckedCount++;
    }
    else if(this.PCICheckedCount > 0){
      this.PCICheckedCount--;
     }
}

}
updateCountForCategory(event:any){
  if(this.isCategorySelected){
 if (event.checked) {
   this.categorycheckedCount++;
   }
   else if(this.categorycheckedCount > 0){
     this.categorycheckedCount--;
    }
}

}


removeItem(item) {
  const index = this.values.indexOf(item);
  this.values.splice(index, 1);
  if(this.checkedCount > 0){
  this.checkedCount--;
  }
  if(this.GeoCheckedCount > 0){
  this.GeoCheckedCount--;
  }
  if(this.PCICheckedCount > 0){
    this.PCICheckedCount--;
  }
  if(this.categorycheckedCount > 0){
    this.categorycheckedCount--;
  }
}
isCheckedForProduct(item:any, type){
  let productIdsList;
  switch (type ){
    case 'target': {
      productIdsList = this.targetLists;
      break;
    }
    case 'geo':{
      productIdsList = this.itemOfgeogrphy;
      break;
    }
    case 'product':{
      productIdsList = this.ProductCustomIdentifierElements;
      break;
    }
    case 'category':{
      productIdsList = this.categoryItems;
      break;
    }
    case 'subcategory':{
      productIdsList = this.subcatItems;
      break;
    }
    case 'type':{
      productIdsList = this.typeItems;
      break;
    }

    default:{
      productIdsList : []
    }


  }
  if(productIdsList.includes(item)){
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
applyAll(){
  let selectedFilters = {
    targetGroupIds: this.targetLists,
    GeographyIdentifierIds: this.itemOfgeogrphy,
    productIdentifierIds: this.ProductCustomIdentifierElements,
    catogoryIds: this.categoryItems,
    subCategoryIds: this.subcatItems,    
    typeIds: this.typeItems
  }
  console.log(selectedFilters);
  this.dialogRef.close(selectedFilters);

}
getBackgroundColor(item) {
 if(this.targetGroupList.some(target => target['targetGroupName'] === item)) {
    return '#0353A4';
  }
  else  if(this.geoGraphyIdentifierList.some(vendor => vendor['geographyIdentifierName'] === item)){
    return '#F72585';
  }
  else  if(this.ProductCustomIdentifierList.some(PCI => PCI.productCustomeIdentifiers.some((ele) => ele.productCustomName === item))){
    return '#017EFA';
  }
  else  if(this.categoryList.allOtherCats.some(category => category['catName'] === item)){
    return '#00187A';
  }
  else  if(this.subcaty?.allOtherSubCAts.some(subcategory => subcategory['subCatName'] === item)){
    return '#0C5A3E';
  }
  else  if(this.typeList.some(types => types['typeName'] === item)){
    return '#C32F27';
  }
}
customDatePickerEvent(eventChange) {
  this.selectedDateRange = eventChange.selectedDate;
  this.startDate = this.selectedDateRange.startDate;
  this.endDate = this.selectedDateRange.endDate;
  console.log("dfdfdfdfdfd",this.selectedDateRange);
}
}


