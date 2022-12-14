import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-sales-bulk-upload',
  templateUrl: './sales-bulk-upload.component.html',
  styleUrls: ['./sales-bulk-upload.component.css']
})
export class SalesBulkUploadComponent implements OnInit {
  arrayBuffer: any;
  constructor(
    private salesService:SalesServicesService,
    private dialogRef: MatDialogRef<SalesBulkUploadComponent>,
    private dialog: MatDialog,
  ) { }
  totalRows:any;
  errorFree:any;
  duplicateEntry:any;
  qtyExceed:any = "Quantity exceeds available stock = 3";
  prodGeo:any = "Product & geography not found = 2";
  incorrectFormating:any = "Incorrect formatting = 4";
  Incorrect:any;
  partialData:any = "Partial data = 3";
  zeroValue:any = "Zero value data = 2";
  uploadSales:boolean = false;
  duplicate:boolean = false;  
  zeroVal:boolean = false; 
  incorrectData:boolean = false;
  partialD:boolean = false;
  formating:boolean = false;
  product:boolean = false;
  exceedQty:boolean = false;
  ErrorFree:boolean = false;
  rowsTotal:boolean = false;
  CreatedById:any;
  salesUploadList:any = [];
  uploadedData:any = [];
  TotalRows:any = [];
  duplicateEntryy:any=[];
  errorfreeRows:any =[];
  incorrectRows:any = [];
  showTable:boolean = false;
  batchId:any;
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
    let Created = localStorage.getItem("logInId");
    this.CreatedById = Number(Created)
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
  IncorrectDataValue(){
    this.incorrectData = !this.incorrectData;

    if(this.incorrectData === false){
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

  // finctionality to read xlxs sheet and send array of object to api
  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary',cellDates: true });
      console.log(wb,"wb")

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      console.log(wsname,"wsname")
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws,"ws")

      /* save data */
      
       this.uploadedData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log("New Dataaaa",this.uploadedData); // Data will be logged in array format containing objects
      const uploadedFile = {
        CreateById:this.CreatedById,
        BulkSales:this.uploadedData
      }
      console.log("Daaataaa",uploadedFile); 
      this.salesService.getBulkSalesUpload(uploadedFile).subscribe((res)=>{
        if(res.succeded = true) {
          this.showTable =true;
        }
        this.salesUploadList=res.response;
        this.TotalRows = this.salesUploadList.allRows;
        this.totalRows = "Total rows = "+ this.TotalRows.length
      this.duplicateEntryy =this.salesUploadList.duplicateEntries
      this.duplicateEntry = "Duplicate entries = "+this.duplicateEntryy.length;
      this.errorfreeRows = this.salesUploadList.errorFreeRows
      this.errorFree = "Error free rows = "+ this.errorfreeRows.length;
        console.log("this.salesUploadList",this.salesUploadList);
        this.incorrectRows = this.salesUploadList.incorrectData;
        this.Incorrect = "Incorrect Data = " + this.incorrectRows.length;
        const SalesUploadData = res.response.allRows;
        console.log("SalesUploadData",SalesUploadData)
        this.batchId = SalesUploadData.map(({ batchId }) => batchId);
      })
    };
 }
 UploadSales() {
  const uploadedFile = {
    BatchId:this.batchId[0],
    action:''
  }
  console.log("Daaataaa",uploadedFile); 
  this.salesService.SaveBulkSalesUpload(uploadedFile).subscribe((res)=>{
    const uploadedData = res.response;
    
    this.dialogRef.close();
  })
 }
   

}
