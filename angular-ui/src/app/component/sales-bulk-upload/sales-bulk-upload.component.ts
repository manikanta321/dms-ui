import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-sales-bulk-upload',
  templateUrl: './sales-bulk-upload.component.html',
  styleUrls: ['./sales-bulk-upload.component.css']
})
export class SalesBulkUploadComponent implements OnInit {
  constructor() { }
  totalRows:any = "Total rows = 121";
  errorFree:any = "Error free rows = 97";
  duplicateEntry:any = "Duplicate entries = 1";
  qtyExceed:any = "Quantity exceeds available stock = 3";
  prodGeo:any = "Product & geography not found = 2";
  incorrectFormating:any = "Incorrect formatting = 4";
  partialData:any = "Partial data = 3";
  zeroValue:any = "Zero value data = 2";
  uploadSales:boolean = false;
  duplicate:boolean = false;  
  zeroVal:boolean = false; 
  partialD:boolean = false;
  formating:boolean = false;
  product:boolean = false;
  exceedQty:boolean = false;
  ErrorFree:boolean = false;
  rowsTotal:boolean = false;
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image3 = 'assets/img/maximize-arrow.png';
  image4 = 'assets/img/maximize-arrow.png';
  image5 = 'assets/img/maximize-arrow.png';
  image6 = 'assets/img/maximize-arrow.png';
  image7 = 'assets/img/maximize-arrow.png';
  image8 = 'assets/img/maximize-arrow.png';
  ngOnInit(): void {
    this.uploadSaless();
  }
  uploadSaless(){
    let upload =sessionStorage.getItem('sales')
    if(upload !== ''){
      this.uploadSales = true;
    }
    else{
      this.uploadSales = false;
    }
  }
  expandTotalRows(){
    this.rowsTotal = !this.rowsTotal;

    if(this.rowsTotal === false){
      this.image1 = 'assets/img/minimize-tag.png';
    } else {
      this.image1 = 'assets/img/maximize-arrow.png';
     
    }
  }
  expandErrorFree(){
    this.ErrorFree = !this.ErrorFree;

    if(this.ErrorFree === false){
      this.image2 = 'assets/img/minimize-tag.png';
    } else {
      this.image2 = 'assets/img/maximize-arrow.png';
     
    }
  }
  expandDuplicateEntry(){
    this.duplicate = !this.duplicate;

    if(this.duplicate === false){
      this.image3 = 'assets/img/maximize-arrow.png';
    } else {
      this.image3 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandZeroValue(){
    this.zeroVal = !this.zeroVal;

    if(this.zeroVal === false){
      this.image4 = 'assets/img/maximize-arrow.png';
    } else {
      this.image4 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandpartialData(){
    this.partialD = !this.partialD;

    if(this.partialD === false){
      this.image5 = 'assets/img/maximize-arrow.png';
    } else {
      this.image5 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandFormating(){
    this.formating = !this.formating;

    if(this.formating === false){
      this.image6 = 'assets/img/maximize-arrow.png';
    } else {
      this.image6 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandprodGeo(){
    this.product = !this.product;

    if(this.product === false){
      this.image7 = 'assets/img/maximize-arrow.png';
    } else {
      this.image7 = 'assets/img/minimize-tag.png';
     
    }
  }
  expandExceedQty(){
    this.exceedQty = !this.exceedQty;

    if(this.exceedQty === false){
      this.image8 = 'assets/img/maximize-arrow.png';
    } else {
      this.image8 = 'assets/img/minimize-tag.png';
     
    }
  }
}
