import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',
  styleUrls: ['./addcurrency.component.css']
})
export class AddcurrencyComponent implements OnInit {
    name:any;
    headerName:any;
    currencyForm:FormGroup;
   

  constructor(private dialogRef: MatDialogRef<any>,
    private user:UserService,) {
      this.currencyForm = new FormGroup({
        currencyName: new FormControl(	'',	[Validators.required]),
        displayUnits: new FormControl(  '',  [Validators.required]),
        conversionRate: new FormControl(  '',  [Validators.required, Validators.pattern('^.+@.+\..+$')]),
        Conversion: new FormControl('',   [Validators.required]),
        defaultInr:new FormControl('',   [Validators.required])

     });
     }

  ngOnInit(): void {
    // this.addcurrency()
    var editcurrencyHeader =localStorage.getItem('headerStatus');
    if(editcurrencyHeader == "EditCurrency"){
      this.headerName ="Edit Currency";
    } else {
      this.headerName = 'Add Currency';
    }

     this.currencyForm.controls["defaultInr"].setValue("1 INR");
  }
  closeDialog(){
    this.dialogRef.close();
  }

  
  addcurncy(){
    const data={
      UoMName:this.currencyForm.value['currencyName'],
      UoMShortName:this.currencyForm.value['displayUnits'],
      ConversionRate:this.currencyForm.value['conversionRate'],
      UOMSymbol:this.currencyForm.value["defaultInr"],
      Conversion:this.currencyForm.value['Conversion'],

      
    }
    this.user.addcurrency(data).subscribe((res) => {    
      this.currencyForm.reset(); 
      // console.log(res,"123456987654")
    });
    this.closeDialog();
  }

  currencyConverteredValue(data:any){
    // alert("suceccy key finction")
  }


}
