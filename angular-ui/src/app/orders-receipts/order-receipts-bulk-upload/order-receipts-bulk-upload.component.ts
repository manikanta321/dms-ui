import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-order-receipts-bulk-upload',
  templateUrl: './order-receipts-bulk-upload.component.html',
  styleUrls: ['./order-receipts-bulk-upload.component.css']
})
export class OrderReceiptsBulkUploadComponent implements OnInit {
  showTable:boolean = false;
  rowsTotal:boolean = false;
  rowsemptyTotal:boolean=false;
  totalRows:any;
  emptyRows:any;
  errorfreeRows:any =[];
  uploadedData:any = [];
  receiptsUploadList:any = [];
  TotalRows:any = [];
  EmptyRows:any=[];
  duplicateEntryy:any=[];
  duplicateEntry:any;
  errorFree:any;
  image1 = 'assets/img/minimize-tag.png';
  image2 = 'assets/img/minimize-tag.png';
  image4 = 'assets/img/maximize-arrow.png';
  image3 = 'assets/img/maximize-arrow.png';
  image5='assets/img/maximize-arrow.png';
  ErrorFree:boolean = false;
  incorrectRows:any = [];
  Incorrect:any;
  batchId:any;
  CreatedById:any;
  zeroVal:boolean = false; 
  duplicate:boolean = false;  
  incorrectData:boolean = false;
  constructor(private salesService:SalesServicesService,
    private dialogRef: MatDialogRef<OrderReceiptsBulkUploadComponent>,) { }

  ngOnInit(): void {
  }

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
        this.receiptsUploadList=res.response;
        this.TotalRows = this.receiptsUploadList.allRows;
        this.totalRows = "Total Rows = "+ this.TotalRows.length
        this.EmptyRows = this.receiptsUploadList.allRows;
        this.emptyRows = "Empty Rows = "+ this.EmptyRows.length
      this.duplicateEntryy =this.receiptsUploadList.duplicateEntries
      this.duplicateEntry = "Duplicate Entries = "+this.duplicateEntryy.length;
      this.errorfreeRows = this.receiptsUploadList.errorFreeRows
      this.errorFree = "Error Free Rows = "+ this.errorfreeRows.length;
        console.log("this.receiptsUploadList",this.receiptsUploadList);
        this.incorrectRows = this.receiptsUploadList.incorrectData;
        this.Incorrect = "Incorrect Data = " + this.incorrectRows.length;
        const SalesUploadData = res.response.allRows;
        console.log("SalesUploadData",SalesUploadData)
        this.batchId = SalesUploadData.map(({ batchId }) => batchId);
      })
    };
 }

  expandTotalRows(){
    this.rowsTotal = !this.rowsTotal;

    if(this.rowsTotal === false){
      this.image1 = 'assets/img/minimize-tag.png';
    } else {
      this.image1 = 'assets/img/maximize-arrow.png';
     
    }
  }
  expandEmptyRows(){
    this.rowsemptyTotal = !this.rowsTotal;

    if(this.rowsTotal === false){
      this.image5 = 'assets/img/minimize-tag.png';
    } else {
      this.image5 = 'assets/img/maximize-arrow.png';
     
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
  expandZeroValue(){
    this.zeroVal = !this.zeroVal;

    if(this.zeroVal === false){
      this.image4 = 'assets/img/maximize-arrow.png';
    } else {
      this.image4 = 'assets/img/minimize-tag.png';
     
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
  IncorrectDataValue(){
    this.incorrectData = !this.incorrectData;

    if(this.incorrectData === false){
      this.image4 = 'assets/img/maximize-arrow.png';
    } else {
      this.image4 = 'assets/img/minimize-tag.png';
     
    }
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
