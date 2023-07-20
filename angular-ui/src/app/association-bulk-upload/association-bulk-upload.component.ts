import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OtherMasterService } from 'src/app/services/other-master.service';
import { SalesServicesService } from 'src/app/services/sales-services.service';
import * as XLSX from 'xlsx';
import { OrderReceiptsBulkUploadComponent } from '../orders-receipts/order-receipts-bulk-upload/order-receipts-bulk-upload.component';
import { AssosiationServicesService } from '../services/assosiation-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-association-bulk-upload',
  templateUrl: './association-bulk-upload.component.html',
  styleUrls: ['./association-bulk-upload.component.css']
})
export class AssociationBulkUploadComponent implements OnInit {
  showTable:boolean = false;
  isButtonDisabled: boolean = false;
  Errorfreeforms!:FormGroup
  files:any=[];
  rowsTotal:boolean = false;
  rowsemptyTotal:boolean=false;
  totalRows:any;
  emptyRows:any;
  ErrorFree:boolean = false;
  errorfreeRows:any =[];
  uploadedData:any = [];
  receiptsUploadList:any = [];
  associationList:any=[];
  CurrentUserId:any;
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
 
  incorrectRows:any = [];
  Incorrect:any;
  batchId:any;
  CreatedById:any;
  zeroVal:boolean = false; 
  duplicate:boolean = false;  
  incorrectData:boolean = false;
  uploadedTextShow: boolean = false;
  totalVal:boolean = false;
  shipment:boolean = false;
  uploadSales:boolean = false;
  orderReceipt:boolean = false;
  constructor(private salesService:SalesServicesService,
    private associationService:AssosiationServicesService,
    private otherMasterService:OtherMasterService,
    private dialogRef: MatDialogRef<AssociationBulkUploadComponent>,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.CreatedById = localStorage.getItem("logInId");
    this.CreatedById = Number(this.CreatedById);


    this.Errorfreeforms = this.formbuilder.group({
      age: ['', Validators.required]
    });
    
  
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
      console.log("New Dataaaa checking",this.uploadedData); // Data will be logged in array format containing objects
      const uploadedFile = {
         CurrentUserId:this.CreatedById,
         BatchId : this.associationList.batchid,
       
        Associations:this.uploadedData
      }
      console.log("check once Batch id" , this.BatchId);
    
      console.log("Daaataaa",uploadedFile); 
        
       
          this.associationService.AssociationbulkeditList(uploadedFile).subscribe((res)=>{
          

        if(res.succeded = true) {
          this.showTable =true;
        }
        
        this.associationList=res.response;
        this.BatchId = this.associationList.batchid;
        console.log("Batch data checkinn",this.BatchId);
       console.log("Association List",this.associationList)
        this.TotalRows = this.associationList.allRows;
        // this.TotalRows.map((ele)=>{
        //   ele.incorrectColumn = ele.incorrectColumn?.split(":")[1].toLowerCase().trim();
        //   console.log("incorrectColumn check" , ele.incorrectColumn);
        //   return ele;
        // });
        this.totalRows = "Total Rows = "+ this.TotalRows.length;

        this.errorfreeRows = this.associationList.errorFreeRows
        // this.errorfreeRows.map((ele)=>{
        //   ele.incorrectColumn = ele.incorrectColumn?.split(":")[1].toLowerCase().trim();
        //   console.log("incorrectColumn check" , ele.incorrectColumn);
        //   return ele;
        // });
        this.errorFree = "Error Free Rows = "+ this.errorfreeRows.length;

        this.duplicateEntryy =this.associationList.duplicateEntries
        // this.duplicateEntryy.map((ele)=>{
        //   ele.incorrectColumn = ele.incorrectColumn?.split(":")[1].toLowerCase().trim();
        //   console.log("incorrectColumn check" , ele.incorrectColumn);
        //   return ele;
        // });
        this.duplicateEntry = "Duplicate Entries = "+this.duplicateEntryy.length;

        
        this.incorrectRows = this.associationList.incorrectData;
        this.incorrectRows.map((ele)=>{
          ele.incorrectColumn = ele.incorrectColumn?.split(":")[1].toLowerCase().trim();
          console.log("incorrectColumn check" , ele.incorrectColumn);
          return ele;
        });
        console.log("incorret data checking " , this.incorrectRows);
        this.Incorrect = "Incorrect Data = " + this.incorrectRows.length;
        const associationList = res.response.allRows;
        console.log("associationList   check",associationList)
        this.batchId = associationList.map(({ batchId }) => batchId);
      
       

       
      })
    };
    
 }
 onSubmit()
 {
  
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

expandTotalValue(){
  this.totalVal = !this.totalVal;

  if(this.totalVal === false){
    this.image4 = 'assets/img/maximize-arrow.png';
  } else {
    this.image4 = 'assets/img/minimize-tag.png';
   
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
  BatchId:any;
  UploadReceipt() {
    let uploadedFile = {
    currentUserId:this.CreatedById,
    BatchId:this.BatchId
    }
    this.associationService.SaveBulkUploadAssocition(uploadedFile).subscribe((res)=>{
      this.otherMasterService.filter('Register click');
      const uploadedData = res.response;
      
      console.log("Save bulk assocition",uploadedData)
      
      this.dialogRef.close();
    })
   }
   uploadFile() {
    const uploadedFile = {
      guid:this.batchId[0]
    }
    console.log("Daaataaa",uploadedFile); 
   
      this.associationService.AssociationbulkeditList(uploadedFile).subscribe((res)=>{
      const uploadedData = res.response;
       this.dialogRef.close();
    })
   
   } 
 closedialogbox()
 {
   this.dialogRef.close();
 }
}
