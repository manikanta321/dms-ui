import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OtherMasterService } from 'src/app/services/other-master.service';
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
  files:any =[];
  TargetUpload:any=[];
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
  ReceiptOrTargetUpload:boolean=false;
  uploadedTextShow:boolean=false;
  constructor(private salesService:SalesServicesService,
    private otherMasterService:OtherMasterService,
    private dialogRef: MatDialogRef<OrderReceiptsBulkUploadComponent>,) { }

  ngOnInit(): void {
    this.CreatedById = localStorage.getItem("logInId");
    this.CreatedById = Number(this.CreatedById);
    let isitemtarget =localStorage.getItem('UploadTarget')

    if(isitemtarget==''){
      this.ReceiptOrTargetUpload=false;
    }else{
     this.ReceiptOrTargetUpload=true;
   
    }
  }

  onFileChange(event: any) {
    // Iterate over selected files
    for (let file of event.target.files) {
      // Append to a list
      this.files.push({
        name: file.name,
        type: file.type
        // Other specs
      });
    }
  this.uploadedTextShow=true;
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
      console.log("New Dataaaa checking coming or not",this.uploadedData);
      const uploadedFile = {
         CurrentUserId:this.CreatedById,
         BulkDealerTgts:this.uploadedData,
         
      }
      
      console.log("check once Batch id coming or not" , this.batchId);
    
      console.log("Daaataaa",uploadedFile); 
        
       this.salesService.getReceiptBulkUploadTarget(uploadedFile).subscribe((res)=>{
           if(res.succeded = true) {
          this.showTable =true;
        }
        
        this.TargetUpload=res.response;
         
       this.BatchId = this.TargetUpload.batchid;
       console.log("TargetUpload checking ",this.BatchId)

        this.TotalRows = this.TargetUpload.allRows;
        this.totalRows = "Total Rows = "+ this.TotalRows.length;
       console.log( this.totalRows,"check total rows");
       

        this.errorfreeRows = this.TargetUpload.errorFreeRows

        this.errorFree = "Error Free Rows = "+ this.errorfreeRows.length;

        this.duplicateEntryy =this.TargetUpload.duplicateRows
        
        this.duplicateEntry = "Duplicate Entries = " + this.duplicateEntryy.length;
         
        console.log( this.duplicateEntry,"check total duplicateEntry"); 

        
        this.incorrectRows = this.TargetUpload.incorrectData;
        console.log("incorrectColumn check" ,this.incorrectRows);
        this.incorrectRows?.map((ele)=>{
          ele.incorrectColumn = ele.incorrectColumn?.split(":")[1].toLowerCase().trim();
          console.log("incorrectColumn check" , ele.incorrectColumn);
          return ele;
        });
        console.log("incorret data checking " , this.incorrectRows);
        this.Incorrect = "Incorrect Data = " + this.incorrectRows?.length;
        const TargetUpload = res.response.allRows;
        console.log("associationList   check",TargetUpload)
        this.batchId = TargetUpload.map(({ batchId }) => batchId);
      
       

       
      })
    };
    
 }

  expandTotalRows(){
    this.rowsTotal = !this.rowsTotal;

    if(this.rowsTotal === false){
      this.image1 = 'assets/img/minimize-tag.png';
      this.image4 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/maximize-arrow.png';
      this.image4 = 'assets/img/maximize-arrow.png';
     
    }
  }
  expandEmptyRows(){
    this.rowsemptyTotal = !this.rowsemptyTotal;

    if(this.rowsemptyTotal === false){
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
  closedialogbox()
  {
    this.dialogRef.close();
  }
  BatchId:any;
  UploadReceipt() {
    const uploadedFile = {
      currentUserId:this.CreatedById,
      BatchId:this.BatchId
    }
    console.log("Daaataaa",uploadedFile); 
    this.salesService.saveBulkUploadReceipt(uploadedFile).subscribe((res)=>{
      this.otherMasterService.filter('Register click');
      const uploadedData = res.response;
      console.log("SaveReceipt",uploadedData)
      this.dialogRef.close();
    })
   }
}
